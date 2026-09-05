/**
 * @file MenuSearchModal.tsx
 * @description Modal flotante de búsqueda reactiva con filtro instantáneo por palabra clave (⌘K / Ctrl+K),
 * mostrando el tema neón de cada producto y permitiendo añadir al carrito de forma inmediata.
 */

import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Plus, Check } from 'lucide-react';
import { menuService } from '../services/menuService';
import { MenuItem } from '../../../data/fullMenuData';
import { useCart } from '../../cart/hooks/useCart';
import { SECTION_THEMES, DEFAULT_THEME } from '../hooks/useMenu';

/** Propiedades del modal de búsqueda de la carta */
export interface MenuSearchModalProps {
  /** Indica si el modal está visible en pantalla */
  readonly isOpen: boolean;
  /** Callback para cerrar la ventana modal */
  readonly onClose: () => void;
}

/**
 * Modal interactivo para búsqueda rápida de productos del menú.
 */
export const MenuSearchModal: React.FC<MenuSearchModalProps> = ({ isOpen, onClose }) => {

  const [query, setQuery] = useState('');
  const { addItem, items: cartItems } = useCart();
  const [addedItemIds, setAddedItemIds] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) {
          onClose();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const searchResults = useMemo<MenuItem[]>(() => {
    return menuService.searchItems(query);
  }, [query]);

  const cartItemIds = useMemo(() => {
    const map: Record<string, boolean> = {};
    cartItems.forEach(ci => {
      map[ci.product.id] = true;
    });
    return map;
  }, [cartItems]);

  const handleAdd = (item: MenuItem, e: React.MouseEvent) => {
    e.stopPropagation();
    addItem(item);
    setAddedItemIds(prev => ({ ...prev, [item.id]: true }));
    setTimeout(() => {
      setAddedItemIds(prev => ({ ...prev, [item.id]: false }));
    }, 1200);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[120] overflow-y-auto p-4 sm:p-6 md:p-20 flex items-start justify-center">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          className="relative w-full max-w-2xl bg-[#0a0a0e] border border-white/15 rounded-3xl shadow-2xl overflow-hidden text-white z-10 my-auto"
        >
          {/* Input Header */}
          <div className="p-4 border-b border-white/10 flex items-center gap-3 bg-zinc-950">
            <Search className="w-5 h-5 text-[#0acc80] shrink-0" />
            <input
              type="text"
              autoFocus
              maxLength={80}
              placeholder="Buscar por alitas, hamburguesas, bebidas, salsas..."
              value={query}
              onChange={e => setQuery(e.target.value.slice(0, 80))}
              className="flex-1 bg-transparent border-none outline-none text-white placeholder-gray-500 text-sm font-medium"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                className="p-1 text-gray-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1 bg-white/10 hover:bg-white/20 rounded-xl text-xs text-gray-300 transition-colors"
            >
              ESC
            </button>
          </div>

          {/* Results List */}
          <div className="max-h-[60vh] overflow-y-auto p-4 space-y-3">
            {searchResults.length === 0 ? (
              <div className="text-center py-10 text-gray-400 text-xs font-medium">
                No encontramos ningún platillo con <span className="text-white font-bold">"{query}"</span>
              </div>
            ) : (
              searchResults.map(item => {
                const theme = SECTION_THEMES[item.category] || DEFAULT_THEME;
                const isAdded = Boolean(addedItemIds[item.id] || cartItemIds[item.id]);

                return (
                  <div
                    key={item.id}
                    className="p-3 bg-zinc-900/70 border border-white/10 hover:border-white/25 rounded-2xl flex items-center justify-between gap-3 transition-colors"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-xs text-white uppercase truncate">
                          {item.name}
                        </span>
                        {item.badge && (
                          <span
                            className="text-[9px] font-black px-1.5 py-0.5 rounded text-black uppercase"
                            style={{ backgroundColor: theme.hex }}
                          >
                            {item.badge}
                          </span>
                        )}
                      </div>
                      {item.description && (
                        <p className="text-[11px] text-gray-400 truncate mt-0.5">
                          {item.description}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <span className="font-bold text-xs" style={{ color: theme.hex }}>
                        S/ {item.price.toFixed(2)}
                      </span>
                      <button
                        type="button"
                        onClick={e => handleAdd(item, e)}
                        className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all cursor-pointer ${
                          isAdded ? 'bg-weekend-neon text-black' : 'bg-white/10 text-white hover:bg-white/20'
                        }`}
                      >
                        {isAdded ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
