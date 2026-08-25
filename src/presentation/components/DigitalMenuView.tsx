import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SECTION_THEMES } from './ProductCardComponent.js';
import { Plus, ChevronDown, Sparkles, ShieldCheck, Check, Eye, EyeOff, Search } from 'lucide-react';
import { MENU_CATEGORIES, FULL_MENU_ITEMS } from '../../infrastructure/data/fullMenuData.js';

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

// Memoized Card Component to prevent re-rendering all menu cards when single item state changes
const MenuCardItem = React.memo<{
  item: MenuItem;
  theme: { hex: string; rgb: string };
  isAdded: boolean;
  onAdd: (item: MenuItem, e: React.MouseEvent) => void;
}>(({ item, theme, isAdded, onAdd }) => {
  return (
    <div
      id={`item-card-${item.id}`}
      className="bg-neutral-900/90 border border-white/10 hover:border-white/25 rounded-2xl p-4 flex flex-col justify-between text-left group relative overflow-hidden transition-all duration-200 hover:-translate-y-0.5 shadow-lg"
      data-item-id={item.id}
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
              data-action="add-to-cart"
              data-item-id={item.id}
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
});

MenuCardItem.displayName = 'MenuCardItem';

// Memoized Row Item for side items / extras
const MenuRowItem = React.memo<{
  item: MenuItem;
  theme: { hex: string; rgb: string };
  isAdded: boolean;
  onAdd: (item: MenuItem, e: React.MouseEvent) => void;
}>(({ item, theme, isAdded, onAdd }) => {
  return (
    <div
      id={`item-card-${item.id}`}
      className="flex justify-between items-center border-b border-white/10 py-2 px-3 rounded-xl hover:bg-white/5 transition-colors group"
      data-item-id={item.id}
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
          data-action="add-to-cart"
          data-item-id={item.id}
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
});

MenuRowItem.displayName = 'MenuRowItem';

export const DigitalMenuView: React.FC<DigitalMenuViewProps> = ({ onSearchClick }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [items, setItems] = useState<MenuItem[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('alitas');
  const [addedItemIds, setAddedItemIds] = useState<{ [key: string]: boolean }>({});
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [expandedCategories, setExpandedCategories] = useState<{ [key: string]: boolean }>({});

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

  // IntersectionObserver para actualizar el chip activo al hacer scroll
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

  const toggleCategoryAccordion = useCallback((catId: string) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [catId]: !prev[catId]
    }));
  }, []);

  const setAllCategoriesExpanded = useCallback((expand: boolean) => {
    const nextState: { [key: string]: boolean } = {};
    categories.forEach((cat) => {
      nextState[cat.id] = expand;
    });
    setExpandedCategories(nextState);
  }, [categories]);

  const scrollToCategory = useCallback((catId: string) => {
    setActiveCategory(catId);
    setExpandedCategories((prev) => ({ ...prev, [catId]: true }));

    setTimeout(() => {
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
    }, 50);
  }, []);

  const handleAddToCart = useCallback(async (item: MenuItem, e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setAddedItemIds((prev) => ({ ...prev, [item.id]: true }));
    setTimeout(() => {
      setAddedItemIds((prev) => ({ ...prev, [item.id]: false }));
    }, 1200);

    const buttonEl = e.currentTarget as HTMLElement;
    const cardEl = document.getElementById(`item-card-${item.id}`) || (buttonEl.closest('.group') as HTMLElement);

    if ((window as any).appInstance?.cartController) {
      await (window as any).appInstance.cartController.addItemToCart(item.id, buttonEl, cardEl);
    } else {
      document.dispatchEvent(new CustomEvent('cart:add', { detail: { itemId: item.id } }));
    }
  }, []);

  // Pre-calculate items by category using useMemo to avoid filter calculations on re-render
  const itemsByCategory = useMemo(() => {
    const map: { [catId: string]: MenuItem[] } = {};
    items.forEach((item) => {
      if (!map[item.category]) map[item.category] = [];
      map[item.category].push(item);
    });
    return map;
  }, [items]);

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

      {/* BARRA PEGAJOSA DE CHIPS DE CATEGORÍAS (NEÓN) */}
      <div className="sticky top-0 z-30 bg-black/95 backdrop-blur-md border-b border-white/10 py-3 mb-6 -mx-3 px-3 sm:-mx-4 sm:px-4 flex flex-col gap-2">
        
        {/* FILA SUPERIOR: Botones de control masivo */}
        <div className="flex items-center justify-between gap-2">
          <span className="text-[11px] font-black text-weekend-neon uppercase tracking-widest flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" /> Menú Digital Weekend!
          </span>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              data-action="open-search"
              onClick={onSearchClick}
              className="px-2.5 py-1.5 bg-weekend-neon/10 hover:bg-weekend-neon/20 border border-weekend-neon/40 text-weekend-neon rounded-xl text-[11px] font-extrabold uppercase transition-all flex items-center gap-1 active:scale-95 cursor-pointer shadow-sm"
              title="Buscar platos o tragos en la carta"
            >
              <Search className="w-3.5 h-3.5 text-weekend-neon" />
              <span className="hidden sm:inline">Buscar</span>
            </button>
            <button
              type="button"
              onClick={() => setAllCategoriesExpanded(true)}
              className="px-2.5 py-1.5 bg-white/5 hover:bg-white/15 border border-white/10 text-gray-300 rounded-xl text-[11px] font-extrabold uppercase transition-all flex items-center gap-1 active:scale-95"
              title="Desplegar todas las categorías"
            >
              <Eye className="w-3.5 h-3.5 text-weekend-neon" />
              <span className="hidden sm:inline">Desplegar Todas</span>
            </button>
            <button
              type="button"
              onClick={() => setAllCategoriesExpanded(false)}
              className="px-2.5 py-1.5 bg-white/5 hover:bg-white/15 border border-white/10 text-gray-300 rounded-xl text-[11px] font-extrabold uppercase transition-all flex items-center gap-1 active:scale-95"
              title="Plegar todas las categorías"
            >
              <EyeOff className="w-3.5 h-3.5 text-gray-400" />
              <span className="hidden sm:inline">Plegar Todas</span>
            </button>
          </div>
        </div>

        {/* FILA DE CHIPS HORIZONTALES CON SCROLL SUAVE Y TRANSICIÓN RÚSTICA */}
        <div 
          id="category-chips-nav" 
          className="flex space-x-2 overflow-x-auto no-scrollbar py-1 scroll-smooth"
        >
          {categories.map((cat) => {
            const theme = SECTION_THEMES[cat.id] || SECTION_THEMES['alitas'];
            const isActive = activeCategory === cat.id;

            return (
              <motion.button
                key={cat.id}
                onClick={() => scrollToCategory(cat.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`relative flex items-center space-x-2 px-3.5 py-1.5 rounded-full text-xs font-extrabold uppercase whitespace-nowrap transition-all duration-200 shrink-0 border cursor-pointer ${
                  isActive 
                    ? 'shadow-lg z-10' 
                    : 'bg-white/5 border-white/10 text-gray-400 hover:text-white hover:border-white/20'
                }`}
                style={{
                  backgroundColor: isActive ? theme.hex : undefined,
                  borderColor: isActive ? theme.hex : undefined,
                  color: isActive ? '#000000' : undefined,
                  boxShadow: isActive ? `0 0 18px rgba(${theme.rgb}, 0.55)` : undefined
                }}
              >
                <span className="text-sm">{cat.emoji}</span>
                <span>{cat.name}</span>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* AVISO INFORMATIVO DE DELIVERY Y ATENCIÓN */}
      <div className="mb-8 p-4 rounded-2xl bg-gradient-to-r from-neutral-900/90 via-black to-neutral-900/90 border border-white/10 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-weekend-neon/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#C900FF]/15 border border-[#C900FF]/30 flex items-center justify-center shrink-0">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2.5" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="w-5 h-5 text-[#C900FF]"
              >
                <circle cx="5" cy="18" r="2.5" />
                <circle cx="19" cy="18" r="2.5" />
                <path d="M5 18h14" />
                <path d="M19 18v-5h-4l-3-4H7.5V6H4" />
                <rect x="5.5" y="9" width="5" height="5" rx="1" fill="currentColor" fillOpacity="0.2" />
                <path d="M12 9h4" />
                <path d="M16 9l1-2h2" />
              </svg>
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
          <div className="flex items-center gap-2 text-xs text-amber-300 bg-amber-500/10 border border-amber-500/30 px-3 py-1.5 rounded-xl w-full md:w-auto justify-between md:justify-start">
            <span className="flex items-center gap-1.5 font-semibold">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>Tápers y envases: +S/ 1.00 por plato/bebida</span>
            </span>
          </div>
        </div>
      </div>

      {/* SECCIONES DE CATEGORÍAS COMO ACORDEONES DESPLEGABLES */}
      <div className="space-y-6 pb-16">
        {categories.map((cat) => {
          const theme = SECTION_THEMES[cat.id] || SECTION_THEMES['alitas'];
          const categoryItems = itemsByCategory[cat.id] || [];

          const isExpanded = expandedCategories[cat.id] === true;

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
              className="scroll-mt-36 bg-neutral-900/60 border border-white/10 rounded-2xl p-4 transition-all duration-300 shadow-xl"
            >
              {/* ENCABEZADO ACORDEÓN DE LA CATEGORÍA */}
              <button
                type="button"
                onClick={() => toggleCategoryAccordion(cat.id)}
                className="w-full flex items-center justify-between gap-3 text-left focus:outline-none group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div 
                    className="w-11 h-11 rounded-2xl flex items-center justify-center text-2xl shadow-lg border shrink-0 transition-transform group-hover:scale-105"
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
                      className="text-base sm:text-xl font-black uppercase tracking-wider text-white group-hover:text-weekend-neon transition-colors"
                      style={{ textShadow: `0 0 10px rgba(${theme.rgb}, 0.3)` }}
                    >
                      {cat.name}
                    </h2>
                    {cat.description && (
                      <p className="text-xs text-gray-400 mt-0.5 line-clamp-1">{cat.description}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span 
                    className="text-[10px] font-black tracking-widest px-2.5 py-1 rounded-full uppercase border hidden sm:inline-block"
                    style={{ 
                      backgroundColor: `${theme.hex}15`, 
                      color: theme.hex, 
                      borderColor: `${theme.hex}50` 
                    }}
                  >
                    {categoryItems.length > 0 ? `${categoryItems.length} OPCIONES` : 'PRÓXIMAMENTE'}
                  </span>

                  <div 
                    className="w-8 h-8 rounded-xl flex items-center justify-center border transition-all duration-300"
                    style={{
                      backgroundColor: isExpanded ? theme.hex : 'rgba(255,255,255,0.05)',
                      color: isExpanded ? '#000000' : theme.hex,
                      borderColor: `${theme.hex}60`
                    }}
                  >
                    <ChevronDown 
                      className={`w-5 h-5 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} 
                    />
                  </div>
                </div>
              </button>

              {/* CONTENIDO DESPLEGABLE DE LA CATEGORÍA */}
              {isExpanded ? (
                <div className="pt-4 border-t border-white/5 mt-4 animate-in fade-in duration-300">
                  {isAlitas ? (
                    <div className="space-y-8">
                      {rondasAlitas.length > 0 && (
                        <div>
                          <h3 className="text-xs font-black uppercase tracking-widest text-weekend-neon mb-3 flex items-center gap-2">
                            <Sparkles className="w-3.5 h-3.5" /> RONDAS & COMBOS FESTIVALES PARA COMPARTIR
                          </h3>
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                            {rondasAlitas.map((item) => (
                              <MenuCardItem key={item.id} item={item} theme={theme} isAdded={!!addedItemIds[item.id]} onAdd={handleAddToCart} />
                            ))}
                          </div>
                        </div>
                      )}

                      <div>
                        {rondasAlitas.length > 0 && (
                          <h3 className="text-xs font-black uppercase tracking-widest text-gray-300 mb-3">
                            PORCIONES INDIVIDUALES (06, 12 Y 18 ALITAS)
                          </h3>
                        )}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                          {regularAlitas.map((item) => (
                            <MenuCardItem key={item.id} item={item} theme={theme} isAdded={!!addedItemIds[item.id]} onAdd={handleAddToCart} />
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : isHamburguesas ? (
                    <div className="space-y-8">
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                        {mainBurgers.map((item) => (
                          <MenuCardItem key={item.id} item={item} theme={theme} isAdded={!!addedItemIds[item.id]} onAdd={handleAddToCart} />
                        ))}
                      </div>

                      {adicionalsBurgers.length > 0 && (
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
                          <h3 className="text-xs font-black uppercase tracking-widest text-gray-300 mb-3">
                            ADICIONALES PARA TU HAMBURGUESA
                          </h3>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {adicionalsBurgers.map((item) => (
                              <MenuRowItem key={item.id} item={item} theme={theme} isAdded={!!addedItemIds[item.id]} onAdd={handleAddToCart} />
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ) : isBroaster ? (
                    <div className="space-y-8">
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                        {mainBroaster.map((item) => (
                          <MenuCardItem key={item.id} item={item} theme={theme} isAdded={!!addedItemIds[item.id]} onAdd={handleAddToCart} />
                        ))}
                      </div>

                      {agregadosBroaster.length > 0 && (
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
                          <h3 className="text-xs font-black uppercase tracking-widest text-gray-300 mb-3">
                            AGREGADOS PARA TU BROASTER
                          </h3>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {agregadosBroaster.map((item) => (
                              <MenuRowItem key={item.id} item={item} theme={theme} isAdded={!!addedItemIds[item.id]} onAdd={handleAddToCart} />
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ) : isParrillas ? (
                    <div className="space-y-8">
                      <div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                          {mainParrillas.map((item) => (
                            <MenuCardItem key={item.id} item={item} theme={theme} isAdded={!!addedItemIds[item.id]} onAdd={handleAddToCart} />
                          ))}
                        </div>
                      </div>

                      {combosParrillas.length > 0 && (
                        <div>
                          <h3 className="text-xs font-black uppercase tracking-widest text-weekend-neon mb-3 flex items-center gap-2">
                            <Sparkles className="w-3.5 h-3.5" /> COMBOS PARRILLEROS PARA COMPARTIR
                          </h3>
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                            {combosParrillas.map((item) => (
                              <MenuCardItem key={item.id} item={item} theme={theme} isAdded={!!addedItemIds[item.id]} onAdd={handleAddToCart} />
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ) : isPastas ? (
                    <div className="space-y-8">
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                        {mainPastas.map((item) => (
                          <MenuCardItem key={item.id} item={item} theme={theme} isAdded={!!addedItemIds[item.id]} onAdd={handleAddToCart} />
                        ))}
                      </div>

                      {acompanaPastas.length > 0 && (
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
                          <h3 className="text-xs font-black uppercase tracking-widest text-gray-300 mb-3">
                            ACOMPAÑA TUS PASTAS
                          </h3>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {acompanaPastas.map((item) => (
                              <MenuRowItem key={item.id} item={item} theme={theme} isAdded={!!addedItemIds[item.id]} onAdd={handleAddToCart} />
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    /* CATEGORÍAS GENERALES O VACÍAS */
                    categoryItems.length === 0 ? (
                      <div className="text-center py-8 px-4 border border-dashed border-cyan-500/30 rounded-2xl bg-cyan-500/5 my-2">
                        <span className="text-3xl mb-2 block">🐟🌊</span>
                        <h3 className="text-sm font-black uppercase text-cyan-400 tracking-wider">Especialidad Marina</h3>
                        <p className="text-xs text-white/50 mt-1 max-w-sm mx-auto">
                          Sección en preparación. Próximamente deliciosas recetas marinas artesanales.
                        </p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                        {categoryItems.map((item) => (
                          <MenuCardItem key={item.id} item={item} theme={theme} isAdded={!!addedItemIds[item.id]} onAdd={handleAddToCart} />
                        ))}
                      </div>
                    )
                  )}
                </div>
              ) : (
                <div 
                  onClick={() => toggleCategoryAccordion(cat.id)}
                  className="mt-2 text-center text-xs font-bold text-gray-400 py-1 cursor-pointer hover:text-white transition-colors"
                >
                  <span className="underline">
                    {categoryItems.length > 0 
                      ? `${categoryItems.length} platos en ${cat.name} ocultos (Toca para desplegar)` 
                      : `Sección ${cat.name} (Toca para desplegar)`}
                  </span>
                </div>
              )}
            </section>
          );
        })}
      </div>
    </div>
  );
};
