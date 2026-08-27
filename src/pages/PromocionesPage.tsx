/**
 * @file PromocionesPage.tsx
 * @description Vista completa de Promociones y Festines de Weekend Huarmey.
 * Incluye carruseles infinitos a 60 FPS por categoría y Lightbox fullscreen con gestos táctiles y navegación por teclado.
 */

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Sparkles, ZoomIn, Flame } from 'lucide-react';

/** Ítem individual de promoción publicitaria */
export interface PromoItem {
  /** ID numérico de la promoción */
  readonly id: number;
  /** Nombre o título del festín */
  readonly name: string;
  /** Ruta URL del banner publicitario en Supabase Storage */
  readonly src: string;
  /** Marca si la oferta es destacada */
  readonly isFeatured: boolean;
  /** Etiqueta de texto de la promoción */
  readonly badge: string;
}

/** Sección temática de promociones con color representativo */
export interface PromoSectionData {
  readonly id: string;
  readonly title: string;
  readonly subtitle: string;
  readonly color: string;
  readonly promos: PromoItem[];
}


export const PROMO_SECTIONS_DATA: PromoSectionData[] = [
  {
    id: "sec-alitas",
    title: "🍗 Combos, Rondas & Alitas Festín",
    subtitle: "Los combos más pedidos para compartir entre amigos con más de 31 salsas artesanales",
    color: "#0acc80",
    promos: [
      { id: 0, name: "Barco Mix Weekend", src: "https://wdirdbryxwtbnprbrkvh.supabase.co/storage/v1/object/public/The_Weeknd/barcoMix.webp", isFeatured: true, badge: "DESTACADO 🔥" },
      { id: 1, name: "Barquito Happy 4x2 Hour", src: "https://wdirdbryxwtbnprbrkvh.supabase.co/storage/v1/object/public/The_Weeknd/barquitoHarryHou.webp", isFeatured: false, badge: "HAPPY HOUR ⚡" },
      { id: 2, name: "Carrusel de Alitas", src: "https://wdirdbryxwtbnprbrkvh.supabase.co/storage/v1/object/public/The_Weeknd/carruselAlitas.webp", isFeatured: true, badge: "MÁS PEDIDO 👑" },
      { id: 3, name: "Reyes de las Alitas (+30 Sabores)", src: "https://wdirdbryxwtbnprbrkvh.supabase.co/storage/v1/object/public/The_Weeknd/reyesAlitas.webp", isFeatured: true, badge: "DESTACADO 🔥" },
      { id: 4, name: "Ruleta de Alitas", src: "https://wdirdbryxwtbnprbrkvh.supabase.co/storage/v1/object/public/The_Weeknd/ruleta.webp", isFeatured: false, badge: "FESTÍN 🎉" },
      { id: 5, name: "Más Alitas Más Sabor", src: "https://wdirdbryxwtbnprbrkvh.supabase.co/storage/v1/object/public/The_Weeknd/masAlitas.webp", isFeatured: false, badge: "SABOR PURA VIBRA" }
    ]
  },
  {
    id: "sec-burgers",
    title: "🍔 Hamburguesas, Parrillas & Cumpleaños",
    subtitle: "Cortes artesanales a la parrilla, burritos gigantes, combos y festejos con sorpresas",
    color: "#FFE600",
    promos: [
      { id: 6, name: "Combos Parrilleros para Compartir", src: "https://wdirdbryxwtbnprbrkvh.supabase.co/storage/v1/object/public/The_Weeknd/comboParrillero.webp", isFeatured: true, badge: "DESTACADO 🔥" },
      { id: 7, name: "Listas para Conquistar Hamburguesas", src: "https://wdirdbryxwtbnprbrkvh.supabase.co/storage/v1/object/public/The_Weeknd/hamburguesas.webp", isFeatured: true, badge: "MÁS PEDIDO 🍔" },
      { id: 8, name: "Festeja tu Cumpleaños en Weekend", src: "https://wdirdbryxwtbnprbrkvh.supabase.co/storage/v1/object/public/The_Weeknd/cumple.webp", isFeatured: true, badge: "CELEBRACIÓN 🎂" },
      { id: 9, name: "Box Romántico Weekend", src: "https://wdirdbryxwtbnprbrkvh.supabase.co/storage/v1/object/public/The_Weeknd/boxRomantico.webp", isFeatured: false, badge: "PAREJAS ❤️" },
      { id: 10, name: "Piñata Burrito Mexicano", src: "https://wdirdbryxwtbnprbrkvh.supabase.co/storage/v1/object/public/The_Weeknd/burritoMexi.webp", isFeatured: false, badge: "SABOR INTENSO" },
      { id: 11, name: "Salchipapas Weekend", src: "https://wdirdbryxwtbnprbrkvh.supabase.co/storage/v1/object/public/The_Weeknd/salchiPapas.webp", isFeatured: false, badge: "CRUJIENTE 🍟" }
    ]
  },
  {
    id: "sec-tragos",
    title: "🍹 Tragos, Litronas & Noches de Bar",
    subtitle: "Coctelería de autor, litronas festivas, calientitos y el mejor ambiente nocturno",
    color: "#C900FF",
    promos: [
      { id: 12, name: "Litronas Weekend", src: "https://wdirdbryxwtbnprbrkvh.supabase.co/storage/v1/object/public/The_Weeknd/litronas.webp", isFeatured: true, badge: "DESTACADO 🍹" },
      { id: 13, name: "Noche de Tragos en Casa", src: "https://wdirdbryxwtbnprbrkvh.supabase.co/storage/v1/object/public/The_Weeknd/nocheTragosCasa.webp", isFeatured: false, badge: "DELIVERY BAR 🛵" },
      { id: 14, name: "Calentitos Pisco Weekend", src: "https://wdirdbryxwtbnprbrkvh.supabase.co/storage/v1/object/public/The_Weeknd/calientitosPisco.webp", isFeatured: false, badge: "TRADICIÓN 🔥" },
      { id: 15, name: "Transfusión Weekend Special", src: "https://wdirdbryxwtbnprbrkvh.supabase.co/storage/v1/object/public/The_Weeknd/transfusionSangreHallowen.webp", isFeatured: true, badge: "DESTACADO 🩸" },
      { id: 16, name: "Cerveza Artesanal - Nuevo Lanzamiento", src: "https://wdirdbryxwtbnprbrkvh.supabase.co/storage/v1/object/public/The_Weeknd/cervezaArtesanal.webp", isFeatured: false, badge: "EXCLUSIVO 🍺" },
      { id: 17, name: "Broaster que te Hará Volver", src: "https://wdirdbryxwtbnprbrkvh.supabase.co/storage/v1/object/public/The_Weeknd/broster.webp", isFeatured: true, badge: "DESTACADO 🍗" }
    ]
  },
  {
    id: "sec-piqueos",
    title: "🍱 Makis, Piqueos & Bebidas Especiales",
    subtitle: "Makis acevichados, tablas de piqueos, frappés gigantes y delivery hasta la 1:30 AM",
    color: "#00CFFF",
    promos: [
      { id: 18, name: "Nueva Presentación para tus Makis", src: "https://wdirdbryxwtbnprbrkvh.supabase.co/storage/v1/object/public/The_Weeknd/newPresentacionMakis.webp", isFeatured: true, badge: "DESTACADO 🍱" },
      { id: 19, name: "Piqueos & Tequeños Weekend", src: "https://wdirdbryxwtbnprbrkvh.supabase.co/storage/v1/object/public/The_Weeknd/piqueos.webp", isFeatured: false, badge: "PIQUEOS 🍢" },
      { id: 20, name: "Agranda tu Frappé x S/ 3.99", src: "https://wdirdbryxwtbnprbrkvh.supabase.co/storage/v1/object/public/The_Weeknd/promo_frappe.webp", isFeatured: true, badge: "DESTACADO 🥤" },
      { id: 21, name: "Bubble Tea Popping Bobba", src: "https://wdirdbryxwtbnprbrkvh.supabase.co/storage/v1/object/public/The_Weeknd/bubbleTea.webp", isFeatured: false, badge: "REFRESCANTE 🧋" },
      { id: 22, name: "Navega en un Mar de Sabores", src: "https://wdirdbryxwtbnprbrkvh.supabase.co/storage/v1/object/public/The_Weeknd/marSaboresDelicias.webp", isFeatured: true, badge: "DESTACADO 🚢" },
      { id: 23, name: "Delivery hasta la 1:30 AM", src: "https://wdirdbryxwtbnprbrkvh.supabase.co/storage/v1/object/public/The_Weeknd/delivery1am.webp", isFeatured: true, badge: "TODO HUARMEY 🛵" }
    ]
  }
];

const ALL_PROMOS = PROMO_SECTIONS_DATA.flatMap(s => s.promos);

export const PromocionesPage: React.FC = () => {
  const [activePromoIndex, setActivePromoIndex] = useState<number | null>(null);
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);

  const handleOpenLightbox = (id: number) => {
    const idx = ALL_PROMOS.findIndex(p => p.id === id);
    if (idx !== -1) {
      setActivePromoIndex(idx);
    }
  };

  const handleCloseLightbox = () => {
    setActivePromoIndex(null);
  };

  const handlePrev = useCallback(() => {
    if (activePromoIndex === null) return;
    setActivePromoIndex((activePromoIndex - 1 + ALL_PROMOS.length) % ALL_PROMOS.length);
  }, [activePromoIndex]);

  const handleNext = useCallback(() => {
    if (activePromoIndex === null) return;
    setActivePromoIndex((activePromoIndex + 1) % ALL_PROMOS.length);
  }, [activePromoIndex]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activePromoIndex === null) return;
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'Escape') handleCloseLightbox();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activePromoIndex, handlePrev, handleNext]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    if (distance > 50) handleNext();
    if (distance < -50) handlePrev();
    touchStartX.current = 0;
    touchEndX.current = 0;
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="pt-24 pb-20 min-h-screen bg-[#08080a] text-[#F5F5F5] relative overflow-hidden">
      {/* Background Asset fondoPromociones.webp */}
      <div className="fixed inset-0 pointer-events-none -z-10 opacity-30 overflow-hidden">
        <img
          src="https://wdirdbryxwtbnprbrkvh.supabase.co/storage/v1/object/public/The_Weeknd/fondoPromociones.webp"
          alt="Fondo Promociones"
          className="w-full h-full object-cover object-center filter saturate-125 contrast-110"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#08080a]/85 via-[#08080a]/60 to-[#08080a]/90" />
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* HERO LLAMATIVO DE PROMOCIONES */}
        <section className="text-center mb-16 relative">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-500/20 via-purple-500/20 to-[#C900FF]/20 border border-amber-500/40 text-amber-400 text-xs font-black uppercase tracking-[0.25em] mb-4 shadow-[0_0_20px_rgba(245,158,11,0.25)] animate-pulse">
            <Sparkles className="w-3.5 h-3.5" />
            NUESTRAS PROMOCIONES &amp; FESTINES
            <Flame className="w-3.5 h-3.5" />
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight text-white mb-4 font-display">
            Las Mejores <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0acc80] via-amber-300 to-[#C900FF]">Ofertas Weekend</span>
          </h1>

          <p className="text-zinc-300 max-w-3xl mx-auto text-sm sm:text-base font-medium leading-relaxed">
            Explora nuestros festines, combos parrilleros y promos exclusivas en Huarmey. ¡Toca cualquier imagen para ver la oferta en detalle y compartir con amigos!
          </p>

          {/* Quick-Jump Section Pills */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => scrollToSection('sec-alitas')}
              className="px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 hover:border-[#0acc80] hover:text-[#0acc80] text-xs font-bold uppercase transition-all cursor-pointer"
            >
              🍗 Alitas &amp; Combos
            </button>
            <button
              onClick={() => scrollToSection('sec-burgers')}
              className="px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 hover:border-[#FFE600] hover:text-[#FFE600] text-xs font-bold uppercase transition-all cursor-pointer"
            >
              🍔 Hamburguesas &amp; Parrillas
            </button>
            <button
              onClick={() => scrollToSection('sec-tragos')}
              className="px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 hover:border-[#C900FF] hover:text-[#C900FF] text-xs font-bold uppercase transition-all cursor-pointer"
            >
              🍹 Tragos &amp; Noche
            </button>
            <button
              onClick={() => scrollToSection('sec-piqueos')}
              className="px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 hover:border-[#00CFFF] hover:text-[#00CFFF] text-xs font-bold uppercase transition-all cursor-pointer"
            >
              🍱 Makis &amp; Piqueos
            </button>
          </div>
        </section>

        {/* 4 SECCIONES TEMÁTICAS CON CARRUSEL INFINITO MARQUEE */}
        <div className="space-y-16">
          {PROMO_SECTIONS_DATA.map(sec => {
            // Duplicate array for continuous 60fps marquee loop
            const duplicatedPromos = [...sec.promos, ...sec.promos];

            return (
              <section
                key={sec.id}
                id={sec.id}
                className="rounded-3xl p-5 sm:p-7 bg-[#111116]/80 border border-white/10 shadow-2xl relative overflow-hidden"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6 border-b border-white/10 pb-4">
                  <div>
                    <h2 className="text-xl sm:text-2xl font-black uppercase text-white tracking-wide font-display" style={{ color: sec.color }}>
                      {sec.title}
                    </h2>
                    <p className="text-xs sm:text-sm text-zinc-400 mt-1">{sec.subtitle}</p>
                  </div>
                  <span className="text-[10px] font-black uppercase px-3 py-1 rounded-full border border-amber-400/30 bg-amber-400/10 text-amber-300 w-fit shadow-sm">
                    🔥 {sec.promos.length} COMBOS EXCLUSIVAS
                  </span>
                </div>

                {/* Infinite Marquee Carousel Container */}
                <div className="relative overflow-hidden w-full py-2">
                  <div className="animate-infinite-carousel gap-6">
                    {duplicatedPromos.map((promo, idx) => (
                      <motion.div
                        key={`${sec.id}-${promo.id}-${idx}`}
                        whileHover={{ y: -6, scale: 1.02 }}
                        onClick={() => handleOpenLightbox(promo.id)}
                        className={`w-64 sm:w-72 aspect-[4/5] bg-[#17171f] rounded-2xl overflow-hidden border ${
                          promo.isFeatured ? 'border-amber-400/60 shadow-[0_0_20px_rgba(245,158,11,0.25)]' : 'border-white/10'
                        } relative cursor-pointer group flex-shrink-0 promo-card-item`}
                      >
                        <img
                          src={promo.src}
                          alt={promo.name}
                          loading="lazy"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-3 left-3 z-10">
                          <span className={`text-[10px] font-black px-2.5 py-1 rounded-full uppercase ${
                            promo.isFeatured ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-black shadow-lg' : 'bg-black/70 text-white backdrop-blur-md border border-white/20'
                          }`}>
                            {promo.badge}
                          </span>
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                          <p className="text-white font-black text-sm uppercase drop-shadow-md mb-1">{promo.name}</p>
                          <span className="text-[11px] font-bold text-[#C900FF] flex items-center gap-1">
                            <ZoomIn className="w-3.5 h-3.5" /> Toca para ampliar
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </section>
            );
          })}
        </div>
      </main>

      {/* Lightbox Modal Fullscreen */}
      <AnimatePresence>
        {activePromoIndex !== null && (
          <div
            className="fixed inset-0 z-[120] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 select-none"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onClick={handleCloseLightbox}
              className="absolute top-5 right-5 text-white/80 hover:text-white bg-zinc-900/80 p-3 rounded-full border border-white/20 hover:border-[#C900FF] transition-colors z-30 shadow-2xl cursor-pointer"
            >
              <X className="w-6 h-6" />
            </motion.button>

            <button
              type="button"
              onClick={handlePrev}
              className="lightbox-nav-btn left-4 sm:left-8 cursor-pointer"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <motion.div
              key={activePromoIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="max-w-4xl w-full flex flex-col items-center justify-center relative z-10"
            >
              <img
                src={ALL_PROMOS[activePromoIndex].src}
                alt={ALL_PROMOS[activePromoIndex].name}
                className="max-h-[76vh] sm:max-h-[80vh] w-auto object-contain rounded-2xl border border-white/20 shadow-[0_0_40px_rgba(201,0,255,0.3)] select-none"
              />
              <div className="mt-3 flex items-center gap-3">
                <span className="text-xs font-bold text-white uppercase tracking-wider bg-zinc-900/90 px-4 py-1.5 rounded-full border border-white/10">
                  {ALL_PROMOS[activePromoIndex].name}
                </span>
                <span className="text-xs font-mono font-bold text-[#C900FF] bg-zinc-900/90 px-3 py-1.5 rounded-full border border-[#C900FF]/30">
                  {activePromoIndex + 1} / {ALL_PROMOS.length}
                </span>
              </div>
            </motion.div>

            <button
              type="button"
              onClick={handleNext}
              className="lightbox-nav-btn right-4 sm:right-8 cursor-pointer"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
