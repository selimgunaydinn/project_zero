import { NextRequest, NextResponse } from 'next/server';

import { User } from '@/app/models/User';
import bcrypt from 'bcrypt';
import { connectDB } from '@/app/lib/mongodb';

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Tüm alanları doldurun.' }, { status: 400 });
    }

    // Kullanıcı zaten kayıtlı mı?
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return NextResponse.json({ error: 'Bu e-posta adresi zaten kayıtlı.' }, { status: 400 });
    }

    // Şifreyi hashle
    const hashedPassword = await bcrypt.hash(password, 10);

    // Yeni kullanıcı oluştur
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();

    return NextResponse.json({ message: 'Kayıt başarılı.' });
  } catch (error) {
    return NextResponse.json({ error: 'Sunucu hatası.' }, { status: 500 });
  }
}
