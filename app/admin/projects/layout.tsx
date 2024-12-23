import { connectDB } from '@/app/lib/mongodb';
import React from 'react'
import AdminProjectsPageClient from './page';
import { Project } from '@/app/models/Project';

export default async function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
})  {
  await connectDB();
  const projects = await Project.find().lean();
  const serializedProjects = JSON.parse(JSON.stringify(projects));

  return <AdminProjectsPageClient existingProjects={serializedProjects} />;
}