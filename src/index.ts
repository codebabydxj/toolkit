import { client } from "./api";
import components from "./components";
import useDictArray from "./hooks/useDictArray";
import useMvPages from "./hooks/useMvPages";
import useDictMap from "./hooks/useDictMap";
import useNumFormat from "./hooks/useNumFormat";
import type { InstallOptions } from "./types";
import { directives } from "./utils/permissions";
import actions from "./utils/actions";
import microAuth from "./utils/microAuth";
import openNewProject from "./utils/openNewProject";
import { getComponentByName } from "./utils/universalUtils";
import { getOnLineComponents } from "./api/apiConfig";

export const loadComponent = async (App: any) => {
  const onLineComponents = await getOnLineComponents();
  const result = await Promise.all(
    onLineComponents.map((item: string) => {
      return getComponentByName(`${item}.vue`);
    })
  );
  result.forEach((component: any) => {
    App.component(component.name, component);
  });
};

const install = async (App: any, opt: InstallOptions = {}) => {
  components.forEach((component: any) => {
    App.component(component.name, component);
  });
  if (Object.keys(opt).length > 0) {
    directives.forEach((item: any) => {
      App.directive(item.name, item.void(opt));
    });
  }
};

export default install;
export * from "./components";
export * as fv from "./form";
export * from "./utils/textUtils";
export * from "./store";
export * from "./utils/parentRouter";
export * from "./utils/listFormat";
export * from "./utils/universalUtils";
export * from "./api/apiConfig";
export { client, actions, microAuth, openNewProject };
export { useDictArray, useMvPages, useDictMap, useNumFormat };
