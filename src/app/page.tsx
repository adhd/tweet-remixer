import HeroHeader from "@/components/hero-header";

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      <div className="container mx-auto px-4 py-16">
        <HeroHeader />
        {/* Other content */}
      </div>
    </main>
  );
} 