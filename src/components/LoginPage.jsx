import React, { useEffect, useState, useRef } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const TIME_SLOTS = [
  '10:00 AM - 11:00 AM',
  '11:00 AM - 12:00 PM',
  '12:00 PM - 01:00 PM',
  '01:00 PM - 02:00 PM',
  '02:00 PM - 03:00 PM',
  '03:00 PM - 04:00 PM',
  '04:00 PM - 05:00 PM',
  '05:00 PM - 06:00 PM',
  '06:00 PM - 07:00 PM',
  '07:00 PM - 08:00 PM',
  '08:00 PM - 09:00 PM'
];

const LoginPage = ({ isOpen, onClose, onLoginSuccess, requireOrderChoice = false, requireLoginOnly = false, initialStep = 'emailCheck', initialEmail = '', initialName = '', onBack, isFulfillmentSelectionFromCheckout = false }) => {
  const { t } = useLanguage();
  const [isRendered, setIsRendered] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [step, setStep] = useState(initialStep); // 'emailCheck', 'register', 'orderChoice', 'pickupSelect', 'deliverySelect'
  
  useEffect(() => {
    setStep(initialStep);
  }, [initialStep]);

  const isMandatorySelection = requireOrderChoice || isFulfillmentSelectionFromCheckout;
  const [isStepTransitioning, setIsStepTransitioning] = useState(false);
  const [email, setEmail] = useState(initialEmail || '');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [displayPassword, setDisplayPassword] = useState('');
  const [displayConfirmPassword, setDisplayConfirmPassword] = useState('');
  const pwTimeoutRef = useRef(null);
  const cpwTimeoutRef = useRef(null);

  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [username, setUsername] = useState(initialName || '');
  const [contact, setContact] = useState('');
  const [address, setAddress] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [loadingMessage, setLoadingMessage] = useState('Please wait...');
  const [orderDate, setOrderDate] = useState('');
  const [orderTime, setOrderTime] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');

  const handlePasswordChange = (newVal, isConfirm = false) => {
    const realSetter = isConfirm ? setConfirmPassword : setPassword;
    const displaySetter = isConfirm ? setDisplayConfirmPassword : setDisplayPassword;
    const realVal = isConfirm ? confirmPassword : password;
    const timeoutRef = isConfirm ? cpwTimeoutRef : pwTimeoutRef;
    const isVisible = isConfirm ? showConfirmPassword : showPassword;

    // 1. If currently showing plain text, just update both
    if (isVisible) {
      realSetter(newVal);
      displaySetter(newVal);
      return;
    }

    // 2. Detect what happened to update the REAL password
    let updatedReal = realVal;
    if (newVal.length > realVal.length) {
      // Character added at the end
      const char = newVal.charAt(newVal.length - 1);
      updatedReal = realVal + char;
    } else if (newVal.length < realVal.length) {
      // Character removed
      updatedReal = realVal.slice(0, newVal.length);
    }

    realSetter(updatedReal);

    // 3. Update the DISPLAY value (with peek)
    const masked = updatedReal.split('').map((c, i) => i === updatedReal.length - 1 ? c : '●').join('');
    displaySetter(masked);

    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      displaySetter('●'.repeat(updatedReal.length));
    }, 1000);

    // Validation for security requirements
    if (!isConfirm) {
      if (updatedReal.length > 0 && updatedReal.length < 6) {
        setError('Security requirement: Password must be at least 6 characters.');
      } else if (updatedReal.length >= 6 && (!/[a-zA-Z]/.test(updatedReal) || !/\d/.test(updatedReal))) {
        setError('Security requirement: Password must contain both letters and numbers.');
      } else if (error.startsWith('Security requirement:')) {
        setError('');
      }
    }
  };



  const cleanupTimerRef = useRef(null);
  const mainInputRef = useRef(null);

  useEffect(() => {
    // Focus the main input whenever step changes or modal opens
    if (isOpen && !isLoading && !showSuccess && !isStepTransitioning) {
      const timer = setTimeout(() => {
        if (mainInputRef.current) {
          mainInputRef.current.focus();
        }
      }, 300); // Wait for transition animation
      return () => clearTimeout(timer);
    }
  }, [isOpen, step, isLoading, showSuccess, isStepTransitioning]);

  useEffect(() => {
    if (isOpen) {
      if (cleanupTimerRef.current) clearTimeout(cleanupTimerRef.current);
      setIsRendered(true);
      setStep(initialStep);
      setError('');
      setPassword('');
      setDisplayPassword('');
      // Always sync with props if modal is open
      setEmail(initialEmail || '');
      setUsername(initialName || '');
      const timer = setTimeout(() => setIsAnimating(true), 10);
      return () => clearTimeout(timer);
    } else {
      setIsAnimating(false);
      cleanupTimerRef.current = setTimeout(() => {
        setIsRendered(false);
        setStep(initialStep);
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setDisplayPassword('');
        setDisplayConfirmPassword('');
        setUsername('');
        setContact('');
        setAddress('');
        setError('');
      }, 300);
      return () => {
        if (cleanupTimerRef.current) clearTimeout(cleanupTimerRef.current);
      };
    }
  }, [isOpen, initialStep, initialEmail, initialName]);


  const changeStep = (newStep) => {
    setIsStepTransitioning(true);
    setError('');
    setTimeout(() => {
      if (newStep === 'deliverySelect') {
        setDeliveryAddress(loggedInUser?.address || address || '');
      }
      setStep(newStep);
      setIsStepTransitioning(false);
    }, 200);
  };

  const getUsers = () => JSON.parse(localStorage.getItem('gc_users') || '{}');

  const handleEmailCheck = () => {
    if (!email.toLowerCase().endsWith('@gmail.com')) {
      setError('Please use a valid @gmail.com address');
      return;
    }

    const users = getUsers();
    const userData = users[email.toLowerCase()];
    // Only go to login if user exists in new object format (with password field)
    if (userData && typeof userData === 'object' && userData.password) {
      changeStep('login');
    } else {
      // New user OR old string-format user → register (will overwrite old data)
      changeStep('register');
    }
  };

  const handleRegister = () => {
    if (!contact.startsWith('09')) {
      setError('Invalid format. Contact number must start with 09.');
      return;
    }
    if (contact.length !== 11) {
      setError('Registration failed. Contact number must be exactly 11 digits.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (password.length < 6) {
      setError('Security requirement: Password must be at least 6 characters.');
      return;
    }
    if (!/[a-zA-Z]/.test(password) || !/\d/.test(password)) {
      setError('Security requirement: Password must contain both letters and numbers.');
      return;
    }

    setLoadingMessage('Processing Registration...');
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setShowSuccess(true);

      setTimeout(() => {
        setShowSuccess(false);
        const users = getUsers();
        users[email.toLowerCase()] = {
          password,
          username,
          contact,
          address,
          email: email.toLowerCase()
        };
        localStorage.setItem('gc_users', JSON.stringify(users));

        const userData = users[email.toLowerCase()];
        setLoggedInUser(userData);
        if (requireOrderChoice) {
          changeStep('orderChoice');
        } else {
          onLoginSuccess('register', userData);
        }
      }, 2000);
    }, 2000);
  };

  const handleLogin = () => {
    const users = getUsers();
    const loginEmail = (email || initialEmail || '').toLowerCase();

    if (!loginEmail) {
      setError('Please enter your email');
      return;
    }

    // Case-insensitive lookup
    let userData = users[loginEmail];
    if (!userData) {
      // Try finding it by checking all keys
      const matchingKey = Object.keys(users).find(k => k.toLowerCase() === loginEmail);
      if (matchingKey) {
        userData = users[matchingKey];
      }
    }

    if (!userData) {
      setError('Account not found');
      return;
    }

    if (typeof userData !== 'object' || userData.password !== password) {
      setError('Invalid password');
      return;
    }

    setLoadingMessage('Logging in...');
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setShowSuccess(true);

      setTimeout(() => {
        setShowSuccess(false);
        setLoggedInUser(userData);
        if (requireOrderChoice) {
          changeStep('orderChoice');
        } else {
          onLoginSuccess('login', userData);
        }
      }, 2000);
    }, 2000);
  };

  const handleConfirmOrder = (type) => {
    setLoadingMessage(
      type === 'later' ? 'Please wait...' :
        type === 'pickup' ? 'Confirming Pickup Details...' :
          'Confirming Delivery Details...'
    );
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      if (type === 'later') {
        // Skip success modal for "Proceed to Order" / "Decide Later"
        onLoginSuccess(type, loggedInUser);
      } else {
        setShowSuccess(true);
        setTimeout(() => {
          setShowSuccess(false);
          const fulfillmentData = {
            date: orderDate ? new Date(orderDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : null,
            time: orderTime || null,
            address: type === 'pickup' ? 'G.C. Korean Bbq Main Branch' : (deliveryAddress || loggedInUser?.address || address)
          };
          onLoginSuccess(type, loggedInUser, fulfillmentData);
        }, 2000);
      }
    }, 2000);
  };

  if (!isRendered) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center font-sans tracking-wide">
      {/* Backdrop overlay */}
      <div
        className={`absolute inset-0 bg-black/60 transition-opacity duration-300 ease-in-out ${isAnimating ? 'opacity-100' : 'opacity-0'}`}
        onClick={onClose}
      />

      {/* Modal Container */}
      <div
        className={`relative z-10 w-full ${step === 'orderChoice' ? 'max-w-md' : 'max-w-lg'} bg-white rounded-2xl shadow-2xl transition-all duration-300 ease-in-out transform flex flex-col max-h-[90vh] text-gray-900 ${isAnimating ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-95'}`}
      >
        <div className={`flex flex-col flex-1 w-full min-h-0 transition-opacity duration-200 ${isStepTransitioning ? 'opacity-0' : 'opacity-100'}`}>
          {step === 'emailCheck' ? (
            <div className="w-full flex-1 flex flex-col">
              {/* Header */}
              <div className="flex flex-col items-center pt-8 pb-4 relative border-b border-[#a01a1a]">
                <button onClick={onClose} className="absolute right-6 top-8 text-black hover:text-[#640a0a] p-2 transition-colors">
                  <svg className="w-5 h-5 font-bold" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                <div className="w-24 h-24 mb-3">
                  <img
                    src="https://scontent.fmnl14-2.fna.fbcdn.net/v/t39.30808-6/414820211_24446117301670315_6333978278326920804_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=1d70fc&_nc_eui2=AeHj56M924AN-nIC1b_7dsVv3gU-2rzyePneBT7avPJ4-RdZS6-sbisgarqtK_nSSKkN_aUrFcX-xoNaICHUj10m&_nc_ohc=nImjurVIoNwQ7kNvwGCCqfR&_nc_oc=AdoKVu7D_Xy0WbGzHlbjY5ZtEtagrzXFKs89apVHwZas6GAdMkUTnneMx7UiciMlAzI&_nc_zt=23&_nc_ht=scontent.fmnl14-2.fna&_nc_gid=ljmFn3p0w6petYuAHS2a8g&_nc_ss=7a2a8&oh=00_Af12ECLaP_rCRhhKpKb84HvJSlNiCUZyg_-MZG5LjZGzdQ&oe=69EF4AC5"
                    alt="Logo"
                    className="w-full h-full object-contain rounded-full"
                  />
                </div>
                <div className="font-bold text-[#81130d] text-lg font-sans">{t('email')}</div>
              </div>

              <div className="px-12 py-10 flex flex-col items-center flex-1 overflow-y-auto custom-scrollbar">
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
                <div className="w-full text-left font-medium text-gray-400 mb-4 text-lg">
                  {t('email_check')}
                </div>
                <div className="w-full mb-6">
                  <label className="block text-gray-700 font-bold mb-2">{t('email_address')}</label>
                  <input
                    ref={mainInputRef}
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="@gmail.com"
                    autoFocus
                    className={`w-full border-2 rounded-lg p-3 text-lg text-gray-900 focus:border-[#640a0a] focus:outline-none transition-colors ${error ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {error && <p className="text-red-500 text-sm mt-1 font-bold">{error}</p>}
                </div>
                <button
                  onClick={handleEmailCheck}
                  className="w-full bg-[#640a0a] text-white font-bold py-4 rounded-full text-lg shadow-lg hover:bg-[#850d0d] transition-all transform hover:scale-[1.02]"
                >
                  {t('confirm')}
                </button>
                <button onClick={() => {
                  if (requireOrderChoice) {
                    setError("Please login or register to proceed to checkout.");
                  } else if (requireLoginOnly) {
                    setError("Please login or register to add items to your cart.");
                  } else {
                    onLoginSuccess('guest', null);
                  }
                }} className="text-gray-400 text-sm font-medium underline hover:text-gray-600 mt-4">
                  {t('continue_as_guest')}
                </button>
              </div>
            </div>
          ) : step === 'register' ? (
            <div className="w-full flex-1 flex flex-col overflow-hidden">
              <div className="flex items-center justify-center py-6 relative shrink-0 border-b border-[#a01a1a]">
                <button
                  onClick={() => changeStep('emailCheck')}
                  className="absolute left-6 top-6 text-black hover:text-[#640a0a] p-2 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <div className="font-bold text-[#81130d] text-lg font-sans">{t('register')}</div>
              </div>

              <div className="px-12 py-8 flex flex-col items-center flex-1 overflow-y-auto custom-scrollbar">
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
                <div className="w-full mb-4 text-center">
                  <p className="text-green-600 font-bold text-sm mb-2">Email address is valid!</p>
                </div>
                <div className="w-full mb-4">
                  <label className="block text-gray-700 font-bold mb-2">{t('email_address')}</label>
                  <input
                    ref={mainInputRef}
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoFocus
                    className={`w-full border-2 rounded-lg p-3 text-lg text-gray-900 focus:border-[#640a0a] focus:outline-none transition-colors ${error ? 'border-red-500' : 'border-gray-300'}`}
                  />
                </div>
                <div className="w-full mb-4">
                  <label className="block text-gray-700 font-bold mb-2">Username / Full Name</label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Juan Dela Cruz"
                    className="w-full border-2 border-gray-300 rounded-lg p-3 text-lg focus:border-[#640a0a] focus:outline-none transition-colors"
                  />
                </div>
                <div className="w-full mb-4">
                  <label className="block text-gray-700 font-bold mb-2">Contact Number</label>
                  <input
                    type="text"
                    value={contact}
                    onChange={(e) => {
                      const rawVal = e.target.value;
                      
                      // 1. Check for non-numeric characters immediately
                      if (/[^\d]/.test(rawVal)) {
                        setError('Invalid input. Numerical characters only are permitted.');
                        return;
                      }

                      const numericVal = rawVal.replace(/\D/g, '');

                      // 2. Formal validation for prefix and length
                      if (numericVal.length >= 2 && !numericVal.startsWith('09')) {
                        setError('Invalid format. Contact number must begin with 09.');
                      } else if (numericVal.length > 11) {
                        setError('Input limit reached. Contact number must be exactly 11 digits.');
                      } else {
                        // Clear validation error if format is potentially correct
                        if (error === 'Invalid format. Contact number must begin with 09.' || 
                            error === 'Input limit reached. Contact number must be exactly 11 digits.' ||
                            error === 'Invalid input. Numerical characters only are permitted.') {
                          setError('');
                        }
                      }

                      setContact(numericVal.slice(0, 11));
                    }}
                    placeholder="0912 345 6789"
                    className={`w-full border-2 rounded-lg p-3 text-lg focus:border-[#640a0a] focus:outline-none transition-colors ${(error.includes('Contact number') || error.includes('Numerical characters') || error.includes('Numerical characters') || error.includes('Input limit reached')) ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {(error.includes('Contact number') || error.includes('Numerical characters') || error.includes('Input limit reached') || error.includes('Invalid format')) && (
                    <p className="text-red-500 text-[13px] mt-1 font-bold animate-fadeIn">{error}</p>
                  )}
                </div>
                <div className="w-full mb-4 text-left">
                  <label className="block text-gray-700 font-bold mb-2">Home Address</label>
                  <textarea
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Davao City, Philippines"
                    className="w-full border-2 border-gray-300 rounded-lg p-3 text-lg text-gray-900 focus:border-[#640a0a] focus:outline-none transition-colors h-20 resize-none"
                  />
                </div>
                <div className="w-full mb-4">
                  <label className="block text-gray-700 font-bold mb-2">{t('password')}</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={showPassword ? password : displayPassword}
                      onChange={(e) => handlePasswordChange(e.target.value)}
                      placeholder="Password"
                      className="w-full border-2 border-gray-300 rounded-lg p-3 pr-12 text-lg focus:border-[#640a0a] focus:outline-none transition-colors"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const newShow = !showPassword;
                        setShowPassword(newShow);
                        if (!newShow) setDisplayPassword('●'.repeat(password.length));
                      }}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#640a0a] transition-colors"
                    >
                      {showPassword ? (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                      ) : (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
                      )}
                    </button>
                  </div>
                  {error.startsWith('Security requirement:') && (
                    <p className="text-red-500 text-[13px] mt-1 font-bold animate-fadeIn">{error}</p>
                  )}
                </div>

                <div className="w-full mb-6">
                  <label className="block text-gray-700 font-bold mb-2">{t('confirm_password')}</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={showConfirmPassword ? confirmPassword : displayConfirmPassword}
                      onChange={(e) => handlePasswordChange(e.target.value, true)}
                      placeholder="Confirm Password"
                      className="w-full border-2 border-gray-300 rounded-lg p-3 pr-12 text-lg focus:border-[#640a0a] focus:outline-none transition-colors"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const newShow = !showConfirmPassword;
                        setShowConfirmPassword(newShow);
                        if (!newShow) setDisplayConfirmPassword('●'.repeat(confirmPassword.length));
                      }}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#640a0a] transition-colors"
                    >
                      {showConfirmPassword ? (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                      ) : (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
                      )}
                    </button>
                  </div>
                </div>





                {(error && 
                  !error.includes('Contact number') && 
                  !error.includes('Numerical characters') && 
                  !error.includes('Input limit reached') && 
                  !error.includes('Invalid format') &&
                  !error.includes('Registration failed. Contact number') &&
                  !error.startsWith('Security requirement:')
                ) && (
                  <p className="text-red-500 text-sm mb-4 font-bold text-center">{error}</p>
                )}

                <button
                  onClick={handleRegister}
                  className="w-full bg-[#640a0a] text-white font-bold py-4 rounded-full text-lg shadow-lg hover:bg-[#850d0d] transition-all transform hover:scale-[1.02] mt-auto"
                >
                  {t('confirm')}
                </button>
              </div>
            </div>
          ) : step === 'login' ? (
            <div className="w-full flex-1 flex flex-col overflow-hidden">
              <div className="flex items-center justify-center py-5 relative shrink-0 border-b border-[#640a0a]/30">
                <button
                  onClick={() => {
                    if (step === initialStep && onBack) {
                      onBack();
                    } else {
                      changeStep('emailCheck');
                    }
                  }}
                  className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-900 hover:text-gray-600 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <div className="font-bold text-[#640a0a] text-xl font-sans tracking-tight">Login</div>
              </div>

              <div className="px-12 py-12 flex flex-col items-center flex-1 overflow-y-auto custom-scrollbar">
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
                <div className="w-full mb-10 text-center">
                  <p className="text-gray-400 font-medium text-[16px] tracking-wide">
                    Logging in as <span className="text-gray-900 font-extrabold ml-1">{initialEmail || email}</span>
                  </p>
                </div>
                <div className="w-full mb-8">
                  <label className="block text-gray-700 font-bold mb-2.5 text-[15px]">Password</label>
                  <div className="relative">
                    <input
                      ref={mainInputRef}
                      type="text"
                      value={showPassword ? password : displayPassword}
                      onChange={(e) => handlePasswordChange(e.target.value)}
                      placeholder="Password"
                      autoFocus
                      className={`w-full border border-gray-200 rounded-xl p-4 pr-12 text-lg text-gray-900 focus:border-[#640a0a] focus:outline-none transition-all ${error ? 'border-red-500' : ''}`}
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const newShow = !showPassword;
                        setShowPassword(newShow);
                        if (!newShow) setDisplayPassword('●'.repeat(password.length));
                      }}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#640a0a] transition-colors"
                    >
                      {showPassword ? (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                      ) : (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
                      )}
                    </button>
                  </div>
                  {error && <p className="text-red-500 text-sm mt-2 font-bold">{error}</p>}
                </div>

                <button
                  onClick={handleLogin}
                  className="w-full bg-[#640a0a] text-white font-bold py-5 rounded-[40px] text-xl shadow-[0_10px_20px_rgba(100,10,10,0.3)] hover:bg-[#850d0d] transition-all transform active:scale-[0.98]"
                >
                  Login
                </button>
              </div>
            </div>
          ) : step === 'orderChoice' ? (
            <div className="w-full flex-1 flex flex-col items-center justify-center text-center p-10 sm:p-14 overflow-y-auto custom-scrollbar">
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
              <h2 className="text-[26px] sm:text-[32px] font-black text-[#640a0a] mb-12 leading-tight">
                {t('receive_order')}
              </h2>

              <div className="w-full max-w-sm space-y-5">
                <button
                  onClick={() => changeStep('pickupSelect')}
                  className="w-full h-[72px] bg-[#640a0a] hover:bg-[#850d0d] text-white rounded-2xl font-bold text-xl flex items-center justify-center space-x-4 transition-all active:scale-[0.98] shadow-xl shadow-[#640a0a]/30 group"
                >
                  <svg className="w-8 h-8 group-hover:animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M16 11V7a4 4 0 118 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  <span>{t('order_pickup')}</span>
                </button>

                <button
                  onClick={() => changeStep('deliverySelect')}
                  className="w-full h-[72px] bg-white border-2 border-[#640a0a]/30 hover:border-[#640a0a] text-[#640a0a] rounded-2xl font-bold text-xl flex items-center justify-center space-x-4 transition-all active:scale-[0.98] group"
                >
                  <svg className="w-8 h-8 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <span>{t('order_delivery')}</span>
                </button>
              </div>

              <button
                onClick={() => handleConfirmOrder('later')}
                className="mt-12 text-gray-400 font-bold text-[16px] hover:text-[#640a0a] underline transition-colors"
              >
                {t('decide_later')}
              </button>
            </div>
          ) : step === 'pickupSelect' ? (
            <div className="w-full flex-1 flex flex-col bg-white overflow-hidden text-left">
              {/* Header */}
              <div className="flex items-start space-x-4 p-8 pb-4 relative">
                <button onClick={onClose} className="absolute right-6 top-6 text-gray-500 hover:text-gray-700 p-1 transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                <div className="w-[50px] h-[50px] rounded-full bg-[#fdf2ea] flex items-center justify-center shrink-0">
                  <svg className="w-7 h-7 text-[#bb6224]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {requireOrderChoice ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M16 11V7a4 4 0 118 0v4M5 9h14l1 12H4L5 9z" />
                    )}
                  </svg>
                </div>
                <div className="flex flex-col text-left pr-4">
                  <h2 className="text-[20px] font-extrabold text-gray-900 leading-tight mb-1">{requireOrderChoice ? t('select_pickup_date') : t('order_pickup')}</h2>
                  <p className="text-[13.5px] text-gray-500 font-medium leading-snug">{t('pickup_date_desc')}</p>
                </div>
              </div>

              {/* Form Content */}
              <div className="px-8 py-2 space-y-5 overflow-y-auto flex-1 custom-scrollbar">
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
                <div className="flex flex-col space-y-1.5">
                  <label className="text-[14px] font-extrabold text-gray-900">{t('pickup_location')}</label>
                  <div className="flex items-center justify-between px-4 py-4 bg-gray-50/80 border border-gray-100 rounded-xl cursor-pointer hover:bg-gray-100 transition-all">
                    <div className="flex items-start space-x-4">
                      <div className="mt-1">
                        <svg className="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <div className="flex flex-col items-start">
                        <span className="text-gray-900 text-[15px] font-bold">G.C. Korean Bbq Main Branch</span>
                        <span className="text-gray-500 text-[12px] font-medium leading-relaxed max-w-[200px]">123 Food Street, Barangay San Antonio, Davao City, 8000 Davao del Sur</span>
                      </div>
                    </div>
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>

                <div className="flex flex-col space-y-1.5">
                  <label className="text-[14px] font-extrabold text-gray-900">{t('pickup_date')}</label>
                  <div className="relative">
                    <input 
                      ref={mainInputRef}
                      type="date"
                      value={orderDate}
                      onChange={(e) => setOrderDate(e.target.value)}
                      autoFocus
                      className="w-full flex items-center justify-between px-4 py-3 bg-white border border-gray-200 rounded-lg cursor-pointer hover:border-gray-300 transition-all text-gray-900 text-[14px] font-medium outline-none focus:border-[#bb6224]"
                    />
                  </div>
                </div>

                <div className="flex flex-col space-y-1.5">
                  <label className="text-[14px] font-extrabold text-gray-900">{t('pickup_time')}</label>
                  <div className="relative">
                    <select
                      value={orderTime}
                      onChange={(e) => setOrderTime(e.target.value)}
                      className="w-full appearance-none px-4 py-3 bg-white border border-gray-200 rounded-lg cursor-pointer hover:border-gray-300 transition-all text-gray-900 text-[14px] font-medium outline-none focus:border-[#bb6224]"
                    >
                      <option value="">{t('select_time')}</option>
                      {TIME_SLOTS.map(slot => (
                        <option key={slot} value={slot}>{slot}</option>
                      ))}
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="bg-[#fdf6f0] border border-[#f5e6d8] rounded-lg p-4 flex items-start space-x-3 mt-2">
                  <div className="w-[18px] h-[18px] rounded-full border-[1.5px] border-[#bb6224] flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-[#bb6224] font-bold text-[10px] leading-none">i</span>
                  </div>
                  <p className="text-[12.5px] text-[#8e4c1c] font-medium leading-relaxed text-left">
                    {t('pickup_warning')}
                  </p>
                </div>
              </div>

              {/* Footer Buttons */}
              <div className="px-8 pt-4 pb-8 shrink-0 bg-white flex space-x-4">
                {isMandatorySelection ? (
                  <>
                    <button onClick={onClose} className="flex-1 h-[52px] bg-white border border-gray-200 text-gray-700 rounded-xl font-bold text-[15px] shadow-sm transition-all active:scale-[0.98]">
                      {t('cancel')}
                    </button>
                    <button 
                      onClick={() => handleConfirmOrder('pickup')} 
                      disabled={!orderDate || !orderTime}
                      className={`flex-1 h-[52px] rounded-xl font-bold text-[15px] shadow-sm transition-all active:scale-[0.98] ${(!orderDate || !orderTime) ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-[#a65d25] hover:bg-[#8f4f1f] text-white'}`}
                    >
                      {t('confirm_pickup')}
                    </button>
                  </>
                ) : (
                  <button onClick={() => handleConfirmOrder('later')} className="w-full h-[52px] bg-[#a65d25] hover:bg-[#8f4f1f] text-white rounded-xl font-bold text-[15px] shadow-sm transition-all active:scale-[0.98]">
                    {t('continue_shopping')}
                  </button>
                )}
              </div>
            </div>
          ) : step === 'deliverySelect' ? (
            <div className="w-full flex-1 flex flex-col bg-white overflow-hidden text-left">
              {/* Header */}
              <div className="flex items-start space-x-4 p-8 pb-4 relative">
                <button onClick={onClose} className="absolute right-6 top-6 text-gray-500 hover:text-gray-700 p-1 transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                <div className="w-[50px] h-[50px] rounded-full bg-[#fdf2ea] flex items-center justify-center shrink-0">
                  <svg className="w-7 h-7 text-[#bb6224]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div className="flex flex-col text-left pr-4">
                  <h2 className="text-[20px] font-extrabold text-gray-900 leading-tight mb-1">{t('order_delivery')}</h2>
                  <p className="text-[13.5px] text-gray-500 font-medium leading-snug">{t('select_delivery_details')}</p>
                </div>
              </div>

              {/* Form Content */}
              <div className="px-8 py-2 space-y-5 overflow-y-auto flex-1 custom-scrollbar">
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
                <div className="flex flex-col space-y-1.5">
                  <label className="text-[14px] font-extrabold text-gray-900">{t('delivery_address')}</label>
                  <div className="relative">
                    <textarea 
                      ref={mainInputRef}
                      value={deliveryAddress}
                      onChange={(e) => setDeliveryAddress(e.target.value)}
                      placeholder={t('enter_delivery_address')}
                      rows="2"
                      autoFocus
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg hover:border-gray-300 transition-all text-gray-900 text-[14px] font-medium outline-none focus:border-[#bb6224] resize-none"
                    />
                    <div className="absolute right-4 top-3 text-gray-400">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col space-y-1.5">
                  <label className="text-[14px] font-extrabold text-gray-900">{t('delivery_date')}</label>
                  <div className="relative">
                    <input 
                      type="date"
                      value={orderDate}
                      onChange={(e) => setOrderDate(e.target.value)}
                      className="w-full flex items-center justify-between px-4 py-3 bg-white border border-gray-200 rounded-lg cursor-pointer hover:border-gray-300 transition-all text-gray-900 text-[14px] font-medium outline-none focus:border-[#bb6224]"
                    />
                  </div>
                </div>

                <div className="flex flex-col space-y-1.5">
                  <label className="text-[14px] font-extrabold text-gray-900">{t('delivery_time')}</label>
                  <div className="relative">
                    <select
                      value={orderTime}
                      onChange={(e) => setOrderTime(e.target.value)}
                      className="w-full appearance-none px-4 py-3 bg-white border border-gray-200 rounded-lg cursor-pointer hover:border-gray-300 transition-all text-gray-900 text-[14px] font-medium outline-none focus:border-[#bb6224]"
                    >
                      <option value="">{t('select_time')}</option>
                      {TIME_SLOTS.map(slot => (
                        <option key={slot} value={slot}>{slot}</option>
                      ))}
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="bg-[#fdf6f0] border border-[#f5e6d8] rounded-lg p-4 flex items-start space-x-3 mt-2">
                  <div className="w-[18px] h-[18px] rounded-full border-[1.5px] border-[#bb6224] flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-[#bb6224] font-bold text-[10px] leading-none">i</span>
                  </div>
                  <p className="text-[12.5px] text-[#8e4c1c] font-medium leading-relaxed text-left">
                    {t('delivery_warning')}
                  </p>
                </div>
              </div>

              {/* Footer Buttons */}
              <div className="px-8 pt-4 pb-8 shrink-0 bg-white flex space-x-4">
                {isMandatorySelection ? (
                  <>
                    <button onClick={onClose} className="flex-1 h-[52px] bg-white border border-gray-200 text-gray-700 rounded-xl font-bold text-[15px] shadow-sm transition-all active:scale-[0.98]">
                      {t('cancel')}
                    </button>
                    <button 
                      onClick={() => handleConfirmOrder('delivery')} 
                      disabled={!orderDate || !orderTime || !deliveryAddress}
                      className={`flex-1 h-[52px] rounded-xl font-bold text-[15px] shadow-sm transition-all active:scale-[0.98] ${(!orderDate || !orderTime || !deliveryAddress) ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-[#a65d25] hover:bg-[#8f4f1f] text-white'}`}
                    >
                      {t('confirm_delivery')}
                    </button>
                  </>
                ) : (
                  <button onClick={() => handleConfirmOrder('later')} className="w-full h-[52px] bg-[#a65d25] hover:bg-[#8f4f1f] text-white rounded-xl font-bold text-[15px] shadow-sm transition-all active:scale-[0.98]">
                    {t('continue_shopping')}
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="w-full" />
          )}
        </div>
      </div>

      {/* Loading Modal */}
      {isLoading && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/40 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-2xl p-10 flex flex-col items-center shadow-2xl scale-110">
            <div className="relative w-20 h-20 mb-6">
              <div className="absolute inset-0 border-4 border-gray-100 rounded-full"></div>
              <div className="absolute inset-0 border-4 border-[#640a0a] border-t-transparent rounded-full animate-spin"></div>
            </div>
            <div className="text-xl font-bold text-gray-800 animate-pulse mt-4">
              {loadingMessage}
            </div>
            {loadingMessage !== 'Please wait...' && (
              <div className="text-sm text-gray-400 mt-2">Please wait a moment</div>
            )}
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccess && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/40 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl p-12 flex flex-col items-center shadow-[0_20px_50px_rgba(0,0,0,0.3)] transform transition-all scale-110">
            <div className="w-24 h-24 bg-[#640a0a]/10 rounded-full flex items-center justify-center mb-6 animate-bounce">
              <svg className="w-14 h-14 text-[#640a0a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Success!</h2>
            <p className="text-lg text-gray-600 font-medium text-center px-4">
              {requireLoginOnly ? 'Login Successful! Adding to cart...' :
                step === 'login' ? 'Successfully Logged In' :
                  step === 'pickupSelect' ? 'Pickup Order Confirmed' :
                    step === 'deliverySelect' ? 'Delivery Order Confirmed' :
                      'Successfully Registered'}
            </p>
            <div className="mt-6 flex space-x-1">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
              <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
              <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginPage;
