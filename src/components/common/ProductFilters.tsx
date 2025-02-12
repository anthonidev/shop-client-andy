import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, X, SlidersHorizontal } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import FilterSelect from "./FilterSelect";
import ActiveFilters from "./ActiveFilters";
import { Brand, Category } from "@/hooks/useProduct";

interface ProductFiltersProps {
  searchTerm: string;
  selectedCategory: string;
  selectedBrand: string;
  activeFilter: string;
  categories: Brand[];
  brands: Category[];
  showFilters: boolean;
  setSearchTerm: (term: string) => void;
  setSelectedCategory: (category: string) => void;
  setSelectedBrand: (brand: string) => void;
  setActiveFilter: (filter: string) => void;
  setShowFilters: (show: boolean) => void;
  setIsCategoryModalOpen: (open: boolean) => void;
  setIsBrandModalOpen: (open: boolean) => void;
}

export const ProductFilters: React.FC<ProductFiltersProps> = ({
  searchTerm,
  selectedCategory,
  selectedBrand,
  activeFilter,
  categories,
  brands,
  showFilters,
  setSearchTerm,
  setSelectedCategory,
  setSelectedBrand,
  setActiveFilter,
  setShowFilters,
  setIsCategoryModalOpen,
  setIsBrandModalOpen,
}) => {
  return (
    <Card>
      <CardHeader className="space-y-1">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Filtros</CardTitle>
            <CardDescription>
              Busca y filtra productos según tus necesidades
            </CardDescription>
          </div>
          <Button
            variant="outline"
            className="md:hidden"
            onClick={() => setShowFilters(!showFilters)}
          >
            <SlidersHorizontal className="h-4 w-4 mr-2" />
            Filtros
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="relative w-full mb-4">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar productos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8 w-full"
          />
        </div>

        <div
          className={`space-y-4 md:space-y-0 md:grid md:grid-cols-3 md:gap-4 ${
            showFilters ? "block" : "hidden md:grid"
          }`}
        >
          <FilterSelect
            value={selectedCategory}
            onChange={setSelectedCategory}
            options={categories}
            placeholder="Categoría"
            allLabel="Todas las categorías"
            onAddNew={() => setIsCategoryModalOpen(true)}
          />

          <FilterSelect
            value={selectedBrand}
            onChange={setSelectedBrand}
            options={brands}
            placeholder="Marca"
            allLabel="Todas las marcas"
            onAddNew={() => setIsBrandModalOpen(true)}
          />

          <Select value={activeFilter} onValueChange={setActiveFilter}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Estado" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos los estados</SelectItem>
              <SelectItem value="true">Activos</SelectItem>
              <SelectItem value="false">Inactivos</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <ActiveFilters
          selectedCategory={selectedCategory}
          selectedBrand={selectedBrand}
          activeFilter={activeFilter}
          categories={categories}
          brands={brands}
          onRemoveCategory={() => setSelectedCategory("all")}
          onRemoveBrand={() => setSelectedBrand("all")}
          onRemoveActive={() => setActiveFilter("all")}
        />
      </CardContent>
    </Card>
  );
};
