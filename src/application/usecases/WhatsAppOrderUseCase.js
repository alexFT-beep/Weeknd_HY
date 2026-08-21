/**
 * Application Use Case: WhatsAppOrderUseCase
 * Orchestrates totals calculation and delegates message generation to WhatsAppAdapter.
 */
export class WhatsAppOrderUseCase {
  /**
   * @param {import('./CalculateTotalsUseCase.js').CalculateTotalsUseCase} calculateTotalsUseCase
   * @param {import('../../infrastructure/adapters/WhatsAppAdapter.js').WhatsAppAdapter} whatsAppAdapter
   */
  constructor(calculateTotalsUseCase, whatsAppAdapter) {
    this.calculateTotalsUseCase = calculateTotalsUseCase;
    this.whatsAppAdapter = whatsAppAdapter;
  }

  async execute(orderInput) {
    const totals = await this.calculateTotalsUseCase.execute({
      items: orderInput.items,
      deliveryZoneId: orderInput.deliveryZoneId,
      packagingSelections: orderInput.packagingSelections,
      orderType: orderInput.orderType
    });

    const payload = {
      customerName: orderInput.customerName,
      orderType: orderInput.orderType,
      tableNumber: orderInput.tableNumber,
      reservationMotive: orderInput.reservationMotive,
      reservationPeople: orderInput.reservationPeople,
      reservationDateTime: orderInput.reservationDateTime,
      deliveryZoneName: totals.selectedZone ? totals.selectedZone.name : '',
      deliveryFee: totals.deliveryFee,
      address: orderInput.address,
      reference: orderInput.reference,
      notes: orderInput.notes,
      paymentMethod: orderInput.paymentMethod,
      items: orderInput.items,
      packaging: totals.packagingDetails,
      subtotal: totals.subtotal,
      grandTotal: totals.grandTotal,
      phoneNumber: orderInput.phoneNumber
    };

    const link = this.whatsAppAdapter.generateWhatsAppLink(payload);
    return {
      link,
      totals,
      payload
    };
  }
}
