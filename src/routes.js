import Calendar from "./views/Calendar.vue";
import NotFound from "./views/NotFound.vue";
import Notas from "./views/Notas.vue";
import Menus from "./views/Menus.vue";

export const routes = [
  { path: "/", name: "calendar", component: Calendar },
  { path: "/notas/:day", name: "notas", component: Notas },
  { path: "/menus", name: "menus", component: Menus },
  { path: "/:path(.*)", component: NotFound },
];
