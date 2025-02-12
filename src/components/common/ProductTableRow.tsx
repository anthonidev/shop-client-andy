import { TableCell, TableRow } from "../ui/table";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Product } from "@/hooks/useProduct";

type Props = {
  product: Product;
  onEdit: (product: Product) => void;
};

const ProductTableRow = ({ product, onEdit }: Props) => (
  <TableRow>
    <TableCell>
      <div className="flex gap-3">
        <img
          src={product.photo}
          alt={product.name}
          className="h-12 w-12 rounded-lg object-cover flex-shrink-0"
        />
        <div className="flex flex-col min-w-0">
          <span className="font-medium truncate">{product.name}</span>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className="truncate">{product.brand.name}</span>
            <span className="h-1 w-1 rounded-full bg-muted-foreground/40" />
            <span className="truncate">{product.category.name}</span>
          </div>
        </div>
      </div>
    </TableCell>
    <TableCell className="font-medium">
      S/ {Number(product.price).toFixed(2)}
    </TableCell>
    <TableCell>
      <Badge variant={product.isActive ? "default" : "destructive"}>
        {product.isActive ? "Activo" : "Inactivo"}
      </Badge>
    </TableCell>
    <TableCell className="text-right">
      <Button variant="ghost" size="sm" onClick={() => onEdit(product)}>
        Editar
      </Button>
    </TableCell>
  </TableRow>
);

export default ProductTableRow;
