import { SECTION_THEMES } from "./ProductCardComponent.js";

/**
 * Presentation Component: CartDrawerComponent
 * Renders an ultra-colorful sliding drawer for cart review, colorful delivery calculation,
 * custom packaging, and direct WhatsApp order submission with radiant neon accents.
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
    orderType = "delivery"
  }) {
    const hasItems = items.length > 0;

    const ZONE_COLORS = {
      "casco-urbano": { hex: "#00E5FF", rgb: "0, 229, 255", icon: "🏙️" },
      "santo-domingo": { hex: "#D500F9", rgb: "213, 0, 249", icon: "⛪" },
      "la-victoria": { hex: "#FF007F", rgb: "255, 0, 127", icon: "🏆" },
      "buena-villa": { hex: "#FFB800", rgb: "255, 184, 0", icon: "🏡" },
      "puerto-huarmey": { hex: "#FF0033", rgb: "255, 0, 51", icon: "⚓" },
      "9-de-octubre": { hex: "#FF6D00", rgb: "255, 109, 0", icon: "🌅" }
    };

    const PKG_COLORS = {
      "tupper": { hex: "#00FFA3", rgb: "0, 255, 163", icon: "🍱" },
      "bolsa": { hex: "#FFB800", rgb: "255, 184, 0", icon: "🛍️" },
      "vaso": { hex: "#00E5FF", rgb: "0, 229, 255", icon: "🥤" }
    };

    return `
      <!-- Backdrop -->
      <div 
        id="cart-backdrop" 
        class="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 transition-opacity duration-300 opacity-0 pointer-events-none"
        data-action="close-cart"
      ></div>

      <!-- Drawer Panel -->
      <aside 
        id="cart-drawer-panel"
        class="fixed top-0 right-0 w-full max-w-lg h-full bg-zinc-950 border-l border-white/10 z-50 flex flex-col transform translate-x-full transition-transform duration-300 ease-out shadow-2xl"
      >
        <!-- Header with Glowing Neon Accent -->
        <div class="p-4 sm:p-5 border-b border-white/10 bg-zinc-900/90 flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-primary/20 border border-primary flex items-center justify-center text-primary shadow-[0_0_15px_rgba(10,204,128,0.4)]">
              <span class="material-symbols-outlined text-2xl">shopping_cart</span>
            </div>
            <div>
              <h2 class="text-base sm:text-lg font-black text-white uppercase tracking-tight">
                Tu Pedido <span class="text-primary">Weekend!</span>
              </h2>
              <span class="text-xs text-primary font-bold">
                ${totals.itemCount} ${totals.itemCount === 1 ? "producto" : "productos"} seleccionados
              </span>
            </div>
          </div>
          <button 
            type="button" 
            class="p-2 rounded-xl text-white/70 hover:text-primary hover:bg-zinc-800 transition-colors"
            data-action="close-cart"
            title="Cerrar Carrito"
          >
            <span class="material-symbols-outlined text-2xl">close</span>
          </button>
        </div>

        <!-- Body Content -->
        <div class="flex-1 overflow-y-auto custom-scrollbar p-4 sm:p-6 space-y-5">
          ${!hasItems ? `
            <div class="py-16 text-center flex flex-col items-center justify-center">
              <div class="w-20 h-20 rounded-full bg-zinc-900 flex items-center justify-center text-primary mb-4 border border-primary/30 shadow-[0_0_20px_rgba(10,204,128,0.2)]">
                <span class="material-symbols-outlined text-4xl">shopping_bag</span>
              </div>
              <h3 class="text-base font-bold text-white mb-1">Tu carrito está vacío</h3>
              <p class="text-xs text-white/60 max-w-xs mb-6">Explora nuestra carta y agrega tus alitas, hamburguesas, piqueos o tragos favoritos.</p>
              <button 
                type="button" 
                class="bg-primary text-black font-extrabold text-xs uppercase px-6 py-3 rounded-full hover:bg-primary-container transition-all active:scale-95 shadow-[0_0_15px_rgba(10,204,128,0.4)]"
                data-action="close-cart"
              >
                Ver la Carta
              </button>
            </div>
          ` : `
            <!-- Order Type Selector (Colorful Neon Tabs) -->
            <div class="bg-zinc-900/90 border border-white/10 rounded-2xl p-3 shadow-sm">
              <label class="block text-[11px] font-extrabold text-white/80 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <span>📋</span> Modalidad de Atención
              </label>
              <div class="grid grid-cols-2 gap-2 bg-zinc-950 p-1.5 rounded-xl border border-white/5">
                <button 
                  type="button"
                  data-action="set-order-type"
                  data-type="delivery"
                  class="py-2.5 px-3 rounded-lg text-xs font-black uppercase transition-all flex items-center justify-center gap-2 ${orderType === "delivery" ? "bg-primary text-black shadow-[0_0_15px_rgba(10,204,128,0.4)] scale-100" : "text-white/70 hover:text-primary hover:bg-zinc-900"}"
                >
                  <span class="text-sm">🛵</span> Delivery
                </button>
                <button 
                  type="button"
                  data-action="set-order-type"
                  data-type="salon"
                  class="py-2.5 px-3 rounded-lg text-xs font-black uppercase transition-all flex items-center justify-center gap-2 ${orderType === "salon" ? "bg-amber-400 text-black shadow-[0_0_15px_rgba(255,184,0,0.5)] scale-100" : "text-white/70 hover:text-amber-400 hover:bg-zinc-900"}"
                >
                  <span class="text-sm">🍽️</span> En Salón / Mesa
                </button>
              </div>
            </div>

            <!-- Items List with Section Neon Colors -->
            <div>
              <div class="flex justify-between items-center mb-3">
                <span class="text-xs font-extrabold text-white/80 uppercase tracking-wide flex items-center gap-1.5">
                  <span>🛒</span> Platos en tu Pedido
                </span>
                <button 
                  type="button" 
                  data-action="clear-cart"
                  class="text-[11px] text-red-400 hover:underline flex items-center gap-1 font-bold"
                >
                  <span class="material-symbols-outlined text-xs">delete_sweep</span> Vaciar todo
                </button>
              </div>

              <div class="space-y-3">
                ${items.map(ci => {
                  const theme = SECTION_THEMES[ci.item.category] || { hex: "#0ACC80", rgb: "10, 204, 128" };
                  return `
                    <div 
                      class="bg-zinc-900/90 border border-white/10 rounded-xl p-3 flex flex-col gap-2 transition-all hover:border-opacity-60"
                      style="border-left: 4px solid ${theme.hex};"
                    >
                      <div class="flex justify-between items-start">
                        <div class="flex-1 pr-2">
                          <h4 class="text-xs sm:text-sm font-black text-white uppercase leading-tight">${ci.item.name}</h4>
                          <span class="text-[11px] font-bold mt-0.5 block" style="color: ${theme.hex};">${ci.item.formattedPrice} c/u</span>
                        </div>
                        <span class="text-xs sm:text-sm font-price-display font-black text-white">
                          ${ci.formattedSubtotal}
                        </span>
                      </div>

                      <div class="flex justify-between items-center pt-2 border-t border-white/10">
                        <!-- Notes / customization input -->
                        <div class="flex-1 mr-2">
                          <input 
                            type="text" 
                            placeholder="Nota (ej: salsa aparte, sin picante...)"
                            value="${ci.notes || ""}"
                            data-action="update-item-notes"
                            data-cart-item-id="${ci.id}"
                            class="w-full text-[11px] bg-zinc-950 border border-white/10 rounded-lg px-2 py-1 text-white placeholder:text-white/40 focus:border-primary focus:outline-none"
                          />
                        </div>

                        <!-- Quantity Stepper -->
                        <div class="flex items-center gap-1.5 bg-zinc-950 border border-white/10 rounded-lg p-1">
                          <button 
                            type="button"
                            data-action="decrease-qty"
                            data-cart-item-id="${ci.id}"
                            class="w-6 h-6 rounded flex items-center justify-center text-white/60 hover:text-red-400 hover:bg-zinc-800 transition-colors"
                            title="Disminuir"
                          >
                            <span class="material-symbols-outlined text-[16px]">
                              ${ci.quantity === 1 ? "delete" : "remove"}
                            </span>
                          </button>
                          <span class="text-xs font-black min-w-[20px] text-center font-price-display" style="color: ${theme.hex};">
                            ${ci.quantity}
                          </span>
                          <button 
                            type="button"
                            data-action="increase-qty"
                            data-cart-item-id="${ci.id}"
                            class="w-6 h-6 rounded flex items-center justify-center text-white/60 hover:text-primary hover:bg-zinc-800 transition-colors"
                            title="Aumentar"
                          >
                            <span class="material-symbols-outlined text-[16px]">add</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  `;
                }).join("")}
              </div>
            </div>

            <!-- Delivery Zone Selection (Colorful Cards) -->
            ${orderType === "delivery" ? `
              <div class="bg-zinc-900/90 border border-cyan-500/30 rounded-2xl p-4 space-y-3 shadow-[0_0_20px_rgba(0,229,255,0.08)]">
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-2">
                    <span class="text-lg">📍</span>
                    <label class="text-xs font-black text-cyan-400 uppercase tracking-wider">Zona de Delivery (Huarmey)</label>
                  </div>
                  <span class="text-[10px] text-cyan-400/80 font-bold">Selecciona tu zona</span>
                </div>
                <div class="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  ${deliveryZones.map(zone => {
                    const isSelected = selectedDeliveryZoneId === zone.id;
                    const zTheme = ZONE_COLORS[zone.id] || { hex: "#00E5FF", rgb: "0, 229, 255", icon: "📍" };

                    let zoneStyle = "";
                    if (isSelected) {
                      zoneStyle = `border-color: ${zTheme.hex}; background-color: rgba(${zTheme.rgb}, 0.2); box-shadow: 0 0 12px rgba(${zTheme.rgb}, 0.4); transform: scale(1.02);`;
                    } else {
                      zoneStyle = `border-color: rgba(255,255,255,0.1); background-color: rgba(20,20,20,0.9);`;
                    }

                    return `
                      <button 
                        type="button"
                        data-action="select-delivery-zone"
                        data-zone-id="${zone.id}"
                        style="${zoneStyle}"
                        class="p-2.5 rounded-xl border text-left flex flex-col justify-between transition-all text-xs active:scale-95"
                      >
                        <div class="flex items-center gap-1 truncate mb-1">
                          <span class="text-xs">${zTheme.icon}</span>
                          <span class="font-bold text-white text-[11px] truncate">${zone.name}</span>
                        </div>
                        <span class="font-price-display font-extrabold text-xs" style="color: ${zTheme.hex};">
                          + S/ ${zone.fee.toFixed(2)}
                        </span>
                      </button>
                    `;
                  }).join("")}
                </div>
              </div>
            ` : ""}

            <!-- Packaging Charges (Empaques con colores neón) -->
            ${orderType === "delivery" ? `
              <div class="bg-zinc-900/90 border border-emerald-500/30 rounded-2xl p-4 space-y-3 shadow-[0_0_20px_rgba(0,255,163,0.08)]">
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-2">
                    <span class="text-lg">🥡</span>
                    <label class="text-xs font-black text-emerald-400 uppercase tracking-wider">Cargos de Empaque / Delivery</label>
                  </div>
                  <span class="text-[10px] text-white/50">*Según requerimiento</span>
                </div>
                <div class="space-y-2">
                  ${packagingOptions.map(opt => {
                    const qty = packagingSelections[opt.id] || 0;
                    const pTheme = PKG_COLORS[opt.id] || { hex: "#00FFA3", rgb: "0, 255, 163", icon: "📦" };

                    return `
                      <div class="flex items-center justify-between p-2.5 rounded-xl bg-zinc-950 border border-white/10 text-xs">
                        <div class="flex items-center gap-2">
                          <span class="text-base">${pTheme.icon}</span>
                          <div class="flex flex-col">
                            <span class="font-bold text-white">${opt.name}</span>
                            <span class="text-[11px] font-extrabold font-price-display" style="color: ${pTheme.hex};">
                              S/ ${opt.price.toFixed(2)} c/u
                            </span>
                          </div>
                        </div>
                        <div class="flex items-center gap-1.5 bg-zinc-900 border border-white/15 rounded-lg p-1">
                          <button 
                            type="button"
                            data-action="packaging-qty"
                            data-pkg-id="${opt.id}"
                            data-val="${qty - 1}"
                            class="w-6 h-6 rounded flex items-center justify-center text-white/60 hover:text-red-400 transition-colors"
                          >
                            <span class="material-symbols-outlined text-xs">remove</span>
                          </button>
                          <span class="text-xs font-black font-price-display px-2 text-white">${qty}</span>
                          <button 
                            type="button"
                            data-action="packaging-qty"
                            data-pkg-id="${opt.id}"
                            data-val="${qty + 1}"
                            class="w-6 h-6 rounded flex items-center justify-center text-white/60 hover:text-emerald-400 transition-colors"
                          >
                            <span class="material-symbols-outlined text-xs">add</span>
                          </button>
                        </div>
                      </div>
                    `;
                  }).join("")}
                </div>
              </div>
            ` : ""}

            <!-- Customer Details Form (Colorful Inputs) -->
            <div class="bg-zinc-900/90 border border-fuchsia-500/30 rounded-2xl p-4 space-y-3 shadow-[0_0_20px_rgba(213,0,249,0.08)]">
              <span class="text-xs font-black text-fuchsia-400 uppercase tracking-wider flex items-center gap-2">
                <span class="text-base">👤</span> Datos para la Entrega / Pedido
              </span>
              <div class="space-y-2.5 text-xs">
                <div>
                  <label class="block text-[10px] font-bold text-white/70 uppercase mb-1">👤 Nombre Completo *</label>
                  <input 
                    type="text" 
                    id="order-customer-name" 
                    placeholder="Ej: Alex Ramos" 
                    class="w-full bg-zinc-950 border border-cyan-500/40 rounded-xl px-3 py-2 text-white placeholder:text-white/40 focus:border-cyan-400 focus:shadow-[0_0_10px_rgba(0,229,255,0.3)] focus:outline-none"
                  />
                </div>
                ${orderType === "delivery" ? `
                  <div>
                    <label class="block text-[10px] font-bold text-white/70 uppercase mb-1">📍 Dirección Exacta *</label>
                    <input 
                      type="text" 
                      id="order-address" 
                      placeholder="Calle, Mz, Lt, Nro de casa" 
                      class="w-full bg-zinc-950 border border-orange-500/40 rounded-xl px-3 py-2 text-white placeholder:text-white/40 focus:border-orange-400 focus:shadow-[0_0_10px_rgba(255,109,0,0.3)] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label class="block text-[10px] font-bold text-white/70 uppercase mb-1">📌 Referencia de Ubicación</label>
                    <input 
                      type="text" 
                      id="order-reference" 
                      placeholder="Frente al parque, al lado de la tienda..." 
                      class="w-full bg-zinc-950 border border-lime-400/40 rounded-xl px-3 py-2 text-white placeholder:text-white/40 focus:border-lime-400 focus:shadow-[0_0_10px_rgba(204,255,0,0.3)] focus:outline-none"
                    />
                  </div>
                ` : `
                  <div>
                    <label class="block text-[10px] font-bold text-white/70 uppercase mb-1">🍽️ Número de Mesa *</label>
                    <input 
                      type="text" 
                      id="order-table-number" 
                      placeholder="Mesa N° (ej: Mesa 4)" 
                      class="w-full bg-zinc-950 border border-amber-400/40 rounded-xl px-3 py-2 text-white placeholder:text-white/40 focus:border-amber-400 focus:shadow-[0_0_10px_rgba(255,184,0,0.3)] focus:outline-none"
                    />
                  </div>
                `}
                <div>
                  <label class="block text-[10px] font-bold text-white/70 uppercase mb-1">💳 Método de Pago</label>
                  <select 
                    id="order-payment-method"
                    class="w-full bg-zinc-950 border border-blue-500/40 rounded-xl px-3 py-2 text-white focus:border-blue-400 focus:shadow-[0_0_10px_rgba(41,121,255,0.3)] focus:outline-none"
                  >
                    <option value="Yape">🟣 Yape (Billetera Digital)</option>
                    <option value="Plin">🔵 Plin (Billetera Digital)</option>
                    <option value="Efectivo">💵 Efectivo (Pago contraentrega)</option>
                    <option value="Tarjeta (POS)">💳 Tarjeta (POS Visa / Mastercard)</option>
                  </select>
                </div>
                <div>
                  <label class="block text-[10px] font-bold text-white/70 uppercase mb-1">📝 Observaciones para la Cocina</label>
                  <textarea 
                    id="order-general-notes"
                    rows="2" 
                    placeholder="Ej: salsas aparte, cubiertos descartables, etc." 
                    class="w-full bg-zinc-950 border border-pink-500/40 rounded-xl px-3 py-2 text-white placeholder:text-white/40 focus:border-pink-400 focus:shadow-[0_0_10px_rgba(255,0,127,0.3)] focus:outline-none resize-none"
                  ></textarea>
                </div>
              </div>
            </div>
          `}
        </div>

        <!-- Footer / Checkout Actions -->
        ${hasItems ? `
          <div class="p-4 sm:p-5 border-t border-white/10 bg-zinc-900 space-y-3">
            <!-- Price Breakdown -->
            <div class="space-y-1.5 text-xs">
              <div class="flex justify-between text-white/70">
                <span>🍽️ Subtotal Platos:</span>
                <span class="font-price-display text-white font-bold">S/ ${totals.subtotal.toFixed(2)}</span>
              </div>
              ${orderType === "delivery" && totals.deliveryFee > 0 ? `
                <div class="flex justify-between text-cyan-400 font-bold">
                  <span>🛵 Delivery (${totals.selectedZone ? totals.selectedZone.name : ""}):</span>
                  <span class="font-price-display">+ S/ ${totals.deliveryFee.toFixed(2)}</span>
                </div>
              ` : ""}
              ${totals.packagingFee > 0 ? `
                <div class="flex justify-between text-emerald-400 font-bold">
                  <span>🥡 Empaques:</span>
                  <span class="font-price-display">+ S/ ${totals.packagingFee.toFixed(2)}</span>
                </div>
              ` : ""}
              <div class="flex justify-between items-center pt-2.5 border-t border-white/10 text-sm sm:text-base font-black">
                <span class="text-white uppercase tracking-tight">Total a Pagar:</span>
                <span class="font-price-display text-primary text-xl sm:text-2xl font-black text-shadow-[0_0_15px_rgba(10,204,128,0.5)]">
                  S/ ${totals.grandTotal.toFixed(2)}
                </span>
              </div>
            </div>

            <!-- WhatsApp Checkout Button -->
            <button 
              type="button" 
              data-action="submit-whatsapp-order"
              class="w-full bg-gradient-to-r from-emerald-400 via-primary to-emerald-500 hover:brightness-110 text-black font-black uppercase py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(10,204,128,0.5)] active:scale-[0.98] transition-all text-xs sm:text-sm tracking-wider"
            >
              <span class="text-lg">💬</span>
              <span>Enviar Pedido a WhatsApp</span>
            </button>
          </div>
        ` : ""}
      </aside>
    `;
  }
}
