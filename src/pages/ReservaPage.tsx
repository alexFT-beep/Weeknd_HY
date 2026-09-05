/**
 * @file ReservaPage.tsx
 * @description Página de Reserva de Mesas y Eventos Especiales en Weekend Huarmey.
 * Permite seleccionar fecha, horario, número de personas y motivo de celebración,
 * procesando la solicitud directamente hacia la API de WhatsApp.
 */

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Send, Calendar, Clock, Users, HeartHandshake, ShieldCheck } from 'lucide-react';
import { PAYMENT_INFO } from '../data/fullMenuData';
import capyKamehameha from '../assets/capybaras/capybara_kamehameha_pose_VECTOR.webp';
import capyHero from '../assets/capybaras/superhero_capibara_landing_VECTOR.webp';

/** Horarios de atención disponibles para reservar */
const TIME_SLOTS = [
  '06:00 PM', '06:30 PM', '07:00 PM', '07:30 PM',
  '08:00 PM', '08:30 PM', '09:00 PM', '09:30 PM',
  '10:00 PM', '10:30 PM', '11:00 PM', '11:30 PM'
];

/** Componente de la página de reserva de mesa */
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
    const sanitize = (text: string) => text.replace(/[\u0000-\u001F\u007F-\u009F]/g, '').trim();
    const safeNombre = sanitize(form.nombre).slice(0, 80);
    const safeTelefono = sanitize(form.telefono).slice(0, 20);
    const safePersonas = Math.min(Math.max(1, parseInt(form.personas, 10) || 1), 50);

    let msg = `*🪑 ¡NUEVA RESERVA DE MESA EN WEEKEND!*\n\n`;
    msg += `👤 *Nombre:* ${safeNombre}\n`;
    msg += `📱 *Teléfono:* ${safeTelefono}\n`;
    msg += `📅 *Fecha:* ${form.fecha}\n`;
    msg += `⏰ *Hora:* ${form.hora}\n`;
    msg += `👥 *Personas:* ${safePersonas} persona(s)\n`;
    msg += `🎉 *Motivo:* ${form.motivo}\n\n`;
    msg += `Por favor, confirmen disponibilidad. ¡Muchas gracias!`;

    const encoded = encodeURIComponent(msg);
    const url = `https://api.whatsapp.com/send?phone=${PAYMENT_INFO.whatsappNumber}&text=${encoded}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="pt-28 pb-16 px-4 min-h-screen w-full bg-[#07070a] text-white flex flex-col justify-between relative bg-cover bg-center md:bg-top bg-no-repeat">
      {/* Fondo Supabase fondoReservas.webp */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-80">
        <img
          src="https://wdirdbryxwtbnprbrkvh.supabase.co/storage/v1/object/public/The_Weeknd/fondoReservas.webp"
          alt="Fondo Reservas"
          className="w-full h-full object-cover object-center md:object-top filter brightness-[1.25] saturate-125 contrast-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/20 to-black/50" />
      </div>

      <main className="flex-1 relative py-8 px-2 flex items-center justify-center z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#C900FF]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#C900FF]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-6xl mx-auto w-full">
          <div className="relative flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-8">
            {/* Capibara Izquierda */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative w-48 sm:w-64 lg:w-72 flex-shrink-0 -mb-8 lg:mb-0 z-20 pointer-events-none"
            >
              <div className="absolute -inset-4 rounded-full bg-[#C900FF]/25 blur-2xl pulse-glow" />
              <img
                src={capyKamehameha}
                alt="Capibara pose kamehameha"
                className="relative w-full drop-shadow-[0_0_35px_rgba(201,0,255,0.45)] animate-bounce-slow"
              />
            </motion.div>

            {/* Módulo de Reserva */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="w-full max-w-xl bg-zinc-900/85 backdrop-blur-xl p-6 sm:p-8 rounded-[32px] border border-[#C900FF]/40 shadow-[0_0_40px_rgba(201,0,255,0.35)] relative z-10"
            >
              <div className="text-center mb-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0acc80]/15 border border-[#0acc80]/40 text-[#0acc80] text-[11px] font-black uppercase tracking-widest mb-2">
                  <Phone className="w-3.5 h-3.5" />
                  <span>WhatsApp Directo: +51 961 336 674</span>
                </div>
                <h2 className="text-[#C900FF] text-xs font-bold tracking-[0.3em] uppercase mb-1 font-display">
                  Planifica tu noche
                </h2>
                <h3 className="text-2xl sm:text-4xl font-black uppercase mb-2 leading-tight font-display">
                  Reserva tu <span className="text-[#C900FF] font-black">Mesa</span>
                </h3>
                <p className="text-white/60 text-xs sm:text-sm">
                  Completa tus datos o escríbenos directo a WhatsApp.
                </p>
              </div>

              <form onSubmit={handleReserve} className="space-y-4 text-xs">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold">
                      Nombre Completo
                    </label>
                    <input
                      type="text"
                      required
                      maxLength={80}
                      placeholder="Tu nombre"
                      className="w-full bg-black/60 border border-white/10 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-[#C900FF] transition-all text-white"
                      value={form.nombre}
                      onChange={e => setForm({ ...form, nombre: e.target.value })}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold">
                      Teléfono
                    </label>
                    <input
                      type="tel"
                      required
                      maxLength={20}
                      placeholder="Ej: 961 336 674"
                      className="w-full bg-black/60 border border-white/10 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-[#C900FF] transition-all text-white"
                      value={form.telefono}
                      onChange={e => setForm({ ...form, telefono: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-[#C900FF]" /> Fecha
                    </label>
                    <input
                      type="date"
                      required
                      className="w-full bg-black/60 border border-white/10 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-[#C900FF] transition-all text-white"
                      value={form.fecha}
                      onChange={e => setForm({ ...form, fecha: e.target.value })}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[#C900FF]" /> Hora de llegada
                    </label>
                    <select
                      className="w-full bg-black/60 border border-white/10 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-[#C900FF] transition-all cursor-pointer text-white"
                      value={form.hora}
                      onChange={e => setForm({ ...form, hora: e.target.value })}
                    >
                      {TIME_SLOTS.map(t => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold flex items-center gap-1">
                      <Users className="w-3 h-3 text-[#C900FF]" /> Cantidad de Personas
                    </label>
                    <input
                      type="number"
                      required
                      min="1"
                      max="50"
                      placeholder="Ej: 4"
                      className="w-full bg-black/60 border border-white/10 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-[#C900FF] transition-all text-white"
                      value={form.personas}
                      onChange={e => setForm({ ...form, personas: e.target.value })}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold flex items-center gap-1">
                      <HeartHandshake className="w-3 h-3 text-[#C900FF]" /> Motivo
                    </label>
                    <select
                      className="w-full bg-black/60 border border-white/10 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-[#C900FF] transition-all cursor-pointer text-white"
                      value={form.motivo}
                      onChange={e => setForm({ ...form, motivo: e.target.value })}
                    >
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
                  <p className="text-[#C900FF] text-[10px] font-bold uppercase tracking-[0.2em] font-display flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" /> Políticas del servicio
                  </p>
                  <p className="text-white/60 text-[11px] leading-relaxed">
                    • <span className="text-white/90 font-semibold">Tolerancia de reserva:</span> 10 a 15 minutos; transcurrido este tiempo, la mesa pasará a estar disponible.
                  </p>
                  <p className="text-white/60 text-[11px] leading-relaxed">
                    • <span className="text-white/90 font-semibold">Restricción:</span> No se permite el ingreso de alimentos ni bebidas ajenos al establecimiento.
                  </p>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#C900FF] text-white font-black uppercase tracking-[0.2em] rounded-xl hover:bg-white hover:text-[#C900FF] active:scale-95 transition-all flex items-center justify-center gap-2 text-xs shadow-[0_0_25px_rgba(201,0,255,0.5)] cursor-pointer"
                >
                  <span>Reservar por WhatsApp</span>
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </motion.div>

            {/* Capibara Derecha */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative w-48 sm:w-64 lg:w-72 flex-shrink-0 -mt-8 lg:mt-0 z-20 pointer-events-none"
            >
              <div className="absolute -inset-4 rounded-full bg-[#C900FF]/25 blur-2xl pulse-glow" />
              <img
                src={capyHero}
                alt="Capibara superhéroe"
                className="relative w-full drop-shadow-[0_0_35px_rgba(201,0,255,0.45)] animate-bounce-slow"
              />
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
};

