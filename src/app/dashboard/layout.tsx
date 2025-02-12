import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./components/AppSidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full h-full p-4 overflow-y-auto">
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
}
