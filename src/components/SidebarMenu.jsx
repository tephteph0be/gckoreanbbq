import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { getAssetUrl } from '../utils/assets';

const SidebarMenu = ({ 
  isOpen, 
  onClose, 
  onLoginClick, 
  onHomeClick, 
  onOrderClick, 
  onHighlightsClick, 
  onCorporateClick, 
  isLoggedIn,
  currentUser,
  onLogout,
  onOrdersClick,
  onAccountSettingsClick
}) => {
  const { t } = useLanguage();
  return (
    <div className={`fixed inset-0 z-[100] pointer-events-none`}>
      {/* Dark Background Overlay */}
      <div
        className={`absolute inset-0 bg-black/60 transition-opacity duration-300 ease-in-out ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0'}`}
        onClick={onClose}
      ></div>

      {/* Side down Menu Panel */}
      <div className={`absolute top-0 left-0 w-[300px] h-full bg-[#361601] transform transition-transform duration-300 ease-in-out shadow-2xl flex flex-col pointer-events-auto ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>

        {/* Top White Section */}
        <div className="bg-white w-full flex flex-col items-center pt-8 pb-6 relative">
          {/* Close Button X */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-black hover:text-gray-600 transition-colors"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>

          {/* Logo */}
          <div className="w-32 h-32 mb-4 mt-2">
            <img
              src={getAssetUrl('gc-logo.png')}
              alt="Logo"
              className="w-full h-full object-cover rounded-full"
            />
          </div>

          {/* Authentication Section */}
          {(!isLoggedIn || !currentUser) ? (
            <button
              onClick={() => {
                onClose();
                if (onLoginClick) onLoginClick();
              }}
              className="bg-[#640a0a] hover:bg-[#850d0d] transition-colors text-white font-bold py-2 px-8 rounded-full shadow"
            >
              {t('login_register')}
            </button>
          ) : (
            <div className="flex flex-col items-center space-y-2">
              <span className="text-[#640a0a] font-bold text-lg">
                Hello, {currentUser?.username || currentUser?.email?.split('@')[0]}
              </span>
              <div className="flex items-center space-x-3 text-sm font-bold">
                <button 
                  onClick={() => { onClose(); if(onOrdersClick) onOrdersClick(); }} 
                  className="text-gray-600 hover:text-[#640a0a] transition-colors"
                >
                  Orders
                </button>
                <span className="text-gray-300">|</span>
                <button 
                  onClick={() => { onClose(); if(onAccountSettingsClick) onAccountSettingsClick(); }} 
                  className="text-gray-600 hover:text-[#640a0a] transition-colors"
                >
                  Settings
                </button>
                <span className="text-gray-300">|</span>
                <button 
                  onClick={() => { onClose(); if(onLogout) onLogout(); }} 
                  className="text-red-600 hover:text-red-800 transition-colors"
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Menu Items */}
        <div className="flex flex-col text-white font-bold text-center mt-2 cursor-pointer text-base tracking-wide">
          <div
            onClick={() => {
              onClose();
              if (onHomeClick) onHomeClick();
            }}
            className="py-5 w-full hover:bg-[#4a1f02] transition-colors">
            {t('home')}
          </div>
          <div
            onClick={() => {
              onClose();
              if (onOrderClick) onOrderClick();
            }}
            className="py-5 w-full hover:bg-[#4a1f02] transition-colors">
            {t('order_now')}
          </div>
          <div
            onClick={() => {
              onClose();
              if (onHomeClick) onHomeClick();
              setTimeout(() => {
                const el = document.getElementById('about-section');
                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }, 300);
            }}
            className="py-5 w-full hover:bg-[#4a1f02] transition-colors"
          >
            {t('about_us') || 'About Us'}
          </div>
          <div 
            onClick={() => {
              onClose();
              if (onHighlightsClick) onHighlightsClick();
            }}
            className="py-5 w-full hover:bg-[#4a1f02] transition-colors"
          >
            {t('customer_highlights')}
          </div>
          <div 
            onClick={() => {
              onClose();
              if (onCorporateClick) onCorporateClick();
            }}
            className="py-5 w-full hover:bg-[#4a1f02] transition-colors cursor-pointer"
          >
            {t('corporate_information')}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SidebarMenu;
