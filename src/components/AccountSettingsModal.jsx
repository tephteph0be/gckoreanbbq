import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const AccountSettingsModal = ({ isOpen, onClose, currentUser, onSave }) => {
  const { t } = useLanguage();
  
  // Local state for the form
  const [formData, setFormData] = useState({
    email: '',
    contact: '',
    address: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Initialize data ONLY when the modal opens or currentUser changes
  // Since we use a 'key' in App.jsx, this component will remount, 
  // so we can also rely on initial state, but useEffect is safer for prop updates.
  useEffect(() => {
    if (currentUser) {
      setFormData({
        email: currentUser.email || '',
        contact: currentUser.contact || '',
        address: currentUser.address || '',
        newPassword: '',
        confirmPassword: ''
      });
    }
  }, [currentUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (error) setError('');
  };

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    setError('');
    
    const { email, contact, address, newPassword, confirmPassword } = formData;

    if (!email) {
      setError('Email is required');
      return;
    }
    if (!email.toLowerCase().endsWith('@gmail.com')) {
      setError('Email must end with @gmail.com');
      return;
    }
    if (contact && contact.length !== 11) {
      setError('Contact number must be exactly 11 digits');
      return;
    }
    if (newPassword) {
      if (newPassword.length < 4) {
        setError('New password must be at least 4 characters');
        return;
      }
      if (newPassword !== confirmPassword) {
        setError('Passwords do not match');
        return;
      }
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        onSave({
          ...currentUser,
          email: email.toLowerCase(),
          contact,
          address,
          password: newPassword || currentUser.password
        });
      }, 1500);
    }, 1500);
  };

  if (!isOpen && !showSuccess && !isLoading) return null;

  return (
    <div 
      className="fixed inset-0 z-[100000] flex items-end sm:items-center justify-center sm:p-4 bg-black/70 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-t-[28px] sm:rounded-[32px] w-full sm:max-w-md shadow-2xl relative flex flex-col max-h-[92vh] sm:max-h-[90vh] overflow-hidden animate-slideUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-gray-100 flex items-center justify-between shrink-0">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Account Settings</h2>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-500">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto custom-scroll p-5 sm:p-6 space-y-5 sm:space-y-6">
          {error && (
            <div className="p-4 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm font-bold flex items-start space-x-2 animate-shake">
              <svg className="w-5 h-5 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path></svg>
              <span>{error}</span>
            </div>
          )}

          <div className="space-y-4 text-left">
            <div>
              <label className="text-sm font-bold text-gray-700 block mb-1.5 ml-1">Email Address</label>
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="example@gmail.com"
                autoFocus
                className="w-full border-2 border-gray-200 rounded-2xl p-4 text-base font-semibold text-gray-900 focus:border-[#640a0a] outline-none transition-all"
              />
            </div>

            <div>
              <label className="text-sm font-bold text-gray-700 block mb-1.5 ml-1">Contact Number</label>
              <input
                name="contact"
                type="tel"
                value={formData.contact}
                onChange={(e) => {
                  const val = e.target.value.replace(/\D/g, '').slice(0, 11);
                  setFormData(prev => ({ ...prev, contact: val }));
                  if (error) setError('');
                }}
                placeholder="09123456789"
                className="w-full border-2 border-gray-200 rounded-2xl p-4 text-base font-semibold text-gray-900 focus:border-[#640a0a] outline-none transition-all"
              />
            </div>

            <div>
              <label className="text-sm font-bold text-gray-700 block mb-1.5 ml-1">Home Address</label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter your home address"
                className="w-full border-2 border-gray-200 rounded-2xl p-4 text-base font-semibold text-gray-900 focus:border-[#640a0a] outline-none transition-all h-24 resize-none"
              />
            </div>

            <div className="pt-4 border-t border-gray-100 mt-2">
              <label className="text-xs font-black text-gray-400 mb-4 block uppercase tracking-widest">Update Password</label>
              <div className="space-y-4">
                <div className="relative">
                  <input
                    name="newPassword"
                    type={showPassword ? "text" : "password"}
                    value={formData.newPassword}
                    onChange={handleChange}
                    placeholder="New Password (Optional)"
                    className="w-full border-2 border-gray-200 rounded-2xl p-4 pr-12 text-base font-semibold text-gray-900 focus:border-[#640a0a] outline-none transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                  >
                    {showPassword ? (
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                    ) : (
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
                    )}
                  </button>
                </div>

                {formData.newPassword && (
                  <div className="relative animate-fadeIn">
                    <input
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="Confirm New Password"
                      className="w-full border-2 border-gray-200 rounded-2xl p-4 pr-12 text-base font-semibold text-gray-900 focus:border-[#640a0a] outline-none transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                    >
                      {showConfirmPassword ? (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                      ) : (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
                      )}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </form>

        {/* Footer */}
        <div className="p-6 border-t border-gray-100 flex items-center justify-end space-x-3 bg-gray-50 shrink-0">
          <button 
            onClick={onClose} 
            className="px-6 py-3 rounded-xl font-bold text-gray-500 hover:bg-gray-100 transition-all"
          >
            Cancel
          </button>
          <button 
            onClick={handleSubmit} 
            className="px-10 py-3 rounded-xl font-bold text-white bg-[#640a0a] hover:bg-[#850d0d] shadow-lg transition-all active:scale-[0.98]"
          >
            Save Changes
          </button>
        </div>
      </div>

      {/* Loading/Success Overlays */}
      {(isLoading || showSuccess) && (
        <div className="fixed inset-0 z-[100000] flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-[40px] p-12 flex flex-col items-center shadow-2xl transform scale-110">
            {isLoading ? (
              <>
                <div className="w-16 h-16 border-4 border-gray-100 border-t-[#640a0a] rounded-full animate-spin mb-6"></div>
                <div className="text-xl font-bold text-gray-800 animate-pulse">Saving Changes...</div>
              </>
            ) : (
              <>
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6 animate-bounce">
                  <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Success!</h2>
                <p className="text-gray-500 font-medium">Account Updated</p>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountSettingsModal;
