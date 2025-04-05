import { useNavigate } from 'react-router-dom';
import { HeroSection } from '@/components/landing/HeroSection';
import { FeaturesSection } from '@/components/landing/FeaturesSection';
import { Button } from '@/components/ui/button';
import { ArrowRight, LogIn } from 'lucide-react';

const LandingPage = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen">
      <header className="fixed top-0 w-full bg-white/10 backdrop-blur-md z-50">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-pantry-sage rounded-full">
              <svg
                className="w-5 h-5 text-white"
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
            <span className="text-xl font-semibold text-white">Smart Pantry</span>
          </div>
          
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              className="text-white hover:bg-white/10"
              onClick={() => navigate("/dashboard")}
            >
              <LogIn className="mr-2 h-4 w-4" />
              Log In
            </Button>
            <Button 
              className="bg-pantry-sage hover:bg-pantry-sage/90 text-white"
              onClick={() => navigate("/dashboard")} 
            >
              Sign Up
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>
      
      <HeroSection />
      <FeaturesSection />
      
      <section className="py-20 bg-pantry-brown text-white text-center">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">Ready to Transform Your Kitchen?</h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto mb-10">
            Join thousands of home chefs who are already simplifying their cooking experience with Smart Pantry.
          </p>
          <Button 
            size="lg"
            onClick={() => navigate("/dashboard")} 
            className="bg-pantry-sage hover:bg-pantry-sage/90 text-white px-8 py-6 text-lg"
          >
            Get Started Now
          </Button>
        </div>
      </section>
      
      <footer className="bg-pantry-brown/90 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-8 md:mb-0">
              <div className="flex items-center gap-2 mb-4">
                <div className="p-1.5 bg-pantry-sage rounded-full">
                  <svg
                    className="w-4 h-4 text-white"
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
                <span className="font-semibold">Smart Pantry</span>
              </div>
              <p className="text-white/60 max-w-xs">
                Your intelligent kitchen management solution for modern cooking.
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h3 className="font-medium mb-4">Product</h3>
                <ul className="space-y-2 text-white/60">
                  <li><a href="#" className="hover:text-pantry-sage">Features</a></li>
                  <li><a href="#" className="hover:text-pantry-sage">Pricing</a></li>
                  <li><a href="#" className="hover:text-pantry-sage">FAQ</a></li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-medium mb-4">Company</h3>
                <ul className="space-y-2 text-white/60">
                  <li><a href="#" className="hover:text-pantry-sage">About Us</a></li>
                  <li><a href="#" className="hover:text-pantry-sage">Blog</a></li>
                  <li><a href="#" className="hover:text-pantry-sage">Careers</a></li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-medium mb-4">Legal</h3>
                <ul className="space-y-2 text-white/60">
                  <li><a href="#" className="hover:text-pantry-sage">Privacy</a></li>
                  <li><a href="#" className="hover:text-pantry-sage">Terms</a></li>
                  <li><a href="#" className="hover:text-pantry-sage">Cookie Policy</a></li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="border-t border-white/10 mt-12 pt-8 text-center text-white/60">
            <p>© {new Date().getFullYear()} Smart Pantry. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
