/**
 * @file cartStorage.ts
 * @description Servicio de persistencia local (localStorage) para los elementos del carrito de compras de Weekend.
 * Incluye validación de esquema, límites de cuota (anti-DoS de storage) y codificación segura.
 */

import { CartItem } from '../types';

/** Clave de versión inmutable en localStorage */
const CART_STORAGE_KEY_NAME = 'weekend_cart_items_v2';
const MAX_CART_ITEMS = 50;
const MAX_PAYLOAD_BYTES = 20 * 1024; // 20 KB

/** Valida si un objeto deserializado cumple con la estructura estricta de CartItem */
function isValidCartItem(item: unknown): item is CartItem {
  if (!item || typeof item !== 'object') return false;
  const candidate = item as Partial<CartItem>;
  if (!candidate.product || typeof candidate.product !== 'object') return false;
  if (typeof candidate.product.id !== 'string' || !candidate.product.id || candidate.product.id.length > 50) return false;
  if (typeof candidate.product.name !== 'string' || !candidate.product.name || candidate.product.name.length > 100) return false;
  if (typeof candidate.product.price !== 'number' || isNaN(candidate.product.price) || candidate.product.price < 0 || candidate.product.price > 10000) return false;
  if (typeof candidate.quantity !== 'number' || !Number.isInteger(candidate.quantity) || candidate.quantity <= 0 || candidate.quantity > 99) return false;
  return true;
}

export const cartStorage = {
  /**
   * Carga la lista de ítems del carrito almacenados en localStorage con validación de tipo y decodificación.
   * @returns Lista validada de ítems o arreglo vacío si no existe o hay error de parseo.
   */
  loadCart(): CartItem[] {
    try {
      const storedDataString = localStorage.getItem(CART_STORAGE_KEY_NAME);
      if (!storedDataString || storedDataString.length > MAX_PAYLOAD_BYTES) {
        if (storedDataString && storedDataString.length > MAX_PAYLOAD_BYTES) {
          localStorage.removeItem(CART_STORAGE_KEY_NAME);
        }
        return [];
      }
      
      let jsonString = storedDataString;
      // Compatibilidad con codificación Base64
      if (storedDataString.startsWith('b64:')) {
        try {
          jsonString = decodeURIComponent(escape(atob(storedDataString.slice(4))));
        } catch {
          jsonString = storedDataString;
        }
      }

      const parsed = JSON.parse(jsonString);
      if (!Array.isArray(parsed)) return [];
      return parsed.slice(0, MAX_CART_ITEMS).filter(isValidCartItem);
    } catch {
      return [];
    }
  },

  /**
   * Guarda la lista actual de ítems del carrito en localStorage con límite de volumen y codificación.
   * @param cartItemsList Lista de ítems a serializar y guardar.
   */
  saveCart(cartItemsList: CartItem[]): void {
    try {
      const safeItems = cartItemsList.slice(0, MAX_CART_ITEMS).filter(isValidCartItem);
      const serialized = JSON.stringify(safeItems);
      if (serialized.length > MAX_PAYLOAD_BYTES) {
        return;
      }
      const encoded = 'b64:' + btoa(unescape(encodeURIComponent(serialized)));
      localStorage.setItem(CART_STORAGE_KEY_NAME, encoded);
    } catch {
      // Manejo silencioso ante modo incógnito estricto o cuota bloqueada
    }
  },

  /**
   * Elimina la clave del carrito en localStorage.
   */
  clearCart(): void {
    try {
      localStorage.removeItem(CART_STORAGE_KEY_NAME);
    } catch {
      // Ignorar error de acceso
    }
  }
};
