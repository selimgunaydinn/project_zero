'use client';

import { FormEvent, useState, useEffect } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const { data: session, status } = useSession(); // Oturum durumunu kontrol et

  useEffect(() => {
    // Eğer kullanıcı giriş yapmışsa, admin sayfasına yönlendir
    if (session) {
      router.push('/admin');
    }
  }, [session, router]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const result = await signIn('credentials', {
      username,
      password,
      redirect: false,
    });
    if (result?.ok) {
      router.push('/admin'); // Başarılı giriş sonrası admin sayfasına yönlendirme
    } else {
      alert('Kullanıcı adı veya şifre hatalı!');
    }
  };

  // Kullanıcı giriş yapmışsa, bu sayfa render edilmesin (optional double check)
  if (status === 'authenticated') {
    return null; // Boş render döndür
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <form onSubmit={handleSubmit} className="p-6 bg-white shadow rounded w-80">
        <h1 className="text-2xl font-bold mb-4">Giriş Yap</h1>
        <div className="mb-4">
          <label className="block font-semibold mb-1">Kullanıcı Adı</label>
          <input
            className="border border-gray-300 p-2 rounded w-full"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block font-semibold mb-1">Şifre</label>
          <input
            className="border border-gray-300 p-2 rounded w-full"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button className="bg-blue-600 text-white py-2 px-4 rounded w-full" type="submit">
          Giriş
        </button>
      </form>
    </div>
  );
}
