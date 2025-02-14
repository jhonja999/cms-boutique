import { useGetProductField } from "@/api/getProductField";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import ClearFiltersButton from "@/components/shared/ClearCategoyFiltersButton"; // ✅ Importa el nuevo botón
import { FilterTypes } from "@/types/filters";

type FilterTasteProps = {
  setFilterTaste: (taste: string) => void;
};

const FilterTaste = ({ setFilterTaste }: FilterTasteProps) => {
  const { result, loading }: FilterTypes = useGetProductField();

  return (
    <div className="my-5">
      <div className="flex justify-between items-center">
        <p className="mb-3 font-bold">Sabor</p>
        {/* ✅ Usa el nuevo botón reutilizable */}
        <ClearFiltersButton onClear={() => setFilterTaste("")} />
      </div>

      {loading && <p className="text-gray-500">Cargando sabores...</p>}

      <RadioGroup onValueChange={(value) => setFilterTaste(value)}>
        {result?.schema?.attributes?.taste?.enum?.map((taste: string) => (
          <div key={taste} className="flex items-left space-x-2">
            <RadioGroupItem value={taste} id={taste} />
            <Label htmlFor={taste}>{taste}</Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default FilterTaste;