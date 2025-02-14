import { Product } from "@/hooks/useProduct";
import Image from "next/image";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { TableCell, TableRow } from "../ui/table";

type Props = {
  product: Product;
  onEdit: (product: Product) => void;
};

const ProductTableRow = ({ product, onEdit }: Props) => (
  <TableRow>
    <TableCell>
      <div className="flex gap-3">
        {product.photo ? (
          <Image
            src={product.photo}
            alt={product.name}
            width={80}
            height={80}
            className="h-14 w-14 rounded-lg object-cover flex-shrink-0"
          />
        ) : (
          <div className="h-20 w-20 rounded-lg bg-muted-foreground flex-shrink-0" />
        )}
        <div className="flex flex-col min-w-0">
          <span className="font-medium truncate">{product.name}</span>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className="truncate">{product.brand?.name}</span>
            <span className="h-1 w-1 rounded-full bg-muted-foreground/40" />
            <span className="truncate">{product.category?.name}</span>
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
