/**
 * @file types.ts
 * @description Definiciones de tipos para el empaquetado de pedidos y envío a WhatsApp.
 */

import { CartItem, CustomerFormData, OrderType } from '../cart/types';
import { DeliveryZone } from '../../data/fullMenuData';

/** Payload de datos estructurados enviado al servicio de WhatsApp */
export interface OrderPayload {
  /** Lista inmutable de ítems comprados */
  readonly items: CartItem[];
  /** Tipo de pedido (delivery o mesa) */
  readonly orderType: OrderType;
  /** Zona de delivery configurada */
  readonly selectedZone: DeliveryZone;
  /** Datos personales y dirección del cliente */
  readonly customerData: CustomerFormData;
  /** Subtotal acumulado */
  readonly subtotal: number;
  /** Cantidad total de táperes */
  readonly totalTapers?: number;
  /** Costo acumulado por táperes */
  readonly taperFee?: number;
  /** Tarifa de envío */
  readonly deliveryFee: number;
  /** Total a pagar */
  readonly total: number;
}

/** Alias semántico para el payload del pedido de cliente */
export type CustomerCheckoutPayload = OrderPayload;

