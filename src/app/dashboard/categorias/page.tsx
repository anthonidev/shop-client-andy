"use client";

import EmptyState from "@/components/common/EmptyState";
import { EntityModal } from "@/components/common/EntityModal";
import LoadingState from "@/components/common/LoadingState";
import PageHeader from "@/components/common/PageHeader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Category } from "@/hooks/useProduct";
import { getCategories } from "@/server/product-action";
import { useCallback, useEffect, useState } from "react";

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );

  const fetchCategories = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getCategories(false);
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const handleCategorySaved = useCallback(async () => {
    await fetchCategories();
    setSelectedCategory(null);
    setIsModalOpen(false);
  }, [fetchCategories]);

  const openModal = useCallback((category: Category | null = null) => {
    setSelectedCategory(category);
    setIsModalOpen(true);
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <PageHeader
        title="Categorías"
        buttonLabel="Nueva Categoría"
        description="Gestiona las categorías de tus productos"
        onNewProduct={() => {
          openModal();
        }}
      />
      <EntityModal
        type="category"
        entity={selectedCategory}
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        onSuccess={handleCategorySaved}
      />
      <Card className="">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50%]">Categoria</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>

            {loading ? (
              <LoadingState />
            ) : categories.length === 0 ? (
              <EmptyState />
            ) : (
              <TableBody>
                {categories.map((category) => (
                  <TableRow key={category.id}>
                    <TableCell>
                      <div className="flex gap-3">
                        <div className="flex flex-col min-w-0">
                          <span className="font-medium truncate">
                            {category.name}
                          </span>
                        </div>
                      </div>
                    </TableCell>

                    <TableCell>
                      <Badge
                        variant={category.isActive ? "default" : "destructive"}
                      >
                        {category.isActive ? "Activo" : "Inactivo"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => openModal(category)}
                      >
                        Editar
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            )}
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
