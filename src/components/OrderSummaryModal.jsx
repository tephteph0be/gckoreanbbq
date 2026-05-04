import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const OrderSummaryModal = ({ isOpen, onClose, product, onProceed }) => {
  const { t } = useLanguage();
  const [quantity, setQuantity] = useState(product?.quantity || 1);
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (product) {
      setQuantity(product.quantity || 1);
      // Construct items list: main product + add-ons
      const mainItem = {
        id: 'main',
        name: product.title,
        price: parseFloat(product.price || product.priceRange || 0),
        qty: product.quantity || 1,
        img: product.img,
        isMain: true
      };

      const addOns = (product.selectedAddOns || []).map((addon, index) => ({
        id: `addon-${index}`,
        name: addon.name,
        price: parseFloat(addon.price?.replace('₱ ', '') || 0),
        qty: (addon.quantity || 1), 
        img: addon.img,
        isMain: false
      }));

      setItems([mainItem, ...addOns]);
    }
  }, [product]);

  if (!isOpen || !product) return null;

  const updateQty = (id, newQty) => {
    if (newQty < 1) return;
    setItems(items.map(item => item.id === id ? { ...item, qty: newQty } : item));
    if (id === 'main') setQuantity(newQty);
  };

  const removeItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  const subtotal = items.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const total = subtotal;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fadeIn" onClick={onClose}>
      <div className="bg-white w-full max-w-md rounded-[32px] shadow-2xl flex flex-col overflow-hidden animate-slideUp" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 pb-4 border-b border-gray-100">
          <h2 className="text-[20px] font-bold text-[#1a1c2e]">{t('order_summary')}</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scroll max-h-[70vh]">
          {/* Table Header */}
          <div className="flex text-[12px] font-bold text-gray-400 uppercase tracking-wider pb-2">
            <span className="flex-1">Item</span>
            <span className="w-20 text-center">Qty</span>
            <span className="w-24 text-right">Price</span>
          </div>

          {/* Main Item */}
          {items.filter(i => i.isMain).map(item => (
            <div key={item.id} className="flex items-center space-x-3">
              <div className="w-14 h-14 rounded-xl overflow-hidden shadow-sm border border-gray-100 shrink-0">
                <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 flex flex-col min-w-0">
                <h3 className="text-[14px] font-bold text-gray-800 leading-tight truncate">{item.name}</h3>
                <span className="text-[13px] text-gray-500 font-semibold mt-0.5">₱ {item.price.toFixed(2)}</span>
              </div>
              <div className="flex items-center bg-gray-50 rounded-lg border border-gray-100 h-9 shrink-0">
                <button onClick={() => updateQty(item.id, item.qty - 1)} className="px-2 text-gray-400 hover:text-gray-600 transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M20 12H4" /></svg>
                </button>
                <span className="w-6 text-center text-[14px] font-bold text-gray-700">{item.qty}</span>
                <button onClick={() => updateQty(item.id, item.qty + 1)} className="px-2 text-gray-400 hover:text-gray-600 transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 4v16m8-8H4" /></svg>
                </button>
              </div>
              <div className="w-20 text-right flex flex-col items-end">
                <span className="text-[14px] font-bold text-gray-800">₱ {(item.price * item.qty).toFixed(2)}</span>
                <button onClick={() => removeItem(item.id)} className="mt-1 text-red-500 hover:text-red-700 transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                </button>
              </div>
            </div>
          ))}

          {/* Add-ons Section */}
          {items.filter(i => !i.isMain).length > 0 && (
            <div className="pt-4 border-t border-dashed border-gray-100">
              <h4 className="text-[13px] font-bold text-red-800 uppercase tracking-wide mb-4">Add Ons</h4>
              <div className="space-y-4">
                {items.filter(i => !i.isMain).map(item => (
                  <div key={item.id} className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-full overflow-hidden border border-gray-100 shrink-0">
                      <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h5 className="text-[13.5px] font-semibold text-gray-700 leading-tight truncate">{item.name}</h5>
                    </div>
                    <div className="flex items-center bg-gray-50 rounded-lg border border-gray-100 h-8 shrink-0">
                      <button onClick={() => updateQty(item.id, item.qty - 1)} className="px-1.5 text-gray-400 hover:text-gray-600 transition-colors">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M20 12H4" /></svg>
                      </button>
                      <span className="w-5 text-center text-[13px] font-bold text-gray-700">{item.qty}</span>
                      <button onClick={() => updateQty(item.id, item.qty + 1)} className="px-1.5 text-gray-400 hover:text-gray-600 transition-colors">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 4v16m8-8H4" /></svg>
                      </button>
                    </div>
                    <div className="w-20 text-right flex flex-col items-end">
                      <span className="text-[13.5px] font-bold text-gray-800">₱ {(item.price * item.qty).toFixed(2)}</span>
                      <button onClick={() => removeItem(item.id)} className="mt-1 text-red-400 hover:text-red-600 transition-colors">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Financials */}
          <div className="pt-6 border-t border-gray-100 space-y-3">
            <div className="flex justify-between items-center text-[15px] font-medium text-gray-600">
              <span>Subtotal</span>
              <span className="text-gray-900 font-bold">₱ {subtotal.toFixed(2)}</span>
            </div>

            <hr className="border-gray-100 my-2" />
            <div className="flex justify-between items-center py-2">
              <span className="text-[18px] font-bold text-gray-800">Total</span>
              <span className="text-[24px] font-extrabold text-[#7d1919]">₱ {total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-6 pt-2 space-y-3 bg-white">
          <button onClick={onProceed} className="w-full h-[56px] bg-[#640a0a] hover:bg-[#520808] text-white rounded-2xl font-bold text-[16px] shadow-lg shadow-red-900/10 transition-all active:scale-[0.98]">
            Proceed to Checkout
          </button>
          <button onClick={onClose} className="w-full h-[56px] bg-white border-2 border-gray-100 text-gray-700 rounded-2xl font-bold text-[16px] flex items-center justify-center space-x-2 hover:bg-gray-50 transition-all active:scale-[0.98]">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
            <span>Continue Ordering</span>
          </button>
          <div className="flex items-center justify-center space-x-2 text-[11px] text-gray-400 font-medium pt-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
            <span>Your order is secure and encrypted</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummaryModal;
