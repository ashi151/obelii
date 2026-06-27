import React, { useState, useEffect, useRef } from "react";
import { 
  X, 
  Send, 
  Check, 
  Copy, 
  Sparkles, 
  LogOut, 
  MessageSquare, 
  User, 
  ShieldCheck, 
  KeyRound, 
  Activity,
  Home,
  Loader2
} from "lucide-react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase";

interface MemberDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSignOut: () => void;
  registeredEmail: string;
  activeTab: "home" | "account";
  setActiveTab: (tab: "home" | "account") => void;
}

interface Message {
  sender: "member" | "curator";
  text: string;
  time: string;
}

export default function MemberDrawer({
  isOpen,
  onClose,
  onSignOut,
  registeredEmail,
  activeTab,
  setActiveTab,
}: MemberDrawerProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "curator",
      text: "Welcome back to your member space. I am Aris, your resident studio curator. Your membership priority pass is fully active. We are currently preparing a highly limited selection of Kuro-Raku smoked teacups and sand-casted brass taper stands. How can I assist you with your space composition today?",
      time: "10:24 AM",
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [copied, setCopied] = useState(false);
  const [allotmentRequested, setAllotmentRequested] = useState<string | null>(null);
  const messageEndRef = useRef<HTMLDivElement>(null);

  // Password reset state
  const [resetLoading, setResetLoading] = useState(false);
  const [resetSuccess, setResetSuccess] = useState("");
  const [resetError, setResetError] = useState("");

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping, activeTab]);

  if (!isOpen) return null;

  const handleCopyTicket = () => {
    navigator.clipboard.writeText("OB-2026-04281");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePasswordReset = async () => {
    setResetLoading(true);
    setResetError("");
    setResetSuccess("");
    try {
      await sendPasswordResetEmail(auth, registeredEmail);
      setResetSuccess("A password reset link has been dispatched to your email address.");
    } catch (err: any) {
      console.warn("Password reset error in account tab:", err);
      setResetError(err.message || "Failed to dispatch password reset link.");
    } finally {
      setResetLoading(false);
    }
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userMsg = inputText;
    const timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    setMessages((prev) => [
      ...prev,
      {
        sender: "member",
        text: userMsg,
        time: timeNow,
      },
    ]);
    setInputText("");
    setIsTyping(true);

    // Curator responsive simulator
    setTimeout(() => {
      setIsTyping(false);
      let replyText = "Understood. I have cataloged your preferences in our Kyoto log. Our workshop will prioritize this request, and your allocation slot is securely locked.";
      
      const lowerMsg = userMsg.toLowerCase();
      if (lowerMsg.includes("teacup") || lowerMsg.includes("kuro-raku") || lowerMsg.includes("clay")) {
        replyText = "The Kuro-Raku teacups are fired in a traditional single-cell kiln in Kyoto. I have noted your interest in this smoked clay texture and reserved a priority allocation for your address.";
      } else if (lowerMsg.includes("brass") || lowerMsg.includes("taper") || lowerMsg.includes("sconce")) {
        replyText = "The sand-casted brass tapers carry an exquisite hand-burnished weight. I have marked this as high-interest on your profile to notify our copper foundry immediately.";
      } else if (lowerMsg.includes("hello") || lowerMsg.includes("hi") || lowerMsg.includes("hey")) {
        replyText = "Greetings. It is a pleasure to guide your architectural inquiries. Please feel free to request custom dimensions or materials for any piece in our current catalog.";
      } else if (lowerMsg.includes("price") || lowerMsg.includes("cost") || lowerMsg.includes("buy")) {
        replyText = "Each Obelii allotment is custom-made. I will compile a bespoke pricing proposal and private courier arrangements for your specified space layout.";
      }

      setMessages((prev) => [
        ...prev,
        {
          sender: "curator",
          text: replyText,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    }, 1500);
  };

  const handleRequestAllotment = (itemName: string) => {
    setAllotmentRequested(itemName);
    setTimeout(() => {
      setAllotmentRequested(null);
    }, 4000);

    const timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setMessages((prev) => [
      ...prev,
      {
        sender: "member",
        text: `Requesting direct allotment and pricing proposal for: ${itemName}.`,
        time: timeNow,
      },
      {
        sender: "curator",
        text: `I have received your request for the ${itemName}. I am preparing the material provenance report and shipping logistics to coordinate this allotment under priority ticket No. 04,281.`,
        time: timeNow,
      },
    ]);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end overflow-hidden font-sans">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-brand-charcoal/40 backdrop-blur-sm transition-opacity duration-500 animate-fade-in"
        onClick={onClose}
      />

      {/* Drawer Body */}
      <div className="relative w-full max-w-lg bg-[#fbf9f9] h-full shadow-2xl flex flex-col z-10 border-l border-brand-charcoal/10">
        {/* Subtle Loading Spinner Overlay */}
        {resetLoading && (
          <div className="absolute inset-0 bg-[#fbf9f9]/80 backdrop-blur-xs z-30 flex flex-col items-center justify-center space-y-3 animate-fade-in">
            <Loader2 className="w-8 h-8 text-brand-gold animate-spin stroke-[2]" />
            <p className="text-[10px] tracking-widest font-mono text-brand-gray uppercase">
              Processing request...
            </p>
          </div>
        )}
        
        {/* Sticky Header */}
        <div className="sticky top-0 bg-[#fbf9f9]/90 backdrop-blur-md z-20 flex justify-between items-center px-6 py-5 border-b border-brand-charcoal/5">
          <div className="flex items-center gap-2.5">
            <span className="font-serif text-xl text-brand-charcoal">Obelii Space</span>
            <span className="font-mono text-[9px] tracking-widest text-brand-gold bg-brand-gold/10 px-2.5 py-0.5 border border-brand-gold/20 uppercase font-semibold">
              Member Area
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-2 -mr-2 hover:bg-brand-charcoal/5 text-brand-charcoal/60 hover:text-brand-charcoal transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Elegant Tab Switcher */}
        <div className="flex border-b border-brand-charcoal/10 bg-[#fbf9f9] sticky top-[69px] z-20">
          <button
            type="button"
            onClick={() => setActiveTab("home")}
            className={`flex-1 py-4 text-[10px] tracking-widest uppercase font-semibold border-b-2 transition-all text-center flex items-center justify-center gap-2 ${
              activeTab === "home"
                ? "border-brand-charcoal text-brand-charcoal bg-brand-charcoal/5"
                : "border-transparent text-brand-gray/60 hover:text-brand-charcoal hover:bg-brand-charcoal/5"
            }`}
          >
            <Home size={12} className={activeTab === "home" ? "text-brand-gold" : "text-brand-gray/50"} />
            Home
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("account")}
            className={`flex-1 py-4 text-[10px] tracking-widest uppercase font-semibold border-b-2 transition-all text-center flex items-center justify-center gap-2 ${
              activeTab === "account"
                ? "border-brand-charcoal text-brand-charcoal bg-brand-charcoal/5"
                : "border-transparent text-brand-gray/60 hover:text-brand-charcoal hover:bg-brand-charcoal/5"
            }`}
          >
            <User size={12} className={activeTab === "account" ? "text-brand-gold" : "text-brand-gray/50"} />
            My Account
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-grow overflow-y-auto p-6 space-y-8 pb-12">
          
          {activeTab === "home" ? (
            /* ==================== HOME TAB ==================== */
            <div className="space-y-8">
              {/* Online Store Coming Soon Notice */}
              <div className="bg-[#fffbeb] border border-amber-200/60 p-5 space-y-2 rounded-none transition-all duration-300">
                <div className="flex items-center gap-2 text-brand-gold">
                  <Sparkles size={14} className="stroke-[2]" />
                  <span className="font-sans text-[10px] tracking-[0.2em] uppercase font-bold text-brand-charcoal">
                    Online Store Notice
                  </span>
                </div>
                <h4 className="font-serif text-sm text-brand-charcoal font-semibold">
                  Our Online E-commerce Store is Coming Soon
                </h4>
                <p className="text-[11px] text-brand-gray leading-relaxed">
                  The full Obelii digital storefront is currently undergoing curation and is **not ready yet**. 
                  As a member, your spot on our priority launch list is fully secured. We will notify you directly 
                  as soon as the first physical castings are ready for allocation.
                </p>
              </div>

            </div>
          ) : (
            /* ==================== MY ACCOUNT TAB ==================== */
            <div className="space-y-8 animate-fade-in">
              <div className="bg-white border border-brand-charcoal/5 p-6 space-y-6">
                <div>
                  <h4 className="font-serif text-lg text-brand-charcoal font-light">Account Profile</h4>
                  <p className="text-xs text-brand-gray mt-1 leading-relaxed">
                    Verify and manage your credentials, communication preferences, and active ledger session details.
                  </p>
                </div>

                <div className="space-y-4 pt-4 border-t border-brand-charcoal/10">
                  <div className="flex justify-between items-center py-2.5 border-b border-brand-charcoal/5">
                    <span className="text-[10px] uppercase tracking-widest text-brand-gray font-medium">
                      Account Coordinate
                    </span>
                    <span className="text-xs font-mono text-brand-charcoal font-medium">
                      {registeredEmail}
                    </span>
                  </div>

                  <div className="flex justify-between items-center py-2.5 border-b border-brand-charcoal/5">
                    <span className="text-[10px] uppercase tracking-widest text-brand-gray font-medium">
                      Authorization Provider
                    </span>
                    <span className="text-xs font-mono text-brand-charcoal flex items-center gap-1">
                      <ShieldCheck size={13} className="text-brand-gold" />
                      Firebase Auth Engine
                    </span>
                  </div>

                  <div className="flex justify-between items-center py-2.5 border-b border-brand-charcoal/5">
                    <span className="text-[10px] uppercase tracking-widest text-brand-gray font-medium">
                      Session Status
                    </span>
                    <span className="text-[10px] bg-green-50 text-green-700 font-bold px-2 py-0.5 uppercase tracking-wider border border-green-200">
                      Active Session
                    </span>
                  </div>
                </div>
              </div>

              {/* Password Recovery / Security Options */}
              <div className="bg-white border border-brand-charcoal/5 p-6 space-y-4">
                <div>
                  <h4 className="font-serif text-md text-brand-charcoal font-medium">Account Security</h4>
                  <p className="text-[11px] text-brand-gray mt-1 leading-relaxed">
                    Initiate a password reset request to safeguard or update your unique security access credentials.
                  </p>
                </div>

                {resetSuccess && (
                  <div className="bg-green-50 border border-green-200 p-3.5 text-green-800 text-[11px]">
                    {resetSuccess}
                  </div>
                )}

                {resetError && (
                  <div className="bg-red-50 border border-red-200 p-3.5 text-red-800 text-[11px]">
                    {resetError}
                  </div>
                )}

                <button
                  type="button"
                  onClick={handlePasswordReset}
                  disabled={resetLoading}
                  className="w-full border border-brand-charcoal hover:bg-brand-charcoal hover:text-white py-3 px-4 text-xs font-semibold tracking-widest uppercase transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <KeyRound size={13} className="text-brand-gold" />
                  {resetLoading ? "Dispatching reset link..." : "Request Password Reset"}
                </button>
              </div>

              {/* Clear Data & Session Controls */}
              <div className="bg-red-50/20 border border-red-200/50 p-6 space-y-4">
                <div>
                  <h4 className="font-serif text-md text-brand-charcoal font-semibold text-red-800 uppercase tracking-wider text-[11px]">
                    Danger Zone
                  </h4>
                  <p className="text-[11px] text-brand-gray mt-1 leading-relaxed">
                    Ending your current session will immediately clear the local ledger authentication parameters on this workstation.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={onSignOut}
                  className="w-full bg-red-600 hover:bg-red-700 text-white py-3 px-4 text-xs font-semibold tracking-widest uppercase transition-colors flex items-center justify-center gap-2"
                >
                  <LogOut size={13} />
                  Terminate Session (Sign Out)
                </button>
              </div>
            </div>
          )}

          {/* Persistent Footer controls */}
          <div className="pt-6 border-t border-brand-charcoal/10 flex items-center justify-between">
            <button
              onClick={onSignOut}
              className="font-sans text-[10px] tracking-widest text-brand-gray hover:text-brand-charcoal transition-colors uppercase font-bold flex items-center gap-1.5"
            >
              <LogOut size={13} />
              Sign Out
            </button>
            <span className="text-[9px] text-brand-dim font-mono">
              IP Connection Secured
            </span>
          </div>

        </div>
      </div>
    </div>
  );
}
