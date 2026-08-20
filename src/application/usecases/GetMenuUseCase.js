/**
 * Application Use Case: GetMenuUseCase
 */
export class GetMenuUseCase {
  /**
   * @param {import('../../domain/ports/IMenuRepository.js').IMenuRepository} menuRepository
   */
  constructor(menuRepository) {
    this.menuRepository = menuRepository;
  }

  async getFullMenu() {
    const [categories, items, deliveryZones, packagingOptions] = await Promise.all([
      this.menuRepository.getCategories(),
      this.menuRepository.getMenuItems(),
      this.menuRepository.getDeliveryZones(),
      this.menuRepository.getPackagingOptions()
    ]);

    return {
      categories,
      items,
      deliveryZones,
      packagingOptions
    };
  }

  async getItemsByCategory(categoryId) {
    return this.menuRepository.getMenuItems(categoryId);
  }

  async searchItems(query) {
    const allItems = await this.menuRepository.getMenuItems();
    if (!query || !query.trim()) return allItems;
    
    const cleanQuery = query.toLowerCase().trim();
    return allItems.filter(item => 
      item.name.toLowerCase().includes(cleanQuery) ||
      item.description.toLowerCase().includes(cleanQuery) ||
      item.category.toLowerCase().includes(cleanQuery)
    );
  }
}
