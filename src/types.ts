export interface ProductVariant {
  name: string;
  value: string;
  colorHex?: string;
}

export interface CuratedProduct {
  id: string;
  name: string;
  category: string;
  tagline: string;
  description: string;
  longDescription: string;
  price: string;
  materials: string[];
  dimensions: string;
  image: string;
  additionalImages?: string[];
  variants: ProductVariant[];
  limitedQuantity?: number;
}

export interface JournalArticle {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  date: string;
  readTime: string;
  summary: string;
  content: string[]; // divided into paragraphs
  image: string;
  quote?: string;
}

export interface WaitlistRegistration {
  email: string;
  timestamp: string;
  slotNumber: string;
  preferences: string[];
  notes?: string;
}
