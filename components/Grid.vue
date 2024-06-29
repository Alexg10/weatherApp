<template>
  <div
    class="grid w-full grid-cols-4 gap-x-2 px-4 md:grid-cols-6 md:gap-x-4 md:px-12 lg:mx-auto lg:max-w-screen-xl lg:grid-cols-12"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "Grid",
};
</script>
