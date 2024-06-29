<template>
  <Grid class="h-screen">
    <div class="col-span-full h-full flex flex-col justify-center gap-4">
      <div class="text-4xl md:text-5xl lg:text-7xl">Weather app</div>
      <form
        @submit.prevent="handleSubmit"
        class="relative w-full md:w-2/3 lg:w-1/2"
      >
        <SearchCity v-model="cityName" />
        <button
          type="submit"
          class="flex gap-2 items-center absolute right-0 top-0"
        >
          <Icon name="mdi-light:magnify" color="black" />
        </button>
      </form>
    </div>
  </Grid>
</template>

<script setup>
import { ref, watch } from "vue";
import { useRouter } from "vue-router";
import SearchCity from "@/components/SearchCity.vue";

const router = useRouter();
const cityName = ref("");

const handleSubmit = () => {
  const citySlug = cityName.value.replace(/\s+/g, "_");
  if (citySlug) {
    router.push(`/city/${citySlug}`);
  } else {
    console.error("City name is empty!");
  }
};
</script>
