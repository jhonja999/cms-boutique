import Link from "next/link";
import { buttonVariants } from "./ui/button";

const BannerDiscount = () => {
    return ( 
    <div className="p-5 sm:p-20 text-center">
        <h2 className="uppercase font-black text-2xl text-primary">Consigue hasta un -25%</h2>
        <h3>-20% al gastar 100 o -25% al gastar 150. USA el CODIGO DEV</h3>
        <div className="max-w-md mx-auto sm:flex justify-center gap-8 mt-5">
            <Link href="#" className={buttonVariants()}>Comprar</Link>
            <Link href="#" className={buttonVariants({variant:"outline"})}>Más Información</Link>
        </div>

    </div>
     );
}
 
export default BannerDiscount;