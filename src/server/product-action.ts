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
    const { limit = 30, offset = 0 } = pagination;
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
    throw error;
  }
}

export async function getCategories(isActive: boolean = true) {
  try {
    const response = await fetch(
      `${process.env.API_BACKENDL_URL}/api/categories?isActive=${isActive}`,
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

export async function getBrands(isActive: boolean = true) {
  try {
    const response = await fetch(
      `${process.env.API_BACKENDL_URL}/api/brands?isActive=${isActive}`,
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
    console.error("Error fetching brands:", error);
    throw error;
  }
}
export async function createProduct(formData: FormData) {
  try {
    const response = await fetch(
      `${process.env.API_BACKENDL_URL}/api/products`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      const res = await response.json();
      if (res.message) {
        throw new Error(res.message);
      }
      throw new Error(`Error: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    throw error;
  }
}

export async function createEntity(
  name: string,

  type: "category" | "brand"
) {
  try {
    const type_plural = type === "category" ? "categories" : "brands";
    const response = await fetch(
      `${process.env.API_BACKENDL_URL}/api/${type_plural}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      }
    );

    if (!response.ok) {
      const res = await response.json();
      if (res.message) {
        throw new Error(res.message);
      }
      throw new Error(`Error: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    throw error;
  }
}

export async function updateEntity(
  id: number,
  data: { name: string; isActive: boolean },
  type: "category" | "brand"
) {
  try {
    const type_plural = type === "category" ? "categories" : "brands";
    const response = await fetch(
      `${process.env.API_BACKENDL_URL}/api/${type_plural}/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    if (!response.ok) {
      const res = await response.json();
      if (res.message) {
        throw new Error(res.message);
      }
      throw new Error(`Error: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    throw error;
  }
}

export async function updateProduct(formData: FormData, id: number) {
  try {
    const response = await fetch(
      `${process.env.API_BACKENDL_URL}/api/products/${id}`,
      {
        method: "PUT",
        body: formData,
      }
    );

    if (!response.ok) {
      const res = await response.json();
      if (res.message) {
        throw new Error(res.message);
      }
      throw new Error(`Error: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    throw error;
  }
}
