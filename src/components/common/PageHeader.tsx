import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import React from "react";

interface PageHeaderProps {
  title?: string;
  description?: string;
  buttonLabel?: string;
  onNewProduct: () => void;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title = "Productos",
  description = "Gestiona tu catálogo de productos",
  buttonLabel = "Nuevo Producto",
  onNewProduct,
}) => {
  return (
    <div className="flex justify-between items-center">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
        <p className="text-muted-foreground">{description}</p>
      </div>
      <Button className="gap-2" onClick={onNewProduct}>
        <Plus className="h-4 w-4" />
        {buttonLabel}
      </Button>
    </div>
  );
};

// También podemos crear una versión más genérica para reutilizar en otras páginas
interface GenericPageHeaderProps {
  title: string;
  description?: string;
  actionButton?: {
    label: string;
    onClick: () => void;
    icon?: React.ReactNode;
  };
}

export const GenericPageHeader: React.FC<GenericPageHeaderProps> = ({
  title,
  description,
  actionButton,
}) => {
  return (
    <div className="flex justify-between items-center">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
        {description && <p className="text-muted-foreground">{description}</p>}
      </div>
      {actionButton && (
        <Button className="gap-2" onClick={actionButton.onClick}>
          {actionButton.icon}
          {actionButton.label}
        </Button>
      )}
    </div>
  );
};

export default PageHeader;
