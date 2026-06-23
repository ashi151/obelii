import { CuratedProduct, JournalArticle } from "./types";

export const CURATED_PRODUCTS: CuratedProduct[] = [
  {
    id: "silt-vase",
    name: "The Silt Vase",
    category: "Objects",
    tagline: "Organic form meets raw stoneware.",
    description: "Sand-casted coarse ceramic vase inspired by wind-swept silt banks. Each piece exhibits natural variations in topography and texture.",
    longDescription: "Formed using local sedimentary clay, the Silt Vase is sand-casted in small batches to produce an exceptionally tactile, coarse texture. Its soft, asymmetrical form shifts as the light crosses its surface throughout the day. It functions beautifully as a standalone sculptural piece or as a dramatic vessel for dried floral branches.",
    price: "$280 USD",
    materials: [" Sedimentary Stoneware Clay", " Natural Unrefined Silica Glaze"],
    dimensions: "H 32cm × W 24cm × D 18cm",
    image: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&q=80&w=1200",
    additionalImages: [
      "https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?auto=format&fit=crop&q=80&w=800"
    ],
    variants: [
      { name: "Raw Ochre", value: "ochre", colorHex: "#cfa67a" },
      { name: "Silt Quartz", value: "quartz", colorHex: "#e3dfd8" },
      { name: "Basalt Black", value: "basalt", colorHex: "#262625" }
    ],
    limitedQuantity: 45
  },
  {
    id: "ambra-extrait",
    name: "Ambra Bespoke Extrait",
    category: "Sensory",
    tagline: "A silent whisper of smoke and warmth.",
    description: "An intimate sensory signature featuring cold-pressed resins, warm ambergris, and crushed white cedar.",
    longDescription: "Our signature olfactory extrait is matured for six months in light-restricted cedar chambers. Designed as a skin-melt oil, it responds to individual warmth, creating an intimate, subtle path that stays close to the wearer. There are no synthetic fixatives or aerosol carriers—pure luxury, concentrated.",
    price: "$195 USD",
    materials: ["Ambergris Tincture", "Moroccan Cedar Absolute", "Crushed Olibanum"],
    dimensions: "50ml Flacon",
    image: "https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&q=80&w=1200",
    additionalImages: [
      "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&q=80&w=800"
    ],
    variants: [
      { name: "Concentrated Extrait", value: "default", colorHex: "#cb9958" }
    ],
    limitedQuantity: 100
  },
  {
    id: "cast-tray",
    name: "The Cast Tray",
    category: "Hardware",
    tagline: "Solid stainless steel, sand-blasted to satin.",
    description: "An architectural catchment forged from 4.5kg of recycled industrial steel, finished with a fine satin-mist blasting.",
    longDescription: "Designed with monumental clean lines and heavy physical presence, the Cast Tray acts as a geometric focal point for personal objects. Crafted in collaboration with a boutique foundry in Kyoto, each piece is individually cast, CNC milled for microscopic edge tolerance, and blasted with fine micro-glass beads for a soft satin finish.",
    price: "$340 USD",
    materials: ["Recycled 316L Stainless Steel", "Anodized Silver Mist Finish"],
    dimensions: "H 3cm × W 40cm × D 15cm",
    image: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&q=80&w=1200",
    additionalImages: [
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=800"
    ],
    variants: [
      { name: "Satin Mist", value: "satin", colorHex: "#d1d5db" },
      { name: "Anodized Slate", value: "slate", colorHex: "#4b5563" }
    ],
    limitedQuantity: 25
  },
  {
    id: "flax-linen",
    name: "The Flax Coverlet",
    category: "Linen",
    tagline: "Raw Belgian flax, soft-loomed for generations.",
    description: "An un-dyed, master-loomed heavy coverlet that honors the heritage of traditional flax cultivation.",
    longDescription: "Our heavy bed throws are woven by sixth-generation weavers on historic mechanical shuttle looms. Made entirely from long-staple flax grown in Flanders, the linen is washed in soft well-water to open the fibers, creating an incredibly soft, breathable texture that regulates temperature with natural ease.",
    price: "$420 USD",
    materials: ["100% Belgian Long-Staple Flax", "Organic Soft-Water Weave"],
    dimensions: "260cm × 240cm",
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&q=80&w=1200",
    additionalImages: [
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&q=80&w=800"
    ],
    variants: [
      { name: "Natural Ecru", value: "ecru", colorHex: "#dfd5c6" },
      { name: "Chalk White", value: "chalk", colorHex: "#faf9f6" }
    ],
    limitedQuantity: 30
  }
];

export const JOURNAL_ARTICLES: JournalArticle[] = [
  {
    id: "philosophy-of-quiet-luxury",
    title: "The Architecture of Unspoken Luxury",
    subtitle: "Why the quietest spaces often hold the heaviest emotional resonance.",
    category: "Philosophy",
    date: "June 14, 2026",
    readTime: "6 Min Read",
    summary: "As the modern space grows increasingly crowded with digital noise, the ultimate signifier of refinement is space itself—and the physical objects that respect it.",
    content: [
      "Quiet luxury is not a trend; it is the natural equilibrium of design. When we strip away the superficial branding, the ornamental distractions, and the excess noise of modern consumerism, we are left with the absolute essence of a physical object: its material foundation, its architectural balance, and its relationship with the human hand.",
      "The objects we choose to place in our living spaces behave like anchors. If their visual language is too loud, they generate persistent noise, competing for cognitive attention. Conversely, an object designed with restraint and proportional honesty respects the space it occupies. It does not beg to be looked at; instead, it waiting for the curious eye to discover its microscopic details—the hand-finished bevels, the natural grain of unrefined minerals, the slow patina that develops over decades of usage.",
      "At Obelii, we build under this single pillar. Every item curated for our collection must prove its utility and command its workspace purely through silent craftsmanship. This is why we partner with master craftsmen who spend months refining a single curve or formula. It is an uncompromising devotion to detail that can only be felt, never shouted."
    ],
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200",
    quote: "Precision is not about control; it is about absolute respect for the raw materials."
  },
  {
    id: "crafting-sedimentary-clay",
    title: "Silt, Stone, and Slow Water",
    subtitle: "A conversation with master ceramicist Kenji Hirose on sand-casting clay.",
    category: "Craftsmanship",
    date: "May 28, 2026",
    readTime: "8 Min Read",
    summary: "We traveled to a quiet woodland studio in Shiga Prefecture to document the laborious, mud-stained reality of the Silt Vase creation process.",
    content: [
      "The air in Kenji Hirose's workshop is thick with the sweet, copper smell of wet earth. Outside, a gentle mountain rainfall feeds the small stream that Kenji has used for forty years to wash his hand-harvested clay. There are no high-speed electrical wheels or computerized firing kilns here. Everything operates in relation to natural cycles.",
      "Kenji’s sand-casting approach is notoriously risky. He prepares dry molds made from sifted mountain sand, rich in silica and unrefined basalt minerals. Wet mud is poured into these fragile sandy hollows. As the clay dries, it absorbs fragments of the surrounding sand, bonding coarse grains directly into its skin. 'More than half of the vases fail in the wood-firing kiln,' Kenji says with a peaceful smile, 'but the ones that survive have an ancient, geological history etched into their very walls.'",
      "When you touch the silt stoneware vase, your fingers trace the actual landscape of Shiga's hillsides. The surface is uneven, slightly abrasive, and completely unique. In Kenji's view, an object that is perfectly identical to another has no soul. It is the subtle errors, the small thermal cracks, and the mineral blooms that imbue a piece with its quiet, luxury permanence."
    ],
    image: "https://images.unsplash.com/photo-1565192647048-f997ded87958?auto=format&fit=crop&q=80&w=1200",
    quote: "The soil already has its own memory. My craft is simply to avoid interrupting and ruining that memory."
  }
];
