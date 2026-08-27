import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Search, Menu as MenuIcon, X } from 'lucide-react';
import { useCart } from '../features/cart/hooks/useCart';

export type ActiveTab = 'inicio' | 'nosotros' | 'momentos' | 'promociones' | 'carta' | 'reserva' | 'social';

interface HeaderProps {
  activeTab: ActiveTab;
  onNavigate: (tab: ActiveTab) => void;
  onOpenSearch: () => void;
}

const LOGO_URL = "https://wdirdbryxwtbnprbrkvh.supabase.co/storage/v1/object/public/The_Weeknd/logo_weeknd.webp";
const MOBILE_BG = "https://wdirdbryxwtbnprbrkvh.supabase.co/storage/v1/object/public/The_Weeknd/living.webp";

export const Header: React.FC<HeaderProps> = ({ activeTab, onNavigate, onOpenSearch }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isCartBumping, setIsCartBumping] = useState(false);
  const { totalQuantity, openCart } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (totalQuantity > 0) {
      setIsCartBumping(true);
      const timer = setTimeout(() => setIsCartBumping(false), 450);
      return () => clearTimeout(timer);
    }
  }, [totalQuantity]);

  const navLinks: { id: ActiveTab; label: string; highlight?: boolean }[] = [
    { id: 'inicio', label: 'Inicio' },
    { id: 'nosotros', label: 'Nosotros' },
    { id: 'momentos', label: 'Momentos' },
    { id: 'promociones', label: 'Promociones', highlight: true },
    { id: 'carta', label: 'Carta' },
    { id: 'reserva', label: 'Reserva' },
    { id: 'social', label: 'Redes' }
  ];

  const handleNavClick = (tab: ActiveTab) => {
    onNavigate(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled || activeTab !== 'inicio'
            ? 'bg-black/95 backdrop-blur-md py-2.5 border-b border-purple-900/30 shadow-2xl shadow-purple-950/20'
            : 'bg-transparent py-3 sm:py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-3 sm:gap-4">
          {/* Logo / Branding */}
          <motion.button
            type="button"
            onClick={() => handleNavClick('inicio')}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="flex items-center gap-2.5 shrink-0 cursor-pointer group text-left"
          >
            <img
              src={LOGO_URL}
              alt="Logo Weekend"
              width={36}
              height={36}
              className="h-8 sm:h-9 w-8 sm:w-9 rounded-full object-cover border border-[#c900ff]/70 group-hover:border-[#f000ff] transition-colors shadow-[0_0_10px_rgba(201,0,255,0.4)]"
            />
            <span className="text-white font-black tracking-tight text-xs sm:text-sm uppercase whitespace-nowrap group-hover:text-[#c900ff] transition-colors font-display">
              WEEKEND! <span className="text-[#c900ff] drop-shadow-[0_0_8px_rgba(201,0,255,0.6)]">Huarmey</span>
            </span>
          </motion.button>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-4 xl:gap-6 justify-center">
            {navLinks.map(link => {
              const isActive = activeTab === link.id;
              return (
                <motion.button
                  key={link.id}
                  type="button"
                  onClick={() => handleNavClick(link.id)}
                  whileHover={{ scale: 1.06 }}
                  whileTap={{ scale: 0.94 }}
                  className={`text-xs xl:text-sm uppercase tracking-wider font-extrabold transition-all duration-200 cursor-pointer whitespace-nowrap font-display relative ${
                    isActive
                      ? link.highlight
                        ? 'text-[#f000ff] font-black drop-shadow-[0_0_12px_rgba(240,0,255,0.8)]'
                        : 'text-[#c900ff] font-black drop-shadow-[0_0_12px_rgba(201,0,255,0.8)]'
                      : 'text-zinc-200 hover:text-[#f000ff]'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeTabIndicator"
                      className="absolute -bottom-1 left-0 right-0 h-[2.5px] bg-gradient-to-r from-[#c900ff] via-[#d946ef] to-[#f000ff] rounded-full shadow-[0_0_10px_rgba(201,0,255,0.8)]"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </motion.button>
              );
            })}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Search Trigger */}
            <motion.button
              type="button"
              onClick={onOpenSearch}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-full bg-white/5 hover:bg-purple-900/30 text-gray-300 hover:text-white transition-colors border border-purple-500/20 hover:border-[#c900ff]/50 cursor-pointer shadow-sm"
              title="Buscar en la carta (⌘K)"
            >
              <Search className="w-4 h-4 text-[#c900ff]" />
            </motion.button>

            {/* Cart Trigger Button */}
            <motion.button
              type="button"
              onClick={openCart}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.93 }}
              animate={isCartBumping ? { scale: [1, 1.28, 0.92, 1], rotate: [0, -8, 8, 0] } : { scale: 1, rotate: 0 }}
              transition={{ duration: 0.45, ease: 'easeInOut' }}
              className={`relative text-white font-extrabold bg-[#c900ff] hover:bg-[#d946ef] transition-colors duration-200 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-full flex items-center gap-1.5 text-xs uppercase shadow-[0_0_15px_rgba(201,0,255,0.5)] hover:shadow-[0_0_22px_rgba(217,70,239,0.8)] cursor-pointer ${
                isCartBumping ? 'animate-cart-bump' : ''
              }`}
              title="Ver Carrito de Pedido"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline font-black">Carrito</span>
              {totalQuantity > 0 && (
                <motion.span
                  key={totalQuantity}
                  initial={{ scale: 0, rotate: -30 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 15 }}
                  className="bg-white text-[#c900ff] font-black text-[10px] w-4.5 h-4.5 rounded-full flex items-center justify-center -mr-1 shadow-md"
                >
                  {totalQuantity}
                </motion.span>
              )}
            </motion.button>

            {/* CTA Ver Carta */}
            <motion.button
              type="button"
              onClick={() => handleNavClick('carta')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="hidden sm:inline-flex items-center gap-2 bg-gradient-to-r from-[#c900ff] via-[#a855f7] to-[#d946ef] text-white font-extrabold uppercase tracking-widest text-xs px-4 py-2 sm:px-5 sm:py-2.5 rounded-full hover:from-[#d946ef] hover:to-[#f000ff] transition-all duration-300 shadow-[0_0_20px_rgba(201,0,255,0.5)] hover:shadow-[0_0_25px_rgba(240,0,255,0.85)] cursor-pointer font-display"
            >
              Ver Menú
            </motion.button>

            {/* Mobile Hamburger */}
            <motion.button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              whileTap={{ scale: 0.9 }}
              className="lg:hidden p-2 text-white hover:text-[#c900ff] transition-colors cursor-pointer"
              aria-label="Abrir Menú"
            >
              <MenuIcon className="w-6 h-6" />
            </motion.button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation with AnimatePresence */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className="fixed inset-0 z-[110] bg-black flex flex-col items-center justify-center gap-5 lg:hidden overflow-y-auto"
          >
            <div className="absolute inset-0 z-0">
              <img
                src={MOBILE_BG}
                alt="Fondo Menú Móvil"
                className="w-full h-full object-cover opacity-85 brightness-110 contrast-105 saturate-110"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/85" />
            </div>

            <motion.button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              whileHover={{ rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              className="absolute top-4 right-4 text-white p-2.5 bg-black/60 rounded-full border border-purple-500/30 hover:text-[#c900ff] transition-colors z-20 cursor-pointer shadow-lg"
            >
              <X className="w-6 h-6" />
            </motion.button>

            <div className="relative z-10 flex flex-col items-center gap-3 py-8 w-full max-w-xs px-4">
              {navLinks.map((link, idx) => (
                <motion.button
                  key={link.id}
                  type="button"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  onClick={() => handleNavClick(link.id)}
                  className={`w-full text-center py-2 text-lg uppercase tracking-widest font-extrabold transition-colors border-b border-purple-900/30 cursor-pointer font-display ${
                    activeTab === link.id ? 'text-[#c900ff] drop-shadow-[0_0_8px_rgba(201,0,255,0.7)]' : 'text-white hover:text-[#f000ff]'
                  }`}
                >
                  {link.label}
                </motion.button>
              ))}

              <motion.button
                type="button"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.35 }}
                onClick={() => handleNavClick('carta')}
                whileTap={{ scale: 0.95 }}
                className="mt-4 w-full px-6 py-3 bg-gradient-to-r from-[#c900ff] to-[#a855f7] text-white font-extrabold uppercase tracking-widest rounded-full text-xs text-center shadow-[0_0_20px_rgba(201,0,255,0.6)] hover:from-[#d946ef] hover:to-[#f000ff] transition-all cursor-pointer font-display"
              >
                🔥 Pide tu Weekend (Carta Digital)
              </motion.button>
            </div>

            <div className="absolute bottom-6 left-0 w-full text-center z-10">
              <p className="text-[#c900ff] font-black text-xs uppercase tracking-[0.3em] font-display drop-shadow-[0_0_10px_rgba(201,0,255,0.8)]">
                WEEKEND! - HUARMEY
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
