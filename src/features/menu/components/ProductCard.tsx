import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MenuItem } from '../../../data/fullMenuData';
import { CategoryTheme } from '../types';
import { Plus, Check } from 'lucide-react';

/** Propiedades del componente ProductCard */
export interface ProductCardProps {
  /** Objeto inmutable con los datos del platillo o bebida */
  readonly item: MenuItem;
  /** Tema cromático de color neón correspondiente a la categoría */
  readonly theme: CategoryTheme;
  /** Indica si el producto ya fue agregado al carrito */
  readonly isAdded: boolean;
  /** Cantidad actual en el carrito (opcional) */
  readonly quantityInCart?: number;
  /** Callback ejecutado al hacer clic en el botón de agregar */
  readonly onAdd: (item: MenuItem, e: React.MouseEvent) => void;
}

/** Interface para los badges flotantes de múltiple clic */
interface ClickBadge {
  readonly id: number;
  readonly text: string;
}

/**
 * Renderiza la tarjeta interactiva de producto con efectos neón dinámicos y microinteracciones de compra multinivel.
 */
export const ProductCard: React.FC<ProductCardProps> = React.memo(({ item, theme, isAdded, quantityInCart = 0, onAdd }) => {
  const [clickBadges, setClickBadges] = useState<ClickBadge[]>([]);
  const [isBouncing, setIsBouncing] = useState(false);

  const handleClickAdd = useCallback((e: React.MouseEvent) => {
    onAdd(item, e);
    
    // Generar un ID único para permitir múltiples animaciones simultáneas al hacer clics seguidos
    const badgeId = Date.now() + Math.random();
    setClickBadges(prev => [...prev.slice(-4), { id: badgeId, text: '+1 AÑADIDO' }]);
    setIsBouncing(true);

    // Restaurar estado de animación después de 550ms
    setTimeout(() => {
      setIsBouncing(false);
    }, 550);
  }, [item, onAdd]);

  const handleBadgeComplete = (id: number) => {
    setClickBadges(prev => prev.filter(b => b.id !== id));
  };

  return (
    <motion.div
      id={`item-card-${item.id}`}
      whileTap={{ scale: 0.98 }}
      animate={isBouncing ? { scale: [1, 1.02, 0.99, 1] } : { scale: 1 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className={`bg-neutral-900/90 border rounded-2xl p-4 flex flex-col justify-between text-left group relative overflow-hidden transition-all duration-300 shadow-lg ${
        isBouncing
          ? 'border-[#c900ff] shadow-[0_0_22px_rgba(201,0,255,0.6)]'
          : 'border-white/10 hover:border-white/30'
      }`}
      data-item-id={item.id}
    >
      {/* Indicadores Flotantes "+1" acumulativos para clics continuos */}
      <div className="absolute top-2 right-12 z-20 pointer-events-none flex flex-col items-end gap-1">
        <AnimatePresence>
          {clickBadges.map(badge => (
            <motion.span
              key={badge.id}
              initial={{ opacity: 1, y: 15, scale: 0.75 }}
              animate={{ opacity: 0, y: -35, scale: 1.25 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.55, ease: 'easeOut' }}
              onAnimationComplete={() => handleBadgeComplete(badge.id)}
              className="font-black text-[10px] px-2 py-0.5 rounded-full text-black bg-white shadow-[0_0_16px_rgba(201,0,255,0.9)] uppercase font-display"
              style={{
                backgroundColor: theme.hex,
                boxShadow: `0 0 16px rgba(${theme.rgb}, 0.9)`
              }}
            >
              {badge.text}
            </motion.span>
          ))}
        </AnimatePresence>
      </div>

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
            <h3 className="font-extrabold text-white uppercase text-xs sm:text-sm leading-snug group-hover:text-[#c900ff] transition-colors">
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
            
            <motion.button
              type="button"
              data-action="add-to-cart"
              data-item-id={item.id}
              onClick={handleClickAdd}
              whileHover={{ scale: 1.12 }}
              whileTap={{ scale: 0.8 }}
              animate={isBouncing ? { scale: [1, 1.3, 0.9, 1], rotate: [0, -12, 12, 0] } : { scale: 1, rotate: 0 }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              className={`flex items-center justify-center min-w-[34px] h-8.5 px-2 rounded-xl border transition-all duration-200 shadow-sm cursor-pointer ${
                isBouncing ? 'bg-[#c900ff] text-white border-[#c900ff]' : ''
              }`}
              style={{
                color: isBouncing ? '#ffffff' : theme.hex,
                borderColor: isBouncing ? '#c900ff' : `${theme.hex}80`,
                backgroundColor: isBouncing ? '#c900ff' : `rgba(${theme.rgb}, 0.15)`,
                boxShadow: isBouncing
                  ? `0 0 18px rgba(201, 0, 255, 0.8)`
                  : `0 0 10px rgba(${theme.rgb}, 0.25)`
              }}
              title={`Añadir ${item.name} al carrito`}
            >
              <AnimatePresence mode="wait">
                {isBouncing ? (
                  <motion.div
                    key="bouncing-check"
                    initial={{ scale: 0, rotate: -45 }}
                    animate={{ scale: 1, rotate: 0 }}
                    exit={{ scale: 0 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 20 }}
                    className="flex items-center gap-1 font-black text-xs"
                  >
                    <Check className="w-4 h-4 stroke-[3]" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="plus-icon"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="flex items-center gap-1 font-black text-xs"
                  >
                    <Plus className="w-4 h-4 stroke-[3]" />
                    {quantityInCart > 0 && (
                      <span className="text-[10px] font-black bg-black/40 px-1 rounded-md ml-0.5">
                        x{quantityInCart}
                      </span>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
        {item.description && (
          <p className="text-[11px] sm:text-xs text-gray-400 leading-relaxed mt-1 line-clamp-2">
            {item.description}
          </p>
        )}
      </div>
    </motion.div>
  );
});

ProductCard.displayName = 'ProductCard';
