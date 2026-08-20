/**
 * Port Interface: ICartRepository
 * Contract for cart persistence operations.
 */
export class ICartRepository {
  loadCart() {
    throw new Error('Method loadCart() must be implemented');
  }

  saveCart(cartData) {
    throw new Error('Method saveCart() must be implemented');
  }

  clearCart() {
    throw new Error('Method clearCart() must be implemented');
  }
}
