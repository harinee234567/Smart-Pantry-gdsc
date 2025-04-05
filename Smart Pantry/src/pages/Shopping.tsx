
import { useState } from "react";
import { PantryHeader } from "@/components/PantryHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, Trash2 } from "lucide-react";

interface ShoppingItem {
  id: number;
  name: string;
  completed: boolean;
  quantity: string;
}

const Shopping = () => {
  const [items, setItems] = useState<ShoppingItem[]>([
    { id: 1, name: "Milk", completed: false, quantity: "1 gallon" },
    { id: 2, name: "Eggs", completed: false, quantity: "1 dozen" },
    { id: 3, name: "Bread", completed: true, quantity: "1 loaf" },
  ]);
  const [newItem, setNewItem] = useState("");
  const [newQuantity, setNewQuantity] = useState("");

  const addItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItem.trim()) return;

    setItems(prev => [...prev, {
      id: Date.now(),
      name: newItem,
      completed: false,
      quantity: newQuantity || "1",
    }]);
    setNewItem("");
    setNewQuantity("");
  };

  const toggleItem = (id: number) => {
    setItems(prev => prev.map(item =>
      item.id === id ? { ...item, completed: !item.completed } : item
    ));
  };

  const deleteItem = (id: number) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-pantry-cream">
      <PantryHeader />
      <main className="max-w-7xl mx-auto px-4 py-8 animate-fadeIn">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h1 className="text-2xl font-semibold text-pantry-brown mb-6">Shopping List</h1>
          
          <div className="max-w-2xl mx-auto">
            <form onSubmit={addItem} className="flex gap-2 mb-6">
              <Input
                value={newQuantity}
                onChange={(e) => setNewQuantity(e.target.value)}
                placeholder="Quantity"
                className="w-32"
              />
              <Input
                value={newItem}
                onChange={(e) => setNewItem(e.target.value)}
                placeholder="Add an item..."
                className="flex-1"
              />
              <Button type="submit" className="bg-pantry-sage hover:bg-pantry-sage/90">
                <Plus className="h-4 w-4" />
              </Button>
            </form>

            <div className="space-y-2">
              {items.map((item) => (
                <div
                  key={item.id}
                  className={`flex items-center gap-4 p-3 rounded-lg border ${
                    item.completed ? 'bg-gray-50 border-gray-200' : 'border-pantry-beige'
                  }`}
                >
                  <Checkbox
                    checked={item.completed}
                    onCheckedChange={() => toggleItem(item.id)}
                  />
                  <span className="flex-1">
                    <span className={`font-medium ${
                      item.completed ? 'text-gray-400 line-through' : 'text-pantry-brown'
                    }`}>
                      {item.name}
                    </span>
                    <span className="ml-2 text-sm text-gray-500">
                      ({item.quantity})
                    </span>
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => deleteItem(item.id)}
                    className="text-gray-400 hover:text-pantry-terracotta"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Shopping;
