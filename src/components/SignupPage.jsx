import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const SignupPage = ({ onLoginClick }) => {
  const { t } = useLanguage();
  return (
    <div className="min-h-screen bg-[#5b0808] flex flex-col items-center justify-center font-sans text-white">
      {/* Logo */}
      <div className="mb-8 flex justify-center">
        <img
          src="/gc-logo.png"
          alt="G.C. Korean BBQ Logo"
          className="w-32 h-auto"
        />
      </div>

      {/* Signup Form */}
      <div className="w-full max-w-[320px] mx-auto flex flex-col space-y-4">
        {/* Email Field */}
        <div>
          <label className="block text-sm mb-1 ml-1 text-gray-200">{t('email_or_mobile')}</label>
          <input
            type="text"
            className="w-full px-4 py-3 rounded-xl bg-white text-black outline-none border border-transparent focus:ring-2 focus:ring-[#811010]"
          />
        </div>

        {/* Password Field */}
        <div>
          <label className="block text-sm mb-1 ml-1 text-gray-200">{t('password')}</label>
          <input
            type="password"
            className="w-full px-4 py-3 rounded-xl bg-white text-black outline-none border border-transparent focus:ring-2 focus:ring-[#811010]"
          />
        </div>

        {/* Confirm Password Field */}
        <div>
          <label className="block text-sm mb-1 ml-1 text-gray-200">{t('confirm_password')}</label>
          <input
            type="password"
            className="w-full px-4 py-3 rounded-xl bg-white text-black outline-none border border-transparent focus:ring-2 focus:ring-[#811010]"
          />
        </div>

        {/* Sign Up Button */}
        <div className="flex justify-center mt-4 pt-2">
          <button className="w-[80%] bg-white text-[#5b0808] font-bold py-2.5 rounded-xl text-lg shadow-sm hover:bg-gray-100 transition-colors">
            {t('sign_up')}
          </button>
        </div>

        {/* Back to Login Link */}
        <div className="text-center mt-2">
          <button onClick={onLoginClick} className="text-sm font-bold underline text-white hover:text-gray-300">
            {t('back_to_login')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
