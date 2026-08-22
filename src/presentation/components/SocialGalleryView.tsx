// @ts-nocheck
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ChevronLeft, Sparkles, Flame, ArrowUpRight, 
  Share2, Check, ExternalLink, MessageCircle
} from 'lucide-react';

interface SocialChannel {
  id: string;
  name: string;
  handle: string;
  description: string;
  url: string;
  color: string;
  borderColor: string;
  glowColor: string;
  bgGradient: string;
  badge: string;
  badgeBg: string;
  stats: string;
  icon: React.ReactNode;
}

const SOCIAL_CHANNELS: SocialChannel[] = [
  {
    id: 'tiktok',
    name: 'TikTok',
    handle: '@weekendhuarmey',
    description: 'Videos exclusivos, humor con el equipo, platos en acción y las mejores tendencias.',
    url: 'https://www.tiktok.com/@weekendhuarmey',
    color: '#00f2fe',
    borderColor: 'border-[#00f2fe]/40 hover:border-[#fe0979]',
    glowColor: 'group-hover:shadow-[0_0_45px_rgba(254,9,121,0.35)]',
    bgGradient: 'from-[#08080c] via-[#0d1117] to-[#160b18]',
    badge: '🎵 TRENDS & VIDEOS',
    badgeBg: 'bg-gradient-to-r from-[#00f2fe]/20 to-[#fe0979]/20 text-cyan-300 border-[#00f2fe]/30',
    stats: 'Videos Virales • Novedades Semanales',
    icon: (
      <svg className="w-14 h-14 sm:w-16 sm:h-16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.06 3.43-.3 6.83-1.62 10.12-1.14 2.81-3.38 5.08-6.23 5.87-2.04.56-4.2.42-6.17-.36-2.53-.99-4.51-3.18-5.19-5.77-.58-2.18-.44-4.52.35-6.65.95-2.58 3.11-4.61 5.73-5.28 1.15-.29 2.35-.39 3.53-.28V10.7c-.49-.17-1.02-.2-1.53-.13-.76.11-1.49.54-1.91 1.17-.45.68-.5 1.55-.3 2.32.25.86.96 1.53 1.82 1.73.66.16 1.38.07 1.98-.26.59-.34 1.01-.92 1.14-1.58.1-.47.12-.95.12-1.43V0z" />
      </svg>
    )
  },
  {
    id: 'instagram',
    name: 'Instagram',
    handle: '@weekend_huarmey',
    description: 'Historias diarias, fotografías en alta definición de nuestras especialidades y noches de fiesta.',
    url: 'https://www.instagram.com/weekend_huarmey/',
    color: '#E1306C',
    borderColor: 'border-[#E1306C]/40 hover:border-amber-400',
    glowColor: 'group-hover:shadow-[0_0_45px_rgba(225,48,108,0.35)]',
    bgGradient: 'from-[#0d0914] via-[#150a1b] to-[#1c0d18]',
    badge: '📸 FOTOS & REELS',
    badgeBg: 'bg-gradient-to-r from-[#833ab4]/20 via-[#fd1d1d]/20 to-[#fcb045]/20 text-rose-300 border-[#E1306C]/30',
    stats: 'Comunidad Oficial • Eventos en Vivo',
    icon: (
      <svg className="w-14 h-14 sm:w-16 sm:h-16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
      </svg>
    )
  },
  {
    id: 'facebook',
    name: 'Facebook',
    handle: 'Weekend Huarmey',
    description: 'Cartelera de shows en vivo, dinámicas de fines de semana, promociones y atención a la comunidad.',
    url: 'https://www.facebook.com/p/Weekend-Huarmey-100075916407028/',
    color: '#1877F2',
    borderColor: 'border-[#1877F2]/40 hover:border-cyan-400',
    glowColor: 'group-hover:shadow-[0_0_45px_rgba(24,119,242,0.35)]',
    bgGradient: 'from-[#070b14] via-[#091122] to-[#0c162c]',
    badge: '👥 PÁGINA OFICIAL',
    badgeBg: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
    stats: 'Cartelera Semanal • Opiniones & Fotos',
    icon: (
      <svg className="w-14 h-14 sm:w-16 sm:h-16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    )
  },
  {
    id: 'whatsapp',
    name: 'WhatsApp',
    handle: '+51 961 336 674',
    description: 'Atención personalizada directa, pedidos para delivery a domicilio y reservación de mesas.',
    url: 'https://wa.me/51961336674?text=Hola%2C%20vengo%20desde%20la%20web%20y%20deseo%20m%C3%A1s%20informaci%C3%B3n!',
    color: '#25D366',
    borderColor: 'border-[#25D366]/40 hover:border-emerald-300',
    glowColor: 'group-hover:shadow-[0_0_45px_rgba(37,211,102,0.35)]',
    bgGradient: 'from-[#06120b] via-[#091a0f] to-[#0c2214]',
    badge: '💬 ATENCIÓN DIRECTA',
    badgeBg: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    stats: 'Delivery Rápido • Reservas Inmediatas',
    icon: (
      <svg className="w-14 h-14 sm:w-16 sm:h-16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
      </svg>
    )
  }
];

interface SocialGalleryViewProps {
  onBackToHome?: () => void;
  onOpenMenu?: () => void;
}

export function SocialGalleryView({ onBackToHome, onOpenMenu }: SocialGalleryViewProps) {
  const [copiedLink, setCopiedLink] = useState<string | null>(null);

  const handleShare = (e: React.MouseEvent, channel: SocialChannel) => {
    e.stopPropagation();
    if (navigator.share) {
      navigator.share({
        title: `Weekend Huarmey en ${channel.name}`,
        text: `¡Sigue a Weekend Huarmey en ${channel.name}!`,
        url: channel.url
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(channel.url);
      setCopiedLink(channel.id);
      setTimeout(() => setCopiedLink(null), 2500);
    }
  };

  return (
    <div className="min-h-screen bg-[#08080a] text-[#fcfcfc] font-['Montserrat',sans-serif] flex flex-col relative overflow-x-hidden">
      
      {/* Background Volcanic and Neon Atmosphere Glows */}
      <div className="fixed top-0 left-1/3 -translate-x-1/2 w-[700px] h-[500px] bg-gradient-to-b from-[#0acc80]/15 via-purple-900/10 to-transparent blur-3xl pointer-events-none -z-10" />
      <div className="fixed bottom-10 right-10 w-[500px] h-[500px] bg-rose-600/10 blur-3xl pointer-events-none -z-10" />

      {/* Main Content Wrap */}
      <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-8 pb-16 flex-grow relative z-10">
        
        {/* Top Navigation Bar */}
        <div className="flex items-center justify-between mb-10 relative z-20">
          <button 
            type="button"
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold text-white transition-all hover:scale-105 active:scale-95 cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4 text-[#0acc80]" />
            <span>Volver al Inicio</span>
          </button>

          <div className="flex items-center gap-3">
            <button 
              type="button"
              onClick={onOpenMenu}
              className="px-5 py-2 rounded-full bg-[#0acc80] text-black font-extrabold text-xs uppercase tracking-wider hover:bg-white transition-all shadow-[0_0_20px_rgba(10,204,128,0.4)] active:scale-95 cursor-pointer"
            >
              📋 Ver Carta Digital
            </button>
          </div>
        </div>

        {/* HEADER SECTION */}
        <header className="text-center mb-12 space-y-4">
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center justify-center gap-3 px-5 py-2 rounded-full bg-gradient-to-r from-[#0acc80]/20 via-amber-500/20 to-purple-500/20 border border-[#0acc80]/40 text-xs font-black tracking-[0.25em] text-[#0acc80] uppercase shadow-[0_0_20px_rgba(10,204,128,0.3)] animate-pulse"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>CONÉCTATE CON NOSOTROS</span>
            <Flame className="w-4 h-4 text-amber-400" />
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white uppercase"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            ¡SÍGUENOS EN <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0acc80] via-amber-300 to-[#fe0979]" style={{ textShadow: '0 0 45px rgba(10,204,128,0.45)' }}>REDES OFICIALES!</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-zinc-300 max-w-2xl mx-auto text-sm sm:text-base font-medium tracking-wide leading-relaxed"
          >
            Toca cualquiera de nuestras redes para ir directo al contenido oficial: videos virales, fotos de comanda, cartelera de shows y reservas al instante.
          </motion.p>
        </header>

        {/* SOCIAL CHANNELS GRID (LOGOS EN GRANDE & ANIMADOS) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {SOCIAL_CHANNELS.map((channel, index) => (
            <motion.a
              key={channel.id}
              href={channel.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.03, y: -6 }}
              whileTap={{ scale: 0.98 }}
              className={`group relative rounded-3xl p-6 sm:p-8 bg-gradient-to-br ${channel.bgGradient} border ${channel.borderColor} shadow-2xl transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer ${channel.glowColor}`}
            >
              {/* Background ambient watermarking logo */}
              <div className="absolute -right-6 -bottom-6 opacity-10 group-hover:opacity-20 group-hover:scale-110 transition-all duration-500 pointer-events-none text-white">
                {channel.icon}
              </div>

              <div>
                {/* Top Bar inside Card */}
                <div className="flex items-center justify-between gap-3 mb-6 relative z-10">
                  <span className={`px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider border ${channel.badgeBg}`}>
                    {channel.badge}
                  </span>

                  <button
                    type="button"
                    onClick={(e) => handleShare(e, channel)}
                    className="p-2.5 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-white/80 hover:text-white transition-all shadow-md active:scale-90 cursor-pointer"
                    title="Compartir o Copiar enlace"
                    aria-label="Compartir enlace"
                  >
                    {copiedLink === channel.id ? (
                      <Check className="w-4 h-4 text-[#0acc80]" />
                    ) : (
                      <Share2 className="w-4 h-4" />
                    )}
                  </button>
                </div>

                {/* Main Logo & Identity */}
                <div className="flex items-center gap-5 mb-5 relative z-10">
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 shadow-inner group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 text-white">
                    {channel.icon}
                  </div>
                  <div>
                    <h2 
                      className="text-2xl sm:text-3xl font-black uppercase text-white tracking-tight flex items-center gap-2 group-hover:text-[#0acc80] transition-colors"
                      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                      {channel.name}
                    </h2>
                    <p className="text-sm font-bold text-zinc-400 mt-0.5 group-hover:text-white transition-colors">
                      {channel.handle}
                    </p>
                  </div>
                </div>

                {/* Description */}
                <p className="text-zinc-300 text-xs sm:text-sm font-normal leading-relaxed mb-6 relative z-10">
                  {channel.description}
                </p>
              </div>

              {/* Action Button & Sub-stats */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-4 relative z-10">
                <span className="text-[11px] font-bold text-zinc-400">
                  {channel.stats}
                </span>

                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 group-hover:bg-[#0acc80] group-hover:text-black text-white text-xs font-black uppercase tracking-wider transition-all duration-300 shadow-md">
                  <span>Abrir</span>
                  <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </span>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Direct Contact Banner */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-amber-500/10 via-purple-500/10 to-[#0acc80]/10 border border-white/10 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left"
        >
          <div className="space-y-1">
            <h3 className="text-lg sm:text-xl font-black uppercase text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Contacto directo
            </h3>
          </div>
          <a
            href="https://wa.me/51961336674?text=Hola%2C%20deseo%20hacer%20una%20reserva%20o%20pedido%20en%20Weekend!"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-[#0acc80] text-black font-black uppercase tracking-widest text-xs hover:bg-white transition-all shadow-[0_0_25px_rgba(10,204,128,0.4)] active:scale-95 flex-shrink-0 cursor-pointer"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            <MessageCircle className="w-4 h-4" />
            <span>Chatear por WhatsApp</span>
          </a>
        </motion.div>
      </div>

      {/* FOOTER SECTION */}
      <footer className="relative border-t border-white/10 bg-[#040406] text-white font-sans w-full py-10">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <span className="text-base font-black uppercase tracking-wider text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              WEEKND! <span className="text-[#0acc80]">Huarmey</span>
            </span>
          </div>
          <p className="text-zinc-500 text-xs uppercase tracking-widest">
            &copy; 2026 THE WEEKEND RESTOBAR &amp; LOUNGE. HUARMEY - ANCASH.
          </p>
        </div>
      </footer>
    </div>
  );
}
