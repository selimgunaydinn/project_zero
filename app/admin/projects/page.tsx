// app/admin/page.tsx (veya benzer server component)
import { connectDB } from '@/app/lib/mongodb';
import { Project } from '@/app/models/Project';
import AdminProjectsPageClient from './components/AdminProjectsPageClient';

export default async function AdminProjectsPage() {
  await connectDB();
  const projects = await Project.find().lean();
  const serializedProjects = JSON.parse(JSON.stringify(projects));

  return <AdminProjectsPageClient existingProjects={serializedProjects} />;
}
