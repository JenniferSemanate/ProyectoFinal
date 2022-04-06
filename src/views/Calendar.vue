<template>
  <h1>Calendar</h1>
  <div class="container mx-auto border">
    <div class="bg-rose-200">
      <!-- navbar -->
      <div class="flex justify-between gap-5 p-2">
        <!-- <button @click="addEvent" class="border rounded-md bg-green-400 p-2 px-4 uppercase">Agregar</button> Crear los eventos -->
        <button @click="setToday" class="border rounded-md bg-gray-300 p-2 px-4 uppercase">Today</button> <!-- Crear los eventos -->
        <button><i @click="prev" class="fa-solid fa-angle-left"></i></button> <!-- Crear los eventos -->
        <p>{{ title }} Mes actual</p> <!--dato computado-->
        <button><i @click="next" class="fa-solid fa-angle-right"></i></button> <!-- Crear los eventos -->
        <select class="border rounded-md bg-gray-300 p-2 px-4" name="" id="" form="">
          <option @click="type = 'day'" value="day">Day</option>
          <option @click="type = 'week'" value="week">Week</option>
          <option selected @click="type = 'month'" value="month">Month</option>
          <option @click="type = '4day'" value="4day">4 days</option><!--ver despues.........-->
        </select>
      </div>
      <!-- calendario -->
      <ul class="grid grid-cols-7 text-center">
     <!-- dias de la semana -->
        <li class="bg-gray-200 font-bold text-xs p-2">Lun</li>
        <li class="bg-gray-200 font-bold text-xs p-2">Mar</li>
        <li class="bg-gray-200 font-bold text-xs p-2">Mie</li>
        <li class="bg-gray-200 font-bold text-xs p-2">Jue</li>
        <li class="bg-gray-200 font-bold text-xs p-2">Vie</li>
        <li class="bg-gray-200 font-bold text-xs p-2">Sáb</li>
        <li class="bg-gray-200 font-bold text-xs p-2">Dom</li>
        <!-- Dias por fecha -->
        <li class="border bg-white h-14 text-xs">1</li>
        <li class="border bg-white h-14 text-xs">2</li>
        <li class="border bg-white h-14 text-xs">4</li>
        <li class="border bg-white h-14 text-xs">6</li>
        <li class="border bg-white h-14 text-xs">7</li>
        <li class="border bg-white h-14 text-xs">5</li>
        <li class="border bg-white h-14 text-xs">5</li>
        <li class="border bg-white h-14 text-xs">8</li>
        <li class="border bg-white h-14 text-xs">9</li>
        <li class="border bg-white h-14 text-xs">10</li>
        <li class="border bg-white h-14 text-xs">11</li>
        <li class="border bg-white h-14 text-xs">12</li>
        <li class="border bg-white h-14 text-xs">13</li>
        <li class="border bg-white h-14 text-xs">14</li>
        <li class="border bg-white h-14 text-xs">15</li>
        <li class="border bg-white h-14 text-xs">16</li>
        <li class="border bg-white h-14 text-xs">17</li>
        <li class="border bg-white h-14 text-xs">18</li>
        <li class="border bg-white h-14 text-xs">19</li>
        <li class="border bg-white h-14 text-xs">20</li>
        <li class="border bg-white h-14 text-xs">21</li>
        <li class="border bg-white h-14 text-xs">22</li>
        <li class="border bg-white h-14 text-xs">23</li>
        <li class="border bg-white h-14 text-xs">24</li>
        <li class="border bg-white h-14 text-xs">25</li>
        <li class="border bg-white h-14 text-xs">26</li>
        <li class="border bg-white h-14 text-xs">27</li>
        <li class="border bg-white h-14 text-xs">28</li>
        <li class="border bg-white h-14 text-xs">29</li>
        <li class="border bg-white h-14 text-xs">30</li>
        <li class="border bg-white h-14 text-xs">31</li>
      </ul>
    </div>
  </div>
</template>

<script>
//import { db } from '../main' la importo de main que es donde exporte firebase.Esta base de datos todavia no la he creado.con firebase
export default {
  data: () => ({
    today: new Date().toISOString().substr(0, 10),
    focus: new Date().toISOString().substr(0, 10),
    type: 'month',
    typeToLabel: {
      month: 'Month',
      week: 'Week',
      day: 'Day',
      '4day': '4 Days',
    },
    name: null,
    details: null,
    start: null,
    end: null,
    startTime:null,
    endTime:null,

    color: '#1976D2', // default event color
    currentlyEditing: null,
    selectedEvent: {},
    selectedElement: null,
    selectedOpen: false,
    events: [], // { name, details, start, end, color }
    dialog: false,
  }),

  computed: {
    title () {
      const { start, end } = this
      if (!start || !end) {
        return ''
      }
      const startMonth = this.monthFormatter(start)
      const endMonth = this.monthFormatter(end)
      const suffixMonth = startMonth === endMonth ? '' : endMonth
      const startYear = start.year
      const endYear = end.year
      const suffixYear = startYear === endYear ? '' : endYear
      const startDay = start.day + this.nth(start.day)
      const endDay = end.day + this.nth(end.day)
      switch (this.type) {
        case 'month':
        return `${startMonth} ${startYear}`
        case 'week':
        case '4day':
        return `${startMonth} ${startDay} ${startYear} - ${suffixMonth} ${endDay} ${suffixYear}`
        case 'day':
        return `${startMonth} ${startDay} ${startYear}`
      }
      return ''
    },
    monthFormatter () {
      return this.$refs.calendar.getFormatter({
        timeZone: 'UTC', month: 'long',
      })
    }
  },
  created() {
    this.getEvents()//cada vez que se monte nuestro componente va a llamar a getEvent()
  },
  mounted () {
    this.$refs.calendar.checkChange();
  },
  methods: {
    async getEvents () {
      const snapshot = await db.collection('calEvent').get()//con el GET Nos traemos todos los datos que estan dentro de la coleccion calEvent esta coleccion la tengo que crear en firebase 
      const events = [] //Este es el array de enventos que nos sirve para empujar todos los eventos que vengan de snapshot.
      snapshot.forEach(doc => { //cada elemento que esta en snapshot sera un doc  
        let appData = doc.data()//aqui tenemos nuestra información.
        console.log(appData)
        appData.id = doc.id//con esto tenemos el id de cada elemento de snapshot
        events.push(appData)//con push() empujamos todos los datos de appData en el array events
      })
      this.events = events//con esto le decimos que nuestro array events sea igual a events
    },
    viewDay ({ date }) {
      this.focus = date
      this.type = 'day'
    },
    getEventColor (event) {
      return event.color
    },
    setToday () {
      this.focus = this.today
    },
    prev () {
      this.$refs.calendar.prev()
    },
    next () {
      this.$refs.calendar.next()
    },

    // async addEvent () {
    //   if (this.name && this.start && this.startTime && this.endTime) {
    //     await db.collection("calEvent").add({
    //       name: this.name,
    //       details: this.details,
    //       start: this.start,
    //       startTime:this.startTime,
    //       endTime: this.endTime,
    //       //start: this.start,
    //       //end: this.end,
    //       color: this.color
    //     })
    //     this.getEvents()
    //     this.name = '',
    //     this.details = '',
    //     this.start = '',
    //     //this.start = '',
    //     this.startTime = '',
    //     this.endTime = '',
    //     //this.end = '',
    //     this.color = ''
    //   } else {
    //     alert('You must enter event name, start, and end time')
    //   }
    // },
    editEvent (ev) {
      this.currentlyEditing = ev.id
    },
    async updateEvent (ev) {
      await db.collection('calEvent').doc(this.currentlyEditing).update({
        details: ev.details
      })
      this.selectedOpen = false,
      this.currentlyEditing = null
    },
    async deleteEvent (ev) {
      await db.collection("calEvent").doc(ev).delete()
      this.selectedOpen = false,
      this.getEvents()
    },
    showEvent ({ nativeEvent, event }) {
      const open = () => {
        this.selectedEvent = event
        this.selectedElement = nativeEvent.target
        setTimeout(() => this.selectedOpen = true, 10)
      }
      if (this.selectedOpen) {
        this.selectedOpen = false
        setTimeout(open, 10)
      } else {
        open()
      }
      nativeEvent.stopPropagation()
    },
    updateRange ({ start, end }) {
      this.start = start
      this.end = end
    },
    nth (d) {
      return d > 3 && d < 21
      ? 'th'
      : ['th', 'st', 'nd', 'rd', 'th', 'th', 'th', 'th', 'th', 'th'][d % 10]
    }
  }
}
</script>
