
import { X } from "lucide-react";
import { useState } from "react";
import { PantryHeader } from "@/components/PantryHeader";
import { AdvancedSearch } from "@/components/AdvancedSearch";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Users, ChefHat, Heart, Edit, Trash2, Star } from "lucide-react";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { RecipeGenerator } from "@/components/RecipeGenerator";

interface Recipe {
  id: number;
  title: string;
  description: string;
  image: string;
  cookingTime: string;
  servings: number;
  category: string;
  favorite: boolean;
  rating: number;
  reviewCount: number;
  tags: string[];
  nutritionalInfo: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  }
}

const dummyRecipes: Recipe[] = [
  {
    id: 1,
    title: "Classic Margherita Pizza",
    description: "A traditional Italian pizza with fresh basil, mozzarella, and tomato sauce",
    image: "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    cookingTime: "30 mins",
    servings: 4,
    category: "Italian",
    favorite: true,
    rating: 4.8,
    reviewCount: 124,
    tags: ["Italian", "Vegetarian", "Dinner"],
    nutritionalInfo: {
      calories: 285,
      protein: 12,
      carbs: 38,
      fat: 9
    }
  },
  {
    id: 2,
    title: "Chicken Tikka Masala",
    description: "Grilled chicken pieces in a rich, creamy tomato-based curry sauce",
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    cookingTime: "45 mins",
    servings: 6,
    category: "Indian",
    favorite: false,
    rating: 4.7,
    reviewCount: 98,
    tags: ["Indian", "Spicy", "Dinner", "Chicken"],
    nutritionalInfo: {
      calories: 320,
      protein: 24,
      carbs: 15,
      fat: 18
    }
  },
  {
    id: 3,
    title: "Quinoa Buddha Bowl",
    description: "A healthy bowl packed with quinoa, roasted vegetables, and tahini dressing",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    cookingTime: "25 mins",
    servings: 2,
    category: "Vegetarian",
    favorite: true,
    rating: 4.9,
    reviewCount: 87,
    tags: ["Vegetarian", "Healthy", "Lunch", "Gluten-Free"],
    nutritionalInfo: {
      calories: 420,
      protein: 15,
      carbs: 65,
      fat: 12
    }
  },
  {
    id: 4,
    title: "Honey Glazed Salmon",
    description: "Perfectly seared salmon fillets with a sweet and savory honey glaze",
    image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    cookingTime: "20 mins",
    servings: 4,
    category: "Seafood",
    favorite: false,
    rating: 4.6,
    reviewCount: 56,
    tags: ["Seafood", "Quick", "Dinner", "High-Protein"],
    nutritionalInfo: {
      calories: 350,
      protein: 28,
      carbs: 12,
      fat: 20
    }
  },
  {
    id: 5,
    title: "Chocolate Chip Cookies",
    description: "Classic homemade cookies with crispy edges and a soft, chewy center",
    image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    cookingTime: "15 mins",
    servings: 24,
    category: "Dessert",
    favorite: true,
    rating: 4.9,
    reviewCount: 142,
    tags: ["Dessert", "Baking", "Sweet", "Comfort Food"],
    nutritionalInfo: {
      calories: 180,
      protein: 2,
      carbs: 24,
      fat: 9
    }
  },
  {
    id: 6,
    title: "Avocado Toast with Poached Egg",
    description: "Creamy avocado on toasted sourdough bread topped with a perfectly poached egg",
    image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    cookingTime: "15 mins",
    servings: 2,
    category: "Breakfast",
    favorite: false,
    rating: 4.5,
    reviewCount: 68,
    tags: ["Breakfast", "Quick", "Vegetarian", "Brunch"],
    nutritionalInfo: {
      calories: 320,
      protein: 14,
      carbs: 28,
      fat: 18
    }
  }
];

const RecipeManagement = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [recipes, setRecipes] = useState<Recipe[]>(dummyRecipes);
  const [sortOption, setSortOption] = useState("newest");
  const [layoutType, setLayoutType] = useState<"grid" | "list">("grid");

  const toggleFavorite = (id: number) => {
    setRecipes(prevRecipes => 
      prevRecipes.map(recipe => 
        recipe.id === id ? { ...recipe, favorite: !recipe.favorite } : recipe
      )
    );
    
    const recipe = recipes.find(r => r.id === id);
    if (recipe) {
      toast({
        title: recipe.favorite ? "Removed from favorites" : "Added to favorites",
        description: `"${recipe.title}" has been ${recipe.favorite ? "removed from" : "added to"} your favorites`,
        duration: 3000,
      });
    }
  };
  
  const deleteRecipe = (id: number) => {
    const recipe = recipes.find(r => r.id === id);
    if (recipe) {
      // In a real app, we would call an API to delete the recipe
      setRecipes(prevRecipes => prevRecipes.filter(recipe => recipe.id !== id));
      
      toast({
        title: "Recipe deleted",
        description: `"${recipe.title}" has been deleted`,
        variant: "destructive",
        duration: 3000,
      });
    }
  };
  
  const handleSearch = (query: string, filters: any) => {
    // In a real app, we would call an API with the search parameters
    console.log("Searching for:", query, "with filters:", filters);
    
    // For now, just filter by title
    if (query) {
      const filtered = dummyRecipes.filter(recipe => 
        recipe.title.toLowerCase().includes(query.toLowerCase()) ||
        recipe.description.toLowerCase().includes(query.toLowerCase()) ||
        recipe.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
      );
      setRecipes(filtered);
    } else {
      setRecipes(dummyRecipes);
    }
  };
  
  const sortRecipes = (option: string) => {
    setSortOption(option);
    
    let sorted = [...recipes];
    switch (option) {
      case "name-asc":
        sorted.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "name-desc":
        sorted.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case "rating":
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      case "time":
        sorted.sort((a, b) => {
          const timeA = parseInt(a.cookingTime.split(" ")[0]);
          const timeB = parseInt(b.cookingTime.split(" ")[0]);
          return timeA - timeB;
        });
        break;
      default:
        // newest (no sort for this demo)
        break;
    }
    
    setRecipes(sorted);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pantry-cream to-white">
      <PantryHeader />
      <main className="max-w-7xl mx-auto px-4 py-8 animate-fadeIn">
        <div className="mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-4xl font-display text-pantry-brown mb-2">My Recipes</h1>
              <p className="text-gray-600">Manage and organize your favorite recipes</p>
            </div>
            <div className="flex gap-3">
              <RecipeGenerator />
              <Button 
                className="bg-pantry-sage hover:bg-pantry-sage/90"
                onClick={() => navigate('/recipe-upload')}
              >
                <ChefHat className="mr-2 h-4 w-4" />
                Add New Recipe
              </Button>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <AdvancedSearch onSearch={handleSearch} />
            
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex items-center gap-2">
                <p className="text-sm text-gray-500">
                  {recipes.length} {recipes.length === 1 ? "recipe" : "recipes"} found
                </p>
                
                {searchQuery && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-8 text-xs"
                    onClick={() => {
                      setSearchQuery("");
                      setRecipes(dummyRecipes);
                    }}
                  >
                    <X className="h-3 w-3 mr-1" />
                    Clear search
                  </Button>
                )}
              </div>
              
              <div className="flex items-center gap-2">
                <Select
                  value={sortOption}
                  onValueChange={sortRecipes}
                >
                  <SelectTrigger className="w-[180px] h-9">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="name-asc">Name (A-Z)</SelectItem>
                    <SelectItem value="name-desc">Name (Z-A)</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                    <SelectItem value="time">Cooking Time</SelectItem>
                  </SelectContent>
                </Select>
                
                <div className="flex border rounded-lg overflow-hidden">
                  <Button
                    variant="ghost"
                    size="icon"
                    className={`h-9 w-9 rounded-none ${layoutType === 'grid' ? 'bg-gray-100' : ''}`}
                    onClick={() => setLayoutType('grid')}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="3" width="7" height="7" />
                      <rect x="14" y="3" width="7" height="7" />
                      <rect x="3" y="14" width="7" height="7" />
                      <rect x="14" y="14" width="7" height="7" />
                    </svg>
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className={`h-9 w-9 rounded-none ${layoutType === 'list' ? 'bg-gray-100' : ''}`}
                    onClick={() => setLayoutType('list')}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="8" y1="6" x2="21" y2="6" />
                      <line x1="8" y1="12" x2="21" y2="12" />
                      <line x1="8" y1="18" x2="21" y2="18" />
                      <line x1="3" y1="6" x2="3.01" y2="6" />
                      <line x1="3" y1="12" x2="3.01" y2="12" />
                      <line x1="3" y1="18" x2="3.01" y2="18" />
                    </svg>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {recipes.length === 0 ? (
          <div className="text-center py-12">
            <ChefHat className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-xl font-medium text-gray-900 mb-1">No recipes found</h3>
            <p className="text-gray-500">Try adjusting your search or filters to find what you're looking for.</p>
          </div>
        ) : layoutType === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recipes.map((recipe) => (
              <Card key={recipe.id} className="group overflow-hidden transition-all duration-300 hover:shadow-lg animate-scaleIn cursor-pointer" onClick={() => navigate(`/recipe/${recipe.id}`)}>
                <div className="relative aspect-video overflow-hidden">
                  <img 
                    src={recipe.image} 
                    alt={recipe.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <Button
                    variant="ghost"
                    size="icon"
                    className={`absolute top-2 right-2 text-white hover:text-white/90 ${
                      recipe.favorite ? 'text-red-500' : 'text-white/80'
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(recipe.id);
                    }}
                  >
                    <Heart className={`h-5 w-5 ${recipe.favorite ? 'fill-current' : ''}`} />
                  </Button>
                  
                  <div className="absolute top-2 left-2 flex flex-wrap gap-1">
                    {recipe.tags.slice(0, 2).map((tag, index) => (
                      <span key={index} className="bg-white/80 backdrop-blur-sm text-pantry-brown px-2 py-1 rounded-full text-xs">
                        {tag}
                      </span>
                    ))}
                    {recipe.tags.length > 2 && (
                      <span className="bg-white/80 backdrop-blur-sm text-pantry-brown px-2 py-1 rounded-full text-xs">
                        +{recipe.tags.length - 2}
                      </span>
                    )}
                  </div>
                </div>

                <CardHeader>
                  <CardTitle className="font-display text-xl text-pantry-brown">
                    {recipe.title}
                  </CardTitle>
                  <CardDescription className="line-clamp-2">
                    {recipe.description}
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <div className="flex items-center gap-1 mb-3">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star 
                          key={star} 
                          className={`h-4 w-4 ${
                            star <= Math.floor(recipe.rating) 
                              ? 'text-yellow-500 fill-current' 
                              : 'text-gray-300'
                          }`} 
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-500 ml-1">
                      ({recipe.reviewCount})
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {recipe.cookingTime}
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      {recipe.servings} servings
                    </div>
                  </div>
                </CardContent>

                <CardFooter className="flex justify-between">
                  <Button 
                    variant="ghost" 
                    className="text-pantry-sage hover:text-pantry-sage/90"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/recipe-upload?edit=${recipe.id}`);
                    }}
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="text-pantry-terracotta hover:text-pantry-terracotta/90"
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteRecipe(recipe.id);
                    }}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {recipes.map((recipe) => (
              <div 
                key={recipe.id} 
                className="flex flex-col sm:flex-row gap-4 bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow animate-fadeIn cursor-pointer"
                onClick={() => navigate(`/recipe/${recipe.id}`)}
              >
                <div className="relative w-full sm:w-48 h-48">
                  <img 
                    src={recipe.image} 
                    alt={recipe.title}
                    className="w-full h-full object-cover"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className={`absolute top-2 right-2 text-white hover:text-white/90 ${
                      recipe.favorite ? 'text-red-500' : 'text-white/80'
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(recipe.id);
                    }}
                  >
                    <Heart className={`h-5 w-5 ${recipe.favorite ? 'fill-current' : ''}`} />
                  </Button>
                </div>
                
                <div className="flex-1 p-4 flex flex-col">
                  <div className="flex flex-wrap gap-1 mb-2">
                    {recipe.tags.slice(0, 3).map((tag, index) => (
                      <span key={index} className="bg-pantry-cream text-pantry-brown px-2 py-1 rounded-full text-xs">
                        {tag}
                      </span>
                    ))}
                    {recipe.tags.length > 3 && (
                      <span className="bg-pantry-cream text-pantry-brown px-2 py-1 rounded-full text-xs">
                        +{recipe.tags.length - 3}
                      </span>
                    )}
                  </div>
                  
                  <h3 className="font-display text-xl text-pantry-brown mb-1">{recipe.title}</h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">{recipe.description}</p>
                  
                  <div className="flex items-center gap-1 mb-3">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star 
                          key={star} 
                          className={`h-4 w-4 ${
                            star <= Math.floor(recipe.rating) 
                              ? 'text-yellow-500 fill-current' 
                              : 'text-gray-300'
                          }`} 
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-500 ml-1">
                      ({recipe.reviewCount})
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-500 mt-auto">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {recipe.cookingTime}
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      {recipe.servings} servings
                    </div>
                    
                    <div className="ml-auto flex gap-2">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="text-pantry-sage hover:text-pantry-sage/90 h-8"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/recipe-upload?edit=${recipe.id}`);
                        }}
                      >
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="text-pantry-terracotta hover:text-pantry-terracotta/90 h-8"
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteRecipe(recipe.id);
                        }}
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default RecipeManagement;
