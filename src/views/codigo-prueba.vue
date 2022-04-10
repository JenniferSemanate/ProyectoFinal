<template>
  <div class="lg:mx-28">
    <div
      class="grid mg:grid-cols-3 lg:grid-cols-8 lg:bg-blue-50 lg:gap-16 lg:p-10"
    >
      <div>Menus</div>

      <div v-if="loading">Loading....</div>

      <div v-if="data">
        <h1>Desayunos</h1>
        <div v-for="menu in data.results" :key="menu.url">
          {{ data.hits[0]._source.title }}
        </div>
      </div>

      <!-- <div class="col-span-2 bg-white shadow-md p-8 rounded-xl text-center hover:shadow-2xl py-9">
                <div class="grid justify-center">
                    <img src="/images/comida-sana.jpg" alt="">
                </div>
                <div>
                    <h1 class="font-semibold mb-3">Calculated Weather</h1>
                    <p class="">Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis, quam!</p>
                 </div>
            </div>

             <div class="col-span-2 bg-white shadow-md p-8 rounded-xl text-center hover:shadow-2xl py-9">
                <h1 class="mb-5 font-semibold">Registra tu actividad!</h1>
                <img class="m-auto mb-2" src="/images/actividad-fisica.jpg" alt="">
            </div>
             <div class="col-span-2 bg-white shadow-md p-8 rounded-xl text-center hover:shadow-2xl py-9">
                <h1 class="mb-5 font-semibold">Registra tu actividad!</h1>
                <img class="m-auto mb-2" src="/images/actividad-fisica.jpg" alt="">
            </div>
             -->
    </div>
  </div>
</template>

<script>
//import axios from "axios";
export default {
  name: "menus",
  data() {
    return {
      data: null,
      loading: false,
      error: true,
      appId: "f0013073",
      appKey: "4bdc9bf20b19635d616be8f8e39261a5",
    };
  },
  methods: {
    //this.loading = true,
    getMenus() {
      fetch(`https://api.edamam.com/search?
            &app_id=${this.appId}&app_key=${this.appKey}
            &q=pizza`)
        .then((response) => response.json())
        .then((data) => {
          this.data = data;
        });
    },
    getId(url) {
      return url.split("/").pop();
    },
  },
  mounted() {
    this.getMenus();
  },
};
</script>
