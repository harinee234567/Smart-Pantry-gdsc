
import { useState, useRef, useEffect } from 'react';
import { useChatbot } from './ChatbotContext';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  ChefHat, 
  Mic, 
  MicOff, 
  Send, 
  X, 
  Maximize2, 
  Minimize2,
  MessageSquare
} from "lucide-react";

const Chatbot = () => {
  const {
    isOpen,
    messages,
    toggleChatbot,
    addMessage,
    isListening,
    toggleListening,
    transcript,
    setTranscript,
    clearMessages,
    isLoading
  } = useChatbot();
  
  const [query, setQuery] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);
  
  // Focus input when chatbot opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    
    addMessage({
      role: 'user',
      content: query,
    });
    
    setQuery('');
  };
  
  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };
  
  // Function to render markdown-like recipe format
  const formatRecipeContent = (content: string) => {
    // Check if content is a recipe (contains # character)
    if (!content.includes('#')) {
      return content; // Return as is if not a recipe
    }
    
    // Split by lines and process
    const lines = content.split('\n');
    return (
      <div className="recipe-content">
        {lines.map((line, index) => {
          if (line.startsWith('# ')) {
            // Main title
            return <h2 key={index} className="text-lg font-bold mb-2">{line.replace('# ', '')}</h2>;
          } else if (line.startsWith('## ')) {
            // Section title
            return <h3 key={index} className="text-md font-bold mt-3 mb-1">{line.replace('## ', '')}</h3>;
          } else if (line.startsWith('- ')) {
            // List item
            return <li key={index} className="ml-5">{line.replace('- ', '')}</li>;
          } else if (line.match(/^\d+\./)) {
            // Numbered list item
            return <div key={index} className="ml-5 flex gap-2">
              <span>{line.match(/^\d+\./)?.[0]}</span>
              <span>{line.replace(/^\d+\./, '').trim()}</span>
            </div>;
          } else if (line.trim() === '') {
            // Empty line
            return <div key={index} className="h-2"></div>;
          } else {
            // Regular text
            return <p key={index}>{line}</p>;
          }
        })}
      </div>
    );
  };
  
  if (!isOpen) {
    return (
      <Button
        onClick={toggleChatbot}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-pantry-sage hover:bg-pantry-sage/90 shadow-lg z-50 flex items-center justify-center"
        size="icon"
      >
        <ChefHat className="w-6 h-6" />
      </Button>
    );
  }
  
  return (
    <div
      className={`fixed bottom-6 right-6 bg-white rounded-lg shadow-xl z-50 overflow-hidden transition-all duration-300 border border-pantry-beige flex flex-col animate-scaleIn ${
        isExpanded ? 'w-96 h-[80vh]' : 'w-80 h-[500px]'
      }`}
    >
      {/* Header */}
      <div className="bg-pantry-sage text-white p-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ChefHat className="w-5 h-5" />
          <h3 className="font-medium">Smart Pantry Assistant</h3>
        </div>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleExpanded}
            className="h-8 w-8 text-white hover:bg-pantry-sage/90"
          >
            {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleChatbot}
            className="h-8 w-8 text-white hover:bg-pantry-sage/90"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>
      
      {/* Messages */}
      <div className="flex-1 p-4 overflow-y-auto bg-pantry-cream/30">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-500">
            <ChefHat className="w-16 h-16 mb-4 text-pantry-sage opacity-70" />
            <p className="text-center">Ask me anything about recipes, ingredients, or your pantry!</p>
          </div>
        ) : (
          messages.map((msg) => (
            <div
              key={msg.id}
              className={`mb-4 max-w-[80%] ${
                msg.role === 'user' ? 'ml-auto' : 'mr-auto'
              }`}
            >
              <div
                className={`p-3 rounded-lg break-words ${
                  msg.role === 'user'
                    ? 'bg-pantry-sage text-white rounded-tr-none'
                    : 'bg-white border border-pantry-beige rounded-tl-none'
                }`}
              >
                {msg.role === 'assistant' ? formatRecipeContent(msg.content) : msg.content}
              </div>
              <div
                className={`text-xs text-gray-500 mt-1 ${
                  msg.role === 'user' ? 'text-right' : 'text-left'
                }`}
              >
                {msg.timestamp.toLocaleTimeString([], { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </div>
            </div>
          ))
        )}
        {/* Listening indicator */}
        {isListening && (
          <div className="bg-white p-3 rounded-lg mb-4 max-w-[80%] border border-pantry-sage">
            <div className="flex items-center gap-2">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-pantry-sage rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                <span className="w-2 h-2 bg-pantry-sage rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                <span className="w-2 h-2 bg-pantry-sage rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
              </div>
              <span className="text-sm text-gray-600">Listening...</span>
            </div>
            {transcript && (
              <div className="mt-2 text-gray-700 italic">{transcript}</div>
            )}
          </div>
        )}
        {/* Loading indicator */}
        {isLoading && (
          <div className="bg-white p-3 rounded-lg mb-4 max-w-[80%] border border-pantry-beige">
            <div className="flex items-center gap-2">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-pantry-sage rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                <span className="w-2 h-2 bg-pantry-sage rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                <span className="w-2 h-2 bg-pantry-sage rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
              </div>
              <span className="text-sm text-gray-600">Cooking up an answer...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      
      {/* Input */}
      <div className="p-3 border-t border-pantry-beige bg-white">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask for a recipe..."
            className="flex-1"
            disabled={isLoading}
          />
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={toggleListening}
            className={`${
              isListening 
                ? 'text-pantry-terracotta border-pantry-terracotta' 
                : 'text-pantry-sage border-pantry-sage'
            }`}
            disabled={isLoading}
          >
            {isListening ? (
              <MicOff className="h-4 w-4" />
            ) : (
              <Mic className="h-4 w-4" />
            )}
          </Button>
          <Button 
            type="submit" 
            size="icon"
            className="bg-pantry-sage hover:bg-pantry-sage/90"
            disabled={!query.trim() || isLoading}
          >
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Chatbot;
