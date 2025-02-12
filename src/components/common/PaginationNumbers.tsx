import React from "react";
import { Button } from "@/components/ui/button";

interface PaginationNumbersProps {
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
}

export const PaginationNumbers: React.FC<PaginationNumbersProps> = ({
  currentPage,
  totalPages,
  setCurrentPage,
}) => {
  // Indicador móvil
  const mobileIndicator = (
    <span className="sm:hidden text-sm">
      Página {currentPage} de {totalPages}
    </span>
  );

  // Si son 5 páginas o menos, mostrar todos los números
  if (totalPages <= 5) {
    return (
      <div className="flex items-center gap-1 sm:gap-2">
        {mobileIndicator}
        <div className="hidden sm:flex items-center gap-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <Button
              key={page}
              variant={currentPage === page ? "default" : "outline"}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </Button>
          ))}
        </div>
      </div>
    );
  }

  // Para más de 5 páginas, implementar lógica de elipsis
  const getVisiblePages = () => {
    const pages: (number | string)[] = [];

    // Siempre mostrar la primera página
    pages.push(1);

    // Agregar elipsis después de la primera página si es necesario
    if (currentPage > 3) {
      pages.push("...");
    }

    // Páginas alrededor de la página actual
    for (
      let i = Math.max(2, currentPage - 1);
      i <= Math.min(totalPages - 1, currentPage + 1);
      i++
    ) {
      if (i === 1 || i === totalPages) continue;
      pages.push(i);
    }

    // Agregar elipsis antes de la última página si es necesario
    if (currentPage < totalPages - 2) {
      pages.push("...");
    }

    // Siempre mostrar la última página
    pages.push(totalPages);

    return pages;
  };

  const visiblePages = getVisiblePages();

  return (
    <div className="flex items-center gap-1 sm:gap-2">
      {mobileIndicator}
      <div className="hidden sm:flex items-center gap-2">
        {visiblePages.map((page, index) => {
          if (page === "...") {
            return (
              <span
                key={`ellipsis-${index}`}
                className="px-1 text-muted-foreground"
              >
                ...
              </span>
            );
          }

          return (
            <Button
              key={page}
              variant={currentPage === page ? "default" : "outline"}
              onClick={() => setCurrentPage(page as number)}
            >
              {page}
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default PaginationNumbers;
