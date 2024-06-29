<template>
  <div>
    <input
      ref="autocompleteInput"
      v-model="localCityName"
      type="text"
      placeholder="Enter a city"
      class="border-b w-full active:border-black text-xl"
    >
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from "vue";
import { Loader } from "@googlemaps/js-api-loader";
import { useGoogleApiKey } from "@/composables/useGoogleApiKey";

const autocompleteInput = ref(null);
const localCityName = ref("");
const API_KEY = useGoogleApiKey();

defineProps(["modelValue"]);
const emit = defineEmits(["update:modelValue"]);

watch(localCityName, (newValue) => {
  emit("update:modelValue", newValue);
});

onMounted(() => {
  const loader = new Loader({
    apiKey: API_KEY,
    libraries: ["places"],
  });

  loader.load().then(() => {
    const autocomplete = new google.maps.places.Autocomplete(
      autocompleteInput.value,
      {
        types: ["(cities)"],
      }
    );

    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();
      if (place.address_components) {
        localCityName.value = place.address_components[0].long_name;
      }
    });
  });
});
</script>
