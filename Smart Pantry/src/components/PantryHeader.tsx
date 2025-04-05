
import { Search, Bell, User, Sun, Moon, Menu } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useState } from "react";

export const PantryHeader = () => {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  
  return (
    <header className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6">
        <div className="flex lg:hidden">
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
        
        <div className="relative max-w-md w-full hidden md:flex">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input
            className="pl-10 bg-white/70 border-gray-200 focus-visible:ring-pantry-sage transition-all duration-200 hover:bg-white/90 pr-4"
            placeholder="Search ingredients or recipes..."
          />
        </div>
        
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="text-gray-500 hover:text-pantry-sage"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          >
            {theme === "light" ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
            <span className="sr-only">Toggle theme</span>
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative text-gray-500 hover:text-pantry-sage">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 flex items-center justify-center text-[10px] text-white">
                  3
                </span>
                <span className="sr-only">Notifications</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel>Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {[
                {
                  title: "New recipe shared",
                  description: "Chef Maria shared a new pasta recipe with you",
                  time: "Just now"
                },
                {
                  title: "Ingredient expiring soon",
                  description: "Your milk will expire in 2 days",
                  time: "2 hours ago"
                },
                {
                  title: "Weekly meal plan reminder",
                  description: "Don't forget to plan your meals for next week",
                  time: "Yesterday"
                }
              ].map((notification, index) => (
                <DropdownMenuItem key={index} className="flex flex-col items-start py-2 cursor-pointer">
                  <div className="flex items-start gap-2">
                    <div className="h-2 w-2 mt-1.5 rounded-full bg-pantry-sage flex-shrink-0" />
                    <div>
                      <p className="font-medium text-sm">{notification.title}</p>
                      <p className="text-gray-500 text-xs">{notification.description}</p>
                      <p className="text-gray-400 text-xs mt-1">{notification.time}</p>
                    </div>
                  </div>
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuItem className="justify-center text-pantry-sage font-medium cursor-pointer">
                View all notifications
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full h-8 w-8 ml-1">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="https://images.unsplash.com/photo-1534308143481-c55f00be8bd7?w=100&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" />
                  <AvatarFallback className="bg-pantry-sage text-white">JD</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>My Recipes</DropdownMenuItem>
              <DropdownMenuItem>Saved Recipes</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Log out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};
