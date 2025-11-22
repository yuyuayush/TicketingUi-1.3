"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import * as Icons from "lucide-react";
import { useAdminSideMenu } from "@/hooks/useAdminAuth";
import { useLayoutEffect } from "react";
import { useAuthStore } from "@/store/useAuth";
import { USER_ROLES } from "@/lib/constants";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { currentUser } = useAuthStore();

  // Redirect non-admins before paint
  useLayoutEffect(() => {
    if (currentUser?.role !== USER_ROLES.admin) {
      router.replace("/"); // immediately redirect
    }
  }, [currentUser, router]);

  // Fetch menu data
  const { data: menuData, isLoading: menuLoading, isError: menuError } = useAdminSideMenu();

  const isLoading = menuLoading;

  if (isLoading) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <aside className="w-64 bg-white shadow-md p-5 space-y-4 animate-pulse">
          <div className="h-8 w-3/4 bg-gray-300 rounded mb-4"></div>
          <div className="space-y-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="h-5 w-5 bg-gray-300 rounded-full"></div>
                <div className="h-4 w-3/4 bg-gray-300 rounded"></div>
              </div>
            ))}
          </div>
        </aside>
        <main className="flex-1 p-8">
          <div className="h-6 bg-gray-200 rounded w-3/4 mb-2 animate-pulse"></div>
          <div className="h-6 bg-gray-200 rounded w-full mb-2 animate-pulse"></div>
        </main>
      </div>
    );
  }

  if (menuError) {
    return (
      <div className="flex items-center justify-center h-screen text-red-600">
        Failed to load admin panel. Please try again later.
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <aside className="w-64 bg-white shadow-md p-5 space-y-6">
        <h2 className="text-2xl font-bold text-indigo-600 mb-4">Admin Panel</h2>
        <nav className="flex flex-col space-y-2">
          {menuData?.data?.menu?.map((link) => {
            const active = pathname === link.path;
            const Icon = Icons[link.icon] || Icons.Circle;
            return (
              <Link
                key={link.path}
                href={link.path}
                className={`flex items-center gap-3 px-3 py-2 rounded-md transition ${active ? "bg-indigo-600 text-white" : "text-gray-700 hover:bg-gray-100"
                  }`}
              >
                <Icon size={18} />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>
      </aside>
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
