import React, { useEffect, useRef } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const CartDropdown = ({ isOpen, onClose, cartItems = [], orderInfo = {}, onRemoveItem, onClearCart, onCheckout }) => {
  const { t } = useLanguage();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      // If the dropdown is open, and the click target is NOT inside the dropdown
      // AND it's NOT the toggle button itself
      if (
        dropdownRef.current && 
        !dropdownRef.current.contains(event.target) &&
        !event.target.closest('#cart-toggle-btn')
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

  // Handle Checkout Click
  const handleCheckoutClick = () => {
    if (normalizedItems.length > 0 && onCheckout) {
      onCheckout();
      onClose(); // Close dropdown after clicking checkout
    }
  };

  // Normalize product fields — OrderPage uses title/img/price/priceRange
  const normalizedItems = cartItems.map(item => {
    const itemPrice = parseFloat(item.price) || parseFloat((item.priceRange || '0').split('-')[0].trim()) || 0;
    const addOnsTotal = (item.selectedAddOns || []).reduce((sum, addon) => {
      const price = parseFloat(addon.price?.replace(/[^\d.]/g, '') || '0');
      return sum + (price * (addon.quantity || 1));
    }, 0);
    
    return {
      ...item,
      name: item.name || item.title || 'Unknown Item',
      image: item.image || item.img || '',
      price: itemPrice,
      addOnsPrice: addOnsTotal,
      totalItemPrice: (itemPrice * (item.quantity || 1)) + addOnsTotal,
      quantity: item.quantity || 1,
      selectedAddOns: item.selectedAddOns || []
    };
  });

  const subtotal = normalizedItems.reduce((acc, item) => acc + item.totalItemPrice, 0);

  return (
    <div ref={dropdownRef} className="fixed inset-x-0 bottom-0 sm:absolute sm:inset-auto sm:top-14 sm:right-0 sm:w-[420px] bg-white sm:rounded-2xl rounded-t-[24px] shadow-2xl z-[500] border border-gray-100 animate-fadeIn overflow-hidden flex flex-col max-h-[85vh]">
      {/* Pointer */}
      <div className="absolute -top-2 right-[60px] w-4 h-4 bg-white border-l border-t border-gray-100 rotate-45"></div>

      {/* Header */}
      <div className="px-6 py-5 flex items-center justify-between border-b border-gray-100 shrink-0">
        <h3 className="text-[18px] font-bold text-gray-900">{t('my_cart')} ({normalizedItems.length})</h3>
        {normalizedItems.length > 0 && (
          <button 
            onClick={onClearCart}
            className="text-[14px] font-bold text-[#640a0a] hover:underline transition-all"
          >
            {t('clear_cart')}
          </button>
        )}
      </div>

      {/* Items List */}
      <div className="flex-1 overflow-y-auto custom-scroll px-6 py-4 space-y-5">
        {normalizedItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <svg className="w-14 h-14 text-gray-200 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
            </svg>
            <p className="text-[15px] font-bold text-gray-400">{t('cart_empty_title')}</p>
            <p className="text-[13px] text-gray-400 mt-1">{t('cart_empty_desc')}</p>
          </div>
        ) : (
          normalizedItems.map((item) => (
            <div key={item.id} className="flex items-center space-x-4">
              <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0 border border-gray-100 bg-gray-50">
                {item.image ? (
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-300">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                  </div>
                )}
              </div>
              <div className="flex-1 flex flex-col text-left">
                <div className="flex justify-between items-start">
                  <span className="text-[15px] font-bold text-gray-900 leading-snug pr-2">{item.name}</span>
                  <button 
                    onClick={() => onRemoveItem(item.id)}
                    className="text-gray-400 hover:text-red-500 transition-colors p-1 shrink-0"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                  </button>
                </div>
                <span className="text-[14px] font-extrabold text-[#640a0a] mt-0.5">
                  ₱{item.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </span>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-[13px] text-gray-500 font-medium">{t('quantity')}: {item.quantity}</span>
                  <span className="text-[13px] font-black text-gray-800">₱{item.totalItemPrice.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                </div>
                
                {item.selectedAddOns.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {item.selectedAddOns.map((addon, i) => (
                      <span key={i} className="text-[10px] font-bold text-[#640a0a] bg-[#640a0a]/5 px-2 py-0.5 rounded-md border border-[#640a0a]/10">
                        +{addon.quantity} {addon.name}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>



      {/* Footer */}
      <div className="p-6 shrink-0">
        {normalizedItems.length > 0 && (
          <div className="flex items-center justify-between mb-4">
            <span className="text-[16px] font-bold text-gray-500">{t('subtotal')}</span>
            <span className="text-[19px] font-extrabold text-gray-900">
              ₱{subtotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </span>
          </div>
        )}
        <button
          onClick={handleCheckoutClick}
          className={`w-full font-bold py-4 rounded-xl text-[16px] transition-all active:scale-[0.98] ${normalizedItems.length > 0
              ? 'bg-[#640a0a] hover:bg-[#850d0d] text-white shadow-lg shadow-[#640a0a]/20'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
        >
          {normalizedItems.length > 0 ? t('view_checkout') : t('cart_is_empty')}
        </button>
      </div>
    </div>
  );
};

export default CartDropdown;
