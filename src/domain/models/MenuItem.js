/**
 * Domain Entity: MenuItem
 * Represents a dish, combo, drink, or item in the Weekend! menu.
 */
export class MenuItem {
  /**
   * @param {Object} params
   * @param {string} params.id
   * @param {string} params.name
   * @param {number} params.price
   * @param {string} params.category
   * @param {string} [params.description]
   * @param {string} [params.image]
   * @param {string} [params.badge]
   * @param {boolean} [params.isFeatured]
   * @param {string} [params.subcategory]
   * @param {string[]} [params.options]
   * @param {number} [params.tapersCount]
   */
  constructor({ id, name, price, category, subcategory = '', description = '', image = '', badge = '', isFeatured = false, options = [], tapersCount = 1 }) {
    this.id = id;
    this.name = name;
    this.price = Number(price);
    this.category = category;
    this.subcategory = subcategory;
    this.description = description;
    this.image = image;
    this.badge = badge;
    this.isFeatured = isFeatured;
    this.options = options;
    this.tapersCount = Number(tapersCount) || 1;
  }

  get formattedPrice() {
    return `S/ ${this.price.toFixed(2)}`;
  }
}
