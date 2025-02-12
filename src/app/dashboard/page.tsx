"use client";

import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useDebounce } from "use-debounce";
import { Badge } from "@/components/ui/badge";
import {
  Loader2,
  Search,
  Plus,
  X,
  SlidersHorizontal,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import { getBrands, getCategories, getProducts } from "@/server/product-action";
import ProductCard from "@/components/common/ProductCard";

interface Category {
  id: number;
  name: string;
}

interface Brand {
  id: number;
  name: string;
}

export interface Product {
  id: number;
  name: string;
  price: string;
  photo: string;
  isActive: boolean;
  category: Category;
  brand: Brand;
}

interface ProductsResponse {
  items: Product[];
  total: number;
  limit: number;
  offset: number;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<ProductsResponse | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch] = useDebounce(searchTerm, 500);
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10;

  // Filtros
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedBrand, setSelectedBrand] = useState<string>("all");
  const [activeFilter, setActiveFilter] = useState<string>("all");

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const [categoriesData, brandsData] = await Promise.all([
          getCategories(),
          getBrands(),
        ]);
        setCategories(categoriesData);
        setBrands(brandsData);
      } catch (error) {
        console.error("Error loading initial data:", error);
      }
    };

    loadInitialData();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [
    debouncedSearch,
    currentPage,
    selectedCategory,
    selectedBrand,
    activeFilter,
  ]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const data = await getProducts(
        {
          name: debouncedSearch || undefined,
          categoryId:
            selectedCategory !== "all" ? Number(selectedCategory) : undefined,
          brandId: selectedBrand !== "all" ? Number(selectedBrand) : undefined,
          isActive:
            activeFilter !== "all" ? activeFilter === "true" : undefined,
        },
        {
          limit,
          offset: (currentPage - 1) * limit,
        }
      );
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const [showFilters, setShowFilters] = useState(false);

  const totalPages = products ? Math.ceil(products.total / limit) : 0;

  return (
    <div className=" max-w-7xl mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Productos</h1>
          <p className="text-muted-foreground">
            Gestiona tu catálogo de productos
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Nuevo Producto
        </Button>
      </div>
      {/* Sección de Filtros */}
      <Card>
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Filtros</CardTitle>
              <CardDescription>
                Busca y filtra productos según tus necesidades
              </CardDescription>
            </div>
            {/* Botón móvil para mostrar/ocultar filtros adicionales */}
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
          {/* Barra de búsqueda siempre visible */}
          <div className="relative w-full mb-4">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar productos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8 w-full"
            />
          </div>

          {/* Filtros adicionales - Colapsables en móvil */}
          <div
            className={`space-y-4 md:space-y-0 md:grid md:grid-cols-3 md:gap-4 
      ${showFilters ? "block" : "hidden md:grid"}`}
          >
            <Select
              value={selectedCategory}
              onValueChange={setSelectedCategory}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Categoría" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas las categorías</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id.toString()}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedBrand} onValueChange={setSelectedBrand}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Marca" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas las marcas</SelectItem>
                {brands.map((brand) => (
                  <SelectItem key={brand.id} value={brand.id.toString()}>
                    {brand.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

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

          {/* Chips de filtros activos */}
          <div className="flex flex-wrap gap-2 mt-4">
            {selectedCategory !== "all" && (
              <Badge variant="secondary" className="gap-1">
                {
                  categories.find((c) => c.id.toString() === selectedCategory)
                    ?.name
                }
                <X
                  className="h-3 w-3 cursor-pointer"
                  onClick={() => setSelectedCategory("all")}
                />
              </Badge>
            )}
            {selectedBrand !== "all" && (
              <Badge variant="secondary" className="gap-1">
                {brands.find((b) => b.id.toString() === selectedBrand)?.name}
                <X
                  className="h-3 w-3 cursor-pointer"
                  onClick={() => setSelectedBrand("all")}
                />
              </Badge>
            )}
            {activeFilter !== "all" && (
              <Badge variant="secondary" className="gap-1">
                {activeFilter === "true" ? "Activos" : "Inactivos"}
                <X
                  className="h-3 w-3 cursor-pointer"
                  onClick={() => setActiveFilter("all")}
                />
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-4 md:hidden">
        {products?.items.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <Card className="hidden md:block">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Producto</TableHead>
                <TableHead>Categoría</TableHead>
                <TableHead>Marca</TableHead>
                <TableHead>Precio</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-10">
                    <div className="flex justify-center items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Cargando productos...</span>
                    </div>
                  </TableCell>
                </TableRow>
              ) : products?.items.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-10">
                    No se encontraron productos
                  </TableCell>
                </TableRow>
              ) : (
                products?.items.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-3">
                        <img
                          src={product.photo}
                          alt={product.name}
                          className="h-10 w-10 rounded-lg object-cover"
                        />
                        <span>{product.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>{product.category.name}</TableCell>
                    <TableCell>{product.brand.name}</TableCell>
                    <TableCell>${Number(product.price).toFixed(2)}</TableCell>
                    <TableCell>
                      <Badge
                        variant={product.isActive ? "secondary" : "default"}
                      >
                        {product.isActive ? "Activo" : "Inactivo"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        Editar
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {totalPages > 1 && (
        <div className="flex flex-wrap justify-center items-center gap-2">
          {/* Botón Anterior */}
          <Button
            variant="outline"
            onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className="hidden sm:flex"
          >
            Anterior
          </Button>

          {/* Botón Anterior (móvil) */}
          <Button
            variant="outline"
            onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className="sm:hidden"
            size="icon"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <div className="flex items-center gap-1 sm:gap-2">
            {/* Primera página */}
            {currentPage > 3 && (
              <>
                <Button
                  variant={currentPage === 1 ? "default" : "outline"}
                  onClick={() => setCurrentPage(1)}
                >
                  1
                </Button>
                {currentPage > 4 && (
                  <span className="px-1 text-muted-foreground">...</span>
                )}
              </>
            )}

            {/* Páginas centrales */}
            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter((page) => {
                if (totalPages <= 5) return true;
                if (page === 1 || page === totalPages) return false;
                if (currentPage <= 3) return page <= 5;
                if (currentPage >= totalPages - 2)
                  return page >= totalPages - 4;
                return page >= currentPage - 1 && page <= currentPage + 1;
              })
              .map((page) => (
                <Button
                  key={page}
                  variant={currentPage === page ? "default" : "outline"}
                  onClick={() => setCurrentPage(page)}
                  className="hidden sm:flex"
                >
                  {page}
                </Button>
              ))}

            {/* Indicador móvil */}
            <span className="sm:hidden text-sm">
              Página {currentPage} de {totalPages}
            </span>

            {/* Última página */}
            {currentPage < totalPages - 2 && (
              <>
                {currentPage < totalPages - 3 && (
                  <span className="hidden sm:inline px-1 text-muted-foreground">
                    ...
                  </span>
                )}
                <Button
                  variant={currentPage === totalPages ? "default" : "outline"}
                  onClick={() => setCurrentPage(totalPages)}
                  className="hidden sm:flex"
                >
                  {totalPages}
                </Button>
              </>
            )}
          </div>

          {/* Botón Siguiente */}
          <Button
            variant="outline"
            onClick={() =>
              setCurrentPage((prev) => Math.min(totalPages, prev + 1))
            }
            disabled={currentPage === totalPages}
            className="hidden sm:flex"
          >
            Siguiente
          </Button>

          {/* Botón Siguiente (móvil) */}
          <Button
            variant="outline"
            onClick={() =>
              setCurrentPage((prev) => Math.min(totalPages, prev + 1))
            }
            disabled={currentPage === totalPages}
            className="sm:hidden"
            size="icon"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}
