export default function Blogs({ blogs }: { blogs: any[] }) {
  if (blogs.length === 0) {
    return (
      <p className="text-gray-600 text-center">Henüz Blog eklenmemiş.</p>
    );
  }

  return (
    <ul className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {blogs.map((blog: any) => (
        <li
          key={blog._id}
          className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-4 flex flex-col"
        >

          {/* Başlık ve Açıklama */}
          <h3 className="text-lg font-semibold mb-2">{blog.title}</h3>
          <p className="text-gray-700 text-sm flex-1">{blog.description}</p>

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
