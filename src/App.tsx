import React, { useState, useEffect } from "react";
import StorefrontView from "./components/StorefrontView";
import AboutView from "./components/AboutView";
import JournalView from "./components/JournalView";
import ProductDetailDrawer from "./components/ProductDetailDrawer";
import SignInModal from "./components/SignInModal";
import MemberDrawer from "./components/MemberDrawer";
import { CuratedProduct } from "./types";
import { Shield, Mail, Check, X, ArrowRight, Menu, User, LogOut } from "lucide-react";

export default function App() {
  const [selectedProduct, setSelectedProduct] = useState<CuratedProduct | null>(null);
  const [registeredEmail, setRegisteredEmail] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);
  const [showNotifyModal, setShowNotifyModal] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [modalEmail, setModalEmail] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("storefront");
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [isNewsletterSubscribed, setIsNewsletterSubscribed] = useState(false);

  // Sign In states
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [showMemberDrawer, setShowMemberDrawer] = useState(false);

  // Google sign up states in waitlist modal
  const [showGoogleChooserWaitlist, setShowGoogleChooserWaitlist] = useState(false);
  const [isEnteringCustomGoogleWaitlist, setIsEnteringCustomGoogleWaitlist] = useState(false);
  const [customGoogleEmailWaitlist, setCustomGoogleEmailWaitlist] = useState("");
  const [googleLoadingWaitlist, setGoogleLoadingWaitlist] = useState(false);
  const [googleErrorWaitlist, setGoogleErrorWaitlist] = useState("");

  // Load waitlist status from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("obelii_waitlist_email");
    if (saved) {
      setRegisteredEmail(saved);
      setIsRegistered(true);
      const isLogged = localStorage.getItem("obelii_logged_in") === "true";
      if (isLogged) {
        setIsLoggedIn(true);
      }
    }
  }, []);

  // Track active section during scroll
  useEffect(() => {
    const sections = ["storefront", "about", "journal"];
    const observers = sections.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        { threshold: 0.15, rootMargin: "-20% 0px -50% 0px" }
      );
      observer.observe(el);
      return { observer, el };
    });

    return () => {
      observers.forEach((obs) => {
        if (obs) {
          obs.observer.unobserve(obs.el);
        }
      });
    };
  }, []);

  const handleJoinPrivateList = (email: string) => {
    localStorage.setItem("obelii_waitlist_email", email);
    localStorage.setItem("obelii_logged_in", "true");
    setRegisteredEmail(email);
    setIsRegistered(true);
    setIsLoggedIn(true);
  };

  const handleSignIn = (email: string) => {
    localStorage.setItem("obelii_waitlist_email", email);
    localStorage.setItem("obelii_logged_in", "true");
    setRegisteredEmail(email);
    setIsRegistered(true);
    setIsLoggedIn(true);
    setShowSignInModal(false);
  };

  const handleSignOut = () => {
    localStorage.removeItem("obelii_logged_in");
    setIsLoggedIn(false);
    setShowMemberDrawer(false);
  };

  const handleGoogleSelectWaitlist = (selectedEmail: string) => {
    setGoogleLoadingWaitlist(true);
    setGoogleErrorWaitlist("");
    setTimeout(() => {
      setGoogleLoadingWaitlist(false);
      setShowGoogleChooserWaitlist(false);
      handleJoinPrivateList(selectedEmail);
    }, 1500);
  };

  const handleCustomGoogleSubmitWaitlist = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customGoogleEmailWaitlist.trim() || !customGoogleEmailWaitlist.includes("@")) {
      setGoogleErrorWaitlist("Please specify a valid Google account.");
      return;
    }
    handleGoogleSelectWaitlist(customGoogleEmailWaitlist);
  };

  const handleModalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!modalEmail.trim() || !modalEmail.includes("@")) return;
    handleJoinPrivateList(modalEmail);
    setModalEmail("");
  };

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const scrollToWaitlist = () => {
    scrollToSection("storefront");
    setTimeout(() => {
      const input = document.getElementById("hero-email-input");
      if (input) {
        input.focus();
      }
    }, 600);
  };

  return (
    <div className="min-h-screen bg-brand-alabaster text-brand-charcoal selection:bg-brand-charcoal selection:text-brand-alabaster relative flex flex-col font-sans">
      {/* Top Navigation Bar */}
      <nav className="w-full sticky top-0 bg-[#fbf9f9]/85 backdrop-blur-md border-b border-brand-charcoal/5 z-40">
        <div className="flex justify-between items-center px-6 md:px-20 py-5 max-w-7xl mx-auto">
          {/* Logo */}
          <button
            onClick={() => {
              scrollToSection("storefront");
            }}
            className="font-serif text-2xl tracking-tighter text-brand-charcoal hover:opacity-85 transition-opacity focus:outline-none"
          >
            Obelii
          </button>

          {/* Desktop Navigation links */}
          <div className="hidden md:flex items-center space-x-12">
            <button
              onClick={() => scrollToSection("storefront")}
              className={`font-sans text-xs uppercase tracking-widest pb-1 transition-all border-b ${
                activeSection === "storefront"
                  ? "text-brand-charcoal border-brand-charcoal font-semibold"
                  : "text-brand-gray border-transparent hover:text-brand-charcoal"
              }`}
            >
              Storefront
            </button>
            <button
              onClick={() => scrollToSection("about")}
              className={`font-sans text-xs uppercase tracking-widest pb-1 transition-all border-b ${
                activeSection === "about"
                  ? "text-brand-charcoal border-brand-charcoal font-semibold"
                  : "text-brand-gray border-transparent hover:text-brand-charcoal"
              }`}
            >
              About
            </button>
            <button
              onClick={() => scrollToSection("journal")}
              className={`font-sans text-xs uppercase tracking-widest pb-1 transition-all border-b ${
                activeSection === "journal"
                  ? "text-brand-charcoal border-brand-charcoal font-semibold"
                  : "text-brand-gray border-transparent hover:text-brand-charcoal"
              }`}
            >
              Journal
            </button>
          </div>

          {/* Action button */}
          <div className="hidden md:flex items-center gap-4">
            {isLoggedIn ? (
              <button
                onClick={() => setShowMemberDrawer(true)}
                className="font-sans text-xs tracking-widest bg-brand-charcoal text-[#fbf9f9] border border-brand-charcoal px-6 py-3.5 hover:bg-transparent hover:text-brand-charcoal transition-all duration-300 uppercase font-semibold hover:shadow-lg hover:shadow-brand-charcoal/5 flex items-center gap-2"
              >
                <User size={13} className="text-brand-gold stroke-[2.5]" />
                Collector Room
              </button>
            ) : (
              <>
                <button
                  onClick={() => setShowSignInModal(true)}
                  className="font-sans text-xs tracking-widest text-brand-gray hover:text-brand-charcoal transition-colors uppercase font-semibold px-4 py-2"
                >
                  Sign In
                </button>
                <button
                  onClick={() => setShowNotifyModal(true)}
                  className="font-sans text-xs tracking-widest bg-brand-charcoal text-[#fbf9f9] border border-brand-charcoal px-8 py-3.5 hover:bg-transparent hover:text-brand-charcoal transition-all duration-300 uppercase font-semibold hover:shadow-lg hover:shadow-brand-charcoal/5"
                >
                  Notify Me
                </button>
              </>
            )}
          </div>

          {/* Mobile menu triggers */}
          <div className="flex md:hidden items-center gap-3">
            {isLoggedIn ? (
              <button
                onClick={() => setShowMemberDrawer(true)}
                className="font-sans text-[10px] tracking-widest bg-brand-charcoal text-[#fbf9f9] border border-brand-charcoal px-3.5 py-2 uppercase font-bold flex items-center gap-1"
              >
                <User size={10} className="text-brand-gold stroke-[2.5]" />
                Room
              </button>
            ) : (
              <>
                <button
                  onClick={() => setShowSignInModal(true)}
                  className="font-sans text-[10px] tracking-widest text-brand-charcoal font-semibold uppercase py-2"
                >
                  Sign In
                </button>
                <button
                  onClick={() => setShowNotifyModal(true)}
                  className="font-sans text-[10px] tracking-widest bg-brand-charcoal text-white px-3 py-2 uppercase font-semibold"
                >
                  Notify
                </button>
              </>
            )}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-brand-charcoal"
            >
              <Menu size={20} />
            </button>
          </div>
        </div>

        {/* Mobile menu drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-brand-charcoal/5 bg-brand-alabaster px-6 py-4 space-y-4 flex flex-col items-start transition-all duration-300">
            <button
              onClick={() => scrollToSection("storefront")}
              className={`text-xs uppercase tracking-widest text-left w-full py-2 ${
                activeSection === "storefront" ? "font-bold text-brand-charcoal" : "text-brand-gray"
              }`}
            >
              Storefront
            </button>
            <button
              onClick={() => scrollToSection("about")}
              className={`text-xs uppercase tracking-widest text-left w-full py-2 ${
                activeSection === "about" ? "font-bold text-brand-charcoal" : "text-brand-gray"
              }`}
            >
              About
            </button>
            <button
              onClick={() => scrollToSection("journal")}
              className={`text-xs uppercase tracking-widest text-left w-full py-2 ${
                activeSection === "journal" ? "font-bold text-brand-charcoal" : "text-brand-gray"
              }`}
            >
              Journal
            </button>

            {isLoggedIn ? (
              <div className="w-full pt-4 border-t border-brand-charcoal/5 flex flex-col gap-3">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setShowMemberDrawer(true);
                  }}
                  className="w-full bg-brand-charcoal text-white text-xs tracking-widest py-2.5 uppercase font-semibold text-center flex items-center justify-center gap-1.5"
                >
                  <User size={12} className="text-brand-gold stroke-[2.5]" />
                  Open Collector Room
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    handleSignOut();
                  }}
                  className="text-left text-xs uppercase tracking-widest text-brand-gray hover:text-brand-charcoal py-2"
                >
                  Sign Out of Session
                </button>
              </div>
            ) : (
              <div className="w-full pt-4 border-t border-brand-charcoal/5 flex flex-col gap-3">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setShowSignInModal(true);
                  }}
                  className="w-full border border-brand-charcoal text-brand-charcoal text-xs tracking-widest py-2.5 uppercase font-semibold text-center"
                >
                  Sign In
                </button>
              </div>
            )}
          </div>
        )}
      </nav>

      {/* Main View Area (Luxurious Continuous Flow) */}
      <main className="flex-grow">
        {/* Section 1: Storefront */}
        <div id="storefront" className="scroll-mt-20">
          <StorefrontView
            onJoinPrivateList={handleJoinPrivateList}
            onSelectProduct={setSelectedProduct}
            isRegistered={isRegistered}
            registeredEmail={registeredEmail}
          />
        </div>

        {/* Section 2: About (The Manifesto) */}
        <div id="about" className="scroll-mt-20 bg-brand-alabaster">
          <AboutView />
        </div>

        {/* Section 3: Journal */}
        <div id="journal" className="scroll-mt-20 bg-[#faf8f8] border-t border-brand-charcoal/5">
          <JournalView />
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-brand-charcoal/5 bg-brand-alabaster py-16 md:py-20 text-left">
        <div className="max-w-7xl mx-auto px-6 md:px-20 grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 items-start">
          {/* Column 1: Logo & Info */}
          <div className="md:col-span-4 space-y-4">
            <button
              onClick={() => {
                scrollToSection("storefront");
              }}
              className="font-serif text-2xl text-brand-charcoal font-light focus:outline-none"
            >
              Obelii
            </button>
            <p className="font-sans text-[11px] text-brand-gray tracking-wide leading-relaxed max-w-xs">
              A curated destination for premium goods. Quiet luxury, high-fidelity retail, and editorial craftsmanship.
            </p>
          </div>

          {/* Column 2: Newsletter Signup */}
          <div className="md:col-span-5 space-y-4">
            <h4 className="font-sans text-[10px] tracking-[0.2em] font-semibold text-brand-charcoal uppercase">
              The Dispatch Newsletter
            </h4>
            <p className="font-sans text-xs text-brand-gray leading-relaxed max-w-sm">
              Receive quiet reflections, material studies, and notification of extremely limited physical allotments.
            </p>
            {!isNewsletterSubscribed ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (newsletterEmail.trim() && newsletterEmail.includes("@")) {
                    setIsNewsletterSubscribed(true);
                  }
                }}
                className="flex items-end gap-2 max-w-sm pt-2"
              >
                <div className="flex-grow">
                  <input
                    type="email"
                    required
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="email@address.com"
                    id="footer-newsletter-email"
                    className="w-full bg-transparent border-t-0 border-x-0 border-b border-brand-charcoal/20 pb-2 font-sans text-xs text-brand-charcoal placeholder:text-brand-dim focus:border-brand-charcoal focus:ring-0 transition-colors duration-300 rounded-none px-0"
                  />
                </div>
                <button
                  type="submit"
                  className="font-sans text-[10px] tracking-widest text-brand-charcoal hover:text-brand-gold font-semibold uppercase pb-2 border-b border-brand-charcoal/20 hover:border-brand-gold transition-all duration-300 flex items-center gap-1"
                >
                  Subscribe <ArrowRight size={12} />
                </button>
              </form>
            ) : (
              <div className="pt-2 text-left">
                <span className="inline-flex items-center gap-1.5 text-xs text-brand-gold font-medium">
                  <Check size={14} className="stroke-[2.5]" />
                  Subscribed to the Dispatch
                </span>
                <p className="text-[10px] text-brand-gray mt-1 leading-relaxed">
                  Thank you. Your address <span className="font-semibold text-brand-charcoal">{newsletterEmail}</span> is registered.
                </p>
              </div>
            )}
          </div>

          {/* Column 3: Links & Copyright */}
          <div className="md:col-span-3 flex flex-col md:items-end justify-between h-full space-y-8 md:space-y-0">
            {/* Navigation Links */}
            <div className="flex flex-col md:items-end gap-4">
              <button
                onClick={() => {
                  scrollToSection("journal");
                }}
                className="font-sans text-[11px] text-brand-gray hover:text-brand-charcoal transition-colors tracking-widest uppercase font-semibold text-left md:text-right"
              >
                Journal
              </button>
              <button
                onClick={() => setShowPrivacyModal(true)}
                className="font-sans text-[11px] text-brand-gray hover:text-brand-charcoal transition-colors tracking-widest uppercase font-semibold text-left md:text-right"
              >
                Privacy
              </button>
              <button
                onClick={() => {
                  const element = document.querySelector("#about form");
                  if (element) {
                    element.scrollIntoView({ behavior: "smooth", block: "center" });
                  } else {
                    scrollToSection("about");
                  }
                }}
                className="font-sans text-[11px] text-brand-gray hover:text-brand-charcoal transition-colors tracking-widest uppercase font-semibold text-left md:text-right"
              >
                Support
              </button>
            </div>

            {/* Copyright */}
            <div className="font-sans text-xs text-brand-gray/80 pt-8 md:pt-16">
              © 2024 Obelii. All Rights Reserved.
            </div>
          </div>
        </div>
      </footer>

      {/* Product Detail Drawer Overlay */}
      <ProductDetailDrawer
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        isRegistered={isRegistered}
        registeredEmail={registeredEmail}
      />

      {/* Universal Priority Registrar Modal (Notify Me Popup) */}
      {showNotifyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-brand-charcoal/40 backdrop-blur-sm"
            onClick={() => {
              setShowNotifyModal(false);
              setShowGoogleChooserWaitlist(false);
              setIsEnteringCustomGoogleWaitlist(false);
            }}
          />
          <div className="relative bg-[#fbf9f9] border border-brand-charcoal/10 w-full max-w-md p-8 shadow-2xl text-left z-10">
            <button
              onClick={() => {
                setShowNotifyModal(false);
                setShowGoogleChooserWaitlist(false);
                setIsEnteringCustomGoogleWaitlist(false);
              }}
              className="absolute top-4 right-4 p-2 hover:bg-brand-charcoal/5 text-brand-gray hover:text-brand-charcoal transition-all"
            >
              <X size={18} />
            </button>

            {!isRegistered ? (
              showGoogleChooserWaitlist ? (
                <div className="space-y-6">
                  <div className="text-center pb-2">
                    <svg className="w-8 h-8 mx-auto mb-3" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                      />
                    </svg>
                    <h3 className="font-sans text-lg font-semibold text-brand-charcoal">
                      Sign up with Google
                    </h3>
                    <p className="text-xs text-brand-gray mt-1">
                      to register your private list slot at <span className="font-serif italic font-medium">Obelii</span>
                    </p>
                  </div>

                  {googleLoadingWaitlist ? (
                    <div className="py-8 text-center space-y-3">
                      <div className="w-8 h-8 border-2 border-brand-gold border-t-transparent rounded-full animate-spin mx-auto"></div>
                      <p className="text-xs font-mono text-brand-gray tracking-widest uppercase">Securing Ticket No. 04,281...</p>
                    </div>
                  ) : isEnteringCustomGoogleWaitlist ? (
                    <form onSubmit={handleCustomGoogleSubmitWaitlist} className="space-y-4">
                      <div className="space-y-1">
                        <label className="text-[10px] tracking-widest text-brand-gray uppercase">
                          Google Email Address
                        </label>
                        <input
                          type="email"
                          required
                          value={customGoogleEmailWaitlist}
                          onChange={(e) => setCustomGoogleEmailWaitlist(e.target.value)}
                          placeholder="yourname@gmail.com"
                          className="w-full bg-transparent border-t-0 border-x-0 border-b border-brand-charcoal/20 pb-2 text-sm focus:border-brand-charcoal focus:ring-0 rounded-none placeholder:text-brand-dim"
                        />
                      </div>

                      {googleErrorWaitlist && (
                        <p className="text-[11px] text-red-600 font-sans tracking-wide">
                          {googleErrorWaitlist}
                        </p>
                      )}

                      <div className="flex gap-3 pt-2">
                        <button
                          type="button"
                          onClick={() => {
                            setIsEnteringCustomGoogleWaitlist(false);
                            setGoogleErrorWaitlist("");
                          }}
                          className="flex-1 border border-brand-charcoal/20 text-brand-charcoal hover:bg-brand-charcoal/5 text-xs py-3 tracking-widest uppercase font-semibold transition-colors"
                        >
                          Back
                        </button>
                        <button
                          type="submit"
                          className="flex-1 bg-brand-charcoal hover:bg-brand-gray text-white text-xs py-3 tracking-widest uppercase font-semibold transition-colors"
                        >
                          Continue
                        </button>
                      </div>
                    </form>
                  ) : (
                    <div className="space-y-3">
                      {/* Active user email pill */}
                      <button
                        type="button"
                        onClick={() => handleGoogleSelectWaitlist("ashiquenazzpp@gmail.com")}
                        className="w-full flex items-center justify-between p-3.5 bg-white border border-brand-charcoal/10 hover:border-brand-charcoal transition-all text-left group"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-brand-gold/15 flex items-center justify-center font-bold text-brand-gold font-sans text-sm uppercase">
                            A
                          </div>
                          <div>
                            <div className="text-xs font-semibold text-brand-charcoal">
                              Ashique
                            </div>
                            <div className="text-[11px] text-brand-gray font-mono">
                              ashiquenazzpp@gmail.com
                            </div>
                          </div>
                        </div>
                        <span className="text-[9px] tracking-wider text-brand-gold uppercase font-mono font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                          Active
                        </span>
                      </button>

                      {/* Custom Google account */}
                      <button
                        type="button"
                        onClick={() => setIsEnteringCustomGoogleWaitlist(true)}
                        className="w-full flex items-center gap-3 p-3.5 bg-white border border-brand-charcoal/5 hover:border-brand-charcoal/15 transition-all text-left text-xs font-medium text-brand-gray hover:text-brand-charcoal"
                      >
                        <div className="w-8 h-8 rounded-full bg-brand-charcoal/5 flex items-center justify-center font-bold font-sans text-sm text-brand-gray">
                          +
                        </div>
                        <span>Use another Google account</span>
                      </button>

                      <div className="pt-4 flex justify-center">
                        <button
                          type="button"
                          onClick={() => {
                            setShowGoogleChooserWaitlist(false);
                            setGoogleErrorWaitlist("");
                          }}
                          className="text-[10px] text-brand-gray hover:text-brand-charcoal tracking-widest uppercase border-b border-brand-charcoal/10 pb-0.5"
                        >
                          Cancel Google Sign Up
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-6">
                  <form onSubmit={handleModalSubmit} className="space-y-5">
                    <div>
                      <span className="text-[9px] tracking-[0.25em] text-brand-gold uppercase block font-semibold mb-1">
                        Priority Ticket Invitation
                      </span>
                      <h3 className="font-serif text-2xl text-brand-charcoal font-light">
                        Join the Private List
                      </h3>
                      <p className="text-xs text-brand-gray mt-2 leading-relaxed">
                        Obelii limits inaugural access to waitlist members. Secured priorities receive allocation tokens, seasonal catalog previews, and event invites.
                      </p>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] tracking-widest text-brand-gray uppercase">
                        Your Email Address
                      </label>
                      <input
                        type="email"
                        required
                        value={modalEmail}
                        onChange={(e) => setModalEmail(e.target.value)}
                        placeholder="email@address.com"
                        className="w-full bg-transparent border-t-0 border-x-0 border-b border-brand-charcoal/20 pb-2 text-sm focus:border-brand-charcoal focus:ring-0 rounded-none placeholder:text-brand-dim"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-brand-charcoal hover:bg-brand-gray text-[#fbf9f9] text-xs tracking-widest font-sans uppercase py-3.5 transition-all flex items-center justify-center gap-2 border border-brand-charcoal"
                    >
                      Notify Me <ArrowRight size={13} />
                    </button>
                  </form>

                  <div className="relative flex py-1 items-center">
                    <div className="flex-grow border-t border-brand-charcoal/10"></div>
                    <span className="flex-shrink mx-4 text-[9px] text-brand-gray/70 tracking-widest uppercase font-mono font-medium">Or</span>
                    <div className="flex-grow border-t border-brand-charcoal/10"></div>
                  </div>

                  {/* Google Sign Up option */}
                  <button
                    type="button"
                    onClick={() => {
                      setShowGoogleChooserWaitlist(true);
                      setGoogleErrorWaitlist("");
                    }}
                    className="w-full bg-white hover:bg-[#fbf9f9] text-brand-charcoal text-xs tracking-widest font-sans uppercase py-3.5 transition-all flex items-center justify-center gap-2.5 border border-brand-charcoal/15 hover:border-brand-charcoal"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                      />
                    </svg>
                    Continue with Google
                  </button>
                </div>
              )
            ) : (
              <div className="text-center py-6 space-y-4">
                <div className="w-12 h-12 bg-brand-gold/15 rounded-full flex items-center justify-center mx-auto text-brand-gold">
                  <Check size={22} className="stroke-[2.5]" />
                </div>
                <h3 className="font-serif text-2xl text-brand-charcoal font-light">Securely Registered</h3>
                <p className="font-sans text-xs text-brand-gray leading-relaxed">
                  Your address <strong className="text-brand-charcoal">{registeredEmail}</strong> holds private list ticket <strong className="text-brand-charcoal">No. 04,281</strong>.
                </p>
                <div className="pt-4 flex flex-col gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setShowNotifyModal(false);
                      scrollToWaitlist();
                    }}
                    className="w-full bg-brand-charcoal text-white text-xs tracking-widest py-3 hover:bg-brand-gray transition-colors uppercase font-semibold"
                  >
                    Personalize My Invitation
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsRegistered(false)}
                    className="text-[10px] text-brand-gray tracking-wider hover:text-brand-charcoal border-b border-transparent hover:border-brand-gray max-w-max mx-auto pb-0.5 uppercase"
                  >
                    Change Registered Email
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Legal Privacy Modal */}
      {showPrivacyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-brand-charcoal/40 backdrop-blur-sm"
            onClick={() => setShowPrivacyModal(false)}
          />
          <div className="relative bg-[#fbf9f9] border border-brand-charcoal/10 w-full max-w-lg p-8 shadow-2xl text-left z-10 max-h-[85vh] overflow-y-auto">
            <button
              onClick={() => setShowPrivacyModal(false)}
              className="absolute top-4 right-4 p-2 hover:bg-brand-charcoal/5 text-brand-gray hover:text-brand-charcoal transition-all"
            >
              <X size={18} />
            </button>

            <span className="text-[9px] tracking-[0.25em] text-brand-gold uppercase block font-semibold mb-1">
              Legal Framework
            </span>
            <h3 className="font-serif text-2xl text-brand-charcoal font-light mb-6">
              Privacy & Safeguards
            </h3>

            <div className="space-y-4 font-sans text-xs text-brand-gray leading-relaxed">
              <p>
                At Obelii, your private footprint is handled with the exact same discretion we apply to curation. We do not sell, rent, index, or distribute waitlist coordinates or correspondence details to third-party databases or marketing aggregators.
              </p>
              <h4 className="font-serif text-sm text-brand-charcoal font-semibold uppercase mt-4">1. Data Handled</h4>
              <p>
                We store your contact email address, custom preference themes, and any supplementary text submission context securely in your local environment. This is utilized strictly for issuing personal allocation keys, private catalog updates, and shipping coordinates.
              </p>
              <h4 className="font-serif text-sm text-brand-charcoal font-semibold uppercase mt-4">2. Deletion Requests</h4>
              <p>
                To purge your waitlist profile, correspondence tickets, or email coordinates from our records at any time, simply submit a direct deletion correspondence to <strong className="text-brand-charcoal">privacy@obelii.com</strong>. Purges are processed synchronically within 24 hours.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setShowPrivacyModal(false)}
              className="mt-8 w-full bg-brand-charcoal text-white text-xs tracking-widest py-3 transition-colors uppercase font-semibold"
            >
              Confirm & Return
            </button>
          </div>
        </div>
      )}

      {/* Sign In Modal */}
      <SignInModal
        isOpen={showSignInModal}
        onClose={() => setShowSignInModal(false)}
        onSignIn={handleSignIn}
      />

      {/* Member Space Drawer */}
      <MemberDrawer
        isOpen={showMemberDrawer}
        onClose={() => setShowMemberDrawer(false)}
        onSignOut={handleSignOut}
        registeredEmail={registeredEmail}
      />
    </div>
  );
}
