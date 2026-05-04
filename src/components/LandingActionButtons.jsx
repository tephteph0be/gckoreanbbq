import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const LandingActionButtons = ({ onPickupClick, onDeliveryClick }) => {
  const { t } = useLanguage();
  return (
    <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-8 py-4 px-4 bg-transparent z-20 relative">
      <button
        onClick={onPickupClick}
        className="w-full sm:w-[260px] h-[60px] bg-[#331102] border-2 border-[#d4af37] rounded-xl text-white font-bold flex items-center justify-center space-x-3 text-lg shadow-2xl hover:bg-[#4d1607] transition-all active:scale-[0.98]"
      >
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M16 11V7a4 4 0 118 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
        <span>{t('order_pickup')}</span>
      </button>

      <button
        onClick={onDeliveryClick}
        className="w-full sm:w-[260px] h-[60px] bg-white border-2 border-white text-[#7d1919] rounded-xl font-bold flex items-center justify-center space-x-3 text-lg shadow-2xl hover:bg-gray-100 transition-all active:scale-[0.98]"
      >
        <svg className="w-7 h-7 text-[#7d1919]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
        <span>{t('order_delivery')}</span>
      </button>
    </div>
  );
};

export default LandingActionButtons;
