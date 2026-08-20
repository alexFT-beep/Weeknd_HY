import { ICartRepository } from '../../domain/ports/ICartRepository.js';

export class LocalStorageCartRepository extends ICartRepository {
  constructor(storageKey = 'weekend_cart_v1') {
    super();
    this.storageKey = storageKey;
  }

  loadCart() {
    try {
      const data = localStorage.getItem(this.storageKey);
      if (!data) return { items: [], deliveryZoneId: null, packaging: {}, orderSubmittedAt: null };
      const parsed = JSON.parse(data);
      
      // Auto-clear if 5 minutes (300,000 ms) elapsed since WhatsApp submission
      if (parsed.orderSubmittedAt) {
        const elapsed = Date.now() - parsed.orderSubmittedAt;
        if (elapsed >= 5 * 60 * 1000) {
          this.clearCart();
          return { items: [], deliveryZoneId: null, packaging: {}, orderSubmittedAt: null };
        }
      }
      return parsed;
    } catch (e) {
      console.warn('Could not load cart from localStorage', e);
      return { items: [], deliveryZoneId: null, packaging: {}, orderSubmittedAt: null };
    }
  }

  saveCart(cartData) {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(cartData));
    } catch (e) {
      console.warn('Could not save cart to localStorage', e);
    }
  }

  clearCart() {
    try {
      localStorage.removeItem(this.storageKey);
    } catch (e) {
      console.warn('Could not clear cart in localStorage', e);
    }
  }
}
