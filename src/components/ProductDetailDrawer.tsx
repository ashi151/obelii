import React, { useState, useEffect } from "react";
import { CuratedProduct, ProductVariant } from "../types";
import { X, Send, Check, ChevronRight, ShieldAlert, Sparkles, Inbox } from "lucide-react";

interface ProductDetailDrawerProps {
  product: CuratedProduct | null;
  onClose: () => void;
  isRegistered: boolean;
  registeredEmail: string;
}

export default function ProductDetailDrawer({
  product,
  onClose,
  isRegistered,
  registeredEmail,
}: ProductDetailDrawerProps) {
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);
  const [inquiryEmail, setInquiryEmail] = useState("");
  const [inquiryMessage, setInquiryMessage] = useState("");
  const [inquirySubmitted, setInquirySubmitted] = useState(false);
  const [activeImage, setActiveImage] = useState("");

  useEffect(() => {
    if (product) {
      setSelectedVariant(product.variants[0] || null);
      setActiveImage(product.image);
      setInquirySubmitted(false);
      setInquiryMessage("");
      setInquiryEmail(registeredEmail || "");
    }
  }, [product, registeredEmail]);

  if (!product) return null;

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryEmail.trim() || !inquiryEmail.includes("@")) return;
    setInquirySubmitted(true);
  };

  const allImages = [product.image, ...(product.additionalImages || [])];

  return (
    <div className="fixed inset-0 z-50 flex justify-end overflow-hidden font-sans">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-brand-charcoal/40 backdrop-blur-sm transition-opacity duration-500"
        onClick={onClose}
      />

      {/* Drawer Panel */}
      <div className="relative w-full max-w-2xl bg-[#fbf9f9] h-full shadow-2xl flex flex-col z-10 overflow-y-auto border-l border-brand-charcoal/10 transition-transform duration-500 ease-out">
        {/* Sticky Header with Brand Name */}
        <div className="sticky top-0 bg-[#fbf9f9]/90 backdrop-blur-md z-20 flex justify-between items-center px-8 py-6 border-b border-brand-charcoal/5">
          <div className="flex items-center gap-2">
            <span className="font-serif text-xl text-brand-charcoal">Obelii</span>
            <span className="font-mono text-[9px] tracking-widest text-brand-gold bg-brand-gold/5 px-2 py-0.5 border border-brand-gold/10 uppercase">
              Curator Review
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-2 -mr-2 hover:bg-brand-charcoal/5 text-brand-charcoal/60 hover:text-brand-charcoal transition-colors rounded-none"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-8 space-y-10 flex-grow pb-24">
          {/* Main Visuals & Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-[3/2] w-full bg-brand-dim/20 overflow-hidden border border-brand-charcoal/5">
              <img
                src={activeImage}
                alt={product.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover grayscale opacity-95 hover:grayscale-0 transition-all duration-500"
              />
            </div>
            {allImages.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {allImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(img)}
                    className={`relative w-20 aspect-video flex-shrink-0 bg-brand-dim/20 overflow-hidden border transition-all ${
                      activeImage === img ? "border-brand-charcoal scale-[0.98]" : "border-brand-charcoal/10"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${product.name} detail ${idx + 1}`}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover grayscale hover:grayscale-0"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Titles & Specs */}
          <div className="space-y-4 text-left">
            <span className="text-[10px] tracking-[0.3em] text-brand-gold uppercase block font-semibold">
              {product.category}
            </span>
            <div className="flex justify-between items-baseline gap-4 flex-wrap">
              <h3 className="font-serif text-3xl text-brand-charcoal font-light leading-tight">
                {product.name}
              </h3>
              <span className="font-mono text-lg text-brand-charcoal border-b border-brand-charcoal/15 pb-1 font-semibold">
                {product.price}
              </span>
            </div>
            <p className="font-serif italic text-brand-gray text-base opacity-90 leading-relaxed block">
              "{product.tagline}"
            </p>
            <div className="w-12 h-[1px] bg-brand-charcoal/20" />
            <p className="text-brand-gray text-sm leading-relaxed opacity-95">
              {product.longDescription}
            </p>
          </div>

          {/* Details Table */}
          <div className="bg-brand-alabaster p-6 border border-brand-charcoal/5 space-y-4 text-left">
            <h4 className="font-serif text-xs tracking-widest text-brand-charcoal uppercase block font-semibold">
              Specifications
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-brand-gray/80 uppercase tracking-widest text-[10px] block mb-1">
                  Composition & Materials
                </span>
                <span className="text-brand-charcoal leading-relaxed">
                  {product.materials.join(" / ")}
                </span>
              </div>
              <div>
                <span className="text-brand-gray/80 uppercase tracking-widest text-[10px] block mb-1">
                  Physical Dimensions
                </span>
                <span className="text-brand-charcoal">{product.dimensions}</span>
              </div>
            </div>
          </div>

          {/* Luxury Swatches Selection */}
          {product.variants.length > 0 && (
            <div className="space-y-4 text-left">
              <h4 className="font-sans text-xs tracking-[0.15em] text-brand-charcoal font-bold uppercase">
                Select Finish / Tone
              </h4>
              <div className="flex flex-wrap gap-4">
                {product.variants.map((v) => (
                  <button
                    key={v.value}
                    onClick={() => setSelectedVariant(v)}
                    className={`flex items-center gap-3 px-4 py-3 border transition-all ${
                      selectedVariant?.value === v.value
                        ? "border-brand-charcoal bg-brand-charcoal/5"
                        : "border-brand-charcoal/10 hover:border-brand-charcoal/30 bg-transparent"
                    }`}
                  >
                    {v.colorHex && (
                      <span
                        className="w-4 h-4 border border-brand-charcoal/10"
                        style={{ backgroundColor: v.colorHex }}
                      />
                    )}
                    <span className="text-xs font-medium tracking-wide text-brand-charcoal">
                      {v.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Divider */}
          <div className="border-t border-brand-charcoal/5 my-8" />

          {/* Allocation Inquiry System */}
          <div className="space-y-6 text-left">
            <div>
              <span className="text-[10px] tracking-[0.2em] text-brand-gold uppercase font-bold block mb-1">
                Priority Allocation Room
              </span>
              <h4 className="font-serif text-xl text-brand-charcoal font-light">
                Submit Reservation Request
              </h4>
              <p className="text-xs text-brand-gray mt-2 leading-relaxed opacity-95">
                Bespoke pieces are forged or filled to order. Waitlist members may submit digital inquiries to queue early production allotments ahead of open-market storefront release.
              </p>
            </div>

            {!inquirySubmitted ? (
              <form onSubmit={handleInquirySubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] tracking-widest text-brand-gray uppercase">
                      Confirm Email Address
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
                  <div className="space-y-1 bg-brand-charcoal/5 p-3 flex justify-between items-center">
                    <div>
                      <span className="text-[9px] text-brand-gray uppercase block tracking-wider">
                        Requested Variant
                      </span>
                      <strong className="text-[11px] text-brand-charcoal tracking-wide mt-0.5 block">
                        {selectedVariant ? selectedVariant.name : "Standard"}
                      </strong>
                    </div>
                    {selectedVariant?.colorHex && (
                      <span
                        className="w-4 h-4 border border-brand-charcoal/10"
                        style={{ backgroundColor: selectedVariant.colorHex }}
                      />
                    )}
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] tracking-widest text-brand-gray uppercase">
                    Backstory / Special Placement Instructions for the Artisan
                  </label>
                  <textarea
                    required
                    rows={3}
                    placeholder="E.g., Requested for a private residency project in Copenhagen. We hope to accent the north-facing sandstone hallway..."
                    value={inquiryMessage}
                    onChange={(e) => setInquiryMessage(e.target.value)}
                    className="w-full bg-brand-alabaster/50 border border-brand-charcoal/10 text-xs p-3 font-sans focus:border-brand-charcoal focus:ring-0 rounded-none placeholder:text-brand-dim leading-relaxed"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-brand-charcoal hover:bg-brand-gray text-white text-xs tracking-widest font-sans uppercase py-4 transition-colors duration-300 flex items-center justify-center gap-2 border border-brand-charcoal"
                >
                  Request Allocation <Send size={12} />
                </button>
              </form>
            ) : (
              <div className="bg-brand-charcoal text-[#fbf9f9] p-8 space-y-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-44 h-44 bg-brand-gold/10 blur-3xl rounded-full" />
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[9px] tracking-[0.25em] text-brand-gold uppercase block font-semibold">
                      Inquiry Processed
                    </span>
                    <h5 className="font-serif text-xl tracking-wide mt-1">
                      Allotment ID: #{Math.floor(1000 + Math.random() * 9000)}-OB
                    </h5>
                  </div>
                  <Check size={20} className="text-brand-gold text-right stroke-[2.5]" />
                </div>

                <p className="font-sans text-xs text-[#fbf9f9]/85 leading-relaxed">
                  We have queued your bespoke allocation for{" "}
                  <strong className="text-white text-medium">
                    {product.name} ({selectedVariant?.name || "Standard finish"})
                  </strong>
                  . A private courier will reach out to{" "}
                  <strong className="text-white text-medium">{inquiryEmail}</strong> to review layout blueprints, estimated dispatch dates, and private transaction routing.
                </p>

                <div className="border-t border-[#fbf9f9]/10 pt-4 flex justify-between items-center">
                  <span className="text-[10px] uppercase text-[#fbf9f9]/50 tracking-wider">
                    Status: PENDING ARTISAN REVIEW
                  </span>
                  <button
                    type="button"
                    onClick={() => setInquirySubmitted(false)}
                    className="text-[10px] uppercase text-brand-gold border-b border-brand-gold/20 pb-0.5 hover:border-brand-gold"
                  >
                    Edit Inquiry
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
