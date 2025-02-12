import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Product } from "@/hooks/useProduct";

interface ProductCardProps {
  product: Product;
  onEdit: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onEdit,
}) => {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex gap-4">
          <img
            src={product.photo}
            alt={product.name}
            className="h-20 w-20 rounded-lg object-cover flex-shrink-0"
          />
          <div className="flex flex-col flex-grow min-w-0">
            <div className="flex justify-between items-start gap-2">
              <h3 className="font-medium truncate">{product.name}</h3>
              <Badge variant={product.isActive ? "default" : "destructive"}>
                {product.isActive ? "Activo" : "Inactivo"}
              </Badge>
            </div>

            <div className="text-sm text-muted-foreground mt-1">
              <div className="flex items-center gap-2">
                <span className="truncate">{product.brand.name}</span>
                <span className="h-1 w-1 rounded-full bg-muted-foreground/40" />
                <span className="truncate">{product.category.name}</span>
              </div>
            </div>

            <div className="flex justify-between items-center mt-3">
              <span className="font-medium">
                S/ {Number(product.price).toFixed(2)}
              </span>
              <Button variant="ghost" size="sm" onClick={() => onEdit(product)}>
                Editar
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
