<template>
  <div class="grid grid-cols-8 gap-5 lg:mx-28 lg:bg-[url('/images/fondo-metalizado.jpeg')]">
    <div class="col-span-8 flex justify-between mx-5">
      <RouterLink :to="`/`"><i class="fa-solid fa-angle-left text-2xl text-black m-5"></i></RouterLink>
      <RouterLink :to="`/notas/${$route.params.day}/menus`"
      ><i class="fa-solid fa-angle-right text-2xl text-black"></i></RouterLink>
    </div>
    <div class="col-span-4 bg-white/60  shadow-md p-8 rounded-xl mx-16">
      <h1 class="mb-5 font-semibold">Registra tu actividad!</h1>
      <img class="m-auto mb-2 rounded-3xl" src="/images/metrics.jpeg" alt="" />
      <!-- añadir peso, altura y calorias quemadas -->
      <div class="felx justify-center">
        <form class="grid border p-5" @submit="storeDayInfo">
        <p class="mb-2 uppercase">Registro......</p>
        <div class="flex mb-4">
          <label class="mr-2"><i class="fa-solid fa-weight-scale mr-3"></i></label>
          <input placeholder=" Peso: 65" class="border" type="text" v-model="peso"/>
          <p class="ml-2">kg</p>
        </div>
        <div class="flex mb-4">
          <label class="mr-2"
            ><i class="fa-solid fa-ruler-horizontal mr-2"></i
          ></label>
          <input
            placeholder=" Altura: 1.70"
            class="border"
            type="text"
            v-model="altura"
          />
          <p class="ml-2">cm</p>
        </div>
        <div class="flex mb-5">
          <label class="mr-2"><i class="fa-solid fa-fire-flame-curved mr-4"></i
          ></label>
          <input
            placeholder=" Actividad: 300"
            class="border"
            type="text"
            v-model="quemadas"
          />
          <p class="ml-2">kcal</p>
        </div>
        <div class="flex justify-center">
          <button class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-44 rounded-full">
            Registrar
          </button>
        </div>
      </form>
      </div>
    </div>
    <!-- Añadir menú -->
    <div class="col-span-4 shadow-md p-8 bg-white/60 rounded-xl mx-16">
      <h1 class="mb-5 font-semibold">Elige tu menú!</h1>
      <img
        class="m-auto mb-2 rounded-3xl"
        src="/images/food.jpeg"
        alt=""
      />
      <!-- añadir peso, altura y calorias quemadas -->
      <div class="grid border p-5">
        <p class="pb-8">RECETAS FITNESS!</p>
        <p class="pb-8">
          Dale un soplo de aire fresco a tu alimentación! Nuestras recetas son
          fáciles de preparar, saludables y perfectas para la cocina fitness.
          Déjate inspirar y descubre fantásticos clásicos culinarios
          reinventados!
        </p>
        <div class="flex justify-center">
          <RouterLink
          :to="`/notas/${$route.params.day}/menus`"
          class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-28 rounded-full"
          >Añadir Alimentacion</RouterLink>
        </div>
      </div>
    </div>
    <!-- notas diarias  -->
    <div class="col-span-8 bg-white/70  shadow-md rounded p-8 m-16">
      <h1 class="mb-5 font-semibold">Notas diarias!</h1>
      <div class="grid border p-5 justify-center">
        <p class="border-b-2">
          <i class="fa-solid fa-file-lines"></i>
          {{ notas }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { storeData } from "../firebase.js";
import { getData } from "../firebase.js";

export default {
  data() {
    return {
      year: 2022,
      month: new Date().getMonth(),
      notas: {},
      quemadas: "",
      peso: "",
      altura: "",
    };
  },
  computed: {
    days() {
      let date = new Date(this.year, this.month, 1);
      let days = [];
      while (date.getMonth() === this.month) {
        days.push(new Date(date));
        date.setDate(date.getDate() + 1);
      }
      return days;
    },
  },
  methods: {
    storeDayInfo(event) {
      event.preventDefault();

      const [day, month, year] = this.$route.params.day.split("-");
      storeData(`notas/years/${year}/${month}/${day}`, {
        ...this.notas,
        quemadas: this.quemadas,
        peso: this.peso,
        altura: this.altura,
      });

      this.getDayInfo();
    },
    async getDayInfo() {
      const [day, month, year] = this.$route.params.day.split("-");

      this.notas = await getData(`notas/years/${year}/${month}/${day}`);

      this.peso = this.notas.peso;
      this.altura = this.notas.altura;
      this.quemadas = this.notas.quemadas;
    },
  },
  mounted() {
    this.getDayInfo();
  },
};
</script>
