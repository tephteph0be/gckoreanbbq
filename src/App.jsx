import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import LandingActionButtons from './components/LandingActionButtons';
import HeroSection from './components/HeroSection';
import FeaturedMenu from './components/FeaturedMenu';
import LoginPage from './components/LoginPage';
import MenuPage from './components/MenuPage';
import SignupPage from './components/SignupPage';
import AboutSection from './components/AboutSection';
import Footer from './components/Footer';
import OrderPage from './components/OrderPage';
import SidebarMenu from './components/SidebarMenu';
import OrderSummaryModal from './components/OrderSummaryModal';
import AccountSettingsModal from './components/AccountSettingsModal';
import LogoutAccountModal from './components/LogoutAccountModal';
import OrdersModal from './components/OrdersModal';
import CheckoutModal from './components/CheckoutModal';
import PrivacyModal from './components/PrivacyModal';
import CookieModal from './components/CookieModal';
import StoresModal from './components/StoresModal';
import TermsModal from './components/TermsModal';
import HelpCenterModal from './components/HelpCenterModal';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(() => localStorage.getItem('gc_session') !== null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loginInitialStep, setLoginInitialStep] = useState(null);
  const [loginInitialEmail, setLoginInitialEmail] = useState('');
  const [loginInitialName, setLoginInitialName] = useState('');
  const [cartItems, setCartItems] = useState([]);
  const [pendingProduct, setPendingProduct] = useState(null);
  const [pendingCartProduct, setPendingCartProduct] = useState(null);
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('gc_session');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return null;
      }
    }
    return null;
  });
  const [featuredProductToOrder, setFeaturedProductToOrder] = useState(null);
  const [orderInfo, setOrderInfo] = useState({
    type: null,
    date: 'May 24, 2024 (Fri)',
    time: '10:00 AM - 11:00 AM',
    address: 'G.C. Korean Bbq Main Branch'
  });
  const [showOrderSummary, setShowOrderSummary] = useState(false);
  const [summaryProduct, setSummaryProduct] = useState(null);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [showAccountSettings, setShowAccountSettings] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showOrdersModal, setShowOrdersModal] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [showCookieModal, setShowCookieModal] = useState(false);
  const [showStoresModal, setShowStoresModal] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [orders, setOrders] = useState([]);
  const [showCartToast, setShowCartToast] = useState(false);
  const [toastProduct, setToastProduct] = useState(null);
  const [savedAccounts, setSavedAccounts] = useState(() => {
    const saved = localStorage.getItem('gc_saved_accounts');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return Array.isArray(parsed) ? parsed.filter(a => a && a.email) : [];
      } catch (e) {
        return [];
      }
    }
    return [];
  });
  const [isFulfillmentSelectionFromCheckout, setIsFulfillmentSelectionFromCheckout] = useState(false);
  const [pendingFulfillmentItemIndex, setPendingFulfillmentItemIndex] = useState(null);

  const cartCount = cartItems.length;

  // Sync cart and orders to localStorage for the current user
  useEffect(() => {
    if (isLoggedIn && currentUser?.email) {
      const users = JSON.parse(localStorage.getItem('gc_users') || '{}');
      const email = currentUser.email.toLowerCase();
      if (users[email]) {
        users[email] = {
          ...users[email],
          cart: cartItems,
          orders: orders
        };
        localStorage.setItem('gc_users', JSON.stringify(users));
      }
    }
  }, [cartItems, orders, currentUser, isLoggedIn]);

  // Restore user data (cart/orders) on session change
  useEffect(() => {
    if (isLoggedIn && currentUser?.email) {
      const users = JSON.parse(localStorage.getItem('gc_users') || '{}');
      const userData = users[currentUser.email.toLowerCase()];
      if (userData) {
        if (userData.cart) setCartItems(userData.cart);
        if (userData.orders) {
          const fixedOrders = userData.orders.map(order => {
            if (order.fulfillment?.type === 'Delivery' && 
                (order.fulfillment.address === 'G.C. Korean Bbq Main Branch' || !order.fulfillment.address) && 
                userData.address) {
              return { ...order, fulfillment: { ...order.fulfillment, address: userData.address } };
            }
            return order;
          });
          setOrders(fixedOrders);
        }
        if (userData.address) {
          setOrderInfo(prev => ({ ...prev, address: userData.address }));
        }
      }
    }
  }, [isLoggedIn, currentUser]);

  // Persist session info whenever it changes
  useEffect(() => {
    if (isLoggedIn && currentUser) {
      localStorage.setItem('gc_session', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('gc_session');
    }
    localStorage.setItem('gc_saved_accounts', JSON.stringify(savedAccounts));
  }, [isLoggedIn, currentUser, savedAccounts]);

  const handleAddToCart = (product, isPending = false) => {
    if (isPending || !currentUser) {
      setPendingCartProduct(product);
      setLoginInitialStep('emailCheck');
      setShowLoginModal(true);
      return;
    }
    setCartItems(prev => [...prev, { ...product, id: Date.now() }]);
    setToastProduct(product);
    setShowCartToast(true);
    setTimeout(() => setShowCartToast(false), 3000);
  };

  const handleRemoveFromCart = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleBuyNow = (product) => {
    setSummaryProduct(product);
    setShowOrderSummary(true);
  };

  const handleProceedFromSummary = () => {
    setPendingProduct(summaryProduct);
    setShowOrderSummary(false);
    setLoginInitialStep((isLoggedIn && currentUser) ? 'orderChoice' : 'emailCheck');
    setShowLoginModal(true);
  };

  const handleCheckout = () => {
    setShowCheckoutModal(true);
  };

  const handleSelectItemFulfillment = (index, type) => {
    setCartItems(prev => {
      const newCart = [...prev];
      newCart[index] = {
        ...newCart[index],
        fulfillment: { ...newCart[index].fulfillment, type: type }
      };
      return newCart;
    });

    setShowCheckoutModal(false);
    setPendingFulfillmentItemIndex(index);
    setIsFulfillmentSelectionFromCheckout(true);
    setLoginInitialStep(type === 'Pickup' ? 'pickupSelect' : 'deliverySelect');
    setShowLoginModal(true);
  };

  const handleProceedFromCheckout = (selectedIndices) => {
    if (!selectedIndices || selectedIndices.length === 0) return;

    const itemsToOrder = cartItems.filter((_, idx) => selectedIndices.includes(idx));
    const allSelectedHaveFulfillment = itemsToOrder.every(item => !!item.fulfillment);
    
    if (allSelectedHaveFulfillment) {
      setOrders(prev => [{
        id: Date.now(),
        items: [...itemsToOrder],
        total: itemsToOrder.reduce((acc, item) => {
          const price = parseFloat(item.price) || parseFloat((item.priceRange || '0').split('-')[0].trim()) || 0;
          const addOnsTotal = (item.selectedAddOns || []).reduce((sum, addon) => sum + (parseFloat(addon.price?.replace(/[^\d.]/g, '') || '0') * (addon.quantity || 1)), 0);
          return acc + (price * (item.quantity || 1)) + addOnsTotal;
        }, 0),
        status: 'Preparing',
        date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
        fulfillment: {
          ...(itemsToOrder[0]?.fulfillment || { type: 'Pickup', date: 'Date not set', time: 'Time not set' }),
          address: (itemsToOrder[0]?.fulfillment?.type === 'Delivery' && currentUser?.address) 
            ? currentUser.address 
            : (itemsToOrder[0]?.fulfillment?.address || 'Address not set')
        }
      }, ...prev]);

      setCartItems(prev => prev.filter((_, idx) => !selectedIndices.includes(idx)));
      
      if (cartItems.length === selectedIndices.length) {
        setShowCheckoutModal(false);
      }
      setShowOrdersModal(true);
      setCurrentPage('home');
      return;
    }
  };

  const handleFeaturedOrder = (product) => {
    setFeaturedProductToOrder(product);
    setCurrentPage('order');
    setActiveCategory(null);
  };

  const handleLoginClose = () => {
    setShowLoginModal(false);
    setLoginInitialStep(null);
    setLoginInitialEmail('');
    setLoginInitialName('');
    setPendingProduct(null);
    setPendingCartProduct(null);
    setIsFulfillmentSelectionFromCheckout(false);
  };

  const handleLoginBack = () => {
    if (savedAccounts.length > 0) {
      setShowLoginModal(false);
      setShowLogoutModal(true);
      setLoginInitialEmail('');
      setLoginInitialName('');
      setLoginInitialStep(null);
    } else {
      handleLoginClose();
    }
  };

  const handleLoginSuccess = (choice, info, fulfillmentData = null) => {
    setIsLoggedIn(true);
    if (fulfillmentData) {
      setOrderInfo(prev => ({
        ...prev,
        type: choice === 'pickup' ? 'Pickup' : (choice === 'delivery' ? 'Delivery' : prev.type),
        date: fulfillmentData.date || prev.date,
        time: fulfillmentData.time || prev.time,
        address: fulfillmentData.address || prev.address
      }));
    }
    if (info && info.email) {
      setCurrentUser(info);
      
      // Update saved accounts: Replace if exists, or append if new
      setSavedAccounts(prev => {
        const filtered = prev.filter(a => a && a.email && a.email.toLowerCase() !== info.email.toLowerCase());
        return [...filtered, info];
      });
      
      // Load user's saved cart and orders
      const users = JSON.parse(localStorage.getItem('gc_users') || '{}');
      const userData = users[info.email.toLowerCase()];
      if (userData) {
        if (userData.cart) setCartItems(userData.cart);
        if (userData.orders) setOrders(userData.orders);
      }
    }
    setShowLoginModal(false);
    setLoginInitialStep(null);

    // Universal navigation to Order Page on login/account selection
    if (!isFulfillmentSelectionFromCheckout) {
      setCurrentPage('order');
    }

    if (isFulfillmentSelectionFromCheckout && (choice === 'pickup' || choice === 'delivery')) {
      if (pendingFulfillmentItemIndex !== null && cartItems[pendingFulfillmentItemIndex]) {
        setCartItems(prev => {
          const newCart = [...prev];
          const item = newCart[pendingFulfillmentItemIndex];
          if (!item) return prev;
          newCart[pendingFulfillmentItemIndex] = {
            ...item,
            fulfillment: {
              type: choice === 'pickup' ? 'Pickup' : 'Delivery',
              date: fulfillmentData?.date || orderInfo.date || 'Date not set',
              time: fulfillmentData?.time || orderInfo.time || 'Time not set',
              address: choice === 'pickup' ? 'G.C. Korean Bbq Main Branch' : (fulfillmentData?.address || orderInfo.address || info?.address || 'Address not set')
            }
          };
          return newCart;
        });
        setPendingFulfillmentItemIndex(null);
      }
      setIsFulfillmentSelectionFromCheckout(false);
      setShowCheckoutModal(true);
      return;
    }

    if (pendingCartProduct && choice !== 'guest') {
      setCartItems(prev => [...prev, { ...pendingCartProduct, id: Date.now() }]);
      setToastProduct(pendingCartProduct);
      setShowCartToast(true);
      setTimeout(() => setShowCartToast(false), 3000);
      setPendingCartProduct(null);
      setCurrentPage('order');
    } else if (pendingProduct) {
      const addOnsTotal = (pendingProduct.selectedAddOns || []).reduce((sum, addon) => sum + (parseFloat(addon.price?.replace(/[^\d.]/g, '') || '0') * (addon.quantity || 1)), 0);
      const price = parseFloat(pendingProduct.price) || parseFloat((pendingProduct.priceRange || '0').split('-')[0].trim()) || 0;
      const total = (price * (pendingProduct.quantity || 1)) + addOnsTotal;

      const newOrder = {
        id: Date.now(),
        items: [{ ...pendingProduct }],
        total: total,
        status: 'Preparing',
        date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
        fulfillment: {
          type: choice === 'pickup' ? 'Pickup' : 'Delivery',
          date: fulfillmentData?.date || orderInfo.date || 'Date not set',
          time: fulfillmentData?.time || orderInfo.time || 'Time not set',
          address: choice === 'pickup' ? 'G.C. Korean Bbq Main Branch' : (fulfillmentData?.address || orderInfo.address || info?.address || 'Address not set')
        }
      };
      setOrders(prev => [newOrder, ...prev]);
      setPendingProduct(null);
      setShowOrdersModal(true);
    }
  };

  const handleLogout = () => {
    setShowLogoutModal(true);
  };

  const handleLogoutConfirm = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    setCartItems([]);
    setOrders([]);
    setShowLogoutModal(false);
    setCurrentPage('home');
  };

  const handleAccountSelect = (account) => {
    setShowLogoutModal(false);
    setLoginInitialEmail(account.email);
    setLoginInitialName(account.username);
    setLoginInitialStep('login');
    setShowLoginModal(true);
  };

  const handleRemoveAccounts = (emailsToRemove) => {
    setSavedAccounts(prev => prev.filter(a => !emailsToRemove.includes(a.email)));
    if (emailsToRemove.includes(currentUser?.email)) {
      handleLogoutConfirm();
    }
  };



  const handleCancelOrders = (idsToRemove) => {
    setOrders(prev => {
      const remaining = prev.filter(order => !idsToRemove.includes(order.id));
      return [...remaining];
    });
  };

  const handleAccountUpdate = (updatedUser) => {
    if (!currentUser || !updatedUser) return;
    const oldEmail = currentUser.email.toLowerCase();
    const newEmail = updatedUser.email.toLowerCase();

    // 1. Update localStorage storage
    const users = JSON.parse(localStorage.getItem('gc_users') || '{}');
    
    // Transfer data if email changed
    if (oldEmail !== newEmail) {
      const oldData = users[oldEmail] || {};
      updatedUser.cart = updatedUser.cart || oldData.cart || [];
      updatedUser.orders = updatedUser.orders || oldData.orders || [];
      delete users[oldEmail];
    }
    
    users[newEmail] = updatedUser;
    localStorage.setItem('gc_users', JSON.stringify(users));

    // 2. Update React state
    setCurrentUser(updatedUser);
    setSavedAccounts(prev => prev.map(a => a.email.toLowerCase() === oldEmail ? updatedUser : a));
    
    // 3. Close the modal
    setShowAccountSettings(false);
  };

  return (
    <div id="app-root" className="min-h-screen bg-[#680000] font-sans antialiased text-white overflow-x-hidden flex flex-col relative">
      {currentPage === 'order' ? (
        <OrderPage
          initialProduct={featuredProductToOrder}
          onClearInitialProduct={() => {
            setFeaturedProductToOrder(null);
            setCurrentPage('home');
          }}
          onMenuClick={() => setIsSidebarOpen(true)}
          onCartClick={() => { }}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          onLoginClick={() => { setLoginInitialStep('emailCheck'); setShowLoginModal(true); }}
          onAddToCart={handleAddToCart}
          onBuyNow={handleBuyNow}
          onRemoveItem={handleRemoveFromCart}
          onClearCart={handleClearCart}
          onCheckout={handleCheckout}
          isLoggedIn={isLoggedIn}
          onLogout={handleLogout}
          orderInfo={orderInfo}
          cartCount={cartCount}
          cartItems={cartItems}
          currentUser={currentUser}
          onAccountSettingsClick={() => setShowAccountSettings(true)}
          onOrdersClick={() => setShowOrdersModal(true)}
          showCartToast={showCartToast}
          toastProduct={toastProduct}
        />
      ) : (
        <>
          <Navbar
            onMenuClick={() => setIsSidebarOpen(true)}
            onLoginClick={() => { setLoginInitialStep('emailCheck'); setShowLoginModal(true); }}
            onOrderClick={() => {
              currentPage === 'order' ? setActiveCategory(null) : setCurrentPage('order');
            }}
            isLoggedIn={isLoggedIn}
            onLogout={handleLogout}
            orderInfo={orderInfo}
            cartCount={cartCount}
            cartItems={cartItems}
            currentUser={currentUser}
            onAccountSettingsClick={() => setShowAccountSettings(true)}
            onOrdersClick={() => setShowOrdersModal(true)}
            onCheckout={handleCheckout}
          />
          <HeroSection
            onOrderClick={() => {
              setCurrentPage('order');
              setActiveCategory(null);
            }}
          />

          <div className="relative z-10 flex flex-row justify-center items-center gap-3 sm:gap-8 py-8 px-4 bg-[#680000]">
            <button
              onClick={() => { setLoginInitialStep('pickupSelect'); setShowLoginModal(true); }}
              className="group relative w-1/2 sm:w-[260px] h-[52px] sm:h-[60px] bg-[#331102] border-2 border-[#d4af37]/60 rounded-xl text-white font-bold flex items-center justify-center space-x-2 sm:space-x-3 text-sm sm:text-lg shadow-xl hover:bg-[#4d1607] hover:border-[#d4af37] transition-all active:scale-[0.98] overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-[#d4af37]/0 via-[#d4af37]/5 to-[#d4af37]/0 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-[#d4af37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M16 11V7a4 4 0 118 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <span className="relative z-10">Order Pickup</span>
            </button>
            <button
              onClick={() => { setLoginInitialStep('deliverySelect'); setShowLoginModal(true); }}
              className="group relative w-1/2 sm:w-[260px] h-[52px] sm:h-[60px] bg-white border-2 border-white/90 text-[#680000] rounded-xl font-bold flex items-center justify-center space-x-2 sm:space-x-3 text-sm sm:text-lg shadow-xl hover:bg-gray-50 transition-all active:scale-[0.98] overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-[#680000]/0 via-[#680000]/5 to-[#680000]/0 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-[#680000]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span className="relative z-10">Home Delivery</span>
            </button>
          </div>

          <FeaturedMenu onOrderNow={handleFeaturedOrder} />
          <AboutSection />
          <Footer 
            onCorporateClick={() => {
              setCurrentPage('order');
              setActiveCategory('Corporate Information');
            }} 
            onPrivacyClick={() => setShowPrivacyModal(true)}
            onCookieClick={() => setShowCookieModal(true)}
            onStoresClick={() => setShowStoresModal(true)}
            onAboutClick={() => {
              const el = document.getElementById('about-section');
              const container = document.getElementById('app-root');
              if (el && container) {
                const top = el.offsetTop;
                container.scrollTo({ top, behavior: 'smooth' });
              } else if (el) {
                el.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            onTermsClick={() => setShowTermsModal(true)}
            onHelpClick={() => setShowHelpModal(true)}
          />
        </>
      )}

      {/* Shared Modals & Navigation Components */}
      <SidebarMenu
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        onLoginClick={() => { setLoginInitialStep('emailCheck'); setShowLoginModal(true); }}
        onHomeClick={() => setCurrentPage('home')}
        isLoggedIn={isLoggedIn}
        currentUser={currentUser}
        onLogout={handleLogout}
        onOrdersClick={() => setShowOrdersModal(true)}
        onAccountSettingsClick={() => setShowAccountSettings(true)}
        onOrderClick={() => {
          setCurrentPage('order');
          setActiveCategory(null);
        }}
        onHighlightsClick={() => {
          setCurrentPage('order');
          setActiveCategory('Customer Highlights');
        }}
        onCorporateClick={() => {
          setCurrentPage('order');
          setActiveCategory('Corporate Information');
        }}
      />
      <LoginPage
        key={`${loginInitialEmail}-${loginInitialStep}`}
        isOpen={showLoginModal}
        onClose={handleLoginClose}
        onLoginSuccess={handleLoginSuccess}
        requireOrderChoice={!!pendingProduct} requireLoginOnly={!!pendingCartProduct}
        isFulfillmentSelectionFromCheckout={isFulfillmentSelectionFromCheckout}
        initialStep={loginInitialStep || (isLoggedIn ? 'orderChoice' : 'emailCheck')}
        initialEmail={loginInitialEmail || ''}
        initialName={loginInitialName || ''}
        onBack={handleLoginBack}
      />
      <OrderSummaryModal
        isOpen={showOrderSummary}
        onClose={() => setShowOrderSummary(false)}
        product={summaryProduct}
        onProceed={handleProceedFromSummary}
      />
      <CheckoutModal
        isOpen={showCheckoutModal}
        onClose={() => setShowCheckoutModal(false)}
        cartItems={cartItems}
        onSelectItemFulfillment={handleSelectItemFulfillment}
        onProceed={handleProceedFromCheckout}
      />
      <AccountSettingsModal
        key={showAccountSettings ? `account-settings-${currentUser?.email}` : 'account-settings-closed'}
        isOpen={showAccountSettings}
        onClose={() => setShowAccountSettings(false)}
        currentUser={currentUser}
        onSave={handleAccountUpdate}
      />
      <PrivacyModal
        isOpen={showPrivacyModal}
        onClose={() => setShowPrivacyModal(false)}
      />
      <CookieModal
        isOpen={showCookieModal}
        onClose={() => setShowCookieModal(false)}
      />
      <StoresModal
        isOpen={showStoresModal}
        onClose={() => setShowStoresModal(false)}
      />
      <TermsModal
        isOpen={showTermsModal}
        onClose={() => setShowTermsModal(false)}
      />
      <HelpCenterModal
        isOpen={showHelpModal}
        onClose={() => setShowHelpModal(false)}
      />
      <LogoutAccountModal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        accounts={savedAccounts}
        onSelectAccount={handleAccountSelect}
        onContinueWithAnother={() => {
          setShowLogoutModal(false);
          handleLogoutConfirm();
          setLoginInitialStep('emailCheck');
          setLoginInitialEmail('');
          setLoginInitialName('');
          setShowLoginModal(true);
        }}
        onRemoveAccounts={handleRemoveAccounts}
      />
      <OrdersModal 
        isOpen={showOrdersModal} 
        onClose={() => setShowOrdersModal(false)} 
        orders={orders} 
        onCancelOrders={handleCancelOrders}
      />
    </div>
  );
}

export default App;
