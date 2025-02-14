// EntityModal.tsx
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { createEntity, updateEntity } from "@/server/product-action";
import { useToast } from "@/hooks/use-toast";
import { Brand, Category } from "@/hooks/useProduct";

interface EntityModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  type: "category" | "brand";
  entity?: (Category | Brand) | null;
  onSuccess?: () => void;
}

export function EntityModal({
  open,
  onOpenChange,
  type,
  entity,
  onSuccess,
}: EntityModalProps) {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const isEditing = !!entity;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const isActive = formData.get("isActive") === "true";

    try {
      if (isEditing && entity) {
        await updateEntity(entity.id, { name, isActive }, type);
        toast({
          title:
            type === "category" ? "Categoría actualizada" : "Marca actualizada",
          description: `La ${
            type === "category" ? "categoría" : "marca"
          } se ha actualizado correctamente`,
        });
      } else {
        await createEntity(name, type);
        toast({
          title: type === "category" ? "Categoría creada" : "Marca creada",
          description: `La ${
            type === "category" ? "categoría" : "marca"
          } se ha creado correctamente`,
        });
      }
      onSuccess?.();
      onOpenChange(false);
    } catch (err) {
      toast({
        title: "Error",
        description: err instanceof Error ? err.message : "Error desconocido",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getTitle = () => {
    if (isEditing) {
      return type === "category" ? "Editar Categoría" : "Editar Marca";
    }
    return type === "category" ? "Nueva Categoría" : "Nueva Marca";
  };

  const getDescription = () => {
    if (isEditing) {
      return type === "category"
        ? "Modifica los detalles de la categoría"
        : "Modifica los detalles de la marca";
    }
    return type === "category"
      ? "Añade una nueva categoría de productos"
      : "Añade una nueva marca de productos";
  };

  const getPlaceholder = () => {
    return type === "category" ? "Ej: Gaseosas" : "Ej: Coca Cola";
  };

  const getButtonText = () => {
    if (loading) {
      return isEditing ? "Actualizando..." : "Creando...";
    }
    return isEditing ? "Actualizar" : "Crear";
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[400px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>{getTitle()}</DialogTitle>
            <DialogDescription>{getDescription()}</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Nombre</Label>
              <Input
                id="name"
                name="name"
                defaultValue={entity?.name || ""}
                placeholder={getPlaceholder()}
                required
              />
            </div>

            {isEditing && (
              <div className="flex items-center justify-between">
                <Label htmlFor="isActive">Estado</Label>
                <input
                  type="hidden"
                  name="isActive"
                  value={entity?.isActive ? "true" : "false"}
                />
                <Switch
                  id="isActive"
                  name="isActive"
                  defaultChecked={entity?.isActive}
                  onCheckedChange={(checked) => {
                    const input = document.querySelector(
                      'input[name="isActive"]'
                    ) as HTMLInputElement;
                    if (input) input.value = checked ? "true" : "false";
                  }}
                />
              </div>
            )}
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
              {loading && <span className="animate-spin mr-2">○</span>}
              {getButtonText()}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
