import React from 'react';
import { motion } from 'framer-motion';
import { 
  Sparkles, PartyPopper, Gift, Camera, 
  Wine, Users, Calendar, ArrowRight, Play 
} from 'lucide-react';

interface MomentosSectionProps {
  onOpenReserva?: () => void;
  onOpenSocial?: () => void;
}

const BENEFICIOS_MOMENTOS = [
  {
    id: 'cumple',
    title: 'TRAGO DE CUMPLEAÑERO + POSTRE',
    subtitle: 'Cortesía de la casa en tu día',
    description: 'Si es el mes de tu cumpleaños, te recibimos con un cóctel de autor de la casa y un postre artesanal para soplar las velas.',
    icon: Gift,
    emoji: '🎂',
    badge: 'CUMPLEAÑOS VIP',
    badgeColor: 'bg-[#c900ff]/20 text-[#c900ff] border-[#c900ff]/40',
    color: '#c900ff',
    bgGradient: 'from-[#c900ff]/20 via-[#150a1b] to-zinc-950',
    border: 'border-[#c900ff]/40 hover:border-[#c900ff]',
    glow: 'hover:shadow-[0_0_35px_rgba(201,0,255,0.4)]'
  },
  {
    id: 'grupos',
    title: 'RONDA DE SHOTS DE BIENVENIDA',
    subtitle: 'Para grupos de 6 o más personas',
    description: 'Ven con toda tu mancha o equipo de trabajo: con tu reserva confirmada reciben una ronda de shots premium de cortesía.',
    icon: Wine,
    emoji: '🥃',
    badge: 'GRUPOS & PATAS',
    badgeColor: 'bg-[#ffa40b]/20 text-[#ffa40b] border-[#ffa40b]/40',
    color: '#ffa40b',
    bgGradient: 'from-[#ffa40b]/20 via-[#1a1208] to-zinc-950',
    border: 'border-[#ffa40b]/40 hover:border-[#ffa40b]',
    glow: 'hover:shadow-[0_0_35px_rgba(255,164,11,0.4)]'
  },
  {
    id: 'polaroid',
    title: 'FOTO POLAROID DE RECUERDO',
    subtitle: 'Tu noche impresa al instante',
    description: 'Nuestro staff capturará el mejor momento de tu velada para que te lleves una fotografía Polaroid física de recuerdo a casa.',
    icon: Camera,
    emoji: '📸',
    badge: 'RECUERDO EXCLUSIVO',
    badgeColor: 'bg-[#0acc80]/20 text-[#0acc80] border-[#0acc80]/40',
    color: '#0acc80',
    bgGradient: 'from-[#0acc80]/20 via-[#07150e] to-zinc-950',
    border: 'border-[#0acc80]/40 hover:border-[#0acc80]',
    glow: 'hover:shadow-[0_0_35px_rgba(10,204,128,0.4)]'
  }
];

const MOMENTOS_VIDEOS = [
  {
    id: 'vid-cumple',
    title: 'Cumpleaños & Fiestas',
    tag: 'FIESTA & CORTESÍAS',
    src: 'https://wdirdbryxwtbnprbrkvh.supabase.co/storage/v1/object/public/The_Weeknd/cumple.webp',
    videoUrl: 'https://res.cloudinary.com/dwlzez9mr/video/upload/f_auto,q_auto/v1774380723/video_cumple.webm'
  },
  {
    id: 'vid-cocteles',
    title: 'Coctelería de Autor',
    tag: 'MIXOLOGÍA 🍹',
    src: 'https://wdirdbryxwtbnprbrkvh.supabase.co/storage/v1/object/public/The_Weeknd/cocteleria.webp',
    videoUrl: 'https://res.cloudinary.com/dwlzez9mr/video/upload/f_auto,q_auto/v1774380723/video_cocteleria.webm'
  },
  {
    id: 'vid-alitas',
    title: 'Alitas & 31 Salsas',
    tag: 'SABOR ARTESANAL 🍗',
    src: 'https://wdirdbryxwtbnprbrkvh.supabase.co/storage/v1/object/public/The_Weeknd/alitas.webp',
    videoUrl: 'https://res.cloudinary.com/dwlzez9mr/video/upload/f_auto,q_auto/v1774380723/alitas2_upllif.webm'
  }
];

export function MomentosSection({ onOpenReserva, onOpenSocial }: MomentosSectionProps) {
  return (
    <section id="momentos" className="relative py-24 bg-[#08080c] text-[#f5f5f5] overflow-hidden border-t border-b border-white/10">
      {/* Background Volcanic and Neon Lights */}
      <div className="absolute inset-0 pointer-events-none opacity-25">
        <div className="absolute top-1/4 right-10 w-96 h-96 bg-[#c900ff]/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-10 w-96 h-96 bg-[#0acc80]/20 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-[#c900ff]/20 via-[#0acc80]/20 to-[#ffa40b]/20 border border-[#c900ff]/40 text-xs font-black tracking-[0.25em] text-[#c900ff] uppercase shadow-[0_0_25px_rgba(201,0,255,0.3)]"
          >
            <PartyPopper className="w-4 h-4 text-[#ffa40b]" />
            <span>CELEBRACIONES &amp; NOCHES INOLVIDABLES</span>
            <Sparkles className="w-4 h-4 text-[#0acc80]" />
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            VIVE TUS <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#c900ff] via-[#ffa40b] to-[#0acc80]">MOMENTOS</span> EN WEEKEND
          </motion.h2>

          <p className="text-sm sm:text-base text-zinc-400 font-medium leading-relaxed">
            Cumpleaños, aniversarios, reencuentros o simplemente una noche de fiesta con tu gente favorita. En Weekend cada mesa es una celebración.
          </p>
        </div>

        {/* ==================================================== */}
        {/* BENEFICIOS DESTACADOS (CUMPLEAÑOS, GRUPOS, POLAROID) */}
        {/* ==================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {BENEFICIOS_MOMENTOS.map((item, index) => {
            const IconComp = item.icon;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -6, scale: 1.02 }}
                className={`relative rounded-[28px] p-6 sm:p-8 bg-gradient-to-b ${item.bgGradient} border ${item.border} shadow-2xl transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer ${item.glow}`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-5">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${item.badgeColor}`}>
                      {item.badge}
                    </span>
                    <span className="text-3xl">{item.emoji}</span>
                  </div>

                  <h3 
                    className="text-lg sm:text-xl font-black uppercase text-white tracking-tight leading-snug mb-1"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    {item.title}
                  </h3>

                  <p className="text-xs font-bold text-zinc-300 mb-3" style={{ color: item.color }}>
                    {item.subtitle}
                  </p>

                  <p className="text-xs text-zinc-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
                  <span className="text-[11px] font-extrabold uppercase text-white flex items-center gap-1">
                    Incluido en Reservas
                  </span>
                  <div 
                    className="w-8 h-8 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: `${item.color}25`, color: item.color }}
                  >
                    <IconComp className="w-4 h-4" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ==================================================== */}
        {/* GRID DE MOMENTOS VISUALES / SOCIAL CARDS            */}
        {/* ==================================================== */}
        <div className="bg-zinc-950/80 border border-zinc-800 rounded-[32px] p-6 sm:p-8 relative overflow-hidden">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-black uppercase tracking-widest text-[#0acc80]">GALERÍA DE EXPERIENCIAS</span>
              <h3 
                className="text-2xl sm:text-3xl font-black uppercase text-white tracking-tight mt-1"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                La Fiesta en Acción
              </h3>
            </div>
            <button
              type="button"
              onClick={onOpenSocial}
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0acc80] hover:text-white bg-white/5 hover:bg-[#0acc80] hover:text-black border border-[#0acc80]/40 px-4 py-2 rounded-full transition-all cursor-pointer"
            >
              <span>Ver más en Redes Oficiales</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {MOMENTOS_VIDEOS.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                whileHover={{ scale: 1.03 }}
                className="group relative rounded-2xl overflow-hidden aspect-[4/5] bg-zinc-900 border border-zinc-800 cursor-pointer shadow-lg"
                onClick={onOpenSocial}
              >
                <img
                  src={item.src}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                
                <div className="absolute top-3 right-3 p-2 rounded-full bg-black/60 backdrop-blur-md text-white border border-white/20 group-hover:bg-[#0acc80] group-hover:text-black transition-colors">
                  <Play className="w-3.5 h-3.5 fill-current" />
                </div>

                <div className="absolute bottom-3 left-3 right-3">
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#0acc80] block mb-1">
                    {item.tag}
                  </span>
                  <h4 
                    className="text-sm font-black uppercase text-white leading-tight"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    {item.title}
                  </h4>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom Action Row */}
          <div className="mt-8 pt-6 border-t border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div className="flex items-center gap-3 text-zinc-300 text-xs">
              <Users className="w-5 h-5 text-[#c900ff]" />
              <span>¿Tienes un evento especial o cumpleaños? Planifiquemos tu reserva.</span>
            </div>
            <button
              type="button"
              onClick={onOpenReserva}
              className="px-6 py-3 rounded-full bg-[#c900ff] text-white font-black uppercase tracking-widest text-xs hover:bg-white hover:text-[#c900ff] transition-all shadow-[0_0_20px_rgba(201,0,255,0.4)] active:scale-95 cursor-pointer flex items-center gap-2"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              <Calendar className="w-4 h-4" />
              <span>Reservar Mi Evento</span>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
