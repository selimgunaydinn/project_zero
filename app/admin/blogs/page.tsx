'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import NewBlogForm from './components/NewBlogForm';


export default function AdminBlogsPageClient({
  existingBlogPosts,
  categories
}: {
  existingBlogPosts: any[];
  categories: any[];
}) {
  const [blogs, setBlogs] = useState(existingBlogPosts || []);

  const handleDelete = async (id: string) => {
    if (!confirm('Bu projeyi silmek istediğinize emin misiniz?')) return;

    try {
      const res = await fetch(`/api/blogs/${id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success) {
        setBlogs((prev) => prev.filter((p) => p._id !== id));
      } else {
        alert(data.error || 'Silme işlemi başarısız oldu');
      }
    } catch (error) {
      console.error('Blog silme hatası:', error);
      alert('Bir hata oluştu, projeyi silemedik.');
    }
  };

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Projects</h1>
      <h2 className="text-2xl font-semibold mb-4">Add New Blog</h2>
      <NewBlogForm
        onProjectAdded={(newProject: any) => {
          setBlogs((prev) => [...prev, newProject]);
        }}
        categories={categories}
      />
      <hr className="my-8" />
      {blogs.length === 0 ? (
        <p className="text-gray-600 mb-6">
          Not found any projects. Please add a new project.
        </p>
      ) : (
        <ul className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mb-8">
          {blogs.map((blog) => (
            <li
              key={blog._id}
              className="bg-white rounded shadow-sm hover:shadow-md transition-shadow p-4 flex flex-col"
            >
              <h3 className="text-lg font-semibold mb-2">{blog.title}</h3>
              <p className="text-gray-700 mb-4 flex-1">{blog.content}</p>

              <div className="flex justify-end gap-2 mt-auto">
                <Link href={`/admin/blogs/${blog._id}`}>
                  <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded">
                    Edit
                  </button>
                </Link>
                <button
                  onClick={() => handleDelete(blog._id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

    </div>
  );
}
