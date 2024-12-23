export default function Header() {
  return (
    <header className="bg-white shadow">
      <nav className="container mx-auto flex justify-between items-center py-4 px-4">
        <div className="text-2xl font-bold">My Portfolio</div>
        <ul className="flex space-x-6">
          <li>
            <a href="#" className="hover:text-blue-600 transition-colors">
              Anasayfa
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-blue-600 transition-colors">
              Hakkında
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-blue-600 transition-colors">
              İletişim
            </a>
          </li>
          <li>
            <a
              href="/admin"
              target="_blank"
              className="hover:text-blue-600 transition-colors"
            >
              Admin
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
