// services/geocode.js

import { useGoogleApiKey } from "@/composables/useGoogleApiKey";

export async function getCoordinates(cityName) {
  try {
    const API_KEY = useGoogleApiKey();
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
        cityName
      )}&key=${API_KEY}`
    );
    if (!response.ok) {
      throw new Error("Réponse réseau incorrecte");
    }
    const data = await response.json();
    if (data.results.length > 0) {
      const { lat, lng } = data.results[0].geometry.location;
      return { latitude: lat, longitude: lng };
    } else {
      throw new Error("Aucun résultat trouvé pour cette ville.");
    }
  } catch (error) {
    console.error("Erreur lors de la récupération des coordonnées:", error);
    throw error;
  }
}
