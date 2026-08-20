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

    let packagingFee = 0;
    const packagingDetails = [];
    const packagingOptions = await this.menuRepository.getPackagingOptions();

    for (const opt of packagingOptions) {
      const qty = packagingSelections[opt.id] || 0;
      if (qty > 0) {
        const itemTotal = opt.price * qty;
        packagingFee += itemTotal;
        packagingDetails.push({
          id: opt.id,
          name: opt.name,
          price: opt.price,
          quantity: qty,
          total: itemTotal
        });
      }
    }

    const grandTotal = subtotal + deliveryFee + packagingFee;

    return {
      subtotal,
      deliveryFee,
      selectedZone,
      packagingFee,
      packagingDetails,
      grandTotal,
      itemCount: items.reduce((acc, ci) => acc + ci.quantity, 0)
    };
  }
}
