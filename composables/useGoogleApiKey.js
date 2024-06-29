// composables/useGoogleApiKey.js
import { useRuntimeConfig } from "#app";

export const useGoogleApiKey = () => {
  const config = useRuntimeConfig();
  console.log(config);
  return config.public.googleApiKey;
};
