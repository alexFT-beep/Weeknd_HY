import { ProductCardComponent } from '../components/ProductCardComponent.js';
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
    this.isManualScrolling = false;
    this.scrollTimeout = null;
    this.observer = null;
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
        class="category-chip px-4 sm:px-5 py-2 sm:py-2.5 rounded-full font-label-bold text-xs whitespace-nowrap border transition-all duration-200 flex items-center gap-1.5 ${cat.id === this.activeCategoryId ? 'bg-primary text-black border-primary font-extrabold shadow-[0_0_15px_rgba(10,204,128,0.4)] scale-105' : 'bg-surface-container-low text-on-surface border-outline-variant hover:bg-surface-variant'}"
      >
        <span class="material-symbols-outlined text-[16px]">${cat.icon || 'restaurant_menu'}</span>
        <span>${cat.name}</span>
      </button>
    `).join('');

    // Chip click event (Delegated)
    navContainer.onclick = (e) => {
      const btn = e.target.closest('[data-category-id]');
      if (!btn) return;

      const catId = btn.dataset.categoryId;
      this.scrollToCategory(catId);
    };
  }

  scrollToCategory(categoryId) {
    const target = document.getElementById(categoryId);
    if (!target) return;

    this.isManualScrolling = true;
    this.setActiveChip(categoryId, true);

    const topOffset = 135; // Header + Sticky Category Bar height
    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - topOffset;
    
    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });

    if (this.scrollTimeout) clearTimeout(this.scrollTimeout);
    this.scrollTimeout = setTimeout(() => {
      this.isManualScrolling = false;
    }, 850);
  }

  setActiveChip(categoryId, centerInView = false) {
    this.activeCategoryId = categoryId;
    document.querySelectorAll('.category-chip').forEach(btn => {
      if (btn.dataset.categoryId === categoryId) {
        btn.className = 'category-chip px-4 sm:px-5 py-2 sm:py-2.5 rounded-full font-label-bold text-xs whitespace-nowrap border transition-all duration-200 flex items-center gap-1.5 bg-primary text-black border-primary font-extrabold shadow-[0_0_15px_rgba(10,204,128,0.4)] scale-105';
        if (centerInView) {
          btn.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
        }
      } else {
        btn.className = 'category-chip px-4 sm:px-5 py-2 sm:py-2.5 rounded-full font-label-bold text-xs whitespace-nowrap border transition-all duration-200 flex items-center gap-1.5 bg-surface-container-low text-on-surface border-outline-variant hover:bg-surface-variant';
      }
    });
  }

  initIntersectionObserver() {
    if (this.observer) {
      this.observer.disconnect();
    }

    const options = {
      root: null,
      rootMargin: '-140px 0px -60% 0px',
      threshold: 0
    };

    this.observer = new IntersectionObserver((entries) => {
      if (this.isManualScrolling) return;

      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.setActiveChip(entry.target.id, false);
        }
      });
    }, options);

    this.categories.forEach(cat => {
      const el = document.getElementById(cat.id);
      if (el) this.observer.observe(el);
    });
  }

  bindSearchEvent() {
    const searchInput = document.getElementById('menu-search-input');
    const searchModal = document.getElementById('search-modal');
    const searchResults = document.getElementById('search-results-list');
    const openSearchBtns = document.querySelectorAll('[data-action="open-search"]');
    const closeSearchBtn = document.getElementById('close-search-btn');

    openSearchBtns.forEach(btn => {
      btn.onclick = () => {
        if (searchModal) {
          searchModal.classList.remove('hidden');
          searchModal.classList.add('flex');
          if (searchInput) {
            searchInput.value = '';
            searchInput.focus();
          }
          if (searchResults) {
            searchResults.innerHTML = '<p class="text-center text-xs text-on-surface-variant py-8">Escribe el nombre de un plato o ingrediente...</p>';
          }
        }
      };
    });

    if (closeSearchBtn && searchModal) {
      closeSearchBtn.onclick = () => {
        searchModal.classList.add('hidden');
        searchModal.classList.remove('flex');
      };
    }

    if (searchInput && searchResults) {
      searchInput.oninput = async (e) => {
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
      };
    }
  }

  renderMenuSections(items) {
    const mainContainer = document.getElementById('menu-sections-container');
    if (!mainContainer) return;

    let html = '';

    // 1. DELIVERY & PACKAGING NOTICE (PAGE 1)
    html += this.renderDeliveryNoticeSection();

    // 2. Loop through each of the 10 consolidated categories
    this.categories.forEach(cat => {
      const categoryItems = items.filter(i => i.category === cat.id);

      if (cat.id === 'pago') {
        html += this.renderPaymentSection();
        return;
      }

      if (categoryItems.length === 0) return;

      html += `
        <section class="mb-14 pt-8" id="${cat.id}" style="scroll-margin-top: 140px;">
          <!-- Category Main Header -->
          <div class="flex items-center justify-between mb-6 pb-2 border-b border-outline-variant/60">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center text-primary shadow-sm">
                <span class="material-symbols-outlined text-2xl">${cat.icon || 'restaurant_menu'}</span>
              </div>
              <div>
                <h2 class="text-headline-lg font-headline-lg text-primary tracking-tight uppercase text-xl sm:text-2xl font-extrabold">
                  ${cat.name}
                </h2>
                ${cat.description ? `<p class="text-xs text-on-surface-variant mt-0.5">${cat.description}</p>` : ''}
              </div>
            </div>
            <div class="h-px bg-outline-variant flex-1 ml-md hidden sm:block"></div>
          </div>
      `;

      // Render category-specific sub-blocks
      if (cat.id === 'alitas') {
        const rondas = categoryItems.filter(i => i.subcategory === 'rondas-alitas');
        const regularAlitas = categoryItems.filter(i => i.subcategory !== 'rondas-alitas');

        if (rondas.length > 0) {
          html += `
            <div class="mb-8">
              <div class="flex items-center gap-2 mb-4">
                <span class="material-symbols-outlined text-primary text-base">military_tech</span>
                <h3 class="text-sm sm:text-base font-bold text-on-surface uppercase tracking-wide">
                  Rondas y Combinaciones de Alitas (Las Más Pedidas)
                </h3>
              </div>
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                ${rondas.map(item => ProductCardComponent.renderCard(item)).join('')}
              </div>
            </div>
          `;
        }

        if (regularAlitas.length > 0) {
          html += `
            <div class="mb-6">
              <div class="flex items-center gap-2 mb-4">
                <span class="material-symbols-outlined text-primary text-base">local_fire_department</span>
                <h3 class="text-sm sm:text-base font-bold text-on-surface uppercase tracking-wide">
                  El Bravo D' Casa..! Alitas Festín de Sabores (08 unidades + papas fritas + ensalada)
                </h3>
              </div>
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                ${regularAlitas.map(item => ProductCardComponent.renderCard(item)).join('')}
              </div>
            </div>
          `;
        }
      } else if (cat.id === 'hamburguesas') {
        const burgers = categoryItems.filter(i => !i.id.startsWith('adic-'));
        const adicionals = categoryItems.filter(i => i.id.startsWith('adic-'));

        html += `
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            ${burgers.map(item => ProductCardComponent.renderCard(item)).join('')}
          </div>
        `;

        if (adicionals.length > 0) {
          html += `
            <div class="mt-8 bg-surface-container-low/80 border border-outline-variant/50 rounded-2xl p-4 sm:p-5">
              <h4 class="text-xs sm:text-sm font-bold text-primary uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <span class="material-symbols-outlined text-base">add_circle</span> Adicionales para tu Hamburguesa
              </h4>
              <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                ${adicionals.map(item => ProductCardComponent.renderRow(item)).join('')}
              </div>
            </div>
          `;
        }
      } else if (cat.id === 'broaster-salchipapas') {
        const broaster = categoryItems.filter(i => i.subcategory === 'broaster');
        const salchipapas = categoryItems.filter(i => i.subcategory === 'salchipapas');
        const agregadosBroaster = categoryItems.filter(i => i.subcategory === 'agregados-broaster');

        if (broaster.length > 0) {
          html += `
            <div class="mb-8">
              <h3 class="text-sm sm:text-base font-bold text-on-surface uppercase tracking-wide mb-4 flex items-center gap-2">
                <span class="material-symbols-outlined text-primary">dinner_dining</span> Sabrosos Broaster &amp; Mostritos
              </h3>
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                ${broaster.map(item => ProductCardComponent.renderCard(item)).join('')}
              </div>
            </div>
          `;
        }

        if (agregadosBroaster.length > 0) {
          html += `
            <div class="mb-8 bg-surface-container-low/80 border border-outline-variant/50 rounded-2xl p-4 sm:p-5">
              <h4 class="text-xs sm:text-sm font-bold text-primary uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <span class="material-symbols-outlined text-base">add_circle</span> Agregados para tu Broaster
              </h4>
              <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                ${agregadosBroaster.map(item => ProductCardComponent.renderRow(item)).join('')}
              </div>
            </div>
          `;
        }

        if (salchipapas.length > 0) {
          html += `
            <div class="mb-6">
              <h3 class="text-sm sm:text-base font-bold text-on-surface uppercase tracking-wide mb-4 flex items-center gap-2">
                <span class="material-symbols-outlined text-primary">fastfood</span> Salchipapas Weekend
              </h3>
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                ${salchipapas.map(item => ProductCardComponent.renderCard(item)).join('')}
              </div>
            </div>
          `;
        }
      } else if (cat.id === 'parrillas-piqueos') {
        const parrillas = categoryItems.filter(i => i.subcategory === 'parrillas');
        const combosParr = categoryItems.filter(i => i.subcategory === 'combos-parrilleros');
        const piqueos = categoryItems.filter(i => i.subcategory === 'piqueos');

        if (parrillas.length > 0) {
          html += `
            <div class="mb-8">
              <h3 class="text-sm sm:text-base font-bold text-on-surface uppercase tracking-wide mb-4 flex items-center gap-2">
                <span class="material-symbols-outlined text-primary">outdoor_grill</span> Parrillas Weekend (Cortes &amp; Anticuchos)
              </h3>
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                ${parrillas.map(item => ProductCardComponent.renderCard(item)).join('')}
              </div>
            </div>
          `;
        }

        if (combosParr.length > 0) {
          html += `
            <div class="mb-8">
              <h3 class="text-sm sm:text-base font-bold text-on-surface uppercase tracking-wide mb-4 flex items-center gap-2">
                <span class="material-symbols-outlined text-primary">military_tech</span> Combos Parrilleros &amp; Mega Banquete
              </h3>
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                ${combosParr.map(item => ProductCardComponent.renderCard(item)).join('')}
              </div>
            </div>
          `;
        }

        if (piqueos.length > 0) {
          html += `
            <div class="mb-6">
              <h3 class="text-sm sm:text-base font-bold text-on-surface uppercase tracking-wide mb-4 flex items-center gap-2">
                <span class="material-symbols-outlined text-primary">tapas</span> Piqueos (Brochetas, Tequeños &amp; Nuggets)
              </h3>
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                ${piqueos.map(item => ProductCardComponent.renderCard(item)).join('')}
              </div>
            </div>
          `;
        }
      } else if (cat.id === 'a-la-carta-chifa') {
        const aLaCarta = categoryItems.filter(i => i.subcategory === 'a-la-carta');
        const barrioChino = categoryItems.filter(i => i.subcategory === 'barrio-chino');
        const pastas = categoryItems.filter(i => i.subcategory === 'pastas');
        const acompanaPastas = categoryItems.filter(i => i.subcategory === 'acompana-pastas');

        if (aLaCarta.length > 0) {
          html += `
            <div class="mb-8">
              <h3 class="text-sm sm:text-base font-bold text-on-surface uppercase tracking-wide mb-4 flex items-center gap-2">
                <span class="material-symbols-outlined text-primary">restaurant</span> Weekend A la Carta (Chaufas, Aeropuertos &amp; Saltados)
              </h3>
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                ${aLaCarta.map(item => ProductCardComponent.renderCard(item)).join('')}
              </div>
            </div>
          `;
        }

        if (barrioChino.length > 0) {
          html += `
            <div class="mb-8">
              <h3 class="text-sm sm:text-base font-bold text-on-surface uppercase tracking-wide mb-4 flex items-center gap-2">
                <span class="material-symbols-outlined text-primary">ramen_dining</span> Barrio Chino Weekend (Especialidades Chifa)
              </h3>
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                ${barrioChino.map(item => ProductCardComponent.renderCard(item)).join('')}
              </div>
            </div>
          `;
        }

        if (pastas.length > 0) {
          html += `
            <div class="mb-6">
              <h3 class="text-sm sm:text-base font-bold text-on-surface uppercase tracking-wide mb-4 flex items-center gap-2">
                <span class="material-symbols-outlined text-primary">restaurant_menu</span> Pastas &amp; Fetuccinis
              </h3>
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                ${pastas.map(item => ProductCardComponent.renderCard(item)).join('')}
              </div>
            </div>
          `;
        }

        if (acompanaPastas.length > 0) {
          html += `
            <div class="mt-4 mb-6 bg-surface-container-low/80 border border-outline-variant/50 rounded-2xl p-4 sm:p-5">
              <h4 class="text-xs sm:text-sm font-bold text-primary uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <span class="material-symbols-outlined text-base">add_circle</span> Acompaña tus Pastas
              </h4>
              <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                ${acompanaPastas.map(item => ProductCardComponent.renderRow(item)).join('')}
              </div>
            </div>
          `;
        }
      } else if (cat.id === 'makis-ensaladas') {
        const ensaladas = categoryItems.filter(i => i.subcategory === 'ensaladas');
        const makis = categoryItems.filter(i => i.subcategory === 'makis');

        if (ensaladas.length > 0) {
          html += `
            <div class="mb-8">
              <h3 class="text-sm sm:text-base font-bold text-on-surface uppercase tracking-wide mb-4 flex items-center gap-2">
                <span class="material-symbols-outlined text-primary">nutrition</span> Ensaladas Weekend
              </h3>
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                ${ensaladas.map(item => ProductCardComponent.renderCard(item)).join('')}
              </div>
            </div>
          `;
        }

        if (makis.length > 0) {
          html += `
            <div class="mb-6">
              <h3 class="text-sm sm:text-base font-bold text-on-surface uppercase tracking-wide mb-4 flex items-center gap-2">
                <span class="material-symbols-outlined text-primary">set_meal</span> Makis Nikkei Fusión
              </h3>
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                ${makis.map(item => ProductCardComponent.renderCard(item)).join('')}
              </div>
            </div>
          `;
        }
      } else if (cat.id === 'bebidas-jugos') {
        const smoothies = categoryItems.filter(i => i.subcategory === 'smoothies-bubble-tea');
        const jugos = categoryItems.filter(i => i.subcategory === 'bebidas-jugos-frappes');
        const refrescos = categoryItems.filter(i => i.subcategory === 'refrescos-calientes');

        if (smoothies.length > 0) {
          html += `
            <div class="mb-8">
              <h3 class="text-sm sm:text-base font-bold text-on-surface uppercase tracking-wide mb-4 flex items-center gap-2">
                <span class="material-symbols-outlined text-primary">local_cafe</span> Smoothies 100% Natural &amp; Bubble Tea
              </h3>
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                ${smoothies.map(item => ProductCardComponent.renderCard(item)).join('')}
              </div>
            </div>
          `;
        }

        if (jugos.length > 0) {
          html += `
            <div class="mb-8">
              <h3 class="text-sm sm:text-base font-bold text-on-surface uppercase tracking-wide mb-4 flex items-center gap-2">
                <span class="material-symbols-outlined text-primary">icecream</span> Jugos de Fruta Natural, Frappes &amp; Milkshakes
              </h3>
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                ${jugos.map(item => ProductCardComponent.renderCard(item)).join('')}
              </div>
            </div>
          `;
        }

        if (refrescos.length > 0) {
          html += `
            <div class="mb-6">
              <h3 class="text-sm sm:text-base font-bold text-on-surface uppercase tracking-wide mb-4 flex items-center gap-2">
                <span class="material-symbols-outlined text-primary">local_bar</span> Jarras de Refrescos (1L y 1/2L), Gaseosas &amp; Calientes
              </h3>
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                ${refrescos.map(item => ProductCardComponent.renderCard(item)).join('')}
              </div>
            </div>
          `;
        }
      } else if (cat.id === 'cocteles-licores') {
        const drinks = categoryItems.filter(i => i.subcategory === 'drinks');
        const botellas = categoryItems.filter(i => i.subcategory === 'botellas');
        const cervezas = categoryItems.filter(i => i.subcategory === 'cervezas');

        if (drinks.length > 0) {
          html += `
            <div class="mb-8">
              <h3 class="text-sm sm:text-base font-bold text-on-surface uppercase tracking-wide mb-4 flex items-center gap-2">
                <span class="material-symbols-outlined text-primary">cocktail</span> Drinks &amp; Coctelería de Autor (Chilcanos, Sours, Mojitos, Tragos)
              </h3>
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                ${drinks.map(item => ProductCardComponent.renderCard(item)).join('')}
              </div>
            </div>
          `;
        }

        if (botellas.length > 0) {
          html += `
            <div class="mb-8">
              <h3 class="text-sm sm:text-base font-bold text-on-surface uppercase tracking-wide mb-4 flex items-center gap-2">
                <span class="material-symbols-outlined text-primary">liquor</span> Botellas &amp; Licores (Con insumos de cortesía)
              </h3>
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                ${botellas.map(item => ProductCardComponent.renderCard(item)).join('')}
              </div>
            </div>
          `;
        }

        if (cervezas.length > 0) {
          html += `
            <div class="mb-6">
              <h3 class="text-sm sm:text-base font-bold text-on-surface uppercase tracking-wide mb-4 flex items-center gap-2">
                <span class="material-symbols-outlined text-primary">sports_bar</span> Cervezas Nacionales e Importadas
              </h3>
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                ${cervezas.map(item => ProductCardComponent.renderCard(item)).join('')}
              </div>
            </div>
          `;
        }
      } else {
        // Standard category rendering
        html += `
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            ${categoryItems.map(item => ProductCardComponent.renderCard(item)).join('')}
          </div>
        `;
      }

      html += `</section>`;
    });

    mainContainer.innerHTML = html;
  }

  renderDeliveryNoticeSection() {
    return `
      <!-- Delivery & Notice Section (PDF Page 1) -->
      <section class="mb-12 grid grid-cols-1 md:grid-cols-2 gap-gutter" id="nota-delivery" style="scroll-margin-top: 140px;">
        <!-- Notice Card -->
        <div class="bg-surface-container-low border border-primary/30 rounded-2xl p-6 flex flex-col justify-between shadow-sm">
          <div>
            <h2 class="text-headline-md font-headline-md text-primary mb-3 flex items-center gap-2 font-bold text-lg">
              <span class="material-symbols-outlined text-primary">info</span> ¡NOTA IMPORTANTE!
            </h2>
            <p class="text-on-surface-variant text-xs sm:text-sm mb-4 leading-relaxed">
              *PARA LOS DESPACHOS DE DELIVERY, SE AÑADIRÁ UN CARGO POR PEDIDO SEGÚN SE REQUIERA.
            </p>
            <ul class="space-y-2.5 text-xs sm:text-sm text-on-surface font-medium">
              <li class="flex justify-between items-center border-b border-dashed border-outline-variant/40 pb-1.5">
                <span>• TUPPER DESCARTABLE</span>
                <span class="font-price-display text-primary font-bold">S/ 1.00</span>
              </li>
              <li class="flex justify-between items-center border-b border-dashed border-outline-variant/40 pb-1.5">
                <span>• BOLSA BIODEGRADABLE</span>
                <span class="font-price-display text-primary font-bold">S/ 1.00</span>
              </li>
              <li class="flex justify-between items-center border-b border-dashed border-outline-variant/40 pb-1.5">
                <span>• VASO BIODEGRADABLE</span>
                <span class="font-price-display text-primary font-bold">S/ 1.00</span>
              </li>
            </ul>
          </div>
          <div class="mt-4 pt-3 border-t border-outline-variant/40 text-[11px] text-primary flex items-center gap-1.5">
            <span class="material-symbols-outlined text-sm">eco</span>
            <span>Empaques ecológicos y biodegradables</span>
          </div>
        </div>

        <!-- Delivery Rates Card -->
        <div class="bg-surface-container-low border border-primary/30 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
          <div>
            <h2 class="text-headline-md font-headline-md text-primary mb-3 flex items-center gap-2 font-bold text-lg">
              <span class="material-symbols-outlined text-primary">two_wheeler</span> CUOTAS DELIVERY (HUARMEY)
            </h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div class="flex justify-between items-center p-2.5 border border-outline-variant/60 bg-surface-container rounded-lg">
                <span class="font-semibold text-on-surface">CASCO URBANO</span>
                <span class="font-price-display text-primary font-bold">S/ 2.00</span>
              </div>
              <div class="flex justify-between items-center p-2.5 border border-outline-variant/60 bg-surface-container rounded-lg">
                <span class="font-semibold text-on-surface">SANTO DOMINGO</span>
                <span class="font-price-display text-primary font-bold">S/ 4.00</span>
              </div>
              <div class="flex justify-between items-center p-2.5 border border-outline-variant/60 bg-surface-container rounded-lg">
                <span class="font-semibold text-on-surface">LA VICTORIA</span>
                <span class="font-price-display text-primary font-bold">S/ 4.00</span>
              </div>
              <div class="flex justify-between items-center p-2.5 border border-outline-variant/60 bg-surface-container rounded-lg">
                <span class="font-semibold text-on-surface">BUENA VILLA</span>
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
      <section class="mb-14 pt-8" id="pago" style="scroll-margin-top: 140px;">
        <div class="flex items-center justify-center mb-6">
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
