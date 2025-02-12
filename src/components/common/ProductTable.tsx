import { Product } from "@/hooks/useProduct";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import EmptyState from "./EmptyState";
import LoadingState from "./LoadingState";
import ProductTableRow from "./ProductTableRow";

interface ProductTableProps {
  products: Product[];
  loading: boolean;
  onEdit: (product: Product) => void;
}

export const ProductTable: React.FC<ProductTableProps> = ({
  products,
  loading,
  onEdit,
}) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[50%]">Producto</TableHead>
          <TableHead>Precio</TableHead>
          <TableHead>Estado</TableHead>
          <TableHead className="text-right">Acciones</TableHead>
        </TableRow>
      </TableHeader>

      {loading ? (
        <LoadingState />
      ) : products.length === 0 ? (
        <EmptyState />
      ) : (
        <TableBody>
          {products.map((product) => (
            <ProductTableRow
              key={product.id}
              product={product}
              onEdit={onEdit}
            />
          ))}
        </TableBody>
      )}
    </Table>
  );
};
