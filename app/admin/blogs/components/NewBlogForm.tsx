"use client";

import { useState } from "react";

export default function NewProjectForm({
  onProjectAdded,
  categories,
}: {
  onProjectAdded?: (newProject: any) => void;
  categories: any[];
}) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/blogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content, category }),
      });
      const data = await res.json();

      if (data.success) {
        alert("Yeni Blog eklendi!");
        onProjectAdded?.(data.data);
        setTitle("");
        setContent("");
      } else {
        alert(data.error || "Blog ekleme başarısız");
      }
    } catch (error) {
      console.error("Blog ekleme hatası:", error);
      alert("Bir hata oluştu, Blog eklenemedi");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-4">
      <div>
        <label className="block font-semibold mb-1">Category</label>
        <select
          className="border border-gray-300 p-2 rounded w-full"
          required
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Select a category</option>
          {categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>
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
        <label className="block font-semibold mb-1">Content</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="border border-gray-300 p-2 rounded w-full"
        />
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
