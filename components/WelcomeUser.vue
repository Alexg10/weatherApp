<template>
  <div class="text-xl">
    <div class="flex items-center gap-2">
      Welcome {{ props.user.username }}
      <Icon name="wi:day-sunny" color="black" />
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  user: Object,
});
</script>
