import { apiConfig } from "..";
import { systemStore } from "../store";

/**
 * @description: 跨平台免密登录
 * @param {string} src 目标平台域名
 * @return {*}
 */

export default function (src: string): void {
  const { origin, pathname: path } = new URL(src);
  if (origin === location.origin || !src.includes(apiConfig.safeOrigin)) {
    window.open(src);
  } else {
    let popup = window.open(
      origin + `/authorized?loginByToken=${location.href}`
    );
    window.addEventListener(
      "message",
      function (event) {
        if (event.origin !== origin) return;
        if (event.data?.openState) {
          popup?.postMessage(
            {
              token: systemStore.token?.token,
              path: src || "",
            },
            origin
          );
        }
      },
      false
    );
  }
}
