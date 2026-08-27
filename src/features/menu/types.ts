/**
 * @file types.ts
 * @description Tipos e interfaces de dominio para el catálogo de la carta digital,
 * filtros de productos y temas visuales de color neón por categoría.
 */

import { MenuItem, Category } from '../../data/fullMenuData';

/** Configuración de color neón (HEX y RGB) asignada a cada categoría */
export interface CategoryTheme {
  /** Código hexadecimal del color neón principal */
  readonly hex: string;
  /** Representación RGB (r, g, b) para efectos de transparencia y resplandor */
  readonly rgb: string;
}

/** Alias semántico para el tema de categoría neón */
export type NeonCategoryTheme = CategoryTheme;

/** Mapa indexado de temas neón por categoría */
export type SectionThemesMap = Record<string, CategoryTheme>;

/** Estado de los filtros activos en la carta digital */
export interface FilterState {
  /** ID de la categoría actualmente seleccionada */
  readonly categoryId: string;
  /** Texto de búsqueda ingresado por el usuario */
  readonly searchQuery: string;
}

