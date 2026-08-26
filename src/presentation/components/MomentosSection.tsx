// @ts-nocheck
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, PartyPopper, Gift, Camera, 
  Wine, Users, Calendar, ArrowRight, Play, Pause,
  Volume2, VolumeX, Maximize2, X, MessageCircle, Phone,
  Flame, CheckCircle2, Film, ChevronLeft, ChevronRight
} from 'lucide-react';

interface MomentosSectionProps {
  onOpenReserva?: () => void;
  onOpenSocial?: () => void;
}

const CONTACT_WA = "51961336674";
const WA_RESERVA_URL = `https://wa.me/${CONTACT_WA}?text=${encodeURIComponent('¡Hola Weekend! Deseo reservar para mi cumpleaños / noche de patas y acceder a las cortesías.')}`;

// Lista completa de Videos de Cumpleaños para el Carrusel Horizontal
const CUMPLE_VIDEOS_CAROUSEL = [
  {
    id: 'cumplepubertos',
    title: 'Cumpleaños Pubertos & Jóvenes',
    category: 'Vibra Juvenil & Amigos',
    badge: '🎉 CUMPLE JOVEN',
    videoUrl: 'https://wdirdbryxwtbnprbrkvh.supabase.co/storage/v1/object/public/The_Weeknd/cumplepubertos.webm',
    accentColor: '#0acc80',
    description: 'La energía más prendida de Huarmey celebrando con amigos, risas y la mejor música.'
  },
  {
    id: 'cumpleviejo',
    title: 'Cumpleaños Familiar & Adulto Mayor',
    category: 'Celebración de Oro',
    badge: '👑 CUMPLE DORADO',
    videoUrl: 'https://wdirdbryxwtbnprbrkvh.supabase.co/storage/v1/object/public/The_Weeknd/cumpleviejo.webm',
    accentColor: '#ffa40b',
    description: 'Celebraciones inolvidables para todas las generaciones con atención cálida y personalizada.'
  },
  {
    id: 'cumpleequipo',
    title: 'Celebración con Equipo Weekend',
    category: 'Fiesta & Show en Vivo',
    badge: '🎂 CUMPLEAÑOS EN VIVO',
    videoUrl: '/videos/cumpleequipo.webm',
    fallbackUrl: 'https://wdirdbryxwtbnprbrkvh.supabase.co/storage/v1/object/public/The_Weeknd/CumpleAdoles2.webm',
    accentColor: '#c900ff',
    description: 'Bengalas de fuego frío, cánticos de cumpleaños y los 5 obsequios sorpresa Weekend.'
  },
  {
    id: 'cumple-adolescentes',
    title: 'Fiesta de Cumpleaños Teens',
    category: 'Amigos & Mancha',
    badge: '🔥 CUMPLE TEENS',
    videoUrl: 'https://wdirdbryxwtbnprbrkvh.supabase.co/storage/v1/object/public/The_Weeknd/CumpleAdolescentes.webm',
    accentColor: '#ff007f',
    description: 'Torta, bebidas y el mejor ambiente nocturno para festejar tu fecha especial.'
  },
  {
    id: 'cumple-adoles2',
    title: 'Velas & Torta con Amigos',
    category: 'Celebración en Mancha',
    badge: '🎂 MOMENTO TARTA',
    videoUrl: 'https://wdirdbryxwtbnprbrkvh.supabase.co/storage/v1/object/public/The_Weeknd/CumpleAdoles2.webm',
    accentColor: '#00f2fe',
    description: 'El clásico apagón de velas rodeado de tu gente favorita y cócteles de autor.'
  },
  {
    id: 'cumple-adulta',
    title: 'Noche de Cumple & Brindis',
    category: 'Fiesta & Cócteles',
    badge: '🥂 BRINDIS NOCTURNO',
    videoUrl: 'https://wdirdbryxwtbnprbrkvh.supabase.co/storage/v1/object/public/The_Weeknd/CumpleAdulta.webm',
    accentColor: '#ffa40b',
    description: 'Brindis elegante con coctelería premium, piqueos artesanales y ambientación VIP.'
  },
  {
    id: 'cumple-chica',
    title: 'Cumpleaños Girls Party',
    category: 'Salida VIP de Chicas',
    badge: '👑 CUMPLEAÑERA VIP',
    videoUrl: 'https://wdirdbryxwtbnprbrkvh.supabase.co/storage/v1/object/public/The_Weeknd/CumpleChica.webm',
    accentColor: '#e11d48',
    description: 'Noche exclusiva para la reina de la mesa con fotos Polaroid de recuerdo.'
  },
  {
    id: 'cumple-familiar',
    title: 'Reencuentro Familiar Weekend',
    category: 'Todas las Edades',
    badge: '❤️ TODAS LAS EDADES',
    videoUrl: 'https://wdirdbryxwtbnprbrkvh.supabase.co/storage/v1/object/public/The_Weeknd/cumpleAnciano.webm',
    accentColor: '#0acc80',
    description: 'Momentos entrañables en familia con nuestra carta completa y boxes festivos.'
  }
];

interface VideoCardItemProps {
  video: typeof CUMPLE_VIDEOS_CAROUSEL[number];
  onOpenModal: (video: typeof CUMPLE_VIDEOS_CAROUSEL[number]) => void;
}

const VideoCardItem: React.FC<VideoCardItemProps> = ({ video, onOpenModal }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    const nextMuted = !videoRef.current.muted;
    videoRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className="group relative rounded-[28px] overflow-hidden bg-zinc-950 border border-white/15 shadow-2xl flex flex-col justify-between aspect-[9/16] w-[260px] sm:w-[280px] md:w-[300px] shrink-0 snap-start cursor-pointer hover:border-[#c900ff]/60 transition-all duration-300"
      onClick={() => onOpenModal(video)}
    >
      {/* Video Background */}
      <video
        ref={videoRef}
        playsInline
        muted={isMuted}
        loop
        autoPlay
        preload="metadata"
        className="absolute inset-0 w-full h-full object-cover brightness-95 group-hover:brightness-105 group-hover:scale-105 transition-all duration-700"
      >
        <source src={video.videoUrl} type="video/webm" />
        {video.fallbackUrl && <source src={video.fallbackUrl} type="video/webm" />}
      </video>

      {/* Dynamic Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/25 to-black/65 pointer-events-none" />

      {/* Top Bar: Badge and Action Buttons */}
      <div className="relative z-10 p-4 flex items-center justify-between gap-2">
        <span 
          className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider backdrop-blur-md shadow-md"
          style={{ 
            backgroundColor: `${video.accentColor}25`, 
            color: video.accentColor,
            border: `1px solid ${video.accentColor}60` 
          }}
        >
          {video.badge}
        </span>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={toggleMute}
            className="p-2 rounded-full bg-black/70 hover:bg-[#c900ff] text-white backdrop-blur-md transition-all active:scale-90 shadow-md"
            title={isMuted ? "Activar audio" : "Silenciar"}
            aria-label={isMuted ? "Activar audio" : "Silenciar"}
          >
            {isMuted ? <VolumeX size={14} className="text-rose-400" /> : <Volume2 size={14} className="text-[#0acc80]" />}
          </button>
          
          <button
            type="button"
            onClick={togglePlay}
            className="p-2 rounded-full bg-black/70 hover:bg-white text-white hover:text-black backdrop-blur-md transition-all active:scale-90 shadow-md"
            title={isPlaying ? "Pausar" : "Reproducir"}
            aria-label={isPlaying ? "Pausar" : "Reproducir"}
          >
            {isPlaying ? <Pause size={14} /> : <Play size={14} className="fill-current text-[#c900ff]" />}
          </button>
        </div>
      </div>

      {/* Center Play Pulse Hint on Hover */}
      <div className="relative z-10 flex-1 flex items-center justify-center pointer-events-none">
        <div className="w-12 h-12 rounded-full bg-black/60 backdrop-blur-md border border-white/30 flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300 shadow-[0_0_25px_rgba(201,0,255,0.5)]">
          <Maximize2 size={18} className="text-white" />
        </div>
      </div>

      {/* Bottom Info */}
      <div className="relative z-10 p-4 pt-2">
        <span className="text-[10px] font-bold text-zinc-300 uppercase tracking-wider block">
          {video.category}
        </span>
        <h4 
          className="text-sm sm:text-base font-black uppercase text-white leading-tight mt-0.5"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          {video.title}
        </h4>
        <div className="mt-2.5 flex items-center gap-1.5 text-[10px] font-bold text-[#c900ff] group-hover:text-white transition-colors">
          <span>Ver con audio en pantalla completa</span>
          <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </motion.div>
  );
};

export function MomentosSection({ onOpenReserva, onOpenSocial }: MomentosSectionProps) {
  const [selectedVideo, setSelectedVideo] = useState<typeof CUMPLE_VIDEOS_CAROUSEL[number] | null>(null);
  const carouselRef = useRef<HTMLDivElement | null>(null);

  const scrollCarousel = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = direction === 'left' ? -340 : 340;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section id="momentos" className="relative py-20 sm:py-24 bg-[#08080c] text-[#f5f5f5] overflow-hidden border-t border-b border-white/10">
      
      {/* Background Official Supabase Asset fondoPromociones.webp */}
      <div className="fixed inset-0 pointer-events-none -z-10 opacity-25 overflow-hidden">
        <img
          src="https://wdirdbryxwtbnprbrkvh.supabase.co/storage/v1/object/public/The_Weeknd/fondoPromociones.webp"
          alt=""
          aria-hidden="true"
          loading="lazy"
          className="w-full h-full object-cover object-center filter saturate-125 contrast-110"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#08080c]/85 via-[#08080c]/60 to-[#08080c]/90" />
      </div>

      {/* Ambient Lights */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <div className="absolute top-1/4 right-10 w-96 h-96 bg-[#c900ff]/25 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-10 w-96 h-96 bg-[#0acc80]/25 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#ffa40b]/15 rounded-full blur-[140px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
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
            Cumpleaños, reencuentros o una noche de fiesta con tu gente favorita. En Weekend cada mesa es una celebración con cortesías exclusivas.
          </p>
        </div>

        {/* ========================================================================= */}
        {/* 1. SECCIÓN VIDEOS DE CUMPLEAÑOS (CARRUSEL HORIZONTAL CON FLECHAS)         */}
        {/* ========================================================================= */}
        <div className="bg-gradient-to-br from-zinc-950 via-[#130720] to-zinc-950 border border-[#c900ff]/40 rounded-[36px] p-6 sm:p-8 lg:p-10 relative overflow-hidden mb-16 shadow-[0_0_50px_rgba(201,0,255,0.25)]">
          
          {/* Header del Carrusel con Controles de Flechas */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#c900ff]/20 border border-[#c900ff]/50 text-[#c900ff] text-xs font-black uppercase tracking-widest mb-2 shadow-md">
                <Gift className="w-3.5 h-3.5" />
                <span>VIDEOS DE CUMPLEAÑOS &amp; CELEBRACIONES</span>
              </div>
              <h3 
                className="text-2xl sm:text-4xl font-black uppercase text-white tracking-tight leading-none"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                ¡Así se Festeja en <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#c900ff] via-[#ffa40b] to-[#0acc80]">Weekend!</span>
              </h3>
              <p className="text-xs sm:text-sm text-zinc-300 mt-2 max-w-2xl">
                Desliza horizontalmente para ver todos los reels de cumpleaños: música, bengalas, rondas de shots y los 5 obsequios exclusivos.
              </p>
            </div>

            {/* Controles de Navegación por Flechas (< / >) */}
            <div className="flex items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={() => scrollCarousel('left')}
                className="p-3 rounded-full bg-black/70 hover:bg-[#c900ff] text-white border border-white/20 hover:border-[#c900ff] transition-all shadow-lg active:scale-90 cursor-pointer"
                title="Desplazar hacia la izquierda"
                aria-label="Desplazar hacia la izquierda"
              >
                <ChevronLeft size={20} />
              </button>

              <button
                type="button"
                onClick={() => scrollCarousel('right')}
                className="p-3 rounded-full bg-[#c900ff] hover:bg-white text-white hover:text-black border border-[#c900ff] transition-all shadow-[0_0_20px_rgba(201,0,255,0.6)] active:scale-90 cursor-pointer"
                title="Desplazar hacia la derecha"
                aria-label="Desplazar hacia la derecha"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          {/* Contenedor del Slider / Carrusel Horizontal con Scroll Suave */}
          <div className="relative group/slider">
            
            {/* Carrusel con Scroll Snap y scrollbar oculta */}
            <div
              ref={carouselRef}
              className="flex items-center gap-5 overflow-x-auto pb-6 pt-2 snap-x snap-mandatory scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {CUMPLE_VIDEOS_CAROUSEL.map((video) => (
                <VideoCardItem
                  key={video.id}
                  video={video}
                  onOpenModal={setSelectedVideo}
                />
              ))}
            </div>

            {/* Indicador de Desplazamiento Horizontal */}
            <div className="mt-4 flex items-center justify-between text-xs text-zinc-400 font-bold border-t border-white/10 pt-4">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#c900ff] animate-ping" />
                <span>{CUMPLE_VIDEOS_CAROUSEL.length} videos en galería &bull; Desliza o usa las flechas</span>
              </span>

              <div className="flex items-center gap-2 text-[#c900ff]">
                <span>Desplazar</span>
                <ChevronRight size={14} className="animate-pulse" />
              </div>
            </div>

          </div>

          {/* Banner de Cortesía 5 Obsequios */}
          <div className="mt-8 p-6 rounded-2xl bg-black/60 border border-[#c900ff]/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div className="space-y-1">
              <span className="text-[#c900ff] text-xs font-black uppercase tracking-wider block">
                🎁 CORTESÍA EXCLUSIVA DE CUMPLEAÑOS
              </span>
              <p className="text-xs sm:text-sm text-zinc-200">
                <strong>Reserva tu cumple previamente y recibe los 5 obsequios Weekend:</strong> bengala de celebración, brindis especial, cortesía de la casa, foto Polaroid y mesa ambientada.
              </p>
            </div>
            <a
              href={WA_RESERVA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-full bg-[#c900ff] text-white font-black uppercase tracking-wider text-xs hover:bg-white hover:text-black transition-all shadow-[0_0_20px_rgba(201,0,255,0.5)] shrink-0 flex items-center gap-2"
            >
              <MessageCircle size={15} />
              <span>Reservar Cumple</span>
            </a>
          </div>

        </div>

        {/* ========================================================================= */}
        {/* 2. NUEVAS SUBSECCIONES ADYACENTES: 'SHOT DE AMIGOS' & 'CÁMARA POLAROID'    */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          
          {/* SUBSECCIÓN 1: SHOT DE AMIGOS */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-[32px] p-6 sm:p-8 bg-gradient-to-br from-zinc-950 via-[#1c1206] to-zinc-950 border border-[#ffa40b]/40 shadow-[0_0_40px_rgba(255,164,11,0.2)] flex flex-col justify-between relative overflow-hidden group hover:border-[#ffa40b] transition-all duration-300"
          >
            <div>
              {/* Header Badge */}
              <div className="flex items-center justify-between gap-3 mb-6">
                <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-[#ffa40b]/20 text-[#ffa40b] border border-[#ffa40b]/50 shadow-md">
                  🥃 NOCHE DE PATAS
                </span>
                <span className="text-3xl">🥃</span>
              </div>

              <h3 
                className="text-2xl sm:text-3xl font-black uppercase text-white tracking-tight leading-tight mb-2"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                RONDA DE SHOT <span className="text-[#ffa40b]">DESTORNILLADOR</span>
              </h3>

              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed mb-6">
                <strong className="text-white font-bold">Reserva tu noche de patas y recibe una ronda de shot destornillador para abrir la noche.</strong> El ambiente perfecto para compartir piqueos, cervezas heladas y cócteles de autor.
              </p>

              {/* Contenedor preparado para recibir video con audio */}
              <div className="relative rounded-2xl overflow-hidden bg-black/80 border border-[#ffa40b]/30 aspect-video flex items-center justify-center p-4 text-center group-hover:border-[#ffa40b]/60 transition-colors">
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none" />
                <div className="relative z-10 space-y-2">
                  <div className="w-12 h-12 rounded-full bg-[#ffa40b]/20 border border-[#ffa40b]/50 flex items-center justify-center mx-auto text-[#ffa40b] shadow-[0_0_20px_rgba(255,164,11,0.4)]">
                    <Film size={20} />
                  </div>
                  <p className="text-xs font-black uppercase tracking-wider text-white">Video Noche de Patas</p>
                  <p className="text-[10px] text-zinc-400">Contenedor preparado para próximo reel con audio estéreo</p>
                </div>
              </div>
            </div>

            {/* Bottom Action */}
            <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between">
              <span className="text-[11px] font-bold text-[#ffa40b] flex items-center gap-1">
                <CheckCircle2 size={14} />
                <span>Incluido en reservas de grupo</span>
              </span>
              <a
                href={WA_RESERVA_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-full bg-[#ffa40b] text-black font-black uppercase tracking-wider text-xs hover:bg-white transition-all shadow-[0_0_20px_rgba(255,164,11,0.4)]"
              >
                Pedir Ronda
              </a>
            </div>
          </motion.div>

          {/* SUBSECCIÓN 2: CÁMARA POLAROID */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="rounded-[32px] p-6 sm:p-8 bg-gradient-to-br from-zinc-950 via-[#071910] to-zinc-950 border border-[#0acc80]/40 shadow-[0_0_40px_rgba(10,204,128,0.2)] flex flex-col justify-between relative overflow-hidden group hover:border-[#0acc80] transition-all duration-300"
          >
            <div>
              {/* Header Badge */}
              <div className="flex items-center justify-between gap-3 mb-6">
                <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-[#0acc80]/20 text-[#0acc80] border border-[#0acc80]/50 shadow-md">
                  📸 FOTO INSTANTÁNEA
                </span>
                <span className="text-3xl">📸</span>
              </div>

              <h3 
                className="text-2xl sm:text-3xl font-black uppercase text-white tracking-tight leading-tight mb-2"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                FOTO POLAROID <span className="text-[#0acc80]">DE RECUERDO</span>
              </h3>

              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed mb-6">
                <strong className="text-white font-bold">Nuestro staff capturará el mejor momento de tu velada</strong> para que te lleves una fotografía Polaroid física de recuerdo a casa totalmente gratis en tu reserva especial.
              </p>

              {/* Contenedor preparado para recibir video con audio (Marco Polaroid) */}
              <div className="relative rounded-2xl overflow-hidden bg-black/80 border border-[#0acc80]/30 aspect-video flex items-center justify-center p-4 text-center group-hover:border-[#0acc80]/60 transition-colors">
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none" />
                <div className="relative z-10 space-y-2">
                  <div className="w-12 h-12 rounded-full bg-[#0acc80]/20 border border-[#0acc80]/50 flex items-center justify-center mx-auto text-[#0acc80] shadow-[0_0_20px_rgba(10,204,128,0.4)]">
                    <Camera size={20} />
                  </div>
                  <p className="text-xs font-black uppercase tracking-wider text-white">Video Polaroid en Vivo</p>
                  <p className="text-[10px] text-zinc-400">Contenedor preparado para próximo reel con audio estéreo</p>
                </div>
              </div>
            </div>

            {/* Bottom Action */}
            <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between">
              <span className="text-[11px] font-bold text-[#0acc80] flex items-center gap-1">
                <CheckCircle2 size={14} />
                <span>Foto física de regalo</span>
              </span>
              <a
                href={WA_RESERVA_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-full bg-[#0acc80] text-black font-black uppercase tracking-wider text-xs hover:bg-white transition-all shadow-[0_0_20px_rgba(10,204,128,0.4)]"
              >
                Reservar Foto
              </a>
            </div>
          </motion.div>

        </div>

        {/* ========================================================================= */}
        {/* 3. BARRA DE ATENCIÓN DIRECTA Y RESERVAS POR WHATSAPP                       */}
        {/* ========================================================================= */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#c900ff]/15 via-black to-[#0acc80]/15 border border-white/15 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="space-y-1.5 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-[#0acc80] uppercase tracking-wider">
              <Phone className="w-3.5 h-3.5" />
              <span>Atención Directa: <strong>+51 961 336 674</strong></span>
            </div>
            <h4 
              className="text-lg sm:text-xl font-black uppercase text-white"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              ¿Listo para armar tu velada en Weekend Huarmey?
            </h4>
            <p className="text-xs text-zinc-400">
              Reserva con anticipación tu mesa y asegura los 5 obsequios o la ronda de cortesía.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            <a
              href={WA_RESERVA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-full bg-[#0acc80] text-black font-black uppercase tracking-widest text-xs hover:bg-white transition-all shadow-[0_0_25px_rgba(10,204,128,0.45)] active:scale-95 cursor-pointer flex items-center gap-2"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              <MessageCircle className="w-4 h-4" />
              <span>Reservar por WhatsApp</span>
            </a>

            <button
              type="button"
              onClick={onOpenReserva}
              className="px-6 py-3.5 rounded-full bg-zinc-900 border border-[#c900ff]/60 text-white font-black uppercase tracking-widest text-xs hover:bg-[#c900ff] hover:text-white transition-all shadow-[0_0_20px_rgba(201,0,255,0.35)] active:scale-95 cursor-pointer flex items-center gap-2"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              <Calendar className="w-4 h-4" />
              <span>Formulario de Mesa</span>
            </button>
          </div>
        </div>

      </div>

      {/* Fullscreen Video Modal with Sound & Controls */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setSelectedVideo(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-sm sm:max-w-md bg-zinc-950 rounded-[32px] overflow-hidden border border-[#c900ff]/50 shadow-[0_0_60px_rgba(201,0,255,0.5)] flex flex-col"
            >
              {/* Modal Header */}
              <div className="p-4 bg-zinc-900/90 border-b border-white/10 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#c900ff]">
                    {selectedVideo.badge}
                  </span>
                  <h3 className="text-sm font-black uppercase text-white">{selectedVideo.title}</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedVideo(null)}
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                  aria-label="Cerrar reproductor"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Video with Controls */}
              <div className="relative aspect-[9/16] bg-black">
                <video
                  src={selectedVideo.videoUrl}
                  playsInline
                  autoPlay
                  controls
                  loop
                  className="w-full h-full object-contain"
                >
                  <source src={selectedVideo.videoUrl} type="video/webm" />
                  {selectedVideo.fallbackUrl && <source src={selectedVideo.fallbackUrl} type="video/webm" />}
                </video>
              </div>

              {/* Modal Footer CTA */}
              <div className="p-4 bg-zinc-900/90 border-t border-white/10 flex items-center justify-between gap-3">
                <span className="text-xs text-zinc-300 font-bold">¡Celebra tu cumpleaños en Weekend!</span>
                <a
                  href={WA_RESERVA_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-full bg-[#0acc80] text-black font-black uppercase tracking-wider text-xs hover:bg-white transition-all shrink-0 flex items-center gap-1.5"
                >
                  <MessageCircle size={14} />
                  <span>Reservar</span>
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
