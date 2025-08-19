import type { Router } from "vue-router";

export type HeaderPosition =
  | "header"
  | "leftHeader"
  | "centerHeader"
  | "rightHeader"
  | "customUserMenu";

export interface PagerData {
  type: "login" | "pageHeader" | "customHeader" | "router" | "resetPassword" | "customUserMenu" | 'loginOut';
  data?: any;
}
export interface InsertHeaderProps {
  [x: string]: any;
}
export interface RouterQuery {
  [x: string]: any;
}

export interface QiankunProps {
  pager?: any;
  name?: string;
  [x: string]: any;
}

export interface ResetPasswordInstance {
  msg?: string;
  must?: boolean;
  loginOut?: boolean;
}

export type AreaCodeType = "lang" | "short";

export interface MicroRouterInterType {
  isQiankun: boolean | undefined;
  pinia: any;
  router: Router;
  props: any;
}

export interface AreaCodeFormat {
  areaCodeLang: string;
  areaCodeShort: string;
  areaCodeMiddle: string;
}
