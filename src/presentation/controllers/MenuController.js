import { ProductCardComponent } from "../components/ProductCardComponent.js";
import { PAYMENT_INFO } from "../../infrastructure/data/fullMenuData.js";

/**
 * Presentation Controller: MenuController
 * Manages category navigation, intersection observers, search, and full menu rendering.
 * Optimized for mobile performance with zero dead code and lightweight DOM.
 */
export class MenuController {
  /**
   * @param {Object} params
   * @param {import("../../application/usecases/GetMenuUseCase.js").GetMenuUseCase} params.getMenuUseCase
   */
  constructor({ getMenuUseCase }) {
    this.getMenuUseCase = getMenuUseCase;
    this.categories = [];
    this.items = [];
    this.activeCategoryId = "alitas";
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
    const navContainer = document.getElementById("category-chips-nav");
    if (!navContainer) return;

    navContainer.innerHTML = this.categories.map(cat => {
      const isActive = cat.id === this.activeCategoryId;
      const isAmber = cat.id === "cocteles-licores";
      let activeClass = "";
      if (isActive) {
        activeClass = isAmber
          ? "bg-amber-400 text-black border-amber-400 font-extrabold shadow-[0_0_15px_rgba(245,158,11,0.5)] scale-105"
          : "bg-primary text-black border-primary font-extrabold shadow-[0_0_15px_rgba(10,204,128,0.4)] scale-105";
      } else {
        activeClass = "bg-surface-container-low text-on-surface border-outline-variant/60 hover:bg-surface-variant";
      }

      return `
        <button 
          type="button"
          id="chip-btn-${cat.id}"
          data-category-id="${cat.id}"
          class="category-chip px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full font-label-bold text-xs whitespace-nowrap border transition-all duration-200 flex items-center gap-1.5 ${activeClass}"
        >
          <span class="text-sm">${cat.emoji || "🍽️"}</span>
          <span>${cat.name}</span>
        </button>
      `;
    }).join("");

    navContainer.onclick = (e) => {
      const btn = e.target.closest("[data-category-id]");
      if (!btn) return;
      this.scrollToCategory(btn.dataset.categoryId);
    };
  }

  scrollToCategory(categoryId) {
    const target = document.getElementById(categoryId);
    if (!target) return;

    this.isManualScrolling = true;
    this.setActiveChip(categoryId, true);

    const topOffset = 65; // Height of sticky category bar
    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - topOffset;
    
    window.scrollTo({
      top: targetPosition,
      behavior: "smooth"
    });

    if (this.scrollTimeout) clearTimeout(this.scrollTimeout);
    this.scrollTimeout = setTimeout(() => {
      this.isManualScrolling = false;
    }, 600);
  }

  setActiveChip(categoryId, centerInView = false) {
    this.activeCategoryId = categoryId;
    const isAmberCategory = categoryId === "cocteles-licores";

    document.querySelectorAll(".category-chip").forEach(btn => {
      const catId = btn.dataset.categoryId;
      if (catId === categoryId) {
        const activeClass = isAmberCategory
          ? "category-chip px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full font-label-bold text-xs whitespace-nowrap border transition-all duration-200 flex items-center gap-1.5 bg-amber-400 text-black border-amber-400 font-extrabold shadow-[0_0_15px_rgba(245,158,11,0.5)] scale-105"
          : "category-chip px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full font-label-bold text-xs whitespace-nowrap border transition-all duration-200 flex items-center gap-1.5 bg-primary text-black border-primary font-extrabold shadow-[0_0_15px_rgba(10,204,128,0.4)] scale-105";
        btn.className = activeClass;
        if (centerInView) {
          btn.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
        }
      } else {
        btn.className = "category-chip px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full font-label-bold text-xs whitespace-nowrap border transition-all duration-200 flex items-center gap-1.5 bg-surface-container-low text-on-surface border-outline-variant/60 hover:bg-surface-variant";
      }
    });
  }

  initIntersectionObserver() {
    if (this.observer) {
      this.observer.disconnect();
    }

    const options = {
      root: null,
      rootMargin: "-70px 0px -70% 0px",
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
    const searchInput = document.getElementById("menu-search-input");
    const searchModal = document.getElementById("search-modal");
    const searchResults = document.getElementById("search-results-list");
    const openSearchBtns = document.querySelectorAll('[data-action="open-search"]');
    const closeSearchBtn = document.getElementById("close-search-btn");

    openSearchBtns.forEach(btn => {
      btn.onclick = () => {
        if (searchModal) {
          searchModal.classList.remove("hidden");
          searchModal.classList.add("flex");
          if (searchInput) {
            searchInput.value = "";
            searchInput.focus();
          }
          if (searchResults) {
            searchResults.innerHTML = '<p class="text-center text-xs text-on-surface-variant py-8">🔍 Escribe el nombre de un plato o ingrediente...</p>';
          }
        }
      };
    });

    if (closeSearchBtn && searchModal) {
      closeSearchBtn.onclick = () => {
        searchModal.classList.add("hidden");
        searchModal.classList.remove("flex");
      };
    }

    if (searchInput && searchResults) {
      searchInput.oninput = async (e) => {
        const q = e.target.value;
        if (!q.trim()) {
          searchResults.innerHTML = '<p class="text-center text-xs text-on-surface-variant py-8">🔍 Escribe el nombre de un plato o ingrediente...</p>';
          return;
        }

        const filtered = await this.getMenuUseCase.searchItems(q);
        if (filtered.length === 0) {
          searchResults.innerHTML = '<p class="text-center text-xs text-on-surface-variant py-8">❌ No encontramos platos con ese nombre.</p>';
          return;
        }

        searchResults.innerHTML = filtered.map(item => ProductCardComponent.renderCard(item)).join("");
      };
    }
  }

  renderMenuSections(items) {
    const mainContainer = document.getElementById("menu-sections-container");
    if (!mainContainer) return;

    let html = "";

    // 1. DELIVERY & PACKAGING NOTICE
    html += this.renderDeliveryNoticeSection();

    // 2. Loop through each of the 10 consolidated categories
    this.categories.forEach(cat => {
      const categoryItems = items.filter(i => i.category === cat.id);

      if (cat.id === "pago") {
        html += this.renderPaymentSection();
        return;
      }

      if (categoryItems.length === 0) return;

      const isAmber = cat.id === "cocteles-licores";
      const titleColor = isAmber ? "text-amber-400" : "text-primary";
      const iconBoxBg = isAmber ? "bg-amber-400/20 text-amber-400" : "bg-primary/20 text-primary";

      html += `
        <section class="mb-12 pt-4" id="${cat.id}" style="scroll-margin-top: 70px;">
          <!-- Category Main Header -->
          <div class="flex items-center justify-between mb-5 pb-2 border-b border-outline-variant/60">
            <div class="flex items-center gap-2.5">
              <div class="w-9 h-9 rounded-xl ${iconBoxBg} flex items-center justify-center text-lg shadow-sm">
                ${cat.emoji || "🍽️"}
              </div>
              <div>
                <h2 class="text-headline-lg font-headline-lg ${titleColor} tracking-tight uppercase text-lg sm:text-xl font-black">
                  ${cat.name}
                </h2>
                ${cat.description ? `<p class="text-xs text-on-surface-variant mt-0.5">${cat.description}</p>` : ""}
              </div>
            </div>
            <div class="h-px bg-outline-variant flex-1 ml-4 hidden sm:block"></div>
          </div>
      `;

      // Render category-specific sub-blocks
      if (cat.id === "alitas") {
        const rondas = categoryItems.filter(i => i.subcategory === "rondas-alitas");
        const regularAlitas = categoryItems.filter(i => i.subcategory !== "rondas-alitas");

        if (rondas.length > 0) {
          html += `
            <div class="mb-8">
              <div class="flex items-center gap-2 mb-3">
                <span class="text-base">🔥👑</span>
                <h3 class="text-xs sm:text-sm font-bold text-on-surface uppercase tracking-wide">
                  Rondas y Combinaciones de Alitas (¡Las Más Pedidas!)
                </h3>
              </div>
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
                ${rondas.map(item => ProductCardComponent.renderCard(item)).join("")}
              </div>
            </div>
          `;
        }

        if (regularAlitas.length > 0) {
          html += `
            <div class="mb-6">
              <div class="flex items-center gap-2 mb-3">
                <span class="text-base">🍗🔥</span>
                <h3 class="text-xs sm:text-sm font-bold text-on-surface uppercase tracking-wide">
                  El Bravo D' Casa..! Alitas Festín de Sabores (08 Und + Papas + Ensalada)
                </h3>
              </div>
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
                ${regularAlitas.map(item => ProductCardComponent.renderCard(item)).join("")}
              </div>
            </div>
          `;
        }
      } else if (cat.id === "hamburguesas") {
        const burgers = categoryItems.filter(i => !i.id.startsWith("adic-"));
        const adicionals = categoryItems.filter(i => i.id.startsWith("adic-"));

        html += `
          <div class="mb-6">
            <div class="flex items-center gap-2 mb-3">
              <span class="text-base">🍔🔥</span>
              <h3 class="text-xs sm:text-sm font-bold text-on-surface uppercase tracking-wide">
                Hamburguesas Artesanales a la Brasa
              </h3>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
              ${burgers.map(item => ProductCardComponent.renderCard(item)).join("")}
            </div>
          </div>
        `;

        if (adicionals.length > 0) {
          html += `
            <div class="mt-6 bg-surface-container-low/80 border border-outline-variant/50 rounded-2xl p-3.5 sm:p-4">
              <h4 class="text-xs sm:text-sm font-bold text-primary uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                <span>🧀➕</span> Adicionales para tu Hamburguesa
              </h4>
              <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                ${adicionals.map(item => ProductCardComponent.renderRow(item)).join("")}
              </div>
            </div>
          `;
        }
      } else if (cat.id === "broaster-salchipapas") {
        const broaster = categoryItems.filter(i => i.subcategory === "broaster");
        const salchipapas = categoryItems.filter(i => i.subcategory === "salchipapas");
        const agregadosBroaster = categoryItems.filter(i => i.subcategory === "agregados-broaster");

        if (broaster.length > 0) {
          html += `
            <div class="mb-8">
              <h3 class="text-xs sm:text-sm font-bold text-on-surface uppercase tracking-wide mb-3 flex items-center gap-2">
                <span>🍗✨</span> Sabrosos Broaster &amp; Mostritos
              </h3>
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
                ${broaster.map(item => ProductCardComponent.renderCard(item)).join("")}
              </div>
            </div>
          `;
        }

        if (agregadosBroaster.length > 0) {
          html += `
            <div class="mb-8 bg-surface-container-low/80 border border-outline-variant/50 rounded-2xl p-3.5 sm:p-4">
              <h4 class="text-xs sm:text-sm font-bold text-primary uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                <span>➕✨</span> Agregados para tu Broaster
              </h4>
              <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
                ${agregadosBroaster.map(item => ProductCardComponent.renderRow(item)).join("")}
              </div>
            </div>
          `;
        }

        if (salchipapas.length > 0) {
          html += `
            <div class="mb-6">
              <h3 class="text-xs sm:text-sm font-bold text-on-surface uppercase tracking-wide mb-3 flex items-center gap-2">
                <span>🍟🔥</span> Salchipapas Weekend
              </h3>
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
                ${salchipapas.map(item => ProductCardComponent.renderCard(item)).join("")}
              </div>
            </div>
          `;
        }
      } else if (cat.id === "parrillas-piqueos") {
        const parrillas = categoryItems.filter(i => i.subcategory === "parrillas");
        const combosParr = categoryItems.filter(i => i.subcategory === "combos-parrilleros");
        const piqueos = categoryItems.filter(i => i.subcategory === "piqueos");

        if (parrillas.length > 0) {
          html += `
            <div class="mb-8">
              <h3 class="text-xs sm:text-sm font-bold text-on-surface uppercase tracking-wide mb-3 flex items-center gap-2">
                <span>🥩🔥</span> Parrillas Weekend (Cortes &amp; Anticuchos)
              </h3>
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
                ${parrillas.map(item => ProductCardComponent.renderCard(item)).join("")}
              </div>
            </div>
          `;
        }

        if (combosParr.length > 0) {
          html += `
            <div class="mb-8">
              <h3 class="text-xs sm:text-sm font-bold text-on-surface uppercase tracking-wide mb-3 flex items-center gap-2">
                <span>👑🔥</span> Combos Parrilleros &amp; Mega Banquete
              </h3>
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
                ${combosParr.map(item => ProductCardComponent.renderCard(item)).join("")}
              </div>
            </div>
          `;
        }

        if (piqueos.length > 0) {
          html += `
            <div class="mb-6">
              <h3 class="text-xs sm:text-sm font-bold text-on-surface uppercase tracking-wide mb-3 flex items-center gap-2">
                <span>🍢✨</span> Piqueos (Brochetas, Tequeños &amp; Nuggets)
              </h3>
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
                ${piqueos.map(item => ProductCardComponent.renderCard(item)).join("")}
              </div>
            </div>
          `;
        }
      } else if (cat.id === "a-la-carta-chifa") {
        const aLaCarta = categoryItems.filter(i => i.subcategory === "a-la-carta");
        const barrioChino = categoryItems.filter(i => i.subcategory === "barrio-chino");
        const pastas = categoryItems.filter(i => i.subcategory === "pastas");
        const acompanaPastas = categoryItems.filter(i => i.subcategory === "acompana-pastas");

        if (aLaCarta.length > 0) {
          html += `
            <div class="mb-8">
              <h3 class="text-xs sm:text-sm font-bold text-on-surface uppercase tracking-wide mb-3 flex items-center gap-2">
                <span>🥢🔥</span> Weekend A la Carta (Chaufas, Aeropuertos &amp; Saltados)
              </h3>
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
                ${aLaCarta.map(item => ProductCardComponent.renderCard(item)).join("")}
              </div>
            </div>
          `;
        }

        if (barrioChino.length > 0) {
          html += `
            <div class="mb-8">
              <h3 class="text-xs sm:text-sm font-bold text-on-surface uppercase tracking-wide mb-3 flex items-center gap-2">
                <span>🥡✨</span> Barrio Chino Weekend (Especialidades Chifa)
              </h3>
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
                ${barrioChino.map(item => ProductCardComponent.renderCard(item)).join("")}
              </div>
            </div>
          `;
        }

        if (pastas.length > 0) {
          html += `
            <div class="mb-6">
              <h3 class="text-xs sm:text-sm font-bold text-on-surface uppercase tracking-wide mb-3 flex items-center gap-2">
                <span>🍝✨</span> Pastas &amp; Fetuccinis
              </h3>
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
                ${pastas.map(item => ProductCardComponent.renderCard(item)).join("")}
              </div>
            </div>
          `;
        }

        if (acompanaPastas.length > 0) {
          html += `
            <div class="mt-4 mb-6 bg-surface-container-low/80 border border-outline-variant/50 rounded-2xl p-3.5 sm:p-4">
              <h4 class="text-xs sm:text-sm font-bold text-primary uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                <span>➕🍽️</span> Acompaña tus Pastas
              </h4>
              <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                ${acompanaPastas.map(item => ProductCardComponent.renderRow(item)).join("")}
              </div>
            </div>
          `;
        }
      } else if (cat.id === "makis-ensaladas") {
        const ensaladas = categoryItems.filter(i => i.subcategory === "ensaladas");
        const makis = categoryItems.filter(i => i.subcategory === "makis");

        if (ensaladas.length > 0) {
          html += `
            <div class="mb-8">
              <h3 class="text-xs sm:text-sm font-bold text-on-surface uppercase tracking-wide mb-3 flex items-center gap-2">
                <span>🥗🌿</span> Ensaladas Weekend
              </h3>
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
                ${ensaladas.map(item => ProductCardComponent.renderCard(item)).join("")}
              </div>
            </div>
          `;
        }

        if (makis.length > 0) {
          html += `
            <div class="mb-6">
              <h3 class="text-xs sm:text-sm font-bold text-on-surface uppercase tracking-wide mb-3 flex items-center gap-2">
                <span>🍱🍣</span> Makis Nikkei Fusión
              </h3>
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
                ${makis.map(item => ProductCardComponent.renderCard(item)).join("")}
              </div>
            </div>
          `;
        }
      } else if (cat.id === "bebidas-jugos") {
        const smoothies = categoryItems.filter(i => i.subcategory === "smoothies-bubble-tea");
        const jugos = categoryItems.filter(i => i.subcategory === "bebidas-jugos-frappes");
        const refrescos = categoryItems.filter(i => i.subcategory === "refrescos-calientes");

        if (smoothies.length > 0) {
          html += `
            <div class="mb-8">
              <h3 class="text-xs sm:text-sm font-bold text-on-surface uppercase tracking-wide mb-3 flex items-center gap-2">
                <span>🥤🍓</span> Smoothies 100% Natural &amp; Bubble Tea 🧋
              </h3>
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
                ${smoothies.map(item => ProductCardComponent.renderCard(item)).join("")}
              </div>
            </div>
          `;
        }

        if (jugos.length > 0) {
          html += `
            <div class="mb-8">
              <h3 class="text-xs sm:text-sm font-bold text-on-surface uppercase tracking-wide mb-3 flex items-center gap-2">
                <span>🍹🍧</span> Jugos de Fruta Natural, Frappes &amp; Milkshakes
              </h3>
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
                ${jugos.map(item => ProductCardComponent.renderCard(item)).join("")}
              </div>
            </div>
          `;
        }

        if (refrescos.length > 0) {
          html += `
            <div class="mb-6">
              <h3 class="text-xs sm:text-sm font-bold text-on-surface uppercase tracking-wide mb-3 flex items-center gap-2">
                <span>🧊☕</span> Jarras de Refrescos (1L y 1/2L), Gaseosas &amp; Calientes
              </h3>
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
                ${refrescos.map(item => ProductCardComponent.renderCard(item)).join("")}
              </div>
            </div>
          `;
        }
      } else if (cat.id === "cocteles-licores") {
        const drinks = categoryItems.filter(i => i.subcategory === "drinks");
        const botellas = categoryItems.filter(i => i.subcategory === "botellas");
        const cervezas = categoryItems.filter(i => i.subcategory === "cervezas");

        if (drinks.length > 0) {
          html += `
            <div class="mb-8">
              <h3 class="text-xs sm:text-sm font-bold text-amber-400 uppercase tracking-wide mb-3 flex items-center gap-2">
                <span>🍸🍹</span> Drinks &amp; Coctelería de Autor (Chilcanos, Sours, Mojitos, Tragos)
              </h3>
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
                ${drinks.map(item => ProductCardComponent.renderCard(item)).join("")}
              </div>
            </div>
          `;
        }

        if (botellas.length > 0) {
          html += `
            <div class="mb-8">
              <h3 class="text-xs sm:text-sm font-bold text-amber-400 uppercase tracking-wide mb-3 flex items-center gap-2">
                <span>🍾🥂</span> Botellas de Licores (Con insumos de cortesía)
              </h3>
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
                ${botellas.map(item => ProductCardComponent.renderCard(item)).join("")}
              </div>
            </div>
          `;
        }

        if (cervezas.length > 0) {
          html += `
            <div class="mb-6">
              <h3 class="text-xs sm:text-sm font-bold text-amber-400 uppercase tracking-wide mb-3 flex items-center gap-2">
                <span>🍺🍻</span> Cervezas Nacionales e Importadas
              </h3>
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
                ${cervezas.map(item => ProductCardComponent.renderCard(item)).join("")}
              </div>
            </div>
          `;
        }
      } else {
        // Standard category rendering
        html += `
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 mb-6">
            ${categoryItems.map(item => ProductCardComponent.renderCard(item)).join("")}
          </div>
        `;
      }

      html += `</section>`;
    });

    mainContainer.innerHTML = html;
  }

  renderDeliveryNoticeSection() {
    return `
      <!-- Delivery & Notice Section -->
      <section class="mb-8 grid grid-cols-1 md:grid-cols-2 gap-3.5" id="nota-delivery" style="scroll-margin-top: 70px;">
        <!-- Notice Card -->
        <div class="bg-surface-container-low border border-primary/30 rounded-2xl p-4 sm:p-5 flex flex-col justify-between shadow-sm">
          <div>
            <h2 class="text-primary mb-2 flex items-center gap-2 font-bold text-base">
              <span>ℹ️</span> ¡NOTA IMPORTANTE!
            </h2>
            <p class="text-on-surface-variant text-xs mb-3 leading-relaxed">
              *PARA LOS DESPACHOS DE DELIVERY, SE AÑADIRÁ UN CARGO POR PEDIDO SEGÚN SE REQUIERA.
            </p>
            <p class="text-[11px] text-on-surface-variant leading-relaxed">
              *A partir de las 11:30 PM no incluye papas fritas en los platos que aplique.
            </p>
          </div>
          <div class="mt-3 pt-2 border-t border-outline-variant/40 flex items-center gap-2">
            <span class="text-xs">🛵</span>
            <span class="text-xs font-bold text-primary">Delivery rápido y seguro en todo Huarmey</span>
          </div>
        </div>

        <!-- Packaging Options Card -->
        <div class="bg-surface-container-low border border-outline-variant rounded-2xl p-4 sm:p-5 flex flex-col justify-between shadow-sm">
          <div>
            <h3 class="text-on-surface mb-2 font-bold text-sm uppercase flex items-center gap-2">
              <span>🥡</span> Empaques y Envases Descartables
            </h3>
            <p class="text-xs text-on-surface-variant mb-3">
              Selecciona tus envases ecológicos directamente al armar tu pedido en el carrito.
            </p>
            <div class="flex flex-wrap gap-2 text-[11px]">
              <span class="px-2.5 py-1 rounded-lg bg-surface-container border border-outline-variant text-on-surface flex items-center gap-1">
                <span>🍱</span> Tupper: S/ 1.00
              </span>
              <span class="px-2.5 py-1 rounded-lg bg-surface-container border border-outline-variant text-on-surface flex items-center gap-1">
                <span>🛍️</span> Bolsa: S/ 1.00
              </span>
              <span class="px-2.5 py-1 rounded-lg bg-surface-container border border-outline-variant text-on-surface flex items-center gap-1">
                <span>🥤</span> Vaso: S/ 1.00
              </span>
            </div>
          </div>
          <div class="mt-3 pt-2 border-t border-outline-variant/40 text-[11px] text-on-surface-variant">
            🌱 Ayúdanos a cuidar el medio ambiente
          </div>
        </div>
      </section>
    `;
  }

  renderPaymentSection() {
    return `
      <!-- Payment & QR Section -->
      <section class="mb-12 pt-4" id="pago" style="scroll-margin-top: 70px;">
        <div class="flex items-center gap-2.5 mb-5 pb-2 border-b border-outline-variant/60">
          <div class="w-9 h-9 rounded-xl bg-primary/20 flex items-center justify-center text-lg shadow-sm">
            💳
          </div>
          <div>
            <h2 class="text-primary tracking-tight uppercase text-lg sm:text-xl font-black">
              Escanea y Paga
            </h2>
            <p class="text-xs text-on-surface-variant mt-0.5">Pagos directos y seguros vía Yape o Plin</p>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
          <!-- QR Card -->
          <div class="bg-surface-container-low border border-primary/40 rounded-2xl p-5 flex flex-col items-center text-center shadow-lg">
            <h3 class="text-base font-bold text-on-surface uppercase mb-3 flex items-center gap-2">
              <span>📱</span> Código QR Yape / Plin
            </h3>
            <div class="w-48 h-48 bg-white p-3 rounded-2xl shadow-inner flex items-center justify-center mb-3">
              <img 
                src="${PAYMENT_INFO.qrImage}" 
                alt="QR de Pago Weekend"
                class="w-full h-full object-contain"
                loading="lazy"
                onerror="this.src='https://placehold.co/200x200/0acc80/000?text=QR+Weekend'"
              />
            </div>
            <span class="text-xs font-bold text-primary uppercase tracking-wider">${PAYMENT_INFO.accountName}</span>
            <p class="text-[11px] text-on-surface-variant mt-1">Escanea desde tu app bancaria favorita</p>
          </div>

          <!-- Account Info Card -->
          <div class="bg-surface-container-low border border-outline-variant rounded-2xl p-5 flex flex-col justify-between shadow-sm">
            <div>
              <h3 class="text-base font-bold text-on-surface uppercase mb-3 flex items-center gap-2">
                <span>📍</span> Datos de Contacto y Local
              </h3>
              <div class="space-y-3 text-xs text-on-surface-variant">
                <div class="flex items-start gap-2">
                  <span class="text-sm">🏢</span>
                  <div>
                    <strong class="text-on-surface block">Razón Social:</strong>
                    <span>${PAYMENT_INFO.accountName}</span>
                  </div>
                </div>
                <div class="flex items-start gap-2">
                  <span class="text-sm">📍</span>
                  <div>
                    <strong class="text-on-surface block">Dirección:</strong>
                    <span>${PAYMENT_INFO.address}</span>
                  </div>
                </div>
                <div class="flex items-start gap-2">
                  <span class="text-sm">📞</span>
                  <div>
                    <strong class="text-on-surface block">Central Telefónica / WhatsApp:</strong>
                    <span class="text-primary font-bold">961 336 674</span>
                  </div>
                </div>
              </div>
            </div>

            <div class="mt-4 pt-3 border-t border-outline-variant/40">
              <a 
                href="https://wa.me/51961336674" 
                target="_blank" 
                rel="noopener noreferrer"
                class="w-full py-2.5 px-4 bg-primary text-black font-bold text-xs uppercase rounded-xl flex items-center justify-center gap-2 hover:bg-primary-container transition-all active:scale-95 shadow-md"
              >
                <span>💬</span>
                <span>Contactar por WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    `;
  }
}
