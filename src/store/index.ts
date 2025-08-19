import type { Router } from "vue-router";
import { useSystemStore } from "./systemStore";

interface SystemInfoInterface {
  logo?: string;
  darkLogo?: string;
  projectName?: string;
  projectId?: number | string;
  projectCode?: string;
  projectType?: number;
  loginWeixin?: number;
  loginPage?: string;
  departRel?: number;
  [x: string]: any;
}

interface TokenInfo {
  aesKey: string;
  token: string;
  townCode: string;
  villageCode: string;
  [x: string]: any;
}

interface UserInfo {
  [x: string]: any;
}

interface SystemStateInterface {
  breadMenuList?: any[];
  userMenuList?: any[];
  [x: string]: any;
}

interface SystemStoreInterface {
  systemInfo: SystemInfoInterface;
  token: TokenInfo | null;
  userInfo: UserInfo | null;
  permissions: any[];
  roles?: any[];
  router: Router | null;
  menu: any[];
  systemState: SystemStateInterface;
  [x: string]: any;
}

let systemStore: SystemStoreInterface = {
  systemInfo: {},
  token: null,
  userInfo: null,
  permissions: [],
  roles: [],
  router: null,
  menu: [],
  systemState: {}
};
const regSystemStore = (pinia: any) => {
  systemStore = useSystemStore(pinia);
};

export { systemStore, regSystemStore };
