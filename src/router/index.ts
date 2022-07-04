import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
// import { removeAll } from '../../lib/main'
import { removeAll } from '../../dist/cancel_axios_request.es'

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "index",
    component: () => import("../views/Home.vue"),
  },
  {
    path: "/test",
    name: "test",
    component: () => import("../views/test.vue"),
  },
]
const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to: any, from: any, next: any) => {
  removeAll()
  next();
});

export default router;
