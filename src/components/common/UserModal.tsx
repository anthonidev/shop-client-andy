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
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { createUser, updateUser } from "@/server/user-action";
import { UserResponse } from "@/types/user.types";
import { useEffect, useState } from "react";

interface UserModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user?: UserResponse | null;
  onSuccess?: () => void;
}

const AVAILABLE_ROLES = [
  { value: "admin", label: "Administrador" },
  { value: "sales", label: "Ventas" },
];

const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])[A-Za-z\d@$!%*?&]{6,}$/;

export function UserModal({
  open,
  onOpenChange,
  user,
  onSuccess,
}: UserModalProps) {
  const [loading, setLoading] = useState(false);
  const [selectedRoles, setSelectedRoles] = useState<string[]>(
    user?.roles || []
  );
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { toast } = useToast();
  const isEditing = !!user;

  const validateForm = (formData: FormData): boolean => {
    const newErrors: Record<string, string> = {};
    const username = formData.get("username") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const fullName = formData.get("fullName") as string;

    if (username.length < 4 || username.length > 50) {
      newErrors.username =
        "El nombre de usuario debe tener entre 4 y 50 caracteres";
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "El email no es válido";
    }

    if (!isEditing || password) {
      if (!PASSWORD_REGEX.test(password)) {
        newErrors.password =
          "La contraseña debe tener al menos una letra mayúscula y una minúscula";
      }
    }

    if (fullName.length < 2 || fullName.length > 100) {
      newErrors.fullName =
        "El nombre completo debe tener entre 2 y 100 caracteres";
    }

    if (selectedRoles.length === 0) {
      newErrors.roles = "Debe seleccionar al menos un rol";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    if (!validateForm(formData)) {
      return;
    }

    setLoading(true);
    try {
      const userData = {
        username: (formData.get("username") as string).toLowerCase().trim(),
        email: (formData.get("email") as string).toLowerCase().trim(),
        fullName: formData.get("fullName") as string,
        password: formData.get("password") as string | undefined,
        isActive: formData.get("isActive") === "true",
        roles: selectedRoles,
      };

      if (isEditing && user) {
        // Si no se proporciona contraseña en edición, la eliminamos del objeto
        if (!userData.password) {
          delete userData.password;
        }

        await updateUser(user.id, userData);
        toast({
          title: "Usuario actualizado",
          description: "El usuario se ha actualizado correctamente",
        });
      } else {
        console.log("Crear usuario", userData);
        await createUser(userData);
        toast({
          title: "Usuario creado",
          description: "El usuario se ha creado correctamente",
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

  useEffect(() => {
    if (user) {
      setSelectedRoles(user.roles);
    }
  }, [user]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>
              {isEditing ? "Editar Usuario" : "Nuevo Usuario"}
            </DialogTitle>
            <DialogDescription>
              {isEditing
                ? "Modifica los detalles del usuario"
                : "Añade un nuevo usuario al sistema"}
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="username">Nombre de usuario</Label>
              <Input
                id="username"
                name="username"
                defaultValue={user?.username || ""}
                placeholder="johndoe"
                required
              />
              {errors.username && (
                <span className="text-sm text-destructive">
                  {errors.username}
                </span>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="email">Correo electrónico</Label>
              <Input
                id="email"
                name="email"
                type="email"
                defaultValue={user?.email || ""}
                placeholder="john@example.com"
                required
              />
              {errors.email && (
                <span className="text-sm text-destructive">{errors.email}</span>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="fullName">Nombre completo</Label>
              <Input
                id="fullName"
                name="fullName"
                defaultValue={user?.fullName || ""}
                placeholder="John Doe"
                required
              />
              {errors.fullName && (
                <span className="text-sm text-destructive">
                  {errors.fullName}
                </span>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="password">
                Contraseña{" "}
                {isEditing && "(dejar en blanco para mantener la actual)"}
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                required={!isEditing}
                placeholder={isEditing ? "••••••••" : "Ingrese la contraseña"}
              />
              {errors.password && (
                <span className="text-sm text-destructive">
                  {errors.password}
                </span>
              )}
            </div>

            <div className="grid gap-2">
              <Label>Roles</Label>
              {}
              <div className="flex flex-wrap gap-2">
                {AVAILABLE_ROLES.map((role) => (
                  <Button
                    key={role.value}
                    type="button"
                    variant={
                      selectedRoles.includes(role.value) ? "default" : "outline"
                    }
                    onClick={() => {
                      setSelectedRoles((prev) =>
                        prev.includes(role.value)
                          ? prev.filter((r) => r !== role.value)
                          : [...prev, role.value]
                      );
                    }}
                  >
                    {role.label}
                  </Button>
                ))}
              </div>
              {errors.roles && (
                <span className="text-sm text-destructive">{errors.roles}</span>
              )}
            </div>

            {isEditing && (
              <div className="flex items-center justify-between">
                <Label htmlFor="isActive">Estado</Label>
                <input
                  type="hidden"
                  name="isActive"
                  value={user?.isActive ? "true" : "false"}
                />
                <Switch
                  id="isActive"
                  name="isActive"
                  defaultChecked={user?.isActive}
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
              {isEditing ? "Actualizar" : "Crear"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
