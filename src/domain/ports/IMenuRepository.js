/**
 * Port Interface: IMenuRepository
 * Contract for retrieving menu items, categories, delivery zones, and packaging options.
 */
export class IMenuRepository {
  async getCategories() {
    throw new Error('Method getCategories() must be implemented');
  }

  async getMenuItems(categoryId = null) {
    throw new Error('Method getMenuItems() must be implemented');
  }

  async getMenuItemById(id) {
    throw new Error('Method getMenuItemById() must be implemented');
  }

  async getDeliveryZones() {
    throw new Error('Method getDeliveryZones() must be implemented');
  }

  async getPackagingOptions() {
    throw new Error('Method getPackagingOptions() must be implemented');
  }
}
