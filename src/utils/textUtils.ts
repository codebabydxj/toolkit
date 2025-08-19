import type { AreaCodeFormat, AreaCodeType } from "./types";

/**
 * @description: 上传文件回显带有ip，该方法可去除自带的ip以及参数，防止编辑后无法回显问题
 * @param {string} url
 * @param {string} splitText = '/file_download'
 * @return {string}
 */
export const removeOrigin = (
  url: string,
  splitText: string = "/file_download"
): string => {
  if (url.startsWith("http") || url.startsWith("//")) {
    return (splitText + url.split(splitText)[1]).split("?")[0];
  } else {
    return url;
  }
};

/**
 * @description: 地区编码code转换codeList,方便级联选择器回显
 * @param { string } code
 * @param {string} type lang | short
 * @return {<any>[]}
 */
export const areaCodeToCodeList = (
  code: string,
  type: AreaCodeType = "lang"
): number[] => {
  if (!code) return []
  const areaList: number[] = [];
  let step = 2
  for (let i = 2; i <= 12; i += step) {
    let areaCode = "";
    if (areaList.length <= 1) { // 分水岭 ----------> 行政区划镇和村是三个位数，前面都是两位数
      step = 2
    } else {
      step = 3
    }
    if (type === "lang") {
      areaCode = code.substring(0, i).padEnd(12, "0");
    }
    if (type === "short") {
      if (i > 6) {
        areaCode = code.substring(0, i + 1);
        i++;
      } else {
        areaCode = code.substring(0, i);
      }
    }
    if (!areaList.includes(parseInt(areaCode))) {
      if (areaCode === code) {
        areaList.push(parseInt(code));
        break;
      } else {
        areaList.push(parseInt(areaCode));
      }
    }
  }
  return areaList;
};

/**
 * @description: 地区编码code转换中位编码及短编码
 * @param {string | number} code
 * @return { AreaCodeFormat } {areaCodeLang: string, areaCodeShort: string, areaCodeMiddle: string}
 */
export const areaCodeFormat = (code: string | number): AreaCodeFormat => {
  if (typeof code === "number") code = code.toString();

  let resultCode = code.replace(/0+?$/, "");
  //将行政区划编码统一去掉末尾的所有0
  let newCode: AreaCodeFormat = {
    areaCodeLang: resultCode.padEnd(12, "0"),
    areaCodeShort: "",
    areaCodeMiddle: "",
  };

  //处理中间码判断
  if (resultCode.length > 0 && resultCode.length <= 6) {
    newCode.areaCodeMiddle = resultCode.padEnd(6, "0");
  }
  if (resultCode.length > 6 && resultCode.length <= 9) {
    newCode.areaCodeMiddle = resultCode.padEnd(9, "0");
  }
  if (resultCode.length > 9 && resultCode.length <= 12) {
    newCode.areaCodeMiddle = resultCode.padEnd(12, "0");
  }

  //处理精简码判断（将末尾0不是多余的 进行补0）
  if (resultCode.length > 0 && resultCode.length <= 2) {
    newCode.areaCodeShort = resultCode.padEnd(2, "0");
  }
  if (resultCode.length > 2 && resultCode.length <= 4) {
    newCode.areaCodeShort = resultCode.padEnd(4, "0");
  }
  if (resultCode.length > 4 && resultCode.length <= 6) {
    newCode.areaCodeShort = resultCode.padEnd(6, "0");
  }
  if (resultCode.length > 6 && resultCode.length <= 9) {
    newCode.areaCodeShort = resultCode.padEnd(9, "0");
  }
  if (resultCode.length > 9 && resultCode.length <= 12) {
    newCode.areaCodeShort = resultCode.padEnd(12, "0");
  }

  return newCode;
};

/**
 * @description: 后端返回字典为Object转换Array
 * @param {any} data
 * @param {string?} name 如果data为数组，则传入label的key值
 * @param {any?} value   如果data为数组，则传入value的key值
 * @return {T[]}
 */
export const dictToArr = <T>(data: any, name?: string, value?: any): T[] => {
  let arr: T[] = [];
  for (let i in data) {
    let item = <T>{
      label: name ? data[i][name] : data[i],
      value: name ? data[i][value] : i,
    };
    arr = [...arr, item];
  }
  return arr;
};

export const arrToDict = (
  data: Record<string, any>[],
  key: string,
  value: string
) => {
  const optionObj: Record<string, any> = {};
  data.forEach((item: Record<string, any>) => {
    optionObj[item[key]] = item[value];
  });
  return optionObj;
};

/**
 * 判断任意值是否为空
 * @description: 其中boolean类型false也代表有值
 * @param { any } value
 * @return { Boolean } true | false
 * @example
 * import { isEmpty } from "nuxt-toolkit"
 * console.log(isEmpty()) //true
 * console.log(isEmpty("")) //true
 * console.log(isEmpty(" ")) //true
 * console.log(isEmpty([])) //true
 * console.log(isEmpty({})) //true
 * console.log(isEmpty(false)) //false
 */
export const isEmpty = (value: any = undefined): Boolean => {
  if (value === null || value === undefined) {
    return true;
  }

  switch (typeof value) {
    case "string":
      // 使用正则表达式替换中文空格为普通空格，并去除两端空格后判断是否为空
      return value.replace(/[\u3000\s]*/g, "") === "";
    case "object":
      if (Array.isArray(value)) {
        return value.length === 0;
      } else if (Object.keys(value).length === 0) {
        return true;
      }
      break;
    case "boolean":
      return false;
    case "symbol":
      return false;
  }
  return false;
};

/**
 * 判断任意值是否不为空
 * @description: 其中boolean类型false也代表有值
 * @param { any } value
 * @return { Boolean } true | false
 * @example
 * import { isNotEmpty } from "nuxt-toolkit"
 * console.log(isNotEmpty()) //false
 * console.log(isNotEmpty("")) //false
 * console.log(isNotEmpty(" ")) //false
 * console.log(isNotEmpty([])) //false
 * console.log(isNotEmpty({})) //false
 * console.log(isNotEmpty(false)) //true
 */
export const isNotEmpty = (value: any = undefined): Boolean => {
  return !isEmpty(value);
};
