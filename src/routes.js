import Calendar from "./views/Calendar.vue";
import NotFound from "./views/NotFound.vue";
import Notas from "./views/Notas.vue";

export const routes = [
  { path: "/", name: "calendar", component: Calendar },
  { path: "/notas", name: "notas", component: Notas },
  { path: "/:path(.*)", component: NotFound },
];
