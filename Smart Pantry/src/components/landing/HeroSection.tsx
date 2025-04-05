
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, ChefHat, Sparkles } from "lucide-react";

export const HeroSection = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/recipes?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <section className="relative h-screen flex items-center pt-16">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1506368249639-73a05d6f6488?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" 
          alt="Kitchen with fresh ingredients" 
          className="w-full h-full object-cover" 
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30" />
      </div>
      
      <div className="container mx-auto px-6 z-10 relative">
        <div className="max-w-2xl pt-5 md:pt-8">
          <h1 className="text-5xl md:text-6xl font-display font-bold text-white leading-tight animate-fadeIn mb-5">
            Smart Cooking Starts Here – 
            <span className="text-pantry-sage">Your Personalized Digital Pantry!</span>
          </h1>
          <p className="text-xl text-white/90 mb-6 animate-fadeIn" style={{
            animationDelay: "0.2s"
          }}>
            Transform your kitchen experience with AI-powered recipe suggestions, smart inventory management, and personalized meal planning.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 animate-fadeIn space-y-4 sm:space-y-0 sm:space-x-4" style={{
            animationDelay: "0.4s"
          }}>
            <Button onClick={() => navigate("/dashboard")} className="w-full sm:w-auto bg-white text-pantry-brown hover:bg-white/90 py-4 rounded-full text-lg px-[32px]">
              <ChefHat className="mr-2 h-5 w-5" />
              Get Started
            </Button>
            <Button onClick={() => navigate("/recipes")} variant="outline" className="w-full sm:w-auto border-white/50 text-white px-8 py-4 rounded-full text-lg bg-transparent">
              <Sparkles className="mr-2 h-5 w-5" />
              Explore Recipes
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
