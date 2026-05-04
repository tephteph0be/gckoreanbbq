import React from 'react';

const CookieModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100000] flex items-end sm:items-center justify-center sm:p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div 
        className="bg-white rounded-t-[28px] sm:rounded-[32px] w-full sm:max-w-2xl shadow-2xl relative flex flex-col max-h-[92vh] sm:max-h-[90vh] overflow-hidden animate-slideUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-gray-100 flex items-center justify-between shrink-0 bg-white">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Cookie Privacy</h2>
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
        <div className="p-5 sm:p-8 overflow-y-auto custom-scroll text-gray-700 leading-relaxed font-sans">
          <p className="text-sm text-gray-400 mb-6 font-bold">Effective Date: May 3, 2026</p>
          
          <div className="space-y-6">
            <p className="font-medium">
              This website of G.C. Korean BBQ uses cookies to improve your browsing experience, analyze site traffic, and ensure that our website functions properly.
            </p>

            <section>
              <h3 className="text-lg font-bold text-gray-900 mb-3">What Are Cookies?</h3>
              <p>
                Cookies are small text files stored on your device when you visit a website. They help remember your preferences and improve overall website performance.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-bold text-gray-900 mb-3">How We Use Cookies</h3>
              <p className="mb-2">We use cookies to:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Ensure the website works properly</li>
                <li>Improve your browsing experience</li>
                <li>Analyze website traffic and usage</li>
                <li>Remember your preferences</li>
              </ul>
            </section>

            <section>
              <h3 className="text-lg font-bold text-gray-900 mb-3">Types of Cookies We Use</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-bold text-gray-800">Essential Cookies</h4>
                  <p className="text-sm">These are necessary for the website to function properly.</p>
                </div>
                <div>
                  <h4 className="font-bold text-gray-800">Analytics Cookies</h4>
                  <p className="text-sm">These help us understand how visitors use our website so we can improve it.</p>
                </div>
                <div>
                  <h4 className="font-bold text-gray-800">Functional Cookies</h4>
                  <p className="text-sm">These allow us to remember your preferences and settings.</p>
                </div>
                <div>
                  <h4 className="font-bold text-gray-800">Marketing Cookies (if applicable)</h4>
                  <p className="text-sm">These may be used to provide relevant promotions or advertisements.</p>
                </div>
              </div>
            </section>

            <section>
              <h3 className="text-lg font-bold text-gray-900 mb-3">Your Choices</h3>
              <p className="mb-3 font-medium text-gray-800">By continuing to use our website, you agree to the use of cookies.</p>
              <p>
                You may choose to disable cookies through your browser settings. However, some parts of the website may not function properly if cookies are disabled.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-bold text-gray-900 mb-3">Third-Party Cookies</h3>
              <p>
                Some cookies may be provided by third-party services such as analytics or social media platforms. These third parties have their own privacy policies.
              </p>
            </section>

            <section className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Contact Us</h3>
              <p className="mb-4">If you have any questions about this Cookie Notice, you may contact:</p>
              <div className="space-y-1 font-bold text-gray-800">
                <p>G.C. Korean BBQ</p>
                <p>📧 gckoreanbbq@gmail.com</p>
                <p>📞 0926 290 7130</p>
              </div>
            </section>

            <section>
              <h3 className="text-lg font-bold text-gray-900 mb-3">Updates</h3>
              <p>We may update this Cookie Notice from time to time. Any changes will be posted on this page.</p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieModal;
