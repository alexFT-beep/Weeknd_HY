import { IMenuRepository } from '../../domain/ports/IMenuRepository.js';
import { MenuItem } from '../../domain/models/MenuItem.js';
import { Category } from '../../domain/models/Category.js';
import { DeliveryZone } from '../../domain/models/DeliveryZone.js';
import { PackagingOption } from '../../domain/models/PackagingOption.js';
import { InMemoryMenuRepository } from './InMemoryMenuRepository.js';

/**
 * Scalable Infrastructure Adapter: GraphQLMenuRepository
 * Connects seamlessly to Contentful (or any GraphQL Headless CMS) when Vercel Environment Variables are set.
 * Falls back to InMemoryMenuRepository if CMS credentials are missing or unreachable.
 */
export class GraphQLMenuRepository extends IMenuRepository {
  constructor() {
    super();
    this.fallbackRepository = new InMemoryMenuRepository();

    const spaceId = import.meta.env.VITE_CONTENTFUL_SPACE_ID;
    const accessToken = import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN;
    const customEndpoint = import.meta.env.VITE_CMS_GRAPHQL_URL;

    if (spaceId && accessToken) {
      this.endpoint = `https://graphql.contentful.com/content/v1/spaces/${spaceId}`;
      this.headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      };
      this.isCMSConfigured = true;
    } else if (customEndpoint) {
      this.endpoint = customEndpoint;
      this.headers = { 'Content-Type': 'application/json' };
      this.isCMSConfigured = true;
    } else {
      this.isCMSConfigured = false;
    }
  }

  async getCategories() {
    if (!this.isCMSConfigured) {
      return this.fallbackRepository.getCategories();
    }
    try {
      const query = `
        query GetCategories {
          categoryCollection {
            items {
              id
              name
              emoji
              color
              rgb
              description
            }
          }
        }
      `;
      const response = await fetch(this.endpoint, {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify({ query })
      });
      const result = await response.json();
      if (result.data?.categoryCollection?.items?.length) {
        return result.data.categoryCollection.items.map(cat => new Category(cat));
      }
      return this.fallbackRepository.getCategories();
    } catch (err) {
      console.warn('⚠️ CMS GraphQL error, falling back to local menu data:', err);
      return this.fallbackRepository.getCategories();
    }
  }

  async getMenuItems(categoryId = null) {
    if (!this.isCMSConfigured) {
      return this.fallbackRepository.getMenuItems(categoryId);
    }
    try {
      const query = `
        query GetMenuItems {
          menuItemCollection {
            items {
              id
              name
              price
              category
              subcategory
              description
              badge
              isFeatured
            }
          }
        }
      `;
      const response = await fetch(this.endpoint, {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify({ query })
      });
      const result = await response.json();
      if (result.data?.menuItemCollection?.items?.length) {
        const items = result.data.menuItemCollection.items.map(item => new MenuItem(item));
        if (!categoryId || categoryId === 'all') return items;
        return items.filter(item => item.category === categoryId);
      }
      return this.fallbackRepository.getMenuItems(categoryId);
    } catch (err) {
      console.warn('⚠️ CMS GraphQL error, falling back to local menu items:', err);
      return this.fallbackRepository.getMenuItems(categoryId);
    }
  }

  async getMenuItemById(id) {
    const allItems = await this.getMenuItems();
    return allItems.find(item => item.id === id) || null;
  }

  async getDeliveryZones() {
    return this.fallbackRepository.getDeliveryZones();
  }

  async getPackagingOptions() {
    return this.fallbackRepository.getPackagingOptions();
  }
}
