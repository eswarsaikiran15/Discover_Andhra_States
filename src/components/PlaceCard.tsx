import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, ExternalLink } from "lucide-react";
import { Place } from "@/data/places";

interface PlaceCardProps {
  place: Place;
  onClick: () => void;
}

const PlaceCard = ({ place, onClick }: PlaceCardProps) => {
  const getTypeColor = (type: string) => {
    switch (type) {
      case "Temple": return "bg-temple-gold text-earth-brown";
      case "Church": return "bg-blue-100 text-blue-800";
      case "Mosque": return "bg-green-100 text-green-800";
      case "Beach": return "bg-cyan-100 text-cyan-800";
      case "Waterfall": return "bg-blue-200 text-blue-900";
      case "Cave": return "bg-gray-100 text-gray-800";
      case "Fort": return "bg-amber-100 text-amber-800";
      case "Dam": return "bg-indigo-100 text-indigo-800";
      case "Museum": return "bg-purple-100 text-purple-800";
      case "Mall": return "bg-pink-100 text-pink-800";
      case "Hill Station": return "bg-emerald-100 text-emerald-800";
      case "Sanctuary": return "bg-lime-100 text-lime-800";
      case "Lake": return "bg-sky-100 text-sky-800";
      case "Historical Site": return "bg-orange-100 text-orange-800";
      case "Natural Wonder": return "bg-teal-100 text-teal-800";
      case "Modern Marvel": return "bg-violet-100 text-violet-800";
      case "Entertainment": return "bg-rose-100 text-rose-800";
      case "Park": return "bg-green-200 text-green-900";
      case "Art & Culture": return "bg-yellow-100 text-yellow-800";
      case "Wildlife": return "bg-emerald-200 text-emerald-900";
      case "Zoo": return "bg-orange-200 text-orange-900";
      case "Shopping Mall": return "bg-pink-200 text-pink-900";
      case "Coastal Attraction": return "bg-cyan-200 text-cyan-900";
      case "Buddhist Site": return "bg-amber-200 text-amber-900";
      case "Islamic Shrine": return "bg-green-200 text-green-900";
      case "Christian Church": return "bg-blue-200 text-blue-900";
      case "Hindu Temple": return "bg-temple-gold text-earth-brown";
      default: return "bg-secondary text-secondary-foreground";
    }
  };

  return (
    <Card 
      className="overflow-hidden hover:shadow-warm transition-all duration-300 hover:-translate-y-1 bg-card border-warm-beige/20 cursor-pointer group"
      onClick={onClick}
    >
      <div className="relative">
        <img 
          src={place.image} 
          alt={place.name}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <Badge 
          className={`absolute top-3 left-3 ${getTypeColor(place.type)}`}
        >
          {place.type}
        </Badge>
        <Badge 
          variant="secondary"
          className="absolute top-3 right-3 bg-white/90"
        >
          {place.state === 'AP' ? 'Andhra Pradesh' : 'Telangana'}
        </Badge>
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
          <ExternalLink className="h-6 w-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      </div>
      
      <CardContent className="p-6">
        <h3 className="text-xl font-semibold mb-2 text-earth-brown group-hover:text-primary transition-colors">
          {place.name}
        </h3>
        
        <div className="flex items-center text-muted-foreground mb-3">
          <MapPin className="h-4 w-4 mr-1" />
          <span className="text-sm">{place.district}</span>
        </div>
        
        <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
          {place.description}
        </p>
        
        <div className="flex items-center text-sm text-muted-foreground mb-4">
          <Clock className="h-4 w-4 mr-1" />
          <span>Best time: {place.bestTimeToVisit}</span>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {place.tags.slice(0, 3).map((tag, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
          {place.tags.length > 3 && (
            <Badge variant="secondary" className="text-xs">
              +{place.tags.length - 3} more
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default PlaceCard;