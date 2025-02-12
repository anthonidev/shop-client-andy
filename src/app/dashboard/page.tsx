"use client";

import { EntityModal } from "@/components/common/EntityModal";
import PageHeader from "@/components/common/PageHeader";
import ProductCardList from "@/components/common/ProductCardList";
import { ProductFilters } from "@/components/common/ProductFilters";
import { ProductModal } from "@/components/common/ProductModal";
import { ProductPagination } from "@/components/common/ProductPagination";
import { ProductTable } from "@/components/common/ProductTable";
import { Card, CardContent } from "@/components/ui/card";
import { useProduct } from "@/hooks/useProduct";

export default function ProductsPage() {
  const {
    products,
    categories,
    brands,
    loading,
    searchTerm,
    selectedCategory,
    selectedBrand,
    activeFilter,
    currentPage,
    showFilters,
    totalPages,
    setSearchTerm,
    setSelectedCategory,
    setSelectedBrand,
    setActiveFilter,
    setCurrentPage,
    setShowFilters,
    isModalOpen,
    setIsModalOpen,

    handleBrandCreated,
    handleCategoryCreated,
    isBrandModalOpen,
    isCategoryModalOpen,
    setIsBrandModalOpen,
    setIsCategoryModalOpen,

    selectedProduct,
    handleProductSaved,
    setSelectedProduct,
  } = useProduct();

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Modales */}
      <ProductModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        categories={categories}
        brands={brands}
        isBrandModalOpen={isBrandModalOpen}
        setIsBrandModalOpen={setIsBrandModalOpen}
        isCategoryModalOpen={isCategoryModalOpen}
        setIsCategoryModalOpen={setIsCategoryModalOpen}
        onBrandCreated={handleBrandCreated}
        onCategoryCreated={handleCategoryCreated}
        product={selectedProduct}
        onSuccess={handleProductSaved}
      />
      <EntityModal
        type="category"
        open={isCategoryModalOpen}
        onOpenChange={setIsCategoryModalOpen}
        onSuccess={handleCategoryCreated}
      />
      <EntityModal
        type="brand"
        open={isBrandModalOpen}
        onOpenChange={setIsBrandModalOpen}
        onSuccess={handleBrandCreated}
      />

      {/* Header */}
      <PageHeader
        onNewProduct={() => {
          setSelectedProduct(null);
          setIsModalOpen(true);
        }}
      />

      {/* Filtros */}
      <ProductFilters
        searchTerm={searchTerm}
        selectedCategory={selectedCategory}
        selectedBrand={selectedBrand}
        activeFilter={activeFilter}
        categories={categories}
        brands={brands}
        showFilters={showFilters}
        setSearchTerm={setSearchTerm}
        setSelectedCategory={setSelectedCategory}
        setSelectedBrand={setSelectedBrand}
        setActiveFilter={setActiveFilter}
        setShowFilters={setShowFilters}
        setIsCategoryModalOpen={setIsCategoryModalOpen}
        setIsBrandModalOpen={setIsBrandModalOpen}
      />

      {/* Vista móvil */}
      <ProductCardList
        products={products?.items}
        onEdit={(product) => {
          setSelectedProduct(product);
          setIsModalOpen(true);
        }}
        className="md:hidden"
      />

      {/* Vista desktop */}
      <Card className="hidden md:block">
        <CardContent className="p-0">
          <ProductTable
            products={products?.items || []}
            loading={loading}
            onEdit={(product) => {
              setSelectedProduct(product);
              setIsModalOpen(true);
            }}
          />
        </CardContent>
      </Card>

      {/* Paginación */}
      <ProductPagination
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}
