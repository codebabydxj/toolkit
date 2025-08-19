import { createApp } from "vue";
import ElementPlus, { ElLoading } from "element-plus";
import * as ElementIcon from "@element-plus/icons-vue";
import "element-plus/dist/index.css";
import "element-plus/theme-chalk/dark/css-vars.css";
import MicroView, {
  addModuleCache,
  apiConfig,
  getComponentByName,
  useMicroRouter,
  loadComponent,
} from "../src/index";

import "../dist/style.css";
import zhCN from "element-plus/es/locale/lang/zh-cn";
import App from "./App.vue";
import router from "./router";
// import Vue3Lottie from 'vue3-lottie'
// import 'vue3-lottie/dist/style.css'
import { createPinia } from "pinia";

const app = createApp(App);
apiConfig.responseCodeRange.arr = [-1, 401];
app.use(ElementPlus, {
  locale: zhCN,
});

Object.keys(ElementIcon).forEach((key) => {
  app.component(key, (ElementIcon as any)[key]);
});

apiConfig.debug = true;
// apiConfig.project.projectCode = "shebao";
// apiConfig.project.projectId = 30;
// apiConfig.project.projectName = "山西百得科技开发有限公司";
// console.log(apiConfig.project);


apiConfig.testUrl = (import.meta as any).env.VITE_LOGIN;
apiConfig.project.projectName = "百得数智云台";
apiConfig.project.projectCode = "bettemLucky";
apiConfig.project.projectId = 0;

apiConfig.componentUrl = "/onLineComponents/bettem32"; // http://127.0.0.1:5500

app.use(MicroView, {
  permissions: [{ perms: "aaa" }, { perms: "bbb" }],
  roles: [
    {
      id: 36,
      roleCode: "shiz",
      roleName: "市长",
    },
  ],
});
const pinia = createPinia();
useMicroRouter({
  pinia,
  router,
  isQiankun: false,
  props: {},
});
app.use(router);

// const loadingServer = ElLoading.service({
//   text: "组件装载中...",
// });
// loadComponent(app).then(() => {
//   loadingServer.close();
//   app.mount("#app");
// });
app.mount("#app");
