<template>
  <div class="text-center" v-if="loading">
    <svg role="status" class="inline mt-16 w-44 h-36 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101"        fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
    </svg>
  </div>
  <div v-if="data" class="grid md:grid-cols-4 lg:grid-cols-8 bg-blue-50 text-gray-600 lg:mx-28 bg-[url('/images/fondo-app.jpg')] bg-cover bg-no-repeat">
    <div class="md:col-span-1 lg:col-span-8 flex justify-between m-10">
      <RouterLink :to="`/notas/${$route.params.day}`" class=""><i class="fa-solid fa-angle-left text-2xl text-white"></i></RouterLink>
    </div>
    <div v-for="i in data.hits" :key="i" class="col-span-2 m-5">
      <div class="bg-white shadow-md p-8 rounded-xl text-center hover:shadow-2xl py-9">
        <p class="font-bold text-lg truncate">{{ i.recipe.label }}</p>
        <img :src="i.recipe.image" class="w-full h-64 mb-5 max-h-66" />
        <p>Calorias: {{ Math.round(i.recipe.calories) }}</p>
        <!--Buscar en el array los servings para dividir las calorias por SERVINGS-->
        <p>{{ i.recipe.mealType[0] }}</p>
        <a class="text-blue-600 font-semibold" :href="i.recipe.shareAs">Ver receta</a>
        <div class="flex justify-center">
          <button
            @click="storeDayInfo(Math.round(i.recipe.calories))"
            class="mt-5 bg-blue-400 hover:bg-blue-700 text-white font-bold py-2 px-16 rounded-full">
            Añadir
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
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
    async getMenus() {
      this.loading = true;
      try {
          const response = await fetch(`https://api.edamam.com/api/recipes/v2?type=public&q=&app_id=f0013073&app_key=4bdc9bf20b19635d616be8f8e39261a5&diet=balanced&cuisineType=Mediterranean&imageSize=SMALL`);
          if (!response.ok) {
              throw Error(response.statusText);
          }
          this.data = await response.json();
      }
      catch (error) {
          this.error = error;
      }
      finally {
          this.loading = false;
      }
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
