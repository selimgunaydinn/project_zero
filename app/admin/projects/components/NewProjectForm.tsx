"use client";

import { useState } from "react";

export default function NewProjectForm({
  onProjectAdded,
}: {
  onProjectAdded?: (newProject: any) => void;
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let photoUrl = "";
    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      const uploadRes = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const uploadData = await uploadRes.json();
      if (uploadData.success) {
        photoUrl = uploadData.url;
      } else {
        alert(uploadData.error || "Fotoğraf yükleme hatası");
        return;
      }
    }

    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description, photoUrl }),
      });
      const data = await res.json();

      if (data.success) {
        alert("Yeni proje eklendi!");
        onProjectAdded?.(data.data);
        setTitle("");
        setDescription("");
        setFile(null);
      } else {
        alert(data.error || "Proje ekleme başarısız");
      }
    } catch (error) {
      console.error("Proje ekleme hatası:", error);
      alert("Bir hata oluştu, proje eklenemedi");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-4">
      <div>
        <label className="block font-semibold mb-1">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="border border-gray-300 p-2 rounded w-full"
        />
      </div>

      <div>
        <label className="block font-semibold mb-1">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border border-gray-300 p-2 rounded w-full"
        />
      </div>

      <div>
        <label className="block font-semibold mb-1">Image</label>
        <input type="file" accept="image/*" onChange={handleFileChange} />
      </div>

      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
      >
        Save
      </button>
    </form>
  );
}
