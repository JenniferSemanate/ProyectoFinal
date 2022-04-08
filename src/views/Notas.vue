<template>
  View Notas
  <div >
    <h1>{{ $route.params.day }}</h1>
    <div class="bg-white grid grid-cols-6 gap-5">
      <div class="col-span-3 bg-slate-400">Notas</div>

      <div class="col-span-3 bg-slate-600">
        Formulario
        <form
          class="flex justify-between bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <div class="col-span-1 bg-blue-300 p-5">
            <div class="flex mb-4">
              <p><i class="fa-solid fa-weight-scale"></i>Peso:</p>
              <input placeholder=" Ej: 55kg" class="border" type="text" />
            </div>
            <div class="flex mb-4">
              <p><i class="fa-solid fa-ruler-horizontal"></i> Altura:</p>
              <input placeholder=" Ej: 1.70cm" class="border" type="text" />
            </div>
            <div class="flex mb-4">
              <p><i class="fa-solid fa-fire-flame-curved"></i> Actividad:</p>
              <input placeholder=" Ej: 400Kcal" class="border" type="text" />
            </div>
            <button class="border rounded-md py-2 px-4">Añadir datos</button>
          </div>

          <div class="col-span-1 bg-rose-400 p-5">
            <h1>Elige tu menú</h1>
            <p class="pb-2">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus
              explicabo nemo ab alias ipsam libero nobis soluta dicta excepturi
              cum.
            </p>
            <button class="border rounded-md py-2 px-4">
              <i class="fa-solid fa-carrot"></i> Añadir Alimentacion
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
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


   }
};
</script>
