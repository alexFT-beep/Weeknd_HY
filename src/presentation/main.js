import { GraphQLMenuRepository } from '../infrastructure/repositories/GraphQLMenuRepository.js';
import { LocalStorageCartRepository } from '../infrastructure/repositories/LocalStorageCartRepository.js';
import { WhatsAppAdapter } from '../infrastructure/adapters/WhatsAppAdapter.js';
import { PAYMENT_INFO } from '../infrastructure/data/fullMenuData.js';
import { GetMenuUseCase } from '../application/usecases/GetMenuUseCase.js';
import { CartUseCases } from '../application/usecases/CartUseCases.js';
import { CalculateTotalsUseCase } from '../application/usecases/CalculateTotalsUseCase.js';
import { WhatsAppOrderUseCase } from '../application/usecases/WhatsAppOrderUseCase.js';
import { MenuController } from './controllers/MenuController.js';
import { CartController } from './controllers/CartController.js';

let appInstance = null;

/**
 * Hexagonal Composition Root & Application Bootstrapper
 */
export async function bootApp() {
  try {
    if (!appInstance) {
      // 1. Instantiate Infrastructure Layer (Adapters & Repositories)
      // Supports Vercel Environment Variables & Contentful CMS with automatic local fallback
      const menuRepository = new GraphQLMenuRepository();
      const cartRepository = new LocalStorageCartRepository();
      
      const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER || PAYMENT_INFO.whatsappNumber;
      const whatsAppAdapter = new WhatsAppAdapter(whatsappNumber);

      // 2. Instantiate Application Layer (Use Cases)
      const getMenuUseCase = new GetMenuUseCase(menuRepository);
      const cartUseCases = new CartUseCases(cartRepository, menuRepository);
      const calculateTotalsUseCase = new CalculateTotalsUseCase(menuRepository);
      const whatsAppOrderUseCase = new WhatsAppOrderUseCase(calculateTotalsUseCase, whatsAppAdapter);

      // 3. Instantiate Presentation Layer (Controllers)
      const cartController = new CartController({
        cartUseCases,
        calculateTotalsUseCase,
        whatsAppOrderUseCase,
        menuRepository
      });

      const menuController = new MenuController({
        getMenuUseCase
      });

      appInstance = {
        menuRepository,
        cartRepository,
        cartUseCases,
        cartController,
        menuController
      };

      await cartController.init();
    }

    // Always re-run menuController init so DOM elements in React views are populated
    await appInstance.menuController.init(true);
    await appInstance.cartController.updateCartWidgets();

    console.log('🍽️ WEEKEND! Lounge & Restaurant - Carta Digital iniciada correctamente con Arquitectura Hexagonal.');
  } catch (error) {
    console.error('Error al inicializar la aplicación Weekend Carta:', error);
  }
}

if (typeof window !== 'undefined') {
  window.initHexagonalApp = bootApp;
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootApp);
} else {
  bootApp();
}
