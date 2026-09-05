/**
 * @file cartStorage.ts
 * @description Servicio de persistencia local (localStorage) para los elementos del carrito de compras de Weekend.
 * Incluye validación de esquema en tiempo de ejecución para asegurar la integridad de datos.
 */

import { CartItem } from '../types';

/** Clave de versión inmutable en localStorage */
const CART_STORAGE_KEY_NAME = 'weekend_cart_items_v2';

/** Límite defensivo máximo de ítems distintos en el carrito */
const MAX_CART_ITEMS = 50;
/** Límite defensivo máximo de unidades por producto */
const MAX_ITEM_QUANTITY = 99;

/** Valida si un objeto deserializado cumple con la estructura mínima de CartItem */
function isValidCartItem(item: unknown): item is CartItem {
  if (!item || typeof item !== 'object') return false;
  const candidate = item as Partial<CartItem>;
  if (!candidate.product || typeof candidate.product !== 'object') return false;
  if (typeof candidate.product.id !== 'string' || !candidate.product.id || candidate.product.id.length > 100) return false;
  if (typeof candidate.product.name !== 'string' || !candidate.product.name || candidate.product.name.length > 200) return false;
  if (typeof candidate.product.price !== 'number' || isNaN(candidate.product.price) || candidate.product.price < 0 || candidate.product.price > 10000) return false;
  if (typeof candidate.quantity !== 'number' || !Number.isInteger(candidate.quantity) || candidate.quantity <= 0 || candidate.quantity > MAX_ITEM_QUANTITY) return false;
  return true;
}

export const cartStorage = {
  /**
   * Carga la lista de ítems del carrito almacenados en localStorage con validación de tipo y límites.
   * @returns Lista validada de ítems o arreglo vacío si no existe o hay error de parseo.
   */
  loadCart(): CartItem[] {
    try {
      const storedDataString = localStorage.getItem(CART_STORAGE_KEY_NAME);
      if (!storedDataString) return [];
      const parsed = JSON.parse(storedDataString);
      if (!Array.isArray(parsed)) return [];
      return parsed.slice(0, MAX_CART_ITEMS).filter(isValidCartItem);
    } catch (storageError) {
      console.warn('Error al cargar el carrito desde localStorage:', storageError);
      return [];
    }
  },

  /**
   * Guarda la lista actual de ítems del carrito en localStorage acotando el tamaño máximo.
   * @param cartItemsList Lista de ítems a serializar y guardar.
   */
  saveCart(cartItemsList: CartItem[]): void {
    try {
      const boundedList = cartItemsList.slice(0, MAX_CART_ITEMS);
      localStorage.setItem(CART_STORAGE_KEY_NAME, JSON.stringify(boundedList));
    } catch (storageError) {
      console.warn('Error al guardar el carrito en localStorage:', storageError);
    }
  },

  /**
   * Elimina la clave del carrito en localStorage.
   */
  clearCart(): void {
    try {
      localStorage.removeItem(CART_STORAGE_KEY_NAME);
    } catch (storageError) {
      console.warn('Error al limpiar el carrito en localStorage:', storageError);
    }
  }
};
