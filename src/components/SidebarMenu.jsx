import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

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
              src="https://scontent.fmnl14-2.fna.fbcdn.net/v/t39.30808-6/414820211_24446117301670315_6333978278326920804_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=1d70fc&_nc_eui2=AeHj56M924AN-nIC1b_7dsVv3gU-2rzyePneBT7avPJ4-RdZS6-sbisgarqtK_nSSKkN_aUrFcX-xoNaICHUj10m&_nc_ohc=nImjurVIoNwQ7kNvwGCCqfR&_nc_oc=AdoKVu7D_Xy0WbGzHlbjY5ZtEtagrzXFKs89apVHwZas6GAdMkUTnneMx7UiciMlAzI&_nc_zt=23&_nc_ht=scontent.fmnl14-2.fna&_nc_gid=ljmFn3p0w6petYuAHS2a8g&_nc_ss=7a2a8&oh=00_Af12ECLaP_rCRhhKpKb84HvJSlNiCUZyg_-MZG5LjZGzdQ&oe=69EF4AC5"
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
            {t('order_now')}</div>
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
