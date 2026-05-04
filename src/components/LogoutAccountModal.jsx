import React, { useState, useEffect } from 'react';

const avatarColors = [
  'bg-blue-500', 'bg-purple-500', 'bg-pink-500', 'bg-indigo-500', 
  'bg-teal-500', 'bg-orange-500', 'bg-red-500', 'bg-green-500'
];

const getAvatarColor = (name) => {
  const safeName = name || '';
  const charCode = safeName.length > 0 ? safeName.charCodeAt(0) : 0;
  return avatarColors[charCode % avatarColors.length];
};


const LogoutAccountModal = ({ isOpen, onClose, accounts, onSelectAccount, onContinueWithAnother, onRemoveAccounts }) => {
  const [isRendered, setIsRendered] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);
  const [selectedToRemove, setSelectedToRemove] = useState([]);

  useEffect(() => {
    if (isOpen) {
      setIsRendered(true);
    } else {
      const timer = setTimeout(() => {
        setIsRendered(false);
        setIsRemoving(false);
        setSelectedToRemove([]);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isRendered) return null;

  const isMultiple = accounts.length > 1;

  const toggleSelect = (email) => {
    setSelectedToRemove(prev => 
      prev.includes(email) ? prev.filter(e => e !== email) : [...prev, email]
    );
  };

  const handleRemoveSelected = () => {
    if (selectedToRemove.length === 0) return;
    onRemoveAccounts(selectedToRemove);
    setSelectedToRemove([]);
    setIsRemoving(false);
  };

  return (
    <div className={`fixed inset-0 z-[100000] flex items-end sm:items-center justify-center transition-all duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose}></div>
      
      <div className={`bg-white rounded-t-[28px] sm:rounded-[32px] w-full sm:max-w-[440px] shadow-2xl relative overflow-hidden transform transition-all duration-300 max-h-[92vh] sm:max-h-[90vh] ${isOpen ? 'translate-y-0 scale-100 opacity-100' : 'translate-y-full sm:translate-y-4 sm:scale-95 opacity-0'}`}>
        
        {/* Close Button */}
        <button onClick={onClose} className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors z-10">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" /></svg>
        </button>

        <div className="flex flex-col max-h-[92vh] sm:max-h-[90vh]">
          {/* Scrollable Area */}
          <div className="flex-1 overflow-y-auto custom-scrollbar p-6 sm:p-10 flex flex-col items-center relative">
            <style>{`
              .custom-scrollbar::-webkit-scrollbar {
                width: 5px;
              }
              .custom-scrollbar::-webkit-scrollbar-track {
                background: transparent;
              }
              .custom-scrollbar::-webkit-scrollbar-thumb {
                background-color: #e5e7eb;
                border-radius: 20px;
              }
            `}</style>
          
            {isRemoving ? (
              /* State: Remove Accounts (Checkbox list) */
              <div className="w-full">
                <div className="flex items-center mb-6">
                  <button onClick={() => setIsRemoving(false)} className="mr-3 text-gray-900 hover:bg-gray-100 p-1 rounded-full transition-colors">
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <h2 className="text-[24px] sm:text-[32px] font-bold text-gray-900 leading-tight">Remove accounts</h2>
                </div>
                
                <p className="text-gray-600 text-[15px] sm:text-[18px] font-medium mb-6 sm:mb-8 leading-tight">Select the accounts you want to remove from this device.</p>
                
                <div className="space-y-3 mb-8 text-left max-h-[320px] overflow-y-auto pr-2 custom-scrollbar">
                  {accounts.map((acc, index) => (
                    <div 
                      key={index}
                      onClick={() => toggleSelect(acc.email)}
                      className={`w-full flex items-center p-4 rounded-2xl border-2 transition-all cursor-pointer ${selectedToRemove.includes(acc.email) ? 'border-[#640a0a] bg-[#640a0a]/5' : 'border-gray-100 hover:border-gray-200 bg-white'}`}
                    >
                      <div className="mr-4 relative">
                        <input 
                          type="checkbox" 
                          checked={selectedToRemove.includes(acc.email)}
                          onChange={() => {}} // Handled by div click
                          className="w-6 h-6 rounded-md border-2 border-gray-300 text-[#640a0a] focus:ring-0 cursor-pointer accent-[#640a0a]"
                        />
                      </div>
                      <div className={`w-12 h-12 rounded-full ${getAvatarColor(acc?.username || acc?.email)} flex items-center justify-center text-white font-bold text-xl mr-4 shrink-0 overflow-hidden shadow-sm`}>
                        {(acc?.username?.charAt(0) || acc?.email?.charAt(0) || '?').toUpperCase()}
                      </div>
                      <div className="flex flex-col truncate flex-1">
                        <span className="text-[17px] font-bold text-gray-900 leading-tight truncate">{acc?.username || 'User'}</span>
                        <span className="text-[14px] text-gray-500 font-medium mt-0.5 truncate">{acc?.email || 'No email'}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <button 
                  onClick={handleRemoveSelected}
                  disabled={selectedToRemove.length === 0}
                  className={`w-full py-4 rounded-2xl font-extrabold text-[19px] transition-all transform active:scale-[0.98] shadow-lg ${selectedToRemove.length > 0 ? 'bg-[#640a0a] hover:bg-[#850d0d] text-white shadow-[#640a0a]/20' : 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none'}`}
                >
                  Remove selected accounts
                </button>
              </div>
            ) : isMultiple ? (
              /* State: Multiple Accounts (Which account today?) */
              <div className="w-full text-center">
                <h2 className="text-[24px] sm:text-[32px] font-bold text-gray-900 leading-tight mb-3 sm:mb-4 px-2">Which account today?</h2>
                <p className="text-gray-500 text-[15px] sm:text-[17px] font-medium mb-6 sm:mb-8">Pick up where you left off or continue as another user.</p>
                
                <div className="space-y-2 mb-8 text-left max-h-[280px] overflow-y-auto pr-2 custom-scrollbar">
                  {accounts.map((acc, index) => (
                    <div 
                      key={index}
                      className="w-full flex items-center p-2 rounded-2xl hover:bg-gray-50 transition-all group border border-transparent hover:border-gray-100"
                    >
                      <button 
                        onClick={() => onSelectAccount(acc)}
                        className="flex items-center flex-1 text-left truncate active:scale-[0.98] transition-all p-1"
                      >
                        <div className={`w-12 h-12 rounded-full ${getAvatarColor(acc?.username || acc?.email)} flex items-center justify-center text-white font-bold text-xl mr-4 shrink-0 overflow-hidden shadow-sm`}>
                          {(acc?.username?.charAt(0) || acc?.email?.charAt(0) || '?').toUpperCase()}
                        </div>
                        <div className="flex flex-col text-left truncate flex-1">
                          <span className="text-[17px] font-bold text-gray-900 leading-tight truncate">{acc?.username || 'User'}</span>
                          <span className="text-[14px] text-gray-500 font-medium mt-0.5 truncate">{acc?.email || 'No email'}</span>
                        </div>
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onRemoveAccounts([acc.email]);
                        }}
                        className="p-2.5 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors ml-2 shrink-0"
                        title="Remove Account"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" /></svg>
                      </button>
                    </div>
                  ))}
                </div>

                <style>{`
                  .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                  }
                  .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                  }
                  .custom-scrollbar::-webkit-scrollbar-thumb {
                    background-color: #e5e7eb;
                    border-radius: 20px;
                  }
                  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background-color: #d1d5db;
                  }
                `}</style>


                <div className="relative flex items-center justify-center mb-8">
                  <div className="border-t border-gray-200 w-full"></div>
                  <span className="absolute bg-white px-4 text-[13px] font-bold text-gray-400 uppercase tracking-widest">OR</span>
                </div>

                <button 
                  onClick={onContinueWithAnother}
                  className="w-full py-4 border-2 border-gray-200 rounded-2xl font-bold text-gray-900 hover:bg-gray-50 hover:border-gray-300 transition-all text-[17px] mb-6 shadow-sm active:scale-[0.98]"
                >
                  Continue with another account
                </button>
              </div>
            ) : (
              /* State: Single Account (Jump back in!) */
              <div className="w-full text-center">
                <h2 className="text-[28px] sm:text-[36px] font-bold text-gray-900 leading-tight mb-6 sm:mb-10">Jump back in!</h2>
                
                <div className="flex flex-col items-center mb-10">
                  <div className={`w-28 h-28 rounded-full ${getAvatarColor(accounts[0]?.username || accounts[0]?.email)} flex items-center justify-center text-white font-bold text-5xl mb-5 shadow-xl border-4 border-white`}>
                    {(accounts[0]?.username?.charAt(0) || accounts[0]?.email?.charAt(0) || '?').toUpperCase()}
                  </div>
                  <h3 className="text-[22px] font-bold text-gray-900 mb-1">{accounts[0]?.username || 'User'}</h3>
                  <p className="text-gray-500 text-[17px] font-medium">{accounts[0]?.email || 'No email'}</p>
                </div>

                <button 
                  onClick={() => onSelectAccount(accounts[0])}
                  className="w-full py-4 bg-[#640a0a] hover:bg-[#850d0d] text-white rounded-2xl font-extrabold text-[19px] shadow-lg shadow-[#640a0a]/20 transition-all transform hover:scale-[1.01] active:scale-[0.98] mb-8"
                >
                  Continue
                </button>

                <div className="relative flex items-center justify-center mb-8">
                  <div className="border-t border-gray-200 w-full"></div>
                  <span className="absolute bg-white px-4 text-[13px] font-bold text-gray-400 uppercase tracking-widest">OR</span>
                </div>

                <button 
                  onClick={onContinueWithAnother}
                  className="text-[18px] font-bold text-gray-900 hover:text-[#640a0a] transition-colors mb-6"
                >
                  Continue with another account
                </button>
              </div>
            )}


            {/* Footer Branding */}
            <div className="w-full text-center px-2">
              {!isRemoving && (
                <>
                  <p className="text-[13.5px] text-gray-500 leading-relaxed mb-10 font-medium">
                    By continuing, you agree to G.C. Korean Bbq’s{' '}
                    <a href="#" className="text-[#640a0a] font-bold hover:underline">Terms of Use</a>. 
                    Read our <a href="#" className="text-[#640a0a] font-bold hover:underline">Privacy Policy</a>.
                  </p>

                  <div className="flex items-center justify-start w-full">
                    <button 
                      onClick={() => setIsRemoving(true)}
                      className="flex items-center space-x-2 text-[#640a0a] font-bold text-[15px] hover:bg-[#640a0a]/5 px-4 py-2.5 rounded-xl transition-all active:scale-[0.95]"
                    >
                      <div className="bg-[#640a0a]/10 rounded-full p-1">
                        <svg className="w-4 h-4 text-[#640a0a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 12h.01M12 12h.01" />
                        </svg>
                      </div>
                      <span>Remove accounts</span>
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogoutAccountModal;
