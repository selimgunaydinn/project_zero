import { connectDB } from "@/app/lib/mongodb";
import { Category } from "@/app/models/Blog";
import { NextResponse } from "next/server";


export async function GET(req: any) {
  try {
    await connectDB();
    const globalSettings = await Category.find({});
    return NextResponse.json({ success: true, data: globalSettings });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(req: any) {
  try {
    await connectDB();
    const { name, content } = await req.json();
    const newCategory = await Category.create({ name, content });
    return NextResponse.json({ success: true, data: newCategory });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(req: any) {
  try {
    await connectDB()
    const { id, name, content } = await req.json();
    const updatedCategory = await Category.findByIdAndUpdate(
      id,
      { name, content },
      { new: true }
    );
    if (!updatedCategory) {
      return NextResponse.json({ success: false, error: 'Category not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: updatedCategory });
  } catch {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}