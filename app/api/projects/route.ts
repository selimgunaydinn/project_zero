import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/app/lib/mongodb';
import { Project } from '@/app/models/Project';

export async function GET() {
  try {
    await connectDB();
    const projects = await Project.find();
    return NextResponse.json({ success: true, data: projects });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const { title, description, photoUrl } = await req.json();
    const newProject = await Project.create({ title, description, photoUrl });
    return NextResponse.json({ success: true, data: newProject });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
