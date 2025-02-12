import { X } from "lucide-react";
import { Badge } from "../ui/badge";

type Props = {
  selectedCategory: string;
  selectedBrand: string;
  activeFilter: string;
  categories: Array<{ id: number; name: string }>;
  brands: Array<{ id: number; name: string }>;
  onRemoveCategory: () => void;
  onRemoveBrand: () => void;
  onRemoveActive: () => void;
};

const ActiveFilters = ({
  selectedCategory,
  selectedBrand,
  activeFilter,
  categories,
  brands,
  onRemoveCategory,
  onRemoveBrand,
  onRemoveActive,
}: Props) => (
  <div className="flex flex-wrap gap-2 mt-4">
    {selectedCategory !== "all" && (
      <Badge variant="secondary" className="gap-1">
        {categories.find((c) => c.id.toString() === selectedCategory)?.name}
        <X className="h-3 w-3 cursor-pointer" onClick={onRemoveCategory} />
      </Badge>
    )}
    {selectedBrand !== "all" && (
      <Badge variant="secondary" className="gap-1">
        {brands.find((b) => b.id.toString() === selectedBrand)?.name}
        <X className="h-3 w-3 cursor-pointer" onClick={onRemoveBrand} />
      </Badge>
    )}
    {activeFilter !== "all" && (
      <Badge variant="secondary" className="gap-1">
        {activeFilter === "true" ? "Activos" : "Inactivos"}
        <X className="h-3 w-3 cursor-pointer" onClick={onRemoveActive} />
      </Badge>
    )}
  </div>
);

export default ActiveFilters;
