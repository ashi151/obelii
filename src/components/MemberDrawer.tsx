import React, { useState, useEffect, useRef } from "react";
import { X, Send, Check, Copy, Sparkles, LogOut, MessageSquare, ShieldAlert } from "lucide-react";

interface MemberDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSignOut: () => void;
  registeredEmail: string;
}

interface Message {
  sender: "collector" | "curator";
  text: string;
  time: string;
}

export default function MemberDrawer({
  isOpen,
  onClose,
  onSignOut,
  registeredEmail,
}: MemberDrawerProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "curator",
      text: "Welcome back, Collector. I am Aris, your resident studio curator. Your inaugural priority pass is fully active. We are currently preparing a highly limited selection of Kuro-Raku smoked teacups and sand-casted brass taper stands. How can I assist you with your space composition today?",
      time: "10:24 AM",
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [copied, setCopied] = useState(false);
  const [allotmentRequested, setAllotmentRequested] = useState<string | null>(null);
  const messageEndRef = useRef<HTMLDivElement>(null);

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
  }, [messages, isTyping]);

  if (!isOpen) return null;

  const handleCopyTicket = () => {
    navigator.clipboard.writeText("OB-2026-04281");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userMsg = inputText;
    const timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    setMessages((prev) => [
      ...prev,
      {
        sender: "collector",
        text: userMsg,
        time: timeNow,
      },
    ]);
    setInputText("");
    setIsTyping(true);

    // Curator responsive simulator
    setTimeout(() => {
      setIsTyping(false);
      let replyText = "Understood, Collector. I have cataloged your preferences in our Kyoto log. Our workshop will prioritize this request, and your allocation slot is securely locked.";
      
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
        sender: "collector",
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
        
        {/* Sticky Header */}
        <div className="sticky top-0 bg-[#fbf9f9]/90 backdrop-blur-md z-20 flex justify-between items-center px-6 py-5 border-b border-brand-charcoal/5">
          <div className="flex items-center gap-2.5">
            <span className="font-serif text-xl text-brand-charcoal">Obelii Space</span>
            <span className="font-mono text-[9px] tracking-widest text-brand-gold bg-brand-gold/10 px-2.5 py-0.5 border border-brand-gold/20 uppercase font-semibold">
              Collector Room
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-2 -mr-2 hover:bg-brand-charcoal/5 text-brand-charcoal/60 hover:text-brand-charcoal transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-grow overflow-y-auto p-6 space-y-8 pb-12">
          
          {/* Section 1: Member Card Ticket */}
          <div className="bg-brand-charcoal text-brand-alabaster p-6 relative overflow-hidden border border-brand-charcoal/5 shadow-xl">
            {/* Subtle background decoration */}
            <div className="absolute -right-16 -top-16 w-44 h-44 rounded-full border border-brand-gold/10 pointer-events-none" />
            <div className="absolute -right-8 -top-8 w-32 h-32 rounded-full border border-brand-gold/5 pointer-events-none" />

            <div className="flex justify-between items-start mb-6">
              <div>
                <span className="text-[9px] tracking-[0.3em] text-brand-gold font-mono uppercase block font-bold">
                  Obelii Ledger Authorization
                </span>
                <h3 className="font-serif text-xl tracking-tight font-light mt-1">
                  Inaugural Priority Pass
                </h3>
              </div>
              <span className="font-serif text-2xl text-brand-gold font-light italic">Ob.</span>
            </div>

            <div className="space-y-4 pt-4 border-t border-brand-alabaster/10">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-[8px] tracking-widest text-brand-alabaster/50 uppercase block">
                    Registered Coordinate
                  </span>
                  <span className="text-xs font-mono tracking-wide truncate block max-w-[180px]">
                    {registeredEmail}
                  </span>
                </div>
                <div>
                  <span className="text-[8px] tracking-widest text-brand-alabaster/50 uppercase block">
                    Priority Ticket
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-mono font-semibold text-brand-gold">
                      OB-2026-04281
                    </span>
                    <button
                      onClick={handleCopyTicket}
                      className="text-brand-alabaster/50 hover:text-white transition-colors"
                      title="Copy Ticket ID"
                    >
                      {copied ? <Check size={11} className="text-brand-gold" /> : <Copy size={11} />}
                    </button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-[8px] tracking-widest text-brand-alabaster/50 uppercase block">
                    Sourcing Priority
                  </span>
                  <span className="text-xs font-semibold text-brand-gold uppercase tracking-wider block">
                    High Status
                  </span>
                </div>
                <div>
                  <span className="text-[8px] tracking-widest text-brand-alabaster/50 uppercase block">
                    Allotment Access
                  </span>
                  <span className="text-xs font-semibold text-white uppercase tracking-wider block">
                    Active Unlimited
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Interactive Curator Correspondence Chat */}
          <div className="space-y-3">
            <div className="flex justify-between items-center border-b border-brand-charcoal/10 pb-2">
              <h4 className="font-sans text-[10px] tracking-[0.2em] font-bold text-brand-charcoal uppercase flex items-center gap-1.5">
                <MessageSquare size={12} className="text-brand-gold" />
                Curator Correspondence
              </h4>
              <span className="text-[9px] font-mono text-brand-gray uppercase">
                Aris Thorne, Resident
              </span>
            </div>

            {/* Chat Box */}
            <div className="bg-brand-alabaster border border-brand-charcoal/5 p-4 space-y-4 max-h-[300px] overflow-y-auto rounded-none flex flex-col">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`max-w-[85%] rounded-none p-3.5 space-y-1.5 ${
                    msg.sender === "collector"
                      ? "bg-brand-charcoal text-brand-alabaster self-end text-right"
                      : "bg-white border border-brand-charcoal/5 text-brand-charcoal self-start text-left"
                  }`}
                >
                  <p className="text-xs leading-relaxed font-sans">{msg.text}</p>
                  <span className="text-[9px] font-mono opacity-60 block">
                    {msg.sender === "collector" ? "Collector" : "Curator"} • {msg.time}
                  </span>
                </div>
              ))}
              
              {isTyping && (
                <div className="bg-white border border-brand-charcoal/5 text-brand-charcoal self-start text-left max-w-[80%] p-3.5 space-y-1">
                  <div className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-brand-charcoal/40 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-1.5 h-1.5 bg-brand-charcoal/40 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-1.5 h-1.5 bg-brand-charcoal/40 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                  <span className="text-[9px] font-mono text-brand-gray">Aris is typing...</span>
                </div>
              )}
              <div ref={messageEndRef} />
            </div>

            {/* Send message form */}
            <form onSubmit={handleSendMessage} className="flex gap-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Ask Curator about materials, sizes or custom designs..."
                className="flex-grow bg-white border border-brand-charcoal/15 text-xs p-3 focus:border-brand-charcoal focus:ring-0 rounded-none placeholder:text-brand-dim"
              />
              <button
                type="submit"
                disabled={isTyping || !inputText.trim()}
                className="bg-brand-charcoal hover:bg-brand-gray text-white px-4 flex items-center justify-center transition-colors disabled:opacity-50"
              >
                <Send size={14} />
              </button>
            </form>
          </div>

          {/* Section 3: Collector Reserved Allotments */}
          <div className="space-y-4">
            <div className="border-b border-brand-charcoal/10 pb-2">
              <h4 className="font-sans text-[10px] tracking-[0.2em] font-bold text-brand-charcoal uppercase flex items-center gap-1.5">
                <Sparkles size={12} className="text-brand-gold" />
                Collector Reserved Allotments
              </h4>
            </div>

            <p className="font-sans text-[11px] text-brand-gray leading-relaxed">
              These bespoke pieces are held back exclusively for inaugural account priority holders. You may register immediate interest.
            </p>

            <div className="space-y-3">
              {/* Item 1 */}
              <div className="bg-white border border-brand-charcoal/5 p-4 flex gap-4 items-center justify-between">
                <div className="space-y-1">
                  <span className="text-[9px] font-mono text-brand-gold uppercase tracking-wider block">
                    Kyoto Workshop • 12 Castings
                  </span>
                  <h5 className="font-serif text-sm text-brand-charcoal font-medium">
                    Kuro-Raku Smoked Clay Teacup
                  </h5>
                  <p className="text-[11px] text-brand-gray">
                    Single-fire volcanic glaze with deep thermal resistance.
                  </p>
                </div>
                <button
                  onClick={() => handleRequestAllotment("Kuro-Raku Smoked Clay Teacup")}
                  className="bg-brand-charcoal hover:bg-brand-gold text-white hover:text-brand-charcoal font-mono text-[9px] tracking-wider uppercase px-3 py-2 transition-all font-semibold whitespace-nowrap"
                >
                  Request
                </button>
              </div>

              {/* Item 2 */}
              <div className="bg-white border border-brand-charcoal/5 p-4 flex gap-4 items-center justify-between">
                <div className="space-y-1">
                  <span className="text-[9px] font-mono text-brand-gold uppercase tracking-wider block">
                    ओर्बिक Foundries • 6 Castings
                  </span>
                  <h5 className="font-serif text-sm text-brand-charcoal font-medium">
                    Hand-Hammered Brass Sconce
                  </h5>
                  <p className="text-[11px] text-brand-gray">
                    Raw brass with micro-finished edges for ambient reflection.
                  </p>
                </div>
                <button
                  onClick={() => handleRequestAllotment("Hand-Hammered Brass Sconce")}
                  className="bg-brand-charcoal hover:bg-brand-gold text-white hover:text-brand-charcoal font-mono text-[9px] tracking-wider uppercase px-3 py-2 transition-all font-semibold whitespace-nowrap"
                >
                  Request
                </button>
              </div>
            </div>

            {allotmentRequested && (
              <div className="bg-brand-gold/10 border border-brand-gold/25 p-3.5 flex items-start gap-2 text-brand-gold">
                <Check size={16} className="mt-0.5 stroke-[2.5] flex-shrink-0" />
                <div>
                  <h6 className="font-serif text-xs font-semibold text-brand-charcoal">Allotment Ticket Generated</h6>
                  <p className="text-[10px] text-brand-gray mt-0.5">
                    Your request for <strong className="text-brand-charcoal">{allotmentRequested}</strong> was logged by Curator Aris. Check correspondence above.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Section 4: Exit & Purge Controls */}
          <div className="pt-6 border-t border-brand-charcoal/10 flex items-center justify-between">
            <button
              onClick={onSignOut}
              className="font-sans text-[10px] tracking-widest text-brand-gray hover:text-brand-charcoal transition-colors uppercase font-bold flex items-center gap-1.5"
            >
              <LogOut size={13} />
              Sign Out of Session
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
