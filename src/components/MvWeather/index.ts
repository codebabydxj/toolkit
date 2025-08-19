import { withInstall } from "@/utils/with-install";

import _MvWeather from "./MvWeather.vue";
export const MvWeather = withInstall(_MvWeather);
export default MvWeather;
// export type { UniverTablePageEmits } from "./univerTablePage";
// export type {
//   TableColumnFixed,
//   TableColumnItem,
//   UniversalSearchQueryItem,
//   UniversalSearchParams,
//   TableSizeType,
//   SizesInterface,
// } from "./types";
export type MvWeatherInstance = InstanceType<typeof _MvWeather>;

declare module "vue" {
  export interface GlobalComponents {
    MvWeather: typeof _MvWeather;
  }
}
