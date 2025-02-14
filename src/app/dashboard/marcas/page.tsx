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
import { Brand } from "@/hooks/useProduct";
import { getBrands } from "@/server/product-action";
import { useCallback, useEffect, useState } from "react";

export default function BrandsPage() {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null);

  const fetchBrands = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getBrands(false);
      setBrands(data);
    } catch (error) {
      console.error("Error fetching brands:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBrands();
  }, [fetchBrands]);

  const handleBrandSaved = useCallback(async () => {
    await fetchBrands();
    setSelectedBrand(null);
    setIsModalOpen(false);
  }, [fetchBrands]);

  const openModal = useCallback((brand: Brand | null = null) => {
    setSelectedBrand(brand);
    setIsModalOpen(true);
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <PageHeader
        title="Marcas"
        buttonLabel="Nueva Marca"
        description="Gestiona las marcas de tus productos"
        onNewProduct={() => {
          openModal();
        }}
      />
      <EntityModal
        type="brand"
        entity={selectedBrand}
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        onSuccess={handleBrandSaved}
      />
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50%]">Marca</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>

            {loading ? (
              <LoadingState />
            ) : brands.length === 0 ? (
              <EmptyState />
            ) : (
              <TableBody>
                {brands.map((brand) => (
                  <TableRow key={brand.id}>
                    <TableCell>
                      <div className="flex gap-3">
                        <div className="flex flex-col min-w-0">
                          <span className="font-medium truncate">
                            {brand.name}
                          </span>
                        </div>
                      </div>
                    </TableCell>

                    <TableCell>
                      <Badge
                        variant={brand.isActive ? "default" : "destructive"}
                      >
                        {brand.isActive ? "Activo" : "Inactivo"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => openModal(brand)}
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
