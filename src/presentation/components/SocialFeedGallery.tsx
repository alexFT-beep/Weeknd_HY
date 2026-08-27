import React from 'react';
import { motion } from 'framer-motion';
import {
  Instagram, Facebook, MessageCircle,
  ExternalLink, Sparkles, Flame, CheckCircle2
} from 'lucide-react';

interface SocialGalleryViewProps {
  onOpenReserva?: () => void;
  onOpenMenu?: () => void;
  onBackToHome?: () => void;
}

// Icono personalizado de TikTok
const TikTokIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
  </svg>
);

const SOCIAL_CHANNELS = [
  {
    id: 'tiktok',
    name: 'TikTok',
    handle: '@weekendhuarmey',
    url: 'https://www.tiktok.com/@weekendhuarmey',
    color: '#00f2fe',
    accentColor: '#fe0979',
    bgColor: 'from-[#00f2fe]/20 via-black to-[#fe0979]/20',
    borderColor: 'border-[#00f2fe]/40 hover:border-[#00f2fe]',
    icon: TikTokIcon,
    tag: 'VIDEOS VIRALES & SHOWS',
    badge: 'MÁS POPULAR 🔥',
    stats: 'Videos virales, música y el mejor ambiente en vivo',
    btnText: 'ABRIR ↗'
  },
  {
    id: 'instagram',
    name: 'Instagram',
    handle: '@weekend_huarmey',
    url: 'https://www.instagram.com/weekend_huarmey/',
    color: '#c900ff',
    accentColor: '#ffa40b',
    bgColor: 'from-[#c900ff]/20 via-black to-[#ffa40b]/20',
    borderColor: 'border-[#c900ff]/40 hover:border-[#c900ff]',
    icon: Instagram,
    tag: 'FOTOS, REELS & HISTORIAS',
    badge: 'REELS DIARIOS 📸',
    stats: 'Historias del día, promociones relámpago y fotos VIP',
    btnText: 'ABRIR ↗'
  },
  {
    id: 'facebook',
    name: 'Facebook',
    handle: 'Weekend Huarmey Oficial',
    url: 'https://www.facebook.com/p/Weekend-Huarmey-100075916407028/',
    color: '#1877F2',
    accentColor: '#0acc80',
    bgColor: 'from-[#1877F2]/20 via-black to-[#0acc80]/20',
    borderColor: 'border-[#1877F2]/40 hover:border-[#1877F2]',
    icon: Facebook,
    tag: 'EVENTOS & COMUNIDAD',
    badge: 'COMUNIDAD ACTIVA 👥',
    stats: 'Cartelera de shows, transmisión de eventos y opiniones',
    btnText: 'ABRIR ↗'
  },
  {
    id: 'whatsapp',
    name: 'WhatsApp Directo',
    handle: '+51 961 336 674',
    url: 'https://wa.me/51961336674?text=' + encodeURIComponent('¡Hola Weekend! Deseo consultar sobre eventos, promociones y reservas.'),
    color: '#0acc80',
    accentColor: '#ffa40b',
    bgColor: 'from-[#0acc80]/20 via-black to-[#ffa40b]/20',
    borderColor: 'border-[#0acc80]/40 hover:border-[#0acc80]',
    icon: MessageCircle,
    tag: 'ATENCIÓN & RESERVAS',
    badge: 'RESPUESTA RÁPIDA ⚡',
    stats: 'Atención personalizada, reservas de mesa y delivery',
    btnText: 'ABRIR ↗'
  }
];

export function SocialGalleryView({ onOpenReserva, onOpenMenu, onBackToHome }: SocialGalleryViewProps) {
  return (
    <div className="min-h-screen bg-[#050508] text-[#fcfcfc] flex flex-col relative overflow-x-hidden">

      {/* Background Volcanic Multi-Color Neon Mesh */}
      <div className="fixed top-0 left-1/4 w-[600px] h-[500px] bg-[#0acc80]/20 rounded-full blur-[120px] pointer-events-none -z-10 animate-pulse" />
      <div className="fixed top-1/3 right-10 w-[550px] h-[550px] bg-[#c900ff]/25 rounded-full blur-[130px] pointer-events-none -z-10" />
      <div className="fixed bottom-10 left-1/3 w-[600px] h-[450px] bg-[#ffa40b]/20 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="fixed bottom-0 right-1/4 w-[450px] h-[450px] bg-[#00f2fe]/20 rounded-full blur-[120px] pointer-events-none -z-10" />

      {/* Official Background Graphic (capiparado.webp) - Visible exclusively on Mobile & Tablet (< 1024px) */}
      <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden block lg:hidden">
        <img
          src="https://wdirdbryxwtbnprbrkvh.supabase.co/storage/v1/object/public/The_Weeknd/capiparado.webp"
          alt="Capibara Fondo Redes"
          loading="eager"
          decoding="sync"
          className="w-full h-full object-cover object-center filter brightness-110 saturate-125 contrast-105 opacity-85"
        />
        {/* Subtle Contrast Overlay for text legibility on mobile/tablet */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/20 to-black/60 pointer-events-none" />
      </div>

      {/* Main Content Wrap */}
      <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-6 pb-20 flex-grow relative z-[10]">

        {/* HEADER SECTION */}
        <header className="text-center mb-14 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center justify-center gap-3 px-5 py-2 rounded-full bg-gradient-to-r from-[#0acc80]/25 via-[#ffa40b]/25 to-[#c900ff]/25 border border-[#0acc80]/50 text-xs font-black tracking-[0.25em] text-[#0acc80] uppercase shadow-[0_0_25px_rgba(10,204,128,0.35)]"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>COMUNIDAD &amp; REDES OFICIALES</span>
            <Flame className="w-4 h-4 text-amber-400" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white uppercase"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            ¡SÍGUENOS EN <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0acc80] via-[#ffa40b] via-[#fe0979] to-[#00f2fe]" style={{ textShadow: '0 0 45px rgba(10,204,128,0.45)' }}>REDES OFICIALES!</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-zinc-300 max-w-2xl mx-auto text-sm sm:text-base font-medium tracking-wide leading-relaxed"
          >
            Toca cualquiera de nuestras redes para ir directo al contenido oficial: videos virales, fotos de platos, cartelera de shows y reservas al instante.
          </motion.p>
        </header>

        {/* SOCIAL CHANNELS GRID (VIBRANT & COLORFUL CARDS) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {SOCIAL_CHANNELS.map((channel, index) => (
            <motion.a
              key={channel.id}
              href={channel.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.025, y: -4 }}
              whileTap={{ scale: 0.97 }}
              className={`p-6 sm:p-8 rounded-[32px] bg-gradient-to-br ${channel.bgColor} border ${channel.borderColor} transition-all duration-300 shadow-2xl relative overflow-hidden group flex flex-col justify-between cursor-pointer`}
            >
              {/* Dynamic Glow Corner Accent */}
              <div
                className="absolute top-0 right-0 w-36 h-36 rounded-full blur-2xl opacity-20 pointer-events-none transition-opacity duration-300 group-hover:opacity-40"
                style={{ backgroundColor: channel.color }}
              />

              <div>
                {/* Header of the Card */}
                <div className="flex items-center justify-between gap-3 mb-6 relative z-10">
                  <span
                    className="px-3.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider backdrop-blur-md shadow-md"
                    style={{
                      backgroundColor: `${channel.color}25`,
                      color: channel.color,
                      border: `1px solid ${channel.color}50`
                    }}
                  >
                    {channel.badge}
                  </span>

                  <div className="p-3.5 rounded-2xl bg-black/60 backdrop-blur-md border border-white/15 text-white group-hover:scale-110 transition-transform shadow-lg">
                    <channel.icon className="w-6 h-6" style={{ color: channel.color }} />
                  </div>
                </div>

                {/* Handle & Title */}
                <div className="relative z-10 space-y-1">
                  <span className="text-xs font-bold uppercase tracking-widest text-zinc-400">
                    {channel.tag}
                  </span>
                  <h3
                    className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight group-hover:text-white transition-colors"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    {channel.name}
                  </h3>
                  <p className="text-sm sm:text-base font-bold text-zinc-200" style={{ color: channel.color }}>
                    {channel.handle}
                  </p>
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-zinc-300 font-medium leading-relaxed mt-3 mb-6 relative z-10">
                  {channel.stats}
                </p>
              </div>

              {/* Action Button */}
              <div className="relative z-10 pt-4 border-t border-white/10 flex items-center justify-between">
                <span className="text-xs font-bold text-zinc-300 flex items-center gap-1.5">
                  <CheckCircle2 size={15} style={{ color: channel.color }} />
                  <span>Canal Verificado</span>
                </span>

                <div
                  className="px-5 py-2.5 rounded-full font-black uppercase text-xs tracking-wider flex items-center gap-1.5 transition-all shadow-lg group-hover:shadow-[0_0_25px_rgba(201,0,255,0.4)]"
                  style={{
                    backgroundColor: channel.color,
                    color: '#000000'
                  }}
                >
                  <span>{channel.btnText}</span>
                  <ExternalLink size={14} />
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        {/* BOTTOM QUICK ACTIONS BANNER */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 p-8 sm:p-10 rounded-[36px] bg-gradient-to-r from-[#c900ff]/20 via-black to-[#0acc80]/20 border border-white/20 shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left"
        >
          <div className="space-y-2 max-w-xl">
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#0acc80]">
              <Sparkles size={14} />
              <span>Experiencia Weekend Huarmey</span>
            </span>
            <h3
              className="text-2xl sm:text-3xl font-black uppercase text-white tracking-tight"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              ¿Listo para visitarnos hoy?
            </h3>
            <p className="text-xs sm:text-sm text-zinc-300">
              Disfruta de nuestros tragos de autor, piqueos criollos, makis y la mejor música en vivo de la ciudad.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            {onOpenMenu && (
              <button
                type="button"
                onClick={onOpenMenu}
                className="px-6 py-3.5 rounded-full bg-[#0acc80] text-black font-black uppercase tracking-wider text-xs hover:bg-white transition-all shadow-[0_0_25px_rgba(10,204,128,0.4)] active:scale-95 cursor-pointer"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                Ver Carta Digital
              </button>
            )}

            {onOpenReserva && (
              <button
                type="button"
                onClick={onOpenReserva}
                className="px-6 py-3.5 rounded-full bg-zinc-900 border border-[#c900ff]/60 text-white font-black uppercase tracking-wider text-xs hover:bg-[#c900ff] hover:text-white transition-all shadow-[0_0_20px_rgba(201,0,255,0.3)] active:scale-95 cursor-pointer"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                Reservar Mesa
              </button>
            )}
          </div>
        </motion.div>

      </div>

      {/* FOOTER */}
      <footer className="border-t border-white/10 py-10 bg-[#040406] text-center text-xs text-zinc-400 relative z-10">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-medium tracking-wide">
            &copy; {new Date().getFullYear()} WEEKEND Huarmey &bull; Av. Cabo 140, Huarmey 02651
          </p>
          <p className="tracking-wider">
            Web &amp; Carta virtual hecha por{' '}
            <a
              href="https://www.instagram.com/mywebsitee/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-[#B026FF] hover:text-white transition-all underline decoration-[#B026FF]/50 hover:decoration-white drop-shadow-[0_0_10px_rgba(176,38,255,0.75)] cursor-pointer"
            >
              @MyWebsite
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}

export { SocialGalleryView as SocialCommunityGallery };
export default SocialGalleryView;

