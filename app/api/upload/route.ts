// app/api/upload/route.ts
import { NextRequest, NextResponse } from 'next/server';
import cloudinary from '@/app/lib/cloudinary';

export async function POST(request: NextRequest) {
  try {
    // request.formData() -> multipart/form-data elde ediyoruz.
    const formData = await request.formData();
    const file = formData.get('file') as File; // "file" adında bir field bekliyoruz

    if (!file) {
      return NextResponse.json({ success: false, error: 'No file found' }, { status: 400 });
    }

    // Dosyayı Cloudinary'ye yüklemek için:
    // 1) File'ı buffer'a çeviriyoruz
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // 2) Cloudinary upload
    //    Cloudinary Node SDK ile buffer yüklemek için 'uploadStream' veya base64 approach'u kullanabilirsiniz.
    //    Aşağıda base64 + "data uri" yaklaşımı örnek
    const base64String = buffer.toString('base64');
    const dataUri = `data:${file.type};base64,${base64String}`;

    const uploadResponse = await cloudinary.uploader.upload(dataUri, {
      folder: 'projects', // cloudinary'de "projects" klasörü altına atıyor
    });

    return NextResponse.json({ success: true, url: uploadResponse.secure_url });
  } catch (error: any) {
    console.error('File upload error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
