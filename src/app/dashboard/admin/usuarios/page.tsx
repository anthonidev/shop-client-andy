"use client";

import EmptyState from "@/components/common/EmptyState";
import LoadingState from "@/components/common/LoadingState";
import PageHeader from "@/components/common/PageHeader";
import { UserModal } from "@/components/common/UserModal";
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
import { getUsers } from "@/server/user-action";
import { UserResponse } from "@/types/user.types";
import { useCallback, useEffect, useState } from "react";

export default function UsersPage() {
  const [users, setUsers] = useState<UserResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserResponse | null>(null);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getUsers();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleCategorySaved = useCallback(async () => {
    await fetchUsers();
    setSelectedUser(null);
    setIsModalOpen(false);
  }, [fetchUsers]);

  const openModal = useCallback((user: UserResponse | null = null) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <PageHeader
        title="Usuarios"
        buttonLabel="Nuevo Usuario"
        description="Gestiona los usuarios de la tienda"
        onNewProduct={() => {
          openModal();
        }}
      />
      <UserModal
        user={selectedUser}
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        onSuccess={handleCategorySaved}
      />
      <Card className="">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50%]">Nombre</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Roles</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>

            {loading ? (
              <LoadingState />
            ) : users.length === 0 ? (
              <EmptyState />
            ) : (
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className="flex gap-3">
                        <div className="flex flex-col min-w-0">
                          <span className="font-medium truncate">
                            {user.fullName}
                          </span>
                        </div>
                      </div>
                    </TableCell>

                    <TableCell>
                      <Badge
                        variant={user.isActive ? "default" : "destructive"}
                      >
                        {user.isActive ? "Activo" : "Inactivo"}
                      </Badge>
                    </TableCell>
                    <TableCell>{user.roles.join(", ")}</TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => openModal(user)}
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
