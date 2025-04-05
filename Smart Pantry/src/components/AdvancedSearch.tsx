
import { useState } from "react";
import { Search, X, Filter, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

interface SearchFilters {
  cookingTime: [number, number];
  mealTypes: string[];
  diets: string[];
  cuisines: string[];
  ingredients: string[];
}

const initialFilters: SearchFilters = {
  cookingTime: [0, 120],
  mealTypes: [],
  diets: [],
  cuisines: [],
  ingredients: []
};

interface AdvancedSearchProps {
  onSearch: (query: string, filters: SearchFilters) => void;
  className?: string;
}

export const AdvancedSearch = ({ onSearch, className = "" }: AdvancedSearchProps) => {
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState<SearchFilters>(initialFilters);
  const [activeFilterCount, setActiveFilterCount] = useState(0);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  
  // Mock suggestions based on input
  const getSuggestions = (input: string) => {
    const allSuggestions = [
      "Pasta", "Pizza", "Chicken", "Vegetarian", "Vegan", "Quick meals",
      "Breakfast", "Lunch", "Dinner", "Dessert", "Italian", "Mexican",
      "Indian", "Chinese", "Thai", "Gluten-free", "Low-carb", "High-protein"
    ];
    
    if (!input.trim()) return [];
    
    return allSuggestions.filter(item => 
      item.toLowerCase().includes(input.toLowerCase())
    ).slice(0, 5);
  };
  
  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    
    if (value.trim()) {
      const newSuggestions = getSuggestions(value);
      setSuggestions(newSuggestions);
      setShowSuggestions(newSuggestions.length > 0);
    } else {
      setShowSuggestions(false);
    }
  };
  
  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    setShowSuggestions(false);
    handleSearch();
  };
  
  const handleSearch = () => {
    onSearch(query, filters);
    setShowSuggestions(false);
  };
  
  const handleFilterChange = <K extends keyof SearchFilters>(
    filterType: K, 
    value: SearchFilters[K]
  ) => {
    setFilters(prev => ({ ...prev, [filterType]: value }));
    
    // Count active filters
    let count = 0;
    
    if (filterType === 'cookingTime') {
      // Only count cooking time if it's different from default
      if (value[0] !== initialFilters.cookingTime[0] || value[1] !== initialFilters.cookingTime[1]) {
        count++;
      }
    } else {
      // For array filters, count if they have any items
      count = (value as string[]).length;
    }
    
    // Calculate total active filters
    const updatedFilters = { ...filters, [filterType]: value };
    const newCount = 
      (updatedFilters.cookingTime[0] !== initialFilters.cookingTime[0] || 
       updatedFilters.cookingTime[1] !== initialFilters.cookingTime[1] ? 1 : 0) +
      updatedFilters.mealTypes.length +
      updatedFilters.diets.length +
      updatedFilters.cuisines.length +
      updatedFilters.ingredients.length;
    
    setActiveFilterCount(newCount);
  };
  
  const resetFilters = () => {
    setFilters(initialFilters);
    setActiveFilterCount(0);
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
    } else if (e.key === 'ArrowDown' && showSuggestions && suggestions.length > 0) {
      e.preventDefault();
      // Focus first suggestion (would need refs for full keyboard navigation)
    }
  };

  return (
    <div className={`w-full ${className}`}>
      <div className="relative">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              value={query}
              onChange={handleQueryChange}
              onKeyDown={handleKeyDown}
              placeholder="Search for recipes or ingredients..."
              className="pl-10 pr-10 bg-white focus-visible:ring-pantry-sage"
              onFocus={() => {
                if (query.trim() && suggestions.length > 0) {
                  setShowSuggestions(true);
                }
              }}
              onBlur={() => {
                // Delay hiding to allow clicks on suggestions
                setTimeout(() => setShowSuggestions(false), 150);
              }}
            />
            {query && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6"
                onClick={() => {
                  setQuery("");
                  setShowSuggestions(false);
                }}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
          
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="relative">
                <Filter className="h-4 w-4 mr-2" />
                Filters
                {activeFilterCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-pantry-sage text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {activeFilterCount}
                  </span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">Filters</h3>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={resetFilters}
                    className="text-pantry-sage h-8"
                  >
                    Reset
                  </Button>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium mb-2">Cooking Time</h4>
                  <div className="px-2">
                    <Slider
                      defaultValue={filters.cookingTime}
                      min={0}
                      max={120}
                      step={5}
                      onValueChange={(value) => handleFilterChange('cookingTime', value as [number, number])}
                    />
                    <div className="flex justify-between mt-1 text-xs text-gray-500">
                      <span>{filters.cookingTime[0]} min</span>
                      <span>{filters.cookingTime[1]} min</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium mb-2">Meal Type</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {["Breakfast", "Lunch", "Dinner", "Dessert", "Snack", "Appetizer"].map(meal => (
                      <div key={meal} className="flex items-center space-x-2">
                        <Checkbox 
                          id={`meal-${meal}`} 
                          checked={filters.mealTypes.includes(meal)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              handleFilterChange('mealTypes', [...filters.mealTypes, meal]);
                            } else {
                              handleFilterChange('mealTypes', 
                                filters.mealTypes.filter(item => item !== meal)
                              );
                            }
                          }}
                        />
                        <Label htmlFor={`meal-${meal}`} className="text-sm">{meal}</Label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium mb-2">Dietary Preferences</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {["Vegetarian", "Vegan", "Gluten-Free", "Dairy-Free", "Low-Carb", "Keto"].map(diet => (
                      <div key={diet} className="flex items-center space-x-2">
                        <Checkbox 
                          id={`diet-${diet}`} 
                          checked={filters.diets.includes(diet)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              handleFilterChange('diets', [...filters.diets, diet]);
                            } else {
                              handleFilterChange('diets', 
                                filters.diets.filter(item => item !== diet)
                              );
                            }
                          }}
                        />
                        <Label htmlFor={`diet-${diet}`} className="text-sm">{diet}</Label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium mb-2">Cuisine</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {["Italian", "Mexican", "Asian", "Mediterranean", "Indian", "American"].map(cuisine => (
                      <div key={cuisine} className="flex items-center space-x-2">
                        <Checkbox 
                          id={`cuisine-${cuisine}`} 
                          checked={filters.cuisines.includes(cuisine)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              handleFilterChange('cuisines', [...filters.cuisines, cuisine]);
                            } else {
                              handleFilterChange('cuisines', 
                                filters.cuisines.filter(item => item !== cuisine)
                              );
                            }
                          }}
                        />
                        <Label htmlFor={`cuisine-${cuisine}`} className="text-sm">{cuisine}</Label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <Button 
                  className="w-full bg-pantry-sage hover:bg-pantry-sage/90"
                  onClick={handleSearch}
                >
                  Apply Filters
                </Button>
              </div>
            </PopoverContent>
          </Popover>
          
          <Button 
            className="bg-pantry-sage hover:bg-pantry-sage/90"
            onClick={handleSearch}
          >
            Search
          </Button>
        </div>
        
        {/* Search suggestions */}
        {showSuggestions && (
          <div className="absolute left-0 right-0 mt-1 bg-white rounded-md shadow-lg z-50 border border-gray-200 max-h-60 overflow-auto">
            {suggestions.map((suggestion, index) => (
              <div
                key={index}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center"
                onMouseDown={() => handleSuggestionClick(suggestion)}
              >
                <Search className="h-4 w-4 text-gray-400 mr-2" />
                <span className="text-sm">{suggestion}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
