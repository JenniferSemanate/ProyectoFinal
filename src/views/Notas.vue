<template>
  <div
    class="grid grid-cols-8 gap-5 lg:mx-28 lg:bg-[url('/images/fondo-metalizado.jpeg')]"
  >
    <div class="col-span-8 flex justify-between mx-5">
      <RouterLink :to="`/`"
        ><i class="fa-solid fa-angle-left text-2xl text-black m-10"></i
      ></RouterLink>
      <p class="font-bold text-2xl text-gray-700 m-10">
        {{ $route.params.day }}
      </p>
      <RouterLink :to="`/notas/${$route.params.day}/menus`"
        ><i class="fa-solid fa-angle-right text-2xl text-black m-10"></i
      ></RouterLink>
    </div>
    <div class="col-span-4 bg-white/60 shadow-md p-8 rounded-xl mx-16">
      <h1 class="mb-5 font-semibold">Registra tu actividad!</h1>
      <img class="m-auto mb-2 rounded-3xl" src="/images/metrics.jpeg" alt="" />
      <!-- añadir peso, altura y calorias quemadas -->
      <form class="grid grid-cols-2 border p-5 h-60" @submit="storeDayInfo">
        <div class="col-span-2 mb-2 uppercase">medidas y actividad física!</div>
        <div class="col-span-1 m-auto">
          <div class="flex mb-5">
            <label><i class="fa-solid fa-cake-candles mr-4"></i></label>
            <input
              placeholder=" Edad: 30"
              class="border rounded-md"
              type="text"
              v-model="edad"
            />
          </div>
          <div class="flex">
            <label><i class="fa-solid fa-weight-scale mr-4"></i></label>
            <input
              placeholder=" Peso: 65"
              class="border rounded-md"
              type="text"
              v-model="peso"
            />
          </div>
        </div>
        <div class="col-span-1 m-auto">
          <div class="flex mb-5">
            <label><i class="fa-solid fa-ruler-horizontal mr-2"></i></label>
            <input
              placeholder=" Altura: 1.70"
              class="border rounded-md"
              type="text"
              v-model="altura"
            />
          </div>
          <div class="flex">
            <label><i class="fa-solid fa-fire-flame-curved mr-4"></i></label>
            <input
              placeholder=" Actividad: 300"
              class="border rounded-md"
              type="text"
              v-model="quemadas"
            />
          </div>
        </div>
        <div class="col-span-2 m-auto uppercase">
          <button
            class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-28 rounded-full mt-2"
          >
            Registrar
          </button>
        </div>
      </form>
    </div>
    <!-- Añadir menú -->
    <div class="col-span-4 shadow-md p-8 bg-white/60 rounded-xl mx-16">
      <h1 class="mb-5 font-semibold">Elige tu menú!</h1>
      <img class="m-auto mb-2 rounded-3xl" src="/images/food.jpeg" alt="" />
      <!-- añadir peso, altura y calorias quemadas -->
      <div class="grid border p-5 h-60">
        <p class="pb-3">RECETAS FITNESS!</p>
        <p>
          Dale un soplo de aire fresco a tu alimentación! Nuestras recetas son
          fáciles de preparar, saludables y perfectas para la cocina fitness.
          Déjate inspirar y descubre fantásticos clásicos culinarios
          reinventados!
        </p>
        <div class="flex justify-center">
          <RouterLink
            :to="`/notas/${$route.params.day}/menus`"
            class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-28 rounded-full mt-2"
            >Registrar</RouterLink
          >
        </div>
      </div>
    </div>
    <!-- notas diarias  -->
    <div v-if="notas" class="col-span-8 bg-white/70 shadow-md rounded p-8 m-16">
      <h1 class="mb-5 font-semibold">Notas diarias!</h1>
      <div>
        <p>IMB:{{ calculoImb }}</p>
        <p>Total Calorias Diarias: {{ totalCaloriasDiarias }}</p>
      </div>
      <div class="grid border p-5 justify-center">
        <div class="border-b-2">
          <p>Edad:{{ notas.edad }}</p>
          <p>Peso:{{ notas.peso }}</p>
          <p>Altura:{{ notas.altura }}</p>
          <p>Calorias Quemadas:{{ notas.quemadas }}</p>
          <p>Calorias Consumidas:{{ notas.consumidas }}</p>
        </div>
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
      edad: "",
      peso: "",
      altura: "",
      imb: "",
      consumidas: "",
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
    calculoImb() {
      const imb = this.peso * 10 + this.altura * 6.25 - this.edad * 5 - 161;
      return imb;
    },
    totalCaloriasDiarias() {
      const kcal = this.consumidas - this.quemadas; //traer las quemadas
      return kcal;
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
        edad: this.edad,
      });

      this.getDayInfo();
    },
    async getDayInfo() {
      const [day, month, year] = this.$route.params.day.split("-");

      this.notas = await getData(`notas/years/${year}/${month}/${day}`);
      this.peso = this.notas.peso;
      this.altura = this.notas.altura;
      this.quemadas = this.notas.quemadas;
      this.edad = this.notas.edad;
      this.consumidas = this.notas.consumidas;
    },
  },
  mounted() {
    this.getDayInfo();
  },
};
</script>
