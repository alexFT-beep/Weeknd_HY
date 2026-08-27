/**
 * @file CartDrawer.tsx
 * @description Panel lateral deslizable (Slide-over Drawer) que muestra los productos del carrito,
 * permite ajustar cantidades, seleccionar el método de entrega (Delivery/Mesa) y enviar la orden a WhatsApp.
 */

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Trash2, Plus, Minus, Send, MapPin, Utensils, CreditCard, Sparkles, User } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { DELIVERY_ZONES, PAYMENT_INFO } from '../../../data/fullMenuData';
import { whatsappOrderService } from '../../orders/services/whatsappOrderService';

/**
 * Componente interactivo del panel lateral del carrito de compras.
 */
export const CartDrawer: React.FC = () => {

  const {
    items,
    isOpen,
    orderType,
    selectedZone,
    customerData,
    totals,
    totalQuantity,
    closeCart,
    updateQuantity,
    removeItem,
    clearCart,
    setOrderType,
    setSelectedZone,
    updateCustomerData
  } = useCart();

  const handleSendWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();

    if (items.length === 0) return;

    if (!customerData.customerName.trim()) {
      alert('Por favor, ingresa tu nombre completo.');
      return;
    }

    if (!customerData.phone.trim()) {
      alert('Por favor, ingresa tu número telefónico / WhatsApp.');
      return;
    }

    if (orderType === 'delivery' && !customerData.address.trim()) {
      alert('Por favor, ingresa tu dirección exacta de entrega.');
      return;
    }

    whatsappOrderService.sendOrderViaWhatsApp({
      items,
      orderType,
      selectedZone,
      customerData,
      subtotal: totals.subtotal,
      totalTapers: totals.totalTapers,
      taperFee: totals.taperFee,
      deliveryFee: totals.deliveryFee,
      total: totals.total
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />

          {/* Drawer Container */}
          <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="w-screen max-w-md bg-[#0a0a0e] border-l border-white/10 text-white flex flex-col shadow-2xl"
            >
              {/* Drawer Header */}
              <div className="px-6 py-5 border-b border-white/10 flex items-center justify-between bg-zinc-950/80">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-[#c900ff]/10 border border-[#c900ff]/30 text-[#c900ff]">
                    <ShoppingBag className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="font-black text-lg uppercase tracking-wider text-white">Tu Pedido</h2>
                    <p className="text-xs text-gray-400 font-medium">
                      {totalQuantity} {totalQuantity === 1 ? 'producto seleccionado' : 'productos seleccionados'}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={closeCart}
                  className="p-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Drawer Body */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {/* Selector tipo de orden */}
                <div className="grid grid-cols-2 gap-2 bg-zinc-900/90 p-1.5 rounded-2xl border border-white/10">
                  <button
                    type="button"
                    onClick={() => setOrderType('delivery')}
                    className={`py-2 px-3 rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
                      orderType === 'delivery'
                        ? 'bg-[#c900ff] text-white shadow-[0_0_15px_rgba(201,0,255,0.5)]'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    <MapPin className="w-3.5 h-3.5" />
                    Delivery
                  </button>
                  <button
                    type="button"
                    onClick={() => setOrderType('mesa')}
                    className={`py-2 px-3 rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
                      orderType === 'mesa'
                        ? 'bg-[#c900ff] text-white shadow-[0_0_15px_rgba(201,0,255,0.5)]'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    <Utensils className="w-3.5 h-3.5" />
                    En Mesa
                  </button>
                </div>

                {/* Lista de productos */}
                {items.length === 0 ? (
                  <div className="text-center py-12 space-y-3">
                    <div className="w-16 h-16 rounded-full bg-zinc-900 border border-white/10 mx-auto flex items-center justify-center text-gray-500">
                      <ShoppingBag className="w-8 h-8 stroke-[1.5]" />
                    </div>
                    <p className="text-gray-400 text-sm font-medium">Tu carrito está vacío</p>
                    <p className="text-xs text-gray-500 max-w-xs mx-auto">
                      Explora la carta y agrega tus platillos y bebidas favoritas
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs text-gray-400 uppercase tracking-widest font-extrabold pb-1">
                      <span>Platillos</span>
                      <button
                        type="button"
                        onClick={clearCart}
                        className="text-red-400 hover:text-red-300 flex items-center gap-1 hover:underline"
                      >
                        <Trash2 className="w-3.5 h-3.5" /> Limpiar
                      </button>
                    </div>

                    {items.map(item => (
                      <div
                        key={item.product.id}
                        className="bg-zinc-900/60 border border-white/10 rounded-2xl p-3.5 flex items-center justify-between gap-3 group"
                      >
                        <div className="flex-1 min-w-0">
                          <h4 className="font-extrabold text-xs text-white uppercase truncate">
                            {item.product.name}
                          </h4>
                          <p className="text-[11px] text-[#c900ff] font-bold mt-0.5">
                            S/ {item.product.price.toFixed(2)} c/u
                          </p>
                        </div>

                        <div className="flex items-center gap-2">
                          <div className="flex items-center bg-black/50 border border-white/15 rounded-xl">
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.product.id, -1)}
                              className="p-1.5 hover:text-[#c900ff] transition-colors"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="w-6 text-center text-xs font-black">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.product.id, 1)}
                              className="p-1.5 hover:text-[#c900ff] transition-colors"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <button
                            type="button"
                            onClick={() => removeItem(item.product.id)}
                            className="p-1.5 text-gray-500 hover:text-red-400 transition-colors"
                            title="Eliminar producto"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Formulario de Pedido */}
                {items.length > 0 && (
                  <form onSubmit={handleSendWhatsApp} id="checkout-form" className="space-y-3.5 pt-4 border-t border-white/10">
                    {/* Encabezado de sección */}
                    <div className="flex items-center gap-2 text-gray-300">
                      <User className="w-4 h-4 text-gray-300 stroke-[2.5]" />
                      <h3 className="text-xs uppercase tracking-wider font-black text-gray-300">
                        {orderType === 'delivery' ? 'DATOS PARA EL DELIVERY' : 'DATOS PARA EL CONSUMO EN MESA'}
                      </h3>
                    </div>

                    <div className="space-y-2.5">
                      {/* Campo 1 (Texto): Tu Nombre completo * */}
                      <input
                        type="text"
                        required
                        placeholder="Tu Nombre completo *"
                        value={customerData.customerName}
                        onChange={e => updateCustomerData({ customerName: e.target.value })}
                        className="w-full bg-zinc-900/90 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-gray-500 focus:outline-none focus:border-[#c900ff] focus:ring-1 focus:ring-[#c900ff] transition-all"
                      />

                      {/* Campo 2 (Teléfono): Número telefónico / WhatsApp * */}
                      <input
                        type="tel"
                        required
                        placeholder="Número telefónico / WhatsApp *"
                        value={customerData.phone}
                        onChange={e => updateCustomerData({ phone: e.target.value })}
                        className="w-full bg-zinc-900/90 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-gray-500 focus:outline-none focus:border-[#c900ff] focus:ring-1 focus:ring-[#c900ff] transition-all"
                      />

                      {orderType === 'delivery' ? (
                        <>
                          {/* Selector compacto de Zona de Delivery justo antes o dentro de la dirección */}
                          <div className="relative flex items-center bg-zinc-900/90 border border-white/10 rounded-xl px-3 py-1.5 focus-within:border-[#c900ff] transition-all">
                            <MapPin className="w-3.5 h-3.5 text-[#c900ff] shrink-0 mr-2" />
                            <select
                              value={selectedZone.id}
                              onChange={e => {
                                const zone = DELIVERY_ZONES.find(z => z.id === e.target.value);
                                if (zone) setSelectedZone(zone);
                              }}
                              className="w-full bg-transparent text-xs text-white focus:outline-none cursor-pointer font-bold appearance-none py-1"
                            >
                              {DELIVERY_ZONES.map(zone => (
                                <option key={zone.id} value={zone.id} className="bg-zinc-950 text-white">
                                  Zona Delivery: {zone.name} (+S/ {zone.fee.toFixed(2)})
                                </option>
                              ))}
                            </select>
                            <span className="text-[10px] text-gray-400 pointer-events-none pr-1">▼</span>
                          </div>

                          {/* Campo 3 (Texto): Dirección exacta (Calle, Mz, Lt, Nro) * */}
                          <input
                            type="text"
                            required
                            placeholder="Dirección exacta (Calle, Mz, Lt, Nro) *"
                            value={customerData.address}
                            onChange={e => updateCustomerData({ address: e.target.value })}
                            className="w-full bg-zinc-900/90 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-gray-500 focus:outline-none focus:border-[#c900ff] focus:ring-1 focus:ring-[#c900ff] transition-all"
                          />

                          {/* Campo 4 (Texto): Referencia de ubicación (ej: al frente de sanny) */}
                          <input
                            type="text"
                            placeholder="Referencia de ubicación (ej: al frente de sanny)"
                            value={customerData.reference}
                            onChange={e => updateCustomerData({ reference: e.target.value })}
                            className="w-full bg-zinc-900/90 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-gray-500 focus:outline-none focus:border-[#c900ff] focus:ring-1 focus:ring-[#c900ff] transition-all"
                          />
                        </>
                      ) : (
                        <input
                          type="text"
                          placeholder="Número de Mesa o ubicación en local *"
                          value={customerData.tableNumber}
                          onChange={e => updateCustomerData({ tableNumber: e.target.value })}
                          className="w-full bg-zinc-900/90 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-gray-500 focus:outline-none focus:border-[#c900ff] focus:ring-1 focus:ring-[#c900ff] transition-all"
                        />
                      )}

                      {/* Selector (Dropdown): Método de Pago Preferido */}
                      <div>
                        <label className="block text-[11px] uppercase tracking-wider font-extrabold text-gray-300 mb-1">
                          Método de Pago Preferido
                        </label>
                        <select
                          value={customerData.paymentMethod}
                          onChange={e => updateCustomerData({ paymentMethod: e.target.value })}
                          className="w-full bg-zinc-900/90 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#c900ff] focus:ring-1 focus:ring-[#c900ff] transition-all cursor-pointer font-medium"
                        >
                          <option value="Yape (QR / Billetera)" className="bg-zinc-950 text-white">Yape (QR / Billetera)</option>
                          <option value="Plin" className="bg-zinc-950 text-white">Plin</option>
                          <option value="Efectivo contra entrega" className="bg-zinc-950 text-white">Efectivo contra entrega</option>
                          <option value="Transferencia BCP/BBVA" className="bg-zinc-950 text-white">Transferencia BCP/BBVA</option>
                        </select>
                      </div>

                      {/* Campo 5 (Textarea/Input): Observaciones generales para cocina / delivery... */}
                      <textarea
                        rows={2}
                        placeholder="Observaciones generales para cocina / delivery..."
                        value={customerData.notes}
                        onChange={e => updateCustomerData({ notes: e.target.value })}
                        className="w-full bg-zinc-900/90 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-gray-500 focus:outline-none focus:border-[#c900ff] focus:ring-1 focus:ring-[#c900ff] transition-all resize-none"
                      />
                    </div>
                  </form>
                )}
              </div>

              {/* Drawer Footer / Resumen de Totales */}
              {items.length > 0 && (
                <div className="p-6 border-t border-white/10 bg-zinc-950/90 space-y-4">
                  <div className="space-y-1.5 text-xs text-gray-300">
                    <div className="flex justify-between">
                      <span>Subtotal Platillos:</span>
                      <span className="font-bold">S/ {totals.subtotal.toFixed(2)}</span>
                    </div>

                    {totals.taperFee > 0 && (
                      <div className="flex justify-between text-amber-300/90">
                        <span>📦 Envases / Táperes ({totals.totalTapers} und):</span>
                        <span className="font-bold">+S/ {totals.taperFee.toFixed(2)}</span>
                      </div>
                    )}

                    {orderType === 'delivery' && (
                      <div className="flex justify-between">
                        <span>Delivery ({selectedZone.name}):</span>
                        <span className="font-bold text-[#c900ff]">+S/ {totals.deliveryFee.toFixed(2)}</span>
                      </div>
                    )}

                    <div className="flex justify-between text-sm font-black text-white pt-2 border-t border-white/10">
                      <span>TOTAL A PAGAR:</span>
                      <span className="text-base text-[#c900ff]">S/ {totals.total.toFixed(2)}</span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    form="checkout-form"
                    className="w-full py-3.5 bg-gradient-to-r from-[#c900ff] to-[#e000ff] hover:from-[#d51aff] hover:to-[#eb33ff] text-white font-extrabold text-xs uppercase tracking-widest rounded-2xl flex items-center justify-center gap-2 transition-all duration-300 shadow-[0_0_20px_rgba(201,0,255,0.5)] hover:shadow-[0_0_28px_rgba(201,0,255,0.85)] active:scale-95 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    Enviar Pedido por WhatsApp
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};
