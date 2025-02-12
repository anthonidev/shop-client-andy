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
import { useState } from "react";

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Aquí irá la lógica para crear la categoría o marca
      onSuccess?.();
      onOpenChange(false);
    } catch (error) {
      console.error(`Error creating ${type}:`, error);
    } finally {
      setLoading(false);
    }
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
                  type === "category" ? "Calzado deportivo" : "Nike"
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
