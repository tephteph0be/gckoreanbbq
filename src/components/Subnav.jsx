import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const Subnav = ({ onPickupClick, onDeliveryClick }) => {
  const { t } = useLanguage();
  return (
    <div className="bg-[#2e0101] w-full pt-4 pb-4 flex justify-center items-center space-x-6 z-20 relative">
      <button
        onClick={onPickupClick}
        className="px-12 py-3 bg-[#331102] border border-[#d4af37] rounded-xl text-white font-bold flex items-center text-xl shadow-lg hover:bg-[#4d1607] transition"
      >
        {t('order_pickup')}
      </button>

      <button
        onClick={onDeliveryClick}
        className="px-12 py-3 bg-white text-[#7d1919] rounded-xl font-bold flex items-center text-xl shadow-lg hover:bg-gray-100 transition"
      >
        {t('order_delivery')}
      </button>
    </div>
  );
};

export default Subnav;
