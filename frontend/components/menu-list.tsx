"use client";

import * as React from "react";
import Link from "next/link";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Image from "next/image";

interface Category {
  id: number;
  categoryName: string;
  slug: string;
  categoryImage?: { url: string };
}

// 📌 Fetch de Categorías desde Strapi
const fetchCategories = async (): Promise<Category[]> => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/categories`);
    const data = await res.json();
    return data?.data || []; // Asegura que no sea undefined
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
};

const MenuList = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories().then((data) => {
      // 📌 Ordena las categorías alfabéticamente por `categoryName`
      const sortedCategories = data.sort((a, b) => a.categoryName.localeCompare(b.categoryName));
      setCategories(sortedCategories);
      setLoading(false);
    });
  }, []);

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Inicio</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <ListItem href="/" title="Home">
                Explora el mundo de la belleza en nuestra web.
              </ListItem>
              <ListItem href="/shop" title="Tienda">
                Accede a toda tu información, pedidos y más.
              </ListItem>
              <ListItem href="/offers" title="Ofertas">
                Promociones y descuentos especiales.
              </ListItem>
              <ListItem href="/accessories" title="Accesorios">
                Productos complementarios y más.
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {/* 📌 Menú dinámico de Categorías */}
        <NavigationMenuItem>
          <NavigationMenuTrigger>Categorías</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              {loading ? (
                <p className="text-center text-gray-500">Cargando categorías...</p>
              ) : categories.length > 0 ? (
                categories.map((category) => (
                  <ListItem
                    key={category.id}
                    title={category.categoryName}
                    href={`/category/${category.slug}`}
                  >
                    {/* 📌 Muestra imagen de categoría si existe */}
                    {category.categoryImage ? (
                      <Image
                        src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${category.categoryImage.url}`}
                        alt={category.categoryName}
                        className="w-16 h-16 object-cover rounded-md"
                      />
                    ) : (
                      "Explora productos en esta categoría."
                    )}
                  </ListItem>
                ))
              ) : (
                <p className="text-center text-gray-500">No hay categorías disponibles.</p>
              )}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <Link href="/docs" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Documentación
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default MenuList;

// 📌 Componente ListItem para los enlaces
const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{children}</p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});

ListItem.displayName = "ListItem";
