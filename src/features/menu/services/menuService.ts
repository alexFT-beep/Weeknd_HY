/**
 * @file menuService.ts
 * @description Servicio de consulta y filtrado del catálogo de productos de la carta digital de Weekend.
 */

import { MENU_CATEGORIES, FULL_MENU_ITEMS, Category, MenuItem } from '../../../data/fullMenuData';

export const menuService = {
  /**
   * Obtiene la lista completa de categorías del menú.
   */
  getCategories(): Category[] {
    return MENU_CATEGORIES;
  },

  /**
   * Obtiene todos los ítems registrados en el catálogo.
   */
  getAllItems(): MenuItem[] {
    return FULL_MENU_ITEMS;
  },

  /**
   * Filtra los platillos y bebidas pertenecientes a una categoría específica.
   * @param categoryId Identificador único de la categoría.
   */
  getItemsByCategory(categoryId: string): MenuItem[] {
    return FULL_MENU_ITEMS.filter(item => item.category === categoryId);
  },

  /**
   * Realiza una búsqueda difusa por nombre, descripción o categoría.
   * @param searchQueryText Consulta de búsqueda en texto plano.
   */
  searchItems(searchQueryText: string): MenuItem[] {
    const normalizedQuery = searchQueryText.trim().toLowerCase().slice(0, 80);
    if (!normalizedQuery) return FULL_MENU_ITEMS;

    return FULL_MENU_ITEMS.filter(
      item =>
        item.name.toLowerCase().includes(normalizedQuery) ||
        (item.description && item.description.toLowerCase().includes(normalizedQuery)) ||
        item.category.toLowerCase().includes(normalizedQuery)
    );
  }
};

