import Navbar from "@/components/navbar/NavBar";
import PageViewTracker from "@/components/PageViewTracker";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-full bg-gray-50">
      <Navbar />
      {children}
      <PageViewTracker />
      {/* This will trigger a site view increment on every page */}
    </div>
  );
}
