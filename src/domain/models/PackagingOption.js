/**
 * Domain Entity: PackagingOption
 * Represents packaging charges for delivery orders (tupper, biodegradable bag, cup).
 */
export class PackagingOption {
  /**
   * @param {Object} params
   * @param {string} params.id
   * @param {string} params.name
   * @param {number} params.price
   * @param {number} [params.quantity]
   * @param {boolean} [params.isSelected]
   */
  constructor({ id, name, price = 1.0, quantity = 0, isSelected = false }) {
    this.id = id;
    this.name = name;
    this.price = Number(price);
    this.quantity = quantity;
    this.isSelected = isSelected;
  }

  get total() {
    return this.isSelected ? this.price * (this.quantity || 1) : 0;
  }

  get formattedPrice() {
    return `S/ ${this.price.toFixed(2)}`;
  }
}
