import { createRouter, createWebHashHistory } from "vue-router";

import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Set from "../views/Set.vue";
import Study from "../views/Study.vue";

const routes = [
  { path: "/", component: Home, meta: { requireAuth: true } },
  { path: "/login", component: Login, meta: { requireAuth: false } },
  { path: "/:setId", component: Set, meta: { requireAuth: true } },
  { path: "/:setId/study", component: Study, meta: { requireAuth: true } }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

router.beforeEach((to, from) => {
  const token = localStorage.getItem("token");
  if (to.meta.requireAuth && !token) {
    return "/login";
  }
  if (to.path === "/login" && token) {
    return "/";
  }
  return true;
});

export default router;
