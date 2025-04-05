
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
};

type ChatbotContextType = {
  isOpen: boolean;
  messages: Message[];
  toggleChatbot: () => void;
  addMessage: (message: Omit<Message, 'id' | 'timestamp'>) => void;
  isListening: boolean;
  toggleListening: () => void;
  transcript: string;
  setTranscript: (transcript: string) => void;
  clearMessages: () => void;
  isLoading: boolean;
};

const ChatbotContext = createContext<ChatbotContextType | undefined>(undefined);

export const useChatbot = () => {
  const context = useContext(ChatbotContext);
  if (!context) {
    throw new Error('useChatbot must be used within a ChatbotProvider');
  }
  return context;
};

// Recipe database for common dishes
const recipeDatabase = {
  "butter chicken": `
# Butter Chicken Recipe

## Ingredients:
- 800g boneless chicken thighs, cut into chunks
- 2 tbsp lemon juice
- 2 tsp ground cumin
- 2 tsp paprika
- 2 tsp ground coriander
- 1 tbsp ginger paste
- 2 cloves garlic, minced
- 1 cup plain yogurt
- 2 tbsp vegetable oil
- 2 tbsp butter
- 1 large onion, finely chopped
- 3 tbsp tomato paste
- 1 can (400g) tomato sauce
- 1 cup heavy cream
- 1 tsp garam masala
- 1 tsp dried fenugreek leaves (optional)
- Fresh cilantro for garnish

## Instructions:
1. Marinate chicken with lemon juice, cumin, paprika, coriander, ginger, garlic, and yogurt for at least 1 hour.
2. Heat oil in a large pan over medium heat. Add chicken and cook until no longer pink (about 8-10 minutes).
3. In another pan, melt butter and sauté onions until soft (about 5 minutes).
4. Add tomato paste and cook for 2 minutes.
5. Add tomato sauce and simmer for 15 minutes.
6. Add the cooked chicken, cream, garam masala, and fenugreek leaves.
7. Simmer for 15 more minutes until sauce thickens.
8. Garnish with fresh cilantro and serve with naan or rice.

Enjoy your homemade butter chicken!
  `,
  "pizza": `
# Homemade Pizza Recipe

## Ingredients:
For the dough:
- 2 1/4 tsp active dry yeast
- 1 tsp sugar
- 1 1/4 cups warm water
- 3 cups all-purpose flour
- 1 1/2 tsp salt
- 2 tbsp olive oil

For the topping:
- 1 cup pizza sauce
- 2 cups shredded mozzarella
- Your favorite toppings (pepperoni, mushrooms, bell peppers, etc.)
- 1 tbsp Italian seasoning
- Olive oil for brushing

## Instructions:
1. In a bowl, combine yeast, sugar, and warm water. Let sit for 5 minutes until foamy.
2. In a large bowl, mix flour and salt. Add the yeast mixture and olive oil.
3. Knead for 5-7 minutes until smooth and elastic.
4. Place in an oiled bowl, cover, and let rise for 1 hour.
5. Preheat oven to 475°F (245°C).
6. Divide dough in half and roll each into a 12-inch circle.
7. Place on a pizza pan or stone, brush with olive oil.
8. Spread sauce, add cheese and toppings, sprinkle with seasoning.
9. Bake for 12-15 minutes until crust is golden and cheese is bubbly.
10. Let cool for a few minutes before slicing.

Enjoy your homemade pizza!
  `,
  "chocolate cake": `
# Chocolate Cake Recipe

## Ingredients:
For the cake:
- 2 cups all-purpose flour
- 2 cups sugar
- 3/4 cup unsweetened cocoa powder
- 2 tsp baking soda
- 1 tsp baking powder
- 1 tsp salt
- 2 eggs
- 1 cup buttermilk
- 1/2 cup vegetable oil
- 2 tsp vanilla extract
- 1 cup hot coffee

For the frosting:
- 1/2 cup butter, softened
- 2/3 cup unsweetened cocoa powder
- 3 cups powdered sugar
- 1/3 cup milk
- 1 tsp vanilla extract

## Instructions:
1. Preheat oven to 350°F (175°C). Grease and flour two 9-inch round cake pans.
2. In a large bowl, combine flour, sugar, cocoa, baking soda, baking powder, and salt.
3. Add eggs, buttermilk, oil, and vanilla. Beat for 2 minutes.
4. Stir in hot coffee (batter will be thin).
5. Pour into prepared pans and bake for 30-35 minutes.
6. For frosting, cream butter and cocoa together.
7. Add powdered sugar, milk, and vanilla, beat until smooth.
8. Frost cake when completely cooled.

Enjoy your delicious chocolate cake!
  `,
  "pasta carbonara": `
# Pasta Carbonara Recipe

## Ingredients:
- 1 pound (450g) spaghetti
- 3.5 oz (100g) pancetta or guanciale, diced
- 4 large eggs
- 1 cup (100g) Pecorino Romano cheese, freshly grated
- Freshly ground black pepper
- Salt for pasta water
- 2 cloves garlic, minced (optional)
- Fresh parsley for garnish

## Instructions:
1. Bring a large pot of salted water to boil. Cook pasta according to package directions.
2. While pasta cooks, sauté the pancetta in a large skillet over medium heat until crispy.
3. If using garlic, add it to the pan and cook for 30 seconds.
4. In a bowl, whisk together eggs, cheese, and plenty of black pepper.
5. Reserve 1/2 cup of pasta water, then drain pasta.
6. Working quickly, add hot pasta to the skillet with pancetta (heat off).
7. Pour the egg mixture over the pasta and toss rapidly to create a creamy sauce.
8. Add a splash of reserved pasta water if needed to loosen the sauce.
9. Serve immediately with extra cheese and black pepper.

Enjoy your authentic pasta carbonara!
  `,
  "chicken curry": `
# Chicken Curry Recipe

## Ingredients:
- 1.5 lbs (700g) chicken thighs, cut into chunks
- 2 tbsp vegetable oil
- 2 onions, finely chopped
- 4 cloves garlic, minced
- 2 tbsp ginger, grated
- 2 tbsp curry powder
- 1 tsp turmeric
- 1 tsp ground cumin
- 1 tsp ground coriander
- 1/2 tsp red chili powder (adjust to taste)
- 1 can (400ml) coconut milk
- 1 can (400g) diced tomatoes
- Salt to taste
- Fresh cilantro for garnish
- 1 lime, cut into wedges

## Instructions:
1. Heat oil in a large pot over medium heat.
2. Add onions and sauté until soft and golden (about 5 minutes).
3. Add garlic and ginger, cook for 1 minute.
4. Add all spices and cook for 30 seconds until fragrant.
5. Add chicken and stir to coat with spices.
6. Add diced tomatoes and coconut milk, bring to a simmer.
7. Cover and cook for 25-30 minutes until chicken is tender.
8. Season with salt to taste.
9. Garnish with fresh cilantro and serve with rice and lime wedges.

Enjoy your flavorful chicken curry!
  `,
  "apple pie": `
# Classic Apple Pie Recipe

## Ingredients:
For the crust:
- 2 1/2 cups all-purpose flour
- 1 tsp salt
- 1 tbsp sugar
- 1 cup cold unsalted butter, cubed
- 1/4 to 1/2 cup ice water

For the filling:
- 6-7 large apples (Granny Smith or Honeycrisp), peeled and sliced
- 3/4 cup sugar
- 2 tbsp all-purpose flour
- 1 tsp ground cinnamon
- 1/4 tsp ground nutmeg
- 1/4 tsp ground allspice
- 1 tbsp lemon juice
- 2 tbsp butter, cut into small pieces
- 1 egg beaten with 1 tbsp water (for egg wash)

## Instructions:
1. For the crust: Mix flour, salt, and sugar. Cut in butter until pea-sized. Gradually add water until dough forms. Divide in two, chill for 1 hour.
2. Preheat oven to 425°F (220°C).
3. For the filling: Toss apple slices with sugar, flour, spices, and lemon juice.
4. Roll out one dough half and place in 9-inch pie dish.
5. Add apple mixture, dot with butter pieces.
6. Roll out second dough half and place over filling. Seal and crimp edges, cut slits on top.
7. Brush with egg wash and sprinkle with sugar.
8. Bake for 20 minutes, reduce temperature to 375°F (190°C) and bake for 30-35 minutes more.
9. Cool before serving.

Enjoy your homemade apple pie!
  `,
  "guacamole": `
# Fresh Guacamole Recipe

## Ingredients:
- 3 ripe avocados
- 1 lime, juiced
- 1/2 tsp salt
- 1/2 tsp ground cumin
- 1/2 tsp cayenne pepper (optional)
- 1/2 medium onion, finely diced
- 2 Roma tomatoes, diced
- 2 tbsp cilantro, chopped
- 1 clove garlic, minced
- 1 jalapeño, seeded and minced (optional)

## Instructions:
1. Cut avocados in half, remove pit, and scoop into a bowl.
2. Add lime juice and mash with a fork to desired consistency.
3. Stir in salt, cumin, and cayenne pepper.
4. Fold in onions, tomatoes, cilantro, garlic, and jalapeño.
5. Taste and adjust seasoning if needed.
6. Serve immediately with tortilla chips or refrigerate with plastic wrap pressed directly on the surface to prevent browning.

Enjoy your fresh homemade guacamole!
  `,
};

export const ChatbotProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [recognition, setRecognition] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Add welcome message when chatbot is first opened
    if (isOpen && messages.length === 0) {
      addMessage({
        role: 'assistant',
        content: 'Hello! I\'m your Smart Pantry Assistant. How can I help you today? Ask me about recipes, ingredients, meal planning, or use the microphone to speak with me!',
      });
    }
  }, [isOpen, messages.length]);

  useEffect(() => {
    // Initialize speech recognition
    if (window.webkitSpeechRecognition || window.SpeechRecognition) {
      const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      recognitionInstance.continuous = true;
      recognitionInstance.interimResults = true;
      
      recognitionInstance.onresult = (event: any) => {
        const current = event.resultIndex;
        const transcript = event.results[current][0].transcript;
        setTranscript(transcript);
      };
      
      setRecognition(recognitionInstance);
    }
    
    return () => {
      if (recognition) {
        recognition.stop();
      }
    };
  }, []);

  const toggleChatbot = () => {
    setIsOpen(prev => !prev);
  };

  const addMessage = async (message: Omit<Message, 'id' | 'timestamp'>) => {
    const newMessage = {
      ...message,
      id: Date.now().toString(),
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, newMessage]);

    // If this is a user message, generate a response
    if (message.role === 'user') {
      setIsLoading(true);
      
      try {
        await generateAIResponse(message.content);
      } catch (error) {
        console.error("Error generating response:", error);
        // Add fallback response
        const fallbackMessage = {
          role: 'assistant' as const,
          content: "I'm sorry, I'm having trouble connecting right now. Please try again later.",
          id: Date.now().toString(),
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, fallbackMessage]);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const toggleListening = async () => {
    try {
      if (!isListening && recognition) {
        recognition.start();
        setIsListening(true);
      } else if (recognition) {
        recognition.stop();
        setIsListening(false);
        
        // If there's transcript text, send it as a user message
        if (transcript.trim()) {
          addMessage({
            role: 'user',
            content: transcript,
          });
          
          setTranscript('');
        }
      }
    } catch (error) {
      console.error("Error accessing microphone:", error);
      setIsListening(false);
    }
  };

  const generateAIResponse = async (query: string) => {
    // Get all previous messages for context, limited to last 10
    const recentMessages = messages.slice(-10).map(msg => ({
      role: msg.role,
      content: msg.content
    }));

    try {
      // API call to OpenAI
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer sk-YOUR_API_KEY_HERE` // Note: Replace with actual API key
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            {
              role: 'system',
              content: `You are a Smart Pantry Assistant, an AI that helps users with cooking, recipes, ingredient substitutions, meal planning, and pantry management. Be friendly, concise, and helpful. Provide practical cooking advice and recipe suggestions. Always relate your answers to cooking, food, or kitchen management.

The user's pantry currently contains: flour, sugar, eggs, milk, butter, rice, pasta, tomatoes, onions, garlic, chicken stock, canned beans, olive oil, salt, pepper, and various spices.

The user is planning meals for the week and might ask about recipe ideas, ingredient substitutions, or cooking techniques.`
            },
            ...recentMessages,
            { role: 'user', content: query }
          ],
          temperature: 0.7,
          max_tokens: 500,
        })
      });

      // If the OpenAI API fails, use our fallback response generator
      if (!response.ok) {
        return generateFallbackResponse(query);
      }

      const data = await response.json();
      const aiResponse = data.choices[0].message.content;

      const assistantMessage = {
        role: 'assistant' as const,
        content: aiResponse,
        id: Date.now().toString(),
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      // If there's an error with the API call, use our fallback
      console.error("Error with AI API:", error);
      return generateFallbackResponse(query);
    }
  };

  // Check if the query is asking for a specific recipe
  const checkForRecipeRequest = (query: string): string | null => {
    const lowercaseQuery = query.toLowerCase();
    
    // Check if query contains recipe request phrases
    const isRecipeRequest = 
      lowercaseQuery.includes('recipe') || 
      lowercaseQuery.includes('how to make') || 
      lowercaseQuery.includes('how do i make') ||
      lowercaseQuery.includes('how do you make') ||
      (lowercaseQuery.includes('want') && lowercaseQuery.includes('make')) ||
      (lowercaseQuery.includes('i want') && !lowercaseQuery.includes('substitute'));
    
    if (!isRecipeRequest) {
      return null;
    }
    
    // Find which dish they're asking about
    for (const dish of Object.keys(recipeDatabase)) {
      if (lowercaseQuery.includes(dish)) {
        return dish;
      }
    }
    
    // For queries like "recipe of butter chicken" or "i want the recipe of butter chicken"
    const recipeOfMatch = lowercaseQuery.match(/recipe of\s+(.+)/) || 
                         lowercaseQuery.match(/recipe for\s+(.+)/) ||
                         lowercaseQuery.match(/i want.+recipe.+?of\s+(.+)/);
    
    if (recipeOfMatch && recipeOfMatch[1]) {
      const requestedDish = recipeOfMatch[1].trim();
      
      // Check if we have an exact match
      for (const dish of Object.keys(recipeDatabase)) {
        if (requestedDish.includes(dish)) {
          return dish;
        }
      }
      
      // Check if any dish contains the requested dish name
      for (const dish of Object.keys(recipeDatabase)) {
        if (dish.includes(requestedDish)) {
          return dish;
        }
      }
    }
    
    return null;
  };

  const generateFallbackResponse = (query: string) => {
    console.log("Using fallback response generator");
    let response = '';
    const lowercaseQuery = query.toLowerCase();
    
    // Check for recipe requests first
    const recipeDish = checkForRecipeRequest(query);
    if (recipeDish && recipeDatabase[recipeDish]) {
      return setMessages(prev => [...prev, {
        role: 'assistant' as const,
        content: recipeDatabase[recipeDish],
        id: Date.now().toString(),
        timestamp: new Date(),
      }]);
    }
    
    // Recipe suggestions
    if (lowercaseQuery.includes('recipe') || lowercaseQuery.includes('cook') || lowercaseQuery.includes('make') || lowercaseQuery.includes('dish')) {
      if (lowercaseQuery.includes('quick') || lowercaseQuery.includes('fast') || lowercaseQuery.includes('easy')) {
        response = "For a quick meal, try pasta aglio e olio - boil pasta, then sauté minced garlic in olive oil, add red pepper flakes, toss with the pasta, and finish with parmesan cheese. Ready in 15 minutes!";
      } else if (lowercaseQuery.includes('chicken')) {
        response = "For a delicious chicken dish, I recommend butter chicken! Would you like me to share the full recipe?";
      } else if (lowercaseQuery.includes('vegetarian') || lowercaseQuery.includes('vegan')) {
        response = "Try a chickpea curry! Sauté onions, garlic, and ginger, add curry powder, canned tomatoes, and chickpeas. Simmer for 20 minutes and serve with rice.";
      } else if (lowercaseQuery.includes('dessert') || lowercaseQuery.includes('sweet')) {
        response = "For a simple dessert, try making chocolate chip cookies with flour, butter, sugar, eggs, vanilla, and chocolate chips. Bake at 350°F for 10-12 minutes for the perfect treat!";
      } else {
        response = "I can suggest several recipes like butter chicken, pizza, chocolate cake, pasta carbonara, chicken curry, apple pie, or guacamole. Would you like the full recipe for any of these?";
      }
    }
    // Ingredient substitutions
    else if (lowercaseQuery.includes('substitute') || lowercaseQuery.includes('replacement') || lowercaseQuery.includes('instead of')) {
      if (lowercaseQuery.includes('butter')) {
        response = "You can substitute butter with olive oil (for cooking), applesauce (for baking), or coconut oil (works for both). The substitution ratio is typically 1:1.";
      } else if (lowercaseQuery.includes('egg')) {
        response = "To replace one egg in baking, try: 1/4 cup applesauce, 1/4 cup mashed banana, or 1 tablespoon ground flaxseed mixed with 3 tablespoons water.";
      } else if (lowercaseQuery.includes('milk')) {
        response = "You can substitute milk with almond milk, soy milk, oat milk, or coconut milk. For cooking, you can also use broth or water in some recipes.";
      } else if (lowercaseQuery.includes('sugar')) {
        response = "Instead of white sugar, try honey (use 3/4 cup for each cup of sugar), maple syrup, or coconut sugar at a 1:1 ratio. Remember that liquid sweeteners may require reducing other liquids in the recipe.";
      } else {
        response = "For most ingredient substitutions, I need to know which ingredient you're looking to replace. However, common substitutions include: yogurt for sour cream, broth for wine, and cornstarch for flour (as a thickener, use half the amount).";
      }
    }
    // Meal planning
    else if (lowercaseQuery.includes('meal plan') || lowercaseQuery.includes('week') || lowercaseQuery.includes('schedule')) {
      response = "Here's a simple meal plan for the week using pantry basics: Monday - pasta with tomato sauce, Tuesday - rice and beans, Wednesday - breakfast for dinner (eggs and toast), Thursday - chicken soup, Friday - homemade pizza, Saturday - stir fry, Sunday - roast chicken with vegetables.";
    }
    // Cooking techniques
    else if (lowercaseQuery.includes('how to') || lowercaseQuery.includes('technique') || lowercaseQuery.includes('method')) {
      if (lowercaseQuery.includes('knife') || lowercaseQuery.includes('cut') || lowercaseQuery.includes('chop')) {
        response = "For basic knife skills, make sure your knife is sharp, use a claw grip with your non-cutting hand, and let the knife do the work with a rocking motion. Keep your knife tip on the cutting board and lift the heel for efficient chopping.";
      } else if (lowercaseQuery.includes('sear') || lowercaseQuery.includes('brown')) {
        response = "To properly sear meat: 1) Pat the meat dry with paper towels, 2) Heat your pan until very hot, 3) Add a high-heat oil like grapeseed, 4) Place the meat in the pan and DO NOT move it for several minutes, 5) Flip only once it releases easily from the pan and has a brown crust.";
      } else {
        response = "For most cooking techniques, start with good mise en place (preparation). Read the entire recipe before starting, prep all ingredients, and have everything ready before turning on the heat. This makes the actual cooking process much smoother.";
      }
    }
    // Pantry management
    else if (lowercaseQuery.includes('pantry') || lowercaseQuery.includes('inventory') || lowercaseQuery.includes('storage')) {
      response = "For effective pantry management, store dry goods in airtight containers, label everything with purchase dates, keep a running inventory, and organize items by category. The FIFO method (First In, First Out) helps ensure you use older items before newer ones.";
    }
    // Greetings
    else if (lowercaseQuery.includes('hello') || lowercaseQuery.includes('hi') || lowercaseQuery.includes('hey')) {
      response = "Hello! I'm your Smart Pantry Assistant. I can help with recipe ideas, ingredient substitutions, meal planning, and cooking techniques. What would you like help with today?";
    }
    // General fallback
    else {
      response = "I can help you with recipe suggestions, ingredient substitutions, meal planning, cooking techniques, and pantry management. How can I assist with your cooking or kitchen management needs today?";
    }
    
    const assistantMessage = {
      role: 'assistant' as const,
      content: response,
      id: Date.now().toString(),
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, assistantMessage]);
  };

  const clearMessages = () => {
    setMessages([]);
  };

  const value = {
    isOpen,
    messages,
    toggleChatbot,
    addMessage,
    isListening,
    toggleListening,
    transcript,
    setTranscript,
    clearMessages,
    isLoading,
  };

  return <ChatbotContext.Provider value={value}>{children}</ChatbotContext.Provider>;
};
