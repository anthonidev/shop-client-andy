import { Badge } from "../ui/badge";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Product } from "@/app/dashboard/page";

const ProductCard = ({ product }: { product: Product }) => (
  <Card className="overflow-hidden">
    <div className="relative h-48 w-full">
      <img
        src={product.photo}
        alt={product.name}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
        <Badge
          className="absolute top-2 right-2"
          variant={product.isActive ? "secondary" : "default"}
        >
          {product.isActive ? "Activo" : "Inactivo"}
        </Badge>
      </div>
    </div>
    <CardContent className="grid gap-2.5 p-4">
      <h3 className="font-semibold line-clamp-2">{product.name}</h3>
      <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
        <Badge variant="outline">{product.category.name}</Badge>
        <Badge variant="outline">{product.brand.name}</Badge>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-lg font-bold">
          ${Number(product.price).toFixed(2)}
        </span>
        <Button size="sm" variant="ghost">
          Editar
        </Button>
      </div>
    </CardContent>
  </Card>
);

export default ProductCard;
