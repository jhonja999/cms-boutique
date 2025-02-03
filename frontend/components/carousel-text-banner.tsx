"use client";
import { useRouter } from "next/navigation";
import { Carousel, CarouselContent, CarouselItem } from "./ui/carousel";
import { Card, CardContent } from "./ui/card";
import Autoplay from 'embla-carousel-autoplay'

export const dataCarouselTop = [
  {
    id: 1,
    title: "envío en 48hs",
    description: "Desde cualquier lugar de la ciudad",
    link: "/search?term=popular",
  },
  {
    id: 2,
    title: "devoluciones gratis",
    description: "En todos los productos",
    link: "/search?term=returns",
  },
  {
    id: 3,
    title: "soporte 24/7",
    description: "Atención al cliente todo el día",
    link: "/search?term=support",
  },
];

const CarouselTextBanner = () => {
  const router = useRouter();
  const plugin = Autoplay({ delay: 2500 }) //ms

  return (
    <div className="bg-gray-200 dark:bg-primary">
      <Carousel className="w-full max-w-4xl mx-auto" plugins={[plugin]}>
        <CarouselContent>
          {dataCarouselTop.map(({ id, title, description, link }) => (
            <CarouselItem key={id} onClick={() => router.push(link)}>
              <div>
                <Card className="shadow-none border-none bg-transparent">
                  <CardContent className="flex flex-col justify-center p-2 items-center">
                    <p className="smd:text-lg text-wrap dark:text-secondary">
                      {title}
                    </p>
                    <p className="text-sm sm:text-sm text-wrap dark:bg-secondary">
                      {description}
                    </p>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default CarouselTextBanner;
