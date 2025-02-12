"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Mail, Lock, Loader2, AlertCircle } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("jane.smith@example.com");
  const [password, setPassword] = useState("Secret123$");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { push } = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
        callbackUrl: "/",
      });
      console.log(result);

      if (result?.error) {
        console.error(result.error);
        setError("Credenciales inválidas");
      } else if (result?.ok) {
        console.log("Inicio de sesión exitoso");
        push("/dashboard");
      }
    } catch (err) {
      setError("Ocurrió un error al iniciar sesión");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100">
      <div className="w-full max-w-md px-8 py-10 mx-4">
        <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />
          <div className="absolute top-0 left-0 w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 transform -translate-x-1/2 -translate-y-1/2 opacity-20" />
          <div className="absolute top-0 right-0 w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 transform translate-x-1/2 -translate-y-1/2 opacity-20" />

          <div className="px-8 pt-12 pb-8">
            <div className="text-center mb-10">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Bienvenido
              </h1>
              <p className="mt-2 text-gray-600">Ingresa a tu cuenta</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400 group-focus-within:text-indigo-500 transition-colors duration-200" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 
                           focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent
                           transition-all duration-200 ease-in-out"
                  placeholder="correo@ejemplo.com"
                />
              </div>

              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-indigo-500 transition-colors duration-200" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 
                           focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent
                           transition-all duration-200 ease-in-out"
                  placeholder="••••••••"
                />
              </div>

              {error && (
                <div className="flex items-center gap-2 text-red-500 text-sm bg-red-50 p-3 rounded-lg animate-shake">
                  <AlertCircle className="h-4 w-4" />
                  <span>{error}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="relative w-full py-3 px-4 border border-transparent rounded-xl
                         text-white text-sm font-medium bg-gradient-to-r from-indigo-600 to-purple-600
                         hover:from-indigo-700 hover:to-purple-700
                         focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
                         disabled:opacity-50 disabled:cursor-not-allowed
                         transform transition-all duration-200 ease-in-out
                         hover:scale-[1.02] active:scale-[0.98]"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Iniciando sesión...
                  </span>
                ) : (
                  "Iniciar sesión"
                )}
              </button>

              {/* <div className="mt-4 text-center">
                <a
                  href="#"
                  className="text-sm text-indigo-600 hover:text-indigo-700 transition-colors duration-200"
                >
                  ¿Olvidaste tu contraseña?
                </a>
              </div> */}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
