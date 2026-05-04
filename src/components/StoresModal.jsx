import React from 'react';

const StoresModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100000] flex items-end sm:items-center justify-center sm:p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div 
        className="bg-white rounded-t-[28px] sm:rounded-[32px] w-full sm:max-w-lg shadow-2xl relative flex flex-col max-h-[92vh] sm:max-h-[90vh] overflow-hidden animate-slideUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-gray-100 flex items-center justify-between shrink-0 bg-white">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Find Us</h2>
          <button 
            onClick={onClose} 
            className="p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-500"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-8 overflow-y-auto custom-scroll text-gray-700 leading-relaxed font-sans text-center">
          <p className="text-[18px] font-bold text-gray-900 mb-8 leading-relaxed">
            Visit G.C. Korean BBQ and enjoy a complete Korean dining experience.
          </p>
          
          <div className="space-y-8">
            {/* Main Branch */}
            <section className="bg-gray-50 p-6 rounded-2xl border border-gray-100 transform transition-transform hover:scale-[1.02]">
              <div className="w-12 h-12 bg-[#640a0a]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-[#640a0a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-2">Address</h3>
              <p className="font-bold text-gray-800 text-lg">
                Guanzon St., Brgy 15, Gingoog City, Philippines, 9014
              </p>
              <p className="text-xs text-gray-400 mt-4 italic font-bold">
                (More branches coming soon… stay tuned!)
              </p>
            </section>

            {/* Contact Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <section className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                <div className="w-10 h-10 bg-[#640a0a]/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-5 h-5 text-[#640a0a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">Contact Number</h3>
                <p className="font-bold text-gray-800">0926 290 7130</p>
              </section>

              <section className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                <div className="w-10 h-10 bg-[#640a0a]/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-5 h-5 text-[#640a0a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">Email</h3>
                <p className="font-bold text-gray-800">gckoreanbbq@gmail.com</p>
              </section>
            </div>

            {/* Store Hours */}
            <section className="bg-[#640a0a] p-6 rounded-2xl shadow-xl shadow-red-900/10 text-white">
              <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xs font-black text-white/60 uppercase tracking-widest mb-2">Store Hours</h3>
              <p className="font-black text-2xl mb-1">Daily</p>
              <p className="font-bold text-white/90 text-lg">10:00 AM – 9:00 PM</p>
              <div className="mt-4 pt-4 border-t border-white/10">
                <p className="text-sm font-medium">
                  We are open for dine-in, takeaway, and home service orders.
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoresModal;
