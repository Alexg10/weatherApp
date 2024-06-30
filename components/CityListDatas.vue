<template>
  <div v-if="weatherData" class="flex flex-col items-center">
    <div class="text-xl md:text-2xl text-center">
      {{ weatherData.current.temperature2m.toFixed(0) }}°
    </div>
    <Icon
      :name="getWeatherIcon(weatherData.current.weatherCode)"
      class="min-w-[40px] text-center text-[grey]"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { getCoordinates } from "~/services/geocode";
import { fetchWeatherApi } from "openmeteo";
import { getWeatherIcon } from "~/services/weatherIcon";

const props = defineProps({
  city: {
    type: String,
    default: "Paris",
  },
});
const coordinates = ref({});
const weatherData = ref(null);

onMounted(async () => {
  try {
    const result = await getCoordinates(props.city);
    coordinates.value = result;
    const params = {
      latitude: coordinates.value.latitude,
      longitude: coordinates.value.longitude,
      current: ["temperature_2m", "weather_code"],
    };

    const url = "https://api.open-meteo.com/v1/forecast";
    const responses = await fetchWeatherApi(url, params);

    const response = responses[0];

    // Mettre à jour weatherData avec les données reçues
    weatherData.value = {
      current: {
        temperature2m: response.current().variables(0).value(),
        weatherCode: response.current().variables(1).value(),
      },
    };
  } catch (error) {
    console.error("Error fetching weather:", error);
  }
});
</script>
