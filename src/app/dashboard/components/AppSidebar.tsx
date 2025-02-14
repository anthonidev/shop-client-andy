"use client";

import { Database, ShoppingCart } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { useSession } from "next-auth/react";
import { NavMain } from "./NavMain";
import { NavUser } from "./NavUser";

const data = {
  navMain: [
    {
      title: "Tienda",
      url: "/",
      icon: ShoppingCart,
      isActive: true,
      items: [
        {
          title: "Productos",
          url: "/dashboard",
        },
        {
          title: "Categorias",
          url: "/dashboard/categorias",
        },
        {
          title: "Marcas",
          url: "/dashboard/marcas",
        },
      ],
    },
    {
      title: "Admin",
      url: "/dashboard/admin",
      icon: Database,
      items: [
        {
          title: "Usuarios",
          url: "/dashboard/admin/usuarios",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: session } = useSession();
  return (
    <Sidebar title="Andi Shop" collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                    <span className="text-primary-foreground font-bold">A</span>
                  </div>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">Andi Shop</span>
                    <span className="truncate text-xs">v1.0</span>
                  </div>
                </SidebarMenuButton>
              </DropdownMenuTrigger>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent title="Menú principal ">
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        {session?.user?.name && <NavUser user={session.user} />}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
