import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, PartyPopper, Gift, Camera, 
  Wine, Users, Calendar, ArrowRight, Play, Pause,
  Volume2, VolumeX, Maximize2, X, MessageCircle, Phone
} from 'lucide-react';

interface MomentosSectionProps {
  onOpenReserva?: () => void;
  onOpenSocial?: () => void;
}

const CONTACT_WA = "51961336674";
const WA_RESERVA_URL = `https://wa.me/${CONTACT_WA}?text=${encodeURIComponent('¡Hola Weekend! Deseo reservar para mi cumpleaños / noche de patas y acceder a las cortesías.')}`;

const BENEFICIOS_MOMENTOS = [
  {
    id: 'cumple',
    title: '5 OBSEQUIOS WEEKEND',
    subtitle: 'En tu mes de cumpleaños',
    description: 'reserva tu cumple previamente y recibe los 5 obsequios Weekend',
    icon: Gift,
    emoji: '🎂',
    badge: 'CUMPLEAÑOS VIP 🎂',
    badgeColor: 'bg-[#c900ff]/20 text-[#c900ff] border-[#c900ff]/40',
    color: '#c900ff',
    bgGradient: 'from-[#c900ff]/25 via-[#1a0824] to-zinc-950',
    border: 'border-[#c900ff]/40 hover:border-[#c900ff]',
    glow: 'hover:shadow-[0_0_35px_rgba(201,0,255,0.45)]'
  },
  {
    id: 'patas',
    title: 'RONDA DE SHOT DESTORNILLADOR',
    subtitle: 'Noche de patas & amigos',
    description: 'Reserva tu noche de patas y recibe una ronda de shot destornillador para abrir la noche',
    icon: Wine,
    emoji: '🥃',
    badge: 'NOCHE DE PATAS 🥃',
    badgeColor: 'bg-[#ffa40b]/20 text-[#ffa40b] border-[#ffa40b]/40',
    color: '#ffa40b',
    bgGradient: 'from-[#ffa40b]/25 via-[#221305] to-zinc-950',
    border: 'border-[#ffa40b]/40 hover:border-[#ffa40b]',
    glow: 'hover:shadow-[0_0_35px_rgba(255,164,11,0.45)]'
  },
  {
    id: 'polaroid',
    title: 'FOTO POLAROID DE RECUERDO',
    subtitle: 'Tu noche impresa al instante',
    description: 'Nuestro staff capturará el mejor momento de tu velada para que te lleves una fotografía Polaroid física de recuerdo a casa.',
    icon: Camera,
    emoji: '📸',
    badge: 'FOTO INSTANTÁNEA 📸',
    badgeColor: 'bg-[#0acc80]/20 text-[#0acc80] border-[#0acc80]/40',
    color: '#0acc80',
    bgGradient: 'from-[#0acc80]/25 via-[#06180f] to-zinc-950',
    border: 'border-[#0acc80]/40 hover:border-[#0acc80]',
    glow: 'hover:shadow-[0_0_35px_rgba(10,204,128,0.45)]'
  }
];

const CUMPLE_VIDEOS = [
  {
    id: 'cumple-adolescentes',
    title: 'Cumpleaños Teens & Jóvenes',
    category: 'Vibra Juvenil',
    badge: '🎉 CUMPLE JOVEN',
    videoUrl: 'https://wdirdbryxwtbnprbrkvh.supabase.co/storage/v1/object/public/The_Weeknd/CumpleAdolescentes.webm',
    accentColor: '#0acc80'
  },
  {
    id: 'cumple-adoles2',
    title: 'Fiesta & Velas con Amigos',
    category: 'Celebración en Mancha',
    badge: '🎂 MOMENTO TARTA',
    videoUrl: 'https://wdirdbryxwtbnprbrkvh.supabase.co/storage/v1/object/public/The_Weeknd/CumpleAdoles2.webm',
    accentColor: '#c900ff'
  },
  {
    id: 'cumple-adulta',
    title: 'Noche de Cumple & Brindis',
    category: 'Fiesta & Cócteles',
    badge: '🥂 BRINDIS NOCTURNO',
    videoUrl: 'https://wdirdbryxwtbnprbrkvh.supabase.co/storage/v1/object/public/The_Weeknd/CumpleAdulta.webm',
    accentColor: '#ffa40b'
  },
  {
    id: 'cumple-chica',
    title: 'Cumpleaños Girls Party',
    category: 'Salida de Chicas VIP',
    badge: '👑 CUMPLEAÑERA VIP',
    videoUrl: 'https://wdirdbryxwtbnprbrkvh.supabase.co/storage/v1/object/public/The_Weeknd/CumpleChica.webm',
    accentColor: '#ff007f'
  },
  {
    id: 'cumple-familiar',
    title: 'Cumpleaños Familiar & Todas las Edades',
    category: 'Reencuentro Familiar',
    badge: '❤️ TODAS LAS EDADES',
    videoUrl: 'https://wdirdbryxwtbnprbrkvh.supabase.co/storage/v1/object/public/The_Weeknd/cumpleAnciano.webm',
    accentColor: '#00f2fe'
  }
];

interface VideoCardProps {
  video: typeof CUMPLE_VIDEOS[number];
  onOpenModal: (video: typeof CUMPLE_VIDEOS[number]) => void;
}

const VideoCard: React.FC<VideoCardProps> = ({ video, onOpenModal }) => {
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
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className="group relative rounded-3xl overflow-hidden bg-zinc-950 border border-white/15 shadow-2xl flex flex-col justify-between aspect-[9/16] min-w-[240px] sm:min-w-[260px] md:min-w-0 cursor-pointer"
      onClick={() => onOpenModal(video)}
    >
      {/* Video Background */}
      <video
        ref={videoRef}
        src={video.videoUrl}
        playsInline
        muted={isMuted}
        loop
        autoPlay
        preload="metadata"
        className="absolute inset-0 w-full h-full object-cover brightness-95 group-hover:brightness-105 group-hover:scale-105 transition-all duration-700"
      />

      {/* Dynamic Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/60 pointer-events-none" />

      {/* Top Bar: Badge and Action Buttons */}
      <div className="relative z-10 p-4 flex items-center justify-between gap-2">
        <span 
          className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider backdrop-blur-md shadow-md"
          style={{ 
            backgroundColor: `${video.accentColor}25`, 
            color: video.accentColor,
            border: `1px solid ${video.accentColor}50` 
          }}
        >
          {video.badge}
        </span>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={toggleMute}
            className="p-2 rounded-full bg-black/60 hover:bg-black/90 text-white backdrop-blur-md transition-all active:scale-90"
            title={isMuted ? "Activar audio" : "Silenciar"}
            aria-label={isMuted ? "Activar audio" : "Silenciar"}
          >
            {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} className="text-[#0acc80]" />}
          </button>
          
          <button
            type="button"
            onClick={togglePlay}
            className="p-2 rounded-full bg-black/60 hover:bg-black/90 text-white backdrop-blur-md transition-all active:scale-90"
            title={isPlaying ? "Pausar" : "Reproducir"}
            aria-label={isPlaying ? "Pausar" : "Reproducir"}
          >
            {isPlaying ? <Pause size={14} /> : <Play size={14} className="fill-current text-weekend-neon" />}
          </button>
        </div>
      </div>

      {/* Center Play Pulse Hint on Hover */}
      <div className="relative z-10 flex-1 flex items-center justify-center pointer-events-none">
        <div className="w-12 h-12 rounded-full bg-black/50 backdrop-blur-md border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300">
          <Maximize2 size={18} className="text-white" />
        </div>
      </div>

      {/* Bottom Info */}
      <div className="relative z-10 p-4 pt-2">
        <span className="text-[11px] font-bold text-white/70 uppercase tracking-wider block">
          {video.category}
        </span>
        <h4 
          className="text-sm sm:text-base font-black uppercase text-white leading-tight mt-0.5"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          {video.title}
        </h4>
        <div className="mt-3 flex items-center gap-2 text-[10px] font-bold text-[#0acc80]">
          <span>Ver celebración completa</span>
          <ArrowRight size={12} />
        </div>
      </div>
    </motion.div>
  );
};

export function MomentosSection({ onOpenReserva, onOpenSocial }: MomentosSectionProps) {
  const [selectedVideo, setSelectedVideo] = useState<typeof CUMPLE_VIDEOS[number] | null>(null);

  return (
    <section id="momentos" className="relative py-20 sm:py-24 bg-[#08080c] text-[#f5f5f5] overflow-hidden border-t border-b border-white/10">
      {/* Ambient Lights */}
      <div className="absolute inset-0 pointer-events-none opacity-25">
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
            Cumpleaños, aniversarios, reencuentros o simplemente una noche de fiesta con tu gente favorita. En Weekend cada mesa es una celebración.
          </p>
        </div>

        {/* ==================================================== */}
        {/* 1. BENEFICIOS DESTACADOS (CUMPLEAÑOS, PATAS, POLAROID) */}
        {/* ==================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
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

                  <p className="text-xs text-zinc-300 leading-relaxed font-medium">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                  <span className="text-[11px] font-extrabold uppercase text-white flex items-center gap-1">
                    Incluido en Reservas
                  </span>
                  <div 
                    className="w-8 h-8 rounded-full flex items-center justify-center shadow-md"
                    style={{ backgroundColor: `${item.color}30`, color: item.color }}
                  >
                    <IconComp className="w-4 h-4" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ==================================================== */}
        {/* 2. SECCIÓN REELS DE CUMPLEAÑOS EN WEEKEND            */}
        {/* ==================================================== */}
        <div className="bg-zinc-950/90 border border-zinc-800 rounded-[32px] p-6 sm:p-8 lg:p-10 relative overflow-hidden mb-16 shadow-2xl">
          {/* Header of Video Reels */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#c900ff]/15 border border-[#c900ff]/40 text-[#c900ff] text-xs font-black uppercase tracking-widest mb-2">
                <span>🎂</span>
                <span>MOMENTOS DE CUMPLEAÑOS</span>
              </div>
              <h3 
                className="text-2xl sm:text-4xl font-black uppercase text-white tracking-tight"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                ¡Así se Festeja en <span className="text-transparent bg-clip-text bg-gradient-to-r from-weekend-neon via-[#ffa40b] to-[#c900ff]">Weekend!</span>
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 mt-1 max-w-xl">
                Mira cómo celebran en nuestras mesas: música, bengalas, rondas de shots, fotos instantáneas y los 5 obsequios de cumpleaños.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={onOpenSocial}
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 px-4 py-2.5 rounded-full transition-all cursor-pointer"
              >
                <span>Ver Más Videos</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Videos Grid / Responsive Reel Slider */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 overflow-x-auto pb-4 pt-1 snap-x snap-mandatory">
            {CUMPLE_VIDEOS.map((video) => (
              <div key={video.id} className="snap-center">
                <VideoCard video={video} onOpenModal={setSelectedVideo} />
              </div>
            ))}
          </div>

          {/* Direct CTA & WhatsApp Booking Bar */}
          <div className="mt-10 pt-8 border-t border-zinc-800/80 flex flex-col lg:flex-row items-center justify-between gap-6 bg-gradient-to-r from-[#c900ff]/10 via-black to-[#0acc80]/10 p-6 rounded-2xl border border-white/10">
            <div className="space-y-1 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 text-xs font-bold text-[#0acc80] uppercase tracking-wider">
                <Phone className="w-3.5 h-3.5" />
                <span>Atención &amp; Reservas Inmediatas: <strong>+51 961 336 674</strong></span>
              </div>
              <h4 
                className="text-base sm:text-lg font-black uppercase text-white"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                ¿Quieres celebrar tu cumpleaños o noche de amigos con nosotros?
              </h4>
              <p className="text-xs text-zinc-400">
                Reserva previamente para asegurar tu mesa decorada y reclamar tus 5 obsequios o tu ronda de shots.
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
                <span>Llenar Formulario</span>
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* Fullscreen Video Modal with Sound */}
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
              className="relative w-full max-w-sm sm:max-w-md bg-zinc-950 rounded-[32px] overflow-hidden border border-white/20 shadow-[0_0_50px_rgba(201,0,255,0.5)] flex flex-col"
            >
              {/* Modal Header */}
              <div className="p-4 bg-zinc-900/90 border-b border-white/10 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#0acc80]">
                    {selectedVideo.badge}
                  </span>
                  <h3 className="text-sm font-black uppercase text-white">{selectedVideo.title}</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedVideo(null)}
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
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
                />
              </div>

              {/* Modal Footer CTA */}
              <div className="p-4 bg-zinc-900/90 border-t border-white/10 flex items-center justify-between gap-3">
                <span className="text-xs text-zinc-300 font-bold">¡Haz de tu cumple una fiesta igual!</span>
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

