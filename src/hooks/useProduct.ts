import { useState, useEffect, useCallback, useMemo } from "react";
import { useDebounce } from "use-debounce";
import { getBrands, getCategories, getProducts } from "@/server/product-action";

// Types
export interface Category {
  id: number;
  name: string;
}

export interface Brand {
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

interface ProductFilters {
  name?: string;
  categoryId?: number;
  brandId?: number;
  isActive?: boolean;
}

interface PaginationParams {
  limit: number;
  offset: number;
}

// Hook separado para manejar modales
const useModals = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [isBrandModalOpen, setIsBrandModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const openProductModal = useCallback((product: Product | null = null) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  }, []);

  return {
    isModalOpen,
    setIsModalOpen,
    isCategoryModalOpen,
    setIsCategoryModalOpen,
    isBrandModalOpen,
    setIsBrandModalOpen,
    selectedProduct,
    setSelectedProduct,
    openProductModal,
  };
};

export function useProduct(initialLimit: number = 10) {
  // Estados
  const [products, setProducts] = useState<ProductsResponse | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Filtros y paginación
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch] = useDebounce(searchTerm, 500);
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedBrand, setSelectedBrand] = useState<string>("all");
  const [activeFilter, setActiveFilter] = useState<string>("all");

  // Modales
  const modals = useModals();

  // Memoizar los filtros actuales
  const currentFilters = useMemo(
    (): ProductFilters => ({
      name: debouncedSearch || undefined,
      categoryId:
        selectedCategory !== "all" ? Number(selectedCategory) : undefined,
      brandId: selectedBrand !== "all" ? Number(selectedBrand) : undefined,
      isActive: activeFilter !== "all" ? activeFilter === "true" : undefined,
    }),
    [debouncedSearch, selectedCategory, selectedBrand, activeFilter]
  );

  // Memoizar parámetros de paginación
  const paginationParams = useMemo(
    (): PaginationParams => ({
      limit: initialLimit,
      offset: (currentPage - 1) * initialLimit,
    }),
    [currentPage, initialLimit]
  );

  // Cargar datos iniciales
  const loadInitialData = useCallback(async () => {
    try {
      const [categoriesData, brandsData] = await Promise.all([
        getCategories(),
        getBrands(),
      ]);
      setCategories(categoriesData);
      setBrands(brandsData);
      setError(null);
    } catch (error) {
      console.error("Error loading initial data:", error);
      setError(
        error instanceof Error ? error : new Error("Error loading initial data")
      );
    }
  }, []);

  useEffect(() => {
    loadInitialData();
  }, [loadInitialData]);

  // Fetch products con useCallback
  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getProducts(currentFilters, paginationParams);
      setProducts(data);
      setError(null);
    } catch (error) {
      console.error("Error fetching products:", error);
      setError(
        error instanceof Error ? error : new Error("Error fetching products")
      );
    } finally {
      setLoading(false);
    }
  }, [currentFilters, paginationParams]);

  // Efecto para fetchProducts cuando cambien los filtros
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Handlers memorizados
  const handleCategoryCreated = useCallback(async () => {
    try {
      const categoriesData = await getCategories();
      setCategories(categoriesData);
      setError(null);
    } catch (error) {
      setError(
        error instanceof Error ? error : new Error("Error updating categories")
      );
    }
  }, []);

  const handleBrandCreated = useCallback(async () => {
    try {
      const brandsData = await getBrands();
      setBrands(brandsData);
      setError(null);
    } catch (error) {
      setError(
        error instanceof Error ? error : new Error("Error updating brands")
      );
    }
  }, []);

  const handleProductSaved = useCallback(async () => {
    await fetchProducts();
    modals.setSelectedProduct(null);
  }, [fetchProducts, modals]);

  // Valores calculados memorizados
  const totalPages = useMemo(
    () => (products ? Math.ceil(products.total / initialLimit) : 0),
    [products, initialLimit]
  );

  // Reset de página al cambiar filtros
  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearch, selectedCategory, selectedBrand, activeFilter]);

  return {
    // Estados
    products,
    categories,
    brands,
    loading,
    error,
    searchTerm,
    selectedCategory,
    selectedBrand,
    activeFilter,
    currentPage,
    showFilters,
    totalPages,

    // Setters
    setSearchTerm,
    setSelectedCategory,
    setSelectedBrand,
    setActiveFilter,
    setCurrentPage,
    setShowFilters,

    // Acciones
    fetchProducts,
    handleCategoryCreated,
    handleBrandCreated,
    handleProductSaved,

    // Modal props
    ...modals,
  };
}
