import React from 'react';

const MenuCard = ({ title, subtitle, details, price, isRice, imageSrc, onOrderNow }) => {
  return (
    <div className="bg-gradient-to-tr from-[#2b0101] to-[#6a0505] rounded-xl overflow-hidden flex shadow-lg hover:shadow-xl transition-shadow duration-300 border border-[#81130d] h-[155px] sm:h-[200px] lg:h-[220px]">
      {/* Left Content */}
      <div className="p-2 sm:p-4 flex flex-col justify-between flex-1 relative z-10 text-left">
        <div>
          <h3 className="text-white font-bold text-[11.5px] sm:text-[16px] lg:text-xl mb-0.5 sm:mb-1 leading-tight font-sans tracking-tight">{title}</h3>
          {(subtitle || details) && (
            <p className="text-gray-300 text-[8.5px] sm:text-xs leading-snug mb-1 pr-1 line-clamp-2">
              {subtitle && <span className="block mb-0.5">{subtitle}</span>}
              {details && <span>{details}</span>}
            </p>
          )}
          {price && (
            <p className="text-[#d4af37] font-bold text-[10px] sm:text-sm mt-0.5 my-1">₱ {price}</p>
          )}
          {isRice && (
            <p className="text-white font-bold text-[8.5px] sm:text-sm tracking-tight leading-tight mt-1 sm:mt-6 pr-1">
              LAST DAY OF OUR UNLIMITED RICE TODAY!!!
            </p>
          )}
        </div>
        <div>
          <button onClick={onOrderNow} className="bg-[#7c1414] border border-[#a32212] text-white text-[8.5px] sm:text-xs font-semibold px-2 sm:px-4 py-1 sm:py-1.5 rounded hover:bg-[#5B0F0F] transition shadow-md active:scale-95">
            Order Now
          </button>
        </div>
        {/* Subtle dark gradient overlay fading out from left */}
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-transparent to-black opacity-30 z-[-1]"></div>
      </div>

      {/* Right Image */}
      <div 
        className="w-[45%] h-full flex-shrink-0 relative group-hover:brightness-110 transition-all duration-300"
        style={{ filter: 'drop-shadow(-10px 0 15px rgba(0,0,0,0.5))' }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#2b0101] via-transparent to-transparent z-10 w-8"></div>
        <img
          src={imageSrc}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default MenuCard;
