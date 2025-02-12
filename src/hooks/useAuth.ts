import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export const useAuth = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const login = async (email: string, password: string) => {
    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        throw new Error(result.error);
      }

      if (result?.ok) {
        router.push("/dashboard");
      }
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  const logout = async () => {
    await signOut({ redirect: true, callbackUrl: "/login" });
  };

  return {
    session,
    status,
    login,
    logout,
    isAuthenticated: status === "authenticated",
    isLoading: status === "loading",
  };
};
