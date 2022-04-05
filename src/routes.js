import Calendar from "./views/Calendar.vue";
import NotFound from "./views/NotFound.vue";

export const routes = [
  { path: "/", name: "calendar", component: Calendar },
  { path: "/:path(.*)", component: NotFound },
];
