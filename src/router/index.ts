import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/items",
    name: "Items",
    component: () => import("../views/Items.vue")
  },
  {
    path: "/tiendas",
    name: "Tiendas",
    component: () => import("../views/Tiendas.vue")
  },
  {
    path: "/components",
    name: "Components",
    component: () => import("../views/Components.vue")
  },
  {
    path: "/dom",
    name : "Dom",
    component: () => import("../views/Dom.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
