// @ts-nocheck
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, PartyPopper, Gift, Camera, 
  Wine, Users, Calendar, ArrowRight, Play, Pause,
  Volume2, VolumeX, Maximize2, X, MessageCircle, Phone,
  Flame, CheckCircle2, Film, Star
} from 'lucide-react';

interface MomentosSectionProps {
  onOpenReserva?: () => void;
  onOpenSocial?: () => void;
}

const CONTACT_WA = "51961336674";
const WA_RESERVA_URL = `https://wa.me/${CONTACT_WA}?text=${encodeURIComponent('¡Hola Weekend! Deseo reservar para mi cumpleaños / noche de patas y acceder a las cortesías.')}`;

// Exactamente 3 Videos de Cumpleaños Funcionales y Destacados
const FEATURED_BIRTHDAY_VIDEOS = [
  {
    id: 'cumplepubertos',
    title: 'Cumpleaños Pubertos & Jóvenes',
    category: 'Vibra Juvenil & Amigos',
    badge: '🎉 CUMPLE JOVEN',
    videoUrl: 'https://wdirdbryxwtbnprbrkvh.supabase.co/storage/v1/object/public/The_Weeknd/cumplepubertos.webm',
    accentColor: '#0acc80',
    description: 'La energía más prendida de Huarmey celebrando con amigos, risas, bengalas y la mejor música.'
  },
  {
    id: 'cumpleviejo',
    title: 'Cumpleaños Familiar & Adulto Mayor',
    category: 'Celebración de Oro',
    badge: '👑 CUMPLE DORADO',
    videoUrl: 'https://wdirdbryxwtbnprbrkvh.supabase.co/storage/v1/object/public/The_Weeknd/cumpleviejo.webm',
    accentColor: '#ffa40b',
    description: 'Celebraciones inolvidables para todas las generaciones con atención cálida, fotos y obsequios.'
  },
  {
    id: 'cumpleequipo',
    title: 'Celebración con Equipo Weekend',
    category: 'Fiesta & Show en Vivo',
    badge: '🎂 CUMPLEAÑOS EN VIVO',
    videoUrl: '/videos/cumpleequipo.webm',
    fallbackUrl: 'https://wdirdbryxwtbnprbrkvh.supabase.co/storage/v1/object/public/The_Weeknd/CumpleAdoles2.webm',
    accentColor: '#c900ff',
    description: 'Bengalas de fuego frío, cánticos en coro y los 5 obsequios sorpresa Weekend en tu mesa.'
  }
];

interface VideoCardItemProps {
  video: typeof FEATURED_BIRTHDAY_VIDEOS[number];
  onOpenModal: (video: typeof FEATURED_BIRTHDAY_VIDEOS[number]) => void;
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
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className="group relative rounded-[32px] overflow-hidden bg-zinc-950 border border-white/15 shadow-[0_0_40px_rgba(0,0,0,0.8)] flex flex-col justify-between aspect-[9/16] w-full cursor-pointer hover:border-[#c900ff]/70 transition-all duration-300"
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
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-black/65 pointer-events-none" />

      {/* Top Bar: Badge and Audio/Play Action Buttons */}
      <div className="relative z-10 p-5 flex items-center justify-between gap-2">
        <span 
          className="px-3.5 py-1 rounded-full text-[11px] font-black uppercase tracking-wider backdrop-blur-md shadow-md"
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
            className="p-2.5 rounded-full bg-black/75 hover:bg-[#c900ff] text-white backdrop-blur-md transition-all active:scale-90 shadow-md cursor-pointer"
            title={isMuted ? "Activar audio" : "Silenciar"}
            aria-label={isMuted ? "Activar audio" : "Silenciar"}
          >
            {isMuted ? <VolumeX size={15} className="text-rose-400" /> : <Volume2 size={15} className="text-[#0acc80]" />}
          </button>
          
          <button
            type="button"
            onClick={togglePlay}
            className="p-2.5 rounded-full bg-black/75 hover:bg-white text-white hover:text-black backdrop-blur-md transition-all active:scale-90 shadow-md cursor-pointer"
            title={isPlaying ? "Pausar" : "Reproducir"}
            aria-label={isPlaying ? "Pausar" : "Reproducir"}
          >
            {isPlaying ? <Pause size={15} /> : <Play size={15} className="fill-current text-[#c900ff]" />}
          </button>
        </div>
      </div>

      {/* Center Play Pulse Hint on Hover */}
      <div className="relative z-10 flex-1 flex items-center justify-center pointer-events-none">
        <div className="w-14 h-14 rounded-full bg-black/60 backdrop-blur-md border border-white/30 flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300 shadow-[0_0_30px_rgba(201,0,255,0.5)]">
          <Maximize2 size={20} className="text-white" />
        </div>
      </div>

      {/* Bottom Information */}
      <div className="relative z-10 p-5 pt-2">
        <span className="text-[11px] font-bold text-zinc-300 uppercase tracking-wider block">
          {video.category}
        </span>
        <h4 
          className="text-base sm:text-lg font-black uppercase text-white leading-tight mt-0.5"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          {video.title}
        </h4>
        <p className="text-xs text-zinc-300 mt-1 line-clamp-2 leading-relaxed">
          {video.description}
        </p>
        <div className="mt-3 flex items-center gap-1.5 text-xs font-bold text-[#c900ff] group-hover:text-white transition-colors">
          <span>Ver con audio en pantalla completa</span>
          <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </motion.div>
  );
};

export function MomentosSection({ onOpenReserva, onOpenSocial }: MomentosSectionProps) {
  const [selectedVideo, setSelectedVideo] = useState<typeof FEATURED_BIRTHDAY_VIDEOS[number] | null>(null);

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

      {/* Ambient Glow Lights */}
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
        {/* 1. SECCIÓN VIDEOS DE CUMPLEAÑOS (GRID SIMÉTRICO DE EXACTAMENTE 3 CARDS)    */}
        {/* ========================================================================= */}
        <div className="bg-gradient-to-br from-zinc-950 via-[#130720] to-zinc-950 border border-[#c900ff]/40 rounded-[36px] p-6 sm:p-8 lg:p-10 relative overflow-hidden mb-16 shadow-[0_0_50px_rgba(201,0,255,0.25)]">
          
          {/* Header del bloque */}
          <div className="text-center sm:text-left mb-8 space-y-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#c900ff]/20 border border-[#c900ff]/50 text-[#c900ff] text-xs font-black uppercase tracking-widest shadow-md">
              <Gift className="w-3.5 h-3.5" />
              <span>VIDEOS DE CUMPLEAÑOS &amp; CELEBRACIONES</span>
            </div>
            <h3 
              className="text-2xl sm:text-4xl font-black uppercase text-white tracking-tight leading-none"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              ¡Así se Festeja en <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#c900ff] via-[#ffa40b] to-[#0acc80]">Weekend!</span>
            </h3>
            <p className="text-xs sm:text-sm text-zinc-300 max-w-2xl">
              Toca o activa el audio de cada reel para vivir la experiencia Weekend: música en vivo, bengalas, rondas de shots y los 5 obsequios de cumpleaños.
            </p>
          </div>

          {/* Grid de 3 Tarjetas de Video Simétricas */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {FEATURED_BIRTHDAY_VIDEOS.map((video) => (
              <VideoCardItem
                key={video.id}
                video={video}
                onOpenModal={setSelectedVideo}
              />
            ))}
          </div>

          {/* Banner de Cortesía 5 Obsequios de Cumpleaños */}
          <div className="mt-10 p-6 rounded-2xl bg-black/60 border border-[#c900ff]/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div className="space-y-1">
              <span className="text-[#c900ff] text-xs font-black uppercase tracking-wider block font-bold">
                🎁 CORTESÍA EXCLUSIVA DE CUMPLEAÑOS
              </span>
              <p className="text-xs sm:text-sm text-zinc-200">
                <strong>Reserva tu cumpleaños previamente y recibe los 5 obsequios Weekend:</strong> bengala de celebración, brindis especial, cortesía de la casa, foto Polaroid y mesa ambientada.
              </p>
            </div>
            <a
              href={WA_RESERVA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-full bg-[#c900ff] text-white font-black uppercase tracking-wider text-xs hover:bg-white hover:text-black transition-all shadow-[0_0_20px_rgba(201,0,255,0.5)] shrink-0 flex items-center gap-2 cursor-pointer"
            >
              <MessageCircle size={15} />
              <span>Reservar Cumple</span>
            </a>
          </div>

        </div>

        {/* ========================================================================= */}
        {/* 2. SUBSECCIONES MODULARES: 'SHOT DE AMIGOS' & 'CÁMARA POLAROID'             */}
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
                className="text-2xl sm:text-3xl font-black uppercase text-white tracking-tight leading-tight mb-3"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                RONDA DE SHOT <span className="text-[#ffa40b]">DESTORNILLADOR</span>
              </h3>

              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed mb-6">
                <strong className="text-white font-bold">Reserva tu noche de patas y recibe una ronda de shot destornillador para abrir la noche.</strong> El ambiente perfecto para compartir piqueos, cervezas heladas y cócteles de autor.
              </p>

              {/* Beneficios de la Experiencia */}
              <div className="p-4 rounded-2xl bg-black/50 border border-[#ffa40b]/30 space-y-2.5">
                <div className="flex items-center gap-2 text-xs text-zinc-200">
                  <CheckCircle2 size={16} className="text-[#ffa40b] shrink-0" />
                  <span>Ronda de bienvenida para toda tu mancha</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-zinc-200">
                  <CheckCircle2 size={16} className="text-[#ffa40b] shrink-0" />
                  <span>Ubicación preferencial en mesas lounge</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-zinc-200">
                  <CheckCircle2 size={16} className="text-[#ffa40b] shrink-0" />
                  <span>Música en vivo &amp; atención prioritaria</span>
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
                className="px-5 py-2.5 rounded-full bg-[#ffa40b] text-black font-black uppercase tracking-wider text-xs hover:bg-white transition-all shadow-[0_0_20px_rgba(255,164,11,0.4)] cursor-pointer"
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
                className="text-2xl sm:text-3xl font-black uppercase text-white tracking-tight leading-tight mb-3"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                FOTO POLAROID <span className="text-[#0acc80]">DE RECUERDO</span>
              </h3>

              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed mb-6">
                <strong className="text-white font-bold">Nuestro staff capturará el mejor momento de tu velada</strong> para que te lleves una fotografía Polaroid física de recuerdo a casa totalmente gratis en tu reserva especial.
              </p>

              {/* Beneficios de la Experiencia */}
              <div className="p-4 rounded-2xl bg-black/50 border border-[#0acc80]/30 space-y-2.5">
                <div className="flex items-center gap-2 text-xs text-zinc-200">
                  <CheckCircle2 size={16} className="text-[#0acc80] shrink-0" />
                  <span>Foto física instantánea entregada en tu mesa</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-zinc-200">
                  <CheckCircle2 size={16} className="text-[#0acc80] shrink-0" />
                  <span>Marco personalizado con diseño exclusivo Weekend</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-zinc-200">
                  <CheckCircle2 size={16} className="text-[#0acc80] shrink-0" />
                  <span>El mejor recuerdo tangible de tu noche</span>
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
                className="px-5 py-2.5 rounded-full bg-[#0acc80] text-black font-black uppercase tracking-wider text-xs hover:bg-white transition-all shadow-[0_0_20px_rgba(10,204,128,0.4)] cursor-pointer"
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

            {onOpenReserva && (
              <button
                type="button"
                onClick={onOpenReserva}
                className="px-6 py-3.5 rounded-full bg-zinc-900 border border-[#c900ff]/60 text-white font-black uppercase tracking-widest text-xs hover:bg-[#c900ff] hover:text-white transition-all shadow-[0_0_20px_rgba(201,0,255,0.35)] active:scale-95 cursor-pointer flex items-center gap-2"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                <Calendar className="w-4 h-4" />
                <span>Formulario de Mesa</span>
              </button>
            )}
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
                  className="px-4 py-2 rounded-full bg-[#0acc80] text-black font-black uppercase tracking-wider text-xs hover:bg-white transition-all shrink-0 flex items-center gap-1.5 cursor-pointer"
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
