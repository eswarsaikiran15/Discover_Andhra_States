// Debug utility to test button functionality
export const testButtonFunctions = (place: any) => {
  console.log('Testing button functions for:', place.name);
  
  // Test directions URL
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${place.coordinates.lat},${place.coordinates.lng}&travelmode=driving`;
  console.log('Directions URL:', directionsUrl);
  
  // Test view URL
  const viewUrl = `https://www.google.com/maps/search/?api=1&query=${place.coordinates.lat},${place.coordinates.lng}&query_place_id=${encodeURIComponent(place.name)}`;
  console.log('View URL:', viewUrl);
  
  // Test website URL
  if (place.contactInfo && place.contactInfo.startsWith('http')) {
    console.log('Website URL:', place.contactInfo);
  } else {
    const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(place.name + ' ' + place.district + ' official website')}`;
    console.log('Search URL:', searchUrl);
  }
  
  return {
    directionsUrl,
    viewUrl,
    websiteUrl: place.contactInfo || `https://www.google.com/search?q=${encodeURIComponent(place.name + ' ' + place.district + ' official website')}`
  };
};
