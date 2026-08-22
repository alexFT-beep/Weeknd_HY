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
              <span class="material-symbols-outlined text-2xl">shopping_cart</span>
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
            class="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
            data-action="close-cart"
            title="Cerrar Carrito"
            aria-label="Cerrar Carrito"
          >
            <span class="material-symbols-outlined text-2xl">close</span>
          </button>
        </div>

        <!-- Body Content -->
        <div class="flex-1 overflow-y-auto custom-scrollbar p-4 sm:p-5 space-y-4">
          ${!hasItems ? `
            <div class="py-16 text-center flex flex-col items-center justify-center">
              <div class="w-20 h-20 rounded-full bg-zinc-900 flex items-center justify-center text-zinc-500 mb-4 border border-zinc-800">
                <span class="material-symbols-outlined text-4xl">shopping_bag</span>
              </div>
              <h3 class="text-base font-bold text-white mb-1">Tu carrito está vacío</h3>
              <p class="text-xs text-zinc-400 max-w-xs mb-6">Explora nuestra carta y añade tus platos favoritos con el botón (+).</p>
              <button
                type="button"
                class="bg-primary text-black font-extrabold text-xs uppercase px-6 py-3 rounded-xl hover:bg-primary-container transition-all active:scale-95 shadow-md"
                data-action="go-to-menu"
                aria-label="Ver la Carta"
              >
                Ver la Carta
              </button>
            </div>
          ` : `
            <!-- Order Type Selector (Delivery vs En Salón vs Reserva) -->
            <div class="bg-[#18181b] border border-zinc-800 rounded-xl p-2.5">
              <label class="block text-[11px] font-bold text-zinc-400 uppercase tracking-wider mb-2">
                📋 Modalidad de Atención
              </label>
              <div class="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  data-action="set-order-type"
                  data-type="delivery"
                  class="py-2.5 px-2 rounded-lg text-[11px] sm:text-xs font-bold uppercase transition-all flex items-center justify-center gap-1 ${orderType === "delivery" ? "bg-primary text-black font-extrabold shadow-sm" : "bg-zinc-900 text-zinc-300 hover:text-white border border-zinc-800"}"
                  aria-label="Seleccionar Delivery"
                >
                  <span>🛵 Delivery</span>
                </button>
                <button
                  type="button"
                  data-action="set-order-type"
                  data-type="reserva"
                  class="py-2.5 px-2 rounded-lg text-[11px] sm:text-xs font-bold uppercase transition-all flex items-center justify-center gap-1 ${orderType === "reserva" ? "bg-primary text-black font-extrabold shadow-sm" : "bg-zinc-900 text-zinc-300 hover:text-white border border-zinc-800"}"
                  aria-label="Seleccionar Reserva"
                >
                  <span>🗓️ Reserva</span>
                </button>
              </div>
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
                  class="text-[11px] text-red-400 hover:underline flex items-center gap-1 font-semibold"
                  aria-label="Vaciar carrito"
                >
                  <span class="material-symbols-outlined text-xs">delete_sweep</span> Vaciar
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
                          class="w-6 h-6 rounded flex items-center justify-center text-zinc-400 hover:text-red-400 transition-colors"
                          title="Disminuir"
                          aria-label="Disminuir cantidad"
                        >
                          <span class="material-symbols-outlined text-[16px]">
                            ${ci.quantity === 1 ? "delete" : "remove"}
                          </span>
                        </button>
                        <span class="text-xs font-bold min-w-[18px] text-center font-price-display text-white">
                          ${ci.quantity}
                        </span>
                        <button
                          type="button"
                          data-action="increase-qty"
                          data-cart-item-id="${ci.id}"
                          class="w-6 h-6 rounded flex items-center justify-center text-zinc-400 hover:text-primary transition-colors"
                          title="Aumentar"
                          aria-label="Aumentar cantidad"
                        >
                          <span class="material-symbols-outlined text-[16px]">add</span>
                        </button>
                      </div>
                    </div>
                  </div>
                `).join("")}
              </div>
            </div>

            <!-- Nota de Aviso para Reservas -->
            ${orderType === "reserva" ? `
              <div class="bg-primary/10 border border-primary/40 rounded-xl p-3.5 space-y-2 text-zinc-200">
                <div class="flex items-center gap-2 text-primary font-black text-xs uppercase tracking-wide">
                  <span class="material-symbols-outlined text-base">info</span>
                  <span>📌 NOTA DE AVISO PARA RESERVAS:</span>
                </div>
                <p class="text-[11px] text-zinc-300 leading-relaxed">
                  Al enviar tu solicitud por WhatsApp, nuestro equipo verificará el motivo y cantidad de personas para confirmar la mejor ubicación en The Weekend Huarmey.
                </p>
                <div class="pt-2 border-t border-primary/20 space-y-1.5 text-[11px] leading-relaxed text-zinc-300">
                  <p class="flex items-start gap-1.5">
                    <span class="text-primary font-bold mt-0.5">•</span>
                    <span><span class="text-white font-semibold">Tolerancia de reserva:</span> 10 a 15 minutos; transcurrido este tiempo, la mesa pasará a estar disponible.</span>
                  </p>
                  <p class="flex items-start gap-1.5">
                    <span class="text-primary font-bold mt-0.5">•</span>
                    <span><span class="text-white font-semibold">Restricción:</span> No se permite el ingreso de alimentos ni bebidas ajenos al establecimiento.</span>
                  </p>
                </div>
              </div>
            ` : ""}

            <!-- Customer Details Form (Clean Dark Inputs) -->
            <div class="bg-[#18181b] border border-zinc-800 rounded-xl p-3.5 space-y-2.5">
              <label class="block text-xs font-bold text-white uppercase tracking-wide">
                ${orderType === "reserva" ? "🗓️ Datos para la Reserva" : "👤 Datos para el Pedido"}
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
                ${orderType === "delivery" ? `
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
                ` : `
                  <!-- Campos de Reserva -->
                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <input 
                      type="text" 
                      id="order-reservation-reason" 
                      placeholder="Motivo (ej: Cumpleaños)" 
                      class="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-white placeholder-zinc-500 focus:border-primary focus:outline-none"
                    />
                    <input 
                      type="number" 
                      id="order-reservation-people" 
                      placeholder="Cant. Personas *" 
                      min="1"
                      class="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-white placeholder-zinc-500 focus:border-primary focus:outline-none"
                    />
                  </div>
                  <div>
                    <input 
                      type="text" 
                      id="order-reservation-datetime" 
                      placeholder="Fecha y Hora estimada (ej: Hoy 8:30 PM) *" 
                      class="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-white placeholder-zinc-500 focus:border-primary focus:outline-none"
                    />
                  </div>
                `}
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
                    placeholder="Observaciones generales para cocina / reserva..." 
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
            <!-- Price Breakdown -->
            <div class="space-y-1 text-xs">
              <div class="flex justify-between text-zinc-400">
                <span>Subtotal Platos:</span>
                <span class="font-price-display text-white font-bold">S/ ${totals.subtotal.toFixed(2)}</span>
              </div>
              ${orderType === "delivery" && totals.deliveryFee > 0 ? `
                <div class="flex justify-between text-zinc-400">
                  <span>Delivery (${totals.selectedZone ? totals.selectedZone.name : ""}):</span>
                  <span class="font-price-display text-primary font-bold">+ S/ ${totals.deliveryFee.toFixed(2)}</span>
                </div>
              ` : ""}
              <div class="flex justify-between items-center pt-2 border-t border-zinc-800 text-sm sm:text-base font-black">
                <span class="text-white uppercase tracking-tight">Total a Pagar:</span>
                <span class="font-price-display text-primary text-xl sm:text-2xl font-black">
                  S/ ${totals.grandTotal.toFixed(2)}
                </span>
              </div>
            </div>

            <!-- WhatsApp Checkout Button -->
            <button
              type="button"
              data-action="submit-whatsapp-order"
              class="w-full bg-primary hover:bg-primary-container text-black font-black uppercase py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(10,204,128,0.4)] active:scale-[0.98] transition-all text-xs sm:text-sm tracking-wider"
              aria-label="${orderType === 'reserva' ? 'Enviar reserva por WhatsApp' : 'Enviar pedido por WhatsApp'}"
            >
              <span class="material-symbols-outlined text-xl">chat</span>
              <span>${orderType === 'reserva' ? 'Enviar Reserva a WhatsApp' : 'Enviar Pedido a WhatsApp'}</span>
            </button>
          </div>
        ` : ""}
      </aside>
    `;
  }
}
