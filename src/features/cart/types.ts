/**
 * @file types.ts
 * @description Definiciones de tipos e interfaces del dominio del carrito de compras y pedidos en Weekend Huarmey.
 */

import { MenuItem, DeliveryZone } from '../../data/fullMenuData';

/** Modalidad de entrega del pedido */
export type OrderType = 'delivery' | 'mesa';

/** Ítem individual almacenado en el carrito de compras */
export interface CartItem {
  /** Producto inmutable seleccionado del menú */
  readonly product: MenuItem;
  /** Cantidad seleccionada por el cliente */
  readonly quantity: number;
}

/** Alias para alineación semántica con el estándar de nombres */
export type CartItemModel = CartItem;

/** Datos del formulario del cliente para el procesamiento del pedido */
export interface CustomerFormData {
  /** Nombre completo del cliente */
  readonly customerName: string;
  /** Teléfono o WhatsApp de contacto */
  readonly phone: string;
  /** Dirección física de entrega para pedidos tipo delivery */
  readonly address: string;
  /** Referencia visual o punto de llegada */
  readonly reference: string;
  /** Número de mesa para pedidos en el local */
  readonly tableNumber: string;
  /** Método de pago seleccionado */
  readonly paymentMethod: string;
  /** Notas especiales o requerimientos adicionales */
  readonly notes: string;
}

/** Desglose de totales financieros del pedido */
export interface CartTotals {
  /** Subtotal acumulado de los productos sin táper ni delivery */
  readonly subtotal: number;
  /** Cantidad total de envases/táperes requeridos */
  readonly totalTapers: number;
  /** Costo acumulado por concepto de táperes (S/ 1.00 por táper) */
  readonly taperFee: number;
  /** Tarifa de envío asociada a la zona seleccionada */
  readonly deliveryFee: number;
  /** Monto final a pagar */
  readonly total: number;
}

