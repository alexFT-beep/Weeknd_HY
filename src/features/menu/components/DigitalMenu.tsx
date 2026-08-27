/**
 * @file DigitalMenu.tsx
 * @description Vista principal del catálogo interactivo de la carta digital de Weekend.
 * Incluye cabecera sticky de navegación por categorías neón, acordeones contraídos por defecto
 * y grid dinámico de productos.
 */

import React, { useState, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useMenu } from '../hooks/useMenu';
import { ProductCard } from './ProductCard';
import { useCart } from '../../cart/hooks/useCart';
import { MenuItem, MENU_CATEGORIES } from '../../../data/fullMenuData';
import { Search, Sparkles, ChevronDown, ChevronsDownUp, ChevronsUpDown } from 'lucide-react';

/** Propiedades para el componente de la Carta Digital */
export interface DigitalMenuProps {
  /** Callback para abrir el modal de búsqueda flotante */
  readonly onOpenSearch: () => void;
}

/**
 * Componente contenedor de la carta digital con filtrado por categorías.
 */
export const DigitalMenu: React.FC<DigitalMenuProps> = ({ onOpenSearch }) => {

  const { categories, activeCategory, setActiveCategory, itemsByCategory, getThemeForCategory } = useMenu();
  const { addItem, items: cartItems } = useCart();

  // Iniciar todas las opciones de acordeón contraídas por defecto al ingresar a la carta
  const [collapsedCategories, setCollapsedCategories] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    MENU_CATEGORIES.forEach(cat => {
      initial[cat.id] = true;
    });
    return initial;
  });

  const toggleCategoryCollapse = useCallback((catId: string) => {
    setCollapsedCategories(prev => ({
      ...prev,
      [catId]: !prev[catId]
    }));
  }, []);

  const handleExpandAll = () => {
    const next: Record<string, boolean> = {};
    categories.forEach(cat => {
      next[cat.id] = false;
    });
    setCollapsedCategories(next);
  };

  const handleCollapseAll = () => {
    const next: Record<string, boolean> = {};
    categories.forEach(cat => {
      next[cat.id] = true;
    });
    setCollapsedCategories(next);
  };

  const areAllCollapsed = useMemo(() => {
    return categories.every(cat => Boolean(collapsedCategories[cat.id]));
  }, [categories, collapsedCategories]);

  const cartQuantities = useMemo(() => {
    const map: Record<string, number> = {};
    cartItems.forEach(ci => {
      map[ci.product.id] = ci.quantity;
    });
    return map;
  }, [cartItems]);

  const handleAddToCart = useCallback((item: MenuItem, e: React.MouseEvent) => {
    e.stopPropagation();
    addItem(item);
  }, [addItem]);

  const scrollToCategory = (catId: string) => {
    setActiveCategory(catId);
    // Asegurar que la categoría se abra al seleccionarla desde los chips sticky
    setCollapsedCategories(prev => ({ ...prev, [catId]: false }));
    setTimeout(() => {
      if (catId === categories[0]?.id) {
        const container = document.getElementById('carta-digital');
        if (container) {
          const y = container.getBoundingClientRect().top + window.pageYOffset - 64;
          window.scrollTo({ top: Math.max(0, y), behavior: 'smooth' });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      } else {
        const element = document.getElementById(`sec-${catId}`);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    }, 40);
  };

  return (
    <section id="carta-digital" className="w-full pt-20 sm:pt-24 pb-12 relative text-white bg-[#050508] min-h-screen">
      {/* Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Hero / Title */}
        <div className="text-center mb-8 relative">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#c900ff]/10 border border-[#c900ff]/30 text-[#c900ff] text-xs font-black uppercase tracking-[0.2em] mb-3 shadow-[0_0_15px_rgba(201,0,255,0.2)]">
            <Sparkles className="w-3.5 h-3.5" />
            Carta Virtual Oficial
          </div>
          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white mb-2 font-display">
            Explora Nuestro <span className="text-[#c900ff] drop-shadow-[0_0_10px_rgba(201,0,255,0.7)]">Menú Weekend</span>
          </h2>
          <p className="text-gray-400 text-xs sm:text-sm max-w-xl mx-auto font-medium">
            Selecciona tus platillos favoritos y agrégalos a tu carrito para realizar tu pedido directo a cocina o delivery.
          </p>

          {/* Botón de Búsqueda Flotante / Acceso Rápido */}
          <div className="mt-5 flex items-center justify-center gap-3">
            <motion.button
              type="button"
              onClick={onOpenSearch}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.95 }}
              className="px-5 py-2.5 rounded-2xl bg-neutral-900 border border-white/15 hover:border-[#c900ff] text-gray-300 hover:text-white text-xs font-bold flex items-center gap-2.5 shadow-lg transition-all cursor-pointer"
            >
              <Search className="w-4 h-4 text-[#c900ff]" />
              <span>Buscar por nombre o ingrediente...</span>
              <kbd className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-mono bg-white/10 rounded text-gray-400">
                ⌘K
              </kbd>
            </motion.button>

            <motion.button
              type="button"
              onClick={areAllCollapsed ? handleExpandAll : handleCollapseAll}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.95 }}
              className="px-3.5 py-2.5 rounded-2xl bg-neutral-900/90 border border-white/15 hover:border-[#c900ff] text-zinc-300 hover:text-white text-xs font-bold flex items-center gap-1.5 shadow-lg transition-all cursor-pointer"
              title={areAllCollapsed ? "Desplegar todos los acordeones" : "Contraer todos los acordeones"}
            >
              {areAllCollapsed ? (
                <>
                  <ChevronsUpDown className="w-4 h-4 text-[#0acc80]" />
                  <span className="hidden sm:inline">Desplegar Todo</span>
                </>
              ) : (
                <>
                  <ChevronsDownUp className="w-4 h-4 text-[#c900ff]" />
                  <span className="hidden sm:inline">Contraer Todo</span>
                </>
              )}
            </motion.button>
          </div>
        </div>

        {/* Navigation Chips (Categorías Sticky Header) */}
        <div className="sticky top-14 z-30 bg-[#050508]/95 backdrop-blur-md -mx-4 sm:-mx-6 mb-6 border-y border-[#050508]">
          <div className="flex items-center gap-2.5 overflow-x-auto no-scrollbar scroll-smooth py-3 px-4 sm:px-6">
            {categories.map(cat => {
              const isActive = cat.id === activeCategory;
              const theme = getThemeForCategory(cat.id);

              return (
                <motion.button
                  key={cat.id}
                  type="button"
                  onClick={() => scrollToCategory(cat.id)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.94 }}
                  className={`px-4 py-2 rounded-full text-xs font-extrabold whitespace-nowrap border transition-all duration-200 flex items-center gap-1.5 shrink-0 cursor-pointer ${
                    isActive ? 'scale-105 font-black' : 'opacity-80 hover:opacity-100'
                  }`}
                  style={{
                    backgroundColor: isActive ? theme.hex : 'rgba(22, 22, 22, 0.85)',
                    color: isActive ? '#000000' : '#e5e5e5',
                    borderColor: isActive ? theme.hex : `rgba(${theme.rgb}, 0.35)`,
                    boxShadow: isActive ? `0 0 18px rgba(${theme.rgb}, 0.75)` : 'none'
                  }}
                >
                  <span className="text-sm">{cat.emoji}</span>
                  <span>{cat.name}</span>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Secciones de Menú en formato Acordeón Interactivo */}
        <div className="space-y-8">
          {categories.map(cat => {
            const items = itemsByCategory[cat.id] || [];
            if (items.length === 0) return null;
            const theme = getThemeForCategory(cat.id);
            const isCollapsed = Boolean(collapsedCategories[cat.id]);

            return (
              <section key={cat.id} id={`sec-${cat.id}`} className="scroll-mt-36">
                {/* Header Acordeón de Categoría Limpio (sin recuadro) */}
                <div
                  onClick={() => toggleCategoryCollapse(cat.id)}
                  className="flex items-center justify-between gap-3 pb-3 mb-2 border-b border-white/10 hover:border-white/25 transition-colors cursor-pointer select-none group"
                >
                  <div className="flex items-center gap-3.5">
                    <span className="text-2xl sm:text-3xl">{cat.emoji}</span>
                    <div>
                      <h3
                        className="text-base sm:text-xl font-black uppercase tracking-wider font-display flex items-center gap-2.5"
                        style={{ color: theme.hex }}
                      >
                        {cat.name}
                        <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-white/10 text-gray-300 border border-white/10">
                          {items.length}
                        </span>
                      </h3>
                      <p className="text-xs text-gray-400 font-medium line-clamp-1">
                        {cat.description}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-bold text-gray-400 hidden sm:inline-block">
                      {isCollapsed ? 'Desplegar' : 'Contraer'}
                    </span>
                    <motion.div
                      animate={{ rotate: isCollapsed ? -90 : 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="p-2 rounded-xl bg-white/5 border border-white/10 group-hover:border-[#c900ff] text-gray-300 group-hover:text-white transition-colors"
                    >
                      <ChevronDown className="w-4 h-4" />
                    </motion.div>
                  </div>
                </div>

                {/* Contenido Desplegable (Grid de Productos) */}
                <motion.div
                  initial={false}
                  animate={{
                    height: isCollapsed ? 0 : 'auto',
                    opacity: isCollapsed ? 0 : 1
                  }}
                  transition={{ duration: 0.35, ease: [0.04, 0.62, 0.23, 0.98] }}
                  className="overflow-hidden"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-4">
                    {items.map(item => {
                      const qty = cartQuantities[item.id] || 0;
                      return (
                        <ProductCard
                          key={item.id}
                          item={item}
                          theme={theme}
                          isAdded={qty > 0}
                          quantityInCart={qty}
                          onAdd={handleAddToCart}
                        />
                      );
                    })}
                  </div>
                </motion.div>
              </section>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default DigitalMenu;
