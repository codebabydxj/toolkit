import axios, {
  type AxiosRequestConfig,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from "axios";
import type { Method } from "axios";
import type { Action } from "element-plus";
import { ElMessage, ElMessageBox, ElNotification } from "element-plus";
import { apiConfig } from "./apiConfig";
import microAuth from "../utils/microAuth";
import type { FileViewOptions, ResponseData } from "./types";
import { downloadFile, viewPdf, downloadZip } from "../utils/downloadFile";
import { systemStore } from "../store";
import { AxiosCanceler } from "./axiosCancel";

const instance = axios.create();

export interface requestConfig extends InternalAxiosRequestConfig {
  cancel?: boolean;
}

const axiosCanceler = new AxiosCanceler();

instance.interceptors.request.use(
  (config: requestConfig) => {
    // 重复请求默认不需要取消，若要取消，在 api 服务中通过指定的第三个参数: { cancel: true } 来控制
    config.headers.cancel ??= false;
    config.headers.cancel && axiosCanceler.addPending(config);

    const token: string | null =
      localStorage.getItem(apiConfig.tokenName) ||
      sessionStorage.getItem(apiConfig.tokenName);
    let localToken: string | null = null;
    if (token !== null) {
      localToken = JSON.parse(token).token;
    }
    config.timeout = apiConfig.timeout;
    config.baseURL = apiConfig.baseURL;
    config.headers = Object.assign(
      {
        "Content-Type": "application/json; charset=UTF-8",
        // ["Content-Type"]: "application/x-www-form-urlencoded"
        cpid: apiConfig.currentProjectId || systemStore.token?.projectId || 0,
        Authorization: localToken ?? "",
        ...apiConfig.requestHeader,
      },
      config.headers
    );
    config.signal = apiConfig.signal || null;
    return config;
  },
  (error: Error) => {
    console.error(error);
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response: AxiosResponse & { config: requestConfig }) => {
    // 移除请求
    axiosCanceler.removePending(response.config);

    if (response.status >= 200 && response.status < 400) {
      if (response.request?.responseType === "blob") {
        return response;
      }
      const code = response.data.code;
      if (
        [0, 1, ...apiConfig.responseCodeRange.arr].includes(code) ||
        (code >= apiConfig.responseCodeRange.min &&
          code <= apiConfig.responseCodeRange.max)
      ) {
        return response.data;
      }
    }
    if (!apiConfig.customError) {
      ElMessage.error(response.data.msg || apiConfig.defaultErrorMsg);
      apiConfig.customError = false;
    }

    if (apiConfig.debug) {
      console.log(`%c错误接口：${response.config?.url}`, "color: red");
    }
    return Promise.reject(response.data);
  },
  (error: any) => {
    let errorMsg: string = "";
    if (error && error.response) {
      switch (error.response.status) {
        case 404:
          errorMsg = "接口不存在404";
          break;
        case 401:
          errorMsg = "令牌已失效，请重新登录";
          break;
        case 403:
          errorMsg = "服务器错误，请耐心等待修复";
          break;
        default:
          errorMsg = apiConfig.defaultErrorMsg;
      }
    }
    if (error.response?.responseType === "blob") {
      const fileRender = new FileReader();
      fileRender.onloadend = () => {
        if (
          ["application/json", "text/html"].includes(error.response.data.type)
        ) {
          error.response.data = JSON.parse(fileRender.result as any);
          errorMsg = error.response.data.msg;
        }
      };
      fileRender.readAsText(error.response.data);
    }
    // 全局拦截401并判断是否为乾坤，多次401仅显示一次
    if (error.response?.status === 401) {
      const token: string | null =
        localStorage.getItem(apiConfig.tokenName) ||
        sessionStorage.getItem(apiConfig.tokenName);
      let localToken: string | null = null;
      if (token !== null) {
        localToken = JSON.parse(token).token;
      }
      const repeatError = (window as any).__REPEAT_ERROR__;
      const isQiankun = (window as any).__BETTEM_BY_QIANKUN__;
      const isUniApp = !!(window as any).webKey;
      if (isUniApp) {
        if (apiConfig.debug) {
          ElMessage.error("登录失效");
          return;
        } else {
          localStorage.clear();
          systemStore.token = null;
          systemStore.userInfo = null;
          (window as any).__REPEAT_ERROR__ = false;
          setTimeout(() => {
            (window as any).__REPEAT_ERROR__ = true;
          }, 3000);
          (window as any).univer.loginOut();
          return;
        }
      }
      if (isQiankun) {
        if (repeatError && !location.pathname.startsWith("/oAuth")) {
          (window as any).__REPEAT_ERROR__ = false;

          setTimeout(() => {
            (window as any).__REPEAT_ERROR__ = true;
          }, 3000);

          if (localToken) {
            const href =
              "/oAuth" +
              `?redirect=${encodeURIComponent(
                location.pathname + location.search
              )}`;
            ElMessageBox.alert(apiConfig.loginOutMessage, "温馨提示", {
              callback: (action: Action) => {
                localStorage.clear();
                if (window.self === window.top) {
                  location.href = href;
                } else {
                  window.parent.location.href = href;
                }
              },
              appendTo: "body",
              customStyle: { zIndex: 999999 },
            });
          } else {
            location.href =
              "/oAuth" +
              `?redirect=${encodeURIComponent(
                location.pathname + location.search
              )}`;
          }
        }
      } else {
        if (!repeatError) {
          (window as any).__REPEAT_ERROR__ = true;

          setTimeout(() => {
            (window as any).__REPEAT_ERROR__ = false;
          }, 3000);

          if (localToken) {
            ElMessageBox.alert(apiConfig.loginOutMessage, "温馨提示", {
              callback: (action: Action) => {
                localStorage.clear();
                microAuth();
              },
              appendTo: "body",
              customStyle: { zIndex: 999999 },
            });
          } else {
            microAuth();
          }
        }
      }
    } else {
      if (!apiConfig.customError) {
        console.log("这里是错误详情", error);
        if (error.message !== "Request aborted") {
          ElNotification({
            title: "温馨提示",
            message: error.response?.data?.msg || errorMsg,
            type: "error",
          });
          apiConfig.customError = false;
        }
      }
      if (apiConfig.debug) {
        console.log(`%c错误接口：${error.response?.config.url}`, "color: red");
      }
    }

    return Promise.reject(error);
  }
);
class Api {
  private request(
    url: string,
    options: AxiosRequestConfig,
    headers = {},
    customError: boolean = false
  ) {
    apiConfig.customError = customError;
    return new Promise<ResponseData>((resolve, reject) => {
      instance
        .request({
          url: url,
          ...options,
          headers: {
            ...headers,
          },
        })
        .then((res: any) => {
          resolve(res);
        })
        .catch((err: any) => {
          reject(err);
        });
    });
  }

  /**
   * @param {string} url
   * @param {any} params
   * @param {any} headers 非必填
   * @param {customError} customError 非必填
   */
  public get(
    url: string,
    params: any = {},
    headers: any = {},
    customError: boolean = false
  ) {
    return this.request(
      url,
      {
        method: "get",
        params: params,
      },
      headers,
      customError
    );
  }

  /**
   * @param {string} url string
   * @param {any} data any
   * @param {any} headers 非必填
   * @param {customError} customError 非必填
   */
  public post(
    url: string,
    data: any = {},
    headers: any = {},
    customError: boolean = false
  ) {
    return this.request(
      url,
      {
        method: "post",
        data: data,
      },
      headers,
      customError
    );
  }

  /**
   * @param {string} url string
   * @param {Record<string, any>} data Record<string, any>
   * @param {file} file 必填
   */
  public upload(url: string, data: Record<string, any> = {}, file: File) {
    const formData = new FormData();
    for (const key in data) {
      formData.append(key, data[key]);
    }
    formData.append("file", file);
    return this.request(
      url,
      {
        method: "post",
        data: formData,
      },
      {
        "Content-Type": "multipart/form-data",
      },
      true
    );
  }

  /**
   * @param {string} url
   * @param {any} data
   * @param {Method} method 默认为post
   * @param {customError} customError 非必填
   */
  public async download(
    url: string,
    data: any = {},
    method: Method = "post",
    customError: boolean = false,
    newWindow: boolean = false,
    isZip: boolean = false
  ) {
    const reqDate: AxiosRequestConfig = {
      method: method,
      responseType: "blob",
    };
    if (method === "post") reqDate.data = data;
    if (method === "get") reqDate.params = data;
    apiConfig.customError = customError;
    try {
      const response = await this.request(url, reqDate, {}, customError);
      if (isZip) {
        downloadZip(
          response.data,
          response.headers["content-disposition"]
        )
        return;
      }
      if (response.headers["content-type"].includes("json")) {
        let data: any = response.data;
        const fileReader = new FileReader();
        fileReader.readAsText(data);
        fileReader.onload = (res: any) => {
          let jsonData: any = JSON.parse(res.target.result);
          ElMessage({
            message: jsonData?.msg || "获取失败",
            type: "warning",
          });
        };
        return;
      }
      
      downloadFile(
        response.data,
        response.data.type,
        response.headers["content-disposition"],
        newWindow
      );
      return {
        code: 1,
        data: response.data,
        message: "获取成功！",
      };
    } catch (error: any) {
      console.log(error);
      return {
        code: error.response?.data.code,
        data: null,
        message: error.response?.data?.msg || "获取失败",
      };
    }
  }

  /**
   * @param {string} url
   * @param {any} data
   * @param {FileViewOptions} options options 默认值 {method: 'post', customError: false, fileType: 'pdf'}
   */
  public async blobToUrl(
    url: string,
    data: any = {},
    options: FileViewOptions = {}
  ) {
    const method = options.method || "post";
    const customError = options.customError || false;
    const fileType = options.fileType || "pdf";
    const reqDate: AxiosRequestConfig = {
      method: method,
      responseType: "blob",
    };
    if (method === "post") reqDate.data = data;
    if (method === "get") reqDate.params = data;
    apiConfig.customError = customError || false;
    const response = await this.request(url, reqDate, {}, customError);
    return viewPdf(response.data, fileType);
  }

  /**
   * @param {string} url
   * @param {any} data
   * @param {Method} method 默认为post
   * @param {customError} customError 非必填
   */
  public async blobToBuffer(
    url: string,
    data: any = {},
    method: Method = "post",
    customError: boolean = false
  ) {
    const reqDate: AxiosRequestConfig = {
      method: method,
      responseType: "blob",
    };
    if (method === "post") reqDate.data = data;
    if (method === "get") reqDate.params = data;
    const response = await this.request(url, reqDate, {}, customError);
    console.log(response.data);
    const blob = new Blob([response.data], { type: response.data.type });
    return await blob.arrayBuffer();
  }
}

const client = new Api();

export { client };
