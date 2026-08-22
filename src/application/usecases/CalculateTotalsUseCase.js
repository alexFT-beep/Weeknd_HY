/**
 * Application Use Case: CalculateTotalsUseCase
 * Computes subtotal, delivery fee, packaging fee, discounts (if any), and grand total.
 */
export class CalculateTotalsUseCase {
  /**
   * @param {import('../../domain/ports/IMenuRepository.js').IMenuRepository} menuRepository
   */
  constructor(menuRepository) {
    this.menuRepository = menuRepository;
  }

  async execute({ items = [], deliveryZoneId = null, packagingSelections = {}, orderType = 'delivery' }) {
    const subtotal = items.reduce((acc, cartItem) => acc + cartItem.subtotal, 0);

    let deliveryFee = 0;
    let selectedZone = null;

    if (orderType === 'delivery' && deliveryZoneId) {
      const zones = await this.menuRepository.getDeliveryZones();
      selectedZone = zones.find(z => z.id === deliveryZoneId);
      if (selectedZone) {
        deliveryFee = selectedZone.fee;
      }
    }

    const itemCount = items.reduce((acc, ci) => acc + ci.quantity, 0);

    // Regla de empaques: S/ 1.00 por cada plato a la carta o envase de bebida
    let packagingFee = itemCount * 1.00;
    const packagingDetails = [];

    if (itemCount > 0) {
      packagingDetails.push({
        id: 'tapers-envases',
        name: 'Tápers y Envases (+S/ 1.00 c/u)',
        price: 1.00,
        quantity: itemCount,
        total: packagingFee
      });
    }

    const grandTotal = subtotal + deliveryFee + packagingFee;

    return {
      subtotal,
      deliveryFee,
      selectedZone,
      packagingFee,
      packagingDetails,
      grandTotal,
      itemCount,
      formattedSubtotal: `S/ ${subtotal.toFixed(2)}`,
      formattedPackagingFee: `S/ ${packagingFee.toFixed(2)}`,
      formattedDeliveryFee: `S/ ${deliveryFee.toFixed(2)}`,
      formattedGrandTotal: `S/ ${grandTotal.toFixed(2)}`
    };
  }
}
