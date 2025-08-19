import * as Vue from "vue";
import * as BMU from "../index";
import * as sass from "sass";
import lodash from "lodash";
import * as echarts from "echarts"
import axios from "axios";
import * as ElementPlus from "element-plus";
import * as ElementIcon from "@element-plus/icons-vue";
import * as VueRouter from "vue-router";
import * as VueUseCore from "@vueuse/core";
import * as VueUseIntegrations from "@vueuse/integrations";
import { loadModule } from "vue3-sfc-loader";
import { en } from "./base64";
/**
 * 转换成拼音（若有空格、特殊字符将被移除）
 *
 * @param {string} sourceStr 原始数据
 */
const convertToEn = (sourceStr: any, isFirst: boolean = false) => {
  if (!sourceStr) return;
  // 目标数据
  let targetStr = "";
  // 匹配中文
  const cnReg = /[\u4e00-\u9fa5]/;
  // 匹配数字和英文
  const enReg = /[a-zA-Z0-9]/;
  // 保留英文和数字
  const keep = true;

  // 遍历源数据
  for (let i = 0, len = sourceStr.length; i < len; i++) {
    const str = sourceStr.substr(i, 1);
    if (keep && enReg.test(str)) {
      targetStr += str;
    } else if (cnReg.test(str)) {
      const searchResult = searchPinYin(str, en);
      if (searchResult) {
        targetStr += firstCapital(searchResult, isFirst); // 首字母大写
      }
    }
  }
  return targetStr;
};

/**
 * 检索拼音
 *
 * @param {string} str 源字符串
 * @param {object} data 收集的拼音 Unicode 编码集合
 */
const searchPinYin = (str: string, data: any) => {
  for (const key in data) {
    if (data.hasOwnProperty(key) && data[key].indexOf(str) !== -1) {
      return key;
    }
  }
  return "";
};

/**
 * 将拼音首字母转换为大写
 *
 * @param {string} str 源字符串
 */
const firstCapital = (str: any, isFirst: boolean = false) => {
  if (str) {
    const [first] = str;
    const other = str.replace(/^\S/, "");
    if (isFirst) return `${first.toUpperCase()}`;
    return `${first.toUpperCase()}${other}`;
  }
  return str;
};

export { convertToEn };

export let moduleCache = {
  vue: Vue,
  "@nuxt/toolkit": BMU,
  lodash: lodash,
  "echarts": echarts,
  "@element-plus/icons-vue": ElementIcon,
  "element-plus": ElementPlus,
  "vue-router": VueRouter,
  "@vueuse/core": VueUseCore,
  "@vueuse/integrations": VueUseIntegrations,
};

export const addModuleCache = (data: Record<string, any>) => {
  moduleCache = Object.assign(moduleCache, data);
};

const getComponentOption = (data: string) => {
  return {
    moduleCache: moduleCache,
    async getFile() {
      return Promise.resolve(data);
    },
    async processStyles(srcRow: string, lang: string) {
      if (lang === "scss") {
        const result = await sass.compileStringAsync(srcRow);
        return result.css;
      } else {
        return srcRow;
      }
    },
    addStyle(textContent: any) {
      const style = Object.assign(document.createElement("style"), {
        textContent,
      });
      const ref = document.head.getElementsByTagName("style")[0] || null;
      document.head.insertBefore(style, ref);
    },
  };
};

export const getComponentByName = (name: string) => {
  return new Promise(async (resolve, reject) => {
    const res = await axios.get(BMU.apiConfig.componentUrl + "/" + name);
    const options: any = getComponentOption(res.data);
    loadModule(`${name}`, options)
      .then((component: any) => {
        resolve(component);
      })
      .catch((err: any) => {
        throw Error(`组件加载错误：${err}`);
      });
  });
};

export const getComponentByData = (name: string, data: string) => {
  return new Promise((resolve, reject) => {
    const options: any = getComponentOption(data);
    loadModule(`${name}`, options)
      .then((res: any) => resolve(res))
      .catch((err: any) => {
        throw Error(`组件加载错误：${err}`);
      });
  });
};
