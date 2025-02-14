"use client";
import { ChevronRight, type LucideIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";

interface NavItem {
  title: string;
  url: string;
  icon?: LucideIcon;
  isActive?: boolean;
  items?: {
    title: string;
    url: string;
  }[];
}

export function NavMain({ items }: { items: NavItem[] }) {
  const pathname = usePathname();

  const isActiveLink = (url: string) => {
    return pathname === url;
  };

  const isActiveGroup = (item: NavItem) => {
    if (isActiveLink(item.url)) return true;
    return item.items?.some((subItem) => isActiveLink(subItem.url));
  };

  return (
    <SidebarGroup>
      <SidebarGroupLabel className="text-sm font-medium text-muted-foreground">
        Plataforma
      </SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => {
          const isGroupActive = isActiveGroup(item);

          return (
            <Collapsible
              key={item.title}
              asChild
              defaultOpen={isGroupActive}
              className="group/collapsible"
            >
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton
                    tooltip={item.title}
                    className={`transition-colors duration-200 ${
                      isGroupActive
                        ? "bg-accent text-accent-foreground"
                        : "hover:bg-accent/50"
                    }`}
                  >
                    {item.icon && (
                      <item.icon
                        className={`h-5 w-5 ${
                          isGroupActive
                            ? "text-primary"
                            : "text-muted-foreground"
                        }`}
                      />
                    )}
                    <span className={isGroupActive ? "font-medium" : ""}>
                      {item.title}
                    </span>
                    <ChevronRight
                      className={`ml-auto h-4 w-4 transition-transform duration-200 
                        ${
                          isGroupActive
                            ? "text-foreground"
                            : "text-muted-foreground"
                        }
                        group-data-[state=open]/collapsible:rotate-90`}
                    />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {item.items?.map((subItem) => {
                      const isSubActive = isActiveLink(subItem.url);

                      return (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuSubButton
                            asChild
                            className={`transition-colors duration-200 ${
                              isSubActive
                                ? "bg-primary/10 text-primary font-medium dark:bg-primary/20"
                                : "hover:bg-accent/50"
                            }`}
                          >
                            <Link href={subItem.url}>
                              <span>{subItem.title}</span>
                              {isSubActive && (
                                <div className="absolute inset-y-0 left-0 w-1 bg-primary rounded-r-full" />
                              )}
                            </Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      );
                    })}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
