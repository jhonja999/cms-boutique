//types/product.ts
import { ImageType } from "./image";

export type ProductType = {
  id: number;
  documentId: string;
  productName: string;
  slug: string;
  description: string;
  active: boolean;
  price: number;
  origin: string;
  taste: string;
  isFeatured: boolean;
  createdAt: string; // ISO date-time string
  updatedAt: string; // ISO date-time string
  publishedAt: string; // ISO date-time string
  locale: string;
  images: ImageType[]; // ✅ Uses ImageType from image.ts
  category: {
    id: number;
    documentId: string;
    categoryName: string;
    slug: string;
    createdAt: string; // ISO date-time string
    updatedAt: string; // ISO date-time string
    publishedAt: string; // ISO date-time string
    locale: string;
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  localizations: any[]; // Adjust if localization data structure is known
};
