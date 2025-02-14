import { useGetProductField } from "@/api/getProductField";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { FilterTypes } from "@/types/filters";
import ClearFiltersButton from "@/components/shared/ClearCategoyFiltersButton"; // ✅ Usa el botón reutilizable

type FilterOriginProps = {
  setFilterOrigin: (origin: string) => void;
};

const FilterOrigin = ({ setFilterOrigin }: FilterOriginProps) => {
  const { result, loading }: FilterTypes = useGetProductField();

  return (
    <div className="my-5">
      <div className="flex justify-between items-center">
        <p className="mb-3 font-bold">Origen</p>
        {/* ✅ Usa el nuevo botón reutilizable */}
        <ClearFiltersButton onClear={() => setFilterOrigin("")} />
      </div>

      {loading && <p className="text-gray-500">Cargando origen...</p>}

      <RadioGroup onValueChange={(value) => setFilterOrigin(value)}>
        {result?.schema?.attributes?.origin?.enum?.map((origin: string) => (
          <div key={origin} className="flex items-center space-x-2">
            <RadioGroupItem value={origin} id={origin} />
            <Label htmlFor={origin}>{origin}</Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default FilterOrigin;
