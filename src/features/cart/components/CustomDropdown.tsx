/**
 * @file CustomDropdown.tsx
 * @description Componente personalizado de menú desplegable (Dropdown) con diseño Premium Morado Neón,
 * animaciones de Framer Motion, soporte para iconos/badges y manejo de eventos.
 */

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Check } from 'lucide-react';

export interface DropdownOption {
  readonly id: string;
  readonly label: string;
  readonly sublabel?: string;
  readonly badge?: string;
  readonly icon?: React.ReactNode;
}

interface CustomDropdownProps {
  readonly label?: string;
  readonly options: readonly DropdownOption[];
  readonly value: string;
  readonly onChange: (value: string) => void;
  readonly placeholder?: string;
  readonly icon?: React.ReactNode;
  readonly compact?: boolean;
}

export const CustomDropdown: React.FC<CustomDropdownProps> = ({
  label,
  options,
  value,
  onChange,
  placeholder = 'Seleccionar...',
  icon,
  compact = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find(opt => opt.id === value) || options[0];

  // Cerrar el menú al hacer clic fuera del componente
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative w-full text-left" ref={containerRef}>
      {label && (
        <label className="block text-[11px] uppercase tracking-wider font-extrabold text-gray-300 mb-1.5">
          {label}
        </label>
      )}

      {/* Botón Disparador Principal (Trigger) */}
      <motion.button
        type="button"
        onClick={() => setIsOpen(prev => !prev)}
        whileTap={{ scale: 0.98 }}
        className={`w-full flex items-center justify-between gap-2.5 rounded-xl border transition-all duration-200 cursor-pointer ${
          compact ? 'px-3 py-2 text-xs' : 'px-3.5 py-2.5 text-xs'
        } ${
          isOpen
            ? 'bg-zinc-900/95 border-[#c900ff] ring-2 ring-[#c900ff]/30 shadow-[0_0_15px_rgba(201,0,255,0.25)]'
            : 'bg-zinc-900/90 border-white/15 hover:border-white/30 text-white'
        }`}
      >
        <div className="flex items-center gap-2.5 truncate min-w-0">
          {icon && <span className="shrink-0 text-[#c900ff]">{icon}</span>}

          {selectedOption ? (
            <div className="flex items-center gap-2 truncate">
              {selectedOption.badge && (
                <span className="shrink-0 text-xs">{selectedOption.badge}</span>
              )}
              <span className="font-extrabold text-white truncate">
                {selectedOption.label}
              </span>
            </div>
          ) : (
            <span className="text-gray-500 font-medium">{placeholder}</span>
          )}
        </div>

        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="shrink-0 text-gray-400"
        >
          <ChevronDown className="w-4 h-4" />
        </motion.div>
      </motion.button>

      {/* Panel Desplegable Animado */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 4, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="absolute left-0 right-0 z-50 mt-1 max-h-60 overflow-y-auto rounded-xl bg-[#0e0e14]/95 border border-[#c900ff]/40 shadow-[0_12px_32px_rgba(0,0,0,0.85)] backdrop-blur-xl p-1.5 space-y-1 no-scrollbar"
          >
            {options.map(option => {
              const isSelected = option.id === value;
              return (
                <motion.button
                  key={option.id}
                  type="button"
                  onClick={() => {
                    onChange(option.id);
                    setIsOpen(false);
                  }}
                  whileHover={{ x: 3 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full flex items-center justify-between gap-3 px-3 py-2 rounded-lg text-xs transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-gradient-to-r from-[#c900ff]/25 to-purple-900/40 border border-[#c900ff]/50 text-white font-black'
                      : 'text-gray-300 hover:bg-zinc-800/80 hover:text-white font-medium'
                  }`}
                >
                  <div className="flex items-center gap-2.5 truncate min-w-0">
                    {option.badge && <span className="text-sm shrink-0">{option.badge}</span>}
                    {option.icon && <span className="shrink-0 text-[#c900ff]">{option.icon}</span>}
                    <div className="flex flex-col text-left truncate">
                      <span className="truncate">{option.label}</span>
                      {option.sublabel && (
                        <span className="text-[10px] text-gray-400 font-normal truncate">
                          {option.sublabel}
                        </span>
                      )}
                    </div>
                  </div>

                  {isSelected && (
                    <Check className="w-3.5 h-3.5 text-[#c900ff] shrink-0 stroke-[3]" />
                  )}
                </motion.button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
