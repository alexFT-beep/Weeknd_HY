import React, { useState, useEffect, lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * @file App.tsx
 * @description Punto de entrada principal con arquitectura React 2026,
 * lazy-loading con Suspense y enrutamiento reactivo optimizado a 60 FPS.
 */
import { CartProvider } from './features/cart/hooks/useCart';
import { Header, ActiveTab } from './components/Header';
import { Footer } from './components/Footer';
import { CartDrawer } from './features/cart/components/CartDrawer';
import { FloatingCartButton } from './features/cart/components/FloatingCartButton';
import AppLanding from './presentation/components/AppLandingHero';

// React 2026 Route-level Code Splitting
const DigitalMenu = lazy(() =>
  import('./features/menu/components/DigitalMenu').then(m => ({ default: m.DigitalMenu }))
);
const MenuSearchModal = lazy(() =>
  import('./features/menu/components/MenuSearchModal').then(m => ({ default: m.MenuSearchModal }))
);
const PromocionesPage = lazy(() =>
  import('./pages/PromocionesPage').then(m => ({ default: m.PromocionesPage }))
);
const ReservaPage = lazy(() =>
  import('./pages/ReservaPage').then(m => ({ default: m.ReservaPage }))
);
const NosotrosSection = lazy(() =>
  import('./presentation/components/AboutUsStorySection').then(m => ({ default: m.NosotrosSection }))
);
const MomentosSection = lazy(() =>
  import('./presentation/components/CelebrationMomentsSection').then(m => ({ default: m.MomentosSection }))
);
const SocialGalleryView = lazy(() =>
  import('./presentation/components/SocialFeedGallery').then(m => ({ default: m.SocialGalleryView }))
);

const TabLoadingFallback: React.FC = () => (
  <div className="min-h-[50vh] flex flex-col items-center justify-center gap-3 py-20">
    <div className="w-8 h-8 rounded-full border-2 border-[#c900ff] border-t-transparent animate-spin" />
    <span className="text-xs uppercase tracking-widest text-[#c900ff] font-extrabold font-display">
      Cargando Weekend...
    </span>
  </div>
);

export const AppContent: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('inicio');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    const handleHash = () => {
      const hash = (window.location.hash || '').toLowerCase();
      if (hash.includes('promociones') || hash.includes('destacados')) {
        setActiveTab('promociones');
      } else if (hash.includes('reserva')) {
        setActiveTab('reserva');
      } else if (hash.includes('carta') || hash.includes('menu')) {
        setActiveTab('carta');
      } else if (hash.includes('nosotros') || hash.includes('quienes-somos')) {
        setActiveTab('nosotros');
      } else if (hash.includes('momentos') || hash.includes('celebraciones')) {
        setActiveTab('momentos');
      } else if (hash.includes('social') || hash.includes('redes')) {
        setActiveTab('social');
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen(prev => !prev);
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('hashchange', handleHash);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleNavigate = (tab: ActiveTab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#050508] text-white flex flex-col justify-between selection:bg-[#c900ff] selection:text-white">
      {/* Persitent Header Navbar */}
      <Header
        activeTab={activeTab}
        onNavigate={handleNavigate}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      {/* Main View Router with Framer Motion Page Transitions & Suspense Code-Splitting */}
      <main className="flex-1 w-full relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 12, scale: 0.99 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.99 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="w-full flex-1"
          >
            <Suspense fallback={<TabLoadingFallback />}>
              {activeTab === 'inicio' && (
                <AppLanding
                  onNavigateTab={(tab: string) => handleNavigate(tab as ActiveTab)}
                />
              )}
              {activeTab === 'nosotros' && (
                <div className="pt-20">
                  <NosotrosSection
                    onOpenMenu={() => handleNavigate('carta')}
                    onOpenReserva={() => handleNavigate('reserva')}
                  />
                </div>
              )}
              {activeTab === 'momentos' && (
                <div className="pt-20">
                  <MomentosSection
                    onOpenReserva={() => handleNavigate('reserva')}
                    onOpenSocial={() => handleNavigate('social')}
                  />
                </div>
              )}
              {activeTab === 'promociones' && (
                <PromocionesPage />
              )}
              {activeTab === 'carta' && (
                <DigitalMenu onOpenSearch={() => setIsSearchOpen(true)} />
              )}
              {activeTab === 'reserva' && (
                <ReservaPage />
              )}
              {activeTab === 'social' && (
                <div className="pt-20">
                  <SocialGalleryView
                    onOpenReserva={() => handleNavigate('reserva')}
                    onOpenMenu={() => handleNavigate('carta')}
                    onBackToHome={() => handleNavigate('inicio')}
                  />
                </div>
              )}
            </Suspense>
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Global Persistent Footer */}
      <Footer />

      {/* Floating Cart Access Button */}
      <FloatingCartButton />

      {/* Slide-over Cart Drawer */}
      <CartDrawer />

      {/* Real-time Search Modal with Lazy Loading */}
      {isSearchOpen && (
        <Suspense fallback={null}>
          <MenuSearchModal
            isOpen={isSearchOpen}
            onClose={() => setIsSearchOpen(false)}
          />
        </Suspense>
      )}
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
};

export default App;
