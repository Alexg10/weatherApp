<template>
  <form
    class="relative w-full md:w-2/3 lg:w-1/2"
    @submit.prevent="handleSubmit"
  >
    <SearchCity v-model="cityName" />
    <button
      type="submit"
      class="flex gap-2 items-center absolute right-0 top-0"
    >
      <Icon name="mdi-light:magnify" color="black" />
    </button>
  </form>
</template>

<script setup>
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
