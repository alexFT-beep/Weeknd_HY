/**
 * @file FloatingCartButton.tsx
 * @description Botón flotante del carrito de compras posicionado en la esquina inferior derecha.
 * Presenta estética Morado Neón con animación Framer Motion, contador reactivo de productos
 * y desglose rápido del total acumulado.
 */

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag } from 'lucide-react';
import { useCart } from '../hooks/useCart';

export const FloatingCartButton: React.FC = () => {
  const { totalQuantity, totals, openCart, isOpen } = useCart();
  const [isBumping, setIsBumping] = useState(false);

  // Animación de impulso cuando se añaden o modifican productos en el carrito
  useEffect(() => {
    if (totalQuantity > 0) {
      setIsBumping(true);
      const timer = setTimeout(() => setIsBumping(false), 400);
      return () => clearTimeout(timer);
    }
  }, [totalQuantity]);

  // Si el panel lateral del carrito está abierto, ocultar suavemente el botón flotante
  if (isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.5, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.5, y: 20 }}
        transition={{ type: 'spring', stiffness: 350, damping: 22 }}
        className="fixed bottom-5 right-5 sm:bottom-7 sm:right-7 z-40"
      >
        <motion.button
          type="button"
          onClick={openCart}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          animate={isBumping ? { scale: [1, 1.2, 1] } : { scale: 1 }}
          transition={{ duration: 0.3 }}
          className="relative group flex items-center gap-3 px-4 py-3.5 sm:px-5 sm:py-4 rounded-full bg-gradient-to-r from-[#c900ff] via-[#d500f9] to-[#e000ff] text-white font-extrabold shadow-[0_0_25px_rgba(201,0,255,0.65)] hover:shadow-[0_0_35px_rgba(201,0,255,0.95)] border border-white/20 backdrop-blur-md cursor-pointer transition-all duration-300 active:scale-95"
          aria-label="Ver Carrito de Compras"
        >
          {/* Aura Neón Resplandeciente */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-[#c900ff] to-[#00ffa3] rounded-full blur-md opacity-40 group-hover:opacity-80 transition duration-300 -z-10" />

          <div className="relative flex items-center justify-center">
            <ShoppingBag className="w-6 h-6 sm:w-7 sm:h-7 text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]" />

            {/* Contador de notificación reactivo */}
            <AnimatePresence>
              {totalQuantity > 0 && (
                <motion.span
                  key={totalQuantity}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                  className="absolute -top-3 -right-3 min-w-[22px] h-[22px] px-1.5 rounded-full bg-amber-400 text-black text-[11px] font-black flex items-center justify-center border-2 border-[#0a0a0e] shadow-[0_0_10px_rgba(255,230,0,0.8)]"
                >
                  {totalQuantity}
                </motion.span>
              )}
            </AnimatePresence>
          </div>

          {/* Vista previa del total o etiqueta */}
          {totalQuantity > 0 ? (
            <div className="flex flex-col text-left leading-tight pr-1">
              <span className="text-[10px] font-extrabold text-purple-100 uppercase tracking-wider">Tu Pedido</span>
              <span className="text-xs sm:text-sm font-black text-white drop-shadow">
                S/ {totals.total.toFixed(2)}
              </span>
            </div>
          ) : (
            <span className="hidden sm:inline-block text-xs uppercase tracking-wider font-extrabold pr-1">
              Ver Carrito
            </span>
          )}
        </motion.button>
      </motion.div>
    </AnimatePresence>
  );
};
