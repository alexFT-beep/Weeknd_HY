/**
 * @file cartStorage.ts
 * @description Servicio de persistencia local (localStorage) para los elementos del carrito de compras de Weekend.
 */

import { CartItem } from '../types';

/** Clave de versión inmutable en localStorage */
const CART_STORAGE_KEY_NAME = 'weekend_cart_items_v2';

export const cartStorage = {
  /**
   * Carga la lista de ítems del carrito almacenados en localStorage.
   * @returns Lista de ítems o arreglo vacío si no existe o hay error de parseo.
   */
  loadCart(): CartItem[] {
    try {
      const storedDataString = localStorage.getItem(CART_STORAGE_KEY_NAME);
      return storedDataString ? JSON.parse(storedDataString) : [];
    } catch (storageError) {
      console.error('Error al cargar el carrito desde localStorage:', storageError);
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
      console.error('Error al guardar el carrito en localStorage:', storageError);
    }
  },

  /**
   * Elimina la clave del carrito en localStorage.
   */
  clearCart(): void {
    try {
      localStorage.removeItem(CART_STORAGE_KEY_NAME);
    } catch (storageError) {
      console.error('Error al limpiar el carrito en localStorage:', storageError);
    }
  }
};

