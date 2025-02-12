"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { LogOut, User } from "lucide-react";
import { signOut } from "next-auth/react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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
  return (
    <div className="space-y-2 border-t border-slate-200 pt-2">
      <TooltipProvider>
        <SidebarMenu>
          {/* Profile Button */}
          <SidebarMenuItem>
            <Tooltip>
              <TooltipTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="group relative overflow-hidden transition-all duration-300 hover:bg-slate-100"
                >
                  <Avatar className="h-9 w-9 rounded-lg border-2 border-white bg-blue-50 ring-2 ring-blue-100 transition-transform duration-300 ">
                    <AvatarFallback className="rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white">
                      {user.name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm">
                    <span className="truncate font-medium text-slate-900">
                      {user.name}
                    </span>
                    <span className="truncate text-xs text-slate-500">
                      {user.email}
                    </span>
                  </div>
                  <User className="ml-2 h-4 w-4 text-slate-400" />
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
                  className="group relative transition-all duration-300 hover:bg-red-50"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-50 text-red-500 transition-colors duration-300 group-hover:bg-red-100">
                    <LogOut className="h-4 w-4 transition-transform duration-300 " />
                  </div>
                  <div className="grid flex-1 text-left">
                    <span className="truncate text-sm font-medium text-red-600">
                      Cerrar sesión
                    </span>
                    <span className="truncate text-xs text-red-400">
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
