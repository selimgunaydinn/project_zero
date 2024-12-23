import { connectDB } from "@/app/lib/mongodb";
import React from "react";
import AdminProjectsPageClient from "./page";
import { Blog, Category } from "@/app/models/Blog";

export default async function ProjectsLayout() {
  await connectDB();
  const blogs = await Blog.find().lean();
  const serializedBlogs = JSON.parse(JSON.stringify(blogs));
  const categories = await Category.find().lean();
  const serializedCategories = JSON.parse(JSON.stringify(categories));

  return <AdminProjectsPageClient existingBlogPosts={serializedBlogs} categories={serializedCategories} />;
}
