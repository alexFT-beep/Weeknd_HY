/**
 * @file ReservaPage.tsx
 * @description Página de Reserva de Mesas y Eventos Especiales en Weekend Huarmey.
 * Totalmente optimizada y adaptable a dispositivos móviles, tablets y desktop.
 */

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Send, Calendar, Clock, Users, HeartHandshake, ShieldCheck, Sparkles } from 'lucide-react';
import { PAYMENT_INFO } from '../data/fullMenuData';
import capyKamehameha from '../assets/capybaras/capybara_kamehameha_pose_VECTOR.webp';
import capyHero from '../assets/capybaras/superhero_capibara_landing_VECTOR.webp';

/** Horarios de atención disponibles para reservar */
const TIME_SLOTS = [
  '06:00 PM', '06:30 PM', '07:00 PM', '07:30 PM',
  '08:00 PM', '08:30 PM', '09:00 PM', '09:30 PM',
  '10:00 PM', '10:30 PM', '11:00 PM', '11:30 PM'
];

export const ReservaPage: React.FC = () => {
  const [form, setForm] = useState({
    nombre: '',
    telefono: '',
    fecha: '',
    hora: '08:00 PM',
    personas: '2',
    motivo: 'Cena Casual'
  });

  const handleReserve = (e: React.FormEvent) => {
    e.preventDefault();
    let msg = `*🪑 ¡NUEVA RESERVA DE MESA EN WEEKEND!*\n\n`;
    msg += `👤 *Nombre:* ${form.nombre.trim()}\n`;
    msg += `📱 *Teléfono:* ${form.telefono.trim()}\n`;
    msg += `📅 *Fecha:* ${form.fecha}\n`;
    msg += `⏰ *Hora:* ${form.hora}\n`;
    msg += `👥 *Personas:* ${form.personas} persona(s)\n`;
    msg += `🎉 *Motivo:* ${form.motivo}\n\n`;
    msg += `Por favor, confirmen disponibilidad. ¡Muchas gracias!`;

    const encoded = encodeURIComponent(msg);
    const url = `https://api.whatsapp.com/send?phone=${PAYMENT_INFO.whatsappNumber}&text=${encoded}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="pt-20 sm:pt-24 lg:pt-28 pb-12 sm:pb-16 px-3 sm:px-6 lg:px-8 min-h-screen w-full bg-[#07070a] text-white flex flex-col justify-between relative overflow-x-hidden">
      {/* Fondo Supabase fondoReservas.webp */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-40 sm:opacity-60 overflow-hidden">
        <img
          src="https://wdirdbryxwtbnprbrkvh.supabase.co/storage/v1/object/public/The_Weeknd/fondoReservas.webp"
          alt="Fondo Reservas"
          className="w-full h-full object-cover object-center filter brightness-[1.1] saturate-125 contrast-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80" />
      </div>

      <main className="flex-1 relative py-4 sm:py-8 flex items-center justify-center z-10 w-full max-w-7xl mx-auto">
        {/* Glow ambient background lights */}
        <div className="absolute top-1/4 left-1/4 w-72 sm:w-96 h-72 sm:h-96 bg-[#C900FF]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-72 sm:w-96 h-72 sm:h-96 bg-[#0acc80]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 w-full">
          <div className="relative flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-8">
            {/* Capibara Izquierda (Desktop) */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="hidden lg:block relative w-64 xl:w-72 flex-shrink-0 z-20 pointer-events-none"
            >
              <div className="absolute -inset-4 rounded-full bg-[#C900FF]/25 blur-2xl pulse-glow" />
              <img
                src={capyKamehameha}
                alt="Capibara pose kamehameha"
                className="relative w-full drop-shadow-[0_0_35px_rgba(201,0,255,0.45)] float-anim"
              />
            </motion.div>

            {/* Módulo de Reserva Responsivo */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="w-full max-w-lg sm:max-w-xl bg-zinc-900/90 backdrop-blur-xl p-5 sm:p-7 md:p-8 rounded-3xl border border-[#C900FF]/40 shadow-[0_0_40px_rgba(201,0,255,0.3)] relative z-10"
            >
              {/* Header de la Tarjeta */}
              <div className="text-center mb-5 sm:mb-6">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0acc80]/15 border border-[#0acc80]/40 text-[#0acc80] text-[10px] sm:text-[11px] font-black uppercase tracking-widest mb-2 shadow-sm">
                  <Phone className="w-3.5 h-3.5 shrink-0" />
                  <span>WhatsApp: +51 961 336 674</span>
                </div>
                
                <h2 className="text-[#C900FF] text-[11px] sm:text-xs font-black tracking-[0.25em] uppercase mb-1 font-display flex items-center justify-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  PLANIFICA TU NOCHE
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                </h2>
                
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase mb-1.5 leading-tight font-display">
                  Reserva tu <span className="text-[#C900FF] drop-shadow-[0_0_12px_rgba(201,0,255,0.7)]">Mesa</span>
                </h3>
                
                <p className="text-zinc-300 text-xs sm:text-sm font-medium max-w-sm mx-auto">
                  Completa tus datos para confirmar tu mesa en Weekend Huarmey.
                </p>
              </div>

              {/* Formulario */}
              <form onSubmit={handleReserve} className="space-y-3.5 text-xs sm:text-sm">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-widest text-zinc-400 font-extrabold">
                      Nombre Completo *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Tu nombre completo"
                      className="w-full bg-black/70 border border-white/15 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm focus:outline-none focus:border-[#C900FF] focus:ring-1 focus:ring-[#C900FF] transition-all text-white placeholder:text-zinc-500"
                      value={form.nombre}
                      onChange={e => setForm({ ...form, nombre: e.target.value })}
                    />
                  </div>
                  
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-widest text-zinc-400 font-extrabold">
                      Teléfono / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="Ej: 961 336 674"
                      className="w-full bg-black/70 border border-white/15 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm focus:outline-none focus:border-[#C900FF] focus:ring-1 focus:ring-[#C900FF] transition-all text-white placeholder:text-zinc-500"
                      value={form.telefono}
                      onChange={e => setForm({ ...form, telefono: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-widest text-zinc-400 font-extrabold flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-[#C900FF]" /> Fecha *
                    </label>
                    <input
                      type="date"
                      required
                      className="w-full bg-black/70 border border-white/15 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm focus:outline-none focus:border-[#C900FF] focus:ring-1 focus:ring-[#C900FF] transition-all text-white cursor-pointer"
                      value={form.fecha}
                      onChange={e => setForm({ ...form, fecha: e.target.value })}
                    />
                  </div>
                  
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-widest text-zinc-400 font-extrabold flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[#C900FF]" /> Hora de llegada
                    </label>
                    <select
                      className="w-full bg-black/70 border border-white/15 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm focus:outline-none focus:border-[#C900FF] focus:ring-1 focus:ring-[#C900FF] transition-all cursor-pointer text-white"
                      value={form.hora}
                      onChange={e => setForm({ ...form, hora: e.target.value })}
                    >
                      {TIME_SLOTS.map(t => (
                        <option key={t} value={t} className="bg-zinc-950 text-white">{t}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-widest text-zinc-400 font-extrabold flex items-center gap-1">
                      <Users className="w-3.5 h-3.5 text-[#C900FF]" /> Cantidad de Personas *
                    </label>
                    <input
                      type="number"
                      required
                      min="1"
                      placeholder="Ej: 4"
                      className="w-full bg-black/70 border border-white/15 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm focus:outline-none focus:border-[#C900FF] focus:ring-1 focus:ring-[#C900FF] transition-all text-white placeholder:text-zinc-500"
                      value={form.personas}
                      onChange={e => setForm({ ...form, personas: e.target.value })}
                    />
                  </div>
                  
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-widest text-zinc-400 font-extrabold flex items-center gap-1">
                      <HeartHandshake className="w-3.5 h-3.5 text-[#C900FF]" /> Motivo
                    </label>
                    <select
                      className="w-full bg-black/70 border border-white/15 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm focus:outline-none focus:border-[#C900FF] focus:ring-1 focus:ring-[#C900FF] transition-all cursor-pointer text-white"
                      value={form.motivo}
                      onChange={e => setForm({ ...form, motivo: e.target.value })}
                    >
                      <option value="Cena Casual" className="bg-zinc-950 text-white">Cena Casual</option>
                      <option value="Cumpleaños" className="bg-zinc-950 text-white">Cumpleaños</option>
                      <option value="Aniversario" className="bg-zinc-950 text-white">Aniversario</option>
                      <option value="Evento Corporativo" className="bg-zinc-950 text-white">Evento Corporativo</option>
                      <option value="Noche de Patas" className="bg-zinc-950 text-white">Noche de Patas</option>
                      <option value="Otro" className="bg-zinc-950 text-white">Otro</option>
                    </select>
                  </div>
                </div>

                {/* Políticas del servicio */}
                <div className="rounded-2xl border border-[#C900FF]/35 bg-[#C900FF]/10 p-3 sm:p-3.5 space-y-1 mt-2">
                  <p className="text-[#C900FF] text-[10px] sm:text-[11px] font-black uppercase tracking-wider font-display flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" /> Políticas del servicio
                  </p>
                  <p className="text-zinc-300 text-[11px] leading-relaxed">
                    • <span className="text-white font-bold">Tolerancia:</span> 10 a 15 minutos; transcurrido este tiempo, la mesa pasará a estar disponible.
                  </p>
                  <p className="text-zinc-300 text-[11px] leading-relaxed">
                    • <span className="text-white font-bold">Restricción:</span> No se permite el ingreso de alimentos ni bebidas ajenos al local.
                  </p>
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.96 }}
                  className="w-full py-3.5 sm:py-4 bg-gradient-to-r from-[#c900ff] via-[#d500f9] to-[#e000ff] text-white font-black uppercase tracking-[0.2em] rounded-2xl flex items-center justify-center gap-2 text-xs sm:text-sm shadow-[0_0_25px_rgba(201,0,255,0.6)] hover:shadow-[0_0_35px_rgba(201,0,255,0.9)] transition-all cursor-pointer mt-3"
                >
                  <span>Reservar por WhatsApp</span>
                  <Send className="w-4 h-4" />
                </motion.button>
              </form>
            </motion.div>

            {/* Capibara Derecha (Desktop) */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="hidden lg:block relative w-64 xl:w-72 flex-shrink-0 z-20 pointer-events-none"
            >
              <div className="absolute -inset-4 rounded-full bg-[#C900FF]/25 blur-2xl pulse-glow" />
              <img
                src={capyHero}
                alt="Capibara superhéroe"
                className="relative w-full drop-shadow-[0_0_35px_rgba(201,0,255,0.45)] float-anim"
              />
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ReservaPage;
