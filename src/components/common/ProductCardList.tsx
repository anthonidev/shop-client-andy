import { Product } from "@/hooks/useProduct";
import { Loader2 } from "lucide-react";
import { ProductCard } from "./ProductCard";

interface ProductCardListProps {
  products?: Product[];
  loading?: boolean;
  onEdit: (product: Product) => void;
  className?: string;
}

export const ProductCardList: React.FC<ProductCardListProps> = ({
  products = [],
  loading = false,
  onEdit,
  className = "",
}) => {
  if (loading) {
    return (
      <div className={`flex justify-center items-center py-8 ${className}`}>
        <div className="flex items-center gap-2">
          <Loader2 className="h-4 w-4 animate-spin" />
          <span>Cargando productos...</span>
        </div>
      </div>
    );
  }

  if (!products.length) {
    return (
      <div className={`text-center py-8 text-muted-foreground ${className}`}>
        No se encontraron productos
      </div>
    );
  }

  return (
    <div className={`grid grid-cols-1 gap-4 ${className}`}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} onEdit={onEdit} />
      ))}
    </div>
  );
};

export default ProductCardList;
