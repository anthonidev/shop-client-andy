"use server";

interface FilterProductDto {
  name?: string;
  categoryId?: number | string;
  brandId?: number | string;
  isActive?: boolean | string;
  minPrice?: number;
  maxPrice?: number;
}

interface PaginationDto {
  limit?: number;
  offset?: number;
}

export async function getProducts(
  filters: Partial<FilterProductDto>,
  pagination: PaginationDto
) {
  try {
    const { limit = 10, offset = 0 } = pagination;
    const params = new URLSearchParams();

    // Añadir parámetros de paginación
    params.append("limit", limit.toString());
    params.append("offset", offset.toString());

    // Añadir filtros si existen
    if (filters.name) params.append("name", filters.name);
    if (filters.categoryId && filters.categoryId !== "all")
      params.append("categoryId", filters.categoryId.toString());
    if (filters.brandId && filters.brandId !== "all")
      params.append("brandId", filters.brandId.toString());
    if (filters.isActive && filters.isActive !== "all")
      params.append("isActive", filters.isActive.toString());
    if (filters.minPrice)
      params.append("minPrice", filters.minPrice.toString());
    if (filters.maxPrice)
      params.append("maxPrice", filters.maxPrice.toString());

    const response = await fetch(
      `${process.env.API_BACKENDL_URL}/api/products?${params.toString()}`,
      {
        headers: {
          "Content-Type": "application/json",
          // Añade aquí los headers necesarios para autenticación si los necesitas
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
}

// Acción para obtener categorías
export async function getCategories() {
  try {
    const response = await fetch(
      `${process.env.API_BACKENDL_URL}/api/categories`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
}

// Acción para obtener marcas
export async function getBrands() {
  try {
    const response = await fetch(`${process.env.API_BACKENDL_URL}/api/brands`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.error("Error fetching brands:", error);
    throw error;
  }
}
