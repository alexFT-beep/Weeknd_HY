import React from 'react';

const LOGO_URL = "https://wdirdbryxwtbnprbrkvh.supabase.co/storage/v1/object/public/The_Weeknd/logo_weeknd.webp";

export const Footer: React.FC = () => {
  return (
    <footer className="relative border-t border-white/10 py-12 bg-[#050507] overflow-hidden text-white">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
        <div className="flex items-center gap-3">
          <img
            src={LOGO_URL}
            alt="Logo Weekend"
            className="h-10 w-10 rounded-full object-cover border border-[#0acc80]"
          />
          <span className="text-white font-black tracking-tighter text-xl uppercase font-display">
            WEEKEND! HUARMEY
          </span>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2">
          <span className="px-3 py-1 bg-[#742284] text-white rounded-full text-[10px] uppercase font-extrabold tracking-widest border border-[#8f2ca2]">
            Yape
          </span>
          <span className="px-3 py-1 bg-[#00D4B2] text-black rounded-full text-[10px] uppercase font-extrabold tracking-widest border border-[#33e0c4]">
            Plin
          </span>
          <span className="px-3 py-1 bg-[#1A1F71] text-white rounded-full text-[10px] uppercase font-extrabold tracking-widest border border-[#2b329b]">
            Visa
          </span>
          <span className="px-3 py-1 bg-[#00E968] text-black rounded-full text-[10px] uppercase font-extrabold tracking-widest border border-[#33ee86]">
            Efectivo
          </span>
        </div>

        <p className="text-white/40 text-xs uppercase tracking-[0.2em] text-center md:text-right">
          &copy; {new Date().getFullYear()} WEEKEND! Lounge &amp; Restaurant. Huarmey - Ancash.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 text-center mt-8 pt-4 border-t border-white/5 relative z-10">
        <p className="text-[11px] sm:text-xs text-white/50 tracking-wider">
          Web &amp; Carta virtual hecha por{' '}
          <a
            href="https://www.instagram.com/mywebsitee/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-[#B026FF] hover:text-white transition-all underline decoration-[#B026FF]/50 hover:decoration-white drop-shadow-[0_0_10px_rgba(176,38,255,0.75)] cursor-pointer"
          >
            @MyWebsite
          </a>
        </p>
      </div>
    </footer>
  );
};
