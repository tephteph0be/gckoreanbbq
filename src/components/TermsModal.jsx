import React from 'react';

const TermsModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100000] flex items-end sm:items-center justify-center sm:p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div 
        className="bg-white rounded-t-[28px] sm:rounded-[32px] w-full sm:max-w-2xl shadow-2xl relative flex flex-col max-h-[92vh] sm:max-h-[90vh] overflow-hidden animate-slideUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-gray-100 flex items-center justify-between shrink-0 bg-white">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Terms and Conditions</h2>
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
              Welcome to G.C. Korean BBQ. By accessing and using our website and services, you agree to comply with the following Terms and Conditions. Please read them carefully.
            </p>

            <section>
              <h3 className="text-lg font-bold text-gray-900 mb-3">1. General</h3>
              <p className="mb-3">
                These Terms and Conditions govern your use of the G.C. Korean BBQ website and services, including dine-in, home service, and food pack orders.
              </p>
              <p>
                By using our website, you agree to be bound by these terms. If you do not agree, please do not use our services.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-bold text-gray-900 mb-3">2. Use of Website</h3>
              <p className="mb-2">You agree to:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Use the website for lawful purposes only</li>
                <li>Provide accurate and complete information when placing orders or inquiries</li>
                <li>Not misuse, disrupt, or attempt to gain unauthorized access to the website</li>
              </ul>
            </section>

            <section>
              <h3 className="text-lg font-bold text-gray-900 mb-3">3. Orders and Payments</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>All orders are subject to availability and confirmation</li>
                <li>We reserve the right to refuse or cancel any order at our discretion</li>
                <li>Prices are subject to change without prior notice</li>
                <li>Payments must be completed before order processing (for online or delivery orders)</li>
              </ul>
            </section>

            <section>
              <h3 className="text-lg font-bold text-gray-900 mb-3">4. Delivery and Service</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>Delivery times are estimates and may vary depending on location and demand</li>
                <li>Customers must provide accurate delivery details</li>
                <li>We are not responsible for delays caused by incorrect information or unforeseen circumstances</li>
              </ul>
            </section>

            <section>
              <h3 className="text-lg font-bold text-gray-900 mb-3">5. Dine-in Policy</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>Customers are expected to follow house rules and respect staff and other guests</li>
                <li>Management reserves the right to refuse service to anyone for inappropriate behavior</li>
              </ul>
            </section>

            <section>
              <h3 className="text-lg font-bold text-gray-900 mb-3">6. Cancellations and Refunds</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>Orders may be canceled within a reasonable time before preparation begins</li>
                <li>Refunds will be evaluated on a case-by-case basis</li>
                <li>No refunds for completed or consumed orders unless there is a valid issue</li>
              </ul>
            </section>

            <section>
              <h3 className="text-lg font-bold text-gray-900 mb-3">7. Intellectual Property</h3>
              <p>
                All content on this website (including logo, images, text, and design) is the property of G.C. Korean BBQ and may not be copied, reproduced, or used without permission.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-bold text-gray-900 mb-3">8. Limitation of Liability</h3>
              <p className="mb-2">G.C. Korean BBQ is not liable for:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Any indirect or incidental damages arising from the use of our website or services</li>
                <li>Service interruptions or technical issues beyond our control</li>
              </ul>
            </section>

            <section>
              <h3 className="text-lg font-bold text-gray-900 mb-3">9. Privacy</h3>
              <p>
                Your use of this website is also governed by our Privacy Notice and Cookie Policy.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-bold text-gray-900 mb-3">10. Changes to Terms</h3>
              <p>
                We reserve the right to update or modify these Terms and Conditions at any time. Changes will be posted on this page.
              </p>
            </section>

            <section className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-3">11. Governing Law</h3>
              <p>
                These Terms and Conditions are governed by the laws of the <span className="font-bold text-gray-800">Republic of the Philippines</span>.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsModal;
