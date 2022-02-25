import Vue from "vue";
import VueRouter from "vue-router";
import SearchCityName from "../views/SearchCityName.vue";
import CityWeather from "../views/CityWeather.vue";

Vue.use(VueRouter);

const routes = [

  {
    path: '/',
    name: "SearchCityName",
    component: SearchCityName,
  },
  {
    path :'/weather',
    name: "CityWeather",
    component: CityWeather,
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
