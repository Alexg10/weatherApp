<template>
  <div class="">
    <div class="text-4xl md:text-6xl lg:text-7xl">Favorite cities</div>
    <ul v-for="city in favoritesCities" :key="city.id" class="">
      <li class="border-b border-grey py-4">
        <NuxtLink :to="`/city/${city}`" class="flex justify-between">
          <div class="flex text-3xl md:text-5xl item">
            {{ city.split("_").join(" ") }}
          </div>
          <CityListDatas :city="city" />
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>

<script setup>
import CityListDatas from "@/components/CityListDatas.vue";

const props = defineProps({
  user: Object,
});

const favoritesCities = props.user.favoriteCities;
</script>
