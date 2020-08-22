import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
	redirect:'login'
  },
  {
    path: "/login",
    name: "Login",
    component: () =>import("../views/Login/index.vue")
  },
  {
    path: "/news",
    name: "News",
    component: () =>import("../views/News/index.vue")
  },
  {
    path: "/user",
    name: "User",
    component: () =>import("../views/User/index.vue")
  }
];

const router = new VueRouter({
  routes
});

export default router;
