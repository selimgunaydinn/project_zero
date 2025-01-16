import { NextResponse } from 'next/server';
import { connectDB } from '@/app/lib/mongodb';
import { Widget } from '@/app/models/Widget';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    await connectDB();
    const widgets = await Widget.find().sort({ order: 1 });
    return NextResponse.json(widgets);
  } catch (error) {
    console.error('Widget\'lar alınırken hata:', error);
    return NextResponse.json(
      { error: 'Widget\'lar alınamadı' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();
    const data = await request.json();

    // En yüksek order değerini bul
    const lastWidget = await Widget.findOne().sort({ order: -1 });
    const order = lastWidget ? lastWidget.order + 1 : 0;

    const widget = await Widget.create({ ...data, order });
    return NextResponse.json(widget);
  } catch (error) {
    console.error('Widget oluşturulurken hata:', error);
    return NextResponse.json(
      { error: 'Widget oluşturulamadı' },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    await connectDB();
    const data = await request.json();
    const { id, ...updateData } = data;

    const widget = await Widget.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    );

    if (!widget) {
      return NextResponse.json(
        { error: 'Widget bulunamadı' },
        { status: 404 }
      );
    }

    return NextResponse.json(widget);
  } catch (error) {
    console.error('Widget güncellenirken hata:', error);
    return NextResponse.json(
      { error: 'Widget güncellenemedi' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Widget ID gerekli' },
        { status: 400 }
      );
    }

    const widget = await Widget.findById(id);
    if (!widget) {
      return NextResponse.json(
        { error: 'Widget bulunamadı' },
        { status: 404 }
      );
    }

    // Widget'ı veritabanından sil
    await Widget.findByIdAndDelete(id);

    // Widget component dosyasını sil
    const componentPath = path.join(process.cwd(), 'app', 'widgets', 'generated', `${widget.name}.tsx`);
    
    if (fs.existsSync(componentPath)) {
      fs.unlinkSync(componentPath);
    }

    return NextResponse.json({ message: 'Widget başarıyla silindi' });
  } catch (error) {
    console.error('Widget silinirken hata:', error);
    return NextResponse.json(
      { error: 'Widget silinemedi' },
      { status: 500 }
    );
  }
} 