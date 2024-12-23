import Footer from "../components/Footer";
import Header from "../components/Header";

// app/pages/layout.tsx
export default function PagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
