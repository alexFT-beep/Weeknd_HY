// @ts-nocheck
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Sparkles, Flame, ArrowUpRight, 
  Share2, Check, MessageCircle, Phone, Heart
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
    description: 'Videos exclusivos, humor con el equipo, platos en acción, reels de cumpleaños y las mejores tendencias.',
    url: 'https://www.tiktok.com/@weekendhuarmey',
    color: '#00f2fe',
    borderColor: 'border-[#00f2fe]/60 hover:border-[#fe0979]',
    glowColor: 'hover:shadow-[0_0_50px_rgba(254,9,121,0.5),0_0_25px_rgba(0,242,254,0.4)]',
    bgGradient: 'from-[#00f2fe]/20 via-[#13071f] to-[#fe0979]/25',
    badge: '🎵 TRENDS & VIDEOS',
    badgeBg: 'bg-gradient-to-r from-[#00f2fe]/30 to-[#fe0979]/30 text-cyan-200 border-[#00f2fe]/50',
    stats: 'Videos Virales • Novedades Semanales',
    icon: (
      <svg className="w-12 h-12 sm:w-16 sm:h-16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.06 3.43-.3 6.83-1.62 10.12-1.14 2.81-3.38 5.08-6.23 5.87-2.04.56-4.2.42-6.17-.36-2.53-.99-4.51-3.18-5.19-5.77-.58-2.18-.44-4.52.35-6.65.95-2.58 3.11-4.61 5.73-5.28 1.15-.29 2.35-.39 3.53-.28V10.7c-.49-.17-1.02-.2-1.53-.13-.76.11-1.49.54-1.91 1.17-.45.68-.5 1.55-.3 2.32.25.86.96 1.53 1.82 1.73.66.16 1.38.07 1.98-.26.59-.34 1.01-.92 1.14-1.58.1-.47.12-.95.12-1.43V0z" />
      </svg>
    )
  },
  {
    id: 'instagram',
    name: 'Instagram',
    handle: '@weekend_huarmey',
    description: 'Historias diarias, fotografías en alta definición de nuestras especialidades, comanda y noches de fiesta.',
    url: 'https://www.instagram.com/weekend_huarmey/',
    color: '#E1306C',
    borderColor: 'border-[#E1306C]/60 hover:border-amber-400',
    glowColor: 'hover:shadow-[0_0_50px_rgba(225,48,108,0.55),0_0_30px_rgba(252,176,69,0.4)]',
    bgGradient: 'from-[#833ab4]/30 via-[#fd1d1d]/20 to-[#fcb045]/25',
    badge: '📸 FOTOS & REELS VIP',
    badgeBg: 'bg-gradient-to-r from-[#833ab4]/30 via-[#fd1d1d]/30 to-[#fcb045]/30 text-rose-200 border-[#E1306C]/50',
    stats: 'Comunidad Oficial • Eventos en Vivo',
    icon: (
      <svg className="w-12 h-12 sm:w-16 sm:h-16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
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
    description: 'Cartelera de shows en vivo, dinámicas de fin de semana, promociones y atención a la comunidad huarmeyana.',
    url: 'https://www.facebook.com/p/Weekend-Huarmey-100075916407028/',
    color: '#1877F2',
    borderColor: 'border-[#1877F2]/60 hover:border-cyan-300',
    glowColor: 'hover:shadow-[0_0_50px_rgba(24,119,242,0.55),0_0_25px_rgba(0,212,255,0.4)]',
    bgGradient: 'from-[#1877f2]/30 via-[#071329] to-[#00d4ff]/25',
    badge: '👥 PÁGINA OFICIAL',
    badgeBg: 'bg-gradient-to-r from-blue-600/30 to-cyan-500/30 text-blue-200 border-blue-400/50',
    stats: 'Cartelera Semanal • Opiniones & Fotos',
    icon: (
      <svg className="w-12 h-12 sm:w-16 sm:h-16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    )
  },
  {
    id: 'whatsapp',
    name: 'WhatsApp',
    handle: '+51 961 336 674',
    description: 'Atención personalizada directa, pedidos para delivery a domicilio y reservación inmediata de mesas y cumpleaños.',
    url: 'https://wa.me/51961336674?text=Hola%2C%20vengo%20desde%20la%20web%20y%20deseo%20m%C3%A1s%20informaci%C3%B3n!',
    color: '#25D366',
    borderColor: 'border-[#25D366]/60 hover:border-emerald-300',
    glowColor: 'hover:shadow-[0_0_50px_rgba(37,211,102,0.55),0_0_25px_rgba(10,204,128,0.4)]',
    bgGradient: 'from-[#25D366]/30 via-[#062414] to-[#00e676]/25',
    badge: '💬 ATENCIÓN DIRECTA & DELIVERY',
    badgeBg: 'bg-gradient-to-r from-emerald-500/30 to-green-400/30 text-emerald-200 border-emerald-400/50',
    stats: 'Delivery Rápido • Reservas Inmediatas',
    icon: (
      <svg className="w-12 h-12 sm:w-16 sm:h-16" viewBox="0 0 24 24" fill="currentColor">
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
    <div className="min-h-screen bg-[#050508] text-[#fcfcfc] flex flex-col relative overflow-x-hidden">
      
      {/* Background Volcanic Multi-Color Neon Mesh */}
      <div className="fixed top-0 left-1/4 w-[600px] h-[500px] bg-[#0acc80]/20 rounded-full blur-[120px] pointer-events-none -z-10 animate-pulse" />
      <div className="fixed top-1/3 right-10 w-[550px] h-[550px] bg-[#c900ff]/25 rounded-full blur-[130px] pointer-events-none -z-10" />
      <div className="fixed bottom-10 left-1/3 w-[600px] h-[450px] bg-[#ffa40b]/20 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="fixed bottom-0 right-1/4 w-[450px] h-[450px] bg-[#00f2fe]/20 rounded-full blur-[120px] pointer-events-none -z-10" />

      {/* Main Content Wrap */}
      <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-6 pb-20 flex-grow relative z-10">
        
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
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.03, y: -6 }}
              whileTap={{ scale: 0.98 }}
              className={`group relative rounded-3xl p-6 sm:p-8 bg-gradient-to-br ${channel.bgGradient} border ${channel.borderColor} shadow-2xl transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer ${channel.glowColor}`}
            >
              {/* Background ambient watermarking logo */}
              <div className="absolute -right-6 -bottom-6 opacity-15 group-hover:opacity-30 group-hover:scale-110 transition-all duration-500 pointer-events-none text-white">
                {channel.icon}
              </div>

              <div>
                {/* Top Bar inside Card */}
                <div className="flex items-center justify-between gap-3 mb-6 relative z-10">
                  <span className={`px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider border shadow-md ${channel.badgeBg}`}>
                    {channel.badge}
                  </span>

                  <button
                    type="button"
                    onClick={(e) => handleShare(e, channel)}
                    className="p-2.5 rounded-full bg-black/40 hover:bg-black/80 border border-white/20 text-white/90 hover:text-white transition-all shadow-md active:scale-90 cursor-pointer"
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
                  <div className="p-4 rounded-2xl bg-black/40 border border-white/20 shadow-xl group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 text-white">
                    {channel.icon}
                  </div>
                  <div>
                    <h2 
                      className="text-2xl sm:text-3xl font-black uppercase text-white tracking-tight flex items-center gap-2 group-hover:text-white transition-colors"
                      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                      {channel.name}
                    </h2>
                    <p className="text-sm font-bold text-zinc-300 mt-0.5 group-hover:text-white transition-colors">
                      {channel.handle}
                    </p>
                  </div>
                </div>

                {/* Description */}
                <p className="text-zinc-200 text-xs sm:text-sm font-normal leading-relaxed mb-6 relative z-10">
                  {channel.description}
                </p>
              </div>

              {/* Action Button & Sub-stats */}
              <div className="pt-4 border-t border-white/15 flex items-center justify-between gap-4 relative z-10">
                <span className="text-[11px] font-bold text-zinc-300">
                  {channel.stats}
                </span>

                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/20 group-hover:bg-white group-hover:text-black text-white text-xs font-black uppercase tracking-wider transition-all duration-300 shadow-md">
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
          className="mt-14 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#0acc80]/20 via-[#c900ff]/20 to-[#ffa40b]/20 border border-white/20 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left"
        >
          <div className="space-y-1">
            <div className="flex items-center justify-center sm:justify-start gap-2 text-xs font-black uppercase tracking-widest text-[#0acc80]">
              <Phone className="w-4 h-4" />
              <span>Contacto Directo: +51 961 336 674</span>
            </div>
            <h3 className="text-lg sm:text-xl font-black uppercase text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              ¿Dudas, Pedidos o Reservas?
            </h3>
            <p className="text-xs text-zinc-300">
              Escríbenos directamente y nuestro equipo te atenderá al instante.
            </p>
          </div>
          <a
            href="https://wa.me/51961336674?text=Hola%20Weekend!%20Deseo%20hacer%20una%20reserva%20o%20pedido."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-[#0acc80] text-black font-black uppercase tracking-widest text-xs hover:bg-white transition-all shadow-[0_0_25px_rgba(10,204,128,0.5)] active:scale-95 flex-shrink-0 cursor-pointer"
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
              WEEKEND <span className="text-[#0acc80]">Huarmey</span>
            </span>
          </div>
          <p className="text-zinc-500 text-xs uppercase tracking-widest">
            &copy; {new Date().getFullYear()} THE WEEKEND RESTOBAR &amp; LOUNGE. HUARMEY - ANCASH.
          </p>
        </div>
        <div className="max-w-6xl mx-auto px-4 text-center mt-6 pt-4 border-t border-white/5">
          <p className="text-[11px] sm:text-xs text-white/50 tracking-wider">
            Página web &amp; Carta virtual hecha por{' '}
            <a
              href="https://www.instagram.com/mywebsite_____?igsi=MWVpbGNpMWJsdzJkbw=="
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-[#0acc80] hover:text-[#C900FF] transition-colors underline decoration-[#0acc80]/40 hover:decoration-[#C900FF] cursor-pointer"
            >
              @MyWebsite
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}

