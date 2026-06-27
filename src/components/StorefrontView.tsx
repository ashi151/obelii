import React, { useState, useEffect, useRef } from "react";
import { CURATED_PRODUCTS } from "../data";
import { CuratedProduct } from "../types";
import { Check, ArrowRight, X, Sparkles, Sliders, Minimize2, ChevronRight } from "lucide-react";
import ThreeCanvas from "./ThreeCanvas";

interface StorefrontViewProps {
  onJoinPrivateList: (email: string) => void;
  onSelectProduct: (product: CuratedProduct) => void;
  isRegistered: boolean;
  registeredEmail: string;
}

export default function StorefrontView({
  onJoinPrivateList,
  onSelectProduct,
  isRegistered,
  registeredEmail,
}: StorefrontViewProps) {
  const [email, setEmail] = useState("");
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [personalNote, setPersonalNote] = useState("");
  const [allocationSubmitted, setAllocationSubmitted] = useState(false);

  // Dynamic ticking countdown (Starts at 12 Days, 4 Hours, 18 Minutes)
  const targetDateRef = useRef<number>(
    Date.now() + 12 * 24 * 3600 * 1000 + 4 * 3600 * 1000 + 18 * 60 * 1000 + 42 * 1000
  );
  const [timeLeft, setTimeLeft] = useState({
    days: "12",
    hours: "04",
    minutes: "18",
    seconds: "42",
  });

  useEffect(() => {
    const updateTime = () => {
      const now = Date.now();
      const distance = targetDateRef.current - now;

      if (distance < 0) {
        setTimeLeft({ days: "00", hours: "00", minutes: "00", seconds: "00" });
        return;
      }

      const d = Math.floor(distance / (1000 * 60 * 60 * 24));
      const h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft({
        days: d.toString().padStart(2, "0"),
        hours: h.toString().padStart(2, "0"),
        minutes: m.toString().padStart(2, "0"),
        seconds: s.toString().padStart(2, "0"),
      });
    };

    const interval = setInterval(updateTime, 1000);
    updateTime();

    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes("@")) return;
    onJoinPrivateList(email);
  };

  const handlePreferencesSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAllocationSubmitted(true);
  };

  const toggleInterest = (category: string) => {
    setSelectedInterests((prev) =>
      prev.includes(category)
        ? prev.filter((item) => item !== category)
        : [...prev, category]
    );
  };

  const interestsList = [
    "Sculptural Objects",
    "Bespoke Sensory Fragrance",
    "Architectural Hardware",
    "Loomed High-Fashion Textiles",
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-brand-alabaster">
        {/* Three.js liquid metal */}
        <ThreeCanvas />

        {/* Ambient background textures */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div
            className="w-full h-full bg-cover bg-center opacity-[0.06] mix-blend-multiply"
            style={{
              backgroundImage: `url('https://lh3.googleusercontent.com/aida/AP1WRLvzjj977uUNDniaJ4ItemEm5hntmea_emE5X8pn7ydo6F8voVZHGbfarrLQ0Sg02Sqhq4_AOXwr-7TA_6gf-_pjsUxHt-B-OB4RXz1rEASyu_lLhygog0vMXvsmgnymxSjUqGdSHquAPoxA0ekpSaAWToQqEA_zvT0MSJx0Yu-3mtGNRRErdhN7EI5rGFNmp4u68W7xkDy_MNMuKBdqd5tuuM8UrXSD4qZJpO89Veixw6SiCwiDtSWwfjRr')`,
            }}
          />
          {/* Soft gradient bottom fade */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#fbf9f9]/40 to-[#fbf9f9] pointer-events-none" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-20 text-center py-20 animate-fade-in">
          <div className="overflow-hidden mb-6">
            <h1 className="font-serif text-4xl md:text-6xl text-brand-charcoal leading-tight tracking-tight max-w-4xl mx-auto drop-shadow-sm">
              A New Era of E-commerce.
            </h1>
          </div>
          <p className="font-sans text-lg md:text-xl text-brand-gray max-w-2xl mx-auto mb-16 opacity-90 leading-relaxed">
            A curated destination for premium goods. Launching soon.
          </p>

          {/* Luxury Live Countdown */}
          <div className="flex justify-center items-center gap-8 md:gap-20 mb-20">
            <div className="text-center">
              <span className="block font-serif text-4xl md:text-5xl lg:text-6xl text-brand-charcoal font-light tabular-nums tracking-tight">
                {timeLeft.days}
              </span>
              <span className="text-[10px] tracking-[0.3em] font-sans text-brand-gray uppercase mt-1 block">
                Days
              </span>
            </div>
            <div className="text-brand-dim/60 font-serif text-3xl md:text-4xl hidden sm:block">:</div>
            <div className="text-center">
              <span className="block font-serif text-4xl md:text-5xl lg:text-6xl text-brand-charcoal font-light tabular-nums tracking-tight">
                {timeLeft.hours}
              </span>
              <span className="text-[10px] tracking-[0.3em] font-sans text-brand-gray uppercase mt-1 block">
                Hours
              </span>
            </div>
            <div className="text-brand-dim/60 font-serif text-3xl md:text-4xl hidden sm:block">:</div>
            <div className="text-center">
              <span className="block font-serif text-4xl md:text-5xl lg:text-6xl text-brand-charcoal font-light tabular-nums tracking-tight">
                {timeLeft.minutes}
              </span>
              <span className="text-[10px] tracking-[0.3em] font-sans text-brand-gray uppercase mt-1 block">
                Minutes
              </span>
            </div>
            <div className="text-brand-dim/60 font-serif text-3xl md:text-4xl hidden sm:block">:</div>
            <div className="text-center">
              <span className="block font-serif text-4xl md:text-5xl lg:text-6xl text-brand-charcoal font-light tabular-nums tracking-tight">
                {timeLeft.seconds}
              </span>
              <span className="text-[10px] tracking-[0.3em] font-sans text-brand-gray uppercase mt-1 block">
                Seconds
              </span>
            </div>
          </div>

          {/* Form Action Area */}
          <div className="max-w-xl mx-auto relative">
            {!isRegistered ? (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-end gap-6 sm:gap-2">
                <div className="w-full relative text-left">
                  <label className="text-[11px] tracking-[0.2em] font-medium text-brand-gray uppercase mb-3 block">
                    Join the Private List
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="email@address.com"
                    id="hero-email-input"
                    className="w-full bg-transparent border-t-0 border-x-0 border-b border-brand-charcoal/20 pb-3 font-sans text-brand-charcoal placeholder:text-brand-dim focus:border-brand-charcoal focus:ring-0 transition-colors duration-300 rounded-none px-0"
                  />
                </div>
                <button
                  type="submit"
                  id="hero-notify-btn"
                  className="w-full sm:w-auto font-sans text-xs tracking-widest bg-brand-charcoal text-white px-10 py-4 hover:bg-brand-gray hover:text-white transition-all duration-500 uppercase whitespace-nowrap border border-brand-charcoal shadow-xl shadow-brand-charcoal/5"
                >
                  Notify Me
                </button>
              </form>
            ) : (
              <div className="bg-white/90 backdrop-blur-md border border-brand-charcoal/10 p-8 text-center relative overflow-hidden shadow-2xl">
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold/5 blur-3xl rounded-full" />
                <div className="w-12 h-12 bg-brand-gold/10 rounded-full flex items-center justify-center mx-auto text-brand-gold mb-4">
                  <Check size={20} className="stroke-[2.5]" />
                </div>
                <h3 className="font-serif text-xl text-brand-charcoal mb-2">
                  Welcome to Obelii
                </h3>
                <p className="font-sans text-xs text-brand-gray max-w-sm mx-auto leading-relaxed">
                  Your address <strong className="text-brand-charcoal">{registeredEmail}</strong> has been secured for the inaugural launch list (No. 04,281).
                </p>
              </div>
            )}
            <p className="mt-8 font-sans text-[10px] text-brand-gray tracking-wider italic opacity-80 z-10 relative">
              Members receive exclusive access to the inaugural shop launch.
            </p>
          </div>
        </div>
      </section>

      {/* The Original Mockup Collection Section (Primary Section aligned exactly to image) */}
      <section className="py-24 px-6 md:px-20 border-t border-brand-charcoal/10 bg-brand-alabaster">
        <div className="max-w-7xl mx-auto text-center space-y-4 mb-20">
          <span className="font-sans text-xs tracking-[0.4em] text-brand-gray uppercase block font-semibold">
            The Collection
          </span>
          <h2 className="font-serif text-3xl md:text-5xl text-brand-charcoal tracking-tight font-light">
            A Single, Seamless Shopping Experience.
          </h2>
          <p className="font-sans text-sm md:text-base text-brand-gray max-w-3xl mx-auto leading-relaxed opacity-90">
            Curating the world's most refined products into a single, seamless shopping experience. Obelii is designed for high-fidelity retail, prioritizing digital craftsmanship and aesthetic clarity above all else.
          </p>
        </div>

        {/* Featured Texture Accent - Exactly resembling the image in user request */}
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-24">
          <div className="relative aspect-square overflow-hidden bg-brand-dim/30 group border border-brand-charcoal/5">
            <img
              alt="Premium textures"
              className="w-full h-full object-cover grayscale opacity-90 group-hover:scale-105 transition-transform duration-[3000ms]"
              referrerPolicy="no-referrer"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBxwajXnvdAp7RvIwtkwgXNYVC2GRlGvmyzGVy674PW9ipUO8VZi2G6JC0MNta1RjxLpbH8f8U_bzSOV0BV13CyQDVIpPJUGYfR2mDP8PLi2w1OBSK4WD32HSnvqGA8Wk1D5GBdmf17ANJom7COVhjrlgD1rcFOWvozpu5UfML4dm7g-2YlcIk2vnQ3JiwoIeVpKwIReAaXkpUtQq-mvAn9m7dwIfx3D0zfU0g7bdYJ8yrA2QANhLZIkcu2tmUadtpT3hq7blehypNK"
            />
            <div className="absolute inset-0 border border-brand-charcoal/5 pointer-events-none" />
          </div>
          <div className="p-4 md:p-8 space-y-6 text-left">
            <div className="w-12 h-[1px] bg-brand-charcoal" />
            <h3 className="font-serif text-3xl md:text-4xl text-brand-charcoal font-light leading-tight">
              Quiet Luxury, <br />
              Redefined.
            </h3>
            <p className="font-sans text-sm text-brand-gray leading-relaxed opacity-90">
              Our platform leverages bespoke technology to deliver a fluid environment where the product remains the absolute focus. Minimalist by nature, uncompromising in detail.
            </p>
            <div className="pt-4">
              <a
                href="#coming-soon-catalog"
                className="font-sans text-[11px] tracking-[0.2em] text-brand-charcoal border-b border-brand-charcoal/20 hover:border-brand-charcoal transition-all pb-1 font-medium uppercase"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>

        {/* Dynamic Interactive Curated Catalog Teaser - "Objects of Quiet Luxury" */}
        <div id="coming-soon-catalog" className="max-w-7xl mx-auto pt-16 border-t border-brand-charcoal/5 scroll-mt-24">
          <div className="flex flex-col md:flex-row justify-between items-baseline mb-12 gap-4 text-left">
            <div>
              <span className="text-[10px] tracking-[0.3em] font-sans text-brand-gold uppercase font-semibold">
                Inaugural Catalog Preview
              </span>
              <h3 className="font-serif text-2xl md:text-3xl text-brand-charcoal font-light mt-1">
                Curated Allotments
              </h3>
            </div>
            <p className="font-sans text-xs text-brand-gray max-w-sm md:text-right leading-relaxed">
              Below is a selection of pieces preparing for inaugural delivery. Waitlist members may request early allocation reviews.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {CURATED_PRODUCTS.map((prod) => (
              <div
                key={prod.id}
                onClick={() => onSelectProduct(prod)}
                className="group flex flex-col cursor-pointer text-left"
              >
                <div className="relative aspect-[3/4] overflow-hidden bg-brand-dim/20 mb-4 border border-brand-charcoal/5">
                  <img
                    src={prod.image}
                    alt={prod.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
                  />
                  <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md border border-brand-charcoal/5 px-2 py-0.5 font-mono text-[9px] text-brand-charcoal uppercase tracking-widest">
                    {prod.category}
                  </div>
                  {prod.limitedQuantity && (
                    <div className="absolute bottom-3 right-3 bg-brand-charcoal text-white px-2 py-0.5 font-mono text-[8px] tracking-wider uppercase">
                      Ltd {prod.limitedQuantity}
                    </div>
                  )}
                  {/* Hover indicator overlay */}
                  <div className="absolute inset-0 bg-brand-charcoal/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between items-baseline">
                    <h4 className="font-serif text-lg text-brand-charcoal group-hover:text-brand-gold transition-colors duration-300">
                      {prod.name}
                    </h4>
                    <span className="font-mono text-xs text-brand-gray">{prod.price}</span>
                  </div>
                  <p className="font-sans text-xs text-brand-gray line-clamp-2 leading-relaxed h-8">
                    {prod.description}
                  </p>
                  <div className="pt-2 flex items-center gap-1 font-sans text-[10px] tracking-widest text-brand-charcoal font-semibold uppercase group-hover:gap-2 transition-all">
                    Inquire Piece <ChevronRight size={12} className="text-brand-gold" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
