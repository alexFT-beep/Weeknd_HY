/**
 * Presentation Component: CombosVoladoresComponent
 * Renders the Barcos de Alitas & Ronda section with modern cards for Dúo, Trío, Ruleta, Carrusel, and Ronda Festival.
 */
export class CombosVoladoresComponent {
  /**
   * @param {import('../../domain/models/MenuItem.js').MenuItem[]} comboItems
   * @returns {string} HTML string
   */
  static renderSection(comboItems) {
    const duo = comboItems.find(c => c.id === 'combo-duo');
    const trio = comboItems.find(c => c.id === 'combo-trio');
    const ruleta = comboItems.find(c => c.id === 'combo-ruleta');
    const carrusel = comboItems.find(c => c.id === 'combo-carrusel');
    const ronda = comboItems.find(c => c.id === 'combo-ronda');
    const salsas = comboItems.find(c => c.id === 'salsa-extra');

    const combos = [duo, trio, ruleta, carrusel, ronda].filter(Boolean);

    return `
      <section class="mb-xl px-2 sm:px-margin-mobile relative overflow-hidden py-lg pt-20" id="combos-voladores">
        <div class="flex items-center justify-between mb-lg">
          <div class="flex items-center gap-3">
            <span class="material-symbols-outlined text-primary text-3xl">military_tech</span>
            <div>
              <h2 class="text-headline-lg font-headline-lg text-primary tracking-tight uppercase text-2xl sm:text-3xl font-extrabold">
                Barcos &amp; Rondas de Alitas
              </h2>
              <p class="text-xs text-on-surface-variant mt-0.5">Las más pedidas...! Grandes barcos y combinaciones con papas y ensalada</p>
            </div>
          </div>
          <div class="h-px bg-outline-variant flex-1 ml-md hidden sm:block"></div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          ${combos.map(item => `
            <div 
              id="item-card-${item.id}"
              class="menu-card relative bg-surface-container-low border ${item.id === 'combo-ronda' ? 'border-primary/60 shadow-[0_0_20px_rgba(164,198,57,0.25)]' : 'border-outline-variant'} rounded-2xl p-5 flex flex-col justify-between text-left group overflow-hidden transition-all hover:border-primary"
              data-item-id="${item.id}"
            >
              <div class="relative z-10">
                <div class="flex justify-between items-center mb-2">
                  <div class="bg-primary text-black font-label-bold text-xs px-3 py-1 font-black rounded-md transform -skew-x-6">
                    ${item.name.toUpperCase()}
                  </div>
                  <button 
                    type="button"
                    class="btn-add-item flex items-center justify-center w-9 h-9 rounded-lg bg-primary text-black font-bold hover:scale-105 transition-all shadow-[0_0_12px_rgba(191,227,83,0.6)] active:scale-95"
                    title="Añadir ${item.name} al carrito"
                    data-action="add-to-cart"
                    data-item-id="${item.id}"
                  >
                    <span class="material-symbols-outlined text-[20px]">add</span>
                  </button>
                </div>

                ${item.badge ? `<span class="inline-block text-[11px] font-bold text-primary tracking-wide mb-1 uppercase">${item.badge}</span>` : ''}
                
                <p class="text-sm font-semibold text-on-surface mb-3 leading-snug">
                  ${item.description}
                </p>

                ${item.image ? `
                  <div class="combo-image-box h-44 w-full flex items-center justify-center overflow-hidden rounded-xl bg-surface-container/50 p-2 my-2">
                    <img 
                      alt="${item.name}" 
                      class="w-full h-full object-contain drop-shadow-[0_0_20px_rgba(164,198,57,0.5)] transform group-hover:scale-105 transition-transform duration-300" 
                      src="${item.image}"
                    />
                  </div>
                ` : `
                  <div class="combo-image-box h-44 w-full flex items-center justify-center rounded-xl bg-primary/5 border border-dashed border-primary/30 p-4 my-2">
                    <div class="text-center">
                      <span class="material-symbols-outlined text-primary text-5xl mb-2">sailing</span>
                      <p class="text-xs text-on-surface font-bold uppercase tracking-wider">${item.name}</p>
                      <p class="text-[11px] text-on-surface-variant mt-1">Elige tus salsas favoritas</p>
                    </div>
                  </div>
                `}
              </div>

              <div class="flex justify-between items-center mt-3 pt-3 border-t border-outline-variant/40">
                <span class="text-xs text-on-surface-variant font-medium">Precio:</span>
                <span class="text-price-display font-price-display text-primary text-xl font-black">
                  ${item.formattedPrice}
                </span>
              </div>
            </div>
          `).join('')}
        </div>

        <!-- Salsas Aparte Note -->
        ${salsas ? `
          <div class="mt-8 flex justify-center">
            <div class="bg-primary/10 border border-primary/40 p-4 rounded-2xl flex items-center justify-between gap-4 max-w-md w-full shadow-md">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center text-primary">
                  <span class="material-symbols-outlined text-2xl">liquor</span>
                </div>
                <div>
                  <span class="text-label-bold text-primary font-bold uppercase text-xs sm:text-sm block">Salsa Aparte (Pote)</span>
                  <span class="text-[11px] text-on-surface-variant">Pote adicional de cualquier salsa</span>
                </div>
              </div>
              <div class="flex items-center gap-3">
                <span class="font-price-display text-primary font-black text-lg sm:text-xl">S/ 6.00</span>
                <button 
                  type="button"
                  class="btn-add-item flex items-center justify-center w-8 h-8 rounded-lg bg-primary text-black font-bold hover:scale-105 transition-all shadow-sm active:scale-95"
                  title="Añadir Salsa en Pote"
                  data-action="add-to-cart"
                  data-item-id="${salsas.id}"
                >
                  <span class="material-symbols-outlined text-[18px]">add</span>
                </button>
              </div>
            </div>
          </div>
        ` : ''}
      </section>
    `;
  }
}
