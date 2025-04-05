
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import PantryInventory from "./pages/PantryInventory";
import RecipeManagement from "./pages/RecipeManagement";
import IngredientConversion from "./pages/IngredientConversion";
import DietaryPreferences from "./pages/DietaryPreferences";
import Shopping from "./pages/Shopping";
import MealPlanning from "./pages/MealPlanning";
import ContainerScanner from "./pages/ContainerScanner";
import RecipeUpload from "./pages/RecipeUpload";
import NotFound from "./pages/NotFound";
import { ChatbotProvider } from "./components/chatbot/ChatbotContext";
import Chatbot from "./components/chatbot/Chatbot";
import LandingPage from "./pages/LandingPage";
import { RecipeDetail } from "./components/RecipeDetail";
import { useState, useEffect } from "react";

const queryClient = new QueryClient();

// Sample recipe data for RecipeDetail page
const sampleRecipe = {
  id: 1,
  title: "Classic Margherita Pizza",
  description: "A traditional Italian pizza with fresh basil, mozzarella, and tomato sauce on a crispy thin crust. This authentic recipe brings the flavors of Naples to your kitchen with minimal ingredients but maximum flavor.",
  image: "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
  cookingTime: "15 mins",
  prepTime: "15 mins",
  servings: 4,
  difficulty: "Easy",
  ingredients: [
    { name: "Pizza dough", amount: "1", unit: "ball" },
    { name: "San Marzano tomatoes", amount: "200", unit: "g" },
    { name: "Fresh mozzarella", amount: "200", unit: "g" },
    { name: "Fresh basil leaves", amount: "8", unit: "leaves" },
    { name: "Extra virgin olive oil", amount: "2", unit: "tbsp" },
    { name: "Salt", amount: "1", unit: "tsp" },
    { name: "Black pepper", amount: "1/2", unit: "tsp" }
  ],
  instructions: [
    "Preheat your oven to 475°F (245°C) with a pizza stone inside if you have one.",
    "Roll out the pizza dough on a floured surface to your desired thickness.",
    "Crush the tomatoes by hand and spread evenly over the dough, leaving a small border around the edge.",
    "Tear the mozzarella into pieces and distribute evenly over the sauce.",
    "Bake for 10-12 minutes until the crust is golden and the cheese is bubbling.",
    "Remove from the oven and immediately scatter fresh basil leaves on top.",
    "Drizzle with olive oil, and season with salt and pepper to taste.",
    "Slice and serve hot."
  ],
  nutrition: {
    calories: 285,
    protein: 12,
    carbs: 38,
    fat: 9,
    fiber: 2
  },
  tags: ["Italian", "Vegetarian", "Dinner", "Classic"],
  author: "Chef Mario",
  reviews: [
    {
      id: 1,
      userName: "PizzaLover",
      rating: 5,
      date: "October 15, 2023",
      comment: "Perfect recipe! The crust came out crispy and the flavors were authentic. My family loved it."
    },
    {
      id: 2,
      userName: "HomeChef22",
      rating: 4,
      date: "November 3, 2023",
      comment: "Great recipe but I added some garlic to the sauce for extra flavor. Will make again!"
    },
    {
      id: 3,
      userName: "ItalianFoodie",
      rating: 5,
      date: "December 8, 2023",
      comment: "As an Italian, I approve! Simple, authentic, and delicious. The key is using quality ingredients."
    }
  ],
  averageRating: 4.7
};

const App = () => {
  const [navigationCollapsed, setNavigationCollapsed] = useState(false);
  
  useEffect(() => {
    const handleStorageChange = () => {
      const collapsed = localStorage.getItem("navigationCollapsed") === "true";
      setNavigationCollapsed(collapsed);
    };
    
    // Initial check
    handleStorageChange();
    
    // Listen for changes
    window.addEventListener("storage", handleStorageChange);
    
    // Check for changes every second (for same-window updates)
    const interval = setInterval(handleStorageChange, 1000);
    
    return () => {
      window.removeEventListener("storage", handleStorageChange);
      clearInterval(interval);
    };
  }, []);
  
  const contentMargin = navigationCollapsed ? 'ml-16' : 'ml-64';

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <ChatbotProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/dashboard" element={
                <div className="flex">
                  <Navigation />
                  <div className={`flex-1 ${contentMargin} transition-all duration-300`}>
                    <PantryInventory />
                    <Chatbot />
                  </div>
                </div>
              } />
              <Route path="/recipes" element={
                <div className="flex">
                  <Navigation />
                  <div className={`flex-1 ${contentMargin} transition-all duration-300`}>
                    <RecipeManagement />
                    <Chatbot />
                  </div>
                </div>
              } />
              <Route path="/recipe/:id" element={
                <div className="flex">
                  <Navigation />
                  <div className={`flex-1 ${contentMargin} transition-all duration-300 py-10 px-6 bg-pantry-cream/30`}>
                    <RecipeDetail {...sampleRecipe} />
                    <Chatbot />
                  </div>
                </div>
              } />
              <Route path="/conversion" element={
                <div className="flex">
                  <Navigation />
                  <div className={`flex-1 ${contentMargin} transition-all duration-300`}>
                    <IngredientConversion />
                    <Chatbot />
                  </div>
                </div>
              } />
              <Route path="/dietary" element={
                <div className="flex">
                  <Navigation />
                  <div className={`flex-1 ${contentMargin} transition-all duration-300`}>
                    <DietaryPreferences />
                    <Chatbot />
                  </div>
                </div>
              } />
              <Route path="/shopping" element={
                <div className="flex">
                  <Navigation />
                  <div className={`flex-1 ${contentMargin} transition-all duration-300`}>
                    <Shopping />
                    <Chatbot />
                  </div>
                </div>
              } />
              <Route path="/meal-planning" element={
                <div className="flex">
                  <Navigation />
                  <div className={`flex-1 ${contentMargin} transition-all duration-300`}>
                    <MealPlanning />
                    <Chatbot />
                  </div>
                </div>
              } />
              <Route path="/container-scanner" element={
                <div className="flex">
                  <Navigation />
                  <div className={`flex-1 ${contentMargin} transition-all duration-300`}>
                    <ContainerScanner />
                    <Chatbot />
                  </div>
                </div>
              } />
              <Route path="/recipe-upload" element={
                <div className="flex">
                  <Navigation />
                  <div className={`flex-1 ${contentMargin} transition-all duration-300`}>
                    <RecipeUpload />
                    <Chatbot />
                  </div>
                </div>
              } />
              <Route path="*" element={
                <div className="flex">
                  <Navigation />
                  <div className={`flex-1 ${contentMargin} transition-all duration-300`}>
                    <NotFound />
                    <Chatbot />
                  </div>
                </div>
              } />
            </Routes>
          </BrowserRouter>
        </ChatbotProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
