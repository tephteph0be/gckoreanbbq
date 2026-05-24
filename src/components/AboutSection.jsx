import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const AboutSection = () => {
  const { t } = useLanguage();
  return (
    <div id="about-section" className="bg-[#680000] w-full py-8 sm:py-12 px-4 sm:px-8">
      <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row items-center gap-6 md:gap-0 md:space-x-12">

        {/* Left Side: Logo in White Box */}
        <div className="bg-white p-4 flex-shrink-0 border border-gray-200">
          <img
            src="/gc-logo.png"
            alt="G.C. Korean BBQ Mascot"
            className="w-[280px] h-[280px] object-cover"
          />
        </div>

        {/* Right Side: Text Content */}
        <div className="text-white text-center font-sans flex flex-col justify-center max-w-[700px]">
          <h2 className="text-3xl font-bold tracking-tight mb-3">
            {t('about_title')}
          </h2>
          <p className="font-bold mb-5 tracking-wide text-[16px]">
            {t('about_welcome')}
          </p>
          <p className="font-semibold text-gray-100 text-[15px] leading-relaxed mb-5">
            {t('about_p1')}
          </p>
          <p className="font-semibold text-gray-100 text-[15px] leading-relaxed">
            {t('about_p2')}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
