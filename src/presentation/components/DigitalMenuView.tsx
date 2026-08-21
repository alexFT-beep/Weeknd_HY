import React, { useState, useEffect, useRef } from 'react';
import { SECTION_THEMES } from './ProductCardComponent.js';
import { Plus, Search, ChevronDown, Sparkles, ShoppingBag, ShieldCheck, MapPin, Truck, Check } from 'lucide-react';

interface Category {
  id: string;
  name: string;
  emoji: string;
  color: string;
  rgb: string;
  description?: string;
}

interface MenuItem {
  id: string;
  name: string;
  price: number;
  category: string;
  subcategory?: string;
  description?: string;
  image?: string;
  badge?: string;
  isFeatured?: boolean;
  options?: string[];
  formattedPrice?: string;
}

interface DigitalMenuViewProps {
  onSearchClick?: () => void;
}

export const DigitalMenuView: React.FC<DigitalMenuViewProps> = ({ onSearchClick }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [items, setItems] = useState<MenuItem[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('alitas');
  const [addedItemIds, setAddedItemIds] = useState<{ [key: string]: boolean }>({});
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    let isMounted = true;
    
    const loadMenuData = async () => {
      try {
        if ((window as any).appInstance?.getMenuUseCase) {
          const fullMenu = await (window as any).appInstance.getMenuUseCase.getFullMenu();
          if (isMounted) {
            setCategories(fullMenu.categories || []);
            setItems(fullMenu.items || []);
            setIsLoading(false);
          }
        } else {
          // Fallback direct import from data source if appInstance loading
          const { MENU_CATEGORIES, FULL_MENU_ITEMS } = await import('../../infrastructure/data/fullMenuData.js');
          if (isMounted) {
            setCategories(MENU_CATEGORIES as Category[]);
            setItems(FULL_MENU_ITEMS as MenuItem[]);
            setIsLoading(false);
          }
        }
      } catch (err) {
        console.error("Error loading menu data in DigitalMenuView:", err);
        setIsLoading(false);
      }
    };

    loadMenuData();

    return () => {
      isMounted = false;
    };
  }, []);

  // IntersectionObserver to auto-update active category chip on scroll
  useEffect(() => {
    if (categories.length === 0 || isLoading) return;

    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    const handleIntersect: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const catId = entry.target.id.replace('sec-', '');
          if (catId) {
            setActiveCategory(catId);
          }
        }
      });
    };

    observerRef.current = new IntersectionObserver(handleIntersect, {
      root: null,
      rootMargin: '-20% 0px -65% 0px',
      threshold: 0.05
    });

    categories.forEach((cat) => {
      const el = document.getElementById(`sec-${cat.id}`);
      if (el && observerRef.current) {
        observerRef.current.observe(el);
      }
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [categories, isLoading]);

  const scrollToCategory = (catId: string) => {
    setActiveCategory(catId);
    const target = document.getElementById(`sec-${catId}`);
    if (target) {
      const offset = 120;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = target.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleAddToCart = async (item: MenuItem, e: React.MouseEvent) => {
    e.stopPropagation();
    
    // Feedback visual instantaneo en boton
    setAddedItemIds((prev) => ({ ...prev, [item.id]: true }));
    setTimeout(() => {
      setAddedItemIds((prev) => ({ ...prev, [item.id]: false }));
    }, 1200);

    // Invocar controlador hexagonal
    if ((window as any).appInstance?.cartController) {
      await (window as any).appInstance.cartController.addItemToCart(item.id);
    } else {
      // Disparar evento alternativo
      const btnMock = document.createElement('button');
      btnMock.setAttribute('data-action', 'add-to-cart');
      btnMock.setAttribute('data-item-id', item.id);
      document.dispatchEvent(new CustomEvent('cart:add', { detail: { itemId: item.id } }));
    }
  };

  const formatPrice = (price: number) => {
    return `S/ ${Number(price).toFixed(2)}`;
  };

  if (isLoading) {
    return (
      <div className="py-20 text-center flex flex-col items-center justify-center space-y-4">
        <div className="w-12 h-12 border-4 border-weekend-neon border-t-transparent rounded-full animate-spin"></div>
        <p className="text-weekend-neon font-mono text-sm tracking-widest uppercase animate-pulse">
          Cargando carta digital...
        </p>
      </div>
    );
  }

  return (
    <div className="w-full relative">
      {/* BARRA PEGAJOSA DE NAVEGACIÓN POR CHIPS DE CATEGORÍAS (NEÓN) */}
      <div className="sticky top-0 z-30 bg-black/95 backdrop-blur-md border-b border-white/10 py-2.5 mb-6 -mx-3 px-3 sm:-mx-4 sm:px-4">
        <div 
          id="category-chips-nav" 
          className="flex space-x-2 overflow-x-auto no-scrollbar py-1 scroll-smooth"
        >
          {categories.map((cat) => {
            const theme = SECTION_THEMES[cat.id] || SECTION_THEMES['alitas'];
            const isActive = activeCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => scrollToCategory(cat.id)}
                className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-full text-xs font-extrabold uppercase whitespace-nowrap transition-all duration-200 shrink-0 border ${
                  isActive 
                    ? 'scale-105 shadow-lg' 
                    : 'bg-white/5 border-white/10 text-gray-400 hover:text-white hover:border-white/20'
                }`}
                style={{
                  backgroundColor: isActive ? theme.hex : undefined,
                  borderColor: isActive ? theme.hex : undefined,
                  color: isActive ? '#000000' : undefined,
                  boxShadow: isActive ? `0 0 15px rgba(${theme.rgb}, 0.5)` : undefined
                }}
              >
                <span className="text-sm">{cat.emoji}</span>
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* AVISO INFORMATIVO DE DELIVERY Y ATENCIÓN */}
      <div className="mb-8 p-4 rounded-2xl bg-gradient-to-r from-neutral-900/90 via-black to-neutral-900/90 border border-white/10 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-weekend-neon/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-weekend-neon/10 border border-weekend-neon/30 flex items-center justify-center shrink-0">
              <Truck className="w-5 h-5 text-weekend-neon" />
            </div>
            <div>
              <h4 className="text-sm font-extrabold uppercase tracking-wide text-white flex items-center gap-2">
                ¡Delivery a todo Huarmey! <span className="text-[10px] bg-weekend-neon text-black px-2 py-0.5 rounded-full font-black">ACTIVO</span>
              </h4>
              <p className="text-xs text-gray-400 mt-0.5">
                Av. Cabo Alberto Reyes #140 • Envío directo hasta tu puerta
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-300 bg-white/5 border border-white/10 px-3 py-1.5 rounded-xl w-full md:w-auto justify-between md:justify-start">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-weekend-neon" />
              <span>Sin cargos ocultos por empaque</span>
            </span>
          </div>
        </div>
      </div>

      {/* SECCIONES Y PLATOS POR CATEGORÍA */}
      <div className="space-y-12 pb-16">
        {categories.map((cat) => {
          const theme = SECTION_THEMES[cat.id] || SECTION_THEMES['alitas'];
          const categoryItems = items.filter((item) => item.category === cat.id);

          if (categoryItems.length === 0) return null;

          // Agrupar subcategorías si aplican
          const isAlitas = cat.id === 'alitas';
          const isHamburguesas = cat.id === 'hamburguesas';
          const isBroaster = cat.id === 'broaster';
          const isParrillas = cat.id === 'parrillas';
          const isPastas = cat.id === 'pastas';

          const rondasAlitas = isAlitas ? categoryItems.filter(i => i.subcategory === 'rondas-alitas') : [];
          const regularAlitas = isAlitas ? categoryItems.filter(i => i.subcategory !== 'rondas-alitas') : categoryItems;

          const mainBurgers = isHamburguesas ? categoryItems.filter(i => i.subcategory !== 'adicionales-hamburguesas') : [];
          const adicionalsBurgers = isHamburguesas ? categoryItems.filter(i => i.subcategory === 'adicionales-hamburguesas') : [];

          const mainBroaster = isBroaster ? categoryItems.filter(i => i.subcategory !== 'agregados-broaster') : [];
          const agregadosBroaster = isBroaster ? categoryItems.filter(i => i.subcategory === 'agregados-broaster') : [];

          const mainParrillas = isParrillas ? categoryItems.filter(i => i.subcategory !== 'combos-parrilleros') : [];
          const combosParrillas = isParrillas ? categoryItems.filter(i => i.subcategory === 'combos-parrilleros') : [];

          const mainPastas = isPastas ? categoryItems.filter(i => i.subcategory !== 'acompana-pastas') : [];
          const acompanaPastas = isPastas ? categoryItems.filter(i => i.subcategory === 'acompana-pastas') : [];

          return (
            <section 
              key={cat.id} 
              id={`sec-${cat.id}`} 
              className="scroll-mt-32 pt-2"
            >
              {/* ENCABEZADO DE CATEGORÍA CON ACCENTO NEÓN */}
              <div 
                className="flex items-center justify-between gap-3 pb-3 mb-6 border-b border-white/10"
                style={{ borderColor: `${theme.hex}40` }}
              >
                <div className="flex items-center gap-3">
                  <div 
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shadow-lg border"
                    style={{ 
                      backgroundColor: `${theme.hex}20`, 
                      borderColor: theme.hex,
                      boxShadow: `0 0 15px rgba(${theme.rgb}, 0.3)`
                    }}
                  >
                    {cat.emoji}
                  </div>
                  <div>
                    <h2 
                      className="text-lg sm:text-xl font-black uppercase tracking-wider text-white"
                      style={{ textShadow: `0 0 10px rgba(${theme.rgb}, 0.3)` }}
                    >
                      {cat.name}
                    </h2>
                    {cat.description && (
                      <p className="text-xs text-gray-400 mt-0.5 line-clamp-1">{cat.description}</p>
                    )}
                  </div>
                </div>
                <span 
                  className="text-[10px] font-black tracking-widest px-2.5 py-1 rounded-full uppercase border"
                  style={{ 
                    backgroundColor: `${theme.hex}15`, 
                    color: theme.hex, 
                    borderColor: `${theme.hex}50` 
                  }}
                >
                  {categoryItems.length} OPCIONES
                </span>
              </div>

              {/* CONTENIDO DE ALITAS */}
              {isAlitas ? (
                <div className="space-y-8">
                  {rondasAlitas.length > 0 && (
                    <div>
                      <h3 className="text-xs font-black uppercase tracking-widest text-weekend-neon mb-3 flex items-center gap-2">
                        <Sparkles className="w-3.5 h-3.5" /> RONDAS & COMBOS FESTÍN (RECOMENDADOS)
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                        {rondasAlitas.map((item) => renderCardItem(item, theme, addedItemIds[item.id], handleAddToCart))}
                      </div>
                    </div>
                  )}

                  <div>
                    <h3 className="text-xs font-black uppercase tracking-widest text-gray-300 mb-3">
                      ALITAS INDIVIDUALES (08 UNIDADES + PAPAS + ENSALADA)
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                      {regularAlitas.map((item) => renderCardItem(item, theme, addedItemIds[item.id], handleAddToCart))}
                    </div>
                  </div>
                </div>
              ) : isHamburguesas ? (
                <div className="space-y-8">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                    {mainBurgers.map((item) => renderCardItem(item, theme, addedItemIds[item.id], handleAddToCart))}
                  </div>

                  {adicionalsBurgers.length > 0 && (
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
                      <h3 className="text-xs font-black uppercase tracking-widest text-gray-300 mb-3">
                        ADICIONALES PARA TU HAMBURGUESA
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {adicionalsBurgers.map((item) => renderRowItem(item, theme, addedItemIds[item.id], handleAddToCart))}
                      </div>
                    </div>
                  )}
                </div>
              ) : isBroaster ? (
                <div className="space-y-8">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                    {mainBroaster.map((item) => renderCardItem(item, theme, addedItemIds[item.id], handleAddToCart))}
                  </div>

                  {agregadosBroaster.length > 0 && (
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
                      <h3 className="text-xs font-black uppercase tracking-widest text-gray-300 mb-3">
                        AGREGADOS PARA TU BROASTER
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {agregadosBroaster.map((item) => renderRowItem(item, theme, addedItemIds[item.id], handleAddToCart))}
                      </div>
                    </div>
                  )}
                </div>
              ) : isParrillas ? (
                <div className="space-y-8">
                  <div>
                    <h3 className="text-xs font-black uppercase tracking-widest text-gray-300 mb-3">
                      CORTES A LA PARRILLA & ANTICUCHOS
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                      {mainParrillas.map((item) => renderCardItem(item, theme, addedItemIds[item.id], handleAddToCart))}
                    </div>
                  </div>

                  {combosParrillas.length > 0 && (
                    <div>
                      <h3 className="text-xs font-black uppercase tracking-widest text-weekend-neon mb-3 flex items-center gap-2">
                        <Sparkles className="w-3.5 h-3.5" /> COMBOS PARRILLEROS PARA COMPARTIR
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                        {combosParrillas.map((item) => renderCardItem(item, theme, addedItemIds[item.id], handleAddToCart))}
                      </div>
                    </div>
                  )}
                </div>
              ) : isPastas ? (
                <div className="space-y-8">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                    {mainPastas.map((item) => renderCardItem(item, theme, addedItemIds[item.id], handleAddToCart))}
                  </div>

                  {acompanaPastas.length > 0 && (
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
                      <h3 className="text-xs font-black uppercase tracking-widest text-gray-300 mb-3">
                        ACOMPAÑA TUS PASTAS
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {acompanaPastas.map((item) => renderRowItem(item, theme, addedItemIds[item.id], handleAddToCart))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                /* CATEGORÍAS GENERALES (Chifa, Salchipapas, Cocteles, Cervezas, Guarniciones, etc.) */
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                  {categoryItems.map((item) => renderCardItem(item, theme, addedItemIds[item.id], handleAddToCart))}
                </div>
              )}
            </section>
          );
        })}
      </div>
    </div>
  );
};

// AUXILIAR: Renderizado de tarjeta estándar en React
function renderCardItem(
  item: MenuItem, 
  theme: { hex: string; rgb: string }, 
  isAdded: boolean, 
  onAdd: (item: MenuItem, e: React.MouseEvent) => void
) {
  return (
    <div 
      key={item.id}
      id={`item-card-${item.id}`}
      className="bg-neutral-900/90 border border-white/10 hover:border-white/25 rounded-2xl p-4 flex flex-col justify-between text-left group relative overflow-hidden transition-all duration-200 hover:-translate-y-0.5 shadow-lg"
    >
      <div>
        <div className="flex justify-between items-start gap-2 mb-1.5">
          <div className="flex-1 min-w-0">
            {item.badge && (
              <span 
                className="font-black text-[9px] tracking-wider px-2 py-0.5 rounded-full uppercase mb-1.5 inline-block"
                style={{
                  backgroundColor: theme.hex,
                  color: '#000000',
                  boxShadow: `0 0 10px rgba(${theme.rgb}, 0.5)`
                }}
              >
                {item.badge}
              </span>
            )}
            <h3 className="font-extrabold text-white uppercase text-xs sm:text-sm leading-snug group-hover:text-weekend-neon transition-colors">
              {item.name}
            </h3>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span 
              className="font-extrabold whitespace-nowrap text-sm sm:text-base"
              style={{
                color: theme.hex,
                textShadow: `0 0 10px rgba(${theme.rgb}, 0.35)`
              }}
            >
              S/ {Number(item.price).toFixed(2)}
            </span>
            <button
              type="button"
              onClick={(e) => onAdd(item, e)}
              className={`flex items-center justify-center w-8 h-8 rounded-xl border transition-all duration-200 active:scale-90 shadow-sm ${
                isAdded ? 'bg-weekend-neon text-black border-weekend-neon' : ''
              }`}
              style={{
                color: isAdded ? '#000000' : theme.hex,
                borderColor: isAdded ? theme.hex : `${theme.hex}80`,
                backgroundColor: isAdded ? theme.hex : `rgba(${theme.rgb}, 0.12)`,
                boxShadow: `0 0 10px rgba(${theme.rgb}, 0.25)`
              }}
              title={`Añadir ${item.name} al carrito`}
            >
              {isAdded ? <Check className="w-4 h-4 stroke-[3]" /> : <Plus className="w-4 h-4 stroke-[3]" />}
            </button>
          </div>
        </div>
        {item.description && (
          <p className="text-[11px] sm:text-xs text-gray-400 leading-relaxed mt-1 line-clamp-2">
            {item.description}
          </p>
        )}
      </div>
    </div>
  );
}

// AUXILIAR: Renderizado de fila secundaria (Adicionales / Guarniciones)
function renderRowItem(
  item: MenuItem, 
  theme: { hex: string; rgb: string }, 
  isAdded: boolean, 
  onAdd: (item: MenuItem, e: React.MouseEvent) => void
) {
  return (
    <div 
      key={item.id}
      id={`item-card-${item.id}`}
      className="flex justify-between items-center border-b border-white/10 py-2 px-3 rounded-xl hover:bg-white/5 transition-colors group"
    >
      <div className="flex-1 pr-2 min-w-0">
        <div className="flex items-center gap-1.5 flex-wrap">
          <h4 className="text-xs sm:text-sm font-bold text-white uppercase group-hover:text-weekend-neon transition-colors">
            {item.name}
          </h4>
          {item.badge && (
            <span 
              className="text-[9px] font-bold px-1.5 py-0.5 rounded"
              style={{
                backgroundColor: `rgba(${theme.rgb}, 0.2)`,
                color: theme.hex
              }}
            >
              {item.badge}
            </span>
          )}
        </div>
        {item.description && (
          <span className="text-[10px] sm:text-xs text-gray-400 block mt-0.5 truncate">
            {item.description}
          </span>
        )}
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <span 
          className="font-extrabold whitespace-nowrap text-xs sm:text-sm"
          style={{
            color: theme.hex,
            textShadow: `0 0 8px rgba(${theme.rgb}, 0.3)`
          }}
        >
          S/ {Number(item.price).toFixed(2)}
        </span>
        <button
          type="button"
          onClick={(e) => onAdd(item, e)}
          className={`flex items-center justify-center w-7 h-7 rounded-lg border transition-all duration-200 active:scale-90 shadow-sm ${
            isAdded ? 'bg-weekend-neon text-black border-weekend-neon' : ''
          }`}
          style={{
            color: isAdded ? '#000000' : theme.hex,
            borderColor: isAdded ? theme.hex : `${theme.hex}80`,
            backgroundColor: isAdded ? theme.hex : `rgba(${theme.rgb}, 0.12)`
          }}
          title={`Añadir ${item.name} al carrito`}
        >
          {isAdded ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : <Plus className="w-3.5 h-3.5 stroke-[3]" />}
        </button>
      </div>
    </div>
  );
}
