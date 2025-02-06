import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["images.unsplash.com", "localhost"], // Permite cargar imágenes desde Unsplash
    
  },
};

export default nextConfig;
