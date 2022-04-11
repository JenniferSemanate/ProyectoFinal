<template>
  <div class="flex justify-between lg:p-6 lg:mx-28 lg:bg-[url('/images/fondo-header.jpg')]">
    <img
      class="mg:w-16 lg:w-40 font-semibold"
      src="/images/logo.png"
      alt="Logotipo"
    />
    <h2 class="mt-2 lg:mr-10 font-bold text-white text-4xl bg-blue-500 px-16 py-2">Energy Power Fitness </h2>
    <h1 class="mt-2 lg:mr-10 font-semibold text-white">
      {{ $route.params.day }}
    </h1>
  </div>
  <RouterView />
</template>

<script>
export default {
  name: "App",
};
</script>
