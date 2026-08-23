// @ts-nocheck
import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Plus, Check, Sparkles } from 'lucide-react';
import { FULL_MENU_ITEMS, MENU_CATEGORIES } from '../../infrastructure/data/fullMenuData.js';
import { SECTION_THEMES } from './ProductCardComponent.js';

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

interface MenuSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCategory?: (categoryId: string) => void;
}

// Normalize strings to strip accents for seamless search matching
const normalizeText = (text: string = ''): string => {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
};

export const MenuSearchModal: React.FC<MenuSearchModalProps> = ({
  isOpen,
  onClose,
  onSelectCategory
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [addedItemIds, setAddedItemIds] = useState<{ [id: string]: boolean }>({});
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }, 100);
    } else {
      setSearchTerm('');
      setSelectedCategory('all');
    }
  }, [isOpen]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Filtered menu items
  const filteredItems = useMemo(() => {
    const normalizedQuery = normalizeText(searchTerm.trim());

    return (FULL_MENU_ITEMS as MenuItem[]).filter((item) => {
      // Category filter
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }

      if (!normalizedQuery) {
        return true;
      }

      const nameMatch = normalizeText(item.name).includes(normalizedQuery);
      const descMatch = item.description ? normalizeText(item.description).includes(normalizedQuery) : false;
      const badgeMatch = item.badge ? normalizeText(item.badge).includes(normalizedQuery) : false;
      const subcatMatch = item.subcategory ? normalizeText(item.subcategory).includes(normalizedQuery) : false;
      
      const catObj = MENU_CATEGORIES.find((c) => c.id === item.category);
      const catMatch = catObj ? normalizeText(catObj.name).includes(normalizedQuery) : false;

      return nameMatch || descMatch || badgeMatch || subcatMatch || catMatch;
    });
  }, [searchTerm, selectedCategory]);

  const handleAddToCart = useCallback(async (item: MenuItem, e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();

    setAddedItemIds((prev) => ({ ...prev, [item.id]: true }));
    setTimeout(() => {
      setAddedItemIds((prev) => ({ ...prev, [item.id]: false }));
    }, 1200);

    const buttonEl = e.currentTarget as HTMLElement;
    const cardEl = buttonEl.closest('.search-item-card') as HTMLElement;

    if ((window as any).appInstance?.cartController) {
      await (window as any).appInstance.cartController.addItemToCart(item.id, buttonEl, cardEl);
    } else {
      document.dispatchEvent(new CustomEvent('cart:add', { detail: { itemId: item.id } }));
    }
  }, []);

  const handleCategoryChipClick = (catId: string) => {
    setSelectedCategory((prev) => (prev === catId ? 'all' : catId));
  };

  const handleNavigateToCategory = (catId: string) => {
    onClose();
    if (onSelectCategory) {
      onSelectCategory(catId);
    } else {
      setTimeout(() => {
        const el = document.getElementById(`sec-${catId}`);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          id="search-modal"
          className="fixed inset-0 z-50 flex items-start justify-center p-3 sm:p-4 md:p-6 overflow-y-auto bg-black/85 backdrop-blur-md"
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="w-full max-w-2xl bg-[#121214] border border-white/15 rounded-3xl shadow-2xl overflow-hidden my-auto sm:my-8 text-white flex flex-col max-h-[88vh]"
          >
            {/* Header del Modal de Búsqueda */}
            <div className="p-4 sm:p-5 border-b border-white/10 bg-[#18181b]/95 sticky top-0 z-20">
              <div className="flex items-center justify-between gap-3 mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-weekend-neon/15 border border-weekend-neon/50 flex items-center justify-center text-weekend-neon">
                    <Search size={18} />
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-black uppercase tracking-tight text-white flex items-center gap-2">
                      Buscar en la Carta <span className="text-weekend-neon">Weekend</span>
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="hidden sm:inline-block text-[10px] text-gray-400 bg-white/5 border border-white/10 px-2 py-0.5 rounded-lg font-mono">
                    ESC para salir
                  </span>
                  <button
                    type="button"
                    id="close-search-btn"
                    onClick={onClose}
                    className="p-1.5 rounded-xl text-gray-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                    aria-label="Cerrar búsqueda"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>

              {/* Input Principal con icono de búsqueda y limpiar */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-weekend-neon">
                  <Search size={18} />
                </div>
                <input
                  ref={inputRef}
                  id="menu-search-input"
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Escribe un plato, ingrediente o trago (ej. BBQ, Mostrito, Pisco, Maki)..."
                  className="w-full pl-10 pr-10 py-3 bg-black/60 border border-white/15 focus:border-weekend-neon focus:ring-1 focus:ring-weekend-neon rounded-2xl text-sm font-semibold text-white placeholder-gray-500 outline-none transition-all"
                />
                {searchTerm && (
                  <button
                    type="button"
                    onClick={() => {
                      setSearchTerm('');
                      if (inputRef.current) inputRef.current.focus();
                    }}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white cursor-pointer"
                    title="Limpiar texto"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>

              {/* Chips rápidos de categorías */}
              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-3 -mb-1 pb-1">
                <button
                  type="button"
                  onClick={() => setSelectedCategory('all')}
                  className={`px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap transition-all border shrink-0 cursor-pointer ${
                    selectedCategory === 'all'
                      ? 'bg-weekend-neon text-black border-weekend-neon font-black shadow-[0_0_10px_rgba(10,204,128,0.4)]'
                      : 'bg-white/5 border-white/10 text-gray-400 hover:text-white hover:border-white/20'
                  }`}
                >
                  ✨ Todos ({FULL_MENU_ITEMS.length})
                </button>
                {MENU_CATEGORIES.map((cat) => {
                  const theme = SECTION_THEMES[cat.id] || { hex: '#0ACC80', rgb: '10, 204, 128' };
                  const isSelected = selectedCategory === cat.id;
                  const count = (FULL_MENU_ITEMS as MenuItem[]).filter((i) => i.category === cat.id).length;

                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => handleCategoryChipClick(cat.id)}
                      className={`px-2.5 py-1 rounded-full text-xs font-bold whitespace-nowrap transition-all border shrink-0 flex items-center gap-1 cursor-pointer ${
                        isSelected
                          ? 'shadow-md font-black'
                          : 'bg-white/5 border-white/10 text-gray-400 hover:text-white hover:border-white/20'
                      }`}
                      style={{
                        backgroundColor: isSelected ? theme.hex : undefined,
                        borderColor: isSelected ? theme.hex : undefined,
                        color: isSelected ? '#000000' : undefined,
                        boxShadow: isSelected ? `0 0 10px rgba(${theme.rgb}, 0.5)` : undefined
                      }}
                    >
                      <span>{cat.emoji}</span>
                      <span>{cat.name}</span>
                      <span className="text-[10px] opacity-75">({count})</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Lista de Resultados con Scroll */}
            <div id="search-results-list" className="p-4 sm:p-5 overflow-y-auto flex-1 divide-y divide-white/5 space-y-3">
              <div className="flex items-center justify-between text-xs text-gray-400 px-1 pb-1">
                <span>
                  {filteredItems.length === 1 ? '1 plato encontrado' : `${filteredItems.length} platos encontrados`}
                </span>
                {selectedCategory !== 'all' && (
                  <button
                    type="button"
                    onClick={() => setSelectedCategory('all')}
                    className="text-weekend-neon hover:underline font-bold"
                  >
                    Ver todas las categorías
                  </button>
                )}
              </div>

              {filteredItems.length === 0 ? (
                <div className="py-12 text-center flex flex-col items-center justify-center gap-3">
                  <div className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-500">
                    <Search size={26} />
                  </div>
                  <div>
                    <h4 className="text-base font-black uppercase text-white mb-1">No encontramos platos</h4>
                    <p className="text-xs text-gray-400 max-w-sm mx-auto">
                      No hay resultados para "{searchTerm}". Prueba buscando con términos como <span className="text-weekend-neon font-bold">alitas</span>, <span className="text-[#FFE600] font-bold">hamburguesa</span>, <span className="text-[#00FFA3] font-bold">maki</span> o <span className="text-[#2979FF] font-bold">chilcano</span>.
                    </p>
                  </div>
                  {selectedCategory !== 'all' && (
                    <button
                      type="button"
                      onClick={() => setSelectedCategory('all')}
                      className="mt-2 px-4 py-2 bg-weekend-neon text-black rounded-full text-xs font-black uppercase tracking-wider hover:bg-white transition-colors"
                    >
                      Buscar en todas las categorías
                    </button>
                  )}
                </div>
              ) : (
                filteredItems.map((item) => {
                  const theme = SECTION_THEMES[item.category] || { hex: '#0ACC80', rgb: '10, 204, 128' };
                  const isAdded = !!addedItemIds[item.id];
                  const catObj = MENU_CATEGORIES.find((c) => c.id === item.category);

                  return (
                    <div
                      key={item.id}
                      id={`search-item-${item.id}`}
                      className="search-item-card pt-3 first:pt-0 group flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-3 rounded-2xl hover:bg-white/5 border border-transparent hover:border-white/10 transition-all"
                    >
                      <div className="flex-1 min-w-0 pr-2">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          {catObj && (
                            <button
                              type="button"
                              onClick={() => handleNavigateToCategory(item.category)}
                              className="text-[10px] font-black uppercase px-2 py-0.5 rounded-md border flex items-center gap-1 hover:brightness-125 transition-all cursor-pointer"
                              style={{
                                color: theme.hex,
                                borderColor: `${theme.hex}50`,
                                backgroundColor: `rgba(${theme.rgb}, 0.12)`
                              }}
                              title={`Ir a la sección ${catObj.name}`}
                            >
                              <span>{catObj.emoji}</span>
                              <span>{catObj.name}</span>
                            </button>
                          )}
                          {item.badge && (
                            <span
                              className="font-black text-[9px] tracking-wider px-2 py-0.5 rounded-full uppercase inline-block"
                              style={{
                                backgroundColor: theme.hex,
                                color: '#000000',
                                boxShadow: `0 0 8px rgba(${theme.rgb}, 0.4)`
                              }}
                            >
                              {item.badge}
                            </span>
                          )}
                        </div>

                        <h4
                          onClick={() => handleNavigateToCategory(item.category)}
                          className="font-extrabold text-sm sm:text-base text-white uppercase group-hover:text-weekend-neon transition-colors cursor-pointer flex items-center gap-1"
                        >
                          {item.name}
                        </h4>

                        {item.description && (
                          <p className="text-xs text-gray-400 mt-1 line-clamp-2 leading-relaxed">
                            {item.description}
                          </p>
                        )}
                      </div>

                      {/* Precio y Botón de Añadir */}
                      <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-white/5">
                        <span
                          className="font-black text-base sm:text-lg whitespace-nowrap"
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
                          onClick={(e) => handleAddToCart(item, e)}
                          className={`flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-black uppercase transition-all duration-200 active:scale-95 shadow-sm cursor-pointer ${
                            isAdded
                              ? 'bg-weekend-neon text-black border border-weekend-neon'
                              : 'border'
                          }`}
                          style={{
                            color: isAdded ? '#000000' : theme.hex,
                            borderColor: isAdded ? theme.hex : `${theme.hex}80`,
                            backgroundColor: isAdded ? theme.hex : `rgba(${theme.rgb}, 0.15)`,
                            boxShadow: `0 0 12px rgba(${theme.rgb}, 0.25)`
                          }}
                          title={`Añadir ${item.name} al carrito`}
                        >
                          {isAdded ? (
                            <>
                              <Check size={14} className="stroke-[3]" />
                              <span>¡Añadido!</span>
                            </>
                          ) : (
                            <>
                              <Plus size={14} className="stroke-[3]" />
                              <span>Añadir</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Footer del Modal */}
            <div className="p-3 sm:p-4 bg-black/60 border-t border-white/10 flex items-center justify-between text-xs text-gray-400">
              <div className="flex items-center gap-2">
                <Sparkles size={14} className="text-weekend-neon" />
                <span className="font-semibold text-[11px] sm:text-xs">
                  Weekend! Huarmey • Carta Digital 2026
                </span>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="text-white hover:text-weekend-neon font-bold text-xs cursor-pointer"
              >
                Cerrar
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
