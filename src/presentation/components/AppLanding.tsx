// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { 
  Menu, X, Instagram, Facebook, Phone, MapPin, Clock, CreditCard, ChevronRight, Send, Smartphone, Calendar
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const CONTACT_WA = "51961336674";
const LOGO_URL = "https://res.cloudinary.com/dwlzez9mr/image/upload/f_auto,q_auto/v1774383788/LOGO_wgvqfj.webp";
const HERO_IMG = "https://res.cloudinary.com/dwlzez9mr/image/upload/f_auto,q_auto/v1774380039/logo2_vyasrd.webp";
const MENU_VID = "https://res.cloudinary.com/dwlzez9mr/video/upload/f_auto,q_auto/v1774380723/alitas2_upllif.webm";
const DELIVERY_IMG = "https://res.cloudinary.com/dwlzez9mr/image/upload/f_auto,q_auto/v1771715674/makis-weekend_fxfha7.jpg";
const RESERVA_IMG = "https://res.cloudinary.com/dwlzez9mr/image/upload/f_auto,q_auto/v1774381246/reserva_dxdyyt.webp";
const FOOTER_IMG = "https://res.cloudinary.com/dwlzez9mr/image/upload/f_auto,q_auto/v1774380038/piepag_lni8ko.webp";
const MOBILE_VID = "https://res.cloudinary.com/dwlzez9mr/video/upload/f_auto,q_auto/v1774380798/hambur2_lhdl97.webm";
const CARTA_PDF = "https://res.cloudinary.com/dwlzez9mr/image/upload/v1771786883/WEKEEND_CARTA_2026_aew47m.pdf";

const NAV_LINKS = [
  { name: 'Inicio', href: '#inicio' },
  { name: 'Menú', href: '#menu' },
  { name: 'Reserva', href: '#reserva' },
  { name: 'Delivery', href: '#delivery' },
  { name: 'Ubicación', href: '#ubicacion' },
  { name: 'Contacto', href: '#contacto' },
];

const TIME_SLOTS = [
  '05:00 PM', '05:30 PM', '06:00 PM', '06:30 PM', '07:00 PM', '07:30 PM',
  '08:00 PM', '08:30 PM', '09:00 PM', '09:30 PM', '10:00 PM', '10:30 PM',
  '11:00 PM', '11:30 PM', '12:00 AM', '12:30 AM', '01:00 AM', '01:30 AM',
  '02:00 AM', '02:30 AM', '03:00 AM'
];

export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showInteractiveMenu, setShowInteractiveMenu] = useState(false);

  const [form, setForm] = useState({
    nombre: '',
    fecha: '',
    hora: '05:00 PM',
    personas: '',
    motivo: ''
  });

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  return (
    <div className="min-h-screen font-sans selection:bg-weekend-neon selection:text-black">
      <header 
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled ? 'bg-black/90 backdrop-blur-md py-2 border-b border-white/10' : 'bg-transparent py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img 
              src={LOGO_URL} 
              alt="Logo" 
              className="h-12 w-12 rounded-full object-cover border border-weekend-purple"
              referrerPolicy="no-referrer"
            />
            <a href="/" className="text-white font-bold tracking-tighter text-lg uppercase hidden xl:block hover:text-weekend-neon transition-colors duration-500">
              The Weekend! - huarmey
            </a>
          </div>

          <nav className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <motion.a 
                key={link.name} 
                href={link.href} 
                onClick={() => {
                  if (link.name === 'Menú') {
                    setShowInteractiveMenu(true);
                  }
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="text-sm uppercase tracking-widest font-bold hover:text-weekend-neon transition-all duration-500"
              >
                {link.name}
              </motion.a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button 
              type="button"
              data-action="open-search"
              className="text-weekend-neon hover:opacity-80 transition-opacity active:scale-95 duration-150 p-2 flex items-center justify-center rounded-xl bg-zinc-900/80 border border-white/10 hover:border-weekend-neon"
              title="Buscar en la carta"
            >
              <span className="material-symbols-outlined text-[20px]">search</span>
            </button>

            <button 
              type="button"
              data-action="open-cart"
              className="text-black font-bold bg-weekend-neon hover:bg-weekend-purple transition-all active:scale-95 duration-150 px-3 py-1.5 rounded-xl flex items-center gap-1.5 text-xs uppercase"
              title="Ver Carrito"
            >
              <span className="material-symbols-outlined text-[18px]">shopping_cart</span>
              <span className="hidden sm:inline">Carrito</span>
            </button>

            <button 
              className={`lg:hidden p-2 transition-colors duration-500 z-50 ${isOpen ? 'text-weekend-purple' : 'text-white'}`}
              onClick={() => setIsOpen(!isOpen)}
            >
              <motion.div
                animate={isOpen ? { rotate: 90 } : { rotate: 0 }}
                transition={{ duration: 0.3 }}
              >
                {isOpen ? <X size={28} /> : <Menu size={28} />}
              </motion.div>
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-40 bg-black flex flex-col items-center justify-center gap-6 landscape:gap-4 md:hidden overflow-y-auto"
          >
            <div className="absolute inset-0 z-0">
              <video 
                autoPlay 
                muted 
                loop 
                playsInline 
                className="w-full h-full object-cover opacity-60"
              >
                <source src={MOBILE_VID} type="video/webm" />
              </video>
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black"></div>
            </div>

            <div className="relative z-10 flex flex-col items-center gap-6 landscape:gap-3 py-10">
              {NAV_LINKS.map((link) => (
                <motion.a 
                  key={link.name} 
                  href={link.href} 
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => {
                    if (link.name === 'Menú') {
                      setShowInteractiveMenu(true);
                    }
                    setIsOpen(false);
                  }}
                  className="text-xl landscape:text-lg uppercase tracking-widest font-bold hover:text-weekend-neon transition-colors duration-500"
                >
                  {link.name}
                </motion.a>
              ))}
            </div>

            <div className="absolute bottom-8 landscape:hidden left-0 w-full text-center z-10">
              <p className="text-weekend-purple text-xs font-bold uppercase tracking-[0.3em] mb-1">the weekend!</p>
              <p className="text-weekend-neon text-[10px] font-bold uppercase tracking-[0.4em]">- huarmey -</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <section id="inicio" className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={HERO_IMG} 
            alt="Hero" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black"></div>
        </div>

        <div className="relative z-10 max-w-4xl px-4 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-7xl font-black uppercase tracking-tighter mb-6 leading-none"
          >
            Donde la noche <span className="text-weekend-neon">cobra vida</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl text-white mb-10 max-w-2xl mx-auto font-semibold drop-shadow-lg"
          >
            Tu fin de semana empieza aquí, llegaste al lugar donde lo sofisticado se quita la corbata y se deja llevar por el ambiente casual de una noche fina pero divertida.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4"
          >
            <button 
              onClick={() => document.getElementById('reserva')?.scrollIntoView({ behavior: 'smooth' })}
              className="w-full sm:w-auto px-8 py-4 border-2 border-weekend-neon text-weekend-neon font-bold uppercase tracking-widest rounded-full hover:bg-weekend-neon hover:text-black transition-all duration-300 neon-glow"
            >
              Reservar Ahora
            </button>
            <button 
              onClick={() => document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })}
              className="w-full sm:w-auto px-8 py-4 border-2 border-weekend-neon text-weekend-neon font-bold uppercase tracking-widest rounded-full hover:bg-weekend-neon hover:text-black transition-all duration-300"
            >
              Ver Menú
            </button>
            <button 
              onClick={handleDelivery}
              className="w-full sm:w-auto px-8 py-4 border-2 border-weekend-neon text-weekend-neon font-bold uppercase tracking-widest rounded-full hover:bg-weekend-neon hover:text-black transition-all duration-300"
            >
              Pedir Delivery
            </button>
          </motion.div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronRight className="rotate-90 text-weekend-neon" size={32} />
        </div>
      </section>

      <section id="menu" className="relative py-24 overflow-hidden min-h-[80vh] flex flex-col items-center justify-center">
        <div className="absolute inset-0 z-0">
          <video 
            autoPlay 
            muted 
            loop 
            playsInline 
            className="w-full h-full object-cover opacity-50 pointer-events-none"
          >
            <source src={MENU_VID} type="video/webm" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <h2 className="text-weekend-fuchsia text-sm font-bold tracking-[0.3em] uppercase mb-4">Nuestra Propuesta</h2>
            <h3 className="text-4xl md:text-6xl font-black uppercase mb-6">La Carta</h3>
            <p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto leading-relaxed mb-8">
              Alitas en más de 20 salsas artesanales, piqueos criollos, hamburguesas gourmet, pastas y makis maridados con coctelería de autor.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex justify-center"
          >
            <button 
              type="button"
              onClick={() => {
                setShowInteractiveMenu(true);
                setTimeout(() => {
                  document.getElementById('carta-digital')?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }}
              className="group relative inline-flex items-center gap-3 px-10 py-5 bg-weekend-neon text-black font-black uppercase tracking-widest rounded-full hover:bg-weekend-purple transition-all duration-500 shadow-[0_0_30px_rgba(191,227,83,0.4)] cursor-pointer active:scale-95"
            >
              <span className="relative z-10 text-base">Ver Carta Digital</span>
              <ChevronRight className="relative z-10 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </div>

        {/* Dynamic Hexagonal Carta Container */}
        <div 
          id="carta-digital" 
          className={`w-full max-w-7xl mx-auto px-4 mt-12 transition-all duration-700 ${
            showInteractiveMenu ? 'block opacity-100' : 'hidden opacity-0'
          }`}
        >
          {/* Sticky Category Chips Nav */}
          <div className="overflow-x-auto no-scrollbar py-sm sticky top-16 z-40 bg-zinc-950/95 backdrop-blur-md border border-white/10 mb-6 rounded-2xl p-2 shadow-2xl">
            <div id="category-chips-nav" className="flex space-x-2 w-max px-2">
              {/* Injected dynamically by MenuController */}
            </div>
          </div>

          {/* Dynamic Menu Sections Container */}
          <div id="menu-sections-container" className="text-left">
            {/* Injected dynamically by MenuController */}
          </div>
        </div>
      </section>

      <section id="reserva" className="relative py-24">
        <div className="absolute inset-0 z-0">
          <img 
            src={RESERVA_IMG} 
            alt="Reserva" 
            className="w-full h-full object-cover opacity-70"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black/30 to-black"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-weekend-purple text-sm font-bold tracking-[0.3em] uppercase mb-4">Planifica tu noche</h2>
              <h3 className="text-4xl md:text-6xl font-black uppercase mb-8 leading-tight">Asegura tu <span className="text-weekend-purple">Mesa</span></h3>
              <p className="text-white/60 text-base md:text-lg mb-8 leading-relaxed">
                Vive la experiencia completa en The Weekend. Ya sea para un cumpleaños, una cita o una salida con amigos, reserva con anticipación y déjanos encargarnos del resto.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-weekend-purple/20 rounded-xl text-weekend-purple shrink-0">
                    <Clock size={24} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold uppercase text-sm tracking-wider mb-1">Horario de Atención</h4>
                    <p className="text-white/50 text-sm md:text-base">Abierto diariamente de 5:00 PM a 3:00 AM</p>
                    <div className="mt-4 flex items-start sm:items-center gap-2 text-weekend-neon">
                      <Phone size={18} className="shrink-0 mt-0.5 sm:mt-0" />
                      <span className="text-xs sm:text-sm font-medium leading-tight">
                        Contacto para consultas: <span className="whitespace-nowrap">+51 961 336 674</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-zinc-900/50 backdrop-blur-xl p-8 md:p-12 rounded-3xl border border-white/10 neon-glow-purple"
            >
              <form onSubmit={handleReserve} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-white/40 font-bold">Nombre</label>
                    <input 
                      type="text" 
                      required
                      placeholder="Tu nombre"
                      className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-weekend-purple transition-colors"
                      value={form.nombre}
                      onChange={(e) => setForm({...form, nombre: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-white/40 font-bold">Fecha</label>
                    <input 
                      type="date" 
                      required
                      className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-weekend-purple transition-colors"
                      value={form.fecha}
                      onChange={(e) => setForm({...form, fecha: e.target.value})}
                    />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-white/40 font-bold">Personas</label>
                    <input 
                      type="number" 
                      required
                      placeholder="Cantidad"
                      className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-weekend-purple transition-colors"
                      value={form.personas}
                      onChange={(e) => setForm({...form, personas: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-white/40 font-bold">Hora de llegada</label>
                    <select 
                      className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-weekend-purple transition-colors appearance-none cursor-pointer"
                      value={form.hora}
                      onChange={(e) => setForm({...form, hora: e.target.value})}
                    >
                      {TIME_SLOTS.map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-white/40 font-bold">Motivo</label>
                  <select 
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-weekend-purple transition-colors appearance-none"
                    value={form.motivo}
                    onChange={(e) => setForm({...form, motivo: e.target.value})}
                  >
                    <option value="">Seleccionar</option>
                    <option value="Cena Casual">Cena Casual</option>
                    <option value="Cumpleaños">Cumpleaños</option>
                    <option value="Aniversario">Aniversario</option>
                    <option value="Evento Corporativo">Evento Corporativo</option>
                    <option value="Otro">Otro</option>
                  </select>
                </div>

                <button 
                  type="submit"
                  className="w-full py-4 bg-weekend-purple text-white font-black uppercase tracking-[0.2em] rounded-xl hover:bg-weekend-purple/80 transition-all flex items-center justify-center gap-3"
                >
                  Reservar por WhatsApp <Send size={20} />
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      <section id="delivery" className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={DELIVERY_IMG} 
            alt="Delivery" 
            className="w-full h-full object-cover opacity-70"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black/10 to-black"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex flex-col items-center"
          >
            <Smartphone className="text-weekend-neon mb-6" size={48} />
            <h3 className="text-3xl md:text-5xl font-black uppercase mb-4">¿Prefieres quedarte en casa?</h3>
            <p className="text-white/60 mb-10 max-w-xl">Llevamos el sabor de The Weekend directo a tu puerta. Rápido, seguro y delicioso.</p>
            <button 
              onClick={handleDelivery}
              className="px-12 py-5 border-2 border-weekend-neon text-weekend-neon font-black uppercase tracking-widest rounded-full hover:bg-weekend-neon hover:text-black transition-all duration-300 flex items-center gap-3"
            >
              Pedir Delivery por WhatsApp
            </button>
          </motion.div>
        </div>
      </section>

      <section id="ubicacion" className="py-24 bg-black">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-weekend-neon text-sm font-bold tracking-[0.3em] uppercase mb-4">Encuéntranos</h2>
            <h3 className="text-4xl md:text-6xl font-black uppercase mb-6">Ubicación</h3>
            <div className="flex items-center justify-center gap-2 text-white/60">
              <MapPin size={20} className="text-weekend-neon" />
              <p>Av. Cabo 140, Huarmey 02651</p>
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative rounded-3xl overflow-hidden border border-weekend-neon/30 neon-glow h-[500px]"
          >
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d245.6409801721048!2d-78.15328299958676!3d-10.068675181619353!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91aa17e1bee947c9%3A0xda6d1058bd817a98!2sWeekend%20Huarmey!5e0!3m2!1ses!2spe!4v1772137403381!5m2!1ses!2spe"
              className="w-full h-full border-0 dark-map"
              allowFullScreen
              title="Maps"
            ></iframe>
          </motion.div>
        </div>
      </section>

      <footer id="contacto" className="relative pt-24 pb-12 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={FOOTER_IMG} 
            alt="Footer" 
            className="w-full h-full object-cover opacity-70"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-black"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
            <div className="col-span-1 lg:col-span-1">
              <div className="flex items-center gap-3 mb-6">
                <img 
                  src={LOGO_URL} 
                  alt="Logo" 
                  className="h-10 w-10 rounded-full object-cover border border-weekend-purple"
                  referrerPolicy="no-referrer"
                />
                <span className="text-white font-bold tracking-tighter text-lg uppercase">The Weekend! - huarmey</span>
              </div>
              <p className="text-white/50 text-sm leading-relaxed mb-6">
                El espacio donde la alta cocina se encuentra con el ritmo más sofisticado de la ciudad.
              </p>
              <div className="space-y-4">
                <p className="text-weekend-neon font-bold uppercase tracking-widest text-xs">¡Síguenos!</p>
                <div className="flex items-center gap-4">
                  <a href="https://www.facebook.com/p/Weekend-Huarmey-100075916407028/?checkpoint_src=any" target="_blank" rel="noopener noreferrer" className="p-3 bg-white/5 rounded-full hover:bg-weekend-purple transition-colors">
                    <Facebook size={20} />
                  </a>
                  <a href="https://www.instagram.com/weekend_huarmey/" target="_blank" rel="noopener noreferrer" className="p-3 bg-white/5 rounded-full hover:bg-weekend-fuchsia transition-colors">
                    <Instagram size={20} />
                  </a>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-white font-bold uppercase tracking-widest text-sm mb-6">Horario</h4>
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-white/50">
                  <Clock size={18} className="text-weekend-neon" />
                  <span className="text-sm">Diariamente: 5:00 PM - 3:00 AM</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-white font-bold uppercase tracking-widest text-sm mb-6">Métodos de Pago</h4>
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-white/50">
                  <CreditCard size={18} className="text-weekend-purple" />
                  <span className="text-sm">Aceptamos todos los bancos y pagos digitales</span>
                </div>
                <div className="flex flex-wrap gap-3">
                  <span className="px-3 py-1 bg-white/5 rounded-md text-[10px] uppercase font-bold tracking-widest">Yape</span>
                  <span className="px-3 py-1 bg-white/5 rounded-md text-[10px] uppercase font-bold tracking-widest">Plin</span>
                  <span className="px-3 py-1 bg-white/5 rounded-md text-[10px] uppercase font-bold tracking-widest">Visa</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-white font-bold uppercase tracking-widest text-sm mb-6">Contacto</h4>
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-white/50">
                  <Phone size={18} className="text-weekend-fuchsia" />
                  <span className="text-sm">+51 961 336 674</span>
                </div>
                <div className="flex items-start gap-3 text-white/50">
                  <MapPin size={18} className="text-weekend-fuchsia shrink-0" />
                  <span className="text-sm">Av. Cabo 140, Huarmey 02651</span>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-12 border-t border-white/10 text-center">
            <p className="text-white/30 text-xs uppercase tracking-[0.3em]">
              &copy; {new Date().getFullYear()} The Weekend Lounge & Restaurant.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
