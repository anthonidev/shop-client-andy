"use client";

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
import { useState } from "react";
import { createEntity } from "@/server/product-action";
import { useToast } from "@/hooks/use-toast";

interface EntityModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  type: "category" | "brand";
  onSuccess?: () => void;
}

export function EntityModal({
  open,
  onOpenChange,
  type,
  onSuccess,
}: EntityModalProps) {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    await createEntity(name, type)
      .then(() => {
        onSuccess?.();
        onOpenChange(false);
        toast({
          title: "Entidad creada",
          description: `La ${type} se ha creado correctamente`,
        });
      })
      .catch((err) => {
        toast({
          title: "Error",
          description: err.message,
          variant: "destructive",
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const title = type === "category" ? "Nueva Categoría" : "Nueva Marca";
  const description =
    type === "category"
      ? "Añade una nueva categoría de productos"
      : "Añade una nueva marca de productos";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[400px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Nombre</Label>
              <Input
                id="name"
                name="name"
                placeholder={`Ej: ${
                  type === "category" ? "Gaseosas" : "Coca cola"
                }`}
                required
              />
            </div>
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
                  Creando...
                </>
              ) : (
                "Crear"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
