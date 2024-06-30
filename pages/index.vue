<template>
  <Grid class="h-screen py-10">
    <div
      class="col-span-full h-full flex flex-col justify-center gap-4 relative"
    >
      <div class="text-sm absolute top-0 right-0 flex gap-4 items-center">
        <NuxtLink to="/create-account"> Create an account </NuxtLink>
        <div class="w-4 h-[1px] bg-black" />

        <NuxtLink to="/login"> Log in </NuxtLink>
      </div>
      <div v-if="user" class="text-xl">
        <div class="flex items-center gap-2">
          Welcome {{ user.username }}
          <Icon name="wi:day-sunny" color="black" />
        </div>
      </div>
      <div class="text-4xl md:text-5xl lg:text-7xl">Weather app</div>
      <CitySearch />
    </div>
  </Grid>
</template>

<script setup>
import CitySearch from "@/components/CitySearch.vue";

const user = useStrapiUser();
</script>
