import React, { useState } from 'react';

const faqs = [
  {
    category: 'Store Information',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    items: [
      { q: 'What are your store hours?', a: 'We are open daily from 10:00 AM to 9:00 PM.' },
      { q: 'Where is your store located?', a: 'Guanzon St., Brgy 15, Gingoog City, Philippines, 9014.' },
    ],
  },
  {
    category: 'Orders and Services',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
      </svg>
    ),
    items: [
      { q: 'Do you accept dine-in customers?', a: 'Yes, we welcome dine-in guests. Enjoy a complete Korean BBQ experience at our restaurant.' },
      { q: 'Do you offer delivery or home service?', a: 'Yes, we provide home service and food packs so you can enjoy our meals at home.' },
      { q: 'How can I place an order?', a: 'You can place your order by calling us at 0926 290 7130 or by messaging us through our official social media pages.' },
      { q: 'What services do you offer?', a: 'We offer dine-in, curbside pickup, in-store pickup, outdoor seating, and home service.' },
    ],
  },
  {
    category: 'Payments and Policies',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
      </svg>
    ),
    items: [
      { q: 'What payment methods do you accept?', a: 'We accept cash and available online payment options.' },
      { q: 'Can I cancel my order?', a: 'Orders may be canceled before preparation begins. Once the order is being prepared or completed, cancellation may no longer be allowed.' },
      { q: 'Do you offer refunds?', a: 'Refunds are handled on a case-by-case basis depending on the situation.' },
    ],
  },
  {
    category: 'Reservations and Dining',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    items: [
      { q: 'Do you accept reservations?', a: 'Yes, you may contact us in advance for reservations, especially for groups.' },
      { q: 'Do you have outdoor seating?', a: 'Yes, outdoor seating is available for customers who prefer open-air dining.' },
    ],
  },
];

const FAQItem = ({ q, a }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-gray-100 last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-4 text-left gap-4"
      >
        <span className="font-bold text-gray-800 text-[14px] leading-snug">{q}</span>
        <svg
          className={`w-5 h-5 text-[#640a0a] shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <p className="pb-4 text-[13px] text-gray-600 leading-relaxed font-medium">{a}</p>
      )}
    </div>
  );
};

const HelpCenterModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100000] flex items-end sm:items-center justify-center sm:p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div
        className="bg-white rounded-t-[28px] sm:rounded-[32px] w-full sm:max-w-2xl shadow-2xl relative flex flex-col max-h-[92vh] sm:max-h-[90vh] overflow-hidden animate-slideUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-gray-100 flex items-center justify-between shrink-0 bg-white">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Help Center</h2>
            <p className="text-sm text-gray-400 font-medium mt-0.5">Frequently Asked Questions</p>
          </div>
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
        <div className="p-5 sm:p-8 overflow-y-auto custom-scroll font-sans space-y-6">
          <p className="text-gray-600 font-medium leading-relaxed">
            Welcome to the G.C. Korean BBQ Help Center. We are here to assist you with your orders, dining experience, and general inquiries.
          </p>

          {faqs.map((section) => (
            <section key={section.category} className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 bg-[#640a0a]/10 rounded-xl flex items-center justify-center text-[#640a0a] shrink-0">
                  {section.icon}
                </div>
                <h3 className="text-base font-black text-gray-900">{section.category}</h3>
              </div>
              <div>
                {section.items.map((item) => (
                  <FAQItem key={item.q} q={item.q} a={item.a} />
                ))}
              </div>
            </section>
          ))}

          {/* Contact Section */}
          <section className="bg-[#640a0a] p-6 rounded-2xl shadow-xl shadow-red-900/10 text-white">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 bg-white/10 rounded-xl flex items-center justify-center shrink-0">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-base font-black text-white">Contact and Support</h3>
            </div>
            <p className="text-white/80 text-sm font-medium mb-4">
              For questions, concerns, or assistance, you may reach us through:
            </p>
            <div className="space-y-1.5 font-bold text-white/90 text-sm">
              <p className="font-black text-white">G.C. Korean BBQ</p>
              <p>Guanzon St., Brgy 15, Gingoog City, Philippines, 9014</p>
              <p>📞 0926 290 7130</p>
              <p>📧 gckoreanbbq@gmail.com</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default HelpCenterModal;
