import React, { useEffect } from 'react';

const CorporateInformation = ({ onClose }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex flex-col animate-fadeIn bg-white min-h-full w-full font-sans text-black pb-12">
      
      <div className="px-8 py-6 mb-2 border-b border-gray-100">
        <h2 className="text-[22px] font-bold tracking-tight text-[#640a0a]">Corporate Information</h2>
      </div>

      <div className="px-8 py-6 w-full">

          {/* Business Info and Logo Box */}
          <div className="py-6 sm:py-8 mb-8 flex flex-col-reverse md:flex-row justify-between items-center bg-white">
             <div className="flex-1 w-full mt-8 md:mt-0">
               <div className="flex items-center space-x-3 mb-6">
                 <svg className="w-7 h-7 text-[#640a0a]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                 <h2 className="text-[17px] font-black text-[#640a0a] tracking-widest uppercase">Business Information</h2>
               </div>
               
               <div className="space-y-4">
                 <div className="flex flex-col sm:flex-row sm:items-start">
                   <span className="w-48 font-bold text-[#640a0a] mb-1 sm:mb-0">BUSINESS NAME</span>
                   <span className="font-semibold text-gray-800 hidden sm:inline mr-2">:</span>
                   <span className="font-semibold text-gray-800">G.C KOREAN BBQ</span>
                 </div>
                 <div className="flex flex-col sm:flex-row sm:items-start">
                   <span className="w-48 font-bold text-[#640a0a] mb-1 sm:mb-0">BUSINESS OWNER INFO</span>
                   <span className="font-medium text-gray-800 hidden sm:inline mr-2">:</span>
                   <span className="font-medium text-gray-800">Hana Diwana Geslaga</span>
                 </div>
                 <div className="flex flex-col sm:flex-row sm:items-start">
                   <span className="w-48 font-bold text-[#640a0a] mb-1 sm:mb-0">BUSINESS TYPE</span>
                   <span className="font-medium text-gray-800 hidden sm:inline mr-2">:</span>
                   <span className="font-medium text-gray-800">Samgyupsal, Home Service & Food Pack</span>
                 </div>
               </div>
             </div>
             
             {/* Logo */}
             <div className="w-48 h-48 sm:w-56 sm:h-56 shrink-0 flex items-center justify-center">
               <img src="https://scontent.fmnl14-2.fna.fbcdn.net/v/t39.30808-6/414820211_24446117301670315_6333978278326920804_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=1d70fc&_nc_eui2=AeHj56M924AN-nIC1b_7dsVv3gU-2rzyePneBT7avPJ4-RdZS6-sbisgarqtK_nSSKkN_aUrFcX-xoNaICHUj10m&_nc_ohc=nImjurVIoNwQ7kNvwGCCqfR&_nc_oc=AdoKVu7D_Xy0WbGzHlbjY5ZtEtagrzXFKs89apVHwZas6GAdMkUTnneMx7UiciMlAzI&_nc_zt=23&_nc_ht=scontent.fmnl14-2.fna&_nc_gid=ljmFn3p0w6petYuAHS2a8g&_nc_ss=7a2a8&oh=00_Af12ECLaP_rCRhhKpKb84HvJSlNiCUZyg_-MZG5LjZGzdQ&oe=69EF4AC5" alt="GC Korean BBQ Logo" className="w-full h-full object-contain" />
             </div>
          </div>

          {/* Mission & Vision */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            <div className="py-6 sm:py-8 bg-white">
               <div className="flex items-center space-x-3 mb-4">
                 {/* Target Icon */}
                 <svg className="w-8 h-8 text-[#640a0a]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672zm-7.518-.267A8.25 8.25 0 1120.25 10.5M8.288 14.212A5.25 5.25 0 1117.25 10.5" /></svg>
                 <h2 className="text-[17px] font-black text-[#640a0a] tracking-widest uppercase">Mission</h2>
               </div>
               <p className="text-gray-800 text-[16px] leading-relaxed">To be the favorite Korean BBQ spot<br className="hidden sm:block"/>for food lovers.</p>
            </div>
            
            <div className="py-6 sm:py-8 bg-white">
               <div className="flex items-center space-x-3 mb-4">
                 {/* Eye Icon */}
                 <svg className="w-8 h-8 text-[#640a0a]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                 <h2 className="text-[17px] font-black text-[#640a0a] tracking-widest uppercase">Vision</h2>
               </div>
               <p className="text-gray-800 text-[16px] leading-relaxed">To bring people together through Korean<br className="hidden sm:block"/>food, drinks, and unforgettable moments.</p>
            </div>
          </div>

          {/* Bottom Grid Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10 pl-2">
             {/* Left Column */}
             <div className="space-y-10">
               {/* Address */}
               <div className="flex space-x-4 items-start">
                 <svg className="w-7 h-7 text-[#640a0a] shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                 <div>
                   <h3 className="font-bold text-[16px] text-black mb-1">Principal Geographical Address</h3>
                   <p className="text-gray-600 text-[15px] leading-relaxed">Guanzon St., Brgy 15,<br/>Gingoog City, Philippines, 9014</p>
                 </div>
               </div>

               {/* Services */}
               <div className="flex space-x-4 items-start">
                 <svg className="w-7 h-7 text-[#640a0a] shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M4 6h16M4 10h16M4 14h16M4 18h16" /></svg>
                 <div>
                   <h3 className="font-bold text-[16px] text-black mb-1">Services (Specialties)</h3>
                   <p className="text-gray-600 text-[15px] leading-relaxed">Dine-in • Curbside Pickup • In-store Pickup •<br className="hidden sm:block"/>Outdoor Seating</p>
                 </div>
               </div>
             </div>

             {/* Right Column */}
             <div className="space-y-10">
               {/* Telephone */}
               <div className="flex space-x-4 items-start">
                 <svg className="w-7 h-7 text-[#640a0a] shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                 <div>
                   <h3 className="font-bold text-[16px] text-black mb-1">Telephone Number</h3>
                   <a href="tel:09262907130" className="text-gray-600 text-[15px] hover:text-[#640a0a] transition-colors font-medium">0926 290 7130</a>
                 </div>
               </div>

               {/* Contact */}
               <div className="flex space-x-4 items-start">
                 <svg className="w-7 h-7 text-[#640a0a] shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                 <div>
                   <h3 className="font-bold text-[16px] text-black mb-2">Contact Information</h3>
                   <div className="flex flex-col space-y-2 mt-1">
                     <div className="flex items-center space-x-3 text-gray-700">
                       <svg className="w-5 h-5 text-[#640a0a]" fill="currentColor" viewBox="0 0 20 20"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" /><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" /></svg>
                       <span className="text-[15px]">gckoreanbbq@gmail.com</span>
                     </div>
                     <div className="flex items-center space-x-3 text-gray-700">
                       <svg className="w-5 h-5 text-[#640a0a]" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" /></svg>
                       <span className="text-[15px]">GC Korean Bbq</span>
                     </div>
                   </div>
                 </div>
               </div>
             </div>
          </div>
      </div>
    </div>
  );
};

export default CorporateInformation;
