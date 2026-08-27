/**
 * @file useMenu.ts
 * @description Custom Hook para la gestión del estado del catálogo gastronómico,
 * filtrado por categoría neón, búsqueda en tiempo real y asignación de temas cromáticos.
 */

import { useState, useMemo, useCallback } from 'react';
import { menuService } from '../services/menuService';
import { Category, MenuItem } from '../../../data/fullMenuData';
import { SectionThemesMap } from '../types';

/** Mapa de colores neón por categoría gastronómica */
export const SECTION_THEMES: SectionThemesMap = {
  alitas: { hex: "#FF6D00", rgb: "255, 109, 0" },
  hamburguesas: { hex: "#FFE600", rgb: "255, 230, 0" },
  broaster: { hex: "#FFB800", rgb: "255, 184, 0" },
  salchipapas: { hex: "#CCFF00", rgb: "204, 255, 0" },
  parrillas: { hex: "#FF0033", rgb: "255, 0, 51" },
  piqueos: { hex: "#FF5722", rgb: "255, 87, 34" },
  "a-la-carta": { hex: "#FF007F", rgb: "255, 0, 127" },
  marina: { hex: "#00B4D8", rgb: "0, 180, 216" },
  pastas: { hex: "#76FF03", rgb: "118, 255, 3" },
  ensaladas: { hex: "#0ACC80", rgb: "10, 204, 128" },
  makis: { hex: "#00FFA3", rgb: "0, 255, 163" },
  jugos: { hex: "#FF007F", rgb: "255, 0, 127" },
  "bubble-tea": { hex: "#D500F9", rgb: "213, 0, 249" },
  refrescos: { hex: "#00E5FF", rgb: "0, 229, 255" },
  guarniciones: { hex: "#A0AEC0", rgb: "160, 174, 192" }
};

/** Tema por defecto (Morado Neón Weekend) */
export const DEFAULT_THEME = { hex: "#C900FF", rgb: "201, 0, 255" };

/**
 * Hook para la carta digital que expone categorías, productos filtrados y temas cromáticos.
 */
export const useMenu = () => {
  const [activeCategory, setActiveCategory] = useState<string>("alitas");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const categories = useMemo<Category[]>(() => menuService.getCategories(), []);
  const allItems = useMemo<MenuItem[]>(() => menuService.getAllItems(), []);

  const filteredItems = useMemo<MenuItem[]>(() => {
    if (searchQuery.trim()) {
      return menuService.searchItems(searchQuery);
    }
    return menuService.getItemsByCategory(activeCategory);
  }, [activeCategory, searchQuery]);

  const itemsByCategory = useMemo<Record<string, MenuItem[]>>(() => {
    const categoryItemsMap: Record<string, MenuItem[]> = {};
    categories.forEach(categoryItem => {
      categoryItemsMap[categoryItem.id] = allItems.filter(item => item.category === categoryItem.id);
    });
    return categoryItemsMap;
  }, [categories, allItems]);

  const getThemeForCategory = useCallback((categoryId: string) => {
    return SECTION_THEMES[categoryId] || DEFAULT_THEME;
  }, []);

  return {
    categories,
    allItems,
    activeCategory,
    activeCategoryFilterId: activeCategory,
    setActiveCategory,
    searchQuery,
    searchQueryText: searchQuery,
    setSearchQuery,
    filteredItems,
    filteredMenuItemsList: filteredItems,
    itemsByCategory,
    getThemeForCategory
  };
};

/** Alias semántico del hook */
export const useMenuCatalog = useMenu;

