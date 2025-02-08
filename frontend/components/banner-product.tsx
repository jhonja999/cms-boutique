import Link from "next/link";
import { buttonVariants } from "./ui/button";

const BannerProduct = () => {
  return (
    <>
      <div className="mt-4 text-center">
        <p>Sumérgete en una experiencia única</p>
        <h4 className="mt-2 text-5xl font-extrabold uppercase">PRODUCTO EXCELENTE</h4>
        <p className="my-2 text-sm">Despierta tus sentidos</p>
        <Link href="#" className={buttonVariants()}>Comprar</Link>
      </div>
      <div className="h-[450px] bg-bottom bg-cover lg:h-[900px] bg-[url('/slider-image.webp')] mt-5"> {/*('/slider-image.webp') placeholder slider producto home */}
      </div>
    </>
  );
};

export default BannerProduct;