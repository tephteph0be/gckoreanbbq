import React from 'react';

const PrivacyModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100000] flex items-end sm:items-center justify-center sm:p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div 
        className="bg-white rounded-t-[28px] sm:rounded-[32px] w-full sm:max-w-2xl shadow-2xl relative flex flex-col max-h-[92vh] sm:max-h-[90vh] overflow-hidden animate-slideUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-gray-100 flex items-center justify-between shrink-0 bg-white">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Privacy Notice</h2>
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
              Welcome to G.C. Korean BBQ. We are committed to protecting your personal information in accordance with the Data Privacy Act of 2012 (Republic Act No. 10173) of the Philippines.
            </p>
            
            <p className="font-medium">
              This Privacy Notice explains how we collect, use, and protect your personal data when you visit our website or use our services.
            </p>

            <section>
              <h3 className="text-lg font-bold text-gray-900 mb-3">1. Information We Collect</h3>
              <p className="mb-3">When you use our website or services, we may collect the following:</p>
              <div className="pl-4 space-y-4">
                <div>
                  <h4 className="font-bold text-gray-800 mb-2">Personal Information</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Name</li>
                    <li>Contact number</li>
                    <li>Email address</li>
                    <li>Delivery or billing address</li>
                    <li>Order details and preferences</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 mb-2">Non-Personal Information</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Browser type and version</li>
                    <li>Device information</li>
                    <li>IP address</li>
                    <li>Website usage data (e.g., pages visited, time spent)</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h3 className="text-lg font-bold text-gray-900 mb-3">2. How We Use Your Information</h3>
              <p className="mb-2">We use your information to:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Process and fulfill your orders (dine-in, home service, and food packs)</li>
                <li>Respond to inquiries and customer support requests</li>
                <li>Improve our website, products, and services</li>
                <li>Send updates, promotions, and announcements (with your consent)</li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>

            <section>
              <h3 className="text-lg font-bold text-gray-900 mb-3">3. Legal Basis for Processing</h3>
              <p className="mb-2">We process your personal data based on:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Your consent</li>
                <li>Fulfillment of a contract (e.g., processing orders)</li>
                <li>Compliance with legal obligations</li>
                <li>Legitimate business interests</li>
              </ul>
            </section>

            <section>
              <h3 className="text-lg font-bold text-gray-900 mb-3">4. Sharing of Information</h3>
              <p className="mb-2">We do not sell your personal data. We may share your information with:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Delivery personnel or service providers to complete your orders</li>
                <li>IT or website service providers</li>
                <li>Government authorities, when required by law</li>
              </ul>
            </section>

            <section>
              <h3 className="text-lg font-bold text-gray-900 mb-3">5. Data Protection and Security</h3>
              <p>We implement appropriate technical and organizational measures to safeguard your personal data against unauthorized access, disclosure, or misuse.</p>
            </section>

            <section>
              <h3 className="text-lg font-bold text-gray-900 mb-3">6. Data Retention</h3>
              <p className="mb-2">We retain your personal information only for as long as necessary to:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Fulfill the purposes stated in this notice</li>
                <li>Comply with legal and regulatory requirements</li>
              </ul>
            </section>

            <section>
              <h3 className="text-lg font-bold text-gray-900 mb-3">7. Your Rights</h3>
              <p className="mb-2">Under the Data Privacy Act, you have the right to:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Access your personal data</li>
                <li>Request correction of inaccurate information</li>
                <li>Request deletion or blocking of your data</li>
                <li>Withdraw consent at any time</li>
                <li>File a complaint with the National Privacy Commission (NPC)</li>
              </ul>
            </section>

            <section>
              <h3 className="text-lg font-bold text-gray-900 mb-3">8. Cookies</h3>
              <p>Our website may use cookies to enhance your browsing experience. You can manage or disable cookies through your browser settings.</p>
            </section>

            <section>
              <h3 className="text-lg font-bold text-gray-900 mb-3">9. Third-Party Links</h3>
              <p>Our website may contain links to third-party websites or platforms. We are not responsible for their privacy practices.</p>
            </section>

            <section className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-4">10. Contact Information</h3>
              <p className="mb-4">For any questions or concerns regarding this Privacy Notice, you may contact us:</p>
              <div className="space-y-1 font-bold text-gray-800">
                <p>G.C. Korean BBQ</p>
                <p>Guanzon St., Brgy 15, Gingoog City, Philippines, 9014</p>
                <p>📞 0926 290 7130</p>
                <p>📧 gckoreanbbq@gmail.com</p>
              </div>
            </section>

            <section>
              <h3 className="text-lg font-bold text-gray-900 mb-3">11. Updates to This Privacy Notice</h3>
              <p>We may update this Privacy Notice from time to time. Any changes will be posted on this page with the updated effective date.</p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyModal;
