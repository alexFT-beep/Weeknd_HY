import { CartDrawerComponent } from '../components/CartDrawerComponent.js';
import { ToastComponent } from '../components/ToastComponent.js';

/**
 * Presentation Controller: CartController
 * Manages cart state UI, micro-animations, drawer interactions, and WhatsApp submission.
 */
export class CartController {
  /**
   * @param {Object} params
   * @param {import('../../application/usecases/CartUseCases.js').CartUseCases} params.cartUseCases
   * @param {import('../../application/usecases/CalculateTotalsUseCase.js').CalculateTotalsUseCase} params.calculateTotalsUseCase
   * @param {import('../../application/usecases/WhatsAppOrderUseCase.js').WhatsAppOrderUseCase} params.whatsAppOrderUseCase
   * @param {import('../../domain/ports/IMenuRepository.js').IMenuRepository} params.menuRepository
   */
  constructor({ cartUseCases, calculateTotalsUseCase, whatsAppOrderUseCase, menuRepository }) {
    this.cartUseCases = cartUseCases;
    this.calculateTotalsUseCase = calculateTotalsUseCase;
    this.whatsAppOrderUseCase = whatsAppOrderUseCase;
    this.menuRepository = menuRepository;
    this.toast = new ToastComponent();
    this.orderType = 'delivery';
    this.isOpen = false;
    this.eventsBound = false;

    this.formData = {
      customerName: '',
      address: '',
      reference: '',
      tableNumber: '',
      paymentMethod: 'Yape',
      notes: ''
    };

    this.drawerHostElement = document.getElementById('cart-drawer-container');
    if (!this.drawerHostElement) {
      this.drawerHostElement = document.createElement('div');
      this.drawerHostElement.id = 'cart-drawer-container';
      document.body.appendChild(this.drawerHostElement);
    }
  }

  async init() {
    await this.cartUseCases.initialize();
    
    // Subscribe to cart changes for automatic reactive UI updates
    this.cartUseCases.subscribe(async () => {
      await this.updateCartWidgets();
      if (this.isOpen) {
        await this.renderDrawer();
      }
    });

    this.bindGlobalEvents();
    await this.updateCartWidgets();
  }

  bindGlobalEvents() {
    if (this.eventsBound) return;
    this.eventsBound = true;

    // Delegated click listeners
    document.addEventListener('click', async (e) => {
      const button = e.target.closest('[data-action]');
      if (!button) return;

      const action = button.dataset.action;

      switch (action) {
        case 'add-to-cart': {
          const itemId = button.dataset.itemId;
          const card = document.getElementById(`item-card-${itemId}`) || button.closest('.menu-card');
          await this.handleAddItem(itemId, button, card);
          break;
        }
        case 'open-cart':
          await this.openCart();
          break;
        case 'close-cart':
          this.closeCart();
          break;
        case 'set-order-type': {
          this.saveCurrentFormData();
          this.orderType = button.dataset.type || 'delivery';
          await this.renderDrawer();
          break;
        }
        case 'increase-qty': {
          const cartItemId = button.dataset.cartItemId;
          const currentItem = this.cartUseCases.getItems().find(i => i.id === cartItemId || i.item.id === cartItemId);
          if (currentItem) {
            this.saveCurrentFormData();
            this.cartUseCases.updateQuantity(cartItemId, currentItem.quantity + 1);
            await this.updateCartWidgets();
            await this.renderDrawer();
          }
          break;
        }
        case 'decrease-qty': {
          const cartItemId = button.dataset.cartItemId;
          const currentItem = this.cartUseCases.getItems().find(i => i.id === cartItemId || i.item.id === cartItemId);
          if (currentItem) {
            this.saveCurrentFormData();
            this.cartUseCases.updateQuantity(cartItemId, currentItem.quantity - 1);
            await this.updateCartWidgets();
            await this.renderDrawer();
          }
          break;
        }
        case 'clear-cart':
          this.cartUseCases.clear();
          await this.updateCartWidgets();
          await this.renderDrawer();
          this.toast.show('Se vació el carrito', 'info');
          break;
        case 'select-delivery-zone': {
          this.saveCurrentFormData();
          const zoneId = button.dataset.zoneId;
          this.cartUseCases.setDeliveryZone(zoneId);
          await this.updateCartWidgets();
          await this.renderDrawer();
          break;
        }
        case 'packaging-qty': {
          this.saveCurrentFormData();
          const pkgId = button.dataset.pkgId;
          const val = Math.max(0, parseInt(button.dataset.val, 10) || 0);
          this.cartUseCases.setPackagingQuantity(pkgId, val);
          await this.updateCartWidgets();
          await this.renderDrawer();
          break;
        }
        case 'submit-whatsapp-order':
          await this.submitOrder();
          break;
      }
    });

    // Notes change listener
    document.addEventListener('input', (e) => {
      if (e.target && e.target.dataset.action === 'update-item-notes') {
        const cartItemId = e.target.dataset.cartItemId;
        const item = this.cartUseCases.getItems().find(i => i.id === cartItemId || i.item.id === cartItemId);
        if (item) {
          item.notes = e.target.value;
          this.cartUseCases._persist();
        }
      }
    });

    // Escape key to close cart
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen) {
        this.closeCart();
      }
    });
  }

  saveCurrentFormData() {
    const nameInput = document.getElementById('order-customer-name');
    if (nameInput) this.formData.customerName = nameInput.value;

    const addressInput = document.getElementById('order-address');
    if (addressInput) this.formData.address = addressInput.value;

    const refInput = document.getElementById('order-reference');
    if (refInput) this.formData.reference = refInput.value;

    const tableInput = document.getElementById('order-table-number');
    if (tableInput) this.formData.tableNumber = tableInput.value;

    const paymentSelect = document.getElementById('order-payment-method');
    if (paymentSelect) this.formData.paymentMethod = paymentSelect.value;

    const notesTextarea = document.getElementById('order-general-notes');
    if (notesTextarea) this.formData.notes = notesTextarea.value;
  }

  restoreFormData() {
    const nameInput = document.getElementById('order-customer-name');
    if (nameInput && this.formData.customerName) nameInput.value = this.formData.customerName;

    const addressInput = document.getElementById('order-address');
    if (addressInput && this.formData.address) addressInput.value = this.formData.address;

    const refInput = document.getElementById('order-reference');
    if (refInput && this.formData.reference) refInput.value = this.formData.reference;

    const tableInput = document.getElementById('order-table-number');
    if (tableInput && this.formData.tableNumber) tableInput.value = this.formData.tableNumber;

    const paymentSelect = document.getElementById('order-payment-method');
    if (paymentSelect && this.formData.paymentMethod) paymentSelect.value = this.formData.paymentMethod;

    const notesTextarea = document.getElementById('order-general-notes');
    if (notesTextarea && this.formData.notes) notesTextarea.value = this.formData.notes;
  }

  /**
   * Alias method for adding item by ID with automatic DOM element resolution
   */
  async addItemToCart(itemId, buttonElement = null, cardElement = null) {
    const card = cardElement || document.getElementById(`item-card-${itemId}`);
    const btn = buttonElement || (card ? card.querySelector('[data-action="add-to-cart"], button') : null);
    await this.handleAddItem(itemId, btn, card);
  }

  /**
   * Handle adding an item with rich animation & sound feedback
   */
  async handleAddItem(itemId, buttonElement, cardElement) {
    const menuItem = await this.menuRepository.getMenuItemById(itemId);
    if (!menuItem) return;

    // 1. Add to cart use case
    this.cartUseCases.addItem(menuItem, 1);

    // 2. Micro-animation on the button (+ pop and temporary checkmark)
    if (buttonElement) {
      buttonElement.classList.add('animate-pop');
      const originalHtml = buttonElement.innerHTML;
      buttonElement.innerHTML = '<span class="material-symbols-outlined text-[20px] text-black">check</span>';
      setTimeout(() => {
        buttonElement.classList.remove('animate-pop');
        buttonElement.innerHTML = originalHtml;
      }, 700);
    }

    // 3. Glow animation on card
    if (cardElement) {
      cardElement.classList.remove('animate-pulse-glow');
      void cardElement.offsetWidth; // Reflow
      cardElement.classList.add('animate-pulse-glow');
      cardElement.classList.add('selected-active');
      setTimeout(() => {
        cardElement.classList.remove('selected-active');
      }, 1000);
    }

    // 4. Flying particle towards cart target
    this.triggerFlyingParticle(buttonElement || cardElement);

    // 5. Update floating cart widget and bounce cart icons
    await this.updateCartWidgets();
    this.animateCartIcons();

    // 6. Toast Notification
    this.toast.show(`¡"${menuItem.name}" añadido al carrito!`, 'success');
  }

  triggerFlyingParticle(sourceElement) {
    if (!sourceElement) return;
    const sourceRect = sourceElement.getBoundingClientRect();
    const targetElement = document.getElementById('cart-floating-fab') || document.querySelector('[data-action="open-cart"]');
    if (!targetElement) return;

    const targetRect = targetElement.getBoundingClientRect();

    const particle = document.createElement('div');
    particle.className = 'flying-particle';
    particle.innerHTML = '<span class="material-symbols-outlined text-xs">fastfood</span>';

    const startX = sourceRect.left + sourceRect.width / 2 - 12;
    const startY = sourceRect.top + sourceRect.height / 2 - 12;
    const deltaX = (targetRect.left + targetRect.width / 2) - startX;
    const deltaY = (targetRect.top + targetRect.height / 2) - startY;

    particle.style.left = `${startX}px`;
    particle.style.top = `${startY}px`;
    particle.style.setProperty('--target-x', `${deltaX}px`);
    particle.style.setProperty('--target-y', `${deltaY}px`);

    document.body.appendChild(particle);

    setTimeout(() => {
      if (particle.parentElement) {
        particle.parentElement.removeChild(particle);
      }
    }, 650);
  }

  animateCartIcons() {
    const fabButton = document.getElementById('cart-floating-fab');
    const otherCartButtons = document.querySelectorAll('[data-action="open-cart"]');

    [fabButton, ...otherCartButtons].forEach(el => {
      if (el) {
        el.classList.remove('animate-heartbeat');
        void el.offsetWidth;
        el.classList.add('animate-heartbeat');
      }
    });
  }

  async updateCartWidgets() {
    const items = this.cartUseCases.getItems();
    const totals = await this.calculateTotalsUseCase.execute({
      items,
      deliveryZoneId: this.cartUseCases.getDeliveryZoneId(),
      packagingSelections: this.cartUseCases.getPackagingSelections(),
      orderType: this.orderType
    });

    // Update Floating Circular FAB Badge & any other badges
    const badges = document.querySelectorAll('#floating-cart-badge, .header-cart-badge, #mobile-cart-badge');
    badges.forEach(badge => {
      if (totals.itemCount > 0) {
        badge.textContent = totals.itemCount;
        badge.classList.remove('hidden');
      } else {
        badge.classList.add('hidden');
      }
    });
  }

  async openCart() {
    this.isOpen = true;
    await this.renderDrawer();

    const backdrop = document.getElementById('cart-backdrop');
    const panel = document.getElementById('cart-drawer-panel');

    if (backdrop && panel) {
      backdrop.classList.remove('opacity-0', 'pointer-events-none');
      backdrop.classList.add('opacity-100', 'pointer-events-auto');
      panel.classList.remove('translate-x-full');
      panel.classList.add('translate-x-0');
    }
    document.body.classList.add('overflow-hidden');
  }

  closeCart() {
    this.isOpen = false;
    const backdrop = document.getElementById('cart-backdrop');
    const panel = document.getElementById('cart-drawer-panel');

    if (backdrop && panel) {
      backdrop.classList.remove('opacity-100', 'pointer-events-auto');
      backdrop.classList.add('opacity-0', 'pointer-events-none');
      panel.classList.remove('translate-x-0');
      panel.classList.add('translate-x-full');
    }
    document.body.classList.remove('overflow-hidden');
  }

  async renderDrawer() {
    // 1. Preserve current scroll position before re-rendering
    const scrollBody = document.querySelector('#cart-drawer-panel .overflow-y-auto') || document.querySelector('#cart-drawer-panel .custom-scrollbar');
    const savedScrollTop = scrollBody ? scrollBody.scrollTop : 0;

    const items = this.cartUseCases.getItems();
    const [deliveryZones, packagingOptions] = await Promise.all([
      this.menuRepository.getDeliveryZones(),
      this.menuRepository.getPackagingOptions()
    ]);

    const totals = await this.calculateTotalsUseCase.execute({
      items,
      deliveryZoneId: this.cartUseCases.getDeliveryZoneId(),
      packagingSelections: this.cartUseCases.getPackagingSelections(),
      orderType: this.orderType
    });

    this.drawerHostElement.innerHTML = CartDrawerComponent.renderDrawer({
      items,
      deliveryZones,
      packagingOptions,
      selectedDeliveryZoneId: this.cartUseCases.getDeliveryZoneId(),
      packagingSelections: this.cartUseCases.getPackagingSelections(),
      totals,
      orderType: this.orderType,
      isOpen: this.isOpen
    });

    this.restoreFormData();

    // 2. Restore scroll position instantly so the user is never pushed to the top
    if (savedScrollTop > 0) {
      const newScrollBody = document.querySelector('#cart-drawer-panel .overflow-y-auto') || document.querySelector('#cart-drawer-panel .custom-scrollbar');
      if (newScrollBody) {
        newScrollBody.scrollTop = savedScrollTop;
      }
    }

    if (this.isOpen) {
      const backdrop = document.getElementById('cart-backdrop');
      const panel = document.getElementById('cart-drawer-panel');
      if (backdrop && panel) {
        backdrop.classList.remove('opacity-0', 'pointer-events-none');
        backdrop.classList.add('opacity-100', 'pointer-events-auto');
        panel.classList.remove('translate-x-full');
        panel.classList.add('translate-x-0');
      }
    }
  }

  async submitOrder() {
    const items = this.cartUseCases.getItems();
    if (items.length === 0) {
      this.toast.show('Por favor agrega platos a tu pedido primero', 'warning');
      return;
    }

    const nameInput = document.getElementById('order-customer-name');
    const customerName = nameInput ? nameInput.value.trim() : '';

    if (!customerName) {
      this.toast.show('Por favor ingresa tu nombre', 'warning');
      if (nameInput) nameInput.focus();
      return;
    }

    let address = '';
    let reference = '';
    let tableNumber = '';

    if (this.orderType === 'delivery') {
      const addressInput = document.getElementById('order-address');
      address = addressInput ? addressInput.value.trim() : '';
      if (!address) {
        this.toast.show('Por favor ingresa tu dirección para el delivery', 'warning');
        if (addressInput) addressInput.focus();
        return;
      }
      const refInput = document.getElementById('order-reference');
      reference = refInput ? refInput.value.trim() : '';
    } else {
      const tableInput = document.getElementById('order-table-number');
      tableNumber = tableInput ? tableInput.value.trim() : '';
      if (!tableNumber) {
        this.toast.show('Por favor ingresa tu número de mesa', 'warning');
        if (tableInput) tableInput.focus();
        return;
      }
    }

    const paymentSelect = document.getElementById('order-payment-method');
    const paymentMethod = paymentSelect ? paymentSelect.value : 'Yape';

    const notesTextarea = document.getElementById('order-general-notes');
    const notes = notesTextarea ? notesTextarea.value.trim() : '';

    const orderResult = await this.whatsAppOrderUseCase.execute({
      customerName,
      orderType: this.orderType,
      tableNumber,
      deliveryZoneId: this.cartUseCases.getDeliveryZoneId(),
      address,
      reference,
      notes,
      paymentMethod,
      items,
      packagingSelections: this.cartUseCases.getPackagingSelections()
    });

    // Mark order as submitted for 5-minute cache expiry
    this.cartUseCases.markOrderSubmitted();

    this.toast.show('¡Pedido enviado! Abriendo WhatsApp... El carrito se restablecerá en 5 minutos.', 'success');
    
    // Open official WhatsApp link
    window.open(orderResult.link, '_blank');

    setTimeout(() => {
      this.closeCart();
    }, 1200);
  }
}
