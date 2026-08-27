import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Sparkles, Music, Flame, UtensilsCrossed, 
  Wine, Star, Award, Heart, Compass, CheckCircle2 
} from 'lucide-react';

interface NosotrosSectionProps {
  onOpenMenu?: () => void;
  onOpenReserva?: () => void;
}

const VALORES_BADGES = [
  {
    id: 'musica',
    label: 'BUENA MÚSICA',
    emoji: '🎵',
    icon: Music,
    desc: 'Playlists selectas, DJs en vivo y sonido envolvente para encender cada noche.',
    color: '#c900ff',
    bgGradient: 'from-[#c900ff]/20 via-[#c900ff]/10 to-transparent',
    border: 'border-[#c900ff]/50 hover:border-[#c900ff]',
    glow: 'hover:shadow-[0_0_25px_rgba(201,0,255,0.45)]'
  },
  {
    id: 'ambiente',
    label: 'AMBIENTE VIBRANTE',
    emoji: '⚡',
    icon: Flame,
    desc: 'Luces neón, confort premium y la energía fiestera que caracteriza a Huarmey.',
    color: '#ffa40b',
    bgGradient: 'from-[#ffa40b]/20 via-[#ffa40b]/10 to-transparent',
    border: 'border-[#ffa40b]/50 hover:border-[#ffa40b]',
    glow: 'hover:shadow-[0_0_25px_rgba(255,164,11,0.45)]'
  },
  {
    id: 'platos',
    label: 'PLATOS EXQUISITOS',
    emoji: '🍗',
    icon: UtensilsCrossed,
    desc: '31 salsas artesanales para alitas, parrillas al carbón, broasters, makis y especialidades.',
    color: '#0acc80',
    bgGradient: 'from-[#0acc80]/20 via-[#0acc80]/10 to-transparent',
    border: 'border-[#0acc80]/50 hover:border-[#0acc80]',
    glow: 'hover:shadow-[0_0_25px_rgba(10,204,128,0.45)]'
  },
  {
    id: 'tragos',
    label: 'TRAGOS EXCELENTES',
    emoji: '🍹',
    icon: Wine,
    desc: 'Coctelería de autor, macerados autóctonos, cervezas heladas y mixología de autor.',
    color: '#00e5ff',
    bgGradient: 'from-[#00e5ff]/20 via-[#00e5ff]/10 to-transparent',
    border: 'border-[#00e5ff]/50 hover:border-[#00e5ff]',
    glow: 'hover:shadow-[0_0_25px_rgba(0,229,255,0.45)]'
  },
  {
    id: 'experiencia',
    label: 'EXPERIENCIA COMPLETA',
    emoji: '👑',
    icon: Star,
    desc: 'Atención personalizada, celebraciones memorables y el mejor servicio de salón y delivery.',
    color: '#ff0055',
    bgGradient: 'from-[#ff0055]/20 via-[#ff0055]/10 to-transparent',
    border: 'border-[#ff0055]/50 hover:border-[#ff0055]',
    glow: 'hover:shadow-[0_0_25px_rgba(255,0,85,0.45)]'
  }
];

export function NosotrosSection({ onOpenMenu, onOpenReserva }: NosotrosSectionProps) {
  const [activeBadge, setActiveBadge] = useState<string | null>(null);

  return (
    <section id="nosotros" className="relative py-24 bg-[#050505] text-[#f5f5f5] overflow-hidden">
      {/* Background Street Doodles and Glows */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-10 left-8 w-72 h-72 bg-[#0acc80]/20 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-8 w-96 h-96 bg-[#c900ff]/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#ffa40b]/10 rounded-full blur-[140px]" />
      </div>

      {/* Decorative Street Doodles in SVG */}
      <div className="absolute top-12 right-12 opacity-15 pointer-events-none hidden lg:block text-[#0acc80]">
        <svg width="120" height="120" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M10 50 Q 25 25, 50 50 T 90 50" strokeDasharray="6,6" />
          <circle cx="50" cy="50" r="30" stroke="#c900ff" strokeWidth="2" />
          <polygon points="50,15 60,35 85,35 65,50 72,75 50,60 28,75 35,50 15,35 40,35" fill="none" stroke="#ffa40b" strokeWidth="1.5" />
        </svg>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ==================================================== */}
        {/* MÓDULO 1: ¿QUIÉNES SOMOS? (HISTORIA Y CULTURA)        */}
        {/* ==================================================== */}
        <div className="mb-24">
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-[#0acc80]/15 via-[#c900ff]/15 to-[#ffa40b]/15 border border-[#0acc80]/40 text-xs font-black tracking-[0.25em] text-[#0acc80] uppercase shadow-[0_0_20px_rgba(10,204,128,0.25)]"
            >
              <Sparkles className="w-4 h-4 text-[#ffa40b]" />
              <span>ORGULLO HUARMEYANO &amp; PASIÓN FAMILIAR</span>
              <Heart className="w-4 h-4 text-[#c900ff]" />
            </motion.div>

            <motion.h2 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-white"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              ¿QUIÉNES <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0acc80] via-[#ffa40b] to-[#c900ff]">SOMOS?</span>
            </motion.h2>

            <p className="text-sm sm:text-base text-zinc-400 font-medium leading-relaxed">
              La historia viva de una pasión que nació en el corazón de Huarmey para conquistar el paladar y la noche de toda la región.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Story Card (Street Pop Art Card) */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-7 bg-zinc-950/80 backdrop-blur-xl border border-zinc-800/90 rounded-[32px] p-6 sm:p-10 shadow-2xl relative overflow-hidden group hover:border-[#0acc80]/60 transition-all duration-300"
            >
              <div className="absolute top-0 right-0 translate-x-8 -translate-y-8 w-40 h-40 bg-[#0acc80]/15 rounded-full blur-2xl group-hover:bg-[#0acc80]/25 transition-all duration-500" />
              
              <div className="flex items-center gap-3 mb-6">
                <span className="px-3.5 py-1 rounded-full bg-[#0acc80]/20 text-[#0acc80] text-[11px] font-black tracking-widest uppercase border border-[#0acc80]/40">
                  FUNDADO EN 2021
                </span>
                <span className="px-3.5 py-1 rounded-full bg-[#c900ff]/20 text-[#c900ff] text-[11px] font-black tracking-widest uppercase border border-[#c900ff]/40">
                  GRUPO WEEKEND SA
                </span>
              </div>

              <h3 
                className="text-2xl sm:text-3xl font-black uppercase text-white mb-5 leading-snug"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                Sabor, Tradición y <span className="text-[#0acc80]">Liderazgo Gastronómico</span>
              </h3>

              <div className="space-y-4 text-zinc-300 text-sm sm:text-base leading-relaxed">
                <p>
                  Somos <strong className="text-white font-black">Weekend</strong>, un restaurante y Lounge ubicado en el centro de Huarmey, fundado en el <strong className="text-[#ffa40b]">2021 por Ítalo Herrera</strong> y constituido con orgullo como empresa familiar <strong className="text-[#c900ff]">Grupo Weekend SA</strong>, dirigido hoy en día por los <strong className="text-white">hnos Italo y Fiorella Herrera</strong>.
                </p>
                <p>
                  Somos una marca huarmeyana ya reconocida con calidad y prestigio, respaldada con el cariño de toda nuestra provincia.
                </p>
                <div className="p-4 rounded-2xl bg-white/[0.03] border-l-4 border-[#0acc80] border-y border-r border-white/5 my-4">
                  <p className="text-xs sm:text-sm text-zinc-200 italic font-medium">
                    &ldquo;Nuestra misión es llegar a ser líderes indiscutibles en el rubro gastronómico y de entretenimiento en toda la región. Cada miembro de nuestro equipo se encargará de garantizar la experiencia de cada cliente desde que entra hasta que se marcha llevándose una velada inolvidable.&rdquo;
                  </p>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-zinc-800/80 flex flex-wrap items-center gap-4 justify-between">
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-[#ffa40b]" />
                  <span className="text-xs font-bold uppercase tracking-wider text-zinc-300">Garantía Hnos. Herrera</span>
                </div>
                <div className="flex items-center gap-2">
                  <Compass className="w-5 h-5 text-[#0acc80]" />
                  <span className="text-xs font-bold uppercase tracking-wider text-zinc-300">Liderazgo Regional Ancash</span>
                </div>
              </div>
            </motion.div>

            {/* Cultural Identity Card (Señora de Huarmey & Cerámica Huarmeyana) */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-5 space-y-6"
            >
              {/* Señora de Huarmey Graphic Box */}
              <div className="bg-gradient-to-br from-zinc-900/90 via-[#0d0914] to-zinc-950 border border-[#c900ff]/40 rounded-[28px] p-6 shadow-xl relative overflow-hidden group hover:border-[#c900ff] hover:shadow-[0_0_35px_rgba(201,0,255,0.3)] transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-[#c900ff]/20 border border-[#c900ff]/50 flex items-center justify-center text-[#c900ff] shrink-0 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-[0_0_20px_rgba(201,0,255,0.4)]">
                    {/* SVG Estilizado Corona & Dama Wari */}
                    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <path d="M4 18h16M5 18l2-9 5 4 5-4 2 9M12 4v2" strokeLinecap="round" strokeLinejoin="round" />
                      <circle cx="12" cy="4" r="1.5" fill="currentColor" />
                    </svg>
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#c900ff] block mb-1">
                      👑 IDENTIDAD WARI ANCESTRAL
                    </span>
                    <h4 
                      className="text-lg font-black uppercase text-white tracking-tight group-hover:text-[#c900ff] transition-colors"
                      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                      Señora de Huarmey
                    </h4>
                    <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                      Inspirados en la grandeza del Castillo de Huarmey y el legado de la élite Wari: elegancia, mística y respeto por nuestras raíces históricas.
                    </p>
                  </div>
                </div>
              </div>

              {/* Cerámica Huarmeyana Graphic Box */}
              <div className="bg-gradient-to-br from-zinc-900/90 via-[#07130d] to-zinc-950 border border-[#0acc80]/40 rounded-[28px] p-6 shadow-xl relative overflow-hidden group hover:border-[#0acc80] hover:shadow-[0_0_35px_rgba(10,204,128,0.3)] transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-[#0acc80]/20 border border-[#0acc80]/50 flex items-center justify-center text-[#0acc80] shrink-0 group-hover:scale-110 group-hover:-rotate-3 transition-all duration-300 shadow-[0_0_20px_rgba(10,204,128,0.4)]">
                    {/* SVG Estilizado Cerámica y Cántaro Prehispánico */}
                    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <path d="M8 3h8m-6 0v3a4 4 0 0 0 8 0V3M6 10a6 6 0 0 0 12 0c0 5-2 11-6 11s-6-6-6-11z" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M9 13h6" strokeLinecap="round" />
                    </svg>
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#0acc80] block mb-1">
                      🏺 ARTE &amp; CULTURA VIVA
                    </span>
                    <h4 
                      className="text-lg font-black uppercase text-white tracking-tight group-hover:text-[#0acc80] transition-colors"
                      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                      Cerámica Huarmeyana
                    </h4>
                    <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                      El arte alfarero y la estética costera traducidos a un concepto pop contemporáneo: recetas artesanales con alma milenaria.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>

        {/* ==================================================== */}
        {/* MÓDULO 2: ¿POR QUÉ ELEGIRNOS? (CONTAMOS CON BADGES) */}
        {/* ==================================================== */}
        <div className="mt-16 pt-12 border-t border-zinc-900">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <motion.p 
              initial={{ opacity: 0, y: -5 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-[#ffa40b] text-xs font-black uppercase tracking-[0.3em]"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              CONTAMOS CON
            </motion.p>
            <motion.h3 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              ¿POR QUÉ <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ffa40b] via-[#0acc80] to-[#c900ff]">ELEGIRNOS?</span>
            </motion.h3>
            <p className="text-xs sm:text-sm text-zinc-400">
              5 pilares inquebrantables que convierten tu visita en una experiencia inolvidable.
            </p>
          </div>

          {/* 5 Badges Interactivos con micro-brillo neón */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {VALORES_BADGES.map((badge, idx) => {
              const IconComponent = badge.icon;
              const isSelected = activeBadge === badge.id;

              return (
                <motion.div
                  key={badge.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.08 }}
                  onClick={() => setActiveBadge(isSelected ? null : badge.id)}
                  whileHover={{ scale: 1.04, y: -4 }}
                  whileTap={{ scale: 0.97 }}
                  className={`relative p-5 rounded-[24px] bg-zinc-950/80 border transition-all duration-300 cursor-pointer flex flex-col justify-between overflow-hidden ${badge.border} ${badge.glow} ${
                    isSelected ? 'ring-2 ring-white/30 bg-zinc-900' : ''
                  }`}
                >
                  <div className={`absolute inset-0 bg-gradient-to-b ${badge.bgGradient} opacity-30`} />
                  
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-2xl">{badge.emoji}</span>
                      <div 
                        className="w-8 h-8 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: `${badge.color}20`, color: badge.color }}
                      >
                        <IconComponent className="w-4 h-4" />
                      </div>
                    </div>

                    <h4 
                      className="text-xs sm:text-sm font-black uppercase text-white tracking-wide mb-2"
                      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                      {badge.label}
                    </h4>

                    <p className="text-[11px] text-zinc-400 leading-snug">
                      {badge.desc}
                    </p>
                  </div>

                  <div className="relative z-10 mt-4 pt-2 border-t border-white/5 flex items-center gap-1.5 text-[10px] font-bold text-zinc-400">
                    <CheckCircle2 className="w-3.5 h-3.5" style={{ color: badge.color }} />
                    <span>Estándar Weekend</span>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Call To Action Buttons */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
            <button
              type="button"
              onClick={onOpenMenu}
              className="px-8 py-4 rounded-full bg-[#0acc80] text-black font-black uppercase tracking-widest text-xs hover:bg-white transition-all shadow-[0_0_30px_rgba(10,204,128,0.4)] active:scale-95 cursor-pointer"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              🔥 Explorar Carta &amp; Delivery
            </button>
            <button
              type="button"
              onClick={onOpenReserva}
              className="px-8 py-4 rounded-full bg-zinc-900 border border-[#c900ff]/60 text-white font-black uppercase tracking-widest text-xs hover:bg-[#c900ff] hover:text-white transition-all shadow-[0_0_20px_rgba(201,0,255,0.3)] active:scale-95 cursor-pointer"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              ✨ Reservar Mesa de Salón
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}

export { NosotrosSection as AboutUsStorySection };

