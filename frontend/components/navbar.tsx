// navbar.tsx
"use client";
import { BaggageClaim, Heart, ShoppingCart, User } from "lucide-react";
import { useRouter } from "next/navigation";
import MenuList from "./menu-list";
import ItemsMenuMobile from "./items-menu-mobile";
import ToggleTheme from "./toggle-theme";
import { useCart } from "@/hooks/use-cart";
import { useLovedProducts } from "@/hooks/use-loved-products"; // Importa el hook de favoritos

const Navbar = () => {
  const router = useRouter();
  const cart = useCart();
  const lovedProducts = useLovedProducts(); // Usa el hook de favoritos

  return (
    <div className="flex items-center justify-between p-4 mx-auto cursor-pointer sm:max-w-4xl md:max-w-6xl">
      {/* Logo */}
      <h1
        className="text-3xl"
        onClick={() => router.push("/")}
      >
        CMS
        <span className="font-bold">Boutique</span>
      </h1>

      {/* Menú para pantallas grandes */}
      <div className="items-center justify-between hidden sm:flex">
        <MenuList />
      </div>

      {/* Menú para pantallas pequeñas */}
      <div className="flex sm:hidden">
        <ItemsMenuMobile />
      </div>

      {/* Iconos de la barra de navegación */}
      <div className="flex items-center justify-between gap-2 sm:gap-7">
        {/* Carrito de compras */}
        {cart.items.length === 0 ? (
          <ShoppingCart strokeWidth="1" className="cursor-pointer" onClick={() => router.push("/cart")} />
        ) : (
          <div className="flex gap-1" onClick={() => router.push("/cart")}>
            <BaggageClaim strokeWidth={1} className="cursor-pointer" />
            <span>{cart.items.length}</span>
          </div>
        )}

        {/* Corazón (Favoritos) */}
        {lovedProducts.getTotalLovedItems() > 0 ? (
          <Heart strokeWidth="1" fill="black" className="cursor-pointer" onClick={() => router.push("/loved-products")} />
        ) : (
          <Heart strokeWidth="1" className="cursor-pointer" onClick={() => router.push("/loved-products")} />
        )}

        {/* Usuario */}
        <User strokeWidth="1" className="cursor-pointer" />

        {/* Cambio de tema */}
        <ToggleTheme />
      </div>
    </div>
  );
};

export default Navbar;