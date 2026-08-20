/**
 * Domain Entity: Category
 * Represents a menu category/section.
 */
export class Category {
  /**
   * @param {Object} params
   * @param {string} params.id
   * @param {string} params.name
   * @param {string} [params.icon]
   * @param {string} [params.description]
   */
  constructor({ id, name, icon = 'restaurant_menu', description = '' }) {
    this.id = id;
    this.name = name;
    this.icon = icon;
    this.description = description;
  }
}
