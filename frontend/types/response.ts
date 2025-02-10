import { ImageType } from "./image";

/* eslint-disable @typescript-eslint/no-explicit-any */
export type ResponseType={
    
    result: any;
    loading: boolean;
    error: string;
    

};

  
  // Adjusting CarouselProductProps to use ImageType
  export interface CarouselProductProps {
    images: {
      data: ImageType[];
    };
  }