/**
 * Presentation Component: ProductCardComponent
 * Generates lightweight, performant HTML for dishes with dedicated interactive "+" button.
 */
export class ProductCardComponent {
  /**
   * Render a standard dish card
   * @param {import('../../domain/models/MenuItem.js').MenuItem} item
   * @returns {string} HTML string
   */
  static renderCard(item) {
    const isAmber = item.category === 'cocteles-licores';
    const priceColor = isAmber ? 'text-amber-400' : 'text-primary';
    const btnClass = isAmber 
      ? 'bg-amber-400/15 border-amber-400/60 text-amber-400 hover:bg-amber-400 hover:text-black' 
      : 'bg-primary/15 border-primary/60 text-primary hover:bg-primary hover:text-black';
    const badgeClass = isAmber ? 'bg-amber-400 text-black' : 'bg-primary text-black';

    const badgeHtml = item.badge 
      ? `<span class="${badgeClass} font-label-bold text-[9px] tracking-wider px-2 py-0.5 rounded-full uppercase mb-1 inline-block font-extrabold">${item.badge}</span>`
      : '';

    return `
      <div 
        id="item-card-${item.id}"
        class="menu-card bg-surface-container-low border border-outline-variant/60 rounded-xl p-3.5 sm:p-4 flex flex-col justify-between text-left group relative overflow-hidden transition-colors"
        data-item-id="${item.id}"
      >
        <div class="flex justify-between items-start gap-2 mb-1.5">
          <div class="flex-1 min-w-0">
            ${badgeHtml}
            <h3 class="text-label-bold font-label-bold text-on-surface uppercase group-hover:${priceColor} transition-colors text-sm sm:text-base leading-snug">
              ${item.name}
            </h3>
          </div>
          <div class="flex items-center gap-2 shrink-0">
            <span class="text-price-display font-price-display ${priceColor} whitespace-nowrap text-base sm:text-lg font-bold">
              ${item.formattedPrice}
            </span>
            <button 
              type="button"
              class="btn-add-item flex items-center justify-center w-8 h-8 rounded-lg ${btnClass} border transition-all active:scale-90 shadow-sm"
              title="Añadir ${item.name} al carrito"
              data-action="add-to-cart"
              data-item-id="${item.id}"
            >
              <span class="material-symbols-outlined text-[18px]">add</span>
            </button>
          </div>
        </div>
        ${item.description ? `<p class="text-xs text-on-surface-variant leading-relaxed mt-1 line-clamp-2">${item.description}</p>` : ''}
      </div>
    `;
  }

  /**
   * Render a row-style item (ideal for Drinks, Bebidas calientes, Guarniciones, etc.)
   * @param {import('../../domain/models/MenuItem.js').MenuItem} item
   * @returns {string} HTML string
   */
  static renderRow(item) {
    const isAmber = item.category === 'cocteles-licores';
    const priceColor = isAmber ? 'text-amber-400' : 'text-primary';
    const btnClass = isAmber 
      ? 'bg-amber-400/15 border-amber-400/60 text-amber-400 hover:bg-amber-400 hover:text-black' 
      : 'bg-primary/15 border-primary/60 text-primary hover:bg-primary hover:text-black';

    return `
      <div 
        id="item-card-${item.id}"
        class="menu-card flex justify-between items-center border-b border-dashed border-outline-variant/60 py-2.5 px-2 rounded-lg hover:bg-surface-container-low transition-colors group"
        data-item-id="${item.id}"
      >
        <div class="flex-1 pr-2 min-w-0">
          <div class="flex items-center gap-1.5 flex-wrap">
            <h4 class="text-xs sm:text-sm font-bold text-on-surface uppercase group-hover:${priceColor} transition-colors">
              ${item.name}
            </h4>
            ${item.badge ? `<span class="${isAmber ? 'bg-amber-400/20 text-amber-400' : 'bg-primary/20 text-primary'} text-[9px] font-bold px-1.5 py-0.5 rounded">${item.badge}</span>` : ''}
          </div>
          ${item.description ? `<span class="text-[11px] sm:text-xs text-on-surface-variant block mt-0.5 truncate">${item.description}</span>` : ''}
        </div>
        <div class="flex items-center gap-2 shrink-0">
          <span class="text-price-display font-price-display ${priceColor} whitespace-nowrap text-xs sm:text-sm font-bold">
            ${item.formattedPrice}
          </span>
          <button 
            type="button"
            class="btn-add-item flex items-center justify-center w-7 h-7 rounded-lg ${btnClass} border transition-all active:scale-90 shadow-sm"
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

