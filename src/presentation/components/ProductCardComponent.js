/**
 * Presentation Component: ProductCardComponent
 * Generates HTML for dishes with dedicated interactive "+" button.
 */
export class ProductCardComponent {
  /**
   * Render a standard dish card
   * @param {import('../../domain/models/MenuItem.js').MenuItem} item
   * @returns {string} HTML string
   */
  static renderCard(item) {
    const badgeHtml = item.badge 
      ? `<span class="bg-primary text-black font-label-bold text-[10px] tracking-wider px-2 py-0.5 rounded-full uppercase mb-1 inline-block">${item.badge}</span>`
      : '';

    return `
      <div 
        id="item-card-${item.id}"
        class="menu-card bg-surface-container-low border border-outline-variant rounded-xl p-4 flex flex-col justify-between text-left group relative overflow-hidden"
        data-item-id="${item.id}"
      >
        <div class="flex justify-between items-start gap-2 mb-2">
          <div class="flex-1">
            ${badgeHtml}
            <h3 class="text-label-bold font-label-bold text-on-surface uppercase group-hover:text-primary transition-colors text-sm sm:text-base leading-snug">
              ${item.name}
            </h3>
          </div>
          <div class="flex items-center gap-2">
            <span class="text-price-display font-price-display text-primary whitespace-nowrap text-lg sm:text-xl">
              ${item.formattedPrice}
            </span>
            <button 
              type="button"
              class="btn-add-item flex items-center justify-center w-8 h-8 rounded-lg bg-primary/15 border border-primary text-primary hover:bg-primary hover:text-black transition-all active:scale-90 shadow-sm"
              title="Añadir ${item.name} al carrito"
              data-action="add-to-cart"
              data-item-id="${item.id}"
            >
              <span class="material-symbols-outlined text-[20px]">add</span>
            </button>
          </div>
        </div>
        ${item.description ? `<p class="text-xs text-on-surface-variant leading-relaxed mt-1">${item.description}</p>` : ''}
      </div>
    `;
  }

  /**
   * Render a row-style item (ideal for Drinks, Bebidas calientes, Guarniciones, etc.)
   * @param {import('../../domain/models/MenuItem.js').MenuItem} item
   * @returns {string} HTML string
   */
  static renderRow(item) {
    return `
      <div 
        id="item-card-${item.id}"
        class="menu-card flex justify-between items-center border-b border-dashed border-outline-variant py-3 px-2 rounded-lg hover:bg-surface-container-low transition-all group"
        data-item-id="${item.id}"
      >
        <div class="flex-1 pr-3">
          <div class="flex items-center gap-2">
            <h4 class="text-body-md font-bold text-on-surface uppercase group-hover:text-primary transition-colors text-sm sm:text-base">
              ${item.name}
            </h4>
            ${item.badge ? `<span class="bg-primary/20 text-primary text-[10px] font-bold px-1.5 py-0.5 rounded">${item.badge}</span>` : ''}
          </div>
          ${item.description ? `<span class="text-xs text-on-surface-variant block mt-0.5">${item.description}</span>` : ''}
        </div>
        <div class="flex items-center gap-3">
          <span class="text-price-display font-price-display text-primary whitespace-nowrap text-base sm:text-lg">
            ${item.formattedPrice}
          </span>
          <button 
            type="button"
            class="btn-add-item flex items-center justify-center w-8 h-8 rounded-lg bg-primary/15 border border-primary text-primary hover:bg-primary hover:text-black transition-all active:scale-90"
            title="Añadir ${item.name} al carrito"
            data-action="add-to-cart"
            data-item-id="${item.id}"
          >
            <span class="material-symbols-outlined text-[18px]">add</span>
          </button>
        </div>
      </div>
    `;
  }
}
