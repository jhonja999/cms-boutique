import { ImageFormats } from "./image"; // ✅ Import existing image formats

export type CategoryType = {
  id: number;
  documentId: string;
  categoryName: string;
  slug: string;
  createdAt: string; // ISO date-time string
  updatedAt: string; // ISO date-time string
  publishedAt: string; // ISO date-time string
  locale: string;
  categoryImage?: { // ✅ Optional category image
    id: number;
    url: string; // ✅ Uses the top-level URL
    formats?: ImageFormats; // ✅ Uses ImageFormats from image.ts
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  localizations: any[]; // Adjust if localization data structure is known
};


/* export type CategoryType = {
    id: number;
    documentId: string;
    categoryName: string;
    slug: string;
    createdAt: string; // ISO date-time string
    updatedAt: string; // ISO date-time string
    publishedAt: string; // ISO date-time string
    locale: string;
    categoryImage: {
      id: number;
      documentId: string;
      name: string;
      alternativeText: string | null;
      caption: string | null;
      width: number;
      height: number;
      formats: {
        large: ImageFormatType;
        small: ImageFormatType;
        medium: ImageFormatType;
        thumbnail: ImageFormatType;
      };
      hash: string;
      ext: string;
      mime: string;
      size: number;
      url: string;
      previewUrl: string | null;
      provider: string;
      provider_metadata: string | null;
      createdAt: string; // ISO date-time string
      updatedAt: string; // ISO date-time string
      publishedAt: string; // ISO date-time string
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    localizations: Array<any>; // Adjust if localization data structure is known
  };
  
  type ImageFormatType = {
    ext: string;
    url: string;
    hash: string;
    mime: string;
    name: string;
    path: string | null;
    size: number;
    width: number;
    height: number;
    sizeInBytes: number;
  }; */