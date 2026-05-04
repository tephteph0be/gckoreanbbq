import React, { useEffect, useRef } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const ProfileDropdown = ({ isOpen, onClose, onLogout, user = null, onAccountSettingsClick, onLoginClick, onOrdersClick }) => {
  const { t } = useLanguage();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current && 
        !dropdownRef.current.contains(event.target) &&
        !event.target.closest('#profile-toggle-btn')
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const displayUsername = user?.username || 'Guest User';
  const displayEmail = user?.email || 'No email provided';
  const displayAddress = user?.address || 'No address provided';
  const displayContact = user?.contact || 'No contact provided';

  return (
    <div ref={dropdownRef} className="absolute top-14 right-0 w-[340px] bg-white rounded-2xl shadow-2xl z-[500] border border-gray-100 animate-fadeIn overflow-hidden">
      {/* Pointer/Triangle */}
      <div className="absolute -top-2 right-4 w-4 h-4 bg-white border-l border-t border-gray-100 rotate-45"></div>

      {/* Profile Header */}
      <div className="p-6 flex items-center space-x-4 border-b border-gray-50 text-left">
        <div className="w-16 h-16 rounded-full bg-[#640a0a]/10 flex items-center justify-center overflow-hidden shrink-0 border border-[#640a0a]/20">
          <span className="text-[#640a0a] font-black text-2xl">{displayUsername.charAt(0).toUpperCase()}</span>
        </div>
        <div className="flex flex-col">
          <h3 className="text-[19px] font-bold text-gray-900 leading-tight">{displayUsername}</h3>
          <p className="text-[14px] text-gray-500 font-medium mt-1">{displayEmail}</p>
        </div>
      </div>

      {/* Profile Info Rows */}
      <div className="p-6 space-y-6 text-left">
        {user && (
          <>
            {/* Your Orders Button */}
            <button 
              onClick={() => { onClose(); if(onOrdersClick) onOrdersClick(); }}
              className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 rounded-xl transition-all group border border-gray-100"
            >
              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 rounded-lg bg-white flex items-center justify-center shadow-sm text-[#640a0a]">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
                </div>
                <span className="text-[16px] font-bold text-gray-900 group-hover:text-[#640a0a]">Your Orders</span>
              </div>
              <svg className="w-5 h-5 text-gray-400 group-hover:text-[#640a0a] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7"></path></svg>
            </button>

            {/* Account Settings Button */}
            <button onClick={() => { onClose(); onAccountSettingsClick(); }} className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 rounded-xl transition-all group mb-2 border border-gray-100">
              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 rounded-lg bg-white flex items-center justify-center shadow-sm text-[#640a0a]">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                </div>
                <span className="text-[16px] font-bold text-gray-900 group-hover:text-[#640a0a]">Account Settings</span>
              </div>
              <svg className="w-5 h-5 text-gray-400 group-hover:text-[#640a0a] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7"></path></svg>
            </button>
          </>
        )}

        {/* Username Row */}
        <div className="flex items-start space-x-4">
          <div className="mt-1">
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
          </div>
          <div className="flex flex-col">
            <span className="text-[15px] font-bold text-gray-900">{t('username')}</span>
            <span className="text-[14px] text-gray-500 font-medium mt-0.5">{displayUsername}</span>
          </div>
        </div>

        {/* Email Row */}
        <div className="flex items-start space-x-4">
          <div className="mt-1">
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
          </div>
          <div className="flex flex-col">
            <span className="text-[15px] font-bold text-gray-900">{t('email_address')}</span>
            <span className="text-[14px] text-gray-500 font-medium mt-0.5">{displayEmail}</span>
          </div>
        </div>

        {/* Address Row */}
        <div className="flex items-start space-x-4">
          <div className="mt-1">
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
          </div>
          <div className="flex flex-col">
            <span className="text-[15px] font-bold text-gray-900">{t('address')}</span>
            <span className="text-[13px] text-gray-500 font-medium mt-1 leading-relaxed whitespace-pre-wrap">
              {displayAddress}
            </span>
          </div>
        </div>

        {/* Contact Row */}
        <div className="flex items-start space-x-4">
          <div className="mt-1">
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
          </div>
          <div className="flex flex-col">
            <span className="text-[15px] font-bold text-gray-900">{t('contact_number')}</span>
            <span className="text-[14px] text-gray-500 font-medium mt-0.5">{displayContact}</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="p-6 pt-2">
        {user ? (
          <button
            onClick={onLogout}
            className="w-full flex items-center justify-center space-x-2 border-2 border-[#640a0a]/10 hover:border-[#640a0a]/30 rounded-xl py-3.5 transition-all group"
          >
            <svg className="w-5 h-5 text-[#640a0a] group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
            <span className="text-[#640a0a] font-extrabold text-[16px]">{t('logout')}</span>
          </button>
        ) : (
          <button
            onClick={() => { onClose(); if(onLoginClick) onLoginClick(); }}
            className="w-full bg-[#640a0a] hover:bg-[#850d0d] transition-colors text-white font-bold py-3 px-8 rounded-full shadow-md text-[16px]"
          >
            {t('login_register')}
          </button>
        )}
      </div>
    </div>
  );
};

export default ProfileDropdown;
