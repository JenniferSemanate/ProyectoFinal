<template>
  <div class="lg:mx-28">
    <div>
      <div v-if="loading">Loading....</div>
      <div v-if="data">
        <h1 class="p-5  bg-blue-50 font-semibold">Opciones de Desayuno!</h1>
        <div class="grid md:grid-cols-4 lg:grid-cols-10 bg-blue-50 text-gray-600">
          <div v-for="menu in data" :key="menu" class="col-span-2 m-5" >
            <div class="bg-white shadow-md p-8 rounded-xl text-center hover:shadow-2xl py-9">
              <p class="mb-5 font-bold text-lg">{{ data.hits[2].recipe.label }}</p>
              <img :src="data.hits[2].recipe.image" class="w-full h-64 mb-5">
              <p class="mb-5">Calorias: {{ data.hits[1].recipe.calories }}</p>
              <div class="flex justify-center">
                <button class="bg-blue-400 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">Añadir al menu</button>
             </div>
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
