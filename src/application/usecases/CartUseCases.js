import { CartItem } from '../../domain/models/CartItem.js';

/**
 * Application Use Cases: Cart Operations
 */
export class CartUseCases {
  /**
   * @param {import('../../domain/ports/ICartRepository.js').ICartRepository} cartRepository
   * @param {import('../../domain/ports/IMenuRepository.js').IMenuRepository} menuRepository
   */
  constructor(cartRepository, menuRepository) {
    this.cartRepository = cartRepository;
    this.menuRepository = menuRepository;
    this.items = [];
    this.selectedDeliveryZoneId = null;
    this.packagingSelections = {}; // { tupper: 1, bolsa: 1, vaso: 0 }
    this.orderSubmittedAt = null;
    this.expiryTimer = null;
    this.listeners = [];
  }

  subscribe(listener) {
    if (typeof listener === 'function') {
      this.listeners.push(listener);
    }
  }

  notifyListeners() {
    this.listeners.forEach(fn => {
      try {
        fn(this);
      } catch (err) {
        console.error('Error notifying cart listener:', err);
      }
    });
  }

  async initialize() {
    const rawCart = this.cartRepository.loadCart();
    this.selectedDeliveryZoneId = rawCart.deliveryZoneId || null;
    this.packagingSelections = rawCart.packaging || {};
    this.orderSubmittedAt = rawCart.orderSubmittedAt || null;

    if (this.orderSubmittedAt) {
      const elapsed = Date.now() - this.orderSubmittedAt;
      if (elapsed >= 5 * 60 * 1000) {
        this.clear();
        return;
      } else {
        // Set timeout for remaining time
        const remaining = (5 * 60 * 1000) - elapsed;
        this.scheduleAutoClear(remaining);
      }
    }

    if (Array.isArray(rawCart.items) && rawCart.items.length > 0) {
      const loadedItems = [];
      for (const saved of rawCart.items) {
        const menuItem = await this.menuRepository.getMenuItemById(saved.itemId);
        if (menuItem) {
          loadedItems.push(new CartItem({
            id: saved.id || menuItem.id,
            item: menuItem,
            quantity: saved.quantity,
            notes: saved.notes || '',
            selectedOption: saved.selectedOption || ''
          }));
        }
      }
      this.items = loadedItems;
    } else {
      this.items = [];
    }
    this.notifyListeners();
  }

  scheduleAutoClear(delayMs = 5 * 60 * 1000) {
    if (this.expiryTimer) {
      clearTimeout(this.expiryTimer);
    }
    this.expiryTimer = setTimeout(() => {
      this.clear();
      console.log('Weekend Cart: 5-minute post-order cache expiry completed. Cart reset.');
    }, Math.max(1000, delayMs));
  }

  markOrderSubmitted() {
    this.orderSubmittedAt = Date.now();
    this._persist();
    this.scheduleAutoClear(5 * 60 * 1000);
  }

  getItems() {
    return this.items;
  }

  getItemCount() {
    return this.items.reduce((total, cartItem) => total + cartItem.quantity, 0);
  }

  getSubtotal() {
    return this.items.reduce((total, cartItem) => total + cartItem.subtotal, 0);
  }

  addItem(menuItem, quantity = 1, notes = '', selectedOption = '') {
    // Reset orderSubmittedAt if customer adds items again
    this.orderSubmittedAt = null;
    if (this.expiryTimer) {
      clearTimeout(this.expiryTimer);
      this.expiryTimer = null;
    }

    const existingIndex = this.items.findIndex(
      ci => ci.item.id === menuItem.id && ci.notes === notes && ci.selectedOption === selectedOption
    );

    if (existingIndex > -1) {
      this.items[existingIndex].increment(quantity);
    } else {
      const newItem = new CartItem({
        id: `${menuItem.id}_${Date.now()}`,
        item: menuItem,
        quantity,
        notes,
        selectedOption
      });
      this.items.push(newItem);
    }

    this._persist();
    this.notifyListeners();
    return this.items;
  }

  updateQuantity(cartItemId, newQuantity) {
    const index = this.items.findIndex(ci => ci.id === cartItemId || ci.item.id === cartItemId);
    if (index > -1) {
      if (newQuantity <= 0) {
        this.items.splice(index, 1);
      } else {
        this.items[index].quantity = newQuantity;
      }
      this._persist();
      this.notifyListeners();
    }
    return this.items;
  }

  removeItem(cartItemId) {
    this.items = this.items.filter(ci => ci.id !== cartItemId && ci.item.id !== cartItemId);
    this._persist();
    this.notifyListeners();
    return this.items;
  }

  clear() {
    this.items = [];
    this.packagingSelections = {};
    this.selectedDeliveryZoneId = null;
    this.orderSubmittedAt = null;
    if (this.expiryTimer) {
      clearTimeout(this.expiryTimer);
      this.expiryTimer = null;
    }
    this.cartRepository.clearCart();
    this.notifyListeners();
    return this.items;
  }

  setDeliveryZone(zoneId) {
    this.selectedDeliveryZoneId = zoneId;
    this._persist();
    this.notifyListeners();
  }

  getDeliveryZoneId() {
    return this.selectedDeliveryZoneId;
  }

  setPackagingQuantity(optionId, qty) {
    if (qty <= 0) {
      delete this.packagingSelections[optionId];
    } else {
      this.packagingSelections[optionId] = qty;
    }
    this._persist();
    this.notifyListeners();
  }

  getPackagingSelections() {
    return this.packagingSelections;
  }

  _persist() {
    const payload = {
      items: this.items.map(ci => ({
        id: ci.id,
        itemId: ci.item.id,
        quantity: ci.quantity,
        notes: ci.notes,
        selectedOption: ci.selectedOption
      })),
      deliveryZoneId: this.selectedDeliveryZoneId,
      packaging: this.packagingSelections,
      orderSubmittedAt: this.orderSubmittedAt
    };
    this.cartRepository.saveCart(payload);
  }
}
