<template>
  <div class="flex lg:p-6 lg:mx-28 lg:bg-[url('/images/fondo-header.jpg')]">
    <img
      class="lg:w-40 font-semibold"
      src="/images/logo.png"
      alt="Logotipo"
    />
    <h1 class="mt-2 lg:mr-10 font-bold text-white text-6xl px-16 py-2">Energy Power Fitness </h1>
  </div>
  <RouterView />
</template>

<script>
export default {
  name: "App",
};
</script>
