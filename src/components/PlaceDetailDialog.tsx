import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, Train, Plane, Globe, Phone, DollarSign, Calendar, Navigation, Eye } from "lucide-react";
import { Place } from "@/data/places";

interface PlaceDetailDialogProps {
  place: Place | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const PlaceDetailDialog = ({ place, open, onOpenChange }: PlaceDetailDialogProps) => {
  if (!place) return null;

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Temple": return "bg-temple-gold text-earth-brown";
      case "Church": return "bg-blue-100 text-blue-800";
      case "Mosque": return "bg-green-100 text-green-800";
      case "Beach": return "bg-cyan-100 text-cyan-800";
      case "Waterfall": return "bg-blue-200 text-blue-900";
      case "Cave": return "bg-gray-100 text-gray-800";
      case "Fort": return "bg-amber-100 text-amber-800";
      case "Hill Station": return "bg-emerald-100 text-emerald-800";
      default: return "bg-secondary text-secondary-foreground";
    }
  };

  const openGoogleMaps = () => {
    try {
      // Simplified Google Maps directions URL
      const directionsUrl = `https://www.google.com/maps/dir//${place.coordinates.lat},${place.coordinates.lng}`;
      console.log('Opening directions:', directionsUrl);
      window.open(directionsUrl, '_blank');
    } catch (error) {
      console.error('Error opening Google Maps directions:', error);
      // Fallback to basic maps link
      window.open(`https://maps.google.com/?q=${place.coordinates.lat},${place.coordinates.lng}`, '_blank');
    }
  };

  const openGoogleMapsView = () => {
    try {
      // Simplified Google Maps view URL
      const viewUrl = `https://www.google.com/maps/place/${place.coordinates.lat},${place.coordinates.lng}`;
      console.log('Opening map view:', viewUrl);
      window.open(viewUrl, '_blank');
    } catch (error) {
      console.error('Error opening Google Maps view:', error);
      // Fallback to basic maps link
      window.open(`https://maps.google.com/?q=${place.coordinates.lat},${place.coordinates.lng}`, '_blank');
    }
  };

  const openWebsite = () => {
    try {
      if (place.contactInfo && place.contactInfo.startsWith('http')) {
        console.log('Opening website:', place.contactInfo);
        window.open(place.contactInfo, '_blank');
      } else {
        // Search for the place on Google if no website available
        const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(place.name + ' ' + place.district + ' official website')}`;
        console.log('Searching for website:', searchUrl);
        window.open(searchUrl, '_blank');
      }
    } catch (error) {
      console.error('Error opening website:', error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl text-earth-brown">{place.name}</DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Image and Basic Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="relative">
              <img 
                src={place.image} 
                alt={place.name}
                className="w-full h-64 object-cover rounded-lg"
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
            </div>
            
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <MapPin className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="font-medium">{place.district} District</p>
                  <p className="text-sm text-muted-foreground">{place.locationDetails}</p>
                </div>
              </div>
              
              <p className="text-muted-foreground leading-relaxed">{place.description}</p>
              
              <div className="flex flex-wrap gap-2">
                {place.tags.map((tag, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Details Panel */}
          <div className="space-y-6">
            {/* Visit Information */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg text-earth-brown">Visit Information</h3>
              
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Calendar className="h-4 w-4 text-primary" />
                  <div>
                    <p className="text-sm font-medium">Best Time</p>
                    <p className="text-sm text-muted-foreground">{place.bestTimeToVisit}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Clock className="h-4 w-4 text-primary" />
                  <div>
                    <p className="text-sm font-medium">Timings</p>
                    <p className="text-sm text-muted-foreground">{place.timings}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <DollarSign className="h-4 w-4 text-primary" />
                  <div>
                    <p className="text-sm font-medium">Entry Fee</p>
                    <p className="text-sm text-muted-foreground">{place.entryFee}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Transportation */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg text-earth-brown">How to Reach</h3>
              
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Train className="h-4 w-4 text-primary" />
                  <div>
                    <p className="text-sm font-medium">Nearest Railway</p>
                    <p className="text-sm text-muted-foreground">{place.nearestRailwayStation}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Plane className="h-4 w-4 text-primary" />
                  <div>
                    <p className="text-sm font-medium">Nearest Airport</p>
                    <p className="text-sm text-muted-foreground">{place.nearestAirport}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3">
              <Button 
                onClick={openGoogleMaps}
                className="w-full bg-temple-gold hover:bg-temple-gold/90 text-earth-brown font-semibold transform hover:scale-105 transition-all duration-300"
              >
                <Navigation className="h-4 w-4 mr-2" />
                Get Directions
              </Button>
              
              <Button 
                onClick={openGoogleMapsView}
                variant="outline"
                className="w-full border-temple-gold text-temple-gold hover:bg-temple-gold hover:text-earth-brown transition-all duration-300"
              >
                <Eye className="h-4 w-4 mr-2" />
                View on Map
              </Button>
              
              <Button 
                onClick={openWebsite}
                variant="outline"
                className="w-full border-blue-500 text-blue-600 hover:bg-blue-50 transition-all duration-300"
              >
                <Globe className="h-4 w-4 mr-2" />
                {place.contactInfo && place.contactInfo.startsWith('http') ? 'Visit Website' : 'Search Online'}
              </Button>
              
              {place.contactInfo && !place.contactInfo.startsWith('http') && (
                <div className="flex items-center gap-2 p-3 bg-muted rounded-lg hover:bg-muted/80 transition-all duration-300 cursor-pointer"
                     onClick={() => window.open(`tel:${place.contactInfo}`, '_self')}>
                  <Phone className="h-4 w-4 text-primary" />
                  <span className="text-sm">{place.contactInfo}</span>
                </div>
              )}
            </div>

            {/* Coordinates */}
            <div className="text-xs text-muted-foreground">
              <p>Coordinates: {place.coordinates.lat}, {place.coordinates.lng}</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PlaceDetailDialog;