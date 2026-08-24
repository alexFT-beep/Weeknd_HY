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
        case 'go-to-menu':
        case 'view-menu':
          this.closeCart();
          if (typeof window.goToDashboard === 'function') {
            window.goToDashboard();
          } else {
            window.location.hash = 'carta-digital';
            window.dispatchEvent(new CustomEvent('app:navigate', { detail: { view: 'dashboard' } }));
            window.dispatchEvent(new HashChangeEvent('hashchange'));
          }
          window.scrollTo({ top: 0, behavior: 'smooth' });
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

    // Custom Event Listener for cart:add
    document.addEventListener('cart:add', async (e) => {
      const { itemId, buttonElement, cardElement } = e.detail || {};
      if (itemId) {
        const btn = buttonElement || document.querySelector(`[data-action="add-to-cart"][data-item-id="${itemId}"]`);
        const card = cardElement || document.getElementById(`item-card-${itemId}`);
        await this.handleAddItem(itemId, btn, card);
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
    try {
      const nameInput = document.getElementById('order-customer-name');
      if (nameInput) this.formData.customerName = nameInput.value;

      const addressInput = document.getElementById('order-address');
      if (addressInput) this.formData.address = addressInput.value;

      const refInput = document.getElementById('order-reference');
      if (refInput) this.formData.reference = refInput.value;

      const tableInput = document.getElementById('order-table-number');
      if (tableInput) this.formData.tableNumber = tableInput.value;

      const reasonInput = document.getElementById('order-reservation-reason') || document.getElementById('order-reservation-motive');
      if (reasonInput) {
        this.formData.reservationReason = reasonInput.value;
        this.formData.reservationMotive = reasonInput.value;
      }

      const peopleInput = document.getElementById('order-reservation-people');
      if (peopleInput) this.formData.reservationPeople = peopleInput.value;

      const dateTimeInput = document.getElementById('order-reservation-datetime');
      if (dateTimeInput) this.formData.reservationDateTime = dateTimeInput.value;

      const paymentSelect = document.getElementById('order-payment-method');
      if (paymentSelect) this.formData.paymentMethod = paymentSelect.value;

      const notesTextarea = document.getElementById('order-general-notes');
      if (notesTextarea) this.formData.notes = notesTextarea.value;
    } catch (err) {
      console.warn('Error saving form data:', err);
    }
  }

  restoreFormData() {
    try {
      const nameInput = document.getElementById('order-customer-name');
      if (nameInput && this.formData.customerName) nameInput.value = this.formData.customerName;

      const addressInput = document.getElementById('order-address');
      if (addressInput && this.formData.address) addressInput.value = this.formData.address;

      const refInput = document.getElementById('order-reference');
      if (refInput && this.formData.reference) refInput.value = this.formData.reference;

      const tableInput = document.getElementById('order-table-number');
      if (tableInput && this.formData.tableNumber) tableInput.value = this.formData.tableNumber;

      const reasonInput = document.getElementById('order-reservation-reason') || document.getElementById('order-reservation-motive');
      if (reasonInput && (this.formData.reservationReason || this.formData.reservationMotive)) {
        reasonInput.value = this.formData.reservationReason || this.formData.reservationMotive;
      }

      const peopleInput = document.getElementById('order-reservation-people');
      if (peopleInput && this.formData.reservationPeople) peopleInput.value = this.formData.reservationPeople;

      const dateTimeInput = document.getElementById('order-reservation-datetime');
      if (dateTimeInput && this.formData.reservationDateTime) dateTimeInput.value = this.formData.reservationDateTime;

      const paymentSelect = document.getElementById('order-payment-method');
      if (paymentSelect && this.formData.paymentMethod) paymentSelect.value = this.formData.paymentMethod;

      const notesTextarea = document.getElementById('order-general-notes');
      if (notesTextarea && this.formData.notes) notesTextarea.value = this.formData.notes;
    } catch (err) {
      console.warn('Error restoring form data:', err);
    }
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

    // 2. Micro-animation on the button (+ pop without touching innerHTML to preserve React DOM)
    if (buttonElement) {
      buttonElement.classList.add('animate-pop');
      setTimeout(() => {
        buttonElement.classList.remove('animate-pop');
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
      }, 600);
    }

    // 4. Update floating cart widget and bounce cart icons
    await this.updateCartWidgets();
    this.animateCartIcons();

    // 5. Toast Notification
    this.toast.show(`¡"${menuItem.name}" añadido al carrito!`, 'success');
  }

  triggerFlyingParticle(sourceElement) {
    const targetFab = document.getElementById('cart-floating-fab') || document.querySelector('[data-action="open-cart"]');
    if (!sourceElement || !targetFab) return;

    const sourceRect = sourceElement.getBoundingClientRect();
    const targetRect = targetFab.getBoundingClientRect();

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
    try {
      const items = this.cartUseCases.getItems();
      const totals = await this.calculateTotalsUseCase.execute({
        items,
        deliveryZoneId: this.cartUseCases.getDeliveryZoneId(),
        packagingSelections: this.cartUseCases.getPackagingSelections(),
        orderType: this.orderType
      });

      // Update floating badges
      const floatingBadge = document.getElementById('floating-cart-badge');
      if (floatingBadge) {
        floatingBadge.textContent = totals.itemCount;
        floatingBadge.classList.toggle('hidden', totals.itemCount === 0);
      }

      const fabButton = document.getElementById('cart-floating-fab');
      if (fabButton) {
        fabButton.classList.toggle('hidden', totals.itemCount === 0);
      }

      const floatingTotal = document.getElementById('floating-cart-total');
      if (floatingTotal) {
        floatingTotal.textContent = totals.formattedGrandTotal;
      }

      const barBadge = document.getElementById('bar-cart-badge');
      if (barBadge) {
        barBadge.textContent = totals.itemCount;
      }

      const barTotal = document.getElementById('bar-cart-total');
      if (barTotal) {
        barTotal.textContent = totals.formattedGrandTotal;
      }

      const headerBadge = document.getElementById('header-cart-badge');
      if (headerBadge) {
        headerBadge.textContent = totals.itemCount;
        headerBadge.classList.toggle('hidden', totals.itemCount === 0);
      }
    } catch (err) {
      console.warn('Error updating cart widgets:', err);
    }
  }

  async openCart() {
    this.isOpen = true;
    await this.renderDrawer();
    document.body.classList.add('overflow-hidden');
  }

  closeCart() {
    this.isOpen = false;
    const backdrop = document.getElementById('cart-backdrop');
    const panel = document.getElementById('cart-drawer-panel');
    if (backdrop) {
      backdrop.classList.remove('opacity-100', 'pointer-events-auto');
      backdrop.classList.add('opacity-0', 'pointer-events-none');
    }
    if (panel) {
      panel.classList.remove('translate-x-0');
      panel.classList.add('translate-x-full');
    }
    document.body.classList.remove('overflow-hidden');
  }

  async renderDrawer() {
    if (this.isRenderingDrawer) return;
    this.isRenderingDrawer = true;

    try {
      // 0. Ensure drawerHostElement exists and is attached to DOM
      if (!this.drawerHostElement || !document.body.contains(this.drawerHostElement)) {
        this.drawerHostElement = document.getElementById('cart-drawer-container');
        if (!this.drawerHostElement) {
          this.drawerHostElement = document.createElement('div');
          this.drawerHostElement.id = 'cart-drawer-container';
          document.body.appendChild(this.drawerHostElement);
        }
      }

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
        if (backdrop) {
          backdrop.classList.remove('opacity-0', 'pointer-events-none');
          backdrop.classList.add('opacity-100', 'pointer-events-auto');
        }
        if (panel) {
          panel.classList.remove('translate-x-full');
          panel.classList.add('translate-x-0');
        }
      } else {
        const backdrop = document.getElementById('cart-backdrop');
        if (backdrop) {
          backdrop.classList.remove('opacity-100', 'pointer-events-auto');
          backdrop.classList.add('opacity-0', 'pointer-events-none');
        }
      }
    } catch (err) {
      console.error('Error rendering drawer:', err);
      // Fallback: If drawer rendering encounters an error, safely close cart to avoid black screen overlay
      this.closeCart();
    } finally {
      this.isRenderingDrawer = false;
    }
  }

  async submitOrder() {
    const items = this.cartUseCases.getItems();
    if (items.length === 0 && this.orderType !== 'reserva') {
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
    let customerPhone = '';
    let tableNumber = '';
    let reservationMotive = '';
    let reservationReason = '';
    let reservationPeople = '';
    let reservationDateTime = '';

    if (this.orderType === 'delivery') {
      const phoneInput = document.getElementById('order-customer-phone');
      customerPhone = phoneInput ? phoneInput.value.trim() : '';
      if (!customerPhone || customerPhone.length < 6) {
        this.toast.show('Por favor ingresa tu número telefónico / WhatsApp para coordinar la entrega', 'warning');
        if (phoneInput) phoneInput.focus();
        return;
      }

      const addressInput = document.getElementById('order-address');
      address = addressInput ? addressInput.value.trim() : '';
      if (!address) {
        this.toast.show('Por favor ingresa tu dirección para el delivery', 'warning');
        if (addressInput) addressInput.focus();
        return;
      }
      const refInput = document.getElementById('order-reference');
      reference = refInput ? refInput.value.trim() : '';
    } else if (this.orderType === 'reserva') {
      const phoneInput = document.getElementById('order-customer-phone');
      if (phoneInput) customerPhone = phoneInput.value.trim();

      const motiveInput = document.getElementById('order-reservation-reason') || document.getElementById('order-reservation-motive');
      reservationMotive = motiveInput ? motiveInput.value.trim() : (this.formData.reservationReason || this.formData.reservationMotive || '');
      reservationReason = reservationMotive;

      const peopleInput = document.getElementById('order-reservation-people');
      reservationPeople = peopleInput ? peopleInput.value.trim() : (this.formData.reservationPeople || '');
      if (!reservationPeople || parseInt(reservationPeople, 10) < 1) {
        this.toast.show('Por favor ingresa la cantidad de personas para la reserva', 'warning');
        if (peopleInput) peopleInput.focus();
        return;
      }

      const dateTimeInput = document.getElementById('order-reservation-datetime');
      reservationDateTime = dateTimeInput ? dateTimeInput.value.trim() : (this.formData.reservationDateTime || '');
      if (!reservationDateTime) {
        this.toast.show('Por favor ingresa la fecha y hora estimada para la reserva', 'warning');
        if (dateTimeInput) dateTimeInput.focus();
        return;
      }
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
      customerPhone,
      orderType: this.orderType,
      tableNumber,
      reservationMotive,
      reservationReason,
      reservationPeople,
      reservationDateTime,
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

    this.toast.show('¡Solicitud enviada! Abriendo WhatsApp para confirmar...', 'success');
    
    // Open official WhatsApp link
    window.open(orderResult.link, '_blank');

    setTimeout(() => {
      this.closeCart();
    }, 1200);
  }
}
