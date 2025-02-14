import { Button } from "@/components/ui/button";
import { XCircle } from "lucide-react";

type ClearCategoryFiltersButtonProps = {
  onClear: () => void;
  label?: string; // ✅ Texto opcional para el botón
};

const ClearCategoryFiltersButton = ({
  onClear,
  label = "Limpiar filtros",
}: ClearCategoryFiltersButtonProps) => {
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={onClear}
      className="flex items-center gap-2 text-sm text-gray-700 border-gray-300 
                 hover:bg-red-50 hover:text-red-600 hover:border-red-400 transition-all duration-200"
      aria-label="Eliminar filtros"
    >
      <XCircle className="w-5 h-5 text-red-400 hover:text-red-600 transition-colors" />
      {label}
    </Button>
  );
};

export default ClearCategoryFiltersButton;
