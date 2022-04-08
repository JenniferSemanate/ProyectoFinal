<template>
  <div>
    <h1 class="uppercase font-bold text-2xl text-center">Calendar</h1>
    <div class="container mx-auto border">
      <!-- navbar -->
      <div class="flex justify-between gap-5 p-2">
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
      <div class="grid grid-cols-7 text-center">
        <div class="bg-gray-200 font-bold text-xs p-2">Mon</div>
        <div class="bg-gray-200 font-bold text-xs p-2">Tue</div>
        <div class="bg-gray-200 font-bold text-xs p-2">Wed</div>
        <div class="bg-gray-200 font-bold text-xs p-2">Thu</div>
        <div class="bg-gray-200 font-bold text-xs p-2">Fri</div>
        <div class="bg-gray-200 font-bold text-xs p-2">Sat</div>
        <div class="bg-gray-200 font-bold text-xs p-2">Sun</div>
      
      </div>
      <div class="grid grid-cols-7">
        <!-- Dias vacios -->
        <div v-for="n in diasVacios" :key="n" class="bg-gray-100"></div>
        <!-- calendario days -->
        <div v-for="day in days" :key="day" class="p-6">
          <div :class="{ 'bg-red-500 text-white': isItToday(day) }"
            class="rounded-full text-center">
               <RouterLink :to="`/notas/${day.getDate()}-${day.getMonth()+1}-${day.getFullYear()} `">{{ day.getDate() }}</RouterLink>
          </div>
          <!-- <span class="text-gray-400">{{ day.getDay() }}</span> con esto podemos ver el di
        ía pero por numero-->
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
  },
};
</script>
