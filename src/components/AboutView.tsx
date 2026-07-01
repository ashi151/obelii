import React, { useState } from "react";
import { Check, Send } from "lucide-react";

export default function AboutView() {
  const [inquiryName, setInquiryName] = useState("");
  const [inquiryEmail, setInquiryEmail] = useState("");
  const [inquiryText, setInquiryText] = useState("");
  const [supportSubmitted, setSupportSubmitted] = useState(false);

  const handleSupportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryEmail.trim() || !inquiryName.trim()) return;
    setSupportSubmitted(true);
  };

  const pillars = [
    {
      title: "Material Honesty",
      desc: "Our objects honor their organic beginnings. We preserve uncoarse mineral textures, untreated timber, sand-casted steels, and open-weave Belgian linens.",
    },
    {
      title: "Silent Presence",
      desc: "An object should satisfy its utility and respect local volume. Restraint in visual language guarantees a piece acts as a calm, natural anchor.",
    },
    {
      title: "Limited Allotments",
      desc: "We construct only what is requested, in collaboration with historic foundries and master ceramicists. Scarcity guarantees focus, zero-waste, and permanence.",
    },
  ];

  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      question: "How are Obelii objects sourced?",
      answer: "We cultivate close relationships with individual master craftspeople, independent design studios, and generational foundries across Kyoto, Copenhagen, and select regions of Portugal. Each piece is built from scratch or curated in small batch allotments, prioritizing physical honesty and ethical raw materials."
    },
    {
      question: "How can I verify the authenticity of my allotment?",
      answer: "Every Obelii object is accompanied by a physically signed Certificate of Allotment, bearing a distinct serial fingerprint and the master artisan’s personal studio stamp. We maintain an offline physical register of every transaction to guarantee generational provenance and prevent duplicates."
    },
    {
      question: "What does an Obelii membership entail?",
      answer: "The Obelii membership is an invitation-only priority tier. Registered members gain exclusive inaugural access to new collections, custom commission requests directly with master creators, private climate-controlled dispatch, and invitations to intimate, offline studio exhibitions."
    }
  ];

  return (
    <section className="py-20 px-6 md:px-20 bg-brand-alabaster max-w-7xl mx-auto text-left min-h-[85vh]">
      {/* Manifesto */}
      <div className="max-w-3xl mb-24">
        <span className="font-sans text-xs tracking-[0.3em] text-brand-gray uppercase font-semibold block mb-2">
          The Manifesto
        </span>
        <h1 className="font-serif text-4xl md:text-6xl text-brand-charcoal font-light tracking-tight leading-tight mb-8">
          The Devotion to Quietude.
        </h1>
        <div className="space-y-6 font-sans text-sm md:text-base text-brand-gray leading-relaxed opacity-95">
          <p>
            Obelii was founded as a quiet act of rebellion against the velocity of modern consumption. We believe the objects that inhabit our private spaces should not scream for attention, compete with digital notification rails, or carry loud brand declarations.
          </p>
          <p>
            True luxury is understated, structural, and tactile. It resides in the microscopic tolerance of solid milled edges, the thermal variations of wood-fired clay, and the deliberate weight of raw minerals.
          </p>
          <p>
            By designing a single, seamless digital storefront and partnering directly with master workshops, we curate limited physical allotments that survive trends and honor slow, generational permanence.
          </p>
        </div>
      </div>

      {/* Philosophy Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 py-16 border-t border-b border-brand-charcoal/10 mb-24">
        {pillars.map((p, idx) => (
          <div key={idx} className="space-y-4">
            <span className="font-serif text-lg text-brand-gold font-light block">
              0{idx + 1}.
            </span>
            <h3 className="font-serif text-xl md:text-2xl text-brand-charcoal font-light">
              {p.title}
            </h3>
            <p className="font-sans text-xs md:text-sm text-brand-gray leading-relaxed">
              {p.desc}
            </p>
          </div>
        ))}
      </div>

      {/* FAQ Section */}
      <div className="max-w-3xl mb-24">
        <span className="font-sans text-xs tracking-[0.3em] text-brand-gray uppercase font-semibold block mb-4">
          Frequently Answered
        </span>
        <h2 className="font-serif text-3xl md:text-4xl text-brand-charcoal font-light tracking-tight mb-8">
          Sourcing, Provenance, & Membership
        </h2>
        
        <div className="space-y-2 border-t border-brand-charcoal/10 pt-4">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div 
                key={idx} 
                className="border-b border-brand-charcoal/5 pb-4"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full flex justify-between items-center py-4 text-left focus:outline-none group"
                >
                  <span className="font-serif text-lg md:text-xl text-brand-charcoal group-hover:text-brand-gold transition-colors duration-200">
                    {faq.question}
                  </span>
                  <span className="text-brand-charcoal ml-4 font-light text-xl transition-transform duration-200">
                    {isOpen ? "−" : "+"}
                  </span>
                </button>
                <div 
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? "max-h-60 opacity-100 mt-2" : "max-h-0 opacity-0 pointer-events-none"
                  }`}
                >
                  <p className="font-sans text-xs md:text-sm text-brand-gray leading-relaxed pr-8 opacity-90">
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Studio Contact / Support */}
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
        <div className="space-y-6">
          <span className="font-sans text-xs tracking-[0.2em] text-brand-gray uppercase font-semibold block">
            Studio Communications
          </span>
          <h2 className="font-serif text-3xl text-brand-charcoal font-light leading-tight">
            Register a Custom Project or Bespoke Inquiry
          </h2>
          <p className="font-sans text-xs md:text-sm text-brand-gray leading-relaxed">
            Our curators assist private residents, architectural firms, and individual collectors with bespoke size adjustments, raw material sourcing, and private courier arrangements.
          </p>
          <div className="space-y-2 pt-4">
            <div className="font-mono text-[10px] uppercase text-brand-gray">
              Direct Inquiries: <span className="text-brand-charcoal ml-2">concierge@obelii.com</span>
            </div>
            <div className="font-mono text-[10px] uppercase text-brand-gray">
              Studio Location: <span className="text-brand-charcoal ml-2">Kyoto / Copenhagen</span>
            </div>
          </div>
        </div>

        <div className="bg-white border border-brand-charcoal/5 p-8 shadow-2xl">
          {!supportSubmitted ? (
            <form onSubmit={handleSupportSubmit} className="space-y-6">
              <div className="space-y-1">
                <label className="text-[10px] tracking-widest text-brand-gray uppercase">
                  Your Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="E.g., Charlotte Lin"
                  value={inquiryName}
                  onChange={(e) => setInquiryName(e.target.value)}
                  className="w-full bg-transparent border-t-0 border-x-0 border-b border-brand-charcoal/20 pb-2 text-xs focus:border-brand-charcoal focus:ring-0 rounded-none placeholder:text-brand-dim"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] tracking-widest text-brand-gray uppercase">
                  Your Correspondence Email
                </label>
                <input
                  type="email"
                  required
                  placeholder="email@address.com"
                  value={inquiryEmail}
                  onChange={(e) => setInquiryEmail(e.target.value)}
                  className="w-full bg-transparent border-t-0 border-x-0 border-b border-brand-charcoal/20 pb-2 text-xs focus:border-brand-charcoal focus:ring-0 rounded-none placeholder:text-brand-dim"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] tracking-widest text-brand-gray uppercase">
                  Context / Architectural Intent
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Share details of your space, material preferences, or the curated piece of interest..."
                  value={inquiryText}
                  onChange={(e) => setInquiryText(e.target.value)}
                  className="w-full bg-brand-alabaster/50 border border-brand-charcoal/10 text-xs p-3 font-sans focus:border-brand-charcoal focus:ring-0 rounded-none placeholder:text-brand-dim leading-relaxed"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-brand-charcoal hover:bg-brand-gray text-white text-xs tracking-widest font-sans uppercase py-3.5 transition-colors duration-300 flex items-center justify-center gap-2 border border-brand-charcoal"
              >
                Send Correspondence <Send size={12} />
              </button>
            </form>
          ) : (
            <div className="py-12 text-center space-y-4">
              <div className="w-12 h-12 bg-brand-gold/15 rounded-full flex items-center justify-center mx-auto text-brand-gold">
                <Check size={20} className="stroke-[2.5]" />
              </div>
              <h3 className="font-serif text-lg text-brand-charcoal">Correspondence Received</h3>
              <p className="font-sans text-xs text-brand-gray max-w-sm mx-auto leading-relaxed">
                Thank you for your message, <strong className="text-brand-charcoal">{inquiryName}</strong>. A dedicated brand guardian will review your space plan and respond within 48 studio hours to coordinate.
              </p>
              <button
                type="button"
                onClick={() => setSupportSubmitted(false)}
                className="text-[10px] tracking-widest font-sans text-brand-charcoal border-b border-brand-charcoal pb-0.5 uppercase hover:opacity-75 transition-opacity pt-4"
              >
                Submit New Message
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
