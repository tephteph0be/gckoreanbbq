import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const CheckoutModal = ({ isOpen, onClose, cartItems = [], onSelectItemFulfillment, onProceed }) => {
  const { t } = useLanguage();
  const [selectedIndices, setSelectedIndices] = useState([]);

  useEffect(() => {
    // Default to selecting all items when modal opens
    if (isOpen) {
      setSelectedIndices(cartItems.map((_, i) => i));
    }
  }, [isOpen, cartItems.length]);

  if (!isOpen) return null;

  const toggleSelectAll = () => {
    if (selectedIndices.length === cartItems.length) {
      setSelectedIndices([]);
    } else {
      setSelectedIndices(cartItems.map((_, i) => i));
    }
  };

  const toggleItemSelection = (idx) => {
    setSelectedIndices(prev =>
      prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]
    );
  };

  const selectedItems = cartItems.filter((_, idx) => selectedIndices.includes(idx));

  const subtotal = selectedItems.reduce((acc, item) => {
    const price = parseFloat(item.price) || parseFloat((item.priceRange || '0').split('-')[0].trim()) || 0;
    const addOnsTotal = (item.selectedAddOns || []).reduce((sum, addon) => {
      const addonPrice = parseFloat(addon.price?.replace(/[^\d.]/g, '') || '0');
      return sum + (addonPrice * (addon.quantity || 1));
    }, 0);
    return acc + (price * (item.quantity || 1)) + addOnsTotal;
  }, 0);

  const total = selectedItems.length > 0 ? subtotal : 0;
  const allSelectedHaveFulfillment = selectedItems.length > 0 && selectedItems.every(item => !!item.fulfillment?.address || (item.fulfillment?.date && item.fulfillment?.time));

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fadeIn" onClick={onClose}>
      <div className="bg-white w-full max-w-lg rounded-[32px] shadow-2xl flex flex-col overflow-hidden animate-slideUp max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 pb-4 border-b border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-[#640a0a]/10 rounded-xl flex items-center justify-center text-[#640a0a]">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M16 11V7a4 4 0 118 0v4M5 9h14l1 12H4L5 9z" /></svg>
            </div>
            <h2 className="text-[22px] font-black text-gray-900 tracking-tight">{t('view_checkout')}</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scroll">
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-[13px] font-bold text-gray-400 uppercase tracking-wider">Order Items</h3>
              <button
                onClick={toggleSelectAll}
                className="text-[12px] font-bold text-[#640a0a] hover:underline"
              >
                {selectedIndices.length === cartItems.length ? 'Deselect All' : 'Select All'}
              </button>
            </div>

            {cartItems.map((item, idx) => {
              const price = parseFloat(item.price) || parseFloat((item.priceRange || '0').split('-')[0].trim()) || 0;
              const name = item.name || item.title || 'Item';
              const img = item.image || item.img;
              const hasType = !!item.fulfillment?.type;
              const hasDetails = !!(item.fulfillment?.address || (item.fulfillment?.date && item.fulfillment?.time));
              const isSelected = selectedIndices.includes(idx);

              return (
                <div
                  key={idx}
                  className={`flex flex-col space-y-3 p-4 rounded-2xl border transition-all bg-white relative ${isSelected ? 'border-[#640a0a]/30 ring-1 ring-[#640a0a]/10' : 'border-gray-50 opacity-60 grayscale-[0.5]'}`}
                >
                  <div
                    onClick={() => toggleItemSelection(idx)}
                    className={`absolute top-4 left-4 w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all cursor-pointer z-10 ${isSelected ? 'bg-[#640a0a] border-[#640a0a]' : 'border-gray-300 bg-white'}`}
                  >
                    {isSelected && <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.5" d="M5 13l4 4L19 7" /></svg>}
                  </div>

                  <div className="flex items-center space-x-4 pl-8">
                    <div className="w-16 h-16 rounded-xl overflow-hidden shadow-sm border border-gray-100 shrink-0">
                      <img src={img} alt={name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-[15px] font-bold text-gray-900 truncate">{name}</h3>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="text-[13px] font-bold text-[#640a0a]">₱{price.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                        <span className="text-[12px] text-gray-400 font-medium">x {item.quantity || 1}</span>
                      </div>
                      {item.selectedAddOns && item.selectedAddOns.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-1.5">
                          {item.selectedAddOns.map((addon, i) => (
                            <span key={i} className="text-[10px] font-bold text-[#640a0a] bg-[#640a0a]/5 px-2 py-0.5 rounded-md border border-[#640a0a]/10">
                              +{addon.quantity} {addon.name}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="text-right">
                      <span className="text-[15px] font-black text-gray-900">
                        ₱{((price * (item.quantity || 1)) + (item.selectedAddOns || []).reduce((sum, a) => sum + (parseFloat(a.price?.replace(/[^\d.]/g, '') || '0') * (a.quantity || 1)), 0)).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                      </span>
                    </div>
                  </div>

                  {/* Per-item Fulfillment Actions */}
                  <div className="pl-8">
                    {!hasDetails ? (
                      <div className="flex gap-2">
                        <button
                          onClick={(e) => { e.stopPropagation(); onSelectItemFulfillment(idx, 'Pickup'); }}
                          className="flex-1 flex items-center justify-center space-x-2 p-3 rounded-xl border border-gray-100 bg-gray-50 hover:bg-gray-100 hover:border-gray-200 transition-all active:scale-[0.95] group"
                        >
                          <div className="w-6 h-6 rounded-lg bg-white shadow-sm flex items-center justify-center text-gray-400 group-hover:text-[#640a0a]">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M16 11V7a4 4 0 118 0v4M5 9h14l1 12H4L5 9z" /></svg>
                          </div>
                          <span className="text-[13px] font-bold text-gray-600">Pickup</span>
                        </button>
                        <button
                          onClick={(e) => { e.stopPropagation(); onSelectItemFulfillment(idx, 'Delivery'); }}
                          className="flex-1 flex items-center justify-center space-x-2 p-3 rounded-xl border border-gray-100 bg-gray-50 hover:bg-gray-100 hover:border-gray-200 transition-all active:scale-[0.95] group"
                        >
                          <div className="w-6 h-6 rounded-lg bg-white shadow-sm flex items-center justify-center text-gray-400 group-hover:text-[#640a0a]">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                          </div>
                          <span className="text-[13px] font-bold text-gray-600">Delivery</span>
                        </button>
                      </div>
                    ) : (
                      <div
                        onClick={(e) => { e.stopPropagation(); onSelectItemFulfillment(idx, item.fulfillment.type); }}
                        className="flex items-center justify-between p-3 rounded-xl border border-[#640a0a]/20 bg-[#640a0a]/5 cursor-pointer hover:bg-[#640a0a]/10 transition-all active:scale-[0.98]"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 rounded-lg bg-[#640a0a] text-white flex items-center justify-center">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              {item.fulfillment.type === 'Delivery' ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                              ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 118 0v4M5 9h14l1 12H4L5 9z" />
                              )}
                            </svg>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-[13px] font-black uppercase tracking-wider text-[#640a0a]">
                              {item.fulfillment.type}
                            </span>
                            <span className="text-[11px] text-gray-500 font-medium truncate max-w-[180px] border-l border-[#640a0a]/20 pl-2">
                              {item.fulfillment.type === 'Delivery'
                                ? `${item.fulfillment.address || 'Address not set'}${item.fulfillment.date && item.fulfillment.time ? ` • ${item.fulfillment.date} ${item.fulfillment.time}` : ''}`
                                : (item.fulfillment.date && item.fulfillment.time ? `${item.fulfillment.date} ${item.fulfillment.time}` : 'Schedule not set')}
                            </span>
                          </div>
                        </div>
                        <svg className="w-4 h-4 text-[#640a0a]/40" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Totals */}
          <div className="pt-6 border-t border-gray-100 space-y-3">
            <div className="flex justify-between items-center text-[15px] font-bold text-gray-500">
              <span>Subtotal ({selectedItems.length} items)</span>
              <span className="text-gray-900">₱{subtotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
            </div>

            <div className="pt-4 border-t border-gray-100 flex justify-between items-center">
              <span className="text-[18px] font-black text-gray-900">Total Amount</span>
              <span className="text-[28px] font-black text-[#640a0a]">₱{total.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
            </div>
          </div>
        </div>

        <div className="p-6 bg-gray-50/50">
          <button
            onClick={() => onProceed(selectedIndices)}
            disabled={!allSelectedHaveFulfillment || selectedItems.length === 0}
            className={`w-full h-[64px] rounded-2xl font-black text-lg transition-all active:scale-[0.98] ${allSelectedHaveFulfillment && selectedItems.length > 0 ? 'bg-[#640a0a] hover:bg-[#850d0d] text-white shadow-xl shadow-[#640a0a]/20' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
          >
            {selectedItems.length === 0 ? 'Select Items to Order' : !allSelectedHaveFulfillment ? 'Setup Fulfillment for Selected' : `Place Order (${selectedItems.length} Item${selectedItems.length > 1 ? 's' : ''})`}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutModal;
