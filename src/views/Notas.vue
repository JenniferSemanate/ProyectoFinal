<template>
  View Notas
    <div class="grid grid-cols-7 text-center">
      <h1>{{ today }}</h1>
      <div class="bg-white">Notas</div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      today: new Date().toISOString().substr(0, 10),
    };
  },
}
</script>