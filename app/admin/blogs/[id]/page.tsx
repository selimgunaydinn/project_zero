import { connectDB } from '@/app/lib/mongodb';
import { Blog } from '@/app/models/Blog';
import EditBlogForm from './components/EditBlogForm';

interface EditPageProps {
  params: {
    id: string;
  };
}

export default async function EditProjectPage({ params }: EditPageProps) {
  await connectDB();
  const blog = await Blog.findById(params.id).lean();

  const serializedBlog = JSON.parse(JSON.stringify(blog));

  if (!blog) {
    return <div className="text-red-600">Blog bulunamadı!</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Blog Düzenle</h1>
      <EditBlogForm blog={serializedBlog} />
    </div>
  );
}
