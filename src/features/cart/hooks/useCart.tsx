/**
 * @file useCart.tsx
 * @description Hook de React y proveedor de contexto global para la gestión reactiva del carrito de compras,
 * cálculo de precios, cambio de modalidad (Delivery/Mesa) y persistencia automatizada.
 */

import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { MenuItem, DELIVERY_ZONES, DeliveryZone } from '../../../data/fullMenuData';
import { CartItem, OrderType, CustomerFormData, CartTotals } from '../types';
import { cartStorage } from '../services/cartStorage';

/** Valor del contexto global del carrito de compras */
export interface CartContextValue {
  /** Lista inmutable de ítems contenidos en el carrito */
  readonly items: CartItem[];
  /** Alias semántico: lista de ítems del carrito */
  readonly cartItemList: CartItem[];
  /** Indica si el drawer del carrito está actualmente visible */
  readonly isOpen: boolean;
  /** Alias semántico: bandera de visibilidad del drawer */
  readonly isCartDrawerOpen: boolean;
  /** Modalidad de entrega seleccionada (delivery o mesa) */
  readonly orderType: OrderType;
  /** Zona de delivery actualmente elegida */
  readonly selectedZone: DeliveryZone;
  /** Datos del formulario del cliente */
  readonly customerData: CustomerFormData;
  /** Objeto de totales calculados (subtotal, envío, total) */
  readonly totals: CartTotals;
  /** Cantidad acumulada total de productos en el carrito */
  readonly totalQuantity: number;
  /** Abre el drawer del carrito */
  readonly openCart: () => void;
  /** Cierra el drawer del carrito */
  readonly closeCart: () => void;
  /** Alterna la visibilidad del drawer del carrito */
  readonly toggleCart: () => void;
  /** Agrega un producto al carrito */
  readonly addItem: (product: MenuItem) => void;
  /** Alias semántico: agrega un producto al carrito */
  readonly addItemToCart: (product: MenuItem) => void;
  /** Elimina un producto del carrito por su ID */
  readonly removeItem: (productId: string) => void;
  /** Alias semántico: elimina un producto por ID */
  readonly removeItemFromCart: (productId: string) => void;
  /** Modifica la cantidad de un producto (+1 o -1) */
  readonly updateQuantity: (productId: string, delta: number) => void;
  /** Asigna una cantidad fija a un producto */
  readonly setQuantity: (productId: string, quantity: number) => void;
  /** Vacía completamente el carrito y borra la persistencia */
  readonly clearCart: () => void;
  /** Cambia el tipo de orden entre delivery y mesa */
  readonly setOrderType: (type: OrderType) => void;
  /** Establece la zona geográfica de delivery */
  readonly setSelectedZone: (zone: DeliveryZone) => void;
  /** Actualiza los datos del cliente parcialmente */
  readonly updateCustomerData: (data: Partial<CustomerFormData>) => void;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

/**
 * Proveedor de Contexto del Carrito de Compras.
 */
export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => cartStorage.loadCart());
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [orderType, setOrderType] = useState<OrderType>('delivery');
  const [selectedZone, setSelectedZone] = useState<DeliveryZone>(DELIVERY_ZONES[0]);
  const [customerData, setCustomerData] = useState<CustomerFormData>({
    customerName: '',
    phone: '',
    address: '',
    reference: '',
    tableNumber: '',
    paymentMethod: 'Yape (QR / Billetera)',
    notes: ''
  });

  // Persistir cambios en localStorage
  useEffect(() => {
    cartStorage.saveCart(items);
  }, [items]);

  const handleOpenCartDrawer = useCallback(() => setIsOpen(true), []);
  const handleCloseCartDrawer = useCallback(() => setIsOpen(false), []);
  const handleToggleCartDrawer = useCallback(() => setIsOpen(prev => !prev), []);

  const handleAddItemToCart = useCallback((product: MenuItem) => {
    setItems(prevItems => {
      const existingProduct = prevItems.find(item => item.product.id === product.id);
      if (existingProduct) {
        return prevItems.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { product, quantity: 1 }];
    });
  }, []);

  const handleRemoveItemFromCart = useCallback((productId: string) => {
    setItems(prevItems => prevItems.filter(item => item.product.id !== productId));
  }, []);

  const handleUpdateItemQuantity = useCallback((productId: string, delta: number) => {
    setItems(prevItems =>
      prevItems
        .map(item => {
          if (item.product.id === productId) {
            const calculatedQuantity = item.quantity + delta;
            return calculatedQuantity > 0 ? { ...item, quantity: calculatedQuantity } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null)
    );
  }, []);

  const handleSetItemQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItemFromCart(productId);
      return;
    }
    setItems(prevItems =>
      prevItems.map(item =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  }, [handleRemoveItemFromCart]);

  const handleClearCartContents = useCallback(() => {
    setItems([]);
    cartStorage.clearCart();
  }, []);

  const handleUpdateCustomerFormData = useCallback((data: Partial<CustomerFormData>) => {
    setCustomerData(prev => ({ ...prev, ...data }));
  }, []);

  const totalQuantity = useMemo(() => {
    return items.reduce((accumulatedTotal, item) => accumulatedTotal + item.quantity, 0);
  }, [items]);

  const totals = useMemo<CartTotals>(() => {
    const subtotal = items.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
    const totalTapers = items.reduce((acc, item) => {
      let countPerUnit = item.product.tapersCount;
      if (countPerUnit === undefined) {
        const lowerName = item.product.name.toLowerCase();
        if (lowerName.includes('ronda') || lowerName.includes('ruleta') || lowerName.includes('carrusel')) {
          countPerUnit = 5;
        } else if (lowerName.includes('trío') || lowerName.includes('trio')) {
          countPerUnit = 3;
        } else if (lowerName.includes('dúo') || lowerName.includes('duo')) {
          countPerUnit = 2;
        } else {
          countPerUnit = 1;
        }
      }
      return acc + (countPerUnit * item.quantity);
    }, 0);
    const taperFee = totalTapers * 1.00;
    const deliveryFee = 0; // Costo por delivery se confirma por WhatsApp según distancia
    const total = subtotal + taperFee;

    return { subtotal, totalTapers, taperFee, deliveryFee, total };
  }, [items]);

  const contextValue = useMemo<CartContextValue>(
    () => ({
      items,
      cartItemList: items,
      isOpen,
      isCartDrawerOpen: isOpen,
      orderType,
      selectedZone,
      customerData,
      totals,
      totalQuantity,
      openCart: handleOpenCartDrawer,
      closeCart: handleCloseCartDrawer,
      toggleCart: handleToggleCartDrawer,
      addItem: handleAddItemToCart,
      addItemToCart: handleAddItemToCart,
      removeItem: handleRemoveItemFromCart,
      removeItemFromCart: handleRemoveItemFromCart,
      updateQuantity: handleUpdateItemQuantity,
      setQuantity: handleSetItemQuantity,
      clearCart: handleClearCartContents,
      setOrderType,
      setSelectedZone,
      updateCustomerData: handleUpdateCustomerFormData
    }),
    [
      items,
      isOpen,
      orderType,
      selectedZone,
      customerData,
      totals,
      totalQuantity,
      handleOpenCartDrawer,
      handleCloseCartDrawer,
      handleToggleCartDrawer,
      handleAddItemToCart,
      handleRemoveItemFromCart,
      handleUpdateItemQuantity,
      handleSetItemQuantity,
      handleClearCartContents,
      handleUpdateCustomerFormData
    ]
  );

  return <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>;
};

/**
 * Hook para acceder a la API pública del Carrito de Compras.
 */
export const useCart = (): CartContextValue => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart debe ser utilizado dentro de un CartProvider');
  }
  return context;
};

