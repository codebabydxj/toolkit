import { withInstall } from "@/utils/with-install";

import _UniverPopLayer from "./UniverPopLayer.vue";
export const UniverPopLayer = withInstall(_UniverPopLayer);
export default UniverPopLayer;
// export type { UniversalHomePageProps } from "./universalHomePage";
export type { UniverPopLayerType } from "./types";
export type UniverPopLayerInstance = InstanceType<typeof _UniverPopLayer>;

declare module "vue" {
  export interface GlobalComponents {
    UniverPopLayer: typeof _UniverPopLayer;
  }
}
