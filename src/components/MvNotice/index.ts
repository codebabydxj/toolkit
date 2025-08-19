import { withInstall } from "@/utils/with-install";

import _MvNotice from "./MvNotice.vue";
export const MvNotice = withInstall(_MvNotice);
export default MvNotice;
// export type { UniverTablePageEmits } from "./univerTablePage";
// export type {
//   TableColumnFixed,
//   TableColumnItem,
//   UniversalSearchQueryItem,
//   UniversalSearchParams,
//   TableSizeType,
//   SizesInterface,
// } from "./types";
export type MvNoticeInstance = InstanceType<typeof _MvNotice>;

declare module "vue" {
  export interface GlobalComponents {
    MvNotice: typeof _MvNotice;
  }
}
