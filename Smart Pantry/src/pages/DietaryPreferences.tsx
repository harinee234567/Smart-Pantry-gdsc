
import { useState } from "react";
import { PantryHeader } from "@/components/PantryHeader";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const DietaryPreferences = () => {
  const [preferences, setPreferences] = useState({
    vegetarian: false,
    vegan: false,
    glutenFree: false,
    dairyFree: false,
    nutFree: false,
    lowCarb: false,
  });

  const handleToggle = (key: keyof typeof preferences) => {
    setPreferences(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <div className="min-h-screen bg-pantry-cream">
      <PantryHeader />
      <main className="max-w-7xl mx-auto px-4 py-8 animate-fadeIn">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h1 className="text-2xl font-semibold text-pantry-brown mb-6">Dietary Preferences</h1>
          
          <div className="max-w-xl mx-auto space-y-6">
            <div className="space-y-4">
              {Object.entries(preferences).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between py-3 border-b border-gray-100">
                  <Label htmlFor={key} className="text-lg text-pantry-brown capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </Label>
                  <Switch
                    id={key}
                    checked={value}
                    onCheckedChange={() => handleToggle(key as keyof typeof preferences)}
                  />
                </div>
              ))}
            </div>

            <div className="pt-4">
              <Button 
                className="w-full bg-pantry-sage hover:bg-pantry-sage/90"
                onClick={() => console.log("Saved preferences:", preferences)}
              >
                Save Preferences
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DietaryPreferences;
