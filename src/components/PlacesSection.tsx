import { useState, useMemo, useEffect } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import PlaceCard from "./PlaceCard";
import PlaceDetailDialog from "./PlaceDetailDialog";
import { places, districts, placeTypes, Place } from "@/data/places";
import sampleTemple from "@/assets/sample-temple.jpg";
import sampleChurch from "@/assets/sample-church.jpg";
import sampleMosque from "@/assets/sample-mosque.jpg";
import sampleTouristPlace from "@/assets/sample-tourist-place.jpg";

interface PlacesSectionProps {
  initialSearchQuery?: string;
}

const PlacesSection = ({ initialSearchQuery = "" }: PlacesSectionProps) => {
  const [selectedDistrict, setSelectedDistrict] = useState("All Districts");
  const [selectedType, setSelectedType] = useState("All Types");
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  // Update search query when initialSearchQuery changes
  useEffect(() => {
    if (initialSearchQuery) {
      setSearchQuery(initialSearchQuery);
    }
  }, [initialSearchQuery]);

  // Update place images based on type
  const placesWithImages = useMemo(() => 
    places.map(place => ({
      ...place,
      image: place.type === "Temple" || place.type === "Hindu Temple" ? sampleTemple :
             place.type === "Church" || place.type === "Christian Church" ? sampleChurch :
             place.type === "Mosque" || place.type === "Islamic Shrine" ? sampleMosque :
             sampleTouristPlace
    })), []
  );

  const filteredPlaces = useMemo(() => {
    return placesWithImages.filter(place => {
      const matchesDistrict = selectedDistrict === "All Districts" || place.district === selectedDistrict;
      const matchesType = selectedType === "All Types" || place.type === selectedType;
      const matchesSearch = searchQuery === "" || 
        place.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        place.district.toLowerCase().includes(searchQuery.toLowerCase()) ||
        place.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        place.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
      return matchesDistrict && matchesType && matchesSearch;
    });
  }, [placesWithImages, selectedDistrict, selectedType, searchQuery]);

  const handlePlaceClick = (place: Place) => {
    setSelectedPlace(place);
    setDialogOpen(true);
  };

  const statsData = useMemo(() => {
    const temples = placesWithImages.filter(p => p.type === "Temple" || p.type === "Hindu Temple").length;
    const churches = placesWithImages.filter(p => p.type === "Church" || p.type === "Christian Church").length;
    const mosques = placesWithImages.filter(p => p.type === "Mosque" || p.type === "Islamic Shrine").length;
    const touristPlaces = placesWithImages.filter(p => 
      !["Temple", "Hindu Temple", "Church", "Christian Church", "Mosque", "Islamic Shrine"].includes(p.type)
    ).length;

    return { temples, churches, mosques, touristPlaces };
  }, [placesWithImages]);

  return (
    <section id="places-section" className="py-16 bg-warm-gradient">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-earth-brown mb-4 animate-fade-in">Explore Amazing Places</h2>
          <p className="text-lg text-muted-foreground">
            Discover {placesWithImages.length}+ sacred and beautiful destinations across Andhra Pradesh & Telangana
          </p>
          
          {/* Updated Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8 max-w-4xl mx-auto">
            <div className="text-center transform hover:scale-105 transition-all duration-300 p-4 bg-white/10 rounded-lg backdrop-blur">
              <div className="text-3xl md:text-4xl font-bold text-temple-gold mb-1">{statsData.temples}+</div>
              <div className="text-sm text-muted-foreground">Sacred Temples</div>
            </div>
            <div className="text-center transform hover:scale-105 transition-all duration-300 p-4 bg-white/10 rounded-lg backdrop-blur">
              <div className="text-3xl md:text-4xl font-bold text-temple-gold mb-1">{statsData.churches}+</div>
              <div className="text-sm text-muted-foreground">Historic Churches</div>
            </div>
            <div className="text-center transform hover:scale-105 transition-all duration-300 p-4 bg-white/10 rounded-lg backdrop-blur">
              <div className="text-3xl md:text-4xl font-bold text-temple-gold mb-1">{statsData.mosques}+</div>
              <div className="text-sm text-muted-foreground">Beautiful Mosques</div>
            </div>
            <div className="text-center transform hover:scale-105 transition-all duration-300 p-4 bg-white/10 rounded-lg backdrop-blur">
              <div className="text-3xl md:text-4xl font-bold text-temple-gold mb-1">{statsData.touristPlaces}+</div>
              <div className="text-sm text-muted-foreground">Tourist Places</div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="space-y-4 mb-8 max-w-4xl mx-auto">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
            <Input 
              placeholder="Search places by name, district, or tags..." 
              className="pl-10 h-12 text-base bg-white/95 backdrop-blur border-warm-beige/30 focus:border-temple-gold focus:ring-2 focus:ring-temple-gold/20 transition-all duration-300"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          {/* Filters Row */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Select value={selectedDistrict} onValueChange={setSelectedDistrict}>
              <SelectTrigger className="flex-1 bg-white/95 border-warm-beige/30 focus:border-temple-gold focus:ring-2 focus:ring-temple-gold/20 transition-all duration-300">
                <SelectValue placeholder="Select District" />
              </SelectTrigger>
              <SelectContent>
                {districts.map((district) => (
                  <SelectItem key={district} value={district}>
                    {district}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="flex-1 bg-white/95 border-warm-beige/30 focus:border-temple-gold focus:ring-2 focus:ring-temple-gold/20 transition-all duration-300">
                <SelectValue placeholder="Place Type" />
              </SelectTrigger>
              <SelectContent>
                {placeTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Results Count */}
        <div className="text-center mb-6">
          <p className="text-muted-foreground">
            Showing {filteredPlaces.length} places
            {selectedDistrict !== "All Districts" && ` in ${selectedDistrict}`}
            {selectedType !== "All Types" && ` • ${selectedType}`}
            {searchQuery && ` • matching "${searchQuery}"`}
          </p>
        </div>

        {/* Places Grid */}
        {filteredPlaces.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-fade-in">
            {filteredPlaces.map((place, index) => (
              <div
                key={place.id}
                className="animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <PlaceCard 
                  place={place}
                  onClick={() => handlePlaceClick(place)}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 animate-fade-in">
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-lg text-muted-foreground mb-4">No places found matching your criteria</p>
            <p className="text-muted-foreground">Try adjusting your search or filters</p>
          </div>
        )}

        {/* Place Detail Dialog */}
        <PlaceDetailDialog 
          place={selectedPlace}
          open={dialogOpen}
          onOpenChange={setDialogOpen}
        />
      </div>
    </section>
  );
};

export default PlacesSection;