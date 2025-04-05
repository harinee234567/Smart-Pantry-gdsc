import { PantryHeader } from "@/components/PantryHeader";
import { PantryStats } from "@/components/PantryStats";
import { PantryGrid } from "@/components/PantryGrid";

const Index = () => {
  return (
    <div className="min-h-screen bg-pantry-cream">
      <PantryHeader />
      <main className="max-w-7xl mx-auto px-4 py-8 animate-fadeIn">
        <PantryStats />
        <PantryGrid />
      </main>
    </div>
  );
};

export default Index;