import { connectDB } from "@/app/lib/mongodb";
import { Project } from "@/app/models/Project";
import Hero from "../components/Hero";
import Projects from "../components/Projects";

export default async function Home() {
  await connectDB();
  const projects = await Project.find().lean();

  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <section className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-6 text-center">Projeler</h2>
        <Projects projects={projects} />
      </section>
    </div>
  );
}
