<template>
  <Grid class="h-screen py-10">
    <div
      class="col-span-full h-full flex flex-col justify-center gap-4 relative"
    >
      <div class="absolute top-0 left-0">
        <BackHome />
      </div>
      <div class="login-container relative">
        <div class="login-form">
          <div class="login-header">
            <h1 class="text-4xl md:text-5xl lg:text-7xl">Create an account</h1>
          </div>
          <form class="w-full md:w-2/3 lg:w-1/2" @submit.prevent="onSubmit">
            <div class="login-body flex gap-2 flex-col">
              <div class="login-input">
                <input
                  v-model="user.username"
                  type="text"
                  placeholder="Username"
                  class="border-b w-full"
                  @keyup.enter="login"
                >
              </div>
              <div class="login-input">
                <input
                  v-model="user.email"
                  type="mail"
                  placeholder="Mail"
                  class="border-b w-full"
                  @keyup.enter="email"
                >
              </div>
              <div class="login-input">
                <input
                  v-model="user.password"
                  type="password"
                  placeholder="Password"
                  class="border-b w-full"
                  @keyup.enter="login"
                >
              </div>
              <div class="login-button">
                <button
                  class="bg-black text-white px-3 py-2 min-w-[120px] border border-black hover:bg-white hover:text-black"
                  @click="login"
                >
                  Login
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </Grid>
</template>

<script setup>
const { register } = useStrapiAuth();
const router = useRouter();

const user = reactive({
  username: "",
  email: "",
  password: "",
});

const onSubmit = async () => {
  try {
    await register({
      username: user.username,
      email: user.email,
      password: user.password,
    });

    router.push("/");
  } catch (e) {
    console.error("Erreur lors de l'enregistrement :", e);
  }
};
</script>
