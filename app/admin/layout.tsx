import Link from "next/link";
import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import LogoutButton from "./components/LogoutButton";

export const metadata: Metadata = {
  title: "Admin Panel",
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 sticky left-0 top-0 h-screen bg-gray-800 text-white flex flex-col">
        <div className="py-4 px-6">
          <h2 className="text-xl font-bold">Project Zero</h2>
        </div>
        <nav className="flex-1 px-4">
          <ul className="space-y-2 mt-4">
            <li>
              <Link
                href="/admin"
                className="block py-2 px-2 rounded hover:bg-gray-700 transition-colors"
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                href="/admin/projects"
                className="block py-2 px-2 rounded hover:bg-gray-700 transition-colors"
              >
                Projeler
              </Link>
            </li>
            <li>
              <Link
                href="/admin/settings"
                className="block py-2 px-2 rounded hover:bg-gray-700 transition-colors"
              >
                Ayarlar
              </Link>
            </li>
          </ul>
        </nav>
        <div className="p-4 border-t border-gray-700">
          <LogoutButton />
        </div>
      </aside>
      <main className="flex-1 bg-gray-100 p-6">{children}</main>
    </div>
  );
}
