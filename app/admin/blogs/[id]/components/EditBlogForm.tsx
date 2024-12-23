"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function EditProjectForm({ blog }: { blog: any }) {
  const router = useRouter();
  const [title, setTitle] = useState(blog.title);
  const [content, setContent] = useState(blog.content || "");


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();


    try {
      const res = await fetch(`/api/blogs/${blog._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          content,
        }),
      });
      const data = await res.json();

      if (data.success) {
        alert("Blog güncellendi!");
        router.push("/admin/projects");
      } else {
        alert(data.error || "Blog güncelleme başarısız");
      }
    } catch (error) {
      console.error("Blog güncelleme hatası:", error);
      alert("Bir hata oluştu, blog güncellenemedi");
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
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
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
