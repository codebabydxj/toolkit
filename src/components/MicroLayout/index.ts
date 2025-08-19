import { withInstall } from "../../utils/with-install";

import _MicroLayout from './MicroLayout.vue'
export const MicroLayout = withInstall(_MicroLayout)
export default MicroLayout
export * from './types'
export * from './microLayout'
export type MicroLayoutInstance = InstanceType<typeof _MicroLayout>

declare module 'vue' {
    export interface GlobalComponents {
        MicroLayout: typeof _MicroLayout;
    }
}