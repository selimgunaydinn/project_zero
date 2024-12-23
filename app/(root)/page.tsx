import { connectDB } from "@/app/lib/mongodb";
import { Blog } from "@/app/models/Blog";
import Hero from "../components/Hero";
import Blogs from "../components/Blogs";

export default async function Home() {
  await connectDB();
  const blogs = await Blog.find().lean();

  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <section className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-6 text-center">Blogs</h2>
        <Blogs blogs={blogs} />
      </section>
    </div>
  );
}
