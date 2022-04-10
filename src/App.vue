<template>
  <div class="flex justify-between lg:bg-blue-300 lg:p-6 lg:mx-28">
    <img
      class="w-16 p-2 font-semibold text-xl tracking-tight"
      src="/images/logo.png"
      alt="Logotipo"
    />
    <h1 class="mt-2 lg:mr-10 font-semibold text-gray-800">
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
