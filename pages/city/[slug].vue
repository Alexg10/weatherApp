<template>
  <Grid class="py-4 overflow-hidden">
    <div class="col-span-full flex justify-start items-center gap-2 mb-4">
      <NuxtLink to="/" class="flex items-center gap-2">
        <Icon name="mdi-light:arrow-left" color="black" />
        Back to home
      </NuxtLink>
    </div>
    <CurrentWeather
      v-if="weatherData"
      :cityName="cityName"
      :weatherData="weatherData"
    />
  </Grid>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { getCoordinates } from "~/services/geocode";
import { fetchWeatherApi } from "openmeteo";

const route = useRoute();
const cityName = route.params.slug;
const coordinates = ref({});
const weatherData = ref(null); // Déclarer weatherData en tant que ref

onMounted(async () => {
  try {
    const result = await getCoordinates(cityName);
    coordinates.value = result;

    // Now fetch weather data using the obtained coordinates
    const params = {
      latitude: coordinates.value.latitude,
      longitude: coordinates.value.longitude,
      current: [
        "temperature_2m",
        "relative_humidity_2m",
        "apparent_temperature",
        "is_day",
        "weather_code",
        "wind_speed_10m",
      ],
      hourly: [
        "temperature_2m",
        "relative_humidity_2m",
        "precipitation_probability",
        "rain",
        "weather_code",
        "wind_speed_10m",
        "uv_index",
      ],
      daily: [
        "weather_code",
        "temperature_2m_max",
        "temperature_2m_min",
        "sunrise",
        "sunset",
        "uv_index_max",
      ],
    };

    const url = "https://api.open-meteo.com/v1/forecast";
    const responses = await fetchWeatherApi(url, params);

    const response = responses[0];
    const utcOffsetSeconds = response.utcOffsetSeconds();
    const timezone = response.timezone();
    const hourlyData = response.hourly();
    const dailyData = response.daily();

    // Mettre à jour weatherData avec les données reçues
    weatherData.value = {
      current: {
        temperature2m: response.current().variables(0).value(),
        relativeHumidity2m: response.current().variables(1).value(),
        apparentTemperature: response.current().variables(2).value(),
        isDay: response.current().variables(3).value(),
        weatherCode: response.current().variables(4).value(),
        windSpeed10m: response.current().variables(5).value(),
      },
      hourly: {
        time: hourlyData.time(),
        temperature2m: hourlyData.variables(0).valuesArray(),
        relativeHumidity2m: hourlyData.variables(1).valuesArray(),
        precipitationProbability: hourlyData.variables(2).valuesArray(),
        rain: hourlyData.variables(3).valuesArray(),
        weatherCode: hourlyData.variables(4).valuesArray(),
        windSpeed10m: hourlyData.variables(5).valuesArray(),
        uvIndex: hourlyData.variables(6).valuesArray(),
      },
      daily: {
        time: dailyData.time(),
        weatherCode: dailyData.variables(0).valuesArray(),
        temperature2mMax: dailyData.variables(1).valuesArray(),
        temperature2mMin: dailyData.variables(2).valuesArray(),
        sunrise: dailyData.variables(3).valuesArray(),
        sunset: dailyData.variables(4).valuesArray(),
        uvIndexMax: dailyData.variables(5).valuesArray(),
      },
    };
  } catch (error) {
    console.error("Error fetching weather:", error);
  }
});
</script>
