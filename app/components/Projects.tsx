// app/components/ProjectList.tsx

import Image from "next/image";

export default function Projects({ projects }: { projects: any[] }) {
  if (projects.length === 0) {
    return (
      <p className="text-gray-600 text-center">Henüz proje eklenmemiş.</p>
    );
  }

  return (
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
          <h3 className="text-lg font-semibold mb-2">{project.title}</h3>
          <p className="text-gray-700 text-sm flex-1">{project.description}</p>

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
  );
}
