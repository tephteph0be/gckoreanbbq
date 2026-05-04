import React, { useState } from 'react';
import LoginPage from './LoginPage';
import { useLanguage } from '../contexts/LanguageContext';

const MenuPage = ({ onSignupClick, onMenuClick }) => {
  const [showLogin, setShowLogin] = useState(true);
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-[#650B0B] font-sans overflow-hidden relative">
      {/* Top Navbar */}
      <nav className="bg-[#5B0F0F] py-3 px-4 sm:px-6 flex justify-between items-center text-white relative z-10 shadow-md">
        <div className="flex items-center space-x-3 sm:space-x-6">
          {/* Hamburger Icon */}
          <div className="cursor-pointer" onClick={onMenuClick}>
            <svg className="w-7 h-7 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </div>
          {/* Logo & Brand */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden bg-[#5B0F0F] shrink-0">
              <img src="https://scontent.fcgy3-1.fna.fbcdn.net/v/t39.30808-6/414820211_24446117301670315_6333978278326920804_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=1d70fc&_nc_eui2=AeEXJ36LF9haifjA8PiXJHwI3gU-2rzyePneBT7avPJ4-YBgtNNb-n6LJaxo79bdUbR_qYaYREUTC9vK8zEG4wto&_nc_ohc=kQU5c_6LFzQQ7kNvwFHNwwA&_nc_oc=AdoUfv7BYH8uZUeAx7lpwZFml_4JCyO-uOg13aNAkL2sSoJZ0cSItg2fUDNt8hSpMQY&_nc_zt=23&_nc_ht=scontent.fcgy3-1.fna&_nc_gid=4GzpRPR2rSh1xW1IS6ynEA&_nc_ss=7a3a8&oh=00_Af2hNIOK4TgSBzjgLgx19uf7m6Z-txr8Ww8n9FianaW9Tw&oe=69E17305" className="w-full h-full object-cover" alt="Logo" />
            </div>
            <span className="text-lg sm:text-2xl font-bold font-display tracking-tight whitespace-nowrap">G.C. KOREAN BBQ</span>
          </div>
        </div>

        <div className="flex items-center space-x-2 sm:space-x-4">
          <button onClick={() => setShowLogin(true)} className="px-3 py-1 sm:px-6 sm:py-1.5 border border-white rounded-full text-xs sm:text-base font-medium hover:bg-white hover:text-[#640a0a] transition-colors whitespace-nowrap">
            {t('login')}
          </button>
          <button className="px-3 py-1 sm:px-5 sm:py-1.5 bg-white text-[#640a0a] rounded-full text-xs sm:text-base font-bold flex items-center shadow hover:bg-gray-100 transition-colors whitespace-nowrap">
            <svg className="hidden sm:block w-5 h-5 mr-1 text-[#b51414]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
            </svg>
            {t('order_now')}
          </button>
        </div>
      </nav>

      {/* Category Slider Bar */}
      <div className="w-full relative flex items-center mt-4 px-4 sm:px-6 overflow-hidden">
        {/* Shadow box graphic on left */}
        <div className="hidden sm:block w-12 h-10 bg-white/10 absolute left-8 rounded-sm rotate-12 transform origin-left"></div>
        <div className="bg-[#f0f0f0] w-full max-w-[200px] sm:max-w-[400px] h-10 sm:h-12 flex items-center px-3 sm:px-4 rounded-l-md z-10 text-gray-800 font-bold text-xs sm:text-base whitespace-nowrap">
          {t('samgyupsal_hotpot')}
        </div>

        <div className="flex space-x-2 sm:space-x-3 ml-2 sm:ml-4 z-10 overflow-x-auto whitespace-nowrap hide-scroll-bar py-1">
          <button className="px-3 py-1.5 sm:px-5 sm:py-2 bg-white text-gray-800 font-bold rounded-full text-[10px] sm:text-sm shadow-sm opacity-90">{t('gc_short_order')}</button>
          <button className="px-3 py-1.5 sm:px-5 sm:py-2 bg-white text-gray-800 font-bold rounded-full text-[10px] sm:text-sm shadow-sm opacity-90">{t('samgyup_on_the_go')}</button>
          <button className="px-3 py-1.5 sm:px-5 sm:py-2 bg-white text-gray-800 font-bold rounded-full text-[10px] sm:text-sm shadow-sm opacity-90">{t('bbq')}</button>
        </div>

        {/* Right Arrow */}
        <div className="absolute right-2 sm:right-6 z-20 text-white cursor-pointer bg-[#5B0F0F] rounded-full p-0.5 sm:p-1">
          <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7"></path>
          </svg>
        </div>
      </div>

      {/* Login Modal Overlay */}
      {showLogin && <LoginPage onClose={() => setShowLogin(false)} onSignupClick={onSignupClick} />}
    </div>
  );
};

export default MenuPage;
