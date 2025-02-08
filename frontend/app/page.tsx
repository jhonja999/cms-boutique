import CarouselTextBanner from "@/components/carousel-text-banner";
import FeaturedProducts from "@/components/featured-products";
import BannerDiscount from "@/components/banner-discount";
import ChooseCategory from "@/components/choose-category";
import BannerProduct from "@/components/banner-product";

async function getStrapiData(path:string) {
  const baseUrl="http://localhost:1337";
  try {
    const response = await fetch(baseUrl + path);
    const data = await response.json();
    return data;
    
  } catch (error) {
    console.error(error)
  }
}


export default async function Home() {
const strapiData = await getStrapiData("/api/home-page");
console.log(strapiData);

  return (
    <main>
      <CarouselTextBanner />
      <FeaturedProducts />
      <BannerDiscount/>
      <ChooseCategory/>
      <BannerProduct/>
    </main>
   
  );
}
