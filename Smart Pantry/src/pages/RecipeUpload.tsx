import { useState } from "react";
import { PantryHeader } from "@/components/PantryHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ImagePlus, Plus, X, ChefHat, Clock, UserCircle2 } from "lucide-react";

interface Ingredient {
  id: number;
  name: string;
  amount: string;
  unit: string;
}

interface Category {
  value: string;
  label: string;
}

const categories: Category[] = [
  { value: "breakfast", label: "Breakfast" },
  { value: "lunch", label: "Lunch" },
  { value: "dinner", label: "Dinner" },
  { value: "dessert", label: "Dessert" },
  { value: "snack", label: "Snack" },
  { value: "beverage", label: "Beverage" },
];

const RecipeUpload = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [instructions, setInstructions] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [cookingTime, setCookingTime] = useState("");
  const [servings, setServings] = useState("");
  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [preparationTime, setPreparationTime] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState("");

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const addIngredient = () => {
    setIngredients(prev => [...prev, {
      id: Date.now(),
      name: "",
      amount: "",
      unit: ""
    }]);
  };

  const removeIngredient = (id: number) => {
    setIngredients(prev => prev.filter(ing => ing.id !== id));
  };

  const updateIngredient = (id: number, field: keyof Ingredient, value: string) => {
    setIngredients(prev => prev.map(ing =>
      ing.id === id ? { ...ing, [field]: value } : ing
    ));
  };

  const addTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && newTag.trim()) {
      e.preventDefault();
      setTags(prev => [...prev, newTag.trim()]);
      setNewTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(prev => prev.filter(tag => tag !== tagToRemove));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pantry-cream to-white">
      <PantryHeader />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 text-center animate-fadeIn">
            <h1 className="text-4xl font-display text-pantry-brown mb-2">Create Your Recipe</h1>
            <p className="text-gray-600">Share your culinary masterpiece with the community</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="p-6 space-y-8">
              <div className="group cursor-pointer relative rounded-xl overflow-hidden transition-all duration-300 hover:shadow-md animate-scaleIn">
                <div className={`aspect-video flex items-center justify-center ${
                  image ? 'bg-gray-900' : 'bg-gray-50'
                }`}>
                  {image ? (
                    <div className="relative w-full h-full">
                      <img
                        src={image}
                        alt="Recipe"
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <Button
                          onClick={() => setImage(null)}
                          variant="ghost"
                          className="text-white hover:text-white/90"
                        >
                          Change Photo
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <label className="cursor-pointer p-8 text-center">
                      <ImagePlus className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                      <span className="text-sm text-gray-600">Upload a cover photo for your recipe</span>
                      <Input
                        type="file"
                        className="sr-only"
                        accept="image/*"
                        onChange={handleImageUpload}
                      />
                    </label>
                  )}
                </div>
              </div>

              <div className="space-y-6 animate-slideIn">
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Give your recipe a catchy title"
                  className="text-xl font-medium"
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-gray-600 mb-1 block">Category</label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      <option value="">Select category</option>
                      {categories.map(cat => (
                        <option key={cat.value} value={cat.value}>{cat.label}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600 mb-1 block">Difficulty</label>
                    <select
                      value={difficulty}
                      onChange={(e) => setDifficulty(e.target.value)}
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      <option value="">Select difficulty</option>
                      <option value="easy">Easy</option>
                      <option value="medium">Medium</option>
                      <option value="hard">Hard</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center gap-2">
                    <Clock className="text-gray-400" size={20} />
                    <Input
                      value={preparationTime}
                      onChange={(e) => setPreparationTime(e.target.value)}
                      placeholder="Prep Time"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="text-gray-400" size={20} />
                    <Input
                      value={cookingTime}
                      onChange={(e) => setCookingTime(e.target.value)}
                      placeholder="Cook Time"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <UserCircle2 className="text-gray-400" size={20} />
                    <Input
                      value={servings}
                      onChange={(e) => setServings(e.target.value)}
                      placeholder="Servings"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm text-gray-600 mb-1 block">Recipe Tags</label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {tags.map(tag => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-pantry-sage/10 text-pantry-sage text-sm"
                      >
                        {tag}
                        <button
                          onClick={() => removeTag(tag)}
                          className="hover:text-pantry-terracotta"
                        >
                          <X size={14} />
                        </button>
                      </span>
                    ))}
                  </div>
                  <Input
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyDown={addTag}
                    placeholder="Add tags (press Enter)"
                  />
                </div>

                <Textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe your recipe and share its story..."
                  className="min-h-[100px]"
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-display text-pantry-brown flex items-center gap-2">
                    <ChefHat className="h-5 w-5" />
                    Ingredients
                  </h2>
                  <Button
                    onClick={addIngredient}
                    variant="outline"
                    size="sm"
                    className="text-pantry-sage hover:text-pantry-sage/90 hover:border-pantry-sage"
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Add Ingredient
                  </Button>
                </div>
                
                <div className="space-y-3">
                  {ingredients.map((ing, index) => (
                    <div 
                      key={ing.id} 
                      className="flex gap-2 animate-slideIn"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <Input
                        value={ing.amount}
                        onChange={(e) => updateIngredient(ing.id, 'amount', e.target.value)}
                        placeholder="Amount"
                        className="w-24"
                      />
                      <Input
                        value={ing.unit}
                        onChange={(e) => updateIngredient(ing.id, 'unit', e.target.value)}
                        placeholder="Unit"
                        className="w-24"
                      />
                      <Input
                        value={ing.name}
                        onChange={(e) => updateIngredient(ing.id, 'name', e.target.value)}
                        placeholder="Ingredient name"
                        className="flex-1"
                      />
                      <Button
                        onClick={() => removeIngredient(ing.id)}
                        variant="ghost"
                        size="icon"
                        className="text-gray-400 hover:text-pantry-terracotta transition-colors"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h2 className="text-xl font-display text-pantry-brown flex items-center gap-2">
                  <ChefHat className="h-5 w-5" />
                  Cooking Instructions
                </h2>
                <Textarea
                  value={instructions}
                  onChange={(e) => setInstructions(e.target.value)}
                  placeholder="Write clear, step-by-step instructions for your recipe..."
                  className="min-h-[200px]"
                />
              </div>

              <Button 
                className="w-full bg-pantry-sage hover:bg-pantry-sage/90 text-lg py-6 transition-all duration-300 hover:shadow-lg"
                onClick={() => console.log("Recipe saved", { 
                  title, description, ingredients, instructions, image,
                  cookingTime, preparationTime, servings, category,
                  difficulty, tags
                })}
              >
                Share Recipe
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default RecipeUpload;
