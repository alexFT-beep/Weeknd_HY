/**
 * @file cartStorage.ts
 * @description Servicio de persistencia local (localStorage) para los elementos del carrito de compras de Weekend.
 * Incluye validación de esquema en tiempo de ejecución para asegurar la integridad de datos.
 */

import { CartItem } from '../types';

/** Clave de versión inmutable en localStorage */
const CART_STORAGE_KEY_NAME = 'weekend_cart_items_v2';

/** Valida si un objeto deserializado cumple con la estructura mínima de CartItem */
function isValidCartItem(item: unknown): item is CartItem {
  if (!item || typeof item !== 'object') return false;
  const candidate = item as Partial<CartItem>;
  if (!candidate.product || typeof candidate.product !== 'object') return false;
  if (typeof candidate.product.id !== 'string' || !candidate.product.id) return false;
  if (typeof candidate.product.name !== 'string' || !candidate.product.name) return false;
  if (typeof candidate.product.price !== 'number' || isNaN(candidate.product.price) || candidate.product.price < 0) return false;
  if (typeof candidate.quantity !== 'number' || !Number.isInteger(candidate.quantity) || candidate.quantity <= 0) return false;
  return true;
}

export const cartStorage = {
  /**
   * Carga la lista de ítems del carrito almacenados en localStorage con validación de tipo.
   * @returns Lista validada de ítems o arreglo vacío si no existe o hay error de parseo.
   */
  loadCart(): CartItem[] {
    try {
      const storedDataString = localStorage.getItem(CART_STORAGE_KEY_NAME);
      if (!storedDataString) return [];
      const parsed = JSON.parse(storedDataString);
      if (!Array.isArray(parsed)) return [];
      return parsed.filter(isValidCartItem);
    } catch (storageError) {
      console.warn('Error al cargar el carrito desde localStorage:', storageError);
      return [];
    }
  },

  /**
   * Guarda la lista actual de ítems del carrito en localStorage.
   * @param cartItemsList Lista de ítems a serializar y guardar.
   */
  saveCart(cartItemsList: CartItem[]): void {
    try {
      localStorage.setItem(CART_STORAGE_KEY_NAME, JSON.stringify(cartItemsList));
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
