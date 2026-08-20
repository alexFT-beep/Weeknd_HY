export const SECTION_THEMES = {
  'alitas': { hex: '#FF6D00', rgb: '255, 109, 0' },
  'hamburguesas': { hex: '#FFE600', rgb: '255, 230, 0' },
  'broaster': { hex: '#FFB800', rgb: '255, 184, 0' },
  'salchipapas': { hex: '#CCFF00', rgb: '204, 255, 0' },
  'parrillas': { hex: '#FF0033', rgb: '255, 0, 51' },
  'piqueos': { hex: '#FF5722', rgb: '255, 87, 34' },
  'a-la-carta': { hex: '#FF3D00', rgb: '255, 61, 0' },
  'chifa': { hex: '#FF0055', rgb: '255, 0, 85' },
  'pastas': { hex: '#76FF03', rgb: '118, 255, 3' },
  'ensaladas': { hex: '#0ACC80', rgb: '10, 204, 128' },
  'makis': { hex: '#00FFA3', rgb: '0, 255, 163' },
  'jugos': { hex: '#FF007F', rgb: '255, 0, 127' },
  'bubble-tea': { hex: '#D500F9', rgb: '213, 0, 249' },
  'refrescos': { hex: '#00E5FF', rgb: '0, 229, 255' },
  'cocteles': { hex: '#2979FF', rgb: '41, 121, 255' },
  'cervezas': { hex: '#FFD600', rgb: '255, 214, 0' },
  'guarniciones': { hex: '#A0AEC0', rgb: '160, 174, 192' },
  'pago': { hex: '#0ACC80', rgb: '10, 204, 128' }
};

/**
 * Presentation Component: ProductCardComponent
 * Generates lightweight, performant HTML for dishes with dedicated interactive "+" button
 * styled with section-specific neon colors.
 */
export class ProductCardComponent {
  /**
   * Render a standard dish card
   * @param {import('../../domain/models/MenuItem.js').MenuItem} item
   * @returns {string} HTML string
   */
  static renderCard(item) {
    const theme = SECTION_THEMES[item.category] || SECTION_THEMES['alitas'];

    const badgeHtml = item.badge 
      ? `<span style="background-color: ${theme.hex}; color: #000; box-shadow: 0 0 10px rgba(${theme.rgb}, 0.5);" class="font-label-bold text-[9px] tracking-wider px-2 py-0.5 rounded-full uppercase mb-1.5 inline-block font-black">${item.badge}</span>`
      : '';

    return `
      <div 
        id="item-card-${item.id}"
        class="menu-card bg-surface-container-low border border-outline-variant/60 rounded-xl p-3.5 sm:p-4 flex flex-col justify-between text-left group relative overflow-hidden transition-all duration-150"
        data-item-id="${item.id}"
        style="--theme-neon: ${theme.hex};"
      >
        <div class="flex justify-between items-start gap-2 mb-1.5">
          <div class="flex-1 min-w-0">
            ${badgeHtml}
            <h3 class="text-label-bold font-label-bold text-on-surface uppercase group-hover:text-white transition-colors text-xs sm:text-sm leading-snug">
              ${item.name}
            </h3>
          </div>
          <div class="flex items-center gap-2 shrink-0">
            <span 
              class="text-price-display font-price-display whitespace-nowrap text-sm sm:text-base font-extrabold"
              style="color: ${theme.hex}; text-shadow: 0 0 10px rgba(${theme.rgb}, 0.35);"
            >
              ${item.formattedPrice}
            </span>
            <button 
              type="button"
              class="btn-add-item flex items-center justify-center w-8 h-8 rounded-lg border transition-all active:scale-90 shadow-sm"
              style="color: ${theme.hex}; border-color: ${theme.hex}80; background-color: rgba(${theme.rgb}, 0.12); box-shadow: 0 0 8px rgba(${theme.rgb}, 0.25);"
              title="Añadir ${item.name} al carrito"
              data-action="add-to-cart"
              data-item-id="${item.id}"
            >
              <span class="material-symbols-outlined text-[18px]">add</span>
            </button>
          </div>
        </div>
        ${item.description ? `<p class="text-[11px] sm:text-xs text-on-surface-variant leading-relaxed mt-1 line-clamp-2">${item.description}</p>` : ''}
      </div>
    `;
  }

  /**
   * Render a row-style item (ideal for Additional items, Guarniciones, etc.)
   * @param {import('../../domain/models/MenuItem.js').MenuItem} item
   * @returns {string} HTML string
   */
  static renderRow(item) {
    const theme = SECTION_THEMES[item.category] || SECTION_THEMES['alitas'];

    return `
      <div 
        id="item-card-${item.id}"
        class="menu-card flex justify-between items-center border-b border-dashed border-outline-variant/60 py-2.5 px-2 rounded-lg hover:bg-surface-container-low transition-colors group"
        data-item-id="${item.id}"
      >
        <div class="flex-1 pr-2 min-w-0">
          <div class="flex items-center gap-1.5 flex-wrap">
            <h4 class="text-xs sm:text-sm font-bold text-on-surface uppercase group-hover:text-white transition-colors">
              ${item.name}
            </h4>
            ${item.badge ? `<span style="background-color: rgba(${theme.rgb}, 0.2); color: ${theme.hex};" class="text-[9px] font-bold px-1.5 py-0.5 rounded">${item.badge}</span>` : ''}
          </div>
          ${item.description ? `<span class="text-[10px] sm:text-xs text-on-surface-variant block mt-0.5 truncate">${item.description}</span>` : ''}
        </div>
        <div class="flex items-center gap-2 shrink-0">
          <span 
            class="text-price-display font-price-display whitespace-nowrap text-xs sm:text-sm font-extrabold"
            style="color: ${theme.hex}; text-shadow: 0 0 8px rgba(${theme.rgb}, 0.3);"
          >
            ${item.formattedPrice}
          </span>
          <button 
            type="button"
            class="btn-add-item flex items-center justify-center w-7 h-7 rounded-lg border transition-all active:scale-90 shadow-sm"
            style="color: ${theme.hex}; border-color: ${theme.hex}80; background-color: rgba(${theme.rgb}, 0.12);"
            title="Añadir ${item.name} al carrito"
            data-action="add-to-cart"
            data-item-id="${item.id}"
          >
            <span class="material-symbols-outlined text-[16px]">add</span>
          </button>
        </div>
      </div>
    `;
  }
}

