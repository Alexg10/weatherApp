// composables/useGoogleApiKey.js
import { useRuntimeConfig } from "#app";

export const useGoogleApiKey = () => {
  const config = useRuntimeConfig();
  return config.public.googleApiKey;
};
