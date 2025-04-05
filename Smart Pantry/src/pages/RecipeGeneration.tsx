
import { useState } from "react";
import { PantryHeader } from "@/components/PantryHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Check, ChefHat, Search } from "lucide-react";
import { Link } from "react-router-dom";

// Sample ingredient categories and ingredients
const ingredientCategories = [
  {
    name: "Proteins",
    items: ["Chicken", "Beef", "Tofu", "Eggs", "Fish", "Beans"]
  },
  {
    name: "Vegetables",
    items: ["Tomatoes", "Onions", "Bell Peppers", "Carrots", "Spinach", "Broccoli"]
  },
  {
    name: "Grains",
    items: ["Rice", "Pasta", "Quinoa", "Bread", "Oats"]
  },
  {
    name: "Dairy",
    items: ["Milk", "Cheese", "Yogurt", "Butter", "Cream"]
  },
  {
    name: "Fruits",
    items: ["Apples", "Bananas", "Berries", "Oranges", "Lemons"]
  },
  {
    name: "Pantry Staples",
    items: ["Flour", "Sugar", "Salt", "Pepper", "Olive Oil", "Soy Sauce"]
  }
];

// Dietary preference options
const dietaryOptions = [
  { id: "vegetarian", label: "Vegetarian" },
  { id: "vegan", label: "Vegan" },
  { id: "gluten-free", label: "Gluten-Free" },
  { id: "dairy-free", label: "Dairy-Free" },
  { id: "nut-free", label: "Nut-Free" },
  { id: "low-carb", label: "Low-Carb" }
];

// Type for generated recipes
interface GeneratedRecipe {
  id: string;
  title: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  dietary: string[];
  cookingTime?: string;
  prepTime?: string;
  servings?: number;
  difficulty?: string;
}

// Sample recipe templates to use for local generation
const recipeTemplates = [
  {
    title: "Simple {protein} Stir Fry",
    description: "A quick and easy stir fry that combines {protein} with fresh vegetables and a savory sauce.",
    ingredients: [
      "{amount} {protein}, cut into bite-sized pieces",
      "2 cups mixed vegetables (like {vegetable1}, {vegetable2})",
      "2 tbsp olive oil",
      "2 cloves garlic, minced",
      "1 tbsp soy sauce",
      "1 tsp {spice}",
      "2 cups cooked {grain}"
    ],
    instructions: [
      "Heat oil in a large pan or wok over medium-high heat.",
      "Add the {protein} and cook until browned, about 5-7 minutes.",
      "Add garlic and cook for 30 seconds until fragrant.",
      "Add the vegetables and stir-fry for 3-5 minutes until crisp-tender.",
      "Stir in soy sauce and {spice}.",
      "Serve hot over cooked {grain}."
    ],
    cookingTime: "15 mins",
    prepTime: "10 mins",
    difficulty: "Easy",
    servings: 4
  },
  {
    title: "Hearty {grain} Bowl with {protein}",
    description: "A nutritious bowl packed with {grain}, {protein}, and fresh vegetables.",
    ingredients: [
      "2 cups cooked {grain}",
      "{amount} {protein}",
      "1 cup {vegetable1}, chopped",
      "1/2 cup {vegetable2}, diced",
      "1/4 cup {dairy} (optional)",
      "2 tbsp olive oil",
      "1 tbsp lemon juice",
      "Salt and pepper to taste",
      "Fresh herbs for garnish"
    ],
    instructions: [
      "Prepare the {grain} according to package instructions.",
      "Cook the {protein} until done.",
      "In a bowl, combine the cooked {grain}, {protein}, and chopped vegetables.",
      "Drizzle with olive oil and lemon juice.",
      "Season with salt and pepper.",
      "Top with {dairy} and fresh herbs if desired.",
      "Serve warm or cold."
    ],
    cookingTime: "20 mins",
    prepTime: "15 mins",
    difficulty: "Medium",
    servings: 2
  },
  {
    title: "Rustic {vegetable1} and {protein} Soup",
    description: "A comforting soup featuring {vegetable1}, {protein}, and aromatic herbs.",
    ingredients: [
      "{amount} {protein}",
      "2 cups {vegetable1}, chopped",
      "1 cup {vegetable2}, diced",
      "1 onion, diced",
      "2 cloves garlic, minced",
      "4 cups vegetable or chicken broth",
      "1 cup {grain} (optional)",
      "1 tsp dried herbs (thyme, rosemary, or oregano)",
      "Salt and pepper to taste",
      "2 tbsp olive oil"
    ],
    instructions: [
      "Heat olive oil in a large pot over medium heat.",
      "Add onions and garlic, cook until softened.",
      "Add {protein} and cook until browned (if applicable).",
      "Add {vegetable1} and {vegetable2}, cook for 5 minutes.",
      "Pour in broth and add herbs, salt, and pepper.",
      "If using {grain}, add it now.",
      "Simmer for 20-30 minutes until vegetables are tender and flavors meld.",
      "Adjust seasoning to taste and serve hot."
    ],
    cookingTime: "35 mins",
    prepTime: "15 mins",
    difficulty: "Medium",
    servings: 6
  }
];

// Helper ingredients for recipe templates
const proteins = ["chicken", "beef", "tofu", "shrimp", "chickpeas", "tempeh"];
const vegetables = ["bell peppers", "carrots", "broccoli", "spinach", "zucchini", "mushrooms", "tomatoes", "onions"];
const grains = ["rice", "quinoa", "pasta", "couscous", "farro", "barley"];
const spices = ["paprika", "cumin", "coriander", "ginger", "turmeric", "oregano", "basil"];
const dairyProducts = ["cheese", "yogurt", "sour cream", "feta", "parmesan"];
const amounts = ["1 pound", "2 cups", "1 1/2 cups", "12 ounces", "500g"];

const RecipeGeneration = () => {
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [selectedDietary, setSelectedDietary] = useState<string[]>([]);
  const [generatedRecipes, setGeneratedRecipes] = useState<GeneratedRecipe[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  // Toggle ingredient selection
  const toggleIngredient = (ingredient: string) => {
    setSelectedIngredients(prev => 
      prev.includes(ingredient)
        ? prev.filter(item => item !== ingredient)
        : [...prev, ingredient]
    );
  };

  // Toggle dietary preference
  const toggleDietary = (dietaryId: string) => {
    setSelectedDietary(prev => 
      prev.includes(dietaryId)
        ? prev.filter(item => item !== dietaryId)
        : [...prev, dietaryId]
    );
  };

  // Helper function to get random item from array
  const getRandomItem = (array: string[]) => {
    return array[Math.floor(Math.random() * array.length)];
  };

  // Helper function to filter appropriate proteins based on dietary restrictions
  const getAppropriateProteins = (dietaryRestrictions: string[]) => {
    let filteredProteins = [...proteins];
    
    if (dietaryRestrictions.includes("vegetarian") || dietaryRestrictions.includes("vegan")) {
      filteredProteins = filteredProteins.filter(p => !["chicken", "beef", "shrimp"].includes(p));
    }
    
    if (dietaryRestrictions.includes("vegan")) {
      filteredProteins = filteredProteins.filter(p => !["eggs"].includes(p));
    }
    
    return filteredProteins.length > 0 ? filteredProteins : ["tofu"];
  };

  // Helper function to filter appropriate dairy based on dietary restrictions
  const getAppropriateDairy = (dietaryRestrictions: string[]) => {
    if (dietaryRestrictions.includes("vegan") || dietaryRestrictions.includes("dairy-free")) {
      return ["non-dairy yogurt", "plant-based cheese", "coconut cream"];
    }
    return dairyProducts;
  };

  // Generate recipes locally based on selected ingredients and dietary preferences
  const generateRecipes = () => {
    if (selectedIngredients.length === 0) {
      toast({
        title: "No ingredients selected",
        description: "Please select at least one ingredient to generate recipes",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);

    try {
      // Create 3 unique recipes
      const newRecipes: GeneratedRecipe[] = [];
      
      // Get categorized selected ingredients
      const selectedProteins = selectedIngredients.filter(item => 
        ingredientCategories[0].items.includes(item)
      );
      
      const selectedVegetables = selectedIngredients.filter(item => 
        ingredientCategories[1].items.includes(item)
      );
      
      const selectedGrains = selectedIngredients.filter(item => 
        ingredientCategories[2].items.includes(item)
      );
      
      const selectedDairy = selectedIngredients.filter(item => 
        ingredientCategories[3].items.includes(item)
      );
      
      // Generate 3 recipes
      for (let i = 0; i < 3; i++) {
        // Pick a random template
        const template = { ...recipeTemplates[i % recipeTemplates.length] };
        
        // Determine appropriate ingredients based on dietary restrictions
        const appropriateProteins = getAppropriateProteins(selectedDietary);
        const appropriateDairy = getAppropriateDairy(selectedDietary);
        
        // Pick protein - prioritize selected proteins if available
        const protein = selectedProteins.length > 0 
          ? selectedProteins[i % selectedProteins.length] 
          : getRandomItem(appropriateProteins);
          
        // Pick vegetables - prioritize selected vegetables if available
        const vegetable1 = selectedVegetables.length > 0 
          ? selectedVegetables[i % selectedVegetables.length] 
          : getRandomItem(vegetables);
          
        const vegetable2 = selectedVegetables.length > 1 
          ? selectedVegetables[(i + 1) % selectedVegetables.length] 
          : getRandomItem(vegetables.filter(v => v !== vegetable1));
          
        // Pick grain - prioritize selected grains if available
        const grain = selectedGrains.length > 0 
          ? selectedGrains[i % selectedGrains.length] 
          : getRandomItem(grains);
          
        // Pick dairy if needed - prioritize selected dairy if available
        const dairy = selectedDairy.length > 0 
          ? selectedDairy[i % selectedDairy.length] 
          : getRandomItem(appropriateDairy);
          
        // Fill in the template
        const title = template.title
          .replace("{protein}", protein)
          .replace("{vegetable1}", vegetable1)
          .replace("{grain}", grain);
          
        const description = template.description
          .replace("{protein}", protein)
          .replace("{vegetable1}", vegetable1)
          .replace("{vegetable2}", vegetable2)
          .replace("{grain}", grain);
          
        const ingredients = template.ingredients.map(ingredient => 
          ingredient
            .replace("{protein}", protein)
            .replace("{vegetable1}", vegetable1)
            .replace("{vegetable2}", vegetable2)
            .replace("{grain}", grain)
            .replace("{dairy}", dairy)
            .replace("{spice}", getRandomItem(spices))
            .replace("{amount}", getRandomItem(amounts))
        );
        
        const instructions = template.instructions.map(instruction => 
          instruction
            .replace("{protein}", protein)
            .replace("{vegetable1}", vegetable1)
            .replace("{vegetable2}", vegetable2)
            .replace("{grain}", grain)
            .replace("{dairy}", dairy)
            .replace("{spice}", getRandomItem(spices))
        );
        
        newRecipes.push({
          id: Math.random().toString(36).substring(2, 15),
          title,
          description,
          ingredients,
          instructions,
          dietary: selectedDietary,
          cookingTime: template.cookingTime,
          prepTime: template.prepTime,
          servings: template.servings,
          difficulty: template.difficulty
        });
      }

      setGeneratedRecipes(newRecipes);
      
      toast({
        title: "Recipes generated!",
        description: `Created ${newRecipes.length} unique recipes with your ingredients`,
      });
    } catch (error) {
      console.error("Error generating recipes:", error);
      toast({
        title: "Recipe generation failed",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-pantry-cream">
      <PantryHeader />
      <main className="max-w-7xl mx-auto px-4 py-8 animate-fadeIn">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h1 className="text-2xl font-semibold text-pantry-brown mb-2">Recipe Generator</h1>
          <p className="text-muted-foreground mb-6">
            Select ingredients from your pantry and dietary preferences to generate personalized recipe suggestions.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Ingredients Selection Section */}
            <div className="lg:col-span-2 space-y-6">
              <h2 className="text-xl font-medium text-pantry-brown">Available Ingredients</h2>
              
              <div className="space-y-6">
                {ingredientCategories.map((category) => (
                  <div key={category.name}>
                    <h3 className="text-lg font-medium mb-3">{category.name}</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {category.items.map((ingredient) => (
                        <div key={ingredient} className="flex items-center space-x-2">
                          <Checkbox 
                            id={ingredient} 
                            checked={selectedIngredients.includes(ingredient)}
                            onCheckedChange={() => toggleIngredient(ingredient)}
                          />
                          <Label htmlFor={ingredient} className="text-sm cursor-pointer">
                            {ingredient}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Dietary Preferences Section */}
            <div className="space-y-6">
              <h2 className="text-xl font-medium text-pantry-brown">Dietary Preferences</h2>
              <div className="bg-gray-50 p-4 rounded-md space-y-3">
                {dietaryOptions.map((option) => (
                  <div key={option.id} className="flex items-center space-x-2">
                    <Checkbox 
                      id={option.id} 
                      checked={selectedDietary.includes(option.id)}
                      onCheckedChange={() => toggleDietary(option.id)}
                    />
                    <Label htmlFor={option.id} className="cursor-pointer">
                      {option.label}
                    </Label>
                  </div>
                ))}
              </div>

              <div className="pt-4">
                <Button 
                  className="w-full bg-pantry-sage hover:bg-pantry-sage/90"
                  onClick={generateRecipes}
                  disabled={isGenerating}
                >
                  {isGenerating ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Generating...
                    </span>
                  ) : (
                    <span className="flex items-center">
                      <ChefHat className="mr-2 h-4 w-4" />
                      Generate Recipes
                    </span>
                  )}
                </Button>
                
                <button 
                  className="w-full mt-2 text-sm text-pantry-brown hover:underline"
                  onClick={() => {
                    setSelectedIngredients([]);
                    setSelectedDietary([]);
                  }}
                >
                  Clear Selection
                </button>
              </div>
            </div>
          </div>

          {/* Generated Recipes Section */}
          {generatedRecipes.length > 0 && (
            <div className="mt-10">
              <h2 className="text-xl font-medium text-pantry-brown mb-6">
                Generated Recipes ({generatedRecipes.length})
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {generatedRecipes.map((recipe) => (
                  <Card key={recipe.id} className="overflow-hidden">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg">{recipe.title}</CardTitle>
                      <CardDescription>
                        {recipe.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="flex flex-wrap gap-1 mb-2">
                        {recipe.dietary.map((tag) => (
                          <span key={tag} className="bg-pantry-sage/20 text-pantry-sage text-xs px-2 py-1 rounded-md">
                            {tag}
                          </span>
                        ))}
                        <span className="bg-pantry-sage/20 text-pantry-sage text-xs px-2 py-1 rounded-md">
                          {recipe.difficulty || "Medium"}
                        </span>
                        <span className="bg-pantry-sage/20 text-pantry-sage text-xs px-2 py-1 rounded-md">
                          {recipe.cookingTime || "30 mins"}
                        </span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        <p className="font-medium mb-1">Ingredients:</p>
                        <ul className="list-disc list-inside">
                          {recipe.ingredients.slice(0, 5).map((ingredient, idx) => (
                            <li key={idx} className={selectedIngredients.some(item => ingredient.toLowerCase().includes(item.toLowerCase())) ? "text-pantry-sage font-medium" : ""}>
                              {ingredient} {selectedIngredients.some(item => ingredient.toLowerCase().includes(item.toLowerCase())) && <Check className="inline h-3 w-3" />}
                            </li>
                          ))}
                          {recipe.ingredients.length > 5 && <li>...and {recipe.ingredients.length - 5} more</li>}
                        </ul>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button 
                        variant="outline" 
                        className="w-full"
                        onClick={() => {
                          // Create a modal or navigate to full recipe view
                          // For now, we'll show a toast with more details
                          toast({
                            title: recipe.title,
                            description: "Full recipe view coming soon!",
                          });
                        }}
                      >
                        View Full Recipe
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default RecipeGeneration;
