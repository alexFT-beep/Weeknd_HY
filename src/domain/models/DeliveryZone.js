/**
 * Domain Entity: DeliveryZone
 * Represents a geographical delivery zone with its fee.
 */
export class DeliveryZone {
  /**
   * @param {Object} params
   * @param {string} params.id
   * @param {string} params.name
   * @param {number} params.fee
   */
  constructor({ id, name, fee }) {
    this.id = id;
    this.name = name;
    this.fee = Number(fee);
  }

  get formattedFee() {
    return `S/ ${this.fee.toFixed(2)}`;
  }
}
