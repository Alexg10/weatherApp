<template>
  <div>
    <NuxtPage />
  </div>
</template>

<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.4s ease-in-out;
}
.page-enter-from {
  transform: translateX(100vw);
}
.page-leave-to {
  transform: translateX(-100vw);
}
</style>
