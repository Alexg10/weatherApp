<template>
  <Grid class="py-10" :class="user ? 'h-auto' : 'h-screen py-10'">
    <div
      class="col-span-full h-full flex flex-col justify-center relative"
      :class="user ? 'gap-20 md:gap-25' : ''"
    >
      <div class="text-sm absolute top-0 right-0 flex gap-4 items-center">
        <NuxtLink to="/create-account"> Create an account </NuxtLink>
        <div class="w-4 h-[1px] bg-black" />
        <NuxtLink to="/login"> Log in </NuxtLink>
      </div>
      <div :class="user ? 'pt-20 lg:pt-[6rem]' : ''">
        <WelcomeUser v-if="user" :user="user" />
        <div class="text-4xl md:text-5xl lg:text-7xl">Weather app</div>
        <CitySearch />
      </div>
      <FavoritesCities v-if="user" :user="user" />
    </div>
  </Grid>
</template>

<script setup>
const user = useStrapiUser();
</script>
