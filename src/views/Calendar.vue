<template>
  <h1>Calendar</h1>
   <h2>{{date}}</h2>
  <div class="container mx-auto border">
   
      <!-- navbar -->
      <div class="flex justify-between gap-5 p-2">
        <button><i  class="fa-solid fa-angle-left"></i></button> <!-- Crear los eventos -->
        <p>April</p> <!--dato computado-->
        <p>2022</p> <!--dato computado-->
        <button><i  class="fa-solid fa-angle-right"></i></button> <!-- Crear los eventos -->
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
      <div><!-- calendario days -->
          dias
      </div>
  </div>
</template>


<script>
export default {
name: "calendar",
data(){
  return{
    monthNames:['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October','November', 'December'],
  }
},
  computed:{
    date( ){
      let currentDate = new Date()
      let day = currentDate.getDay()
      let month = currentDate.getMonth ()
      let year = currentDate.getFullYear()
      return `${day}-${month}-${year}`  
    }
  }, 
}

</script>

<style>

</style>