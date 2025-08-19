interface ProjectInfoConfig {
  projectId: number;
  projectName: string;
  projectCode: string;
  [x: string]: any;
}

interface ApiResponseCodeRange {
  min: number;
  max: number;
  arr: (string | number)[];
}

export interface ApiConfigInstance {
  baseURL: string;
  timeout: number;
  debug: boolean;
  testUrl: string;
  defaultErrorMsg: string;
  project: ProjectInfoConfig;
  customError: boolean;
  microLoginPaddingTime: number;
  fileTypes: Record<string, any>;
  loginOutMessage: string;
  tokenName: string;
  safeOrigin: string;
  dictUrl: string;
  dictArrUrl: string;
  responseCodeRange: ApiResponseCodeRange;
  componentUrl: string;
  currentProjectId?: number | string | any;
  requestHeader: Record<string, any>;
  signal: any;
}

// 后端数据返回类型
export interface ResponseData {
  code: number;
  data: any;
  msg?: any;
  [x: string]: any;
}

export interface FileViewOptions {
  method?: "post" | "get";
  customError?: boolean;
  fileType?: "pdf";
}

export enum LoadingType {
  loading = 1,
  loaded = 2,
}
