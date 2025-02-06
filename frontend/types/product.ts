// products.ts
export type ProductType = {
  documentId: number; // Unique identifier for the product
  productName: string;
  slug: string;
  description: string;
  active: boolean;
  isFeatured: boolean;
  taste: string;
  origin: string;
  price: number;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  publishedAt: string; // ISO date string
  locale: string; // Language/locale (e.g., "es-PE")
  images: {
    data: {
      id: number;
      attributes: {
        name: string;
        url: string;
        formats?: {
          thumbnail: {
            url: string;
          };
        };
      };
    }[];
  };
  category: {
    data: {
      id: number;
      attributes: {
        categoryName: string;
        slug: string;
      };
    };
  };
  localizations?: {
    data: {
      id: number;
      attributes: {
        locale: string;
      };
    }[];
  };
};