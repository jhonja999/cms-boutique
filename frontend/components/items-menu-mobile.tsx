import { Menu } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import Link from "next/link";

const ItemsMenuMobile = () => {
  return (
    <Popover>
      <PopoverTrigger>
        <Menu />
      </PopoverTrigger>
      <PopoverContent>
        <ul className="flex flex-col gap-2 p-4">            
          <li>
            <Link href="/categories/verano">Verano</Link>
          </li>
          <li>
            <Link href="/categories/otono">Otoño</Link>
          </li>
          <li>
            <Link href="/categories/invierno">Invierno</Link>
          </li>
          <li>
            <Link href="/categories/primavera">Primavera</Link>
          </li>
          <li>
            <Link href="/categories/tabs">Tabs</Link>
          </li>
          <li>
            <Link href="/categories/tooltip">Tooltip</Link>
          </li>
        </ul>
      </PopoverContent>
    </Popover>
  );
};

export default ItemsMenuMobile;
