// @ts-nocheck
import React, { useState, useRef } from 'react';
import { 
  Play, Pause, Heart, Eye, Share2, Volume2, VolumeX, ArrowUpRight, 
  Sparkles, Flame, PartyPopper, Wine, Utensils, Music, ChevronLeft 
} from 'lucide-react';

interface VideoPost {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  videoSrc: string;
  views: number;
  likes: number;
  tag: string;
  tagColor: string;
  aspectRatio: string;
}

const VIDEO_POSTS: VideoPost[] = [
  {
    id: 'turbo_mami',
    title: '🍗 Metele turbo mami',
    subtitle: '576 x 1024 • Video Oficial',
    category: 'Humor / Meseros',
    videoSrc: '/videos/video_turbo_mami.webm#t=0.1',
    views: 1420,
    likes: 86,
    tag: '🔥 Tendencia',
    tagColor: 'bg-[#00ff88]/10 text-[#00ff88] border-[#00ff88]/20',
    aspectRatio: '9/16'
  },
  {
    id: 'oe_como_es',
    title: '🎂 Oe como es? Pide nomás',
    subtitle: '576 x 1024 • Delivery & Fiesta',
    category: 'Humor / Delivery',
    videoSrc: '/videos/video_oe_como_es.webm#t=0.1',
    views: 3180,
    likes: 142,
    tag: '🎉 Fiesta',
    tagColor: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    aspectRatio: '9/16'
  },
  {
    id: 'cocteleria',
    title: '🍸 Coctelería de Autor',
    subtitle: '1080 x 1920 • Bar & Drinks',
    category: 'Tragos / Bar',
    videoSrc: '/videos/video_cocteleria.webm#t=0.1',
    views: 890,
    likes: 54,
    tag: '🍹 Barra',
    tagColor: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    aspectRatio: '9/16'
  },
  {
    id: 'alitas',
    title: '🍗 Broaster & Alitas Weekend',
    subtitle: '1080 x 1920 • Crujientes',
    category: 'Carta / Gastronomía',
    videoSrc: '/videos/video_alitas.webm#t=0.1',
    views: 2150,
    likes: 98,
    tag: '✨ Delicioso',
    tagColor: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    aspectRatio: '9/16'
  },
  {
    id: 'promo',
    title: '🥤 Frappés & Promociones',
    subtitle: '1080 x 1920 • Refrescos',
    category: 'Promos / Verano',
    videoSrc: '/videos/video_promo.webm#t=0.1',
    views: 1890,
    likes: 112,
    tag: '⚡ Promo',
    tagColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    aspectRatio: '9/16'
  },
  {
    id: 'noche',
    title: '🌌 Ambiente & Música Weekend',
    subtitle: '1080 x 1920 • Noches Weekend',
    category: 'Experiencia / Nightlife',
    videoSrc: '/videos/video_noche.webm#t=0.1',
    views: 2540,
    likes: 165,
    tag: '🥂 Noche',
    tagColor: 'bg-pink-500/10 text-pink-400 border-pink-500/20',
    aspectRatio: '9/16'
  },
  {
    id: 'cumple',
    title: '🎂 Celebración de Cumpleaños',
    subtitle: '1080 x 1920 • Show & Sorpresas',
    category: 'Cumpleaños / Reservas',
    videoSrc: '/videos/video_cumple.webm#t=0.1',
    views: 3410,
    likes: 210,
    tag: '🎁 Especial',
    tagColor: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
    aspectRatio: '9/16'
  }
];

interface SocialGalleryViewProps {
  onBackToHome?: () => void;
  onOpenMenu?: () => void;
}

export function SocialGalleryView({ onBackToHome, onOpenMenu }: SocialGalleryViewProps) {
  const [playingVideoId, setPlayingVideoId] = useState<string | null>(null);
  const [mutedState, setMutedState] = useState<{ [key: string]: boolean }>({});
  const [likesState, setLikesState] = useState<{ [key: string]: { count: number; liked: boolean } }>(() => {
    const initial: { [key: string]: { count: number; liked: boolean } } = {};
    VIDEO_POSTS.forEach(v => {
      initial[v.id] = { count: v.likes, liked: false };
    });
    return initial;
  });

  const videoRefs = useRef<{ [key: string]: HTMLVideoElement | null }>({});

  const handleTogglePlay = (id: string) => {
    const videoEl = videoRefs.current[id];
    if (!videoEl) return;

    if (playingVideoId === id) {
      videoEl.pause();
      setPlayingVideoId(null);
    } else {
      // Pause current playing video if any
      if (playingVideoId && videoRefs.current[playingVideoId]) {
        videoRefs.current[playingVideoId]?.pause();
      }

      // Check audio status
      const isMuted = mutedState[id] ?? false;
      videoEl.muted = isMuted;
      videoEl.volume = 1.0;

      videoEl.play().then(() => {
        setPlayingVideoId(id);
      }).catch(err => {
        console.warn('Playback with audio blocked, attempting muted fallback:', err);
        videoEl.muted = true;
        setMutedState(prev => ({ ...prev, [id]: true }));
        videoEl.play().then(() => setPlayingVideoId(id));
      });
    }
  };

  const handleToggleMuteVideo = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    const videoEl = videoRefs.current[id];
    if (!videoEl) return;

    const currentMuted = mutedState[id] ?? false;
    const nextMuted = !currentMuted;

    videoEl.muted = nextMuted;
    videoEl.volume = 1.0;
    setMutedState(prev => ({ ...prev, [id]: nextMuted }));
  };

  const handleLike = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setLikesState(prev => {
      const current = prev[id] || { count: 0, liked: false };
      return {
        ...prev,
        [id]: {
          count: current.liked ? current.count - 1 : current.count + 1,
          liked: !current.liked
        }
      };
    });
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#fcfcfc] font-['Sora',sans-serif] flex flex-col relative overflow-x-hidden">
      {/* Background Radial Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-[#00ff88]/10 to-transparent blur-3xl pointer-events-none" />

      {/* Main Content Wrap */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-8 pb-4 flex-grow relative z-10">
        {/* Top Navigation Bar */}
        <div className="flex items-center justify-between mb-8 relative z-20">
          <button 
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold text-white transition-all hover:scale-105 active:scale-95"
          >
            <ChevronLeft className="w-4 h-4 text-[#00ff88]" />
            <span>Volver al Inicio</span>
          </button>

          <div className="flex items-center gap-3">
            <button 
              onClick={onOpenMenu}
              className="px-5 py-2 rounded-full bg-[#00ff88] text-black font-extrabold text-xs uppercase tracking-wider hover:bg-white transition-all shadow-[0_0_20px_rgba(0,255,136,0.4)] active:scale-95"
            >
              📋 Ver Carta Digital
            </button>
          </div>
        </div>

        {/* HEADER SECTION */}
        <header className="text-center mb-10 space-y-4">
          {/* Super Header Badge */}
          <div className="inline-flex items-center justify-center gap-3 px-4 py-1.5 rounded-full bg-[#00ff88]/10 border border-[#00ff88]/20 text-[11px] font-bold tracking-[0.2em] text-[#00ff88] uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Nuestras Redes Oficiales</span>
            <Flame className="w-3.5 h-3.5 text-amber-400" />
          </div>

          {/* Main Title */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold flex items-center justify-center gap-3 flex-wrap tracking-tight text-white">
            <span className="drop-shadow-lg">📸</span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-zinc-100 to-zinc-400">
              @weekend_huarmey
            </span>
            <span className="drop-shadow-lg">🎵</span>
          </h1>

          {/* Subtext */}
          <p className="text-[#888888] max-w-2xl mx-auto text-xs sm:text-sm font-light tracking-wide leading-relaxed">
            Vive la experiencia antes de llegar. Toca el <span className="text-white font-bold">🤍</span> para sincronizar
            likes y explorar nuestros momentos virales <span className="text-white">🎬✨</span>
          </p>
        </header>

        {/* MAIN GALLERY CONTENT */}
        <div className="w-full">
          {/* TikTok Profile Bar */}
          <div className="flex items-center justify-between mb-8 px-4 bg-zinc-900/40 backdrop-blur-md p-4 rounded-2xl border border-white/5">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-[#69C9D0] via-[#EE1D52] to-black p-[2px] shadow-lg shadow-[#EE1D52]/20">
                <div className="w-full h-full bg-[#111] rounded-full flex items-center justify-center text-white text-[10px] font-bold uppercase tracking-wider">
                  TikTok
                </div>
              </div>
              <div>
                <h2 className="font-bold text-lg leading-tight text-white tracking-tight flex items-center gap-2">
                  TikTok Oficial <span className="text-xs px-2 py-0.5 rounded-full bg-[#EE1D52]/20 text-[#EE1D52] font-semibold">@weekendhuarmey</span>
                </h2>
                <p className="text-xs text-[#888888] font-medium mt-0.5">
                  Videos exclusivos, platos en acción y buena vibra
                </p>
              </div>
            </div>

            <a 
              href="https://www.tiktok.com/@weekendhuarmey" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group text-[#00ff88] text-xs font-bold uppercase tracking-[0.15em] hover:text-white transition-colors flex items-center gap-2 px-4 py-2 rounded-xl bg-[#00ff88]/10 hover:bg-[#00ff88] hover:text-black border border-[#00ff88]/30"
            >
              <span>Ver Perfil</span>
              <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>

          {/* Gallery Horizontal Scroll Grid */}
          <div className="flex overflow-x-auto hide-scroll pb-10 gap-6 px-2 snap-x snap-mandatory">
            {VIDEO_POSTS.map((video) => {
              const isPlaying = playingVideoId === video.id;
              const isMuted = mutedState[video.id] ?? false;
              const likeData = likesState[video.id] || { count: video.likes, liked: false };

              return (
                <article 
                  key={video.id}
                  onClick={() => handleTogglePlay(video.id)}
                  className="glass-card flex-none w-[300px] sm:w-[330px] h-[570px] flex flex-col overflow-hidden relative group snap-center cursor-pointer bg-zinc-900/60 backdrop-blur-xl border border-white/10 rounded-[22px] transition-all duration-300 hover:border-[#00ff88]/40 hover:-translate-y-1 shadow-2xl"
                >
                  {/* Top Badge & Sound Action Overlay */}
                  <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-start z-30 bg-gradient-to-b from-black/80 via-black/40 to-transparent">
                    <div className="flex items-center gap-1.5 text-[11px] font-medium text-white/90 drop-shadow-md backdrop-blur-md bg-black/40 px-3 py-1 rounded-full border border-white/10">
                      <span className="text-[#69C9D0] text-[10px]">🎵</span>
                      <span className="font-semibold">@weekendhuarmey</span>
                    </div>

                    <div className="flex items-center gap-2">
                      {/* Individual Audio Mute Toggle Button */}
                      <button 
                        type="button"
                        onClick={(e) => handleToggleMuteVideo(e, video.id)}
                        className="p-2 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white hover:text-[#00ff88] hover:border-[#00ff88]/50 transition-all shadow-lg active:scale-95"
                        title={isMuted ? 'Activar Sonido' : 'Silenciar Audio'}
                        aria-label={isMuted ? 'Activar Sonido' : 'Silenciar Audio'}
                      >
                        {isMuted ? <VolumeX className="w-4 h-4 text-amber-400" /> : <Volume2 className="w-4 h-4 text-[#00ff88]" />}
                      </button>

                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border backdrop-blur-md uppercase tracking-wider ${video.tagColor}`}>
                        {video.tag}
                      </span>
                    </div>
                  </div>

                  {/* Video / Media Player Container */}
                  <div className="flex-1 bg-black relative overflow-hidden">
                    <video
                      ref={(el) => { videoRefs.current[video.id] = el; }}
                      src={video.videoSrc}
                      preload="metadata"
                      loop
                      playsInline
                      muted={isMuted}
                      className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out"
                    />

                    {/* Center Play Button Overlay */}
                    {!isPlaying && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-[2px]">
                        <div className="w-16 h-16 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-white group-hover:scale-110 group-hover:bg-[#00ff88] group-hover:text-black transition-all duration-300 shadow-2xl">
                          <Play className="w-7 h-7 ml-1 fill-current" />
                        </div>
                      </div>
                    )}

                    {/* Gradient Overlay for Text Visibility */}
                    <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black via-black/70 to-transparent pointer-events-none" />
                  </div>

                  {/* Title & Subtitle Info */}
                  <div className="absolute bottom-20 left-0 right-0 p-4 z-10">
                    <h3 className="font-extrabold text-base mb-1 flex items-center gap-2 text-white group-hover:text-[#00ff88] transition-colors truncate">
                      {video.title}
                    </h3>
                    <p className="text-[11px] text-[#888888] font-medium tracking-wide">
                      {video.subtitle}
                    </p>
                  </div>

                  {/* Footer Metrics & Actions Bar */}
                  <div className="h-20 px-4 flex items-center justify-between border-t border-white/10 bg-black/70 backdrop-blur-md z-20">
                    <div className="flex gap-5 text-xs text-[#bbb] font-semibold">
                      <div className="flex items-center gap-1.5 hover:text-white transition-colors">
                        <Eye className="w-4 h-4 text-zinc-400" />
                        <span>{video.views}</span>
                      </div>

                      <button 
                        type="button"
                        onClick={(e) => handleLike(e, video.id)}
                        className={`flex items-center gap-1.5 transition-all ${likeData.liked ? 'text-rose-500 scale-110' : 'hover:text-[#00ff88]'}`}
                      >
                        <Heart className={`w-4 h-4 ${likeData.liked ? 'fill-current' : ''}`} />
                        <span>{likeData.count}</span>
                      </button>
                    </div>

                    <a 
                      href="https://www.tiktok.com/@weekendhuarmey"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="px-4 py-2 rounded-full bg-white/10 hover:bg-[#00ff88] hover:text-black text-[10px] font-extrabold tracking-[0.1em] transition-all border border-white/15 flex items-center gap-1.5 text-white"
                    >
                      <span>VER</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>

      {/* FOOTER SECTION - Seamless full width to prevent gap */}
      <footer className="relative mt-8 border-t border-white/10 bg-[#030303] text-white font-['Sora'] w-full">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-10">
            {/* Column 1: Brand */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full border border-[#00ff88]/50 flex items-center justify-center bg-[#00ff88]/10 shadow-[0_0_20px_rgba(0,255,136,0.2)]">
                  <span className="text-2xl font-bold text-[#00ff88]">W</span>
                </div>
                <h3 className="font-extrabold text-base leading-tight tracking-wider uppercase text-white">
                  THE WEEKEND<br />
                  <span className="text-[#888] font-medium text-xs">HUARMEY</span>
                </h3>
              </div>
              <p className="text-[#888] text-xs leading-relaxed max-w-xs font-light">
                El espacio donde la alta cocina se encuentra con el ritmo más sofisticado de la ciudad.
              </p>
              <div className="space-y-2 pt-1">
                <p className="text-[#00ff88] font-semibold text-[10px] tracking-[0.2em] uppercase">¡SÍGUENOS EN REDES!</p>
                <div className="flex gap-3">
                  <a 
                    href="https://www.tiktok.com/@weekendhuarmey" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center hover:bg-[#00ff88] hover:border-[#00ff88] hover:text-black transition-all text-white group"
                  >
                    <svg className="w-4 h-4 transition-transform group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.06 3.43-.3 6.83-1.62 10.12-1.14 2.81-3.38 5.08-6.23 5.87-2.04.56-4.2.42-6.17-.36-2.53-.99-4.51-3.18-5.19-5.77-.58-2.18-.44-4.52.35-6.65.95-2.58 3.11-4.61 5.73-5.28 1.15-.29 2.35-.39 3.53-.28V10.7c-.49-.17-1.02-.2-1.53-.13-.76.11-1.49.54-1.91 1.17-.45.68-.5 1.55-.3 2.32.25.86.96 1.53 1.82 1.73.66.16 1.38.07 1.98-.26.59-.34 1.01-.92 1.14-1.58.1-.47.12-.95.12-1.43V0z"></path>
                    </svg>
                  </a>
                  <a 
                    href="https://www.instagram.com/weekend_huarmey/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center hover:bg-[#00ff88] hover:border-[#00ff88] hover:text-black transition-all text-white group"
                  >
                    <svg className="w-4 h-4 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <rect height="20" rx="5" ry="5" width="20" x="2" y="2"></rect>
                      <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"></path>
                      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                    </svg>
                  </a>
                  <a 
                    href="https://www.facebook.com/p/Weekend-Huarmey-100075916407028/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center hover:bg-[#00ff88] hover:border-[#00ff88] hover:text-black transition-all text-white group"
                  >
                    <svg className="w-4 h-4 transition-transform group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Column 2: Horario */}
            <div className="space-y-4">
              <h4 className="font-bold text-[11px] tracking-[0.2em] text-white/50 uppercase">HORARIO</h4>
              <div className="space-y-1">
                <p className="text-white/90 text-xs font-medium">Lunes - Domingo</p>
                <p className="text-[#00ff88] font-bold text-xs">5:00 PM - 3:00 AM</p>
              </div>
            </div>

            {/* Column 3: Pagos */}
            <div className="space-y-4">
              <h4 className="font-bold text-[11px] tracking-[0.2em] text-white/50 uppercase">MÉTODOS DE PAGO</h4>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 rounded bg-white/5 border border-white/10 text-[10px] font-semibold text-white/80">YAPE</span>
                <span className="px-3 py-1 rounded bg-white/5 border border-white/10 text-[10px] font-semibold text-white/80">PLIN</span>
                <span className="px-3 py-1 rounded bg-white/5 border border-white/10 text-[10px] font-semibold text-white/80">VISA</span>
              </div>
            </div>

            {/* Column 4: Contacto */}
            <div className="space-y-4">
              <h4 className="font-bold text-[11px] tracking-[0.2em] text-white/50 uppercase">CONTACTO</h4>
              <p className="text-xs text-white/90 font-semibold">+51 961 336 674</p>
              <p className="text-[#888] text-xs">Av. Cabo 140, Huarmey 02651</p>
            </div>
          </div>

          <div className="mt-10 pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-[#555] text-[10px] uppercase font-semibold">
            <p>© 2026 THE WEEKEND LOUNGE & RESTAURANT.</p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-white transition-colors">Privacidad</a>
              <span>|</span>
              <a href="#" className="hover:text-white transition-colors">Términos</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
