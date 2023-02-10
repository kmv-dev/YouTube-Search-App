import { createRouter, createWebHistory } from "vue-router";
import store from "../store";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      meta: { layout: "default", auth: true },
      component: () => import("../views/index.vue"),
    },
    {
      path: "/favourites",
      name: "favourites",
      meta: { layout: "default", auth: true },
      component: () => import("../views/favourites.vue"),
    },
    {
      path: "/sign-in",
      name: "sign-in",
      meta: { layout: "guest", auth: false },
      component: () => import("../views/sign-in.vue"),
    },
    {
      path: "/sign-up",
      name: "sign-up",
      meta: { layout: "guest", auth: false },
      component: () => import("../views/sign-up.vue"),
    },
    {
      path: "/ui-kit",
      name: "ui-kit",
      meta: { layout: "default", auth: true },
      component: () => import("../views/ui-kit.vue"),
    },
    {
      path: "/:pathMatch(.*)*",
      name: "404",
      meta: { layout: "guest" },
      component: () => import("../components/Page404/index.vue"),
    },
  ],
});

router.beforeEach(async (to) => {
  const auth = await store.getters.getAuthStatus;
  if (to.meta.auth && !auth) {
    return { name: "sign-in" };
  } else if (!to.meta.auth && auth) {
    return { name: "home" };
  } else {
    return;
  }
});

export default router;
