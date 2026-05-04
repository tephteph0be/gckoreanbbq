import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import ProfileDropdown from './ProfileDropdown';
import CartDropdown from './CartDropdown';

const Navbar = ({ onMenuClick, onLoginClick, onOrderClick, isLoggedIn, onLogout, onCheckout, cartCount = 0, cartItems = [], orderInfo = {}, currentUser = null, onAccountSettingsClick, onOrdersClick }) => {
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { currentLang, setCurrentLang, t } = useLanguage();

  return (
    <>
      <nav className="bg-[#680000] border-b border-white/5 py-3 px-4 sm:px-8 flex justify-between items-center text-white font-sans relative z-40 shadow-md">
        {/* Left side: Logo and Brand Name */}
        <div className="flex items-center space-x-4">
          {/* Hamburger Icon */}
          <button onClick={onMenuClick} className="text-white hover:text-gray-300 transition-colors cursor-pointer">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
          <div className="flex items-center space-x-1.5 sm:space-x-3" onClick={onOrderClick} style={{ cursor: 'pointer' }}>
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden border-1 border-white bg-white shrink-0">
              <div className="w-full h-full flex items-center justify-center bg-gray-900 text-xs font-bold text-maroon-500 text-center leading-tight">
                <img src="https://scontent.fmnl14-2.fna.fbcdn.net/v/t39.30808-6/414820211_24446117301670315_6333978278326920804_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=1d70fc&_nc_eui2=AeHj56M924AN-nIC1b_7dsVv3gU-2rzyePneBT7avPJ4-RdZS6-sbisgarqtK_nSSKkN_aUrFcX-xoNaICHUj10m&_nc_ohc=nImjurVIoNwQ7kNvwGCCqfR&_nc_oc=AdoKVu7D_Xy0WbGzHlbjY5ZtEtagrzXFKs89apVHwZas6GAdMkUTnneMx7UiciMlAzI&_nc_zt=23&_nc_ht=scontent.fmnl14-2.fna&_nc_gid=ljmFn3p0w6petYuAHS2a8g&_nc_ss=7a2a8&oh=00_Af12ECLaP_rCRhhKpKb84HvJSlNiCUZyg_-MZG5LjZGzdQ&oe=69EF4AC5" alt="GC Logo" />
              </div>
            </div>
            <span className="text-[15px] sm:text-2xl font-bold font-display tracking-tight mt-1 whitespace-nowrap">G.C. KOREAN BBQ</span>
          </div>
        </div>

        {/* Right side: Actions */}
        <div className="flex items-center space-x-1.5 sm:space-x-4">
          {/* Cart Icon with Badge */}
          <div className="relative">
            <button 
              id="cart-toggle-btn"
              onClick={() => currentUser && setIsCartOpen(!isCartOpen)}
              className={`text-white transition-colors p-2 ${currentUser ? 'hover:text-[#d4af37]' : 'opacity-50 cursor-default pointer-events-none'}`}
            >
              <div className="relative">
                <svg className="w-7 h-7 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
                </svg>
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#d4af37] text-[#640a0a] text-[10px] sm:text-[11px] font-extrabold rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center shadow-sm">
                    {cartCount}
                  </span>
                )}
              </div>
            </button>

            <CartDropdown 
              isOpen={isCartOpen} 
              onClose={() => setIsCartOpen(false)} 
              cartItems={cartItems} 
              orderInfo={orderInfo}
              onCheckout={onCheckout}
            />
          </div>

          {!isLoggedIn ? (
            <button onClick={onLoginClick} className="px-2.5 py-1 sm:px-5 sm:py-1.5 border border-white text-white rounded-full text-[11px] sm:text-sm font-medium hover:bg-white hover:text-[#640a0a] transition-colors whitespace-nowrap">
              {t('login')}
            </button>
          ) : (
            <div className="relative flex items-center space-x-2 group">
              <span className="hidden sm:inline-block text-sm font-bold text-gray-200">
                {currentUser?.username || currentUser?.email?.split('@')[0]}
              </span>
              <div 
                id="profile-toggle-btn"
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center overflow-hidden cursor-pointer hover:bg-gray-300 transition-colors"
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-gray-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg>
              </div>
              <ProfileDropdown 
                isOpen={isProfileOpen} 
                onClose={() => setIsProfileOpen(false)} 
                onLogout={onLogout} 
                user={currentUser}
                onAccountSettingsClick={onAccountSettingsClick}
                onLoginClick={onLoginClick}
                onOrdersClick={onOrdersClick}
              />
            </div>
          )}

          {/* Language selector */}
          <div className="relative">
            <div
              className="bg-white text-gray-800 px-2 py-1.5 sm:px-4 rounded-full shadow-sm text-[11px] sm:text-sm font-semibold flex items-center justify-between cursor-pointer w-[60px] sm:w-20"
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
            >
              <span>{currentLang}</span>
              <svg className={`w-3 h-3 sm:w-4 sm:h-4 text-gray-600 transition-transform ${langDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7"></path>
              </svg>
            </div>

            {langDropdownOpen && (
              <>
                <div className="fixed inset-0 z-[45]" onClick={() => setLangDropdownOpen(false)}></div>
                <div className="absolute top-10 right-0 w-20 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden flex flex-col z-50">
                  {['EN', 'KO', 'TL'].map((lang) => (
                    <button
                      key={lang}
                      onClick={() => {
                        setCurrentLang(lang);
                        setLangDropdownOpen(false);
                      }}
                      className={`block w-full text-center px-4 py-2 text-sm font-semibold hover:bg-gray-100 transition-colors ${currentLang === lang ? 'bg-gray-50 text-[#640a0a]' : 'text-gray-800'}`}
                    >
                      {lang}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          </div>
      </nav>
    </>
  );
};

export default Navbar;
