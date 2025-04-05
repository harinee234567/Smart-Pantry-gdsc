
import { ChefHat, TrendingUp, Clock, Users, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const FeaturesSection = () => {
  const navigate = useNavigate();
  
  const features = [
    {
      icon: ChefHat,
      title: "Recipe Management",
      description: "Store, organize, and discover recipes tailored to your preferences and pantry inventory."
    },
    {
      icon: TrendingUp,
      title: "Smart Recommendations",
      description: "Get personalized recipe suggestions based on your dietary preferences and available ingredients."
    },
    {
      icon: Clock,
      title: "Meal Planning",
      description: "Plan your meals for the week with an intuitive calendar and automatic shopping list generation."
    },
    {
      icon: Users,
      title: "Family Sharing",
      description: "Share meal plans and favorite recipes with family members and collaborate on shopping lists."
    },
    {
      icon: Smartphone,
      title: "Mobile Access",
      description: "Access your recipes, pantry inventory, and shopping lists on any device, anytime, anywhere."
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-pantry-cream to-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <span className="inline-block bg-pantry-sage/10 text-pantry-sage font-medium text-sm px-4 py-1.5 rounded-full mb-3 animate-fadeIn">
            Intelligent Kitchen Management
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-pantry-brown mb-4 animate-fadeIn" style={{ animationDelay: "0.1s" }}>
            Smart Features for Your Kitchen
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg animate-fadeIn" style={{ animationDelay: "0.2s" }}>
            Discover a smarter way to manage your kitchen, plan meals, and create delicious recipes.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white rounded-xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 animate-scaleIn hover:translate-y-[-5px] group/feature"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-14 h-14 rounded-xl bg-pantry-sage/10 flex items-center justify-center mb-5 group-hover/feature:bg-pantry-sage/20 transition-colors">
                <feature.icon className="h-7 w-7 text-pantry-sage" />
              </div>
              <h3 className="text-xl font-semibold text-pantry-brown mb-3">{feature.title}</h3>
              <p className="text-gray-600 mb-5">{feature.description}</p>
              <Button 
                variant="ghost" 
                onClick={() => navigate("/")}
                className="p-0 h-auto text-pantry-sage group-hover/feature:translate-x-1 transition-transform"
              >
                Learn more <span className="ml-1 transition-transform group-hover/feature:translate-x-1">→</span>
              </Button>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center animate-fadeIn" style={{ animationDelay: "0.5s" }}>
          <Button 
            onClick={() => navigate("/")}
            className="bg-pantry-sage hover:bg-pantry-sage/90 text-white font-medium py-6 px-8 rounded-lg"
          >
            <ChefHat className="mr-2 h-5 w-5" />
            Explore All Features
          </Button>
        </div>
      </div>
    </section>
  );
};
