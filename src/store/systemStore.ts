import { defineStore } from "pinia";
import { apiConfig } from "../api/apiConfig";

export const useSystemStore = defineStore("systemStore", {
  state: () => {
    return {
      systemInfo: {
        logo: "",
        darkLogo: "",
        projectId: apiConfig.project.projectId,
        projectCode: apiConfig.project.projectCode,
        projectName: apiConfig.project.projectName || "Micro App",
      },
      token: null,
      userInfo: null,
      permissions: [],
      roles: [],
      router: null,
      menu: [],
      systemState: {
        breadMenuList: [],
        userMenuList: [],
      }
    };
  },
  getters: {
    getSystemName(state) {
      return state.systemInfo.projectName.replace(/<\/?.+?>/gi, "");
    },
  },
  actions: {
    setMicroStore: function (data: any) {
      this.setSystemInfo(data.systemStore);
      this.setUserInfo(data.userStore);
      this.setGlobalInfo(data.globalStore);
      this.router = data.router;
      this.menu = data.menu || [];
    },
    setSystemInfo: function (data: any) {
      this.systemInfo = data;
    },
    setUserInfo: function (data: any) {
      this.token = data.token;
      this.userInfo = data.userInfo;
      this.permissions = data.permissions;
      this.roles = data.roles;
    },
    setGlobalInfo: function (data: any) {
      this.systemState = data;
    }
  },
});
