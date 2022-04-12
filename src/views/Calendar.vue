<template>
  <!-- navbar del calendario -->
  <div
    class="lg:bg-white lg:gap-16 lg:p-10 lg:mx-28 lg:bg-[url('/images/fondo-metalizado.jpeg')]"
  >
    <div
      class="flex justify-center gap-5 p-2 bg-gray-700 text-white rounded-t-xl mt-5"
    >
      <button @click="lastMonth">
        <i class="fa-solid fa-angle-left"></i>
      </button>
      <p>{{ monthNames[month] }}</p>
      <p>{{ year }}</p>
      <button @click="nextMonth">
        <i class="fa-solid fa-angle-right"></i>
      </button>
    </div>
    <!-- calendario week -->
    <div class="grid grid-cols-7 text-center font-bold bg-white">
      <div class="p-2">Mon</div>
      <div class="p-2">Tue</div>
      <div class="p-2">Wed</div>
      <div class="p-2">Thu</div>
      <div class="p-2">Fri</div>
      <div class="p-2">Sat</div>
      <div class="p-2">Sun</div>
    </div>
    <div class="grid grid-cols-7 bg-white/95 shadow-md rounded-b-xl">
      <!-- Dias vacios -->
      <div v-for="n in diasVacios" :key="n" class="bg-gray-100"></div>
      <!-- calendario days -->
      <div
        v-for="day in days"
        :key="day"
        class="p-10 border"
        :class="{ 'bg-green-100': notas[day.getDate()] }"
      >
        <div
          :class="{ 'bg-gray-500 text-white': isItToday(day) }"
          class="rounded-full text-center"
        >
          <RouterLink
            :to="`/notas/${day.getDate()}-${
              day.getMonth() + 1
            }-${day.getFullYear()}`"
            >{{ day.getDate() }}</RouterLink
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getData } from "../firebase.js";

export default {
  name: "calendar",
  data() {
    return {
      monthNames: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
      year: 2022,
      month: new Date().getMonth(),
      notas: { notas: "", quemadas: "", peso: "", altura: "" },
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
    diasVacios() {
      if (this.days[0].getDay() === 0) return 6;
      return this.days[0].getDay() - 1;
    },
  },
  methods: {
    lastMonth() {
      //si el mes es distinto de 0 significa que no estamos en enero
      if (this.month !== 0) {
        this.month--;
      } else {
        this.month = 11;
        this.year--;
      }
    },
    nextMonth() {
      //dibuja el mes anterior
      if (this.month !== 11) {
        this.month++;
      } else {
        this.month = 0;
        this.year++;
      }
    },
    isItToday(someDate) {
      const today = new Date();
      return (
        someDate.getDate() == today.getDate() &&
        someDate.getMonth() == today.getMonth() &&
        someDate.getFullYear() == today.getFullYear()
      );
    },
    async getMonthInfo() {
      this.notas = await getData(`/notas/years/${this.year}/${this.month + 1}`);
    },
  },
  mounted() {
    this.getMonthInfo();
  },
};
</script>
