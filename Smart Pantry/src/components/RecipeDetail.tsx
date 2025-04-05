
import { useState, useEffect } from "react";
import { 
  Heart, 
  Clock, 
  Users, 
  ChefHat, 
  Printer, 
  Share2, 
  Star, 
  Timer,
  Info,
  Scale,
  VolumeX,
  Volume2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import TextToSpeechControls from "@/components/TextToSpeechControls";
import tts from "@/utils/textToSpeech";

interface NutritionInfo {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
}

interface RecipeDetailProps {
  id: number;
  title: string;
  description: string;
  image: string;
  cookingTime: string;
  prepTime: string;
  servings: number;
  difficulty: string;
  ingredients: { name: string; amount: string; unit: string }[];
  instructions: string[];
  nutrition: NutritionInfo;
  tags: string[];
  author?: string;
  reviews?: any[];  // Made optional
  averageRating?: number; // Made optional
}

export const RecipeDetail = ({
  title,
  description,
  image,
  cookingTime,
  prepTime,
  servings,
  difficulty,
  ingredients,
  instructions,
  nutrition,
  tags,
  author = "Smart Pantry",
  reviews = [],  // Default to empty array
  averageRating = 0  // Default to 0
}: RecipeDetailProps) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [currentServings, setCurrentServings] = useState(servings);
  const [activeTimer, setActiveTimer] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [isTTSPlaying, setIsTTSPlaying] = useState(false);
  const [isTTSSupported, setIsTTSSupported] = useState(true);

  useEffect(() => {
    // Check if TTS is supported
    setIsTTSSupported(tts.isSupported());
  }, []);

  const adjustIngredient = (amount: string) => {
    const numeric = parseFloat(amount);
    if (isNaN(numeric)) return amount;
    return ((numeric * currentServings) / servings).toFixed(1).replace(/\.0$/, '');
  };

  const startTimer = (minutes: number) => {
    setTimeLeft(minutes * 60);
    setActiveTimer(minutes);
    
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          setActiveTimer(null);
          // Alert user
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleReadAloud = () => {
    if (!isTTSSupported) return;
    
    const textToRead = [
      `Recipe: ${title}`,
      description,
      "Ingredients:",
      ...ingredients.map(ing => `${adjustIngredient(ing.amount)} ${ing.unit} ${ing.name}`),
      "Instructions:",
      ...instructions.map((instruction, index) => `Step ${index + 1}: ${instruction}`)
    ];
    
    tts.speak(textToRead);
    setIsTTSPlaying(true);
  };

  const handlePauseTTS = () => {
    tts.pause();
  };

  const handleResumeTTS = () => {
    tts.resume();
  };

  const handleStopTTS = () => {
    tts.stop();
    setIsTTSPlaying(false);
  };

  // Clean up TTS when component unmounts
  useEffect(() => {
    return () => {
      tts.stop();
    };
  }, []);

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden max-w-4xl mx-auto animate-fadeIn">
      {/* Recipe Header */}
      <div className="relative">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-64 sm:h-80 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            {tags.map(tag => (
              <span 
                key={tag} 
                className="bg-white/80 backdrop-blur-sm text-pantry-brown px-3 py-1 rounded-full text-xs font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
          <h1 className="text-3xl sm:text-4xl font-display font-bold text-white leading-tight">
            {title}
          </h1>
        </div>

        <Button 
          variant="ghost" 
          size="icon" 
          className={`absolute top-4 right-4 text-white hover:bg-white/20 ${isFavorite ? 'text-red-500' : ''}`}
          onClick={() => setIsFavorite(!isFavorite)}
        >
          <Heart className={`h-6 w-6 ${isFavorite ? 'fill-current' : ''}`} />
        </Button>
      </div>
      
      {/* Recipe Info */}
      <div className="p-6">
        <div className="flex flex-wrap justify-between items-center mb-6">
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-1">
              <Clock className="h-5 w-5 text-pantry-sage" />
              <span className="text-sm">
                <strong>Prep:</strong> {prepTime}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Timer className="h-5 w-5 text-pantry-sage" />
              <span className="text-sm">
                <strong>Cook:</strong> {cookingTime}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="h-5 w-5 text-pantry-sage" />
              <span className="text-sm">
                <strong>Serves:</strong> {currentServings}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <ChefHat className="h-5 w-5 text-pantry-sage" />
              <span className="text-sm">
                <strong>Difficulty:</strong> {difficulty}
              </span>
            </div>
          </div>
          
          <div className="flex items-center gap-3 mt-4 sm:mt-0">
            <Button variant="outline" size="sm" className="gap-1">
              <Printer className="h-4 w-4" />
              Print
            </Button>
            <Button variant="outline" size="sm" className="gap-1">
              <Share2 className="h-4 w-4" />
              Share
            </Button>
          </div>
        </div>
        
        {/* Text-to-Speech Controls */}
        <div className="mb-6">
          {!isTTSSupported ? (
            <Alert variant="destructive" className="mb-4">
              <VolumeX className="h-4 w-4" />
              <AlertDescription>
                Text-to-speech is not supported in your browser. Please try another browser like Chrome or Edge.
              </AlertDescription>
            </Alert>
          ) : (
            <div className="flex items-center justify-between flex-wrap gap-4 p-4 bg-pantry-cream/30 rounded-lg">
              <div className="flex items-center gap-2">
                <Volume2 className="h-5 w-5 text-pantry-sage" />
                <span className="font-medium">Read Recipe Aloud</span>
              </div>
              
              {isTTSPlaying ? (
                <TextToSpeechControls 
                  title={title}
                  ingredients={ingredients}
                  instructions={instructions}
                  isPlaying={isTTSPlaying}
                  onPlay={handleResumeTTS}
                  onPause={handlePauseTTS}
                  onStop={handleStopTTS}
                />
              ) : (
                <Button 
                  onClick={handleReadAloud}
                  className="bg-pantry-sage hover:bg-pantry-sage/90"
                >
                  <Volume2 className="mr-2 h-4 w-4" />
                  Read Aloud
                </Button>
              )}
            </div>
          )}
        </div>
        
        <div className="flex items-center gap-2 mb-6">
          <div className="flex">
            {[1, 2, 3, 4, 5].map(star => (
              <Star 
                key={star} 
                className={`h-5 w-5 ${star <= Math.round(averageRating) ? 'text-yellow-500 fill-current' : 'text-gray-300'}`} 
              />
            ))}
          </div>
          <span className="text-sm text-gray-600">
            {averageRating.toFixed(1)} ({reviews.length} reviews)
          </span>
        </div>
        
        <p className="text-gray-700 mb-8">
          {description}
        </p>
        
        <div className="border-t border-gray-100 pt-6">
          <Tabs defaultValue="ingredients">
            <TabsList className="mb-6">
              <TabsTrigger value="ingredients">Ingredients</TabsTrigger>
              <TabsTrigger value="instructions">Instructions</TabsTrigger>
              <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
            </TabsList>
            
            <TabsContent value="ingredients" className="space-y-6">
              <div className="flex items-center gap-4 mb-4">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setCurrentServings(Math.max(1, currentServings - 1))}
                  disabled={currentServings <= 1}
                >
                  -
                </Button>
                <span>{currentServings} servings</span>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setCurrentServings(currentServings + 1)}
                >
                  +
                </Button>
              </div>
              
              <ul className="space-y-2">
                {ingredients.map((ingredient, index) => (
                  <li key={index} className="flex items-start gap-3 py-2 border-b border-gray-100">
                    <div className="w-8 h-8 rounded-full bg-pantry-sage/10 flex items-center justify-center flex-shrink-0">
                      <Scale className="h-4 w-4 text-pantry-sage" />
                    </div>
                    <div>
                      <span className="font-medium">{adjustIngredient(ingredient.amount)} {ingredient.unit}</span>
                      <span className="text-gray-700 ml-1">{ingredient.name}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </TabsContent>
            
            <TabsContent value="instructions" className="space-y-6">
              <ol className="space-y-6">
                {instructions.map((step, index) => (
                  <li key={index} className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-pantry-sage text-white flex items-center justify-center font-bold">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-700">{step}</p>
                      
                      {step.includes("minutes") && (
                        <div className="mt-3">
                          {activeTimer === index ? (
                            <div className="flex items-center gap-2">
                              <span className="text-pantry-terracotta font-mono font-bold">
                                {formatTime(timeLeft)}
                              </span>
                              <Progress value={(timeLeft / (activeTimer * 60)) * 100} className="h-2 w-32" />
                            </div>
                          ) : (
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-pantry-sage border-pantry-sage hover:bg-pantry-sage/10"
                              onClick={() => {
                                const minutes = parseInt(step.match(/(\d+)\s*minutes/)?.[1] || "5");
                                startTimer(minutes);
                              }}
                            >
                              <Timer className="h-4 w-4 mr-1" />
                              Start Timer
                            </Button>
                          )}
                        </div>
                      )}
                    </div>
                  </li>
                ))}
              </ol>
            </TabsContent>
            
            <TabsContent value="nutrition">
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-pantry-brown mb-4 flex items-center gap-2">
                  <Info className="h-5 w-5 text-pantry-sage" />
                  Nutritional Information
                </h3>
                
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  <div className="p-4 bg-white rounded-lg text-center shadow-sm">
                    <p className="text-2xl font-bold text-pantry-brown">{nutrition.calories}</p>
                    <p className="text-sm text-gray-500">Calories</p>
                  </div>
                  
                  <div className="p-4 bg-white rounded-lg text-center shadow-sm">
                    <p className="text-2xl font-bold text-pantry-brown">{nutrition.protein}g</p>
                    <p className="text-sm text-gray-500">Protein</p>
                  </div>
                  
                  <div className="p-4 bg-white rounded-lg text-center shadow-sm">
                    <p className="text-2xl font-bold text-pantry-brown">{nutrition.carbs}g</p>
                    <p className="text-sm text-gray-500">Carbs</p>
                  </div>
                  
                  <div className="p-4 bg-white rounded-lg text-center shadow-sm">
                    <p className="text-2xl font-bold text-pantry-brown">{nutrition.fat}g</p>
                    <p className="text-sm text-gray-500">Fat</p>
                  </div>
                  
                  <div className="p-4 bg-white rounded-lg text-center shadow-sm">
                    <p className="text-2xl font-bold text-pantry-brown">{nutrition.fiber}g</p>
                    <p className="text-sm text-gray-500">Fiber</p>
                  </div>
                </div>
                
                <div className="mt-6">
                  <h4 className="font-medium text-pantry-brown mb-2">Dietary Information</h4>
                  <div className="flex flex-wrap gap-2">
                    {tags.map(tag => (
                      <span key={tag} className="inline-block px-3 py-1 rounded-full bg-pantry-cream text-pantry-brown text-sm">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};
