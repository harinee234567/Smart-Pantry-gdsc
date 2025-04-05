import { Package, Book, Apple } from "lucide-react";

export const PantryStats = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {[
        { icon: Package, label: "Items in Pantry", value: "24" },
        { icon: Book, label: "Saved Recipes", value: "12" },
        { icon: Apple, label: "Low Stock Items", value: "3" },
      ].map(({ icon: Icon, label, value }) => (
        <div
          key={label}
          className="bg-white p-6 rounded-lg shadow-sm border border-pantry-beige hover:border-pantry-sage transition-colors hover:shadow-md"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 bg-pantry-cream rounded-full">
              <Icon className="text-pantry-sage" size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-600">{label}</p>
              <p className="text-2xl font-semibold text-pantry-brown">{value}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};