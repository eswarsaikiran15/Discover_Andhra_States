import { useState } from "react";
import HeroSection from "@/components/HeroSection";
import PlacesSection from "@/components/PlacesSection";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchSubmit = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <div className="min-h-screen">
      <HeroSection onSearchSubmit={handleSearchSubmit} />
      <PlacesSection initialSearchQuery={searchQuery} />
    </div>
  );
};

export default Index;