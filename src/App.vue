<template>
  <h1>Proyecto Final</h1>
  <RouterView />
</template>

<script>
import Calendar from "./views/Calendar.vue"
export default {
  name: "App",
  views: {//Revisar si esto esta bien..............
    Calendar
  },
};
</script>
