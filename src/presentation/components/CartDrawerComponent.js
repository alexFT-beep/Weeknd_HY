/**
 * Presentation Component: CartDrawerComponent
 * Renders the sliding drawer for cart review, delivery calculation, packaging, and WhatsApp order submission.
 */
export class CartDrawerComponent {
  /**
   * @param {Object} params
   * @param {import('../../domain/models/CartItem.js').CartItem[]} params.items
   * @param {import('../../domain/models/DeliveryZone.js').DeliveryZone[]} params.deliveryZones
   * @param {import('../../domain/models/PackagingOption.js').PackagingOption[]} params.packagingOptions
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
    orderType = 'delivery'
  }) {
    const hasItems = items.length > 0;

    return `
      <!-- Backdrop -->
      <div 
        id="cart-backdrop" 
        class="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 transition-opacity duration-300 opacity-0 pointer-events-none"
        data-action="close-cart"
      ></div>

      <!-- Drawer Panel -->
      <aside 
        id="cart-drawer-panel"
        class="fixed top-0 right-0 w-full max-w-lg h-full bg-surface-container-low border-l border-outline-variant z-50 flex flex-col transform translate-x-full transition-transform duration-300 ease-out shadow-2xl"
      >
        <!-- Header -->
        <div class="p-4 sm:p-5 border-b border-outline-variant bg-surface-container flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-primary/15 border border-primary flex items-center justify-center text-primary">
              <span class="material-symbols-outlined text-2xl">shopping_cart</span>
            </div>
            <div>
              <h2 class="text-base sm:text-lg font-bold text-on-surface uppercase tracking-tight">Tu Pedido Weekend!</h2>
              <span class="text-xs text-primary font-medium">${totals.itemCount} ${totals.itemCount === 1 ? 'producto' : 'productos'} seleccionados</span>
            </div>
          </div>
          <button 
            type="button" 
            class="p-2 rounded-lg text-on-surface-variant hover:text-primary hover:bg-surface-variant transition-colors"
            data-action="close-cart"
            title="Cerrar Carrito"
          >
            <span class="material-symbols-outlined text-2xl">close</span>
          </button>
        </div>

        <!-- Body Content -->
        <div class="flex-1 overflow-y-auto custom-scrollbar p-4 sm:p-6 space-y-6">
          ${!hasItems ? `
            <div class="py-16 text-center flex flex-col items-center justify-center">
              <div class="w-20 h-20 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant mb-4 border border-outline-variant/40">
                <span class="material-symbols-outlined text-4xl opacity-50">shopping_bag</span>
              </div>
              <h3 class="text-base font-bold text-on-surface mb-1">Tu carrito está vacío</h3>
              <p class="text-xs text-on-surface-variant max-w-xs mb-6">Explora nuestra carta y agrega tus alitas, combos, piqueos o tragos favoritos.</p>
              <button 
                type="button" 
                class="bg-primary text-black font-label-bold text-xs uppercase px-6 py-3 rounded-full hover:bg-primary-container transition-all active:scale-95 shadow-md"
                data-action="close-cart"
              >
                Ver la Carta
              </button>
            </div>
          ` : `
            <!-- Order Type Selector -->
            <div>
              <label class="block text-xs font-bold text-on-surface-variant uppercase mb-2">Modalidad del Pedido</label>
              <div class="grid grid-cols-2 gap-2 bg-surface-container p-1 rounded-xl border border-outline-variant/60">
                <button 
                  type="button"
                  data-action="set-order-type"
                  data-type="delivery"
                  class="py-2.5 px-3 rounded-lg text-xs font-bold uppercase transition-all flex items-center justify-center gap-2 ${orderType === 'delivery' ? 'bg-primary text-black shadow-md' : 'text-on-surface hover:text-primary'}"
                >
                  <span class="material-symbols-outlined text-sm">moped</span> Delivery
                </button>
                <button 
                  type="button"
                  data-action="set-order-type"
                  data-type="salon"
                  class="py-2.5 px-3 rounded-lg text-xs font-bold uppercase transition-all flex items-center justify-center gap-2 ${orderType === 'salon' ? 'bg-primary text-black shadow-md' : 'text-on-surface hover:text-primary'}"
                >
                  <span class="material-symbols-outlined text-sm">restaurant</span> En Salón
                </button>
              </div>
            </div>

            <!-- Items List -->
            <div>
              <div class="flex justify-between items-center mb-3">
                <span class="text-xs font-bold text-on-surface-variant uppercase">Platos Seleccionados</span>
                <button 
                  type="button" 
                  data-action="clear-cart"
                  class="text-[11px] text-error hover:underline flex items-center gap-1"
                >
                  <span class="material-symbols-outlined text-xs">delete_sweep</span> Vaciar
                </button>
              </div>

              <div class="space-y-3">
                ${items.map(ci => `
                  <div class="bg-surface-container border border-outline-variant/50 rounded-xl p-3 flex flex-col gap-2">
                    <div class="flex justify-between items-start">
                      <div class="flex-1 pr-2">
                        <h4 class="text-xs sm:text-sm font-bold text-on-surface uppercase leading-tight">${ci.item.name}</h4>
                        <span class="text-[11px] text-primary font-medium">${ci.item.formattedPrice} c/u</span>
                      </div>
                      <span class="text-xs sm:text-sm font-price-display text-primary font-bold">
                        ${ci.formattedSubtotal}
                      </span>
                    </div>

                    <div class="flex justify-between items-center pt-2 border-t border-outline-variant/30">
                      <!-- Notes / customization indicator -->
                      <div class="flex-1 mr-2">
                        <input 
                          type="text" 
                          placeholder="Nota (ej: salsa aparte, sin picante...)"
                          value="${ci.notes || ''}"
                          data-action="update-item-notes"
                          data-cart-item-id="${ci.id}"
                          class="w-full text-[11px] bg-surface-container-lowest border border-outline-variant/40 rounded px-2 py-1 text-on-surface placeholder:text-on-surface-variant/50 focus:border-primary focus:outline-none"
                        />
                      </div>

                      <!-- Quantity Stepper -->
                      <div class="flex items-center gap-1.5 bg-surface-container-lowest border border-outline-variant rounded-lg p-1">
                        <button 
                          type="button"
                          data-action="decrease-qty"
                          data-cart-item-id="${ci.id}"
                          class="w-6 h-6 rounded flex items-center justify-center text-on-surface-variant hover:text-error hover:bg-surface-variant transition-colors"
                          title="Disminuir"
                        >
                          <span class="material-symbols-outlined text-[16px]">
                            ${ci.quantity === 1 ? 'delete' : 'remove'}
                          </span>
                        </button>
                        <span class="text-xs font-bold text-primary min-w-[20px] text-center font-price-display">
                          ${ci.quantity}
                        </span>
                        <button 
                          type="button"
                          data-action="increase-qty"
                          data-cart-item-id="${ci.id}"
                          class="w-6 h-6 rounded flex items-center justify-center text-on-surface-variant hover:text-primary hover:bg-surface-variant transition-colors"
                          title="Aumentar"
                        >
                          <span class="material-symbols-outlined text-[16px]">add</span>
                        </button>
                      </div>
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>

            <!-- Delivery Zone Selection (Only if delivery) -->
            ${orderType === 'delivery' ? `
              <div class="bg-surface-container/60 border border-outline-variant/70 rounded-xl p-4 space-y-3">
                <div class="flex items-center gap-2">
                  <span class="material-symbols-outlined text-primary text-lg">location_on</span>
                  <label class="text-xs font-bold text-primary uppercase">Zona de Delivery (Huarmey)</label>
                </div>
                <div class="grid grid-cols-2 gap-2">
                  ${deliveryZones.map(zone => {
                    const isSelected = selectedDeliveryZoneId === zone.id;
                    return `
                      <button 
                        type="button"
                        data-action="select-delivery-zone"
                        data-zone-id="${zone.id}"
                        class="p-2.5 rounded-lg border text-left flex flex-col justify-between transition-all text-xs ${isSelected ? 'border-primary bg-primary/15 shadow-sm' : 'border-outline-variant/60 bg-surface-container hover:border-primary/50'}"
                      >
                        <span class="font-bold text-on-surface text-[11px] truncate">${zone.name}</span>
                        <span class="font-price-display text-primary font-bold mt-1">+ S/ ${zone.fee.toFixed(2)}</span>
                      </button>
                    `;
                  }).join('')}
                </div>
              </div>
            ` : ''}

            <!-- Packaging Charges (Empaque) -->
            ${orderType === 'delivery' ? `
              <div class="bg-surface-container/60 border border-outline-variant/70 rounded-xl p-4 space-y-3">
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-2">
                    <span class="material-symbols-outlined text-primary text-lg">takeout_dining</span>
                    <label class="text-xs font-bold text-primary uppercase">Cargos de Empaque / Delivery</label>
                  </div>
                  <span class="text-[10px] text-on-surface-variant">*Según se requiera</span>
                </div>
                <div class="space-y-2">
                  ${packagingOptions.map(opt => {
                    const qty = packagingSelections[opt.id] || 0;
                    return `
                      <div class="flex items-center justify-between p-2 rounded-lg bg-surface-container border border-outline-variant/40 text-xs">
                        <div class="flex flex-col">
                          <span class="font-medium text-on-surface">${opt.name}</span>
                          <span class="text-[11px] text-primary font-price-display">S/ ${opt.price.toFixed(2)} c/u</span>
                        </div>
                        <div class="flex items-center gap-1.5 bg-surface-container-lowest border border-outline-variant rounded-lg p-0.5">
                          <button 
                            type="button"
                            data-action="packaging-qty"
                            data-pkg-id="${opt.id}"
                            data-val="${qty - 1}"
                            class="w-6 h-6 rounded flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors"
                          >
                            <span class="material-symbols-outlined text-xs">remove</span>
                          </button>
                          <span class="text-xs font-bold font-price-display px-1.5 text-on-surface">${qty}</span>
                          <button 
                            type="button"
                            data-action="packaging-qty"
                            data-pkg-id="${opt.id}"
                            data-val="${qty + 1}"
                            class="w-6 h-6 rounded flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors"
                          >
                            <span class="material-symbols-outlined text-xs">add</span>
                          </button>
                        </div>
                      </div>
                    `;
                  }).join('')}
                </div>
              </div>
            ` : ''}

            <!-- Customer Details Form -->
            <div class="bg-surface-container/60 border border-outline-variant/70 rounded-xl p-4 space-y-3">
              <span class="text-xs font-bold text-primary uppercase flex items-center gap-2">
                <span class="material-symbols-outlined text-lg">person</span> Datos para la Entrega / Pedido
              </span>
              <div class="space-y-2 text-xs">
                <div>
                  <input 
                    type="text" 
                    id="order-customer-name" 
                    placeholder="Tu Nombre completo *" 
                    class="w-full bg-surface-container-lowest border border-outline-variant rounded-lg px-3 py-2 text-on-surface placeholder:text-on-surface-variant/60 focus:border-primary focus:outline-none"
                  />
                </div>
                ${orderType === 'delivery' ? `
                  <div>
                    <input 
                      type="text" 
                      id="order-address" 
                      placeholder="Dirección exacta (Calle, Mz, Lt, Nro) *" 
                      class="w-full bg-surface-container-lowest border border-outline-variant rounded-lg px-3 py-2 text-on-surface placeholder:text-on-surface-variant/60 focus:border-primary focus:outline-none"
                    />
                  </div>
                  <div>
                    <input 
                      type="text" 
                      id="order-reference" 
                      placeholder="Referencia de ubicación" 
                      class="w-full bg-surface-container-lowest border border-outline-variant rounded-lg px-3 py-2 text-on-surface placeholder:text-on-surface-variant/60 focus:border-primary focus:outline-none"
                    />
                  </div>
                ` : `
                  <div>
                    <input 
                      type="text" 
                      id="order-table-number" 
                      placeholder="Número de Mesa *" 
                      class="w-full bg-surface-container-lowest border border-outline-variant rounded-lg px-3 py-2 text-on-surface placeholder:text-on-surface-variant/60 focus:border-primary focus:outline-none"
                    />
                  </div>
                `}
                <div>
                  <label class="block text-[11px] font-semibold text-on-surface-variant mb-1">Método de Pago</label>
                  <select 
                    id="order-payment-method"
                    class="w-full bg-surface-container-lowest border border-outline-variant rounded-lg px-3 py-2 text-on-surface focus:border-primary focus:outline-none"
                  >
                    <option value="Yape">Yape</option>
                    <option value="Plin">Plin</option>
                    <option value="Efectivo">Efectivo</option>
                    <option value="Tarjeta (POS)">Tarjeta (POS)</option>
                  </select>
                </div>
                <div>
                  <textarea 
                    id="order-general-notes"
                    rows="2" 
                    placeholder="Observaciones generales para la cocina..." 
                    class="w-full bg-surface-container-lowest border border-outline-variant rounded-lg px-3 py-2 text-on-surface placeholder:text-on-surface-variant/60 focus:border-primary focus:outline-none resize-none"
                  ></textarea>
                </div>
              </div>
            </div>
          `}
        </div>

        <!-- Footer / Checkout Actions -->
        ${hasItems ? `
          <div class="p-4 sm:p-5 border-t border-outline-variant bg-surface-container space-y-3">
            <!-- Price Breakdown -->
            <div class="space-y-1 text-xs">
              <div class="flex justify-between text-on-surface-variant">
                <span>Subtotal Comida:</span>
                <span class="font-price-display text-on-surface font-semibold">S/ ${totals.subtotal.toFixed(2)}</span>
              </div>
              ${orderType === 'delivery' && totals.deliveryFee > 0 ? `
                <div class="flex justify-between text-on-surface-variant">
                  <span>Delivery (${totals.selectedZone ? totals.selectedZone.name : ''}):</span>
                  <span class="font-price-display text-primary font-semibold">+ S/ ${totals.deliveryFee.toFixed(2)}</span>
                </div>
              ` : ''}
              ${totals.packagingFee > 0 ? `
                <div class="flex justify-between text-on-surface-variant">
                  <span>Empaques Adicionales:</span>
                  <span class="font-price-display text-primary font-semibold">+ S/ ${totals.packagingFee.toFixed(2)}</span>
                </div>
              ` : ''}
              <div class="flex justify-between items-center pt-2 border-t border-outline-variant/40 text-sm sm:text-base font-bold">
                <span class="text-on-surface uppercase font-label-bold">Total a Pagar:</span>
                <span class="font-price-display text-primary text-xl sm:text-2xl font-extrabold">
                  S/ ${totals.grandTotal.toFixed(2)}
                </span>
              </div>
            </div>

            <!-- WhatsApp Checkout Button -->
            <button 
              type="button" 
              data-action="submit-whatsapp-order"
              class="w-full bg-primary hover:bg-primary-container text-black font-label-bold uppercase py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(191,227,83,0.4)] hover:shadow-[0_0_30px_rgba(191,227,83,0.6)] active:scale-[0.98] transition-all font-extrabold text-sm tracking-wider"
            >
              <span class="material-symbols-outlined text-2xl">chat</span>
              <span>Enviar Pedido a WhatsApp</span>
            </button>
          </div>
        ` : ''}
      </aside>
    `;
  }
}
