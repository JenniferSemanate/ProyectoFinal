<template>
  <div class="lg:mx-28">
    <div>
      <div v-if="loading">Loading....</div>
      <div v-if="data">
        <div class="grid grid-cols-8 bg-blue-50 text-gray-600">
        <div v-for="menu in data" :key="menu" class="col-span-2 m-5" >
            <div class="bg-white shadow-md p-8 rounded-xl text-center hover:shadow-2xl py-9">
              <h1 class="mb-5 font-bold text-lg">{{ data.hits[0].recipe.label }}</h1>
              <img class="m-auto mb-5" src="/data.hits[0].recipe.healtLabel.image/" alt="">
              <h1 class="mb-5 font-semibold">Calorias: {{ data.hits[0].recipe.calories }}</h1>
              <button class="border rounded-md py-2 px-4 bg-blue-50 font-semibold hover:text-white">Seleccionar</button>
            </div>
         </div>
        </div>
      </div>
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
      fetch(`https://api.edamam.com/api/recipes/v2?type=public&q=&app_id=f0013073&app_key=4bdc9bf20b19635d616be8f8e39261a5&diet=balanced&cuisineType=Mediterranean&imageSize=SMALL`)
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
