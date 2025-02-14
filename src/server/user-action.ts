"use server";
export async function getUsers() {
  try {
    const response = await fetch(`${process.env.API_BACKENDL_URL}/api/user`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
}

export async function createUser(formData: {
  username: string;
  email: string;
  fullName: string;
  password: string | undefined;
  isActive: boolean;
  roles: string[];
}) {
  try {
    const response = await fetch(
      `${process.env.API_BACKENDL_URL}/api/auth/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
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

export async function updateUser(
  id: string,
  formData: {
    username: string;
    email: string;
    fullName: string;
    password: string | undefined;
    isActive: boolean;
    roles: string[];
  }
) {
  try {
    const response = await fetch(
      `${process.env.API_BACKENDL_URL}/api/user/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
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
