/**
 * Presentation Component: CartDrawerComponent
 * Renders a clean, intuitive, and elegant drawer for order review, delivery calculation,
 * packaging options, and WhatsApp order submission with balanced styling.
 */
export class CartDrawerComponent {
  /**
   * @param {Object} params
   * @param {import("../../domain/models/CartItem.js").CartItem[]} params.items
   * @param {import("../../domain/models/DeliveryZone.js").DeliveryZone[]} params.deliveryZones
   * @param {import("../../domain/models/PackagingOption.js").PackagingOption[]} params.packagingOptions
   * @param {string|null} params.selectedDeliveryZoneId
   * @param {Object} params.packagingSelections
   * @param {Object} params.totals
   * @param {string} [params.orderType]
   * @returns {string} HTML string
   */
  static renderDrawer({
    items = [],
    deliveryZones = [],
    packagingOptions = [],
    selectedDeliveryZoneId = null,
    packagingSelections = {},
    totals = { subtotal: 0, deliveryFee: 0, packagingFee: 0, grandTotal: 0, itemCount: 0 },
    orderType = "delivery",
    isOpen = false
  }) {
    const hasItems = items.length > 0;

    return `
      <!-- Backdrop -->
      <div 
        id="cart-backdrop" 
        class="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 transition-opacity duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}"
        data-action="close-cart"
      ></div>

      <!-- Drawer Panel -->
      <aside 
        id="cart-drawer-panel"
        class="fixed top-0 right-0 w-full max-w-lg h-full bg-[#121214] border-l border-zinc-800 z-50 flex flex-col transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-out shadow-2xl text-white"
      >
        <!-- Header (Tu Pedido Weekend!) -->
        <div class="p-4 sm:p-5 border-b border-zinc-800 bg-[#18181b] flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-primary/15 border border-primary/60 flex items-center justify-center text-primary shadow-[0_0_12px_rgba(10,204,128,0.3)]">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
            </div>
            <div>
              <h2 class="text-base sm:text-lg font-black uppercase tracking-tight text-white">
                Tu Pedido <span class="text-primary font-black">Weekend!</span> 🍹🍗
              </h2>
              <span class="text-xs text-primary font-semibold">
                ${totals.itemCount} ${totals.itemCount === 1 ? "plato" : "platos"} en tu orden
              </span>
            </div>
          </div>
          <button
            type="button"
            class="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
            data-action="close-cart"
            title="Cerrar Carrito"
            aria-label="Cerrar Carrito"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>

        <!-- Body Content -->
        <div class="flex-1 overflow-y-auto custom-scrollbar p-4 sm:p-5 space-y-4">
          ${!hasItems ? `
            <div class="py-16 text-center flex flex-col items-center justify-center">
              <div class="w-20 h-20 rounded-full bg-zinc-900 flex items-center justify-center text-zinc-500 mb-4 border border-zinc-800">
                <svg xmlns="http://www.w3.org/2000/svg" width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
              </div>
              <h3 class="text-base font-bold text-white mb-1">Tu carrito está vacío</h3>
              <p class="text-xs text-zinc-400 max-w-xs mb-6">Explora nuestra carta y añade tus platos favoritos con el botón (+).</p>
              <button
                type="button"
                class="bg-primary text-black font-extrabold text-xs uppercase px-6 py-3 rounded-xl hover:bg-primary-container transition-all active:scale-95 shadow-md cursor-pointer"
                data-action="go-to-menu"
                aria-label="Ver la Carta"
              >
                Ver la Carta
              </button>
            </div>
          ` : `
            <!-- Delivery Info Badge -->
            <div class="bg-[#18181b] border border-zinc-800 rounded-xl p-3 flex items-center justify-between">
              <div class="flex items-center gap-2">
                <span class="text-base">🛵</span>
                <div>
                  <h4 class="text-xs font-bold text-white uppercase tracking-wide">Modalidad: Delivery</h4>
                  <p class="text-[10px] text-zinc-400">Entrega rápida a todo Huarmey</p>
                </div>
              </div>
              <span class="text-[10px] bg-primary text-black font-black px-2 py-0.5 rounded-full">ACTIVO</span>
            </div>

            <!-- Items List -->
            <div class="space-y-2">
              <div class="flex justify-between items-center px-1">
                <span class="text-xs font-bold text-zinc-400 uppercase tracking-wide">
                  🛒 Platos Seleccionados (${totals.itemCount})
                </span>
                <button
                  type="button"
                  data-action="clear-cart"
                  class="text-[11px] text-red-400 hover:underline flex items-center gap-1 font-semibold cursor-pointer"
                  aria-label="Vaciar carrito"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
                  <span>Vaciar</span>
                </button>
              </div>

              <div class="space-y-2.5">
                ${items.map(ci => `
                  <div class="bg-[#18181b] border border-zinc-800 rounded-xl p-3 flex flex-col gap-2">
                    <div class="flex justify-between items-start">
                      <div class="flex-1 pr-2">
                        <h4 class="text-xs sm:text-sm font-bold text-white uppercase leading-snug">${ci.item.name}</h4>
                        <span class="text-[11px] text-primary font-bold mt-0.5 block">${ci.item.formattedPrice} c/u</span>
                      </div>
                      <span class="text-xs sm:text-sm font-price-display font-bold text-white">
                        ${ci.formattedSubtotal}
                      </span>
                    </div>

                    <div class="flex justify-between items-center pt-2 border-t border-zinc-800/80 gap-2">
                      <input 
                        type="text" 
                        placeholder="Nota (ej: salsa aparte, sin picante...)"
                        value="${ci.notes || ""}"
                        data-action="update-item-notes"
                        data-cart-item-id="${ci.id}"
                        class="flex-1 text-[11px] bg-zinc-900 border border-zinc-800 rounded-lg px-2.5 py-1 text-white placeholder-zinc-500 focus:border-primary focus:outline-none"
                      />

                      <!-- Quantity Stepper -->
                      <div class="flex items-center gap-1 bg-zinc-900 border border-zinc-800 rounded-lg p-0.5 shrink-0">
                        <button
                          type="button"
                          data-action="decrease-qty"
                          data-cart-item-id="${ci.id}"
                          class="w-6 h-6 rounded flex items-center justify-center text-zinc-400 hover:text-red-400 transition-colors cursor-pointer"
                          title="Disminuir"
                          aria-label="Disminuir cantidad"
                        >
                          ${ci.quantity === 1 ? `
                            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
                          ` : `
                            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                          `}
                        </button>
                        <span class="text-xs font-bold min-w-[18px] text-center font-price-display text-white">
                          ${ci.quantity}
                        </span>
                        <button
                          type="button"
                          data-action="increase-qty"
                          data-cart-item-id="${ci.id}"
                          class="w-6 h-6 rounded flex items-center justify-center text-zinc-400 hover:text-white transition-colors cursor-pointer"
                          title="Aumentar"
                          aria-label="Aumentar cantidad"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                        </button>
                      </div>
                    </div>
                  </div>
                `).join("")}
              </div>
            </div>

            <!-- Customer Details Form (Clean Dark Inputs) -->
            <div class="bg-[#18181b] border border-zinc-800 rounded-xl p-3.5 space-y-2.5">
              <label class="block text-xs font-bold text-white uppercase tracking-wide">
                👤 Datos para el Delivery
              </label>
              <div class="space-y-2 text-xs">
                <div>
                  <input 
                    type="text" 
                    id="order-customer-name" 
                    placeholder="Tu Nombre completo *" 
                    class="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-white placeholder-zinc-500 focus:border-primary focus:outline-none"
                  />
                </div>
                <div>
                  <input 
                    type="tel" 
                    id="order-customer-phone" 
                    placeholder="Número telefónico / WhatsApp *" 
                    required
                    class="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-white placeholder-zinc-500 focus:border-primary focus:outline-none"
                  />
                </div>
                <div>
                  <input 
                    type="text" 
                    id="order-address" 
                    placeholder="Dirección exacta (Calle, Mz, Lt, Nro) *" 
                    class="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-white placeholder-zinc-500 focus:border-primary focus:outline-none"
                  />
                </div>
                <div>
                  <input 
                    type="text" 
                    id="order-reference" 
                    placeholder="Referencia de ubicación (ej: al frente de sanny)" 
                    class="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-white placeholder-zinc-500 focus:border-primary focus:outline-none"
                  />
                </div>
                <div>
                  <label class="block text-[10px] font-semibold text-zinc-400 mb-1">Método de Pago Preferido</label>
                  <select 
                    id="order-payment-method"
                    class="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-white focus:border-primary focus:outline-none text-xs"
                  >
                    <option value="Yape">Yape (QR / Billetera)</option>
                    <option value="Plin">Plin (QR / Billetera)</option>
                    <option value="Efectivo">Efectivo (Contraentrega)</option>
                    <option value="Tarjeta (POS)">Tarjeta (POS)</option>
                  </select>
                </div>
                <div>
                  <textarea 
                    id="order-general-notes"
                    rows="2" 
                    placeholder="Observaciones generales para cocina / delivery..." 
                    class="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-white placeholder-zinc-500 focus:border-primary focus:outline-none resize-none"
                  ></textarea>
                </div>
              </div>
            </div>
          `}
        </div>

        <!-- Footer / Checkout Actions -->
        ${hasItems ? `
          <div class="p-4 sm:p-5 border-t border-zinc-800 bg-[#18181b] space-y-3">
            <!-- Price Breakdown (Estilo Comanda Artesanal) -->
            <div class="space-y-1.5 text-xs bg-black/40 border border-zinc-800/90 rounded-xl p-3.5">
              <div class="flex justify-between text-zinc-300">
                <span>Subtotal Platos y Bebidas:</span>
                <span class="font-price-display text-white font-bold">S/ ${totals.subtotal.toFixed(2)}</span>
              </div>
              ${totals.packagingFee > 0 ? `
                <div class="flex justify-between text-zinc-300">
                  <span class="flex items-center gap-1.5">
                    <span class="text-amber-400">🥡</span>
                    <span>Tápers y Envases (+S/ 1.00 c/u):</span>
                  </span>
                  <span class="font-price-display text-amber-400 font-bold">+ S/ ${totals.packagingFee.toFixed(2)}</span>
                </div>
              ` : ''}
              ${orderType === "delivery" && totals.deliveryFee > 0 ? `
                <div class="flex justify-between text-zinc-300">
                  <span class="flex items-center gap-1.5">
                    <span class="text-primary">🛵</span>
                    <span>Delivery (${totals.selectedZone ? totals.selectedZone.name : "Huarmey"}):</span>
                  </span>
                  <span class="font-price-display text-primary font-bold">+ S/ ${totals.deliveryFee.toFixed(2)}</span>
                </div>
              ` : ""}
              <div class="flex justify-between items-center pt-2.5 mt-1 border-t border-zinc-800 text-sm sm:text-base font-black">
                <span class="text-white uppercase tracking-tight">Total a Pagar:</span>
                <span class="font-price-display text-primary text-xl sm:text-2xl font-black">
                  S/ ${totals.grandTotal.toFixed(2)}
                </span>
              </div>
            </div>

            <!-- WhatsApp Checkout Button con brillo metálico -->
            <button
              type="button"
              data-action="submit-whatsapp-order"
              class="w-full bg-primary hover:bg-white text-black font-black uppercase py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(10,204,128,0.5)] active:scale-[0.98] transition-all text-xs sm:text-sm tracking-wider cursor-pointer"
              aria-label="${orderType === 'reserva' ? 'Enviar reserva por WhatsApp' : 'Enviar pedido por WhatsApp'}"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
              <span>${orderType === 'reserva' ? 'Enviar Reserva a WhatsApp' : 'Enviar Pedido a WhatsApp'}</span>
            </button>
          </div>
        ` : ""}
      </aside>
    `;
  }
}
