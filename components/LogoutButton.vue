<template>
  <Icon
    name="iconoir:log-out"
    class="w-4 h-4 cursor-pointer"
    @click="onClick"
  />
</template>

<script setup>
const { logout } = useStrapiAuth();
const router = useRouter();

const onClick = () => {
  logout();

  router.push("/");
};
</script>
