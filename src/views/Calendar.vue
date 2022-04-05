<template>
  <h1>Calendar</h1>
  <div class="container mx-auto border">
    <div class="bg-rose-200">
      <!-- navbar -->
      <div class="flex justify-between gap-5">
        <button @click="setToday" class="border rounded-md bg-gray-300 p-2 px-4 uppercase">Today</button> <!-- Crear los eventos -->
        <button><i @click="prev" class="fa-solid fa-angle-left"></i></button> <!-- Crear los eventos -->
        <button><i @click="next" class="fa-solid fa-angle-right"></i></button> <!-- Crear los eventos -->
        <p>{{ title }}</p> <!--dato computado-->
        <label for="options">Month:</label>
        <select class="border rounded-md bg-gray-300 p-2 px-4" name="" id="" form="">
          <option @click="type = 'day'" value="day">Day</option>
          <option @click="type = 'week'" value="week">Week</option>
          <option @click="type = 'month'" value="month">Month</option>
          <option @click="type = '4day'" value="4day">4 days</option><!--ver despues.........-->
        </select>
        <!-- calendario -->
        <div>
          
        </div>
      </div>

    </div>
  </div>
</template>

<script>
//import { db } from '@/main'
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
    // start: null,
    startTime:null,
    endTime:null,
    //end: null,
    color: '#1976D2', // default event color
    currentlyEditing: null,
    selectedEvent: {},
    selectedElement: null,
    selectedOpen: false,
    events: [],
    dialog: false,
  }),
  mounted () {
    this.getEvents()
  },
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
  methods: {
    async getEvents () {
      let snapshot = await db.collection('calEvent').get()
      let events = []
      snapshot.forEach(doc => {
        let appData = doc.data()
        console.log(appData)
        appData.id = doc.id
        events.push(appData)
      })
      this.events = events
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
    async addEvent () {
      if (this.name && this.start && this.startTime && this.endTime) {
        await db.collection("calEvent").add({
          name: this.name,
          details: this.details,
          start: this.start,
          startTime:this.startTime,
          endTime: this.endTime,
          //start: this.start,
          //end: this.end,
          color: this.color
        })
        this.getEvents()
        this.name = '',
        this.details = '',
        this.start = '',
        //this.start = '',
        this.startTime = '',
        this.endTime = '',
        //this.end = '',
        this.color = ''
      } else {
        alert('You must enter event name, start, and end time')
      }
    },
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
