import { createRouter, createWebHistory } from "vue-router";

const routes: any[] = [
  {
    path: "/",
    name: "Home",
    meta: {
      title: "Home",
    },
    component: () => import("../views/Home.vue"),
  },
  {
    path: "/tabs",
    name: "Tabs",
    meta: {
      title: "Tabs",
    },
    component: () => import("../views/Tabs.vue"),
  },
  {
    path: "/form",
    name: "Form",
    meta: {
      title: "Form",
    },
    component: () => import("../views/Form.vue"),
  },
  {
    path: "/empty",
    name: "Empty",
    meta: {
      title: "Empty",
    },
    component: () => import("../views/Empty.vue"),
    children: [
      {
        path: "/empty/form",
        name: "Form1",
        meta: {
          title: "Form1",
        },
        component: () => import("../views/Form.vue"),
        children: [
          {
            path: "/empty/form/tabs",
            name: "Tabs1",
            meta: {
              title: "Tabs",
            },
            component: () => import("../views/Tabs.vue"),
          },
        ],
      },
    ],
  },
  {
    path: "/table",
    name: "Table",
    meta: {
      title: "Table",
    },
    component: () => import("../views/Table.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

export { routes };
