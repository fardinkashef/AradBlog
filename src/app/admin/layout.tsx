// import Navbar from "@/components/teaching/TeachingNavbar";

import { SidebarProvider } from "@/components/ui/sidebar";
import AdminSideBar from "./_components/AdminSideBar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-full bg-gray-50">
      <SidebarProvider>
        <AdminSideBar />
        <main className="grow flex flex-col">
          {/* <Navbar /> */}
          {children}
        </main>
      </SidebarProvider>
    </div>
  );
}
