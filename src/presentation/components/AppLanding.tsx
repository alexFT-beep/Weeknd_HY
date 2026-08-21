// @ts-nocheck
import React, { useState, useEffect, useRef } from 'react';
import {
  Menu, X, Instagram, Facebook, Phone, MapPin, Clock, CreditCard, ChevronRight, Send, Smartphone, Calendar, ArrowLeft, Search, ShoppingCart, Music2, Play, ArrowUpRight
} from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';

const CONTACT_WA = "51961336674";
const LOGO_URL = "https://res.cloudinary.com/dwlzez9mr/image/upload/f_auto,q_auto/v1774383788/LOGO_wgvqfj.webp";
const HERO_IMG = "https://res.cloudinary.com/dwlzez9mr/image/upload/f_auto,q_auto/v1774380039/logo2_vyasrd.webp";
const MENU_VID = "https://res.cloudinary.com/dwlzez9mr/video/upload/f_auto,q_auto/v1774380723/alitas2_upllif.webm";
const DELIVERY_IMG = "https://res.cloudinary.com/dwlzez9mr/image/upload/f_auto,q_auto/v1771715674/makis-weekend_fxfha7.jpg";
const RESERVA_IMG = "https://res.cloudinary.com/dwlzez9mr/image/upload/f_auto,q_auto/v1774381246/reserva_dxdyyt.webp";
const FOOTER_IMG = "https://res.cloudinary.com/dwlzez9mr/image/upload/f_auto,q_auto/v1774380038/piepag_lni8ko.webp";
const MOBILE_VID = "https://res.cloudinary.com/dwlzez9mr/video/upload/f_auto,q_auto/v1774380798/hambur2_lhdl97.webm";

// --- Assets locales de capibaras (animación scroll-driven) ---
// Orden vertical estricto: Superior (heroic) -> Central (kamehameha) -> Inferior (superhero)
import CAPY_HEROIC from '../../assets/capybaras/heroic_capybara_mascot_VECTOR.png';
import CAPY_KAME from '../../assets/capybaras/capybara_kamehameha_pose_VECTOR.png';
import CAPY_HERO from '../../assets/capybaras/superhero_capibara_landing_VECTOR.png';

const NAV_LINKS = [
  { name: 'Inicio', href: '#inicio' },
  { name: 'Carta', href: '#carta-digital' },
  { name: 'Reserva', href: '#reserva' },
  { name: 'Ubicación', href: '#ubicacion' },
  { name: 'Redes', href: '#redes' },
];

const TIME_SLOTS = [
  '05:00 PM', '05:30 PM', '06:00 PM', '06:30 PM', '07:00 PM', '07:30 PM',
  '08:00 PM', '08:30 PM', '09:00 PM', '09:30 PM', '10:00 PM', '10:30 PM',
  '11:00 PM', '11:30 PM', '12:00 AM', '12:30 AM', '01:00 AM', '01:30 AM',
  '02:00 AM', '02:30 AM', '03:00 AM'
];

// =========================================================
//  REDES SOCIALES — Datos reales (perfiles y publicaciones)
// =========================================================
const TIKTOK = {
  name: 'TikTok',
  handle: '@weekendhuarmey',
  profile: 'https://www.tiktok.com/@weekendhuarmey?_r=1',
  posts: [
    'https://vt.tiktok.com/ZSVySRqtW/',
    'https://vt.tiktok.com/ZSVySJ7A3/',
    'https://vt.tiktok.com/ZSVySfxPv/',
    'https://vt.tiktok.com/ZSVySAA4a/',
  ],
};

const INSTAGRAM = {
  name: 'Instagram',
  handle: '@weekend_huarmey',
  profile: 'https://www.instagram.com/weekend_huarmey/',
  posts: [
    'https://www.instagram.com/p/DcRuJRXFasq/',
    'https://www.instagram.com/reel/DcRtn0aTRHm/',
    'https://www.instagram.com/p/DcRrOtwlU_w/',
    'https://www.instagram.com/p/DcPU49ig26K/',
    'https://www.instagram.com/p/DcPTkUZgJ3m/',
  ],
};

const FACEBOOK = {
  name: 'Facebook',
  handle: 'Weekend Huarmey',
  profile: 'https://www.facebook.com/p/Weekend-Huarmey-100075916407028/?checkpoint_src=any',
  posts: [
    'https://www.facebook.com/share/p/19GHC6RSia/',
    'https://www.facebook.com/share/r/1EcBQH7uVN/',
    'https://www.facebook.com/share/p/1912zGDxwd/',
    'https://www.facebook.com/share/p/19NN2y8RBz/',
    'https://www.facebook.com/share/p/1Dum4UT4Jh/',
  ],
};

// --- Iconos oficiales de cada plataforma (SVG) ---
const TIKTOK_ICON = (cn = 'w-5 h-5') => (
  <svg viewBox="0 0 24 24" className={cn} fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43V8.69a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.84-.12z"/></svg>
);
const INSTAGRAM_ICON = (cn = 'w-5 h-5') => (
  <svg viewBox="0 0 24 24" className={cn} fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
);
const FACEBOOK_ICON = (cn = 'w-5 h-5') => (
  <svg viewBox="0 0 24 24" className={cn} fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
);

const PLATFORMS = [
  { data: TIKTOK,   badge: 'linear-gradient(135deg,#25F4EE 0%,#000 45%,#FE2C55 100%)', solid: '#000000', accent: '#FE2C55', icon: TIKTOK_ICON, hover: 'hover:border-[#FE2C55]/60', cta: 'Ver perfil' },
  { data: INSTAGRAM, badge: 'linear-gradient(135deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)', solid: '#dc2743', accent: '#dc2743', icon: INSTAGRAM_ICON, hover: 'hover:border-[#dc2743]/50', cta: 'Ver perfil' },
  { data: FACEBOOK, badge: '#1877f2', solid: '#1877f2', accent: '#1877f2', icon: FACEBOOK_ICON, hover: 'hover:border-[#1877f2]/55', cta: 'Ver página' },
];

// =========================================================
//  HOOK: Drag-scroll (arrastrar para navegar el carrusel)
// =========================================================
function useDragScroll() {
  const ref = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const onMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    startX.current = e.pageX - (ref.current?.offsetLeft ?? 0);
    scrollLeft.current = ref.current?.scrollLeft ?? 0;
    if (ref.current) ref.current.style.cursor = 'grabbing';
  };
  const stop = () => {
    isDragging.current = false;
    if (ref.current) ref.current.style.cursor = 'grab';
  };
  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !ref.current) return;
    e.preventDefault();
    const x = e.pageX - ref.current.offsetLeft;
    ref.current.scrollLeft = scrollLeft.current - (x - startX.current) * 1.2;
  };
  const onTouchStart = (e: React.TouchEvent) => {
    startX.current = e.touches[0].pageX - (ref.current?.offsetLeft ?? 0);
    scrollLeft.current = ref.current?.scrollLeft ?? 0;
  };
  const onTouchMove = (e: React.TouchEvent) => {
    if (!ref.current) return;
    const x = e.touches[0].pageX - ref.current.offsetLeft;
    ref.current.scrollLeft = scrollLeft.current - (x - startX.current) * 1.2;
  };

  return { ref, onMouseDown, onMouseUp: stop, onMouseLeave: stop, onMouseMove, onTouchStart, onTouchMove };
}

// =========================================================
//  COMPONENTE: Banda de capibara con parallax scroll-driven
// =========================================================
function CapybaraBand({
  src, alt, align = 'center',
}: { src: string; alt: string; align?: 'left' | 'right' | 'center' }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [70, -70]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.88, 1.06, 0.96]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.85, 1], [0, 1, 1, 0.35]);

  const alignmentClasses = 
    align === 'left' 
      ? 'items-start justify-start md:pl-12 lg:pl-24' 
      : align === 'right' 
      ? 'items-end justify-end md:pr-12 lg:pr-24' 
      : 'items-center justify-center';

  return (
    <div ref={ref} className="relative min-h-[50vh] flex items-center overflow-hidden py-10">
      {/* halo de fondo */}
      <div className="absolute inset-0 pointer-events-none">
        <div className={`absolute top-1/2 ${align === 'left' ? 'left-1/4' : align === 'right' ? 'left-3/4' : 'left-1/2'} -translate-x-1/2 -translate-y-1/2 w-[26rem] h-[26rem] rounded-full border border-weekend-neon/10 pulse-glow`} />
        <div className={`absolute top-1/2 ${align === 'left' ? 'left-1/4' : align === 'right' ? 'left-3/4' : 'left-1/2'} -translate-x-1/2 -translate-y-1/2 w-[18rem] h-[18rem] rounded-full border border-weekend-neon/5`} />
      </div>
      <div className={`relative z-10 max-w-6xl mx-auto px-4 w-full flex flex-col ${alignmentClasses}`}>
        <motion.div style={{ y, scale, opacity }} className="relative flex-shrink-0 w-full max-w-xs md:max-w-sm lg:max-w-md">
          <div className="absolute -inset-6 rounded-[32px] bg-weekend-neon/10 blur-3xl pulse-glow" />
          <img
            src={src} alt={alt} loading="lazy"
            className="relative w-full drop-shadow-[0_0_45px_rgba(10,204,128,0.35)] float-anim"
          />
        </motion.div>
      </div>
    </div>
  );
}

function SocialEmbedCard({ platform, url, index }: { platform: typeof PLATFORMS[number]; url: string; index: number }) {
  const { data, badge, icon, hover, accent } = platform;

  useEffect(() => {
    // Process embeds on mount
    if (data.name === 'Instagram' && typeof (window as any).instgrm?.Embeds?.process === 'function') {
      (window as any).instgrm.Embeds.process();
    }
    if (data.name === 'Facebook' && typeof (window as any).FB?.XFBML?.parse === 'function') {
      (window as any).FB.XFBML.parse();
    }
  }, [url, data.name]);

  if (data.name === 'TikTok') {
    return (
      <div className="flex-shrink-0 w-[300px] sm:w-[325px] bg-[#0d0d0d] border border-white/10 rounded-[28px] overflow-hidden flex flex-col items-center justify-center p-2 shadow-2xl transition-transform hover:-translate-y-1 duration-300">
        <blockquote
          className="tiktok-embed"
          cite={url}
          data-video-id={url.split('/').filter(Boolean).pop()}
          style={{ maxWidth: '100%', minWidth: '280px', margin: 0, borderRadius: '20px' }}
        >
          <section>
            <a target="_blank" title={`@${data.handle}`} href={url} className="text-xs text-white/50 p-4 block text-center">
              🎵 Ver video de TikTok @{data.handle}
            </a>
          </section>
        </blockquote>
      </div>
    );
  }

  if (data.name === 'Instagram') {
    return (
      <div className="flex-shrink-0 w-[300px] sm:w-[330px] bg-black border border-white/10 rounded-[28px] overflow-hidden flex flex-col items-center justify-center p-1.5 shadow-2xl transition-transform hover:-translate-y-1 duration-300">
        <blockquote
          className="instagram-media"
          data-instgrm-permalink={url}
          data-instgrm-version="14"
          data-instgrm-captioned="false"
          style={{
            background: '#000000',
            border: 0,
            borderRadius: '24px',
            margin: '0px',
            maxWidth: '100%',
            minWidth: '280px',
            padding: 0,
            width: '100%',
          }}
        >
          <div style={{ padding: '12px', background: '#000000' }}>
            <a
              href={url}
              style={{ background: '#000000', color: '#0acc80', lineHeight: 1.5, padding: '10px 0', textAlign: 'center', textDecoration: 'none', width: '100%', display: 'block', fontSize: '12px', fontWeight: 'bold' }}
              target="_blank"
              rel="noopener noreferrer"
            >
              📸 Ver publicación en Instagram
            </a>
          </div>
        </blockquote>
      </div>
    );
  }

  if (data.name === 'Facebook') {
    const isVideo = url.includes('/r/') || url.includes('video');
    return (
      <div className="flex-shrink-0 w-[300px] sm:w-[330px] bg-[#0d0d0d] border border-white/10 rounded-[28px] overflow-hidden flex flex-col items-center justify-center p-3 shadow-2xl transition-transform hover:-translate-y-1 duration-300">
        <div
          className={isVideo ? "fb-video" : "fb-post"}
          data-href={url}
          data-width="310"
          data-show-text="true"
          style={{ width: '100%', overflow: 'hidden', minHeight: '380px' }}
        >
          <blockquote cite={url} className="fb-xfbml-parse-ignore">
            <a href={url} className="text-xs text-white/50 block p-4 text-center">
              🔵 Ver post en Facebook
            </a>
          </blockquote>
        </div>
      </div>
    );
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`group flex-shrink-0 w-60 bg-[#131313] border border-white/10 rounded-[28px] overflow-hidden ${hover} hover:-translate-y-1 transition-all duration-300 flex flex-col`}
    >
      <div className="flex items-center gap-2.5 px-3.5 py-3 border-b border-white/5">
        <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-white" style={{ background: badge }}>
          <span className="font-display font-bold text-[9px]">TW</span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-display text-[11px] font-bold text-white truncate">{data.handle}</div>
          <div className="text-[#888] text-[10px]">Publicación #{index + 1}</div>
        </div>
        <div className="w-5 h-5 flex-shrink-0 text-white/70" style={{ background: badge, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {icon('w-3 h-3')}
        </div>
      </div>
      <div className="relative w-full aspect-square overflow-hidden bg-[#1a1a1a] flex items-center justify-center rounded-[20px]">
        <div className="absolute inset-0 opacity-30" style={{ background: badge }} />
        <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-transparent to-black/60" />
        <div className="relative z-10 flex flex-col items-center gap-2.5 text-white/90">
          {icon('w-10 h-10')}
          <span className="font-display text-[10px] uppercase tracking-widest">Ver en {data.name}</span>
        </div>
        <div className="absolute top-2.5 right-2.5 z-20 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-sm text-[9px] font-display font-bold text-white border border-white/10">
          #{index + 1}
        </div>
      </div>
      <div className="px-3.5 py-3 flex items-center justify-between">
        <span className="text-[#888] text-[10px] font-display truncate">Abrir publicación</span>
        <span className="flex items-center gap-1 text-[11px] font-display font-bold" style={{ color: accent }}>
          Ver <ArrowUpRight size={13} />
        </span>
      </div>
    </a>
  );
}

// =========================================================
//  COMPONENTE: Feed de red social (carrusel drag-scroll)
// =========================================================
function SocialFeed({ platform }: { platform: typeof PLATFORMS[number] }) {
  const drag = useDragScroll();
  const { data, badge, icon, cta } = platform;

  useEffect(() => {
    // Trigger global SDK parses after mount
    setTimeout(() => {
      if (typeof (window as any).instgrm?.Embeds?.process === 'function') {
        (window as any).instgrm.Embeds.process();
      }
      if (typeof (window as any).FB?.XFBML?.parse === 'function') {
        (window as any).FB.XFBML.parse();
      }
    }, 500);
  }, []);

  return (
    <div className="mb-16">
      {/* Cabecera de plataforma */}
      <div className="flex items-center justify-between px-4 md:px-12 mb-5">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-[14px] flex items-center justify-center flex-shrink-0 text-white shadow-lg"
            style={{ background: badge }}
          >
            {icon('w-5 h-5')}
          </div>
          <div>
            <div className="font-display text-sm font-bold text-white leading-none">{data.name}</div>
            <div className="text-[#888] text-xs mt-0.5">{data.handle}</div>
          </div>
        </div>
        <a
          href={data.profile} target="_blank" rel="noopener noreferrer"
          className="text-weekend-neon font-display text-xs tracking-widest uppercase flex items-center gap-1.5 hover:opacity-70 transition-opacity"
        >
          {cta}
          <ArrowUpRight size={14} />
        </a>
      </div>

      {/* Carrusel drag-scroll */}
      <div
        ref={drag.ref}
        onMouseDown={drag.onMouseDown} onMouseUp={drag.onMouseUp} onMouseLeave={drag.onMouseLeave}
        onMouseMove={drag.onMouseMove} onTouchStart={drag.onTouchStart} onTouchMove={drag.onTouchMove}
        className="flex gap-5 overflow-x-auto no-carousel-scrollbar pb-4 px-4 md:px-12 select-none items-stretch"
        style={{ cursor: 'grab' }}
      >
        {data.posts.map((url, i) => (
          <SocialEmbedCard key={i} platform={platform} url={url} index={i} />
        ))}

        {/* Card CTA al perfil */}
        <a
          href={data.profile} target="_blank" rel="noopener noreferrer"
          className="flex-shrink-0 w-60 border border-dashed border-weekend-neon/30 rounded-[28px] flex flex-col items-center justify-center gap-3 p-6 hover:border-weekend-neon/70 hover:bg-weekend-neon/5 transition-all duration-300 min-h-[300px]"
        >
          <div className="w-12 h-12 rounded-[14px] flex items-center justify-center text-white" style={{ background: badge }}>
            {icon('w-6 h-6')}
          </div>
          <div className="text-center">
            <div className="font-display text-xs font-bold text-white mb-1">Ver más en {data.name}</div>
            <div className="text-weekend-neon text-[10px] tracking-widest">{data.handle} →</div>
          </div>
        </a>
      </div>
    </div>
  );
}

// =========================================================
//  COMPONENTE: Sección social completa (3 plataformas)
// =========================================================
function SocialSection() {
  return (
    <section id="redes" className="py-16 relative overflow-hidden border-t border-white/5">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#0acc80]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-[#0acc80]/8 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10">
        {/* Encabezado con Emojis y Color */}
        <div className="text-center mb-10 px-4 md:px-12">
          <p className="text-[#0acc80] text-xs tracking-[0.4em] uppercase font-display mb-3 flex items-center justify-center gap-2">
            <span>✨</span> <span>Nuestras Redes Oficiales</span> <span>🔥</span>
          </p>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-3 neon-flicker" style={{ textShadow: '0 0 40px rgba(10,204,128,0.3)' }}>
            📸 @weekend_huarmey 🎵
          </h2>
          <p className="text-zinc-400 font-body text-xs sm:text-sm max-w-md mx-auto">
            🍹 Vive la experiencia antes de llegar. Arrastra los videos y publicaciones en tiempo real 🎬✨
          </p>
        </div>

        {PLATFORMS.map((p) => <SocialFeed key={p.data.name} platform={p} />)}
      </div>
    </section>
  );
}

export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentView, setCurrentView] = useState<'landing' | 'dashboard'>('landing');

  const [form, setForm] = useState({
    nombre: '',
    fecha: '',
    hora: '05:00 PM',
    personas: '',
    motivo: ''
  });

  // --- Módulo intacto: VER CARTA DIGITAL (redirección a la carta) ---
  const goToDashboard = () => {
    setCurrentView('dashboard');
    window.location.hash = 'carta-digital';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goToLanding = () => {
    setCurrentView('landing');
    window.location.hash = 'inicio';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handleHash = () => {
      if (window.location.hash === '#carta-digital' || window.location.hash === '#menu-virtual' || window.location.hash === '#carta') {
        setCurrentView('dashboard');
      }
    };
    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  useEffect(() => {
    if (currentView === 'dashboard') {
      window.scrollTo({ top: 0, behavior: 'instant' });
      // Use a longer timeout and requestAnimationFrame to ensure the DOM nodes
      // #category-chips-nav and #menu-sections-container are fully mounted
      // before the Hexagonal Vanilla JS app tries to initialize them.
      setTimeout(() => {
        requestAnimationFrame(() => {
          if (typeof (window as any).initHexagonalApp === 'function') {
            (window as any).initHexagonalApp();
          }
        });
      }, 300);
    }
  }, [currentView]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Manejar tecla Escape para cerrar menú móvil
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    // Pausar animaciones cuando la página no está visible
    const handleVisibilityChange = () => {
      if (document.hidden) {
        // Pausar animaciones CSS
        document.body.classList.add('animations-paused');
      } else {
        // Reanudar animaciones CSS
        document.body.classList.remove('animations-paused');
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [isOpen]);

  const handleReserve = (e: React.FormEvent) => {
    e.preventDefault();
    const { nombre, fecha, hora, personas, motivo } = form;
    const message = `Hola The Weekend! Deseo una reserva: Nombre: ${nombre}, Fecha: ${fecha}, Hora: ${hora}, Personas: ${personas}, Motivo: ${motivo}`;
    window.open(`https://wa.me/${CONTACT_WA}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleDelivery = () => {
    const message = "Hola! Deseo hacer un pedido de delivery.";
    window.open(`https://wa.me/${CONTACT_WA}?text=${encodeURIComponent(message)}`, '_blank');
  };

  // ----------------------------------------------------
  // DASHBOARD VIEW (Dedicada a la Carta Digital)
  // ----------------------------------------------------
  if (currentView === 'dashboard') {
    return (
      <div className="min-h-screen bg-black text-white font-sans selection:bg-weekend-neon selection:text-black">
        {/* Main Menu Container */}
        <main className="pt-3 pb-24 max-w-7xl mx-auto px-3 sm:px-4">

          {/* Sleek Minimalist Top Navigation Row */}
          <div className="flex items-center justify-between gap-3 mb-3 py-2 border-b border-white/10">
            <button
              type="button"
              onClick={goToLanding}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-zinc-900/90 hover:bg-zinc-800 text-weekend-neon border border-weekend-neon/40 rounded-xl text-xs font-bold uppercase tracking-wider transition-all active:scale-95 shadow-sm"
              title="Volver a la portada principal"
            >
              <ArrowLeft size={16} />
              <span>Inicio</span>
            </button>

            <div className="flex items-center gap-2">
              <img
                src={LOGO_URL}
                alt="Logo Weekend"
                className="h-7 w-7 rounded-full object-cover border border-weekend-neon"
              />
              <span className="text-white font-black tracking-tight text-xs sm:text-sm uppercase">
                Carta <span className="text-weekend-neon">Weekend</span>
              </span>
            </div>

            <button
              type="button"
              data-action="open-search"
              className="text-weekend-neon hover:opacity-80 transition-opacity active:scale-95 p-1.5 flex items-center justify-center rounded-xl bg-zinc-900 border border-white/10 hover:border-weekend-neon shadow-sm"
              title="Buscar en la carta"
              aria-label="Buscar en la carta"
            >
              <span className="material-symbols-outlined text-[20px]">search</span>
            </button>
          </div>

          {/* Sticky Category Chips Navigation Bar (Directly at top-0) */}
          <div className="overflow-x-auto no-scrollbar sticky top-0 z-30 bg-black/95 backdrop-blur-md border-b border-white/10 py-2.5 mb-5 -mx-3 px-3 sm:-mx-4 sm:px-4">
            <div id="category-chips-nav" className="flex space-x-2 w-max">
              {/* Injected dynamically by MenuController */}
            </div>
          </div>

          {/* Dynamic Menu Sections Container */}
          <div id="menu-sections-container">
            {/* Injected dynamically by MenuController */}
          </div>
        </main>

        {/* Dashboard Footer */}
        <footer className="border-t border-white/10 py-8 bg-black text-center text-xs text-white/50">
          <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p>&copy; {new Date().getFullYear()} The Weekend Lounge & Restaurant - Huarmey.</p>
            <button
              type="button"
              onClick={goToLanding}
              className="text-weekend-neon hover:underline font-bold uppercase tracking-wider"
            >
              Volver a la Página Principal
            </button>
          </div>
        </footer>
      </div>
    );
  }

  // ----------------------------------------------------
  // LANDING PAGE VIEW (Página Principal)
  // ----------------------------------------------------
  // Ref para parallax del capibara heroico (superior)
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress: heroProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroCapyY = useTransform(heroProgress, [0, 1], [0, 140]);
  const heroCapyRotate = useTransform(heroProgress, [0, 1], [0, 12]);
  const heroCapyOpacity = useTransform(heroProgress, [0, 0.8], [1, 0]);

  const handleNavClick = (e: React.MouseEvent, link: typeof NAV_LINKS[number]) => {
    // Módulo VER CARTA DIGITAL: redirección intacta
    if (link.name === 'Carta') {
      e.preventDefault();
      goToDashboard();
      setIsOpen(false);
      return;
    }
    if (link.name === 'Redes') {
      e.preventDefault();
      document.getElementById('redes')?.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
      return;
    }
    setIsOpen(false);
  };

  // Manejo de teclado para el menú móvil
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  return (
    <div className="min-h-screen font-sans selection:bg-weekend-neon selection:text-black">
      {/* ============ HEADER ============ */}
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled ? 'bg-black/90 backdrop-blur-md py-2 border-b border-white/10' : 'bg-transparent py-4'
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-[1fr_auto_1fr] items-center gap-3">
          {/* Branding a la izquierda */}
          <div className="flex items-center gap-3 justify-self-start">
            <img
              src={LOGO_URL} alt="Logo"
              className="h-9 w-9 rounded-full object-cover border border-weekend-neon/60"
              referrerPolicy="no-referrer"
            />
            <a href="/" className="text-white font-bold tracking-tighter text-base xl:block hidden uppercase hover:text-weekend-neon transition-colors duration-500" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              The Weekend! <span className="text-weekend-neon">Huarmey</span>
            </a>
          </div>

          {/* Navegación centrada */}
          <nav className="hidden lg:flex items-center gap-7 justify-self-center">
            {NAV_LINKS.map((link) => (
              <motion.a
                key={link.name} href={link.href}
                onClick={(e) => handleNavClick(e, link)}
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.94 }}
                className="text-sm uppercase tracking-widest font-bold hover:text-weekend-neon transition-all duration-500"
              >
                {link.name}
              </motion.a>
            ))}
          </nav>

          {/* CTA + acciones a la derecha */}
          <div className="flex items-center gap-2 sm:gap-3 justify-self-end">
            <button
              type="button"
              data-action="open-cart"
              className="relative text-black font-bold bg-weekend-neon hover:bg-weekend-purple hover:text-white transition-all active:scale-95 duration-150 px-3 py-2 rounded-full flex items-center gap-1.5 text-xs uppercase"
              title="Ver Carrito"
              aria-label="Ver Carrito"
            >
              <ShoppingCart size={16} />
              <span className="hidden sm:inline">Carrito</span>
              <span className="header-cart-badge min-w-[18px] h-[18px] px-1 bg-black text-weekend-neon font-extrabold text-[10px] rounded-full flex items-center justify-center hidden">0</span>
            </button>

            {/* CTA principal compacto */}
            <button
              type="button"
              onClick={goToDashboard}
              className="hidden sm:inline-flex items-center gap-2 bg-weekend-neon text-black font-extrabold uppercase tracking-widest text-xs px-5 py-2.5 rounded-full hover:bg-white transition-all duration-300 active:scale-95 shadow-[0_0_20px_rgba(10,204,128,0.4)]"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              aria-label="Ver menú virtual"
            >
              Ver Menú
            </button>

            <button
              className={`lg:hidden p-2 transition-colors duration-500 z-50 ${isOpen ? 'text-weekend-neon' : 'text-white'}`}
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Menú"
            >
              <motion.div animate={isOpen ? { rotate: 90 } : { rotate: 0 }} transition={{ duration: 0.3 }}>
                {isOpen ? <X size={28} /> : <Menu size={28} />}
              </motion.div>
            </button>
          </div>
        </div>
      </header>

      {/* Menú móvil (overlay) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-40 bg-black flex flex-col items-center justify-center gap-6 landscape:gap-4 md:hidden overflow-y-auto"
          >
            <div className="absolute inset-0 z-0 bg-gradient-to-b from-weekend-neon/5 via-black to-black" />
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-72 h-72 rounded-full bg-weekend-neon/5 blur-3xl pulse-glow pointer-events-none" />

            <div className="relative z-10 flex flex-col items-center gap-6 landscape:gap-3 py-10">
              {NAV_LINKS.map((link) => (
                <motion.a
                  key={link.name} href={link.href}
                  whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                  onClick={(e) => handleNavClick(e, link)}
                  className="text-xl landscape:text-lg uppercase tracking-widest font-bold hover:text-weekend-neon transition-colors duration-500"
                >
                  {link.name}
                </motion.a>
              ))}
              <button
                onClick={goToDashboard}
                className="mt-4 px-8 py-3 bg-weekend-neon text-black font-extrabold uppercase tracking-widest rounded-full text-sm text-center"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                Ver Menú Virtual
              </button>
            </div>

            <div className="absolute bottom-8 landscape:hidden left-0 w-full text-center z-10">
              <p className="text-weekend-neon text-xs font-bold uppercase tracking-[0.3em] mb-1">the weekend!</p>
              <p className="text-white/70 text-[10px] font-bold uppercase tracking-[0.4em]">- huarmey -</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ============ HERO COMPACTO (sin banners pesados) ============ */}
      <section id="inicio" ref={heroRef} className="relative min-h-[86vh] flex items-center justify-center overflow-hidden pt-28 pb-16">
        {/* Fondo minimalista neón — sin imágenes/banners pesados */}
        <div className="absolute inset-0 z-0 bg-black">
          <div className="absolute inset-0 bg-gradient-to-b from-weekend-neon/[0.06] via-black to-black" />
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[42rem] h-[42rem] rounded-full bg-weekend-neon/[0.06] blur-3xl pulse-glow pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[26rem] h-[26rem] rounded-full border border-weekend-neon/10 pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[18rem] h-[18rem] rounded-full border border-weekend-neon/[0.07] pointer-events-none" />
        </div>

        {/* Capibara heroica — posición superior, parallax scroll-driven */}
        <motion.div
          style={{ y: heroCapyY, rotate: heroCapyRotate, opacity: heroCapyOpacity }}
          className="absolute right-0 lg:right-6 top-1/2 -translate-y-1/2 z-[5] pointer-events-none hidden md:block w-56 lg:w-80"
        >
          <div className="absolute -inset-4 rounded-full bg-weekend-neon/15 blur-3xl pulse-glow" />
          <img src={CAPY_HEROIC} alt="Capibara heroica mascota" className="relative w-full drop-shadow-[0_0_50px_rgba(10,204,128,0.4)] float-anim" />
        </motion.div>

        <div className="relative z-10 max-w-3xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h2 className="text-weekend-neon font-bold tracking-[0.3em] uppercase text-xs md:text-sm mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Restobar &amp; Lounge - Huarmey
            </h2>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl md:text-7xl font-black uppercase tracking-tight text-white mb-5"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Donde la noche <span className="text-weekend-neon">cobra vida</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
            className="text-base md:text-lg text-white/70 mb-10 max-w-xl mx-auto font-medium"
          >
            Tu fin de semana empieza aquí. Sofisticado y casual a la vez: la noche fina que se deja llevar.
          </motion.p>

          {/* CTA ÚNICO central y destacado */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.4 }}
            className="flex justify-center"
          >
            <button
              onClick={goToDashboard}
              className="group inline-flex items-center gap-3 px-8 md:px-10 py-4 md:py-5 bg-weekend-neon text-black font-extrabold uppercase tracking-widest rounded-full hover:bg-white transition-all duration-300 shadow-[0_0_30px_rgba(10,204,128,0.5)] active:scale-95 text-sm md:text-base text-center"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Ver menú virtual - Reservas &amp; Delivery
              <ChevronRight className="group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </div>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronRight className="rotate-90 text-weekend-neon" size={28} />
        </div>
      </section>

      {/* ============ RESERVA + CAPIBARAS FLANQUEANDO (sin espacios, integrados) ============ */}
      <section id="reserva" className="relative py-12 bg-black overflow-hidden border-t border-white/5">
        <div className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-weekend-neon/30 to-transparent scan-line pointer-events-none" />

        <div className="relative z-10 max-w-6xl mx-auto px-4">
          <div className="relative flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-8">
            {/* Capibara Izquierda (Kamehameha) */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative w-48 sm:w-64 lg:w-72 flex-shrink-0 -mb-8 lg:mb-0 z-20 pointer-events-none"
            >
              <div className="absolute -inset-4 rounded-full bg-weekend-neon/15 blur-2xl pulse-glow" />
              <img
                src={CAPY_KAME}
                alt="Capibara pose kamehameha"
                className="relative w-full drop-shadow-[0_0_35px_rgba(10,204,128,0.35)] float-anim"
              />
            </motion.div>

            {/* Módulo de Reserva en el Centro */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="w-full max-w-xl bg-zinc-900/80 backdrop-blur-xl p-6 sm:p-8 rounded-[32px] border border-white/10 neon-glow-purple shadow-2xl relative z-10"
            >
              <div className="text-center mb-6">
                <h2 className="text-weekend-neon text-xs font-bold tracking-[0.3em] uppercase mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Planifica tu noche</h2>
                <h3 className="text-2xl sm:text-4xl font-black uppercase mb-2 leading-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Reserva tu <span className="text-weekend-neon">Mesa</span></h3>
                <p className="text-white/50 text-xs sm:text-sm">Reserva con anticipación y déjanos encargarnos del resto.</p>
              </div>

              <form onSubmit={handleReserve} className="space-y-4 text-xs">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Nombre</label>
                    <input type="text" required placeholder="Tu nombre" className="w-full bg-black/60 border border-white/10 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-weekend-neon transition-colors text-white" value={form.nombre} onChange={(e) => setForm({ ...form, nombre: e.target.value })} />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Fecha</label>
                    <input type="date" required className="w-full bg-black/60 border border-white/10 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-weekend-neon transition-colors text-white" value={form.fecha} onChange={(e) => setForm({ ...form, fecha: e.target.value })} />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Personas</label>
                    <input type="number" required placeholder="Cantidad" className="w-full bg-black/60 border border-white/10 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-weekend-neon transition-colors text-white" value={form.personas} onChange={(e) => setForm({ ...form, personas: e.target.value })} />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Hora de llegada</label>
                    <select className="w-full bg-black/60 border border-white/10 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-weekend-neon transition-colors appearance-none cursor-pointer text-white" value={form.hora} onChange={(e) => setForm({ ...form, hora: e.target.value })}>
                      {TIME_SLOTS.map((t) => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Motivo</label>
                  <select className="w-full bg-black/60 border border-white/10 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-weekend-neon transition-colors appearance-none cursor-pointer text-white" value={form.motivo} onChange={(e) => setForm({ ...form, motivo: e.target.value })}>
                    <option value="">Seleccionar</option>
                    <option value="Cena Casual">Cena Casual</option>
                    <option value="Cumpleaños">Cumpleaños</option>
                    <option value="Aniversario">Aniversario</option>
                    <option value="Evento Corporativo">Evento Corporativo</option>
                    <option value="Otro">Otro</option>
                  </select>
                </div>

                {/* Políticas del servicio */}
                <div className="rounded-2xl border border-white/10 bg-black/50 p-3.5 space-y-1.5">
                  <p className="text-weekend-neon text-[10px] font-bold uppercase tracking-[0.2em]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Políticas del servicio</p>
                  <p className="text-white/50 text-[11px] leading-relaxed flex items-start gap-1.5">
                    <span className="text-weekend-neon mt-0.5">•</span>
                    <span><span className="text-white/80 font-semibold">Tolerancia:</span> 10 a 15 min; luego la mesa queda disponible.</span>
                  </p>
                  <p className="text-white/50 text-[11px] leading-relaxed flex items-start gap-1.5">
                    <span className="text-weekend-neon mt-0.5">•</span>
                    <span><span className="text-white/80 font-semibold">Restricción:</span> No se permite el ingreso de alimentos o bebidas externos.</span>
                  </p>
                </div>

                <button type="submit" className="w-full py-3.5 bg-weekend-neon text-black font-black uppercase tracking-[0.2em] rounded-xl hover:bg-white transition-all flex items-center justify-center gap-2 active:scale-95 text-xs">
                  Reservar por WhatsApp <Send size={16} />
                </button>
              </form>
            </motion.div>

            {/* Capibara Derecha (Superhéroe) */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative w-48 sm:w-64 lg:w-72 flex-shrink-0 -mt-8 lg:mt-0 z-20 pointer-events-none"
            >
              <div className="absolute -inset-4 rounded-full bg-weekend-neon/15 blur-2xl pulse-glow" />
              <img
                src={CAPY_HERO}
                alt="Capibara superhéroe aterrizando"
                className="relative w-full drop-shadow-[0_0_35px_rgba(10,204,128,0.35)] float-anim"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============ UBICACIÓN ============ */}
      <section id="ubicacion" className="py-20 bg-black">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-weekend-neon text-sm font-bold tracking-[0.3em] uppercase mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Encuéntranos</h2>
            <h3 className="text-3xl md:text-5xl font-black uppercase mb-5" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Ubicación</h3>
            <div className="flex items-center justify-center gap-2 text-white/60">
              <MapPin size={20} className="text-weekend-neon" />
              <p>Av. Cabo 140, Huarmey 02651</p>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="relative rounded-[32px] overflow-hidden border border-weekend-neon/30 neon-glow h-[420px]"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d245.6409801721048!2d-78.15328299958676!3d-10.068675181619353!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91aa17e1bee947c9%3A0xda6d1058bd817a98!2sWeekend%20Huarmey!5e0!3m2!1ses!2spe!4v1772137403381!5m2!1ses!2spe"
              className="w-full h-full border-0 dark-map" allowFullScreen title="Maps"
            />
          </motion.div>
        </div>
      </section>

      {/* ============ REDES SOCIALES (Feeds reales) ============ */}
      <SocialSection />

      {/* ============ FOOTER ============ */}
      <footer id="contacto" className="relative pt-16 pb-10 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={FOOTER_IMG} alt="Footer" className="w-full h-full object-cover opacity-70" referrerPolicy="no-referrer" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-black" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
            <div className="col-span-1 lg:col-span-1">
              <div className="flex items-center gap-3 mb-6">
                <img src={LOGO_URL} alt="Logo" className="h-10 w-10 rounded-full object-cover border border-weekend-neon" referrerPolicy="no-referrer" />
                <span className="text-white font-bold tracking-tighter text-lg uppercase" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>The Weekend! - huarmey</span>
              </div>
              <p className="text-white/50 text-sm leading-relaxed mb-6">
                El espacio donde la alta cocina se encuentra con el ritmo más sofisticado de la ciudad.
              </p>
              <div className="space-y-4">
                <p className="text-weekend-neon font-bold uppercase tracking-widest text-xs" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>¡Síguenos!</p>
                <div className="flex items-center gap-4">
                  <a href={TIKTOK.profile} target="_blank" rel="noopener noreferrer" className="p-3 bg-white/5 rounded-2xl hover:bg-weekend-neon hover:text-black transition-colors" aria-label="TikTok">
                    {TIKTOK_ICON('w-5 h-5')}
                  </a>
                  <a href={INSTAGRAM.profile} target="_blank" rel="noopener noreferrer" className="p-3 bg-white/5 rounded-2xl hover:bg-weekend-neon hover:text-black transition-colors" aria-label="Instagram">
                    <Instagram size={20} />
                  </a>
                  <a href={FACEBOOK.profile} target="_blank" rel="noopener noreferrer" className="p-3 bg-white/5 rounded-2xl hover:bg-weekend-neon hover:text-black transition-colors" aria-label="Facebook">
                    <Facebook size={20} />
                  </a>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-white font-bold uppercase tracking-widest text-sm mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Horario</h4>
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-white/50">
                  <Clock size={18} className="text-weekend-neon" />
                  <span className="text-sm">Diariamente: 5:00 PM - 3:00 AM</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-white font-bold uppercase tracking-widest text-sm mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Métodos de Pago</h4>
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-white/50">
                  <CreditCard size={18} className="text-weekend-neon" />
                  <span className="text-sm">Aceptamos todos los bancos y pagos digitales</span>
                </div>
                <div className="flex flex-wrap gap-3">
                  <span className="px-3 py-1 bg-white/5 rounded-full text-[10px] uppercase font-bold tracking-widest">Yape</span>
                  <span className="px-3 py-1 bg-white/5 rounded-full text-[10px] uppercase font-bold tracking-widest">Plin</span>
                  <span className="px-3 py-1 bg-white/5 rounded-full text-[10px] uppercase font-bold tracking-widest">Visa</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-white font-bold uppercase tracking-widest text-sm mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Contacto</h4>
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-white/50">
                  <Phone size={18} className="text-weekend-neon" />
                  <span className="text-sm">+51 961 336 674</span>
                </div>
                <div className="flex items-start gap-3 text-white/50">
                  <MapPin size={18} className="text-weekend-neon shrink-0" />
                  <span className="text-sm">Av. Cabo 140, Huarmey 02651</span>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-12 border-t border-white/10 text-center">
            <p className="text-white/30 text-xs uppercase tracking-[0.3em]">
              &copy; {new Date().getFullYear()} The Weekend Lounge &amp; Restaurant.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
