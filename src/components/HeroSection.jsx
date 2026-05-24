import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import kimchiHeroImg from '../assets/kimchi/kimchi_new.jpg';
import { getAssetUrl } from '../utils/assets';

const slides = [
  {
    subtitle: 'Only in GC Korean BBQ',
    title: 'Your all time favorite Kimchi',
    img: kimchiHeroImg,
  },
  {
    subtitle: 'Food Bilao',
    title: 'Any gatherings for this Holy Week? Try our Food Bilao',
    img: './food-bilao.jpg.jpg',
  },
  {
    subtitle: 'Hotpot',
    title: "Set C (for 3 Person)\nRABOKKI \u00A0 ₱ 399.00",
    img: './hotpot-ramen.jpg.jpg',
  },
  {
    subtitle: 'Last day of our',
    title: 'UNLIMITED RICE TODAY!!!',
    img: './rice-cup.png',
  },
  {
    subtitle: 'Samgyupsal Special',
    title: "Set 3 (for 4-6 Person)\n₱ 899.00",
    img: './food-bilao.jpg.jpg',
  },
];

const HeroSection = ({ onOrderClick }) => {
  const { t } = useLanguage();
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [dragStartX, setDragStartX] = useState(null);
  const [dragDelta, setDragDelta] = useState(0);
  const timerRef = useRef(null);

  const count = slides.length;

  const goTo = useCallback((idx) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrent(idx);
    setTimeout(() => setIsTransitioning(false), 500);
  }, [isTransitioning]);

  const next = useCallback(() => goTo((current + 1) % count), [current, count, goTo]);
  const prev = useCallback(() => goTo((current - 1 + count) % count), [current, count, goTo]);

  useEffect(() => {
    timerRef.current = setInterval(next, 5000);
    return () => clearInterval(timerRef.current);
  }, [next]);

  const resetTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(next, 5000);
  };

  const handleDragStart = (clientX) => {
    setDragStartX(clientX);
    setDragDelta(0);
    clearInterval(timerRef.current);
  };
  const handleDragMove = (clientX) => {
    if (dragStartX === null) return;
    setDragDelta(clientX - dragStartX);
  };
  const handleDragEnd = () => {
    if (dragStartX === null) return;
    if (dragDelta < -50) next();
    else if (dragDelta > 50) prev();
    setDragStartX(null);
    setDragDelta(0);
    resetTimer();
  };

  return (
    <div
      className="relative w-full overflow-hidden bg-[#680000]"
      style={{ fontFamily: "'Poppins', sans-serif" }}
    >
      {/* Fixed-height slide area */}
      <div
        className="relative w-full h-[400px] sm:h-[420px] lg:h-[460px] select-none overflow-hidden"
        onMouseDown={(e) => handleDragStart(e.clientX)}
        onMouseMove={(e) => handleDragMove(e.clientX)}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}
        onTouchStart={(e) => handleDragStart(e.touches[0].clientX)}
        onTouchMove={(e) => handleDragMove(e.touches[0].clientX)}
        onTouchEnd={handleDragEnd}
        style={{ cursor: dragStartX !== null ? 'grabbing' : 'grab' }}
      >
        {slides.map((slide, idx) => {
          const isActive = idx === current;
          return (
            <div
              key={idx}
              className="absolute inset-0 transition-all duration-500 ease-in-out"
              style={{
                opacity: isActive ? 1 : 0,
                transform: isActive
                  ? `translateX(${dragDelta}px)`
                  : dragDelta > 0 ? 'translateX(-40px)' : 'translateX(40px)',
                pointerEvents: isActive ? 'auto' : 'none',
                zIndex: isActive ? 10 : 0,
              }}
            >
              {/* Background image — clearly visible */}
              <div className="absolute inset-0">
                <img
                  src={getAssetUrl(slide.img)}
                  alt=""
                  className="w-full h-full object-cover opacity-50 mix-blend-luminosity"
                  draggable={false}
                />
                <div className="absolute inset-0 bg-[#680000]/40" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#680000] via-[#680000]/60 to-transparent" />
              </div>

              {/* Content — fixed layout so sizes never shift */}
              <div className="relative z-10 h-full w-full max-w-7xl mx-auto px-5 sm:px-14 lg:px-16 flex items-center">
                <div className="flex flex-col lg:flex-row items-center lg:items-center justify-between w-full gap-6 lg:gap-10">
                  {/* Text — fixed sizes, no wrapping surprises */}
                  <div className="flex-1 min-w-0 max-w-[600px]">
                    <p className="text-[10px] sm:text-[14px] lg:text-[16px] font-semibold tracking-wide text-white/80 mb-1 sm:mb-2 uppercase" style={{ lineHeight: '1.4' }}>
                      {slide.subtitle}
                    </p>
                    <h1 className="text-[20px] sm:text-[36px] lg:text-[52px] font-bold text-white leading-[1.2] tracking-tight whitespace-pre-line">
                      {slide.title}
                    </h1>
                  </div>

                  {/* Image — fixed size with premium intense black drop-shadow (no border) */}
                  <div
                    className="hidden lg:block w-[320px] h-[320px] rounded-2xl overflow-hidden shrink-0 transform hover:scale-[1.03] transition-all duration-500"
                    style={{ filter: 'drop-shadow(0 25px 35px rgba(0,0,0,0.8))' }}
                  >
                    <img src={getAssetUrl(slide.img)} alt={slide.subtitle} className="w-full h-full object-cover" draggable={false} />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Arrow Left */}
      <button
        onClick={() => { prev(); resetTimer(); }}
        className="absolute left-2 sm:left-5 top-[200px] sm:top-[210px] lg:top-[230px] z-20 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-black/25 hover:bg-black/45 backdrop-blur-sm flex items-center justify-center text-white transition-all border border-white/10 active:scale-90"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" /></svg>
      </button>

      {/* Arrow Right */}
      <button
        onClick={() => { next(); resetTimer(); }}
        className="absolute right-2 sm:right-5 top-[200px] sm:top-[210px] lg:top-[230px] z-20 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-black/25 hover:bg-black/45 backdrop-blur-sm flex items-center justify-center text-white transition-all border border-white/10 active:scale-90"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" /></svg>
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => { goTo(idx); resetTimer(); }}
            className={`rounded-full transition-all duration-300 ${idx === current ? 'w-7 h-2.5 bg-white' : 'w-2.5 h-2.5 bg-white/40 hover:bg-white/60'
              }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSection;
