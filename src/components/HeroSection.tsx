import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MapPin } from "lucide-react";
import { useState } from "react";
import heroBackground from "@/assets/hero-background.jpg";

interface HeroSectionProps {
  onSearchSubmit?: (query: string) => void;
}

const HeroSection = ({ onSearchSubmit }: HeroSectionProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleExplore = () => {
    // Scroll to places section smoothly
    const placesSection = document.getElementById('places-section');
    if (placesSection) {
      placesSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
    
    // If there's a search query, pass it to parent
    if (searchQuery.trim() && onSearchSubmit) {
      onSearchSubmit(searchQuery.trim());
    }
  };

  const handleSearchKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleExplore();
    }
  };

  return (
    <section 
      className="relative min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${heroBackground})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-hero-gradient opacity-80" />
      
      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
        <h1 className="text-hero font-bold text-white mb-6">
          Discover <span className="text-temple-gold">Andhra States</span>
        </h1>
        
        <p className="text-xl text-white/90 mb-12 max-w-4xl mx-auto">
          Explore sacred temples, historic churches, magnificent mosques, and breathtaking tourist destinations across the cultural heart of South India
        </p>

        {/* Search Bar */}
        <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto mb-16">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
            <Input 
              placeholder="Search temples, churches, mosques, or places..." 
              className="pl-10 h-14 text-lg bg-white/95 backdrop-blur border-white/20 focus:border-temple-gold focus:ring-2 focus:ring-temple-gold/20 transition-all duration-300"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleSearchKeyPress}
            />
          </div>
          <Button 
            variant="hero" 
            size="lg" 
            className="h-14 bg-temple-gold hover:bg-temple-gold/90 text-earth-brown font-bold transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
            onClick={handleExplore}
          >
            <MapPin className="h-5 w-5" />
            Explore
          </Button>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          <div className="text-center transform hover:scale-105 transition-all duration-300">
            <div className="text-4xl md:text-5xl font-bold text-temple-gold mb-2 animate-pulse">500+</div>
            <div className="text-white/90">Sacred Temples</div>
          </div>
          <div className="text-center transform hover:scale-105 transition-all duration-300">
            <div className="text-4xl md:text-5xl font-bold text-temple-gold mb-2 animate-pulse">200+</div>
            <div className="text-white/90">Historic Churches</div>
          </div>
          <div className="text-center transform hover:scale-105 transition-all duration-300">
            <div className="text-4xl md:text-5xl font-bold text-temple-gold mb-2 animate-pulse">150+</div>
            <div className="text-white/90">Beautiful Mosques</div>
          </div>
          <div className="text-center transform hover:scale-105 transition-all duration-300">
            <div className="text-4xl md:text-5xl font-bold text-temple-gold mb-2 animate-pulse">300+</div>
            <div className="text-white/90">Tourist Places</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;