
import { useState } from "react";
import { PantryHeader } from "@/components/PantryHeader";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Plus } from "lucide-react";

const MealPlanning = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [meals] = useState([
    { id: 1, name: "Breakfast", time: "8:00 AM", recipe: "Oatmeal with Berries" },
    { id: 2, name: "Lunch", time: "12:30 PM", recipe: "Chicken Caesar Salad" },
    { id: 3, name: "Dinner", time: "7:00 PM", recipe: "Grilled Salmon" },
  ]);

  return (
    <div className="min-h-screen bg-pantry-cream">
      <PantryHeader />
      <main className="max-w-7xl mx-auto px-4 py-8 animate-fadeIn">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle>Select Date</CardTitle>
              <CardDescription>Choose a date to plan meals</CardDescription>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border"
              />
            </CardContent>
          </Card>

          <Card className="md:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div>
                <CardTitle>Meal Plan</CardTitle>
                <CardDescription>
                  {date?.toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </CardDescription>
              </div>
              <Button className="bg-pantry-sage hover:bg-pantry-sage/90">
                <Plus className="mr-2 h-4 w-4" />
                Add Meal
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {meals.map((meal) => (
                  <div
                    key={meal.id}
                    className="flex items-center justify-between p-4 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors"
                  >
                    <div>
                      <h3 className="font-medium text-pantry-brown">{meal.name}</h3>
                      <p className="text-sm text-gray-500">{meal.time}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{meal.recipe}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default MealPlanning;
