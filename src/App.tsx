import React, { useState, useEffect } from "react";
import StorefrontView from "./components/StorefrontView";
import AboutView from "./components/AboutView";
import JournalView from "./components/JournalView";
import ProductDetailDrawer from "./components/ProductDetailDrawer";
import { CuratedProduct } from "./types";
import { Shield, Mail, Check, X, ArrowRight, Menu } from "lucide-react";

export default function App() {
  const [activeTab, setActiveTab] = useState<"storefront" | "about" | "journal">("storefront");
  const [selectedProduct, setSelectedProduct] = useState<CuratedProduct | null>(null);
  const [registeredEmail, setRegisteredEmail] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);
  const [showNotifyModal, setShowNotifyModal] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [modalEmail, setModalEmail] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Load waitlist status from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("obelii_waitlist_email");
    if (saved) {
      setRegisteredEmail(saved);
      setIsRegistered(true);
    }
  }, []);

  const handleJoinPrivateList = (email: string) => {
    localStorage.setItem("obelii_waitlist_email", email);
    setRegisteredEmail(email);
    setIsRegistered(true);
  };

  const handleModalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!modalEmail.trim() || !modalEmail.includes("@")) return;
    handleJoinPrivateList(modalEmail);
    setModalEmail("");
    // Keep it open to show success state, then close after some delay or let user close
  };

  const scrollToWaitlist = () => {
    if (activeTab !== "storefront") {
      setActiveTab("storefront");
      setTimeout(() => {
        const input = document.getElementById("hero-email-input");
        if (input) {
          input.scrollIntoView({ behavior: "smooth", block: "center" });
          input.focus();
        }
      }, 100);
    } else {
      const input = document.getElementById("hero-email-input");
      if (input) {
        input.scrollIntoView({ behavior: "smooth", block: "center" });
        input.focus();
      }
    }
  };

  return (
    <div className="min-h-screen bg-brand-alabaster text-brand-charcoal selection:bg-brand-charcoal selection:text-brand-alabaster relative flex flex-col font-sans">
      {/* Top Navigation Bar */}
      <nav className="w-full sticky top-0 bg-[#fbf9f9]/85 backdrop-blur-md border-b border-brand-charcoal/5 z-40">
        <div className="flex justify-between items-center px-6 md:px-20 py-5 max-w-7xl mx-auto">
          {/* Logo */}
          <button
            onClick={() => {
              setActiveTab("storefront");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="font-serif text-2xl tracking-tighter text-brand-charcoal hover:opacity-85 transition-opacity"
          >
            Obelii
          </button>

          {/* Desktop Navigation links */}
          <div className="hidden md:flex items-center space-x-12">
            <button
              onClick={() => {
                setActiveTab("storefront");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className={`font-sans text-xs uppercase tracking-widest pb-1 transition-all border-b ${
                activeTab === "storefront"
                  ? "text-brand-charcoal border-brand-charcoal font-semibold"
                  : "text-brand-gray border-transparent hover:text-brand-charcoal"
              }`}
            >
              Storefront
            </button>
            <button
              onClick={() => {
                setActiveTab("about");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className={`font-sans text-xs uppercase tracking-widest pb-1 transition-all border-b ${
                activeTab === "about"
                  ? "text-brand-charcoal border-brand-charcoal font-semibold"
                  : "text-brand-gray border-transparent hover:text-brand-charcoal"
              }`}
            >
              About
            </button>
            <button
              onClick={() => {
                setActiveTab("journal");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className={`font-sans text-xs uppercase tracking-widest pb-1 transition-all border-b ${
                activeTab === "journal"
                  ? "text-brand-charcoal border-brand-charcoal font-semibold"
                  : "text-brand-gray border-transparent hover:text-brand-charcoal"
              }`}
            >
              Journal
            </button>
          </div>

          {/* Action button */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={() => setShowNotifyModal(true)}
              className="font-sans text-xs tracking-widest bg-brand-charcoal text-[#fbf9f9] border border-brand-charcoal px-8 py-3.5 hover:bg-transparent hover:text-brand-charcoal transition-all duration-300 uppercase font-semibold hover:shadow-lg hover:shadow-brand-charcoal/5"
            >
              Notify Me
            </button>
          </div>

          {/* Mobile menu triggers */}
          <div className="flex md:hidden items-center gap-4">
            <button
              onClick={() => setShowNotifyModal(true)}
              className="font-sans text-[10px] tracking-widest bg-brand-charcoal text-white px-4 py-2 uppercase font-semibold"
            >
              Notify
            </button>
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
              onClick={() => {
                setActiveTab("storefront");
                setMobileMenuOpen(false);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className={`text-xs uppercase tracking-widest text-left w-full py-2 ${
                activeTab === "storefront" ? "font-bold text-brand-charcoal" : "text-brand-gray"
              }`}
            >
              Storefront
            </button>
            <button
              onClick={() => {
                setActiveTab("about");
                setMobileMenuOpen(false);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className={`text-xs uppercase tracking-widest text-left w-full py-2 ${
                activeTab === "about" ? "font-bold text-brand-charcoal" : "text-brand-gray"
              }`}
            >
              About
            </button>
            <button
              onClick={() => {
                setActiveTab("journal");
                setMobileMenuOpen(false);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className={`text-xs uppercase tracking-widest text-left w-full py-2 ${
                activeTab === "journal" ? "font-bold text-brand-charcoal" : "text-brand-gray"
              }`}
            >
              Journal
            </button>
          </div>
        )}
      </nav>

      {/* Main View Area */}
      <main className="flex-grow">
        {activeTab === "storefront" && (
          <StorefrontView
            onJoinPrivateList={handleJoinPrivateList}
            onSelectProduct={setSelectedProduct}
            isRegistered={isRegistered}
            registeredEmail={registeredEmail}
          />
        )}

        {activeTab === "about" && <AboutView />}

        {activeTab === "journal" && <JournalView />}
      </main>

      {/* Footer (Matches image exactly with design and legal text) */}
      <footer className="border-t border-brand-charcoal/5 bg-brand-alabaster py-12 md:py-16 text-left">
        <div className="max-w-7xl mx-auto px-6 md:px-20 flex flex-col md:flex-row justify-between items-center gap-8">
          {/* Logo */}
          <button
            onClick={() => {
              setActiveTab("storefront");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="font-serif text-2xl text-brand-charcoal font-light"
          >
            Obelii
          </button>

          {/* Navigation Links */}
          <div className="flex flex-wrap justify-center gap-8 md:gap-12">
            <button
              onClick={() => {
                setActiveTab("journal");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="font-sans text-[11px] text-brand-gray hover:text-brand-charcoal transition-colors tracking-widest uppercase font-medium"
            >
              Journal
            </button>
            <button
              onClick={() => setShowPrivacyModal(true)}
              className="font-sans text-[11px] text-brand-gray hover:text-brand-charcoal transition-colors tracking-widest uppercase font-medium"
            >
              Privacy
            </button>
            <button
              onClick={() => {
                setActiveTab("about");
                // Wait for tab switch, then scroll to form
                setTimeout(() => {
                  const form = document.querySelector("form");
                  if (form) form.scrollIntoView({ behavior: "smooth", block: "center" });
                }, 100);
              }}
              className="font-sans text-[11px] text-brand-gray hover:text-brand-charcoal transition-colors tracking-widest uppercase font-medium"
            >
              Support
            </button>
          </div>

          {/* Copyright */}
          <div className="font-sans text-xs text-brand-gray/80">
            © 2024 Obelii. All Rights Reserved.
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
            onClick={() => setShowNotifyModal(false)}
          />
          <div className="relative bg-[#fbf9f9] border border-brand-charcoal/10 w-full max-w-md p-8 shadow-2xl text-left z-10">
            <button
              onClick={() => setShowNotifyModal(false)}
              className="absolute top-4 right-4 p-2 hover:bg-brand-charcoal/5 text-brand-gray hover:text-brand-charcoal transition-all"
            >
              <X size={18} />
            </button>

            {!isRegistered ? (
              <form onSubmit={handleModalSubmit} className="space-y-6">
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
    </div>
  );
}
