import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const Footer = ({ onAboutClick, onCorporateClick, onPrivacyClick, onCookieClick, onStoresClick, onTermsClick, onHelpClick }) => {
  const { t } = useLanguage();
  return (
    <footer className="w-full bg-white text-gray-700 font-sans mt-auto">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12 py-6 sm:py-10 flex flex-col items-center border-b border-gray-200 gap-4">
        {/* Links */}
        <div className="flex flex-wrap justify-center items-center gap-x-4 sm:gap-x-8 gap-y-3 text-[12px] sm:text-[13px] font-bold text-gray-600">
          <button
            onClick={(e) => { e.preventDefault(); onAboutClick && onAboutClick(); }}
            className="hover:text-gray-900 transition-colors cursor-pointer bg-transparent border-none p-0 font-bold text-[13px] text-gray-600 text-left"
          >
            {t('about_us')}
          </button>
          <button 
            onClick={(e) => { e.preventDefault(); onStoresClick && onStoresClick(); }} 
            className="hover:text-gray-900 transition-colors cursor-pointer bg-transparent border-none p-0 font-bold text-[13px] text-gray-600 text-left"
          >
            {t('stores')}
          </button>
          <button 
            onClick={(e) => { e.preventDefault(); onCorporateClick && onCorporateClick(); }} 
            className="hover:text-gray-900 transition-colors cursor-pointer bg-transparent border-none p-0 font-bold text-[13px] text-gray-600 text-left"
          >
            {t('corporate_information')}
          </button>
          <button 
            onClick={(e) => { e.preventDefault(); onPrivacyClick && onPrivacyClick(); }} 
            className="hover:text-gray-900 transition-colors cursor-pointer bg-transparent border-none p-0 font-bold text-[13px] text-gray-600 text-left"
          >
            {t('privacy_notice')}
          </button>
          <button 
            onClick={(e) => { e.preventDefault(); onCookieClick && onCookieClick(); }} 
            className="hover:text-gray-900 transition-colors cursor-pointer bg-transparent border-none p-0 font-bold text-[13px] text-gray-600 text-left"
          >
            {t('cookie_policy')}
          </button>
          <button 
            onClick={(e) => { e.preventDefault(); onTermsClick && onTermsClick(); }} 
            className="hover:text-gray-900 transition-colors cursor-pointer bg-transparent border-none p-0 font-bold text-[13px] text-gray-600 text-left"
          >
            {t('terms_conditions')}
          </button>
          <button 
            onClick={(e) => { e.preventDefault(); onHelpClick && onHelpClick(); }} 
            className="hover:text-gray-900 transition-colors cursor-pointer bg-transparent border-none p-0 font-bold text-[13px] text-gray-600 text-left"
          >
            {t('help_center')}
          </button>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="max-w-[1400px] mx-auto px-8 lg:px-12 py-8 flex flex-col md:flex-row justify-between items-center text-[12px] text-gray-500 gap-4 md:gap-0">

        {/* Text */}
        <div className="flex flex-col space-y-2">
          <p>{t('footer_text1')}</p>
          <p>{t('footer_text2')}</p>
        </div>

        {/* Social Icons */}
        <div className="flex items-center space-x-3">
          <a 
            href="https://www.facebook.com/hanamucy" 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center cursor-pointer hover:bg-gray-200 transition text-gray-500 hover:text-[#1877F2]"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z" /></svg>
          </a>
          <a 
            href="https://www.instagram.com/gc_koreanbbq/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center cursor-pointer hover:bg-gray-200 transition text-gray-500 hover:text-[#E4405F]"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153a4.908 4.908 0 0 1 1.153 1.772c.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 0 1-1.153 1.772 4.915 4.915 0 0 1-1.772 1.153c-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 0 1-1.772-1.153 4.904 4.904 0 0 1-1.153-1.772c-.248-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122.05-1.066.217-1.79.466-2.428a4.88 4.88 0 0 1 1.153-1.772A4.897 4.897 0 0 1 5.45 2.535c.638-.248 1.362-.415 2.428-.465C8.944 2.013 9.283 2 12 2zm0 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm6.5-.25a1.25 1.25 0 0 0-2.5 0 1.25 1.25 0 0 0 2.5 0zM12 9a3 3 0 1 1 0 6 3 3 0 0 1 0-6z" /></svg>
          </a>
          <div 
            onClick={(e) => { e.preventDefault(); onCorporateClick && onCorporateClick(); }}
            className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center cursor-pointer hover:bg-gray-200 transition text-gray-500 hover:text-[#640a0a]"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
