import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/LoginView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/my-assignments",
      name: "home",
      component: HomeView,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/",
      name: "Login",
      component: LoginView,
      meta: {
        requiresAuth: false
      }
    }
  ]
});
/**
 * Check Router Access Permission
 */
router.beforeEach(async (to, from, next) => {
  // get required authentication or not state
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);

  if (requiresAuth) {
    try {
      next();
      //need to implement
    } catch (e) {
      //
    }
  } else {
    next();
  }
});
export default router;
