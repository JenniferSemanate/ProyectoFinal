<template>
  <div>
    <h1>Calendar</h1>
    <!-- <h2>{{ lastMonth(3) }}</h2> -->
    <!-- <h2>{{ setNewDate() }}</h2>
    <h3>{{ getTotalDays() }}</h3>
    <h4>{{ writeMonth(month) }}</h4> -->
    <div class="container mx-auto border">
      <!-- navbar -->
      <div class="flex justify-between gap-5 p-2">
        <button @click="lastMonth">
          <i class="fa-solid fa-angle-left"></i>
        </button>
        <!-- Crear los eventos -->

        <p>{{ monthNames[month] }}</p>
        <!--dato computado-->
        <p>{{ year }}</p>
        <!--dato computado-->
        <button @click="nextMonth">
          <i class="fa-solid fa-angle-right"></i>
        </button>
        <!-- Crear los eventos -->
      </div>
      <!-- calendario week -->
      <div class="grid grid-cols-7 text-center">
        <li class="bg-gray-200 font-bold text-xs p-2">Lun</li>
        <li class="bg-gray-200 font-bold text-xs p-2">Mar</li>
        <li class="bg-gray-200 font-bold text-xs p-2">Mie</li>
        <li class="bg-gray-200 font-bold text-xs p-2">Jue</li>
        <li class="bg-gray-200 font-bold text-xs p-2">Vie</li>
        <li class="bg-gray-200 font-bold text-xs p-2">Sáb</li>
        <li class="bg-gray-200 font-bold text-xs p-2">Dom</li>
      </div>
      <div class="grid grid-cols-7">
        <!-- DIAS VACIOS -->
        <div v-for="n in diasVacios" :key="n" class="bg-gray-100"></div>
        <!-- calendario days -->
        <div v-for="day in days" :key="day" class="p-6">
          <div
            :class="{ 'bg-red-500 text-white': isItToday(day) }"
            class="rounded-full text-center"
          >
            {{ day.getDate() }}
          </div>
          <!-- <span class="text-gray-400">{{ day.getDay() }}</span> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
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
    };
  },
  computed: {
    days() {
      var date = new Date(this.year, this.month, 1);
      var days = [];
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
  },
};
</script>
