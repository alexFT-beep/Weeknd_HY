/**
 * Domain Entity: CartItem
 * Represents an item selected in the user's shopping cart.
 */
export class CartItem {
  /**
   * @param {Object} params
   * @param {string} params.id - Unique ID (e.g. item.id or item.id + selected notes)
   * @param {import('./MenuItem.js').MenuItem} params.item
   * @param {number} [params.quantity]
   * @param {string} [params.notes]
   * @param {string} [params.selectedOption]
   */
  constructor({ id, item, quantity = 1, notes = '', selectedOption = '' }) {
    this.id = id || item.id;
    this.item = item;
    this.quantity = Math.max(1, quantity);
    this.notes = notes;
    this.selectedOption = selectedOption;
  }

  get subtotal() {
    return this.item.price * this.quantity;
  }

  get formattedSubtotal() {
    return `S/ ${this.subtotal.toFixed(2)}`;
  }

  increment(amount = 1) {
    this.quantity += amount;
  }

  decrement(amount = 1) {
    this.quantity = Math.max(1, this.quantity - amount);
  }
}
