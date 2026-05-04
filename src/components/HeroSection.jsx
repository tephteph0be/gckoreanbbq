import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import kimchiHeroImg from '../assets/kimchi/kimchi_new.jpg';

const slides = [
  {
    subtitle: 'Only in GC Korean BBQ',
    title: 'Your all time favorite Kimchi',
    img: kimchiHeroImg,
  },
  {
    subtitle: 'Food Bilao',
    title: 'Any gatherings for this Holy Week? Try our Food Bilao',
    img: 'https://scontent.fmnl14-1.fna.fbcdn.net/v/t39.30808-6/667681651_34846453068303301_786827027501367100_n.jpg?stp=cp6_dst-jpg_tt6&_nc_cat=105&ccb=1-7&_nc_sid=7b2446&_nc_eui2=AeFd2zVGs1OZSfEgHUkb0QQrcShOQ_SJcIZxKE5D9Ilwhk0i5eaDwya8A6xqjPjgvmS7QpNUxdm9S7a8TWVlb3KW&_nc_ohc=e6ldTO_A3oUQ7kNvwEmZKmL&_nc_oc=Adq1Oafh-mmNjKxEgj9gcViN2nzNACQFb2_QefuZNy3yIPaZXprrI2aQjbFPRw3dkR4&_nc_zt=23&_nc_ht=scontent.fmnl14-1.fna&_nc_gid=st5mxzvS95kX3D4Kx_vlsA&_nc_ss=7b2a8&oh=00_Af0HsylmKV9eHj1hA7kiRCLdhgPK_OAnuPainVknC_xP6Q&oe=69EF9259',
  },
  {
    subtitle: 'Hotpot',
    title: "Set C (for 3 Person)\nRABOKKI \u00A0 ₱ 399.00",
    img: 'https://scontent-mnl3-1.xx.fbcdn.net/v/t39.30808-6/647066600_34169568915991723_4962407058866573785_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=7b2446&_nc_eui2=AeHsjza2mF2n_bEloQCVfpoLJtR_7R-XtXkm1H_tH5e1eZvY0Tr8D04Os_7qs5z4W8RxcRE-tt3gbrCuTnayHdSb&_nc_ohc=BkO-XC8G4Y0Q7kNvwF16xWd&_nc_oc=AdqCb--F6WbO3vfpMzuIqQcBCty-UNQlXKfcZoKkh57IFBHZB3EIoNdLbrxnMnSuYrI&_nc_zt=23&_nc_ht=scontent-mnl3-1.xx&_nc_gid=Fl7kaAQTOX6Uc61tl7uS9A&_nc_ss=7b2a8&oh=00_Af0dMqW73TVIg2aYVKRpd1254k51vMy-YzwtjMBBsVLRyg&oe=69EFA031',
  },
  {
    subtitle: 'Last day of our',
    title: 'UNLIMITED RICE TODAY!!!',
    img: 'https://scontent.fmnl14-1.fna.fbcdn.net/v/t39.30808-6/643602166_34077204388561510_4311205135461664176_n.jpg?stp=cp6_dst-jpg_tt6&_nc_cat=100&ccb=1-7&_nc_sid=7b2446&_nc_eui2=AeFmz4FuOA0vPpVDQm2L8wAzMqstxRj24VMyqy3FGPbhUzNe70VXW1BNfBYBTq7O1lmVSBrhDaqFRmXnK0gGht-l&_nc_ohc=gvD8l75w3XEQ7kNvwFvd96T&_nc_oc=Adpijq5_1I_jDnF91zSBqH0c26Px_DyHmwGSnw-rZYy1JnmrDKlRetEFQMxcMNtsX_o&_nc_zt=23&_nc_ht=scontent.fmnl14-1.fna&_nc_gid=yD7EmFZLajFfvYkr4HJ0tQ&oh=00_Af2LaWiD7Sgsaw09v8tAdBtnYcYnHm0R6FbbiSBjGoImVw&oe=69EF8E79',
  },
  {
    subtitle: 'Samgyupsal Special',
    title: "Set 3 (for 4-6 Person)\n₱ 899.00",
    img: 'https://scontent-mnl1-2.xx.fbcdn.net/v/t39.30808-6/643446703_34085167147765234_1599485213386011366_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=7b2446&_nc_eui2=AeH6xt5H90_UVzApOyNZAcqsll4VDcBDJA-WXhUNwEMkD8ACZDBmmFQ-4glzswVtf_crMkLaHt1TfUIkuRzuc3KY&_nc_ohc=Bf_0aFhpTZYQ7kNvwH7MapH&_nc_oc=Ado7blV3wlDv4FzqcLh0wti4c5y00VbR7jY1mqV0eLyAUeysQV-fr_Ys3Ne8Q_KzPp8&_nc_zt=23&_nc_ht=scontent-mnl1-2.xx&_nc_gid=mDgTy2XhrMEOh6CsVUJ30g&oh=00_Af3GVKPmoxAiC6vzghL_h47keqqsoypnWErxKKtO5EHmcw&oe=69EF9489',
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
                  src={slide.img}
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
                    <img src={slide.img} alt={slide.subtitle} className="w-full h-full object-cover" draggable={false} />
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
