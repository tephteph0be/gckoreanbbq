import React from 'react';

const LogoutConfirmModal = ({ isOpen, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100002] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fadeIn"
      onClick={onCancel}
    >
      <div
        className="bg-white rounded-[28px] w-[90%] sm:w-full sm:max-w-sm shadow-2xl flex flex-col overflow-hidden animate-slideUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Icon + Text */}
        <div className="flex flex-col items-center pt-8 pb-4 px-6">
          <div className="w-16 h-16 rounded-full bg-[#640a0a]/10 flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-[#640a0a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </div>
          <h2 className="text-[18px] font-black text-gray-900 text-center leading-tight mb-2">
            Logout Account?
          </h2>
          <p className="text-[13px] text-gray-500 text-center font-medium leading-relaxed">
            Are you sure you want to logout your account?
          </p>
        </div>

        {/* Buttons */}
        <div className="flex space-x-3 px-6 pb-6 pt-2">
          <button
            onClick={onCancel}
            className="flex-1 py-3 rounded-2xl border-2 border-gray-200 text-gray-700 font-bold text-[14px] hover:bg-gray-50 transition-all active:scale-[0.98]"
          >
            No
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-3 rounded-2xl bg-[#640a0a] text-white font-bold text-[14px] hover:bg-[#850d0d] transition-all active:scale-[0.98] shadow-lg shadow-[#640a0a]/20"
          >
            Yes, Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutConfirmModal;
