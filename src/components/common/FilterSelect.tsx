import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

type Props = {
  value: string;
  onChange: (value: string) => void;
  options: { id: number; name: string }[];
  placeholder: string;
  allLabel: string;
  onAddNew: () => void;
};

const FilterSelect = ({
  value,
  onChange,
  options,
  placeholder,
  allLabel,
  onAddNew,
}: Props) => (
  <div className="flex gap-2">
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">{allLabel}</SelectItem>
        {options.map((option) => (
          <SelectItem key={option.id} value={option.id.toString()}>
            {option.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>

    <Button type="button" size="icon" variant="outline" onClick={onAddNew}>
      <Plus className="h-4 w-4" />
    </Button>
  </div>
);

export default FilterSelect;
