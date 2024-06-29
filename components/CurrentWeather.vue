<template>
  <div class="col-span-full mb-5">
    <div class="flex justify-between text-sm relative">
      <div class="capitalize text-6xl">{{ cityName.split("_").join(" ") }}</div>
      <div class="flex gap-2 items-center absolute right-0 -top-11 lg:top-0">
        <Icon
          :name="getWeatherIcon(weatherData.current.weatherCode)"
          color="black"
        />
        <div class="w-4 h-[1px] bg-black"></div>

        {{ weatherDescription }}
      </div>
    </div>
  </div>
  <div class="col-span-full mb-10">
    <div class="flex text-base items-center gap-2">
      <div class="capitalize">{{ getCurrentDay() }}</div>
      <div class="w-4 h-[1px] bg-black"></div>
      <div class="">{{ getCurrentDayNum() }} {{ getCurrentMonth() }}</div>
    </div>
  </div>
  <div class="col-span-full mb-10 flex items-end justify-between">
    <div class="text-[130px] leading-[110px]">
      {{ weatherData.current.temperature2m.toFixed(0) }}°
    </div>
    <div class="flex justify-end">
      <div class="flex text-lg items-center gap-2">
        <div class="">
          {{ weatherData.daily.temperature2mMin[0].toFixed(0) }}°C
        </div>
        <div class="w-4 h-[1px] bg-black"></div>
        <div class="">
          {{ weatherData.daily.temperature2mMax[0].toFixed(0) }}°C
        </div>
      </div>
    </div>
  </div>
  <div class="col-span-full mb-10 overflow-x-auto">
    <ul class="flex gap-1">
      <li
        v-for="(data, index) in next12HoursTemperature2m()"
        :key="index"
        class="min-w-[40px] flex justify-between flex-col flex-1 text-center text-sm"
      >
        {{ computeHourWithIndex(index) }}
        <div class="flex flex-col items-center">
          <Icon
            :name="getWeatherIcon(next12HoursWeatherCode()[index])"
            color="black"
            class="text-center"
          />
          <div class="flex text-sm">{{ data.toFixed(0) }}°C</div>
        </div>
      </li>
    </ul>
  </div>

  <div
    class="col-span-full mb-4 grid w-full grid-cols-4 border-t relative before:absolute before:h-full before:w-[1px] before:bg-grey before:left-1/2 before:content:''"
  >
    <div class="col-span-2 border-b border-grey p-6">
      <div class="text-xl mb-2">Real feel</div>
      <div class="text-4xl">
        {{ weatherData.current.apparentTemperature.toFixed() }}°
      </div>
    </div>
    <div class="col-span-2 border-b border-grey p-6">
      <div class="text-xl mb-2">Humidity</div>
      <div class="text-4xl" v-if="weatherData.current.relativeHumidity2m">
        {{ weatherData.current.relativeHumidity2m }}%
      </div>
    </div>
    <div class="col-span-2 border-b border-grey p-6">
      <div class="text-xl mb-2">Wind</div>
      <div class="text-4xl">
        {{ weatherData.current.windSpeed10m.toFixed(0) }}ms/s
      </div>
    </div>
    <div class="col-span-2 border-b border-grey p-6">
      <div class="text-xl mb-2">UV index</div>
      <div class="text-4xl">
        {{ weatherData.daily.uvIndexMax[0].toFixed(0) }}
      </div>
    </div>
  </div>
  <div v-if="weatherData.daily" class="col-span-full">
    <h3 class="mb-3 text-xl">Daily Forecast</h3>
    <ul class="flex flex-col gap-1">
      <li
        v-for="(data, index) in weatherData.daily.temperature2mMax"
        :key="index"
        class="flex justify-between border-b"
      >
        {{ days[index] }}
        <div class="flex gap-4">
          <Icon
            :name="getWeatherIcon(weatherData.daily.weatherCode[index])"
            color="black"
            class="min-w-[40px] text-center"
          />
          <div class="min-w-[40px] flex justify-end">
            {{ weatherData.daily.temperature2mMax[index].toFixed(0) }}°C
          </div>
          <div class="text-black/20 min-w-[40px] text-left flex justify-end">
            {{ weatherData.daily.temperature2mMin[index].toFixed(0) }}°C
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { getWeatherInterpretation } from "~/services/weatherInterpretation";
import { getWeatherIcon } from "~/services/weatherIcon";

const props = defineProps(["cityName", "weatherData"]);

const weatherDescription = ref(null);

function next12HoursTemperature2m() {
  return props.weatherData.hourly.temperature2m.slice(0, 12);
}
function next12HoursPrecipitationProbability() {
  return props.weatherData.hourly.precipitationProbability.slice(0, 12);
}
function next12HoursWeatherCode() {
  return props.weatherData.hourly.weatherCode.slice(0, 12);
}

// function getCurrentHour() {
//   return new Date().toLocaleTimeString("fr-FR", {
//     hour: "numeric",
//   });
// }

function getCurrentHour() {
  const date = new Date();
  const hours = String(date.getHours()).padStart(2, "0"); // Formater l'heure avec deux chiffres
  return hours;
}

function computeHourWithIndex(index) {
  const currentHour = this.getCurrentHour();
  const hourNumber = parseInt(currentHour, 10);
  if (hourNumber + index >= 24) {
    return hourNumber + index - 24;
  }
  return hourNumber + index;
}

function getCurrentDay() {
  return new Date().toLocaleDateString("fr-FR", {
    weekday: "short",
  });
}
function getCurrentDayNum() {
  return new Date().toLocaleDateString("fr-FR", {
    day: "numeric",
  });
}

function getCurrentMonth() {
  return new Date().toLocaleDateString("fr-FR", {
    month: "short",
  });
}

function getNext7Days() {
  const today = new Date();
  const days = [];
  for (let i = 0; i < 8; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    days.push(
      date.toLocaleDateString("en-US", {
        weekday: "short",
      })
    );
  }
  return days;
}
const days = getNext7Days();

onMounted(() => {
  console.log(props.weatherData);
  if (props.weatherData) {
    weatherDescription.value = getWeatherInterpretation(
      props.weatherData.current.weatherCode
    );
  }
});
</script>
