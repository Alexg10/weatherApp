<template>
  <div>
    <button @click="onClick">Google</button>
  </div>
</template>

<script setup lang="ts">
const { getProviderAuthenticationUrl } = useStrapiAuth();

const onClick = () => {
  window.location = getProviderAuthenticationUrl("google");
};
</script>
