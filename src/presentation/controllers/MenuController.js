import { ProductCardComponent } from '../components/ProductCardComponent.js';
import { CombosVoladoresComponent } from '../components/CombosVoladoresComponent.js';
import { PAYMENT_INFO } from '../../infrastructure/data/fullMenuData.js';

/**
 * Presentation Controller: MenuController
 * Manages category navigation, intersection observers, search, and full menu rendering.
 */
export class MenuController {
  /**
   * @param {Object} params
   * @param {import('../../application/usecases/GetMenuUseCase.js').GetMenuUseCase} params.getMenuUseCase
   */
  constructor({ getMenuUseCase }) {
    this.getMenuUseCase = getMenuUseCase;
    this.categories = [];
    this.items = [];
    this.activeCategoryId = 'alitas';
  }

  async init() {
    const fullMenu = await this.getMenuUseCase.getFullMenu();
    this.categories = fullMenu.categories;
    this.items = fullMenu.items;

    this.renderCategoryChips();
    this.renderMenuSections(this.items);
    this.initIntersectionObserver();
    this.bindSearchEvent();
  }

  renderCategoryChips() {
    const navContainer = document.getElementById('category-chips-nav');
    if (!navContainer) return;

    navContainer.innerHTML = this.categories.map(cat => `
      <button 
        type="button"
        id="chip-btn-${cat.id}"
        data-category-id="${cat.id}"
        class="category-chip px-5 py-2.5 rounded-full font-label-bold text-xs whitespace-nowrap border transition-all duration-200 flex items-center gap-1.5 ${cat.id === this.activeCategoryId ? 'bg-primary text-black border-primary font-extrabold shadow-[0_0_15px_rgba(191,227,83,0.4)]' : 'bg-surface-container-low text-on-surface border-outline-variant hover:bg-surface-variant'}"
      >
        <span class="material-symbols-outlined text-[16px]">${cat.icon || 'restaurant_menu'}</span>
        <span>${cat.name}</span>
      </button>
    `).join('');

    // Chip click event
    navContainer.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-category-id]');
      if (!btn) return;

      const catId = btn.dataset.categoryId;
      this.scrollToCategory(catId);
    });
  }

  scrollToCategory(categoryId) {
    const target = document.getElementById(categoryId);
    if (target) {
      const topOffset = 135; // Header + Sticky Category Bar height
      const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - topOffset;
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
      this.setActiveChip(categoryId);
    }
  }

  setActiveChip(categoryId) {
    this.activeCategoryId = categoryId;
    document.querySelectorAll('.category-chip').forEach(btn => {
      if (btn.dataset.categoryId === categoryId) {
        btn.className = 'category-chip px-5 py-2.5 rounded-full font-label-bold text-xs whitespace-nowrap border transition-all duration-200 flex items-center gap-1.5 bg-primary text-black border-primary font-extrabold shadow-[0_0_15px_rgba(191,227,83,0.4)] scale-105';
        btn.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      } else {
        btn.className = 'category-chip px-5 py-2.5 rounded-full font-label-bold text-xs whitespace-nowrap border transition-all duration-200 flex items-center gap-1.5 bg-surface-container-low text-on-surface border-outline-variant hover:bg-surface-variant';
      }
    });
  }

  initIntersectionObserver() {
    const options = {
      root: null,
      rootMargin: '-140px 0px -60% 0px',
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.setActiveChip(entry.target.id);
        }
      });
    }, options);

    this.categories.forEach(cat => {
      const el = document.getElementById(cat.id);
      if (el) observer.observe(el);
    });
  }

  bindSearchEvent() {
    const searchInput = document.getElementById('menu-search-input');
    const searchModal = document.getElementById('search-modal');
    const searchResults = document.getElementById('search-results-list');
    const openSearchBtns = document.querySelectorAll('[data-action="open-search"]');
    const closeSearchBtn = document.getElementById('close-search-btn');

    openSearchBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        if (searchModal) {
          searchModal.classList.remove('hidden');
          searchModal.classList.add('flex');
          if (searchInput) searchInput.focus();
        }
      });
    });

    if (closeSearchBtn && searchModal) {
      closeSearchBtn.addEventListener('click', () => {
        searchModal.classList.add('hidden');
        searchModal.classList.remove('flex');
      });
    }

    if (searchInput && searchResults) {
      searchInput.addEventListener('input', async (e) => {
        const q = e.target.value;
        if (!q.trim()) {
          searchResults.innerHTML = '<p class="text-center text-xs text-on-surface-variant py-8">Escribe el nombre de un plato o ingrediente...</p>';
          return;
        }

        const filtered = await this.getMenuUseCase.searchItems(q);
        if (filtered.length === 0) {
          searchResults.innerHTML = '<p class="text-center text-xs text-on-surface-variant py-8">No encontramos platos con ese nombre.</p>';
          return;
        }

        searchResults.innerHTML = filtered.map(item => ProductCardComponent.renderCard(item)).join('');
      });
    }
  }

  renderMenuSections(items) {
    const mainContainer = document.getElementById('menu-sections-container');
    if (!mainContainer) return;

    let html = '';

    // 1. DELIVERY & PACKAGING NOTICE (PAGE 1)
    html += this.renderDeliveryNoticeSection();

    // Loop through each category
    this.categories.forEach(cat => {
      const categoryItems = items.filter(i => i.category === cat.id);

      if (cat.id === 'combos-voladores') {
        html += CombosVoladoresComponent.renderSection(categoryItems);
      } else if (cat.id === 'pago') {
        html += this.renderPaymentSection();
      } else if (categoryItems.length > 0) {
        html += `
          <section class="mb-xl pt-20" id="${cat.id}">
            <div class="flex items-center justify-between mb-6">
              <div class="flex items-center gap-3">
                <span class="material-symbols-outlined text-primary text-2xl sm:text-3xl">${cat.icon || 'restaurant_menu'}</span>
                <div>
                  <h2 class="text-headline-lg font-headline-lg text-primary tracking-tight uppercase text-xl sm:text-2xl font-extrabold">
                    ${cat.name}
                  </h2>
                  ${cat.description ? `<p class="text-xs text-on-surface-variant mt-0.5">${cat.description}</p>` : ''}
                </div>
              </div>
              <div class="h-px bg-outline-variant flex-1 ml-md hidden sm:block"></div>
            </div>

            <!-- Items Grid -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              ${categoryItems.map(item => ProductCardComponent.renderCard(item)).join('')}
            </div>
          </section>
        `;
      }
    });

    mainContainer.innerHTML = html;
  }

  renderDeliveryNoticeSection() {
    return `
      <!-- Delivery & Notice Section (PDF Page 1) -->
      <section class="mb-xl grid grid-cols-1 md:grid-cols-2 gap-gutter" id="nota-delivery">
        <!-- Notice Card -->
        <div class="bg-surface-container-low border border-primary/30 rounded-xl p-lg flex flex-col justify-between shadow-sm">
          <div>
            <h2 class="text-headline-md font-headline-md text-primary mb-md flex items-center gap-2 font-bold text-lg">
              <span class="material-symbols-outlined text-primary">info</span> ¡NOTA IMPORTANTE!
            </h2>
            <p class="text-on-surface-variant text-xs sm:text-sm mb-md leading-relaxed">
              *PARA LOS DESPACHOS DE DELIVERY, SE AÑADIRÁ UN CARGO POR PEDIDO SEGÚN SE REQUIERA.
            </p>
            <ul class="space-y-2 text-xs sm:text-sm text-on-surface font-medium">
              <li class="flex justify-between items-center border-b border-dashed border-outline-variant/40 pb-1">
                <span>• TUPPER DESCARTABLE</span>
                <span class="font-price-display text-primary">S/ 1.00</span>
              </li>
              <li class="flex justify-between items-center border-b border-dashed border-outline-variant/40 pb-1">
                <span>• BOLSA BIODEGRADABLE</span>
                <span class="font-price-display text-primary">S/ 1.00</span>
              </li>
              <li class="flex justify-between items-center border-b border-dashed border-outline-variant/40 pb-1">
                <span>• VASO BIODEGRADABLE</span>
                <span class="font-price-display text-primary">S/ 1.00</span>
              </li>
            </ul>
          </div>
          <div class="mt-4 pt-3 border-t border-outline-variant/40 text-[11px] text-primary flex items-center gap-1.5">
            <span class="material-symbols-outlined text-sm">eco</span>
            <span>Empaques ecológicos y biodegradables</span>
          </div>
        </div>

        <!-- Delivery Rates Card -->
        <div class="bg-surface-container-low border border-primary/30 rounded-xl p-lg shadow-sm">
          <h2 class="text-headline-md font-headline-md text-primary mb-md flex items-center gap-2 font-bold text-lg">
            <span class="material-symbols-outlined text-primary">two_wheeler</span> CUOTAS DELIVERY (HUARMEY)
          </h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            <div class="flex justify-between items-center p-2.5 border border-outline-variant/60 bg-surface-container rounded-lg">
              <span class="font-semibold text-on-surface">CASCO URBANO</span>
              <span class="font-price-display text-primary font-bold">S/ 2.00</span>
            </div>
            <div class="flex justify-between items-center p-2.5 border border-outline-variant/60 bg-surface-container rounded-lg">
              <span class="font-semibold text-on-surface">SANTO DOMINGO CENTRO</span>
              <span class="font-price-display text-primary font-bold">S/ 4.00</span>
            </div>
            <div class="flex justify-between items-center p-2.5 border border-outline-variant/60 bg-surface-container rounded-lg">
              <span class="font-semibold text-on-surface">LA VICTORIA CENTRO</span>
              <span class="font-price-display text-primary font-bold">S/ 4.00</span>
            </div>
            <div class="flex justify-between items-center p-2.5 border border-outline-variant/60 bg-surface-container rounded-lg">
              <span class="font-semibold text-on-surface">BUENA VILLA (CENTRO)</span>
              <span class="font-price-display text-primary font-bold">S/ 8.00</span>
            </div>
            <div class="flex justify-between items-center p-2.5 border border-outline-variant/60 bg-surface-container rounded-lg">
              <span class="font-semibold text-on-surface">PUERTO HUARMEY</span>
              <span class="font-price-display text-primary font-bold">S/ 10.00</span>
            </div>
            <div class="flex justify-between items-center p-2.5 border border-outline-variant/60 bg-surface-container rounded-lg">
              <span class="font-semibold text-on-surface">9 DE OCTUBRE</span>
              <span class="font-price-display text-primary font-bold">S/ 10.00</span>
            </div>
          </div>
          <p class="text-[11px] text-on-surface-variant mt-3">
            *Selecciona tu zona directamente en el carrito para calcular tu costo total.
          </p>
        </div>
      </section>
    `;
  }

  renderPaymentSection() {
    return `
      <!-- Escanea y Paga Section (PDF Page 16) -->
      <section class="mb-xl pt-20" id="pago">
        <div class="flex items-center justify-center mb-md">
          <h2 class="text-headline-lg font-headline-lg text-primary tracking-tight uppercase text-2xl font-extrabold flex items-center gap-2">
            <span class="material-symbols-outlined text-3xl">qr_code_2</span> ESCANEA y PAGA
          </h2>
        </div>
        <div class="flex flex-col items-center justify-center max-w-lg mx-auto bg-surface-container-low border border-primary/40 rounded-2xl p-6 shadow-2xl space-y-4">
          <p class="text-xs text-on-surface-variant text-center">
            Paga rápido y sin comisiones escaneando nuestro código QR de <strong>Yape</strong> o <strong>Plin</strong>:
          </p>
          <div class="p-2 bg-white rounded-2xl shadow-lg border-2 border-primary">
            <img 
              alt="QR Yape y Plin Weekend" 
              class="max-w-xs w-full object-contain rounded-xl" 
              src="${PAYMENT_INFO.qrImage}"
            />
          </div>
          <div class="w-full text-center bg-surface-container border border-outline-variant/50 px-4 py-2.5 rounded-xl">
            <span class="text-[11px] text-primary font-semibold block uppercase">Titular de la Cuenta:</span>
            <p class="text-on-surface font-bold text-sm tracking-wide">${PAYMENT_INFO.accountName}</p>
          </div>

          <!-- Official Contact & Location Card -->
          <div class="w-full bg-surface-container border border-outline-variant/50 p-4 rounded-xl space-y-2 text-xs">
            <div class="flex items-center gap-2 text-on-surface">
              <span class="material-symbols-outlined text-primary text-base">location_on</span>
              <span class="font-medium">${PAYMENT_INFO.address || 'Av. Cabo Alberto Reyes #140'}</span>
            </div>
            <div class="flex items-center gap-2 text-on-surface">
              <span class="material-symbols-outlined text-primary text-base">chat</span>
              <span>WhatsApp de Pedidos: <strong class="text-primary font-bold">961 336 674</strong></span>
            </div>
            <div class="flex items-center gap-2 text-on-surface">
              <span class="material-symbols-outlined text-primary text-base">public</span>
              <span>Instagram / Facebook: <strong class="text-primary">@weekendrestobar</strong></span>
            </div>
          </div>
        </div>
      </section>
    `;
  }
}
