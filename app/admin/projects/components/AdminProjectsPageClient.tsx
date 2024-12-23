'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import NewProjectForm from './NewProjectForm';

export default function AdminProjectsPageClient({
  existingProjects,
}: {
  existingProjects: any[];
}) {
  const [projects, setProjects] = useState(existingProjects || []);

  const handleDelete = async (id: string) => {
    if (!confirm('Bu projeyi silmek istediğinize emin misiniz?')) return;

    try {
      const res = await fetch(`/api/projects/${id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success) {
        setProjects((prev) => prev.filter((p) => p._id !== id));
      } else {
        alert(data.error || 'Silme işlemi başarısız oldu');
      }
    } catch (error) {
      console.error('Proje silme hatası:', error);
      alert('Bir hata oluştu, projeyi silemedik.');
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Projeler</h1>

      {/* Projeler Listesi */}
      {projects.length === 0 ? (
        <p className="text-gray-600 mb-6">Henüz proje eklenmemiş.</p>
      ) : (
        <ul className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mb-8">
          {projects.map((project) => (
            <li
              key={project._id}
              className="bg-white rounded shadow-sm hover:shadow-md transition-shadow p-4 flex flex-col"
            >
              {/* Proje Görseli */}
              {project.photoUrl ? (
                <div className="relative w-full h-48 mb-4">
                  <Image
                    src={project.photoUrl}
                    alt={project.title}
                    fill
                    className="object-cover rounded"
                  />
                </div>
              ) : (
                <div className="relative w-full h-48 bg-gray-200 flex items-center justify-center rounded mb-4">
                  <span className="text-gray-500">Fotoğraf Yok</span>
                </div>
              )}

              {/* Başlık ve Açıklama */}
              <h3 className="text-lg font-semibold mb-2">{project.title}</h3>
              <p className="text-gray-700 mb-4 flex-1">{project.description}</p>

              {/* İşlem Butonları */}
              <div className="flex justify-end gap-2 mt-auto">
                <Link href={`/admin/projects/${project._id}`}>
                  <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded">
                    Düzenle
                  </button>
                </Link>
                <button
                  onClick={() => handleDelete(project._id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                >
                  Sil
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <hr className="my-6" />

      <h2 className="text-2xl font-semibold mb-4">Yeni Proje Ekle</h2>
      <NewProjectForm
        onProjectAdded={(newProject: any) => {
          setProjects((prev) => [...prev, newProject]);
        }}
      />
    </div>
  );
}
