/**
 * @file whatsappOrderService.ts
 * @description Servicio de construcción y despacho de mensajes con formato profesional para la API de WhatsApp,
 * detallando el desglose de productos, modalidades de envío, montos y datos del cliente con sanitización de inputs.
 */

import { OrderPayload } from '../types';
import { PAYMENT_INFO } from '../../../data/fullMenuData';

/** Sanitiza texto eliminando caracteres de control peligrosos y limitando su longitud máxima */
function sanitizeText(str: string | undefined, maxLength = 200): string {
  if (!str) return '';
  return str
    .replace(/[\u0000-\u0008\u000B-\u000C\u000E-\u001F\u007F-\u009F]/g, '')
    .trim()
    .slice(0, maxLength);
}

export const whatsappOrderService = {
  /**
   * Genera el texto formateado en Markdown para la plantilla de pedido enviada por WhatsApp.
   * @param payload Datos estructurados del carrito, cliente y totales.
   * @returns Mensaje multilínea formateado con emojis y separadores.
   */
  buildWhatsAppMessage(payload: OrderPayload): string {
    const { items, orderType, selectedZone, customerData, subtotal, totalTapers, taperFee, deliveryFee, total } = payload;
    const isDeliveryOrder = orderType === 'delivery';

    const customerName = sanitizeText(customerData.customerName, 80);
    const phone = sanitizeText(customerData.phone, 20);
    const address = sanitizeText(customerData.address, 150);
    const reference = sanitizeText(customerData.reference, 150);
    const tableNumber = sanitizeText(customerData.tableNumber, 30);
    const paymentMethod = sanitizeText(customerData.paymentMethod, 50);
    const notes = sanitizeText(customerData.notes, 300);

    let formattedMessageText = `*🍔 ¡NUEVO PEDIDO WEEKEND! 🍹*\n\n`;
    formattedMessageText += `*TIPO:* ${isDeliveryOrder ? '🚀 DELIVERY A DOMICILIO' : '🍽️ CONSUMO EN MESA / RESTAURANTE'}\n`;
    formattedMessageText += `-------------------------------------------\n`;

    const safeItems = items.slice(0, 50);
    safeItems.forEach((item, index) => {
      const itemTotalFormatted = (item.product.price * item.quantity).toFixed(2);
      formattedMessageText += `*${index + 1}. ${item.product.name}*\n`;
      formattedMessageText += `   Cantidad: x${item.quantity}  |  Precio: S/ ${itemTotalFormatted}\n`;
      if (item.product.description) {
        formattedMessageText += `   _(${item.product.description})_\n`;
      }
      formattedMessageText += `\n`;
    });

    formattedMessageText += `-------------------------------------------\n`;
    formattedMessageText += `*RESUMEN DE CUENTA:*\n`;
    formattedMessageText += `• Subtotal Productos: S/ ${subtotal.toFixed(2)}\n`;

    if (taperFee && taperFee > 0) {
      formattedMessageText += `• Envases / Táperes (${totalTapers || 0} und): S/ ${taperFee.toFixed(2)}\n`;
    }

    if (isDeliveryOrder) {
      formattedMessageText += `• Costo Delivery (${selectedZone.name}): S/ ${deliveryFee.toFixed(2)}\n`;
    }

    formattedMessageText += `*• TOTAL A PAGAR: S/ ${total.toFixed(2)}*\n\n`;

    formattedMessageText += `-------------------------------------------\n`;
    formattedMessageText += `*DATOS DEL CLIENTE:*\n`;
    formattedMessageText += `👤 Nombre: ${customerName || 'No especificado'}\n`;
    formattedMessageText += `📱 Teléfono / WhatsApp: ${phone || 'No especificado'}\n`;

    if (isDeliveryOrder) {
      formattedMessageText += `📍 Dirección: ${address || 'No especificada'}\n`;
      formattedMessageText += `🏛️ Referencia: ${reference || 'Sin referencia'}\n`;
      formattedMessageText += `🛵 Zona Delivery: ${selectedZone.name}\n`;
    } else {
      formattedMessageText += `🪑 Número de Mesa: ${tableNumber || 'Por asignar en local'}\n`;
    }

    formattedMessageText += `💳 Método de Pago: ${paymentMethod}\n`;

    if (notes) {
      formattedMessageText += `📝 Indicaciones Especiales: ${notes}\n`;
    }

    formattedMessageText += `\n¡Gracias por elegir WEEKEND! Lounge & Restaurant! ⚡`;
    return formattedMessageText;
  },

  /**
   * Abre la API oficial de WhatsApp en una nueva pestaña del navegador pre-cargando el mensaje del pedido.
   * @param payload Datos del pedido a convertir en mensaje de WhatsApp.
   */
  sendOrderViaWhatsApp(payload: OrderPayload): void {
    let rawMessageText = this.buildWhatsAppMessage(payload);
    if (rawMessageText.length > 3500) {
      rawMessageText = rawMessageText.slice(0, 3450) + '\n... [Texto acotado por seguridad]';
    }
    const encodedMessageText = encodeURIComponent(rawMessageText);
    const whatsappApiUrl = `https://api.whatsapp.com/send?phone=${PAYMENT_INFO.whatsappNumber}&text=${encodedMessageText}`;
    window.open(whatsappApiUrl, '_blank', 'noopener,noreferrer');
  }
};
