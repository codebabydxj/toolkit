import { apiConfig } from "../api/apiConfig";
import { systemStore } from "../store";

export default () => {
  let popup = window.open(
    apiConfig.testUrl + "/?redirect=" + encodeURIComponent(location.href)
  );
  window.addEventListener(
    "message",
    function (event) {
      if (!apiConfig.testUrl.startsWith(event.origin)) return;
      if (event.data?.openState) {
        popup?.postMessage(
          {
            projectInfo: apiConfig.project,
          },
          apiConfig.testUrl
        );
      }
      if (event.data?.loginSuccess) {
        localStorage.setItem("token", JSON.stringify(event.data.token));
        localStorage.setItem("userInfo", JSON.stringify(event.data.userInfo));
        localStorage.setItem(
          "permissions",
          JSON.stringify(event.data.permissions)
        );
        localStorage.setItem(
          "permissions",
          JSON.stringify(event.data.permissions)
        );
        localStorage.setItem(
          "projectInfo",
          JSON.stringify(event.data.projectInfo)
        );
        systemStore.setSystemInfo(event.data.projectInfo);
        systemStore.setUserInfo({
          token: event.data.token,
          userInfo: event.data.userInfo,
          permissions: event.data.permissions,
          roles: event.data.userInfo.roleList,
        });
        setTimeout(() => {
          popup?.close();
          window.location.reload();
        }, apiConfig.microLoginPaddingTime);
      }
    },
    false
  );
};
