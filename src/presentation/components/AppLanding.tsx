import React, { useState, useEffect, useRef, useCallback, Suspense, lazy } from 'react';
import {
  Menu, X, Instagram, Facebook, Phone, MapPin, Clock, CreditCard, ChevronRight, Send, Smartphone, ArrowLeft, ShoppingCart, Search
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { DigitalMenuView } from './DigitalMenuView';

// Code Splitting & Dynamic Imports as per Vercel React Best Practices
const SocialGalleryView = lazy(() => import('./SocialGalleryView').then(m => ({ default: m.SocialGalleryView })));
const MenuSearchModal = lazy(() => import('./MenuSearchModal').then(m => ({ default: m.MenuSearchModal })));
const NosotrosSection = lazy(() => import('./NosotrosSection').then(m => ({ default: m.NosotrosSection })));
const MomentosSection = lazy(() => import('./MomentosSection').then(m => ({ default: m.MomentosSection })));

const CONTACT_WA = "51961336674";
const LOGO_URL = "https://wdirdbryxwtbnprbrkvh.supabase.co/storage/v1/object/public/The_Weeknd/logo_weeknd.webp";
const FOOTER_IMG = "https://wdirdbryxwtbnprbrkvh.supabase.co/storage/v1/object/public/The_Weeknd/living.webp";

// --- Assets locales de capibaras ---
import CAPY_HEROIC from '../../assets/capybaras/heroic_capybara_mascot_VECTOR.png';
import CAPY_KAME from '../../assets/capybaras/capybara_kamehameha_pose_VECTOR.png';
import CAPY_HERO from '../../assets/capybaras/superhero_capibara_landing_VECTOR.png';

const NAV_LINKS = [
  { name: 'Inicio', href: '#', type: 'inicio' },
  { name: 'Nosotros', href: '#nosotros', type: 'nosotros' },
  { name: 'Momentos', href: '#momentos', type: 'momentos' },
  { name: 'Promociones', href: 'promociones.html', type: 'promociones' },
  { name: 'Carta', href: '#carta-digital', type: 'carta' },
  { name: 'Reserva', href: '#reserva', type: 'reserva' },
  { name: 'Ubicación', href: '#ubicacion', type: 'ubicacion' },
  { name: 'Redes', href: '#redes', type: 'redes' },
];

const MOBILE_NAV_LINKS = [
  { name: 'INICIO', href: '#', type: 'inicio' },
  { name: 'NOSOTROS', href: '#nosotros', type: 'nosotros', colorClass: 'text-[#FFA40B] hover:text-white' },
  { name: 'MOMENTOS', href: '#momentos', type: 'momentos', colorClass: 'text-[#0ACC80] hover:text-white' },
  { name: 'CARTA', href: '#carta-digital', type: 'carta', colorClass: 'text-[#C900FF] hover:text-white' },
  { name: 'RESERVA', href: '#reserva', type: 'reserva' },
  { name: 'DELIVERY', href: '#delivery', type: 'delivery', colorClass: 'text-[#0ACC80] hover:text-white' },
  { name: 'DESTACADOS', href: 'promociones.html', type: 'destacados' },
  { name: 'SÍGUENOS', href: '#redes', type: 'siguenos' },
];

const TIME_SLOTS = [
  '05:00 PM', '05:30 PM', '06:00 PM', '06:30 PM', '07:00 PM', '07:30 PM',
  '08:00 PM', '08:30 PM', '09:00 PM', '09:30 PM', '10:00 PM', '10:30 PM',
  '11:00 PM', '11:30 PM', '12:00 AM', '12:30 AM', '01:00 AM', '01:30 AM',
  '02:00 AM', '02:30 AM', '03:00 AM'
];

const TIKTOK_ICON = (cn = 'w-5 h-5') => (
  <svg viewBox="0 0 24 24" className={cn} fill="currentColor"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.06 3.43-.3 6.83-1.62 10.12-1.14 2.81-3.38 5.08-6.23 5.87-2.04.56-4.2.42-6.17-.36-2.53-.99-4.51-3.18-5.19-5.77-.58-2.18-.44-4.52.35-6.65.95-2.58 3.11-4.61 5.73-5.28 1.15-.29 2.35-.39 3.53-.28V10.7c-.49-.17-1.02-.2-1.53-.13-.76.11-1.49.54-1.91 1.17-.45.68-.5 1.55-.3 2.32.25.86.96 1.53 1.82 1.73.66.16 1.38.07 1.98-.26.59-.34 1.01-.92 1.14-1.58.1-.47.12-.95.12-1.43V0z"/></svg>
);

// Fallback Spinner for Suspense boundaries
const SectionLoadingFallback = () => (
  <div className="min-h-[60vh] flex items-center justify-center bg-black">
    <div className="w-8 h-8 rounded-full border-2 border-weekend-neon border-t-transparent animate-spin" />
  </div>
);

export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentView, setCurrentView] = useState<'landing' | 'dashboard' | 'social' | 'reserva' | 'nosotros' | 'momentos'>('landing');

  const [form, setForm] = useState({
    nombre: '',
    telefono: '',
    fecha: '',
    hora: '05:00 PM',
    personas: '',
    motivo: ''
  });

  const goToDashboard = useCallback(() => {
    setCurrentView('dashboard');
    window.location.hash = 'carta-digital';
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const goToLanding = useCallback(() => {
    setCurrentView('landing');
    if (window.location.hash) {
      window.history.pushState(null, '', window.location.pathname + window.location.search);
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const goToSocial = useCallback(() => {
    setCurrentView('social');
    window.location.hash = 'redes';
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const goToReservation = useCallback(() => {
    setCurrentView('reserva');
    window.location.hash = 'reserva';
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const goToNosotros = useCallback(() => {
    setCurrentView('nosotros');
    window.location.hash = 'nosotros';
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const goToMomentos = useCallback(() => {
    setCurrentView('momentos');
    window.location.hash = 'momentos';
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  useEffect(() => {
    (window as any).goToDashboard = goToDashboard;
    (window as any).goToLanding = goToLanding;
    (window as any).goToSocial = goToSocial;
    (window as any).goToReservation = goToReservation;
    (window as any).goToNosotros = goToNosotros;
    (window as any).goToMomentos = goToMomentos;
    (window as any).openMenuSearch = () => {
      goToDashboard();
      setIsSearchOpen(true);
    };
    (window as any).closeMenuSearch = () => setIsSearchOpen(false);

    const handleOpenSearchEvent = () => {
      goToDashboard();
      setIsSearchOpen(true);
    };

    const handleGlobalClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && target.closest('[data-action="open-search"]')) {
        e.preventDefault();
        e.stopPropagation();
        goToDashboard();
        setIsSearchOpen(true);
      }
    };

    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      const isInput = ['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as HTMLElement)?.tagName || '');
      if (!isInput && (e.key === '/' || ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k'))) {
        e.preventDefault();
        goToDashboard();
        setIsSearchOpen(true);
      }
    };

    window.addEventListener('menu:open-search', handleOpenSearchEvent);
    document.addEventListener('click', handleGlobalClick);
    window.addEventListener('keydown', handleGlobalKeyDown);

    const handleCustomNav = (e: any) => {
      const view = e.detail?.view;
      if (view === 'dashboard' || view === 'menu' || view === 'carta') {
        goToDashboard();
      } else if (view === 'landing' || view === 'home' || view === 'inicio') {
        goToLanding();
      } else if (view === 'social' || view === 'redes') {
        goToSocial();
      } else if (view === 'reserva' || view === 'reservas' || view === 'reservation') {
        goToReservation();
      } else if (view === 'nosotros' || view === 'quienes-somos') {
        goToNosotros();
      } else if (view === 'momentos' || view === 'celebraciones') {
        goToMomentos();
      }
    };

    window.addEventListener('app:navigate', handleCustomNav);
    window.addEventListener('navigate-view', handleCustomNav);

    const handleHash = () => {
      const hash = (window.location.hash || '').toLowerCase();
      const menuHashes = [
        '#carta-digital', '#menu-virtual', '#carta', '#menu',
        '#alitas', '#hamburguesas', '#broaster', '#salchipapas', '#parrillas',
        '#piqueos', '#a-la-carta', '#marina', '#pastas', '#ensaladas', '#makis',
        '#jugos', '#bubble-tea', '#refrescos', '#cocteles', '#cervezas', '#guarniciones'
      ];

      if (hash.startsWith('#nosotros') || hash.startsWith('#quienes-somos')) {
        setCurrentView('nosotros');
      } else if (hash.startsWith('#momentos') || hash.startsWith('#celebraciones')) {
        setCurrentView('momentos');
      } else if (hash.startsWith('#redes') || hash.startsWith('#social') || hash.startsWith('#gallery') || hash.startsWith('#videos')) {
        setCurrentView('social');
      } else if (hash.startsWith('#reserva') || hash.startsWith('#reservacion') || hash.startsWith('#book')) {
        setCurrentView('reserva');
      } else if (menuHashes.some(h => hash.startsWith(h))) {
        setCurrentView('dashboard');
      } else {
        if (window.location.hash) {
          window.history.replaceState(null, '', window.location.pathname + window.location.search);
        }
        setCurrentView('landing');
      }
    };
    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => {
      window.removeEventListener('menu:open-search', handleOpenSearchEvent);
      document.removeEventListener('click', handleGlobalClick);
      window.removeEventListener('keydown', handleGlobalKeyDown);
      window.removeEventListener('app:navigate', handleCustomNav);
      window.removeEventListener('navigate-view', handleCustomNav);
      window.removeEventListener('hashchange', handleHash);
    };
  }, [goToDashboard, goToLanding, goToMomentos, goToNosotros, goToReservation, goToSocial]);

  useEffect(() => {
    if (currentView === 'dashboard') {
      window.scrollTo({ top: 0, behavior: 'instant' });
      const runBoot = () => {
        if (typeof (window as any).initHexagonalApp === 'function') {
          (window as any).initHexagonalApp();
        }
      };
      runBoot();
      const t1 = setTimeout(runBoot, 50);
      const t2 = setTimeout(runBoot, 200);
      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
      };
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [currentView]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    const handleVisibilityChange = () => {
      if (document.hidden) {
        document.body.classList.add('animations-paused');
      } else {
        document.body.classList.remove('animations-paused');
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [isOpen]);

  const handleReserve = (e: React.FormEvent) => {
    e.preventDefault();
    const { nombre, telefono, fecha, hora, personas, motivo } = form;
    const message = `Hola Weekend! Deseo una reserva:\n👤 Nombre: ${nombre}\n📱 Teléfono: ${telefono || 'No especificado'}\n📅 Fecha: ${fecha}\n⏰ Hora: ${hora}\n👥 Personas: ${personas}\n🎉 Motivo: ${motivo || 'General'}`;
    window.open(`https://wa.me/${CONTACT_WA}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleNavClick = (e: React.MouseEvent, link: typeof NAV_LINKS[number] | typeof MOBILE_NAV_LINKS[number]) => {
    if (link.name === 'Carta' || link.name === 'CARTA') {
      e.preventDefault();
      goToDashboard();
      setIsOpen(false);
      return;
    }
    if (link.name === 'Nosotros' || link.name === 'NOSOTROS') {
      e.preventDefault();
      goToNosotros();
      setIsOpen(false);
      return;
    }
    if (link.name === 'Momentos' || link.name === 'MOMENTOS') {
      e.preventDefault();
      goToMomentos();
      setIsOpen(false);
      return;
    }
    if (link.name === 'Redes' || link.name === 'SÍGUENOS') {
      e.preventDefault();
      goToSocial();
      setIsOpen(false);
      return;
    }
    if (link.name === 'Reserva' || link.name === 'RESERVA') {
      e.preventDefault();
      goToReservation();
      setIsOpen(false);
      return;
    }
    if (link.name === 'DELIVERY' || link.name === 'DELIVERYS') {
      e.preventDefault();
      goToDashboard();
      setIsOpen(false);
      return;
    }
    if (link.name === 'Promociones' || link.name === 'DESTACADOS') {
      setIsOpen(false);
      window.location.href = 'promociones.html';
      return;
    }
    if (link.name === 'Inicio' || link.name === 'INICIO') {
      e.preventDefault();
      goToLanding();
      setIsOpen(false);
      return;
    }
    if (link.name === 'Ubicación' || link.name === 'UBICACIÓN') {
      setIsOpen(false);
      if (currentView !== 'landing') {
        goToLanding();
        setTimeout(() => {
          const el = document.getElementById('ubicacion');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      } else {
        const el = document.getElementById('ubicacion');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
      return;
    }
    setIsOpen(false);
  };

  return (
    <div className="min-h-screen font-sans selection:bg-[#C900FF] selection:text-white home-page bg-[#050505] text-[#F5F5F5] relative">
      
      {/* ========================================================================= */}
      {/* 1. BARRA DE NAVEGACIÓN UNIFICADA & PERSISTENTE EN TODAS LAS PESTAÑAS     */}
      {/* ========================================================================= */}
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled || currentView !== 'landing' 
            ? 'bg-black/95 backdrop-blur-md py-2.5 border-b border-white/10 shadow-2xl' 
            : 'bg-transparent py-3 sm:py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-3 sm:gap-4">
          
          {/* Logo y Branding */}
          <div 
            className="flex items-center gap-2.5 shrink-0 cursor-pointer group"
            onClick={(e) => { e.preventDefault(); goToLanding(); }}
          >
            <img
              src={LOGO_URL} 
              alt="Logo"
              width={36}
              height={36}
              fetchPriority="high"
              decoding="async"
              className="h-8 sm:h-9 w-8 sm:w-9 rounded-full object-cover border border-weekend-neon/70 group-hover:border-[#c900ff] transition-colors"
              referrerPolicy="no-referrer"
            />
            <span className="text-white font-black tracking-tight text-xs sm:text-sm uppercase whitespace-nowrap group-hover:text-[#c900ff] transition-colors font-display">
              WEEKEND <span className="text-weekend-neon">Huarmey</span>
            </span>
          </div>

          {/* Links de Navegación de Escritorio */}
          <nav className="hidden lg:flex items-center gap-4 xl:gap-6 justify-center">
            {NAV_LINKS.map((link) => {
              const isActive = (
                (currentView === 'landing' && link.type === 'inicio') ||
                (currentView === 'nosotros' && link.type === 'nosotros') ||
                (currentView === 'momentos' && link.type === 'momentos') ||
                (currentView === 'dashboard' && link.type === 'carta') ||
                (currentView === 'reserva' && link.type === 'reserva') ||
                (currentView === 'social' && link.type === 'redes')
              );

              return (
                <motion.a
                  key={link.name} 
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`text-xs xl:text-sm uppercase tracking-wider font-extrabold transition-all duration-200 cursor-pointer whitespace-nowrap ${
                    isActive 
                      ? 'text-[#0acc80] font-black drop-shadow-[0_0_10px_rgba(10,204,128,0.6)]' 
                      : 'text-zinc-200 hover:text-[#c900ff]'
                  }`}
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  {link.name}
                </motion.a>
              );
            })}
          </nav>

          {/* Acciones y Botones a la Derecha */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Botón Carrito */}
            <button
              type="button"
              data-action="open-cart"
              className="relative text-black font-extrabold bg-weekend-neon hover:bg-[#C900FF] hover:text-white active:bg-[#9011C5] active:text-white transition-all active:scale-95 duration-200 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-full flex items-center gap-1.5 text-xs uppercase shadow-sm hover:shadow-[0_0_20px_rgba(201,0,255,0.75)] cursor-pointer"
              title="Ver Carrito"
              aria-label="Ver Carrito"
            >
              <ShoppingCart size={15} />
              <span className="hidden sm:inline">Carrito</span>
              <span className="header-cart-badge min-w-[18px] h-[18px] px-1 bg-black text-weekend-neon font-extrabold text-[10px] rounded-full flex items-center justify-center hidden">0</span>
            </button>

            {/* CTA Ver Menú */}
            <button
              type="button"
              onClick={goToDashboard}
              className={`hidden sm:inline-flex items-center gap-2 font-extrabold uppercase tracking-widest text-xs px-4 py-2 sm:px-5 sm:py-2.5 rounded-full transition-all duration-300 active:scale-95 cursor-pointer font-display ${
                currentView === 'dashboard'
                  ? 'bg-[#c900ff] text-white shadow-[0_0_20px_rgba(201,0,255,0.6)]'
                  : 'bg-weekend-neon text-black hover:bg-[#C900FF] hover:text-white shadow-[0_0_20px_rgba(10,204,128,0.4)] hover:shadow-[0_0_25px_rgba(201,0,255,0.8)]'
              }`}
              aria-label="Ver menú virtual"
            >
              Ver Menú
            </button>

            {/* Botón Hamburguesa Móvil */}
            <button
              className={`lg:hidden p-1.5 sm:p-2 transition-colors duration-300 z-50 cursor-pointer ${isOpen ? 'text-[#c900ff]' : 'text-white'}`}
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Menú"
            >
              <motion.div animate={isOpen ? { rotate: 90 } : { rotate: 0 }} transition={{ duration: 0.3 }}>
                {isOpen ? <X size={26} /> : <Menu size={26} />}
              </motion.div>
            </button>
          </div>
        </div>
      </header>

      {/* Menú Móvil Persistente */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-40 bg-black flex flex-col items-center justify-center gap-5 landscape:gap-3 md:hidden overflow-y-auto"
          >
            <div className="absolute inset-0 z-0">
              <img
                src={FOOTER_IMG}
                alt="Fondo Menú Móvil"
                width={800}
                height={1200}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover opacity-85 brightness-110 contrast-105 saturate-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/65" />
            </div>

            <div className="relative z-10 flex flex-col items-center gap-4 landscape:gap-2 py-8 w-full max-w-xs px-4">
              {MOBILE_NAV_LINKS.map((link) => (
                <motion.a
                  key={link.name} 
                  href={link.href}
                  whileHover={{ scale: 1.08 }} 
                  whileTap={{ scale: 0.92 }}
                  onClick={(e) => handleNavClick(e, link)}
                  className={`w-full text-center py-2 text-lg sm:text-xl uppercase tracking-widest font-extrabold transition-colors duration-300 border-b border-white/10 drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)] cursor-pointer font-display ${
                    link.colorClass || 'text-white hover:text-[#C900FF] active:text-[#EA2A81] focus:text-[#C900FF]'
                  }`}
                >
                  {link.name}
                </motion.a>
              ))}
              <button
                onClick={goToDashboard}
                className="mt-4 w-full px-8 py-3 bg-[#EA2A81] text-white font-extrabold uppercase tracking-widest rounded-full text-sm text-center shadow-[0_0_20px_rgba(234,42,129,0.4)] hover:bg-[#C900FF] hover:text-white active:bg-[#9011C5] active:scale-95 transition-all hover:shadow-[0_0_25px_rgba(201,0,255,0.8)] cursor-pointer font-display"
              >
                🔥 Pide tu Weekend (Carta Digital)
              </button>
            </div>

            <div className="absolute bottom-6 landscape:hidden left-0 w-full text-center z-10">
              <p className="text-[#f59e0b] font-black text-sm uppercase tracking-[0.3em] drop-shadow-[0_0_12px_rgba(245,158,11,0.3)] font-display">WEEKEND - HUARMEY</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ========================================================================= */}
      {/* 2. CONTENIDO PRINCIPAL SEGÚN LA PESTAÑA SELECCIONADA                     */}
      {/* ========================================================================= */}

      {/* --- A. PESTAÑA: SOCIAL / REDES --- */}
      {currentView === 'social' && (
        <main className="pt-16 sm:pt-20 min-h-screen">
          <Suspense fallback={<SectionLoadingFallback />}>
            <SocialGalleryView 
              onBackToHome={goToLanding} 
              onOpenMenu={goToDashboard} 
            />
          </Suspense>
        </main>
      )}

      {/* --- B. PESTAÑA: NOSOTROS --- */}
      {currentView === 'nosotros' && (
        <div className="pt-16 sm:pt-20 min-h-screen flex flex-col justify-between">
          <main className="flex-1">
            <Suspense fallback={<SectionLoadingFallback />}>
              <NosotrosSection 
                onOpenMenu={goToDashboard}
                onOpenReserva={goToReservation}
              />
            </Suspense>
          </main>
          <footer className="border-t border-white/10 py-6 bg-black text-center text-xs text-white/50">
            <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
              <p>&copy; {new Date().getFullYear()} WEEKEND Lounge &amp; Restaurant - Huarmey.</p>
              <button
                type="button"
                onClick={goToLanding}
                className="text-weekend-neon hover:underline font-bold uppercase tracking-wider cursor-pointer"
              >
                Volver al Inicio
              </button>
            </div>
          </footer>
        </div>
      )}

      {/* --- C. PESTAÑA: MOMENTOS --- */}
      {currentView === 'momentos' && (
        <div className="pt-16 sm:pt-20 min-h-screen flex flex-col justify-between">
          <main className="flex-1">
            <Suspense fallback={<SectionLoadingFallback />}>
              <MomentosSection 
                onOpenReserva={goToReservation}
                onOpenSocial={goToSocial}
              />
            </Suspense>
          </main>
          <footer className="border-t border-white/10 py-6 bg-black text-center text-xs text-white/50">
            <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
              <p>&copy; {new Date().getFullYear()} WEEKEND Lounge &amp; Restaurant - Huarmey.</p>
              <button
                type="button"
                onClick={goToLanding}
                className="text-weekend-neon hover:underline font-bold uppercase tracking-wider cursor-pointer"
              >
                Volver al Inicio
              </button>
            </div>
          </footer>
        </div>
      )}

      {/* --- D. PESTAÑA: CARTA DIGITAL --- */}
      {currentView === 'dashboard' && (
        <div className="pt-16 sm:pt-20 min-h-screen bg-black text-white">
          <main className="pt-3 pb-24 max-w-7xl mx-auto px-3 sm:px-4">
            {/* Barra interna de búsqueda y carrito de la carta */}
            <div className="flex items-center justify-between gap-3 mb-6 pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <span className="text-white font-black tracking-tight text-sm sm:text-base uppercase font-display">
                  Carta Digital <span className="text-weekend-neon">Weekend</span>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  data-action="open-search"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setIsSearchOpen(true);
                  }}
                  className="text-weekend-neon hover:opacity-80 transition-opacity active:scale-95 px-3 py-1.5 flex items-center gap-2 rounded-xl bg-zinc-900 border border-white/10 hover:border-weekend-neon text-xs font-bold shadow-sm cursor-pointer"
                  title="Buscar en la carta"
                  aria-label="Buscar en la carta"
                >
                  <Search size={16} />
                  <span>Buscar plato</span>
                </button>
              </div>
            </div>

            {/* Componente Nativo React de la Carta Digital */}
            <DigitalMenuView onSearchClick={() => setIsSearchOpen(true)} />

            {/* Modal de Búsqueda Dinámica con Lazy Loading */}
            <Suspense fallback={null}>
              {isSearchOpen && (
                <MenuSearchModal 
                  isOpen={isSearchOpen} 
                  onClose={() => setIsSearchOpen(false)} 
                />
              )}
            </Suspense>
          </main>

          <footer className="border-t border-white/10 py-8 bg-black text-center text-xs text-white/50">
            <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p>&copy; {new Date().getFullYear()} WEEKEND Lounge &amp; Restaurant - Huarmey.</p>
              <button
                type="button"
                onClick={goToLanding}
                className="text-weekend-neon hover:underline font-bold uppercase tracking-wider cursor-pointer"
              >
                Volver a la Portada Principal
              </button>
            </div>
            <p className="mt-4 text-[11px] sm:text-xs text-white/50 tracking-wider">
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
          </footer>
        </div>
      )}

      {/* --- E. PESTAÑA: RESERVA --- */}
      {currentView === 'reserva' && (
        <div className="pt-16 sm:pt-20 min-h-screen bg-[#07070a] text-white flex flex-col justify-between relative overflow-hidden">
          {/* Fondo Supabase fondoReservas.webp Aclarado y Luminoso */}
          <div className="absolute inset-0 z-0 pointer-events-none opacity-80 overflow-hidden">
            <img
              src="https://wdirdbryxwtbnprbrkvh.supabase.co/storage/v1/object/public/The_Weeknd/fondoReservas.webp"
              alt=""
              aria-hidden="true"
              loading="lazy"
              className="w-full h-full object-cover object-center filter brightness-[1.25] saturate-125 contrast-105"
            />
            {/* Overlay sutil para mantener legibilidad sin oscurecer en exceso */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/20 to-black/50" />
          </div>

          <main className="flex-1 relative py-12 px-4 overflow-hidden flex items-center justify-center z-10">
            <div className="absolute inset-0 bg-radial-vignette opacity-70 pointer-events-none" />
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#C900FF]/15 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#C900FF]/15 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 max-w-6xl mx-auto w-full">
              <div className="relative flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-8">
                {/* Capibara Izquierda (Kamehameha) */}
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  className="relative w-48 sm:w-64 lg:w-72 flex-shrink-0 -mb-8 lg:mb-0 z-20 pointer-events-none"
                >
                  <div className="absolute -inset-4 rounded-full bg-[#C900FF]/25 blur-2xl pulse-glow" />
                  <img
                    src={CAPY_KAME}
                    alt="Capibara pose kamehameha"
                    loading="lazy"
                    decoding="async"
                    className="relative w-full drop-shadow-[0_0_35px_rgba(201,0,255,0.45)] float-anim"
                  />
                </motion.div>

                {/* Módulo de Reserva en el Centro */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="w-full max-w-xl bg-zinc-900/85 backdrop-blur-xl p-6 sm:p-8 rounded-[32px] border border-[#C900FF]/40 shadow-[0_0_40px_rgba(201,0,255,0.35)] relative z-10"
                >
                  <div className="text-center mb-6">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0acc80]/15 border border-[#0acc80]/40 text-[#0acc80] text-[11px] font-black uppercase tracking-widest mb-2">
                      <Phone size={12} />
                      <span>WhatsApp Directo: +51 961 336 674</span>
                    </div>
                    <h2 className="text-[#C900FF] text-xs font-bold tracking-[0.3em] uppercase mb-1 font-display">Planifica tu noche</h2>
                    <h3 className="text-2xl sm:text-4xl font-black uppercase mb-2 leading-tight font-display">Reserva tu <span className="text-[#C900FF] font-black">Mesa</span></h3>
                    <p className="text-white/60 text-xs sm:text-sm">Completa tus datos o escríbenos directo a WhatsApp.</p>
                  </div>

                  <form onSubmit={handleReserve} className="space-y-4 text-xs">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Nombre Completo</label>
                        <input type="text" required placeholder="Tu nombre" className="w-full bg-black/60 border border-white/10 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-[#C900FF] focus:ring-1 focus:ring-[#C900FF] transition-all text-white placeholder:text-white/30" value={form.nombre} onChange={(e) => setForm({ ...form, nombre: e.target.value })} />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Número de Teléfono</label>
                        <input type="tel" required placeholder="Ej: 961 336 674" className="w-full bg-black/60 border border-white/10 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-[#C900FF] focus:ring-1 focus:ring-[#C900FF] transition-all text-white placeholder:text-white/30" value={form.telefono} onChange={(e) => setForm({ ...form, telefono: e.target.value })} />
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Fecha</label>
                        <input type="date" required className="w-full bg-black/60 border border-white/10 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-[#C900FF] focus:ring-1 focus:ring-[#C900FF] transition-all text-white" value={form.fecha} onChange={(e) => setForm({ ...form, fecha: e.target.value })} />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Hora de llegada</label>
                        <select className="w-full bg-black/60 border border-white/10 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-[#C900FF] focus:ring-1 focus:ring-[#C900FF] transition-all appearance-none cursor-pointer text-white" value={form.hora} onChange={(e) => setForm({ ...form, hora: e.target.value })}>
                          {TIME_SLOTS.map((t) => <option key={t} value={t}>{t}</option>)}
                        </select>
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Cantidad de Personas</label>
                        <input type="number" required min="1" placeholder="Ej: 4" className="w-full bg-black/60 border border-white/10 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-[#C900FF] focus:ring-1 focus:ring-[#C900FF] transition-all text-white placeholder:text-white/30" value={form.personas} onChange={(e) => setForm({ ...form, personas: e.target.value })} />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Motivo</label>
                        <select className="w-full bg-black/60 border border-white/10 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-[#C900FF] focus:ring-1 focus:ring-[#C900FF] transition-all appearance-none cursor-pointer text-white" value={form.motivo} onChange={(e) => setForm({ ...form, motivo: e.target.value })}>
                          <option value="">Seleccionar motivo</option>
                          <option value="Cena Casual">Cena Casual</option>
                          <option value="Cumpleaños">Cumpleaños</option>
                          <option value="Aniversario">Aniversario</option>
                          <option value="Evento Corporativo">Evento Corporativo</option>
                          <option value="Noche de Patas">Noche de Patas</option>
                          <option value="Otro">Otro</option>
                        </select>
                      </div>
                    </div>

                    {/* Políticas del servicio */}
                    <div className="rounded-2xl border border-[#C900FF]/35 bg-[#C900FF]/5 p-3.5 space-y-1.5">
                      <p className="text-[#C900FF] text-[10px] font-bold uppercase tracking-[0.2em] font-display">Políticas del servicio</p>
                      <p className="text-white/60 text-[11px] leading-relaxed flex items-start gap-1.5">
                        <span className="text-[#C900FF] mt-0.5">•</span>
                        <span><span className="text-white/90 font-semibold">Tolerancia de reserva:</span> 10 a 15 minutos; transcurrido este tiempo, la mesa pasará a estar disponible.</span>
                      </p>
                      <p className="text-white/60 text-[11px] leading-relaxed flex items-start gap-1.5">
                        <span className="text-[#C900FF] mt-0.5">•</span>
                        <span><span className="text-white/90 font-semibold">Restricción:</span> No se permite el ingreso de alimentos ni bebidas ajenos al establecimiento.</span>
                      </p>
                    </div>

                    <button type="submit" className="w-full py-3.5 bg-[#C900FF] text-white font-black uppercase tracking-[0.2em] rounded-xl hover:bg-white hover:text-[#C900FF] active:scale-95 transition-all flex items-center justify-center gap-2 text-xs shadow-[0_0_25px_rgba(201,0,255,0.5)] cursor-pointer">
                      <span>Reservar por WhatsApp</span> <Send size={16} />
                    </button>
                  </form>
                </motion.div>

                {/* Capibara Derecha (Superhéroe) */}
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  className="relative w-48 sm:w-64 lg:w-72 flex-shrink-0 -mt-8 lg:mt-0 z-20 pointer-events-none"
                >
                  <div className="absolute -inset-4 rounded-full bg-[#C900FF]/25 blur-2xl pulse-glow" />
                  <img
                    src={CAPY_HERO}
                    alt="Capibara superhéroe aterrizando"
                    loading="lazy"
                    decoding="async"
                    className="relative w-full drop-shadow-[0_0_35px_rgba(201,0,255,0.45)] float-anim"
                  />
                </motion.div>
              </div>
            </div>
          </main>

          <footer className="border-t border-white/10 py-6 bg-black text-center text-xs text-white/50">
            <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p>&copy; {new Date().getFullYear()} WEEKEND Lounge &amp; Restaurant - Huarmey.</p>
              <button
                type="button"
                onClick={goToLanding}
                className="text-weekend-neon hover:underline font-bold uppercase tracking-wider cursor-pointer"
              >
                Volver a la Portada Principal
              </button>
            </div>
            <p className="mt-4 text-[11px] sm:text-xs text-white/50 tracking-wider">
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
          </footer>
        </div>
      )}

      {/* --- F. PESTAÑA: PORTADA / INICIO (HOME) --- */}
      {currentView === 'landing' && (
        <>
          {/* ============ HERO PRINCIPAL ============ */}
          <section id="inicio" className="relative h-screen min-h-[580px] flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 z-0 bg-black">
              {/* Fondo Móvil y Tablet */}
              <div className="block lg:hidden absolute inset-0 z-0">
                <img
                  src="https://wdirdbryxwtbnprbrkvh.supabase.co/storage/v1/object/public/The_Weeknd/inicio.webp"
                  alt="Fondo Portada Móvil"
                  width={1080}
                  height={1920}
                  fetchPriority="high"
                  decoding="async"
                  className="w-full h-full object-cover opacity-80 brightness-110 contrast-100"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/35 to-black" />
              </div>

              {/* Degradado Neón y Acentos Terrosos en Desktop */}
              <div className="hidden lg:block absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-b from-weekend-neon/[0.07] via-black to-black" />
                <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[44rem] h-[44rem] rounded-full bg-weekend-neon/[0.06] blur-3xl pulse-glow pointer-events-none" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[28rem] h-[28rem] rounded-full border border-weekend-neon/10 pointer-events-none" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[18rem] h-[18rem] rounded-full border border-amber-500/[0.08] pointer-events-none" />
              </div>

              <div className="absolute bottom-0 inset-x-0 h-44 bg-gradient-to-t from-black via-black/95 via-50% to-black z-[2] pointer-events-none" />
            </div>

            {/* Capibara heroica */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, x: 20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="absolute right-0 lg:right-6 top-1/2 -translate-y-1/2 z-[5] pointer-events-none hidden md:block w-56 lg:w-80"
            >
              <div className="absolute -inset-4 rounded-full bg-weekend-neon/15 blur-3xl pulse-glow" />
              <img 
                src={CAPY_HEROIC} 
                alt="Capibara heroica mascota" 
                width={480}
                height={480}
                fetchPriority="high"
                decoding="async"
                className="relative w-full drop-shadow-[0_0_50px_rgba(10,204,128,0.4)] float-anim" 
              />
            </motion.div>

            <div className="relative z-10 max-w-3xl mx-auto px-4 text-center">
              <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-black uppercase tracking-[0.25em] mb-4">
                  <span>🔥</span> Restobar &amp; Lounge - Huarmey <span>🎸</span>
                </div>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.1 }}
                className="text-4xl md:text-7xl font-black uppercase tracking-tight text-white mb-5 font-display"
              >
                DONDE LA NOCHE <span className="text-transparent bg-clip-text bg-gradient-to-r from-weekend-neon via-emerald-400 to-amber-300" style={{ textShadow: '0 0 35px rgba(10,204,128,0.4)' }}>COBRA VIDA</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
                className="text-base md:text-lg text-white/80 mb-10 max-w-xl mx-auto font-medium leading-relaxed"
              >
                Tu fin de semana empieza aquí: alitas en 31 salsas artesanales, hamburguesas artesanales a la parrilla, makis y coctelería con pura vibra fiesta.
              </motion.p>

              {/* Botón CTA con animación continua */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }} 
                animate={{ opacity: 1, scale: 1 }} 
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex justify-center"
              >
                <motion.button
                  onClick={goToDashboard}
                  animate={{ 
                    boxShadow: [
                      "0 0 20px rgba(10,204,128,0.5)",
                      "0 0 45px rgba(201,0,255,0.85)",
                      "0 0 20px rgba(10,204,128,0.5)"
                    ],
                    scale: [1, 1.02, 1]
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="group inline-flex items-center gap-3 px-8 md:px-10 py-4 md:py-5 bg-gradient-to-r from-weekend-neon via-emerald-400 to-amber-300 text-black font-black uppercase tracking-widest rounded-full hover:bg-[#C900FF] hover:text-white active:bg-[#9011C5] active:text-white transition-all duration-300 active:scale-95 text-sm md:text-base text-center cursor-pointer border border-white/25 font-display"
                >
                  <span>🔥 PIDE TU WEEKEND - MENÚ &amp; DELIVERY</span>
                  <ChevronRight className="group-hover:translate-x-1.5 transition-transform" />
                </motion.button>
              </motion.div>
            </div>

            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce">
              <ChevronRight className="rotate-90 text-weekend-neon" size={28} />
            </div>
          </section>

          {/* ============ UBICACIÓN DARK CYBER / NEON ============ */}
          <section id="ubicacion" className="py-20 bg-[#050505] relative overflow-hidden">
            {/* Luces de ambiente Neón Multi-Color de fondo */}
            <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-[#00FF66]/15 rounded-full blur-[110px] pointer-events-none" />
            <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-[#FF007F]/20 rounded-full blur-[110px] pointer-events-none" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-80 h-40 bg-[#B026FF]/15 rounded-full blur-[90px] pointer-events-none" />

            <div className="max-w-5xl mx-auto px-4 relative z-10">
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gradient-to-r from-[#00FF66]/15 via-[#FF007F]/15 to-[#B026FF]/15 border border-[#00FF66]/40 text-[#00FF66] text-xs font-black uppercase tracking-[0.25em] mb-4 shadow-[0_0_20px_rgba(0,255,102,0.25)]">
                  <span>📍</span> Ubicación &amp; Punto de Encuentro <span>🍹</span>
                </div>
                <h3 className="text-3xl md:text-5xl font-black uppercase mb-4 font-display">
                  ¿CÓMO <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00FF66] via-[#FF007F] to-[#B026FF]">LLEGAR?</span>
                </h3>
                <div className="flex items-center justify-center gap-2 text-white/80 font-medium">
                  <MapPin size={20} className="text-[#00FF66] shrink-0 animate-bounce" />
                  <p className="text-sm sm:text-base">Av. Cabo 140, Huarmey 02651 &bull; En pleno corazón de la ciudad</p>
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 30 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true }}
                className="relative p-[2px] rounded-[32px] bg-gradient-to-r from-[#00FF66] via-[#FF007F] to-[#B026FF] shadow-[0_0_40px_rgba(255,0,127,0.35),0_0_60px_rgba(0,255,102,0.25)] overflow-hidden group"
              >
                <div className="relative rounded-[30px] overflow-hidden bg-zinc-950 h-[440px] sm:h-[480px]">
                  {/* Google Maps Iframe with Dark Cyber filter */}
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d245.6409801721048!2d-78.15328299958676!3d-10.068675181619353!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91aa17e1bee947c9%3A0xda6d1058bd817a98!2sWeekend%20Huarmey!5e0!3m2!1ses!2spe!4v1772137403381!5m2!1ses!2spe"
                    className="w-full h-full border-0 filter invert-[90%] hue-rotate-180 contrast-[125%] saturate-[140%]" 
                    allowFullScreen 
                    title="Maps Weekend Huarmey" 
                    loading="lazy"
                  />

                  {/* Floating Cyberpunk Venue Card (Top Left) */}
                  <div className="absolute top-4 left-4 z-20 max-w-xs sm:max-w-sm p-4 rounded-2xl bg-black/85 backdrop-blur-xl border border-white/20 shadow-[0_0_30px_rgba(0,255,102,0.3)] space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-white font-black text-sm uppercase tracking-wide font-display">
                        Weekend <span className="text-[#00FF66]">Huarmey</span>
                      </span>
                      <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#ffa40b]/20 border border-[#ffa40b]/50 text-amber-300 text-[10px] font-black">
                        <span>3.5</span>
                        <span>⭐⭐⭐½</span>
                      </div>
                    </div>
                    <p className="text-[11px] text-zinc-300 leading-snug flex items-start gap-1.5">
                      <MapPin size={13} className="text-[#00FF66] shrink-0 mt-0.5" />
                      <span>Av. Cabo 140, Huarmey 02651</span>
                    </p>
                    <div className="flex items-center gap-2 pt-1 border-t border-white/10 text-[10px] text-emerald-400 font-bold">
                      <span className="w-2 h-2 rounded-full bg-[#00FF66] animate-ping" />
                      <span>Abierto hoy: 5:00 PM - 3:00 AM</span>
                    </div>
                  </div>

                  {/* Botón flotante para abrir en Google Maps (Bottom Right) */}
                  <div className="absolute bottom-4 right-4 z-20">
                    <a
                      href="https://maps.google.com/?q=Weekend+Huarmey+Av.+Cabo+140+Huarmey"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-black/90 backdrop-blur-md border border-[#00FF66] text-white font-black text-xs uppercase hover:bg-[#00FF66] hover:text-black transition-all shadow-[0_0_30px_rgba(0,255,102,0.6)] cursor-pointer active:scale-95"
                    >
                      <MapPin size={16} className="text-[#00FF66] group-hover:text-black" />
                      <span>ABRIR EN GOOGLE MAPS</span>
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* ============ FOOTER ============ */}
          <footer id="contacto" className="relative pt-16 pb-10 overflow-hidden border-t border-white/10">
            <div className="absolute inset-0 z-0">
              <img 
                src={FOOTER_IMG} 
                alt="Footer Background" 
                width={1200}
                height={600}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover opacity-25 grayscale contrast-125 brightness-75" 
                referrerPolicy="no-referrer" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/85 to-[#0A0A0F]/90" />
            </div>

            <div className="relative z-10 max-w-6xl mx-auto px-4">
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
                <div className="col-span-1 lg:col-span-1">
                  <div className="flex items-center gap-3 mb-6">
                    <img 
                      src={LOGO_URL} 
                      alt="Logo" 
                      width={40}
                      height={40}
                      loading="lazy"
                      decoding="async"
                      className="h-10 w-10 rounded-full object-cover border border-weekend-neon" 
                      referrerPolicy="no-referrer" 
                    />
                    <span className="text-white font-black tracking-tighter text-xl uppercase font-display">WEEKEND!</span>
                  </div>
                  <p className="text-white/60 text-sm leading-relaxed mb-6">
                    El rincón rústico y nocturno donde la buena vibra, los sabores artesanales y la fiesta se juntan para hacer de cada noche algo inolvidable.
                  </p>
                  <div className="space-y-4">
                    <p className="text-weekend-neon font-bold uppercase tracking-widest text-xs font-display">¡Síguenos!</p>
                    <div className="flex items-center gap-4">
                      <a href="https://www.tiktok.com/@weekendhuarmey" target="_blank" rel="noopener noreferrer" className="p-3 bg-white/5 rounded-2xl hover:bg-weekend-neon hover:text-black transition-colors" aria-label="TikTok">
                        {TIKTOK_ICON('w-5 h-5')}
                      </a>
                      <a href="https://www.instagram.com/weekend_huarmey/" target="_blank" rel="noopener noreferrer" className="p-3 bg-white/5 rounded-2xl hover:bg-weekend-neon hover:text-black transition-colors" aria-label="Instagram">
                        <Instagram size={20} />
                      </a>
                      <a href="https://www.facebook.com/p/Weekend-Huarmey-100075916407028/" target="_blank" rel="noopener noreferrer" className="p-3 bg-white/5 rounded-2xl hover:bg-weekend-neon hover:text-black transition-colors" aria-label="Facebook">
                        <Facebook size={20} />
                      </a>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-white font-bold uppercase tracking-widest text-sm mb-6 font-display">Horario</h4>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-white/60">
                      <Clock size={18} className="text-weekend-neon" />
                      <span className="text-sm">Diariamente: 5:00 PM - 3:00 AM</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-white font-bold uppercase tracking-widest text-sm mb-6 font-display">Métodos de Pago</h4>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-white/60">
                      <CreditCard size={18} className="text-weekend-neon" />
                      <span className="text-sm">Aceptamos todos los bancos, pagos digitales y efectivo</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-[#742284] text-white rounded-full text-[10px] uppercase font-extrabold tracking-widest border border-[#8f2ca2] shadow-sm">Yape</span>
                      <span className="px-3 py-1 bg-[#00D4B2] text-black rounded-full text-[10px] uppercase font-extrabold tracking-widest border border-[#33e0c4] shadow-sm">Plin</span>
                      <span className="px-3 py-1 bg-[#1A1F71] text-white rounded-full text-[10px] uppercase font-extrabold tracking-widest border border-[#2b329b] shadow-sm">Visa</span>
                      <span className="px-3 py-1 bg-[#00E968] text-black rounded-full text-[10px] uppercase font-extrabold tracking-widest border border-[#33ee86] shadow-sm">Efectivo</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-white font-bold uppercase tracking-widest text-sm mb-6 font-display">Contacto</h4>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-white/60">
                      <Phone size={18} className="text-weekend-neon" />
                      <span className="text-sm">+51 961 336 674</span>
                    </div>
                    <div className="flex items-start gap-3 text-white/60">
                      <MapPin size={18} className="text-weekend-neon shrink-0" />
                      <span className="text-sm">Av. Cabo 140, Huarmey 02651</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-12 border-t border-white/10 text-center flex flex-col items-center justify-center gap-2">
                <p className="text-white/40 text-xs uppercase tracking-[0.3em]">
                  &copy; {new Date().getFullYear()} WEEKEND Lounge &amp; Restaurant.
                </p>
                <p className="text-[11px] sm:text-xs text-white/50 tracking-wider">
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
            </div>
          </footer>
        </>
      )}

      {/* Modal de Búsqueda Global con Suspense */}
      <Suspense fallback={null}>
        {isSearchOpen && (
          <MenuSearchModal 
            isOpen={isSearchOpen} 
            onClose={() => setIsSearchOpen(false)} 
          />
        )}
      </Suspense>
    </div>
  );
}
