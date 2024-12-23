import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/app/lib/mongodb';
import { Blog, Category } from '@/app/models/Blog';

export async function GET() {
  try {
    await connectDB();
    const blogs = await Blog.find().populate('category')
    return NextResponse.json({ success: true, data: blogs });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const { title, content, category } = await req.json();
    const newBlog = await Blog.create({ title, content, category });
    return NextResponse.json({ success: true, data: newBlog });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
