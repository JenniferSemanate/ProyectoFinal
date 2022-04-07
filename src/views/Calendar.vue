<template>
  <h1>Calendar</h1>
  <!-- <h2>{{ lastMonth(3) }}</h2> -->
  <h2>{{ setNewDate() }}</h2>
  <h3>{{getTotalDays()}}</h3>
  <h4>{{writeMonth(month)}}</h4>
  <div class="container mx-auto border">
    <!-- navbar -->
    <div class="flex justify-between gap-5 p-2">
      <button :class="lastMonth" @click="lastMonth">
        <i class="fa-solid fa-angle-left"></i>
      </button>
      <!-- Crear los eventos -->
      <div v-for="month in monthNames" :key="month"></div>
      <p>{{ monthNames[month] }}</p>
      <!--dato computado-->
      <p>{{ year }}</p>
      <!--dato computado-->
      <button  :v-if="nextMonth" :class="nextMonth" @click="nextMonth">
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
    <div>
      <!-- calendario days -->
    <li class="border bg-white h-14 text-xs">{{writeMonth(month)}}</li>
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
      today: "",
      day: "",
      month: "",
      year: "",
      prevMonth: "",
      nextMonth: "",
    };
  },
  computed: {
    
    today() {
      let currentDate = new Date();
      this.today = currentDate.getDate;
      return `${this.today}`;
    },
    day() {
      let currentDate = new Date();
      this.day = currentDate.getDay();
      return `${this.day}`;
    },
    month() {
      let currentDate = new Date();
      this.month = currentDate.getMonth();
      return `${this.month}`;
    },
    year() {
      let currentDate = new Date();
      this.year = currentDate.getFullYear();
      return `${this.year}`;
    },
  },
  methods: {
    writeMonth(month) {
      for (let i = 0; i < this.getTotalDays(this.month); i++) {
        let everyday =+ i;
        return everyday;
      }

    },

    getTotalDays() {
      if (this.month === -1) this.month = 11;
      if (this.month === 0 || this.month === 2 || this.month === 4 || this.month === 6 || this.month === 7 || this.month === 9 || this.month === 11) {
        return 31;
      }else if (this.month === 3 || this.month === 5 || this.month === 8 || this.month === 10) {
        return 30;
      }else {
        return this.isLeap()? 29:28;
      };
    },

    isLeap() {
      return (
        (this.year % 100 !== 0 && this.year % 4 === 0) || this.year % 400 === 0
      );
    },

    startDay() {
      //devuelve que dia de la semana es el día 1.
      let start = new Date(this.year, this.month, 1);
      return start.getDay() - 1 === -1 ? 6 : start.getDay() - 1;
    },

    lastMonth() {
      //si el mes es distinto de 0 significa que no estamos en enero
      if (this.month !== 0) {
        this.month--;
      } else {
        this.month = 11;
        this.year--;
      }
      setNewDate();
    },

    nextMonth() {
      //dibuja el mes anterior
      if (this.month !== 11) {
        this.month++;
      } else {
        this.month = 0;
        this.year++;
      }
      this.setNewDate();
    },

    setNewDate() {
      //Establecer la nueva fecha
      let currentDate = new Date();
      currentDate.setFullYear(this.year, this.month, this.day);
      let selectedMonth = this.monthNames[this.month];
      let selectedYear = this.year;
      // let selectedDay = this.day;

      // for (let i = 0; i < this.monthNames.length; i++) {
      //   const selectedDate = this.monthNames[this.month];
      return `${selectedMonth} ${selectedYear}`;
      },

    
  },
};
</script>

<style></style>
