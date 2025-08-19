import type { Router } from "vue-router";
import { apiConfig } from "../api/apiConfig";
import { regSystemStore, systemStore } from "../store";
import type { MicroRouterInterType } from "./types";
import actions from "./actions";
import microAuth from "./microAuth";

// 子应用独立运行的路由拦截
const routerPermission = (router: Router) => {
  const localToken =
    localStorage.getItem(apiConfig.tokenName) ||
    sessionStorage.getItem(apiConfig.tokenName);
  const localUserInfo = localStorage.getItem("userInfo");
  const localPermissions =
    localStorage.getItem("permissions") || JSON.stringify([]);
  const localProjectInfo =
    localStorage.getItem("projectInfo") || JSON.stringify({});
  if (localToken && localUserInfo && localPermissions && localProjectInfo) {
    systemStore.setSystemInfo(JSON.parse(localProjectInfo));
    systemStore.setUserInfo({
      token: JSON.parse(localToken),
      userInfo: JSON.parse(localUserInfo),
      permissions: JSON.parse(localPermissions),
      roles: JSON.parse(localUserInfo).roleList,
    });
  }
  router.beforeEach(async (to, from, next) => {
    if (to.meta.requireAuth && !systemStore.token?.token) {
      microAuth();
      return;
    } else {
      next();
    }
  });
};

// 运行于乾坤基座的路由拦截
const systemRouterPermission = (router: Router, baseUrl: string) => {
  router.beforeEach((to, from, next) => {
    // actions.setPageNav({
    //     title: to.meta.title,
    //     content: to.meta.content
    // })
    if (typeof window.history.state?.current === "string") {
      window.history.state.current = window.history.state.current.replace(
        new RegExp(baseUrl, "g"),
        ""
      );
    }
    next(true);
  });
  router.afterEach(() => {
    if (typeof window.history.state === "object") {
      window.history.state.current =
        baseUrl + (window.history.state.current || "");
    }
  });
};

const setUniAppToken = () => {
  let timer: number;
  return new Promise((resolve, reject) => {
    timer = setInterval(() => {
      const getLocalNoNeedToken = localStorage.getItem("noNeedToken");
      if (getLocalNoNeedToken) {
        clearInterval(timer);
        resolve(true);
      }
      const localToken = localStorage.getItem("token");
      if (localToken) systemStore.token = JSON.parse(localToken);
      const localUser = localStorage.getItem("userInfo");
      if (localUser) systemStore.userInfo = JSON.parse(localUser);
      if (localToken && localUser) {
        clearInterval(timer);
        resolve(true);
      }
    }, 10);
  });
};

const useMicroRouter = async (data: MicroRouterInterType) => {
  if (navigator.userAgent.includes("uni-app")) {
    await setUniAppToken();
  }
  const { isQiankun, router, props, pinia } = data;
  regSystemStore(pinia);
  if (isQiankun) {
    actions.setActions(props);
    systemStore.setMicroStore(props);
    return systemRouterPermission(router, props.baseUrl);
  } else {
    return routerPermission(router);
  }
};

export { useMicroRouter };
