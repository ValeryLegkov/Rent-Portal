// TODO: REFACTOR / make more useful MAP util / right now it use only street & zipcode because Leaflet/Nominatim doesn't search for city & state

const formatAddress = (location: { street: string; zipcode: string }) => {
  return `${location.street}, ${location.zipcode}`;
};

export async function geocodeAddress(location: {
  street: string;
  zipcode: string;
}) {
  const formattedAddress = formatAddress(location);
  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
    formattedAddress
  )}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Wrong response from Nominatim");
    }
    const data = await response.json();
    if (data.length === 0) {
      throw new Error("Address not found");
    }
    return data[0];
  } catch (error) {
    console.error("Error while geocoding address: ", error);
    throw error;
  }
}
