import { useState } from "react";
import { JOURNAL_ARTICLES } from "../data";
import { JournalArticle } from "../types";
import { ArrowLeft, Clock, Calendar, BookOpen, ChevronRight } from "lucide-react";

export default function JournalView() {
  const [selectedArticle, setSelectedArticle] = useState<JournalArticle | null>(null);

  if (selectedArticle) {
    return (
      <article className="py-16 md:py-24 px-6 md:px-20 bg-brand-alabaster text-left max-w-4xl mx-auto min-h-[80vh]">
        {/* Back button */}
        <button
          onClick={() => setSelectedArticle(null)}
          className="group flex items-center gap-3 font-sans text-xs tracking-widest text-brand-charcoal uppercase mb-12 hover:opacity-75 transition-opacity"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Back to Journal
        </button>

        {/* Categories / Meta */}
        <div className="flex items-center gap-6 text-xs text-brand-gray/80 uppercase tracking-widest font-sans mb-4">
          <span className="text-brand-gold font-semibold">{selectedArticle.category}</span>
          <span className="flex items-center gap-1.5">
            <Calendar size={13} />
            {selectedArticle.date}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock size={13} />
            {selectedArticle.readTime}
          </span>
        </div>

        {/* Title */}
        <h1 className="font-serif text-3xl md:text-5xl text-brand-charcoal tracking-tight font-light leading-tight mb-6">
          {selectedArticle.title}
        </h1>

        <p className="font-sans text-base md:text-lg text-brand-gray leading-relaxed mb-12 italic opacity-90 max-w-3xl">
          {selectedArticle.subtitle}
        </p>

        {/* Main Banner Image */}
        <div className="aspect-[21/9] w-full bg-brand-dim/20 overflow-hidden mb-16 border border-brand-charcoal/5">
          <img
            src={selectedArticle.image}
            alt={selectedArticle.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover grayscale opacity-95"
          />
        </div>

        {/* Content Paragraphs with Drops Cap and Quotes */}
        <div className="space-y-8 max-w-2xl mx-auto font-sans text-sm md:text-base text-brand-charcoal leading-relaxed opacity-95">
          {selectedArticle.content.map((para, idx) => {
            if (idx === 0) {
              // Custom Drops Cap for editorial perfection
              const firstLetter = para.charAt(0);
              const remainingText = para.slice(1);
              return (
                <p key={idx} className="first-letter:font-serif first-letter:text-6xl first-letter:font-light first-letter:float-left first-letter:mr-3 first-letter:text-brand-charcoal first-letter:leading-[0.8] clear-both">
                  {remainingText}
                </p>
              );
            }
            return <p key={idx}>{para}</p>;
          })}
        </div>

        {/* Pull Quote */}
        {selectedArticle.quote && (
          <div className="max-w-2xl mx-auto my-16 border-l-2 border-brand-gold pl-6 py-2">
            <blockquote className="font-serif italic text-lg md:text-xl text-brand-charcoal leading-relaxed">
              "{selectedArticle.quote}"
            </blockquote>
            <span className="font-sans text-[10px] tracking-widest text-brand-gray uppercase mt-3 block">
              — Obelii Dispatch
            </span>
          </div>
        )}

        <div className="border-t border-brand-charcoal/10 max-w-2xl mx-auto pt-12 mt-16 text-center">
          <button
            onClick={() => setSelectedArticle(null)}
            className="font-sans text-xs tracking-[0.2em] bg-brand-charcoal text-white px-8 py-3.5 hover:bg-brand-gray transition-colors uppercase border border-brand-charcoal"
          >
            Explore Other Essays
          </button>
        </div>
      </article>
    );
  }

  return (
    <section className="py-20 px-6 md:px-20 bg-brand-alabaster text-left max-w-7xl mx-auto min-h-[85vh]">
      <div className="mb-16 border-b border-brand-charcoal/10 pb-12">
        <span className="font-sans text-xs tracking-[0.3em] text-brand-gray uppercase font-semibold block mb-2">
          The Journal
        </span>
        <h1 className="font-serif text-4xl md:text-5xl text-brand-charcoal tracking-tight font-light">
          Editorial Perspectives.
        </h1>
        <p className="font-sans text-sm text-brand-gray max-w-2xl mt-4 leading-relaxed opacity-85">
          A publication of slow reflections, material studies, and conversations exploring the subtle structures of modern craft and un-branded space.
        </p>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        {JOURNAL_ARTICLES.map((article) => (
          <div
            key={article.id}
            className="group flex flex-col cursor-pointer"
            onClick={() => setSelectedArticle(article)}
          >
            {/* Cover image */}
            <div className="relative aspect-[16/10] overflow-hidden bg-brand-dim/20 mb-6 border border-brand-charcoal/5">
              <img
                src={article.image}
                alt={article.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-[1.02] transition-all duration-[1200ms]"
              />
              <div className="absolute top-4 left-4 bg-[#fbf9f9]/90 backdrop-blur-md px-3 py-1 text-[9px] tracking-widest font-mono text-brand-charcoal uppercase border border-brand-charcoal/5">
                {article.category}
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-4 text-[11px] text-brand-gray uppercase tracking-wider font-sans font-medium">
                <span>{article.date}</span>
                <span className="w-1 h-1 bg-brand-charcoal/20 rounded-full" />
                <span>{article.readTime}</span>
              </div>

              <h2 className="font-serif text-2xl md:text-3xl text-brand-charcoal group-hover:text-brand-gold transition-colors duration-300 font-light leading-snug">
                {article.title}
              </h2>

              <p className="font-sans text-xs md:text-sm text-brand-gray leading-relaxed h-14 line-clamp-3">
                {article.summary}
              </p>

              <div className="pt-2 flex items-center gap-1 font-sans text-xs tracking-widest text-brand-charcoal font-semibold uppercase group-hover:gap-2 transition-all">
                Read Essay <ChevronRight size={14} className="text-brand-gold stroke-[2.5]" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
