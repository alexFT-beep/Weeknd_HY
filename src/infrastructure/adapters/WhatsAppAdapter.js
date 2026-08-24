/**
 * Infrastructure Adapter: WhatsAppAdapter
 * Formats order payloads and dispatches them to WhatsApp Web/App with exact emojis and structure.
 */
export class WhatsAppAdapter {
  /**
   * @param {string} [defaultPhoneNumber] - e.g. 51961336674
   */
  constructor(defaultPhoneNumber = '51961336674') {
    this.defaultPhoneNumber = defaultPhoneNumber;
  }

  /**
   * Generates a formatted WhatsApp message and returns the click URL.
   * @param {Object} orderData
   * @returns {string} wa.me URL
   */
  generateWhatsAppLink(orderData) {
    const {
      customerName = 'Cliente',
      customerPhone = '',
      orderType = 'delivery', // 'delivery', 'salon', or 'reserva'
      tableNumber = '',
      deliveryZoneName = '',
      deliveryFee = 0,
      address = '',
      reference = '',
      reservationReason = '',
      reservationMotive = '',
      reservationPeople = '',
      reservationDateTime = '',
      notes = '',
      paymentMethod = 'Yape',
      items = [],
      packaging = [],
      subtotal = 0,
      grandTotal = 0,
      phoneNumber = this.defaultPhoneNumber
    } = orderData;

    let text = '';
    const effectiveReason = reservationReason || reservationMotive || '';

    if (orderType === 'reserva') {
      text += `🍹 *¡SOLICITUD DE RESERVA - WEEKND! Lounge & Restaurant* 🍗\n`;
      text += `━━━━━━━━━━━━━━━━━━━━━\n`;
      text += `👤 *Cliente:* ${customerName}\n`;
      if (customerPhone) {
        text += `📱 *Teléfono:* ${customerPhone}\n`;
      }
      text += `📅 *Fecha y Hora:* ${reservationDateTime || 'Por confirmar'}\n`;
      text += `👥 *Cant. Personas:* ${reservationPeople || 'N/A'}\n`;
      if (effectiveReason) {
        text += `🎉 *Motivo:* ${effectiveReason}\n`;
      }
      text += `💳 *Método de Pago Preferido:* ${paymentMethod}\n`;
      if (paymentMethod === 'Yape' || paymentMethod === 'Plin') {
        text += `📱 *Pago QR:* _(Por favor adjuntar comprobante si realiza abono previo)_\n`;
      }
      
      if (items.length > 0) {
        text += `━━━━━━━━━━━━━━━━━━━━━\n`;
        text += `🛒 *PLATOS PRE-SELECCIONADOS:*\n`;
        items.forEach((cartItem, idx) => {
          const itemSubtotal = cartItem.subtotal || (cartItem.item.price * cartItem.quantity);
          text += `${idx + 1}. *${cartItem.quantity}x* ${cartItem.item.name} (S/ ${itemSubtotal.toFixed(2)})\n`;
          if (cartItem.notes) {
            text += `   ↳ _✏️ Nota: ${cartItem.notes}_\n`;
          }
        });

        text += `━━━━━━━━━━━━━━━━━━━━━\n`;
        text += `💰 *TOTAL ESTIMADO: S/ ${Number(grandTotal).toFixed(2)}*\n`;
      }

      text += `━━━━━━━━━━━━━━━━━━━━━\n`;
      text += `📝 *Observaciones:* ${notes || 'Ninguna'}\n\n`;

      text += `📌 *POLÍTICAS DE RESERVA:*\n`;
      text += `• *Tolerancia de reserva:* 10 a 15 minutos; transcurrido este tiempo, la mesa pasará a estar disponible.\n`;
      text += `• *Restricción:* No se permite el ingreso de alimentos ni bebidas ajenos al establecimiento.\n\n`;
      text += `_¡Esperamos confirmar su mesa pronto!_ 🎉🥂🍽️`;
    } else {
      text += `🍹 *¡NUEVO PEDIDO - WEEKND! Lounge & Restaurant* 🍗\n`;
      text += `━━━━━━━━━━━━━━━━━━━━━\n`;
      text += `👤 *Cliente:* ${customerName}\n`;
      if (orderType === 'delivery' && customerPhone) {
        text += `📱 *Teléfono:* ${customerPhone}\n`;
      }
      text += `📋 *Tipo:* ${orderType === 'delivery' ? '🛵 Delivery' : `🍽️ En Salón (Mesa ${tableNumber || 'N/A'})`}\n`;
      
      if (orderType === 'delivery') {
        if (address) text += `🏠 *Dirección:* ${address}\n`;
        if (reference) text += `📌 *Referencia:* ${reference}\n`;
        if (deliveryZoneName) text += `📍 *Zona:* ${deliveryZoneName}\n`;
      }

      text += `💳 *Método de Pago:* ${paymentMethod}\n`;
      if (paymentMethod === 'Yape' || paymentMethod === 'Plin') {
        text += `📱 *Pago QR:* _(Por favor adjuntar comprobante de pago por este chat)_\n`;
      }
      text += `━━━━━━━━━━━━━━━━━━━━━\n`;
      text += `🛒 *DETALLE DEL PEDIDO:*\n`;

      items.forEach((cartItem, idx) => {
        const itemSubtotal = cartItem.subtotal || (cartItem.item.price * cartItem.quantity);
        text += `${idx + 1}. *${cartItem.quantity}x* ${cartItem.item.name} (S/ ${itemSubtotal.toFixed(2)})\n`;
        if (cartItem.notes) {
          text += `   ↳ _✏️ Nota: ${cartItem.notes}_\n`;
        }
      });

      if (packaging && packaging.length > 0) {
        text += `\n🥡 *Empaques:*\n`;
        packaging.forEach(p => {
          text += ` • ${p.quantity}x ${p.name} (S/ ${(p.price * p.quantity).toFixed(2)})\n`;
        });
      }

      text += `━━━━━━━━━━━━━━━━━━━━━\n`;
      text += `🍽️ *Subtotal:* S/ ${Number(subtotal).toFixed(2)}\n`;
      if (orderType === 'delivery' && deliveryFee > 0) {
        text += `🛵 *Delivery:* S/ ${Number(deliveryFee).toFixed(2)}\n`;
      }
      const packagingTotal = packaging ? packaging.reduce((acc, p) => acc + (p.price * p.quantity), 0) : 0;
      if (packagingTotal > 0) {
        text += `🥡 *Empaques:* S/ ${packagingTotal.toFixed(2)}\n`;
      }
      text += `💰 *TOTAL A PAGAR: S/ ${Number(grandTotal).toFixed(2)}*\n`;
      text += `━━━━━━━━━━━━━━━━━━━━━\n`;
      text += `📝 *Observaciones:* ${notes || 'Ninguna'}\n\n`;

      if (orderType === 'salon') {
        text += `📌 *POLÍTICAS DEL ESTABLECIMIENTO:*\n`;
        text += `• *Tolerancia de mesa:* 10 a 15 minutos; transcurrido este tiempo, la mesa pasará a estar disponible.\n`;
        text += `• *Restricción:* No se permite el ingreso de alimentos ni bebidas ajenos al establecimiento.\n\n`;
      }

      text += `_¡Muchas gracias por su preferencia!_ 🎉🍗🍹`;
    }

    const encodedText = encodeURIComponent(text);
    return `https://api.whatsapp.com/send/?phone=${phoneNumber}&text=${encodedText}&type=phone_number&app_absent=0`;
  }
}
