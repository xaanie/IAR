
import React, { useState, useEffect } from 'react';
import { AppSection, CartItem, Product, User as UserType } from './types';
import Dashboard from './components/Dashboard';
import MajorDiscovery from './components/MajorDiscovery';
import OpportunityPortal from './components/OpportunityPortal';
import MerchStore from './components/MerchStore';
import CheckoutPage from './components/CheckoutPage';
import LandingPage from './components/LandingPage';
import Onboarding from './components/Onboarding';
import Login from './components/Login';
import FAQ from './components/FAQ';
import Donations from './components/Donations';
import Volunteering from './components/Volunteering';
import UserPortal from './components/UserPortal';
import Events from './components/Events';
import { getCurrentUser, logout as authLogout } from './services/authService';
import { Home, Globe, Briefcase, ShoppingBag, ExternalLink, Bell, Heart, Users, HelpCircle, User, Menu, X, Calendar } from 'lucide-react';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<AppSection>(AppSection.LANDING);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [currentUser, setCurrentUser] = useState<UserType | null>(null);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    window.scrollTo(0, 0);
    // Check for existing user session
    const user = getCurrentUser();
    setCurrentUser(user);
  }, [activeSection]);

  const handleLoginSuccess = () => {
    const user = getCurrentUser();
    setCurrentUser(user);
    setShowLogin(false);
    setActiveSection(AppSection.DASHBOARD);
  };

  const handleRegisterStart = () => {
    setShowRegister(true);
    setActiveSection(AppSection.ONBOARDING);
  };

  const handleOnboardingComplete = () => {
    const user = getCurrentUser();
    setCurrentUser(user);
    setShowRegister(false);
    setActiveSection(AppSection.DASHBOARD);
  };

  const handleLogout = () => {
    authLogout();
    setCurrentUser(null);
    setActiveSection(AppSection.LANDING);
  };

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const updateCartQuantity = (productId: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.product.id === productId) {
        const newQty = Math.max(0, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const clearCart = () => setCart([]);

  const navItems = [
    { id: AppSection.DASHBOARD, label: 'Gateway', icon: Home, group: 'Core', mobile: true },
    { id: AppSection.MY_PORTAL, label: 'My Portal', icon: User, group: 'Personal', mobile: true },
    { id: AppSection.OPPORTUNITIES, label: 'Jobs', icon: Briefcase, group: 'Growth', mobile: true },
    { id: AppSection.EVENTS, label: 'Events', icon: Calendar, group: 'Community', mobile: true },
    { id: AppSection.STORE, label: 'Store', icon: ShoppingBag, group: 'Core', mobile: true },
    { id: AppSection.GLOBAL_DISCOVERY, label: 'Global Journeys', icon: Globe, group: 'Core', mobile: false },
    { id: AppSection.VOLUNTEERING, label: 'Volunteer', icon: Users, group: 'Community', mobile: false },
    { id: AppSection.DONATIONS, label: 'Support MSU', icon: Heart, group: 'Community', mobile: false },
    { id: AppSection.FAQ, label: 'Help & FAQ', icon: HelpCircle, group: 'Support', mobile: false },
  ];

  // Public routes - always accessible
  const publicRoutes = [AppSection.LANDING, AppSection.ONBOARDING];
  
  // Check if route requires authentication
  const requiresAuth = !publicRoutes.includes(activeSection);
  
  // Helper function to handle navigation with auth check
  const handleNavigate = (section: AppSection) => {
    if (publicRoutes.includes(section)) {
      setActiveSection(section);
    } else if (currentUser) {
      setActiveSection(section);
    } else {
      // Show login for protected routes
      setShowLogin(true);
      setActiveSection(AppSection.LANDING);
    }
  };
  
  // Redirect to login if accessing protected route without auth
  useEffect(() => {
    const isProtectedRoute = !publicRoutes.includes(activeSection);
    if (isProtectedRoute && !currentUser && activeSection !== AppSection.LANDING) {
      setActiveSection(AppSection.LANDING);
      setShowLogin(true);
    }
  }, [activeSection, currentUser]);

  if (activeSection === AppSection.LANDING) {
    return (
      <>
        <LandingPage 
          onNavigate={handleNavigate}
          onRegister={handleRegisterStart}
          onLogin={() => setShowLogin(true)}
        />
        {showLogin && (
          <Login
            onSuccess={handleLoginSuccess}
            onClose={() => {
              setShowLogin(false);
              // Only redirect to landing if not logged in
              if (!currentUser) {
                setActiveSection(AppSection.LANDING);
              }
            }}
            onSwitchToRegister={handleRegisterStart}
          />
        )}
      </>
    );
  }

  if (activeSection === AppSection.ONBOARDING) {
    return (
      <Onboarding 
        onComplete={handleOnboardingComplete}
        onLogin={() => {
          setShowRegister(false);
          setShowLogin(true);
        }}
      />
    );
  }

  // Protected routes - require authentication
  // This is handled by the useEffect redirect, but keep this as a safety check
  if (requiresAuth && !currentUser) {
    return (
      <>
        <LandingPage 
          onNavigate={handleNavigate}
          onRegister={handleRegisterStart}
          onLogin={() => setShowLogin(true)}
        />
        {showLogin && (
          <Login
            onSuccess={handleLoginSuccess}
            onClose={() => {
              setShowLogin(false);
              setActiveSection(AppSection.LANDING);
            }}
            onSwitchToRegister={handleRegisterStart}
          />
        )}
      </>
    );
  }

  const renderSection = () => {
    switch (activeSection) {
      case AppSection.DASHBOARD: return <Dashboard onNavigate={setActiveSection} />;
      case AppSection.MY_PORTAL: return <UserPortal onNavigate={setActiveSection} />;
      case AppSection.GLOBAL_DISCOVERY: return <MajorDiscovery onNavigate={setActiveSection} />;
      case AppSection.OPPORTUNITIES: return <OpportunityPortal />;
      case AppSection.VOLUNTEERING: return <Volunteering onNavigate={setActiveSection} />;
      case AppSection.DONATIONS: return <Donations />;
      case AppSection.STORE: return <MerchStore onAddToCart={addToCart} cartCount={cart.reduce((a, b) => a + b.quantity, 0)} onGoToCheckout={() => setActiveSection(AppSection.CHECKOUT)} />;
      case AppSection.CHECKOUT: return <CheckoutPage cart={cart} updateQuantity={updateCartQuantity} onComplete={() => { clearCart(); setActiveSection(AppSection.DASHBOARD); }} onBack={() => setActiveSection(AppSection.STORE)} />;
      case AppSection.FAQ: return <FAQ />;
      case AppSection.EVENTS: return <Events />;
      default: return <Dashboard onNavigate={handleNavigate} />;
    }
  };

  const navGroups = ['Core', 'Personal', 'Growth', 'Community', 'Support'];

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-slate-50">
      <header className="md:hidden flex items-center justify-between p-4 bg-[#009fe3] text-white sticky top-0 z-50 shadow-md">
        <div className="flex items-center space-x-2" onClick={() => setActiveSection(AppSection.LANDING)}>
          <img src="/logo.svg" className="w-8 h-8" alt="IAR" />
          <img src="/LOGO MSU.png" className="w-8 h-8 object-contain" alt="MSU" />
          <span className="font-black italic uppercase tracking-tighter text-sm">MSU Global</span>
        </div>
        <div className="flex items-center space-x-4">
          {cart.length > 0 && (
            <button onClick={() => setActiveSection(AppSection.CHECKOUT)} className="relative">
              <ShoppingBag className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 bg-yellow-400 text-blue-900 text-[8px] font-black w-3.5 h-3.5 rounded-full flex items-center justify-center border border-white">
                {cart.reduce((a, b) => a + b.quantity, 0)}
              </span>
            </button>
          )}
          <Bell className="w-5 h-5 opacity-80" />
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      <aside className={`
        fixed inset-y-0 left-0 z-50 w-72 bg-[#009fe3] text-white transform transition-transform duration-300 ease-in-out
        md:translate-x-0 md:static md:block
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="h-full flex flex-col">
          <div className="p-8 hidden md:block" onClick={() => setActiveSection(AppSection.LANDING)}>
            <div className="flex items-center justify-center space-x-3 mb-4">
              <img src="/logo.svg" className="w-16 h-16 drop-shadow-lg" alt="IAR" />
              <img src="/LOGO MSU.png" className="w-16 h-16 object-contain drop-shadow-lg" alt="MSU" />
            </div>
            <h1 className="text-xl font-black tracking-tight text-center uppercase italic">MSU Global</h1>
            <p className="text-[10px] text-blue-100 text-center uppercase font-bold tracking-widest mt-1">IAR Office</p>
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-6">
            {navGroups.map(group => (
              <div key={group}>
                <p className="text-[10px] font-black uppercase tracking-widest text-blue-200 mb-2 px-4 opacity-70 border-b border-blue-400/30 pb-1">{group}</p>
                <div className="space-y-1">
                  {navItems.filter(i => i.group === group).map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleNavigate(item.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-xl transition-all ${
                        activeSection === item.id 
                          ? 'bg-[#ffcc00] text-blue-900 shadow-lg font-bold' 
                          : 'hover:bg-blue-400/30'
                      }`}
                    >
                      <item.icon className="w-5 h-5 shrink-0" />
                      <span className="text-sm font-semibold">{item.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {currentUser && (
            <div className="p-6 border-t border-blue-400 bg-blue-600/20">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-[#ffcc00] flex items-center justify-center text-blue-900 font-black shadow-inner">
                  {currentUser.firstName.charAt(0)}{currentUser.lastName?.charAt(0) || currentUser.firstName.charAt(0)}
                </div>
                <div className="overflow-hidden flex-1">
                  <p className="text-xs font-black truncate">
                    {currentUser.firstName} {currentUser.lastName}
                  </p>
                  <p className="text-[9px] text-blue-100 uppercase font-bold">
                    {currentUser.profileComplete ? 'Verified User' : 'MSU Member'}
                  </p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="mt-3 w-full py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl text-[10px] font-bold uppercase tracking-widest transition"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-h-0 relative">
        <header className="hidden md:flex items-center justify-between p-6 bg-white border-b border-slate-200 sticky top-0 z-40">
          <div className="flex items-center space-x-4">
            <div className="bg-blue-50 p-1.5 rounded-lg overflow-hidden border border-blue-100">
              <img 
                src="https://images.unsplash.com/photo-1521295121783-8a321d551ad2?w=100&h=100&fit=crop" 
                className="w-7 h-7 object-cover rounded shadow-sm"
                alt="Global Flags"
              />
            </div>
            <h2 className="text-xl font-black text-blue-900 tracking-tight">
              {navItems.find(n => n.id === activeSection)?.label || 'Overview'}
            </h2>
          </div>
          <div className="flex items-center space-x-4">
            {cart.length > 0 && (
              <button 
                onClick={() => setActiveSection(AppSection.CHECKOUT)}
                className="flex items-center space-x-3 bg-blue-50 hover:bg-blue-100 text-blue-600 px-4 py-2 rounded-xl transition-colors"
              >
                <ShoppingBag className="w-4 h-4" />
                <span className="text-xs font-black uppercase tracking-widest">Checkout ({cart.reduce((a, b) => a + b.quantity, 0)})</span>
              </button>
            )}
            <button className="p-2 text-slate-400 hover:text-blue-600 transition relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <a href="https://www.msu.ac.zw" target="_blank" className="bg-[#009fe3] text-white px-5 py-2 rounded-xl text-xs font-bold hover:brightness-110 flex items-center space-x-2">
              <span>Visit Main Site</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </header>

        <main className="flex-1 p-4 md:p-8 lg:p-12 pb-24 md:pb-8">
          <div className="max-w-6xl mx-auto">
            {renderSection()}
          </div>
        </main>
      </div>

      <nav className="md:hidden fixed bottom-0 inset-x-0 bg-white border-t border-slate-200 flex justify-around p-2 z-50 shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
        {navItems.filter(i => i.mobile).map((item) => (
          <button
            key={item.id}
            onClick={() => handleNavigate(item.id)}
            className={`flex flex-col items-center p-2 rounded-xl transition-colors ${
              activeSection === item.id ? 'text-[#009fe3]' : 'text-slate-400'
            }`}
          >
            <item.icon className={`w-6 h-6 ${activeSection === item.id ? 'fill-blue-50/50' : ''}`} />
            <span className="text-[10px] font-bold mt-1 uppercase tracking-tighter">{item.label}</span>
          </button>
        ))}
        <button
          onClick={() => setIsMobileMenuOpen(true)}
          className="flex flex-col items-center p-2 text-slate-400"
        >
          <Menu className="w-6 h-6" />
          <span className="text-[10px] font-bold mt-1 uppercase tracking-tighter">More</span>
        </button>
      </nav>

      {isMobileMenuOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-blue-900/60 backdrop-blur-sm z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </div>
  );
};

export default App;
