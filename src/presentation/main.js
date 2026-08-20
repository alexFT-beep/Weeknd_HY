import { InMemoryMenuRepository } from '../infrastructure/repositories/InMemoryMenuRepository.js';
import { LocalStorageCartRepository } from '../infrastructure/repositories/LocalStorageCartRepository.js';
import { WhatsAppAdapter } from '../infrastructure/adapters/WhatsAppAdapter.js';
import { PAYMENT_INFO } from '../infrastructure/data/fullMenuData.js';
import { GetMenuUseCase } from '../application/usecases/GetMenuUseCase.js';
import { CartUseCases } from '../application/usecases/CartUseCases.js';
import { CalculateTotalsUseCase } from '../application/usecases/CalculateTotalsUseCase.js';
import { WhatsAppOrderUseCase } from '../application/usecases/WhatsAppOrderUseCase.js';
import { MenuController } from './controllers/MenuController.js';
import { CartController } from './controllers/CartController.js';

/**
 * Hexagonal Composition Root & Application Bootstrapper
 */
async function bootApp() {
  try {
    // 1. Instantiate Infrastructure Layer (Adapters & Repositories)
    const menuRepository = new InMemoryMenuRepository();
    const cartRepository = new LocalStorageCartRepository();
    const whatsAppAdapter = new WhatsAppAdapter(PAYMENT_INFO.whatsappNumber); // Número oficial Weekend!

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

    // 4. Initialize Controllers
    await cartController.init();
    await menuController.init();

    console.log('🍽️ WEEKEND! Lounge & Restaurant - Carta Digital iniciada correctamente con Arquitectura Hexagonal.');
  } catch (error) {
    console.error('Error al inicializar la aplicación Weekend Carta:', error);
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootApp);
} else {
  bootApp();
}
