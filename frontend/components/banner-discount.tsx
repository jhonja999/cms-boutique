import Link from "next/link";
import { buttonVariants } from "./ui/button";

/**
 * @component BannerDiscount
 * @description Componente de banner promocional que muestra información de descuentos y botones de llamada a la acción.
 * El componente muestra una oferta de descuento de hasta 25% con umbrales específicos de gasto y un código promocional.
 * 
 * @returns {JSX.Element} Un banner responsive con información de descuentos y botones de acción
 * 
 * Características:
 * - Muestra un titular principal de descuento
 * - Presenta condiciones detalladas del descuento
 * - Proporciona dos botones CTA: "Comprar" y "Más Información"
 * - Diseño responsive con diferentes espaciados para móvil/escritorio
 * - Utiliza variantes de botones personalizados de los componentes UI
 * 
 * Estructura de clases:
 * - Contenedor principal: padding responsive (p-5 en móvil, p-20 en desktop)
 * - Título: texto primario, negrita y mayúsculas
 * - Contenedor de botones: centrado con ancho máximo y espaciado entre botones
 * 
 * @example
 * ```jsx
 * <BannerDiscount />
 * ```
 */
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
