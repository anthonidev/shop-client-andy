"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { LogOut, Moon, Sun, User } from "lucide-react";
import { signOut } from "next-auth/react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

interface NavUserProps {
  user: {
    id: string;
    email: string;
    name: string;
    username: string;
    roles: string[];
  };
}

export function NavUser({ user }: NavUserProps) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Evitar hidratación incorrecta
  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="space-y-2 border-t border-slate-200 dark:border-slate-700 pt-2">
      <TooltipProvider>
        <SidebarMenu>
          {/* Theme Toggle Button */}
          <SidebarMenuItem>
            <Tooltip>
              <TooltipTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  onClick={toggleTheme}
                  className="group relative transition-all duration-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 transition-colors duration-300 group-hover:bg-slate-200 dark:group-hover:bg-slate-700">
                    {theme === "dark" ? (
                      <Sun className="h-4 w-4 transition-transform duration-300" />
                    ) : (
                      <Moon className="h-4 w-4 transition-transform duration-300" />
                    )}
                  </div>
                  <div className="grid flex-1 text-left">
                    <span className="truncate text-sm font-medium text-slate-900 dark:text-slate-100">
                      {theme === "dark" ? "Modo claro" : "Modo oscuro"}
                    </span>
                    <span className="truncate text-xs text-slate-500 dark:text-slate-400">
                      {theme === "dark"
                        ? "Cambiar a modo claro"
                        : "Cambiar a modo oscuro"}
                    </span>
                  </div>
                </SidebarMenuButton>
              </TooltipTrigger>
              <TooltipContent side="right">Cambiar tema</TooltipContent>
            </Tooltip>
          </SidebarMenuItem>

          {/* Profile Button */}
          <SidebarMenuItem>
            <Tooltip>
              <TooltipTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="group relative overflow-hidden transition-all duration-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  <Avatar className="h-9 w-9 rounded-lg border-2 border-white dark:border-slate-800 bg-blue-50 dark:bg-blue-900 ring-2 ring-blue-100 dark:ring-blue-800 transition-transform duration-300">
                    <AvatarFallback className="rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white">
                      {user.name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm">
                    <span className="truncate font-medium text-slate-900 dark:text-slate-100">
                      {user.name}
                    </span>
                    <span className="truncate text-xs text-slate-500 dark:text-slate-400">
                      {user.email}
                    </span>
                  </div>
                  <User className="ml-2 h-4 w-4 text-slate-400 dark:text-slate-500" />
                </SidebarMenuButton>
              </TooltipTrigger>
              <TooltipContent side="right">
                {user.name} ({user.email})
              </TooltipContent>
            </Tooltip>
          </SidebarMenuItem>

          {/* Logout Button */}
          <SidebarMenuItem>
            <Tooltip>
              <TooltipTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  onClick={() => signOut()}
                  className="group relative transition-all duration-300 hover:bg-red-50 dark:hover:bg-red-950"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-50 dark:bg-red-900 text-red-500 dark:text-red-400 transition-colors duration-300 group-hover:bg-red-100 dark:group-hover:bg-red-800">
                    <LogOut className="h-4 w-4 transition-transform duration-300" />
                  </div>
                  <div className="grid flex-1 text-left">
                    <span className="truncate text-sm font-medium text-red-600 dark:text-red-400">
                      Cerrar sesión
                    </span>
                    <span className="truncate text-xs text-red-400 dark:text-red-500">
                      Salir de la cuenta
                    </span>
                  </div>
                </SidebarMenuButton>
              </TooltipTrigger>
              <TooltipContent side="right">Cerrar sesión</TooltipContent>
            </Tooltip>
          </SidebarMenuItem>
        </SidebarMenu>
      </TooltipProvider>
    </div>
  );
}
