
import { Link, useLocation } from "react-router-dom";
import {
  Boxes,
  ChefHat,
  Scale,
  Apple,
  ShoppingCart,
  Calendar,
  ScanLine,
  Upload,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useState, useEffect } from "react";
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible";

const navItems = [
  { path: "/dashboard", icon: Boxes, label: "Pantry Inventory" },
  { path: "/recipes", icon: ChefHat, label: "Recipe Management" },
  { path: "/conversion", icon: Scale, label: "Ingredient Conversion" },
  { path: "/dietary", icon: Apple, label: "Dietary Preferences" },
  { path: "/shopping", icon: ShoppingCart, label: "Shopping" },
  { path: "/meal-planning", icon: Calendar, label: "Meal Planning" },
  { path: "/container-scanner", icon: ScanLine, label: "Container Scanner" },
  { path: "/recipe-upload", icon: Upload, label: "Recipe Upload" },
];

export const Navigation = () => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  
  // Check for saved state in localStorage
  useEffect(() => {
    const savedState = localStorage.getItem("navigationCollapsed");
    if (savedState !== null) {
      setCollapsed(savedState === "true");
    }
  }, []);

  // Save state to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("navigationCollapsed", collapsed.toString());
  }, [collapsed]);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <nav 
      className={`fixed left-0 top-0 h-screen ${collapsed ? 'w-16' : 'w-64'} bg-white border-r border-pantry-beige p-4 overflow-y-auto transition-all duration-300 z-10`}
    >
      <div 
        className={`flex items-center ${collapsed ? 'justify-center' : 'gap-3'} mb-8 px-2 cursor-pointer`}
        onClick={toggleSidebar}
      >
        <div className="p-2 bg-pantry-cream rounded-full">
          <svg
            className="w-6 h-6 text-pantry-sage"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
            />
          </svg>
        </div>
        {!collapsed && (
          <span className="text-xl font-semibold text-pantry-brown font-display">Smart Pantry</span>
        )}
      </div>

      <div className="space-y-3">
        {navItems.map(({ path, icon: Icon, label }) => (
          <Link
            key={path}
            to={path}
            className={`flex items-center ${collapsed ? 'justify-center' : 'gap-3'} px-3 py-2 rounded-lg transition-colors ${
              location.pathname === path
                ? "bg-pantry-sage text-white"
                : "text-gray-600 hover:bg-pantry-cream"
            }`}
            title={collapsed ? label : undefined}
          >
            <Icon size={collapsed ? 28 : 20} /> {/* Increased icon size when collapsed */}
            <Collapsible open={!collapsed}>
              <CollapsibleContent className="overflow-hidden">
                <span>{label}</span>
              </CollapsibleContent>
            </Collapsible>
          </Link>
        ))}
      </div>
    </nav>
  );
};
