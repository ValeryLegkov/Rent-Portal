"use client";
import React, { useEffect, useState } from "react";
// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { geocodeAddress } from "@/utils/geocodeAddress";
import dynamic from "next/dynamic";
import { Spinner } from "@/components/Spinner";

// TODO: REFACTOR / make more useful MAP component / right now it use only street & zipcode because Leaflet/Nominatim doesn't search for city & state // see geocodeAddress

// Динамически импортируем MapContainer и т.п., чтоб он не вызывал ошибки на сервере при обращении к window
const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
);
const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), {
  ssr: false,
});

interface PropertyMapProps {
  location: {
    street: string;
    zipcode: string;
  };
}

export const PropertyMap: React.FC<PropertyMapProps> = ({ location }) => {
  const [coordinates, setCoordinates] = useState<{
    lat: number;
    lon: number;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCoordinates = async () => {
      try {
        const coords = await geocodeAddress(location);
        setCoordinates(coords);
      } catch (error) {
        setError("Address not found");
      }
    };

    fetchCoordinates();
  }, [location]);

  // Иконка для Leaflet (чтобы избежать ошибки с дефолтной иконкой)
  const DefaultIcon = L.icon({
    iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
    shadowSize: [41, 41],
  });
  L.Marker.prototype.options.icon = DefaultIcon;

  return (
    <div>
      {error && <p>{error}</p>}
      {coordinates ? (
        <MapContainer
          center={[coordinates.lat, coordinates.lon]}
          zoom={13}
          style={{ height: "400px", width: "100%" }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker position={[coordinates.lat, coordinates.lon]}>
            <Popup>{`${location.street}, ${location.zipcode}`}</Popup>
          </Marker>
        </MapContainer>
      ) : (
        <Spinner />
      )}
    </div>
  );
};
