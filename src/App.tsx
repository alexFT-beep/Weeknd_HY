import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CartProvider } from './features/cart/hooks/useCart';
import { Header, ActiveTab } from './components/Header';
import { Footer } from './components/Footer';
import { CartDrawer } from './features/cart/components/CartDrawer';
import { FloatingCartButton } from './features/cart/components/FloatingCartButton';
import { DigitalMenu } from './features/menu/components/DigitalMenu';
import { MenuSearchModal } from './features/menu/components/MenuSearchModal';
import { PromocionesPage } from './pages/PromocionesPage';
import { ReservaPage } from './pages/ReservaPage';
import { AboutUsStorySection as NosotrosSection } from './presentation/components/AboutUsStorySection';
import { CelebrationMomentsSection as MomentosSection } from './presentation/components/CelebrationMomentsSection';
import { SocialCommunityGallery as SocialGalleryView } from './presentation/components/SocialFeedGallery';
import AppLanding from './presentation/components/AppLandingHero';

export const AppContent: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('inicio');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    const handleHash = () => {
      const hash = (window.location.hash || '').toLowerCase();
      if (hash.includes('promociones')) {
        setActiveTab('promociones');
      } else if (hash.includes('reserva')) {
        setActiveTab('reserva');
      } else if (hash.includes('carta') || hash.includes('menu')) {
        setActiveTab('carta');
      } else if (hash.includes('nosotros')) {
        setActiveTab('nosotros');
      } else if (hash.includes('momentos')) {
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

      {/* Main View Router with Framer Motion Page Transitions */}
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
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Global Persistent Footer */}
      <Footer />

      {/* Floating Cart Access Button */}
      <FloatingCartButton />

      {/* Slide-over Cart Drawer */}
      <CartDrawer />

      {/* Real-time Search Modal */}
      <MenuSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
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
