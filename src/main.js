import Vue from "vue";
import App from "./App";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Landing from "./components/Landing";
import VueRouter from "vue-router";

Vue.use(VueRouter); // Important

const routes = [
  { path: "*", redirect: "/" }, // Important
  { path: "/", component: Landing },
  { path: "/login", component: Login },
  { path: "/signup", component: Signup }
];

const router = new VueRouter({
  mode: "history",
  routes
});

routes;
new Vue({
  el: "#app",
  router,
  render: h => {
    return h(App);
  }
});
