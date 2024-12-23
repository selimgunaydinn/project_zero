// app/page.tsx
import { connectDB } from "@/lib/mongodb";
import { Project } from "@/models/Project";
import Image from "next/image";

export default async function Home() {
  await connectDB();
  const projects = await Project.find().lean();

  return (
    <div className="flex flex-col min-h-screen">
      {/* HEADER */}
      <header className="bg-white shadow">
        <nav className="container mx-auto flex justify-between items-center py-4 px-4">
          <div className="text-2xl font-bold">My Portfolio</div>
          <ul className="flex space-x-6">
            <li>
              <a href="#" className="hover:text-blue-600 transition-colors">
                Anasayfa
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-600 transition-colors">
                Hakkında
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-600 transition-colors">
                İletişim
              </a>
            </li>
            <li>
              <a href="/admin" target="_blank" className="hover:text-blue-600 transition-colors">
                Admin
              </a>
            </li>
          </ul>
        </nav>
      </header>

      <main className="flex-1">
        {/* HERO BÖLÜMÜ */}
        <section className="bg-gray-100 py-16 text-center">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold mb-4">Hoş Geldiniz!</h1>
            <p className="text-lg mb-6">
              Bu sitede yer alan projelerimi inceleyebilirsiniz.
            </p>
          </div>
        </section>

        {/* PROJELER BÖLÜMÜ */}
        <section className="container mx-auto px-4 py-8">
          <h2 className="text-3xl font-bold mb-6 text-center">Projeler</h2>
          {projects.length === 0 ? (
            <p className="text-gray-600 text-center">Henüz proje eklenmemiş.</p>
          ) : (
            <ul className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((project: any) => (
                <li
                  key={project._id}
                  className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-4 flex flex-col"
                >
                  {/* Görsel */}
                  {project.photoUrl ? (
                    <div className="relative w-full h-48 mb-4">
                      <Image
                        src={project.photoUrl}
                        alt={project.title}
                        fill
                        className="object-cover rounded-t-lg"
                      />
                    </div>
                  ) : (
                    <div className="relative w-full h-48 bg-gray-200 flex items-center justify-center rounded-t-lg mb-4">
                      <span className="text-gray-500">Fotoğraf Yok</span>
                    </div>
                  )}

                  {/* Başlık ve Açıklama */}
                  <h3 className="text-lg font-semibold mb-2">
                    {project.title}
                  </h3>
                  <p className="text-gray-700 text-sm flex-1">
                    {project.description}
                  </p>

                  {/* İsteğe bağlı butonlar */}
                  <div className="mt-4 flex justify-end">
                    <a
                      href="#"
                      className="text-blue-600 hover:underline text-sm font-medium"
                    >
                      Daha Fazla Gör
                    </a>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>

      {/* FOOTER */}
      <footer className="bg-gray-800 text-white py-4">
        <div className="container mx-auto px-4 text-center">
          © 2023 My Portfolio. Tüm hakları saklıdır.
        </div>
      </footer>
    </div>
  );
}
