
import { useState } from "react";
import { PantryHeader } from "@/components/PantryHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowRight } from "lucide-react";

const IngredientConversion = () => {
  const [fromValue, setFromValue] = useState("1");
  const [fromUnit, setFromUnit] = useState("cup");
  const [toUnit, setToUnit] = useState("ml");
  const [result, setResult] = useState<string | null>(null);

  const handleConvert = () => {
    // Example conversion logic (simplified)
    const value = parseFloat(fromValue);
    let converted: number = 0;

    if (fromUnit === "cup" && toUnit === "ml") {
      converted = value * 236.588;
    } else if (fromUnit === "tbsp" && toUnit === "ml") {
      converted = value * 14.787;
    } else if (fromUnit === "oz" && toUnit === "g") {
      converted = value * 28.35;
    } else if (fromUnit === "lb" && toUnit === "kg") {
      converted = value * 0.453592;
    } else {
      setResult("Conversion not supported yet");
      return;
    }

    setResult(`${value} ${fromUnit} = ${converted.toFixed(2)} ${toUnit}`);
  };

  return (
    <div className="min-h-screen bg-pantry-cream">
      <PantryHeader />
      <main className="max-w-7xl mx-auto px-4 py-8 animate-fadeIn">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h1 className="text-2xl font-semibold text-pantry-brown mb-6">Ingredient Conversion</h1>
          
          <div className="max-w-xl mx-auto space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label htmlFor="fromValue" className="text-sm font-medium text-gray-700">
                  Amount
                </label>
                <Input
                  id="fromValue"
                  type="number"
                  value={fromValue}
                  onChange={(e) => setFromValue(e.target.value)}
                  min="0"
                  step="0.01"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="fromUnit" className="text-sm font-medium text-gray-700">
                  From
                </label>
                <Select value={fromUnit} onValueChange={setFromUnit}>
                  <SelectTrigger id="fromUnit">
                    <SelectValue placeholder="Select unit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cup">Cup</SelectItem>
                    <SelectItem value="tbsp">Tablespoon</SelectItem>
                    <SelectItem value="oz">Ounce</SelectItem>
                    <SelectItem value="lb">Pound</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="toUnit" className="text-sm font-medium text-gray-700">
                  To
                </label>
                <Select value={toUnit} onValueChange={setToUnit}>
                  <SelectTrigger id="toUnit">
                    <SelectValue placeholder="Select unit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ml">Milliliter</SelectItem>
                    <SelectItem value="g">Gram</SelectItem>
                    <SelectItem value="kg">Kilogram</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="flex justify-center">
              <Button 
                onClick={handleConvert}
                className="bg-pantry-sage hover:bg-pantry-sage/90 w-full md:w-auto"
              >
                Convert <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            
            {result && (
              <div className="mt-6 p-4 bg-pantry-cream/50 rounded-lg border border-pantry-sage/20 text-center">
                <p className="text-lg font-medium text-pantry-brown">{result}</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default IngredientConversion;
