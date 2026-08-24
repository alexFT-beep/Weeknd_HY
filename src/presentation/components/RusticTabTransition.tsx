import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface RusticTabTransitionProps {
  isTransitioning: boolean;
  viewName: string;
}

const VIEW_META: Record<string, { label: string; tag: string; color: string; icon: string }> = {
  landing: {
    label: 'INICIO',
    tag: 'Donde la noche cobra vida',
    color: '#0acc80',
    icon: '🔥'
  },
  dashboard: {
    label: 'CARTA DIGITAL',
    tag: '31 Salsas • Parrillas • Tragos',
    color: '#c900ff',
    icon: '📜'
  },
  nosotros: {
    label: 'HISTORIA & IDENTIDAD',
    tag: 'La Esencia de Weekend',
    color: '#ffa40b',
    icon: '✨'
  },
  momentos: {
    label: 'MOMENTOS & CELEBRACIONES',
    tag: 'Cumpleaños • Amigos • Noches Únicas',
    color: '#0acc80',
    icon: '🎉'
  },
  reserva: {
    label: 'RESERVA DE MESA',
    tag: 'Asegura tu Lugar en la Noche',
    color: '#c900ff',
    icon: '🥂'
  },
  social: {
    label: 'CANALES & COMUNIDAD',
    tag: 'TikTok • Instagram • Facebook',
    color: '#00e5ff',
    icon: '📱'
  }
};

export const RusticTabTransition: React.FC<RusticTabTransitionProps> = ({ isTransitioning, viewName }) => {
  const meta = VIEW_META[viewName] || {
    label: viewName.toUpperCase(),
    tag: 'Weekend Huarmey',
    color: '#0acc80',
    icon: '⚡'
  };

  return (
    <AnimatePresence>
      {isTransitioning && (
        <motion.div
          key="rustic-tab-shutter"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[9999] pointer-events-none flex flex-col items-center justify-center overflow-hidden"
          style={{ willChange: 'opacity, transform' }}
        >
          {/* Capa de fondo rústico / carbón ahumado con viñeta restobar */}
          <motion.div
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            exit={{ scaleY: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 bg-[#070709]/92 backdrop-blur-md origin-top"
          >
            {/* Gradientes rústicos y resplandores neón */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/90 pointer-events-none" />
            <div 
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[32rem] h-[32rem] rounded-full blur-3xl opacity-20 pointer-events-none transition-colors duration-300"
              style={{ backgroundColor: meta.color }}
            />
            {/* Textura sutil de líneas rústicas restobar */}
            <div 
              className="absolute inset-0 opacity-[0.04] pointer-events-none" 
              style={{
                backgroundImage: 'radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)',
                backgroundSize: '24px 24px'
              }}
            />
          </motion.div>

          {/* Haz de luz láser superior con gradiente dinámico */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            exit={{ scaleX: 1, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="absolute top-0 left-0 right-0 h-[3px] z-20 shadow-[0_0_20px_rgba(10,204,128,0.8)]"
            style={{
              background: `linear-gradient(90deg, transparent, ${meta.color}, #ffffff, ${meta.color}, transparent)`
            }}
          />

          {/* Sello / Insignia Rústica Central */}
          <motion.div
            initial={{ scale: 0.88, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.94, opacity: 0, y: -8 }}
            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 flex flex-col items-center gap-2 px-6 py-4 rounded-3xl bg-zinc-950/90 border border-white/15 shadow-[0_10px_40px_rgba(0,0,0,0.8)] text-center max-w-xs sm:max-w-sm mx-4"
          >
            {/* Header del sello */}
            <div className="flex items-center gap-2">
              <span className="text-lg">{meta.icon}</span>
              <span 
                className="text-[10px] font-black uppercase tracking-[0.3em] font-display"
                style={{ color: meta.color }}
              >
                WEEKND! RESTOBAR
              </span>
              <span className="text-lg">{meta.icon}</span>
            </div>

            {/* Nombre de la pestaña de destino */}
            <h4 
              className="text-base sm:text-lg font-black uppercase tracking-wider text-white font-display"
            >
              {meta.label}
            </h4>

            {/* Tagline secundario */}
            <p className="text-[11px] font-semibold text-zinc-400 font-sans tracking-wide">
              {meta.tag}
            </p>

            {/* Barra de progreso rápida */}
            <div className="w-24 h-1 bg-white/10 rounded-full overflow-hidden mt-1">
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{ duration: 0.35, ease: 'easeInOut', repeat: Infinity }}
                className="w-full h-full rounded-full"
                style={{ backgroundColor: meta.color }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
