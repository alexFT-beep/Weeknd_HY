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

    // IDs de los únicos productos que requieren 2 tápers por unidad (S/ 2.00)
    const TWO_TAPER_PRODUCT_IDS = new Set([
      'combo-ronda',
      'combo-carrusel',
      'combo-ruleta'
    ]);

    // Regla de empaques: S/ 1.00 por cada táper requerido.
    // ÚNICAMENTE 'Ronda festival d sabores', 'Carrusel weekend' y 'Ruleta weekend' llevan 2 tápers c/u.
    // Todos los demás productos llevan 1 táper.
    let totalTapers = 0;
    for (const ci of items) {
      const qty = ci.quantity || 1;
      const itemId = ci.item?.id || ci.itemId || ci.id || '';
      const itemName = (ci.item?.name || ci.name || '').toLowerCase();

      const isTwoTaperItem =
        ci.item?.tapersCount === 2 ||
        TWO_TAPER_PRODUCT_IDS.has(itemId) ||
        itemName.includes('ronda festival') ||
        itemName.includes('carrusel weekend') ||
        itemName.includes('ruleta weekend');

      const tapersPerItem = isTwoTaperItem ? 2 : 1;
      totalTapers += qty * tapersPerItem;
    }

    let packagingFee = totalTapers * 1.00;
    const packagingDetails = [];

    if (totalTapers > 0) {
      packagingDetails.push({
        id: 'tapers-envases',
        name: 'Tápers y Envases (+S/ 1.00 c/u)',
        price: 1.00,
        quantity: totalTapers,
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
      totalTapers,
      formattedSubtotal: `S/ ${subtotal.toFixed(2)}`,
      formattedPackagingFee: `S/ ${packagingFee.toFixed(2)}`,
      formattedDeliveryFee: `S/ ${deliveryFee.toFixed(2)}`,
      formattedGrandTotal: `S/ ${grandTotal.toFixed(2)}`
    };
  }
}
