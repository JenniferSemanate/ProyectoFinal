<template>
  <div class="lg:mx-28">
    <div>
      <div v-if="loading">Loading....</div>
      <div v-if="data">
        <!-- <h1 class="p-5 bg-blue-50 font-semibold">Opciones de Desayuno!</h1> -->
        <div
          class="grid md:grid-cols-4 lg:grid-cols-8 bg-blue-50 text-gray-600"
        >
          <div v-for="i in data.hits" :key="i" class="col-span-2 m-5">
            <div
              class="bg-white shadow-md p-8 rounded-xl text-center hover:shadow-2xl py-9"
            >
              <div class="p-2">
                <p class="font-bold text-lg truncate">
                  {{ i.recipe.label }}
                </p>
                <!--Revisar como imprimir el label para que todos tengan la misma altura-->
              </div>
              <img :src="i.recipe.image" class="w-full h-64 mb-5 max-h-66" />
              <p class="mb-5 font-bold text-lg">
                Calorias: {{ Math.round(i.recipe.calories) }}
              </p>
              <!--Buscar en el array los servings para dividir las calorias por SERVINGS-->
              <p class="mb-5 font-bold text-lg">{{ i.recipe.mealType[0] }}</p>
              <a class="text-blue-600 font-semibold" :href="i.recipe.shareAs"
                >Ver receta</a
              >
              <div class="flex justify-center">
                <button
                  @click="storeDayInfo(Math.round(i.recipe.calories))"
                  class="bg-blue-400 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                >
                  Añadir
                </button>
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
import { storeData } from "../firebase.js";
import { getData } from "../firebase.js";

export default {
  name: "menus",
  data() {
    return {
      data: null,
      loading: false,
      error: true,
      appId: "f0013073",
      appKey: "4bdc9bf20b19635d616be8f8e39261a5",
      notas: {},
      consumidas: "",
    };
  },
  methods: {
    //this.loading = true,
    getMenus() {
      fetch(
        `https://api.edamam.com/api/recipes/v2?type=public&q=&app_id=f0013073&app_key=4bdc9bf20b19635d616be8f8e39261a5&diet=balanced&cuisineType=Mediterranean&imageSize=SMALL`
      )
        .then((response) => response.json())
        .then((data) => {
          this.data = data;
        });
    },
    getId(url) {
      return url.split("/").pop();
    },

    storeDayInfo(calories) {
      const [day, month, year] = this.$route.params.day.split("-");
      storeData(`notas/years/${year}/${month}/${day}`, {
        ...this.notas,
        consumidas: calories,
      });

      this.getDayInfo();
    },
    async getDayInfo() {
      const [day, month, year] = this.$route.params.day.split("-");

      this.notas = await getData(`notas/years/${year}/${month}/${day}`);

      this.consumidas = this.notas.consumidas;
    },
  },
  mounted() {
    this.getMenus();
  },
};
</script>
