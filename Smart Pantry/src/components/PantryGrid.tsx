import { Plus } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
interface PantryItem {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  expiryDate: string;
}
const mockItems: PantryItem[] = [{
  id: "1",
  name: "All-Purpose Flour",
  quantity: 1500,
  unit: "g",
  expiryDate: "2024-12-31"
}, {
  id: "2",
  name: "Sugar",
  quantity: 1000,
  unit: "g",
  expiryDate: "2024-12-31"
}, {
  id: "3",
  name: "Salt",
  quantity: 500,
  unit: "g",
  expiryDate: "2025-06-30"
}, {
  id: "4",
  name: "Olive Oil",
  quantity: 750,
  unit: "ml",
  expiryDate: "2024-09-15"
}];
export const PantryGrid = () => {
  return <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="font-semibold text-pantry-brown font-display text-3xl">Pantry Items</h2>
        <Button className="bg-pantry-sage hover:bg-pantry-sage/90 text-white">
          <Plus className="mr-2" size={20} />
          Add Item
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockItems.map(item => <Card key={item.id} className="p-6 hover:border-pantry-sage transition-colors hover:shadow-md bg-white">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium text-lg text-pantry-brown font-display">{item.name}</h3>
                <p className="text-gray-600">
                  {item.quantity} {item.unit}
                </p>
              </div>
              <span className="text-sm text-gray-500">
                Expires: {new Date(item.expiryDate).toLocaleDateString()}
              </span>
            </div>
          </Card>)}
      </div>
    </div>;
};