"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function EditProjectForm({ project }: { project: any }) {
  const router = useRouter();
  const [title, setTitle] = useState(project.title);
  const [description, setDescription] = useState(project.description || "");
  const [file, setFile] = useState<File | null>(null);
  const [photoUrl, setPhotoUrl] = useState(project.photoUrl || "");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let finalPhotoUrl = photoUrl;
    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      const uploadRes = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const uploadData = await uploadRes.json();

      if (!uploadData.success) {
        alert(uploadData.error || "Fotoğraf yükleme hatası");
        return;
      }

      finalPhotoUrl = uploadData.url;
    }

    try {
      const res = await fetch(`/api/projects/${project._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          description,
          photoUrl: finalPhotoUrl,
        }),
      });
      const data = await res.json();

      if (data.success) {
        alert("Proje güncellendi!");
        router.push("/admin/projects");
      } else {
        alert(data.error || "Proje güncelleme başarısız");
      }
    } catch (error) {
      console.error("Proje güncelleme hatası:", error);
      alert("Bir hata oluştu, proje güncellenemedi");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-4">
      <div>
        <label className="block font-semibold mb-1">Title</label>
        <input
          type="text"
          className="border border-gray-300 p-2 rounded w-full"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block font-semibold mb-1">Description</label>
        <textarea
          className="border border-gray-300 p-2 rounded w-full"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      {photoUrl && (
        <div>
          <Image src={photoUrl} width={200} height={200} alt={project.title} />
        </div>
      )}

      <div>
        <label className="block font-semibold mb-1">Change Image</label>
        <input type="file" accept="image/*" onChange={handleFileChange} />
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Save
      </button>
    </form>
  );
}
