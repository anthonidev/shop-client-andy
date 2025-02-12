"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Product } from "@/hooks/useProduct";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { EntityModal } from "./EntityModal";
import { ImageUpload } from "./ImageUpload";

interface ProductModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product?: Product | null;
  categories: Array<{ id: number; name: string }>;
  brands: Array<{ id: number; name: string }>;
  isCategoryModalOpen: boolean;
  setIsCategoryModalOpen: (open: boolean) => void;
  isBrandModalOpen: boolean;
  setIsBrandModalOpen: (open: boolean) => void;
  onCategoryCreated: () => void;
  onBrandCreated: () => void;
  onSuccess?: () => void;
}

export function ProductModal({
  open,
  onOpenChange,
  product,
  categories,
  brands,
  onBrandCreated,
  onCategoryCreated,
  isCategoryModalOpen,
  setIsCategoryModalOpen,
  isBrandModalOpen,
  setIsBrandModalOpen,
  onSuccess,
}: ProductModalProps) {
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // Resetear estado cuando se abre/cierra el modal
  useEffect(() => {
    if (!open) {
      setImageFile(null);
      setImagePreview(null);
    } else if (product?.photo) {
      setImagePreview(product.photo);
    }
  }, [open, product]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData(e.currentTarget);

      // Si hay una imagen nueva, añadirla al FormData
      if (imageFile) {
        formData.append("photo", imageFile);
      }

      if (product) {
        // Lógica de edición
        formData.append("id", product.id.toString());
        // await updateProduct(formData);
      } else {
        // Lógica de creación
        // await createProduct(formData);
      }

      onSuccess?.();
      onOpenChange(false);
    } catch (error) {
      console.error("Error saving product:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>
              {product ? "Editar Producto" : "Nuevo Producto"}
            </DialogTitle>
            <DialogDescription>
              {product
                ? "Modifica los detalles del producto"
                : "Completa los detalles del nuevo producto"}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Nombre del producto</Label>
              <Input
                id="name"
                name="name"
                defaultValue={product?.name}
                placeholder="Ej: Zapatillas deportivas"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="price">Precio</Label>
              <div className="relative">
                <span className="absolute left-3 top-2.5">S/</span>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  step="0.01"
                  min="0"
                  defaultValue={product?.price}
                  placeholder="0.00"
                  className="pl-8"
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label>Categoría</Label>
                <div className="flex gap-2">
                  <Select
                    name="categoryId"
                    defaultValue={product?.category.id.toString()}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem
                          key={category.id}
                          value={category.id.toString()}
                        >
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button
                    type="button"
                    size="icon"
                    variant="outline"
                    onClick={() => setIsCategoryModalOpen(true)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="grid gap-2">
                <Label>Marca</Label>
                <div className="flex gap-2">
                  <Select
                    name="brandId"
                    defaultValue={product?.brand.id.toString()}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona" />
                    </SelectTrigger>
                    <SelectContent>
                      {brands.map((brand) => (
                        <SelectItem key={brand.id} value={brand.id.toString()}>
                          {brand.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button
                    type="button"
                    size="icon"
                    variant="outline"
                    onClick={() => setIsBrandModalOpen(true)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
            <ImageUpload onChange={setImageFile} defaultImage={imagePreview} />
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? (
                <>
                  <span className="animate-spin mr-2">○</span>
                  {product ? "Guardando..." : "Creando..."}
                </>
              ) : product ? (
                "Guardar Cambios"
              ) : (
                "Crear Producto"
              )}
            </Button>
          </DialogFooter>
        </form>

        <EntityModal
          type="category"
          open={isCategoryModalOpen}
          onOpenChange={setIsCategoryModalOpen}
          onSuccess={onCategoryCreated}
        />

        <EntityModal
          type="brand"
          open={isBrandModalOpen}
          onOpenChange={setIsBrandModalOpen}
          onSuccess={onBrandCreated}
        />
      </DialogContent>
    </Dialog>
  );
}
