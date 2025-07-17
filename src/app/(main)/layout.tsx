import { Footer } from "@/components/Footer";
import Navbar from "@/components/navbar/NavBar";
import PageViewTracker from "@/components/PageViewTracker";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      {children}
      <Footer />
      <PageViewTracker />
      {/* This will trigger a site view increment on every page */}
    </div>
  );
}
