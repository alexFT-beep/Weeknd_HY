import { IMenuRepository } from '../../domain/ports/IMenuRepository.js';
import { MenuItem } from '../../domain/models/MenuItem.js';
import { Category } from '../../domain/models/Category.js';
import { DeliveryZone } from '../../domain/models/DeliveryZone.js';
import { PackagingOption } from '../../domain/models/PackagingOption.js';
import { MENU_CATEGORIES, FULL_MENU_ITEMS, DELIVERY_ZONES, PACKAGING_OPTIONS } from '../data/fullMenuData.js';

export class InMemoryMenuRepository extends IMenuRepository {
  constructor() {
    super();
    this.categories = MENU_CATEGORIES.map(cat => new Category(cat));
    this.menuItems = FULL_MENU_ITEMS.map(item => new MenuItem(item));
    this.deliveryZones = DELIVERY_ZONES.map(zone => new DeliveryZone(zone));
    this.packagingOptions = PACKAGING_OPTIONS.map(opt => new PackagingOption(opt));
  }

  async getCategories() {
    return this.categories;
  }

  async getMenuItems(categoryId = null) {
    if (!categoryId || categoryId === 'all') {
      return this.menuItems;
    }
    return this.menuItems.filter(item => item.category === categoryId);
  }

  async getMenuItemById(id) {
    return this.menuItems.find(item => item.id === id) || null;
  }

  async getDeliveryZones() {
    return this.deliveryZones;
  }

  async getPackagingOptions() {
    return this.packagingOptions;
  }
}
