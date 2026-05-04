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
            src="https://scontent.fmnl14-2.fna.fbcdn.net/v/t39.30808-6/414820211_24446117301670315_6333978278326920804_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=1d70fc&_nc_eui2=AeHj56M924AN-nIC1b_7dsVv3gU-2rzyePneBT7avPJ4-RdZS6-sbisgarqtK_nSSKkN_aUrFcX-xoNaICHUj10m&_nc_ohc=nImjurVIoNwQ7kNvwGTuPxG&_nc_oc=AdolGO90KagNLt-XW7sXB2DXJc41TYs15IFBSqtFpaU1oCaD2SBL1-pfYtqDMMah98U&_nc_zt=23&_nc_ht=scontent.fmnl14-2.fna&_nc_gid=TPvKmlv03wfj8t-O4mqa0A&_nc_ss=7b2a8&oh=00_Af1xDYYw4h8CVzjmGx7qH3ZJjv6H-Z3BRGxOiEzr4EcB-A&oe=69EF8305"
            alt="G.C. Korean BBQ Mascot"
            className="w-[280px] h-[280px] object-cover"
          />
        </div>

        {/* Right Side: Text Content */}
        <div className="text-white text-left font-sans flex flex-col justify-center max-w-[700px]">
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
