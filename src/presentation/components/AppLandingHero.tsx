import React, { useEffect } from 'react';
import {
  MapPin, ChevronRight
} from 'lucide-react';
import { motion } from 'framer-motion';

// --- Assets locales de capibaras (Optimizados en WebP) ---
import CAPY_HEROIC from '../../assets/capybaras/heroic_capybara_mascot_VECTOR.webp';

interface AppLandingProps {
  readonly onNavigateTab?: (tab: string) => void;
}

export const AppLandingHero: React.FC<AppLandingProps> = ({ onNavigateTab }) => {
  const goToMenu = () => {
    if (onNavigateTab) {
      onNavigateTab('carta');
    }
  };

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        document.body.classList.add('animations-paused');
      } else {
        document.body.classList.remove('animations-paused');
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange, { passive: true });
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return (
    <div className="min-h-screen font-sans selection:bg-[#C900FF] selection:text-white home-page bg-[#050505] text-[#F5F5F5] relative">
      {/* ============ HERO PRINCIPAL RESPONSIVO ============ */}
      <section id="inicio" className="relative min-h-[100dvh] flex items-center justify-center pt-24 pb-20 sm:pt-28 sm:pb-24 overflow-hidden">
        <div className="absolute inset-0 z-0 bg-black">
          {/* Fondo Móvil y Tablet con Encuadre Optimizado */}
          <div className="block lg:hidden absolute inset-0 z-0 overflow-hidden">
            <img
              src="https://wdirdbryxwtbnprbrkvh.supabase.co/storage/v1/object/public/The_Weeknd/inicio.webp"
              alt="Fondo Portada Móvil"
              width={1080}
              height={1920}
              fetchPriority="high"
              decoding="async"
              className="w-full h-full object-cover object-top opacity-85 brightness-105 contrast-105"
              referrerPolicy="no-referrer"
            />
            {/* Degradado suave sin cortes abruptos */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/25 via-70% to-black" />
          </div>

          {/* Degradado Neón y Acentos Terrosos en Desktop */}
          <div className="hidden lg:block absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-b from-weekend-neon/[0.07] via-black to-black" />
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[44rem] h-[44rem] rounded-full bg-weekend-neon/[0.06] blur-3xl pulse-glow pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[28rem] h-[28rem] rounded-full border border-weekend-neon/10 pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[18rem] h-[18rem] rounded-full border border-amber-500/[0.08] pointer-events-none" />
          </div>

          <div className="absolute bottom-0 inset-x-0 h-28 bg-gradient-to-t from-black via-black/80 to-transparent z-[2] pointer-events-none" />
        </div>

        {/* Capibara heroica en Desktop */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, x: 20 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="absolute right-0 lg:right-6 top-1/2 -translate-y-1/2 z-[5] pointer-events-none hidden md:block w-56 lg:w-80"
        >
          <div className="absolute -inset-4 rounded-full bg-weekend-neon/15 blur-3xl pulse-glow" />
          <img 
            src={CAPY_HEROIC} 
            alt="Capibara heroica mascota" 
            width={480}
            height={480}
            fetchPriority="high"
            decoding="async"
            className="relative w-full drop-shadow-[0_0_50px_rgba(10,204,128,0.4)] float-anim" 
          />
        </motion.div>

        <div className="relative z-10 max-w-3xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-black uppercase tracking-[0.25em] mb-3 sm:mb-4 shadow-md">
              <span>🔥</span> Restobar &amp; Lounge - Huarmey <span>🎸</span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-3xl sm:text-5xl md:text-7xl font-black uppercase tracking-tight text-white mb-3 sm:mb-5 font-display leading-tight"
          >
            DONDE LA NOCHE <span className="text-transparent bg-clip-text bg-gradient-to-r from-weekend-neon via-emerald-400 to-amber-300" style={{ textShadow: '0 0 35px rgba(10,204,128,0.4)' }}>COBRA VIDA</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xs sm:text-base md:text-lg text-white/80 mb-6 sm:mb-10 max-w-xl mx-auto font-medium leading-relaxed px-2"
          >
            Tu fin de semana empieza aquí: alitas en 31 salsas artesanales, hamburguesas artesanales a la parrilla, makis y coctelería con pura vibra fiesta.
          </motion.p>

          {/* Botón CTA con animación continua */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }} 
            animate={{ opacity: 1, scale: 1 }} 
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex justify-center"
          >
            <motion.button
              onClick={goToMenu}
              animate={{ 
                boxShadow: [
                  "0 0 20px rgba(10,204,128,0.5)",
                  "0 0 45px rgba(201,0,255,0.85)",
                  "0 0 20px rgba(10,204,128,0.5)"
                ],
                scale: [1, 1.02, 1]
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="group inline-flex items-center gap-2.5 sm:gap-3 px-6 sm:px-8 md:px-10 py-3.5 sm:py-4 md:py-5 bg-gradient-to-r from-weekend-neon via-emerald-400 to-amber-300 text-black font-black uppercase tracking-widest rounded-full hover:bg-[#C900FF] hover:text-white active:bg-[#9011C5] active:text-white transition-all duration-300 active:scale-95 text-xs sm:text-sm md:text-base text-center cursor-pointer border border-white/25 font-display"
            >
              <span>🔥 PIDE TU WEEKEND - MENÚ &amp; DELIVERY</span>
              <ChevronRight className="group-hover:translate-x-1.5 transition-transform" />
            </motion.button>
          </motion.div>
        </div>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce pointer-events-none">
          <ChevronRight className="rotate-90 text-weekend-neon" size={28} />
        </div>
      </section>

      {/* ============ UBICACIÓN DARK CYBER / NEON ============ */}
      <section id="ubicacion" className="py-20 bg-[#050505] relative overflow-hidden">
        {/* Luces de ambiente Neón Multi-Color de fondo */}
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-[#00FF66]/15 rounded-full blur-[110px] pointer-events-none" />
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-[#FF007F]/20 rounded-full blur-[110px] pointer-events-none" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-80 h-40 bg-[#B026FF]/15 rounded-full blur-[90px] pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gradient-to-r from-[#00FF66]/15 via-[#FF007F]/15 to-[#B026FF]/15 border border-[#00FF66]/40 text-[#00FF66] text-xs font-black uppercase tracking-[0.25em] mb-4 shadow-[0_0_20px_rgba(0,255,102,0.25)]">
              <span>📍</span> Ubicación &amp; Punto de Encuentro <span>🍹</span>
            </div>
            <h3 className="text-3xl md:text-5xl font-black uppercase mb-4 font-display">
              ¿CÓMO <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00FF66] via-[#FF007F] to-[#B026FF]">LLEGAR?</span>
            </h3>
            <div className="flex items-center justify-center gap-2 text-white/80 font-medium">
              <MapPin size={20} className="text-[#00FF66] shrink-0 animate-bounce" />
              <p className="text-sm sm:text-base">Av. Cabo 140, Huarmey 02651 &bull; En pleno corazón de la ciudad</p>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }}
            className="relative p-[2px] rounded-[32px] bg-gradient-to-r from-[#00FF66] via-[#FF007F] to-[#B026FF] shadow-[0_0_40px_rgba(255,0,127,0.35),0_0_60px_rgba(0,255,102,0.25)] overflow-hidden group"
          >
            <div className="relative rounded-[30px] overflow-hidden bg-zinc-950 h-[440px] sm:h-[480px]">
              {/* Google Maps Iframe with Dark Cyber filter */}
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d245.6409801721048!2d-78.15328299958676!3d-10.068675181619353!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91aa17e1bee947c9%3A0xda6d1058bd817a98!2sWeekend%20Huarmey!5e0!3m2!1ses!2spe!4v1772137403381!5m2!1ses!2spe"
                className="w-full h-full border-0 filter invert-[90%] hue-rotate-180 contrast-[125%] saturate-[140%]" 
                allowFullScreen 
                title="Maps Weekend Huarmey" 
                loading="lazy"
              />

              {/* Floating Cyberpunk Venue Card (Top Left) */}
              <div className="absolute top-4 left-4 z-20 max-w-xs sm:max-w-sm p-4 rounded-2xl bg-black/85 backdrop-blur-xl border border-white/20 shadow-[0_0_30px_rgba(0,255,102,0.3)] space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-white font-black text-sm uppercase tracking-wide font-display">
                    Weekend <span className="text-[#00FF66]">Huarmey</span>
                  </span>
                  <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#ffa40b]/20 border border-[#ffa40b]/50 text-amber-300 text-[10px] font-black">
                    <span>3.5</span>
                    <span>⭐⭐⭐½</span>
                  </div>
                </div>
                <p className="text-[11px] text-zinc-300 leading-snug flex items-start gap-1.5">
                  <MapPin size={13} className="text-[#00FF66] shrink-0 mt-0.5" />
                  <span>Av. Cabo 140, Huarmey 02651</span>
                </p>
                <div className="flex items-center gap-2 pt-1 border-t border-white/10 text-[10px] text-emerald-400 font-bold">
                  <span className="w-2 h-2 rounded-full bg-[#00FF66] animate-ping" />
                  <span>Abierto hoy: 5:00 PM - 3:00 AM</span>
                </div>
              </div>

              {/* Botón flotante para abrir en Google Maps (Bottom Right) */}
              <div className="absolute bottom-4 right-4 z-20">
                <a
                  href="https://maps.google.com/?q=Weekend+Huarmey+Av.+Cabo+140+Huarmey"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-black/90 backdrop-blur-md border border-[#00FF66] text-white font-black text-xs uppercase hover:bg-[#00FF66] hover:text-black transition-all shadow-[0_0_30px_rgba(0,255,102,0.6)] cursor-pointer active:scale-95"
                >
                  <MapPin size={16} className="text-[#00FF66] group-hover:text-black" />
                  <span>ABRIR EN GOOGLE MAPS</span>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AppLandingHero;
