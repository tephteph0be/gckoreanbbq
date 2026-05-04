import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const OrdersModal = ({ isOpen, onClose, orders = [], onCancelOrders }) => {
  const { t } = useLanguage();
  const [isSelectionMode, setIsSelectionMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);

  useEffect(() => {
    if (!isOpen) {
      setIsSelectionMode(false);
      setSelectedIds([]);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const toggleSelectAll = () => {
    if (selectedIds.length === orders.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(orders.map(o => o.id));
    }
  };

  const toggleId = (id) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const handleCancelClick = () => {
    if (selectedIds.length > 0) {
      onCancelOrders(selectedIds);
      setIsSelectionMode(false);
      setSelectedIds([]);
    }
  };

  return (
    <div 
      className="fixed inset-0 z-[100000] flex items-end sm:items-center justify-center sm:p-4 bg-black/60 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-t-[28px] sm:rounded-[32px] w-full sm:max-w-2xl shadow-2xl relative flex flex-col max-h-[92vh] sm:max-h-[90vh] overflow-hidden animate-slideUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-gray-100 flex items-center justify-between shrink-0 bg-white">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#640a0a]/10 rounded-xl sm:rounded-2xl flex items-center justify-center text-[#640a0a]">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">Your Orders</h2>
              <p className="hidden sm:block text-sm text-gray-500 font-medium">{isSelectionMode ? `Selected ${selectedIds.length} orders` : 'Track and manage your meal history'}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {orders.length > 0 && (
              <button 
                onClick={() => { setIsSelectionMode(!isSelectionMode); setSelectedIds([]); }}
                className={`px-4 py-2 rounded-xl text-[13px] font-bold transition-all ${isSelectionMode ? 'bg-gray-100 text-gray-600' : 'bg-[#640a0a]/5 text-[#640a0a] hover:bg-[#640a0a]/10'}`}
              >
                {isSelectionMode ? 'Cancel Manage' : 'Manage'}
              </button>
            )}
            <button 
              onClick={onClose}
              className="p-2 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-all"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 custom-scroll">
          {isSelectionMode && orders.length > 0 && (
            <div className="flex items-center justify-between mb-2 animate-fadeIn bg-gray-50/50 p-3 rounded-2xl border border-gray-100">
              <div className="flex items-center space-x-3">
                <div 
                  onClick={toggleSelectAll}
                  className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all cursor-pointer ${selectedIds.length === orders.length ? 'bg-[#640a0a] border-[#640a0a]' : 'border-gray-300 bg-white'}`}
                >
                  {selectedIds.length === orders.length && <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.5" d="M5 13l4 4L19 7" /></svg>}
                </div>
                <span className="text-[13px] font-bold text-gray-600">Select All</span>
              </div>
              <span className="text-[12px] font-bold text-gray-400">{selectedIds.length} of {orders.length} Selected</span>
            </div>
          )}
          {orders.length > 0 ? (
            orders.map((order) => (
              <div 
                key={order.id} 
                onClick={() => isSelectionMode && toggleId(order.id)}
                className={`group border rounded-2xl sm:rounded-3xl p-4 sm:p-6 transition-all bg-white relative overflow-hidden ${isSelectionMode ? 'cursor-pointer' : ''} ${selectedIds.includes(order.id) ? 'border-[#640a0a]/30 ring-1 ring-[#640a0a]/10 shadow-lg' : 'border-gray-100 hover:border-[#640a0a]/20 hover:shadow-lg'}`}
              >
                {isSelectionMode && (
                  <div className="absolute top-4 left-4 z-20">
                    <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${selectedIds.includes(order.id) ? 'bg-[#640a0a] border-[#640a0a]' : 'border-gray-300 bg-white/80'}`}>
                      {selectedIds.includes(order.id) && <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.5" d="M5 13l4 4L19 7" /></svg>}
                    </div>
                  </div>
                )}
                <div className={`absolute top-0 right-0 w-1.5 h-full ${order.status === 'Delivered' ? 'bg-green-500' : order.status === 'Preparing' ? 'bg-orange-500' : 'bg-red-500'}`}></div>
                
                {/* Order Header */}
                <div className={`flex items-center justify-between mb-4 sm:mb-6 gap-3 pb-3 sm:pb-4 border-b border-gray-50 ${isSelectionMode ? 'pl-8' : ''}`}>

                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <div className="bg-[#640a0a] text-white text-[10px] sm:text-[12px] font-black px-3 sm:px-4 py-1 rounded-full shadow-lg shadow-[#640a0a]/20">#{order.id.toString().slice(-6)}</div>
                    <span className="text-[12px] sm:text-[14px] text-gray-400 font-bold">{order.date}</span>
                  </div>
                  <div className={`text-[10px] sm:text-[12px] font-black uppercase tracking-wider px-2 sm:px-4 py-1 rounded-lg shadow-sm ${
                    order.status === 'Delivered' ? 'bg-green-50 text-green-600' : order.status === 'Preparing' ? 'bg-orange-50 text-orange-600' : 'bg-red-50 text-red-600'
                  }`}>
                    {order.status}
                  </div>
                </div>

                {/* Items List */}
                <div className="space-y-6">
                  {(order.items || (order.product ? [order.product] : [])).map((item, idx) => {
                    const name = item.name || item.title || 'Item';
                    const img = item.image || item.img;
                    const qty = item.quantity || order.quantity || 1;
                    const fulfillment = item.fulfillment || order.fulfillment || (order.type ? { type: order.type } : null);
                    
                    return (
                      <div key={idx} className="flex items-start space-x-5">
                        <div className="w-20 h-20 bg-gray-50 rounded-2xl overflow-hidden shrink-0 border border-gray-100 shadow-sm group-hover:scale-105 transition-transform duration-500">
                          {img ? (
                            <img src={img} alt={name} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <svg className="w-10 h-10 text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h14a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start mb-1">
                            <h4 className="text-[14px] sm:text-[16px] font-black text-gray-900 leading-tight truncate pr-4">{name}</h4>
                            <span className="text-[11px] sm:text-[12px] font-black text-gray-400 shrink-0">Qty: {qty}</span>
                          </div>
                          
                          {/* Add-ons */}
                          {(item.selectedAddOns || order.addOns) && (item.selectedAddOns || order.addOns).length > 0 && (
                            <div className="flex flex-wrap gap-1.5 mb-2">
                              {(item.selectedAddOns || order.addOns).map((addon, i) => (
                                <span key={i} className="text-[9px] font-black text-[#640a0a] bg-[#640a0a]/5 px-2 py-0.5 rounded-md border border-[#640a0a]/10">
                                  +{addon.quantity} {addon.name}
                                </span>
                              ))}
                            </div>
                          )}

                          {/* Item Fulfillment */}
                          {fulfillment && (
                            <div className="flex items-center text-[10px] sm:text-[12px] text-[#640a0a] font-bold bg-[#640a0a]/5 px-2 sm:px-3 py-1 sm:py-1.5 rounded-xl border border-[#640a0a]/10 w-fit">
                              <svg className="w-3.5 h-3.5 mr-1.5 sm:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                {fulfillment.type === 'Delivery' ? (
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                ) : (
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                )}
                              </svg>
                              <span className="flex items-center">
                                <span className="font-black uppercase tracking-wider text-[10px] sm:text-[11px] mr-2">
                                  {fulfillment.type}
                                </span>
                                <span className="text-[10px] sm:text-[11px] font-medium opacity-70 truncate max-w-[120px] sm:max-w-none border-l border-[#640a0a]/20 pl-2">
                                  {fulfillment.type === 'Delivery' 
                                    ? `${fulfillment.address || 'Address not set'}${fulfillment.date && fulfillment.time ? ` • ${fulfillment.date} ${fulfillment.time}` : ''}`
                                    : (fulfillment.date && fulfillment.time ? `${fulfillment.date} ${fulfillment.time}` : 'Schedule not set')}
                                </span>
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Order Footer */}
                <div className="mt-4 sm:mt-6 pt-4 sm:pt-5 border-t border-gray-50 flex items-center justify-between">
                  <div className="flex items-center text-[12px] sm:text-[13px] text-gray-400 font-bold">
                    <svg className="w-4 h-4 mr-1.5 sm:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Total Paid
                  </div>
                  <span className="text-[18px] sm:text-[22px] font-black text-[#640a0a]">
                    {typeof order.total === 'number' ? `₱${order.total.toLocaleString('en-US', { minimumFractionDigits: 2 })}` : order.total}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center text-gray-200 mb-6">
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">No orders yet</h3>
              <p className="text-gray-500 max-w-xs mx-auto">When you place an order, it will appear here for you to track.</p>
              <button onClick={onClose} className="mt-8 px-8 py-3 bg-[#640a0a] text-white rounded-xl font-bold hover:bg-[#850d0d] transition-all shadow-lg shadow-[#640a0a]/20">
                Order Now
              </button>
            </div>
          )}
        </div>
        {isSelectionMode && (
          <div className="p-4 sm:p-6 bg-gray-50 border-t border-gray-100 animate-slideUp shrink-0 relative z-[100]">
            <button 
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleCancelClick();
              }}
              disabled={selectedIds.length === 0}
              className={`w-full py-4 rounded-2xl font-black text-[16px] transition-all transform active:scale-[0.98] shadow-xl ${selectedIds.length > 0 ? 'bg-red-600 hover:bg-red-700 text-white shadow-red-600/20 cursor-pointer' : 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none'}`}
            >
              Cancel {selectedIds.length} Selected Order{selectedIds.length > 1 ? 's' : ''}
            </button>
            <p className="text-center text-[11px] text-gray-400 font-bold mt-3 uppercase tracking-widest">Only orders in 'Preparing' status can be canceled</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersModal;
