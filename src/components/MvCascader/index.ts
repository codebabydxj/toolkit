import { withInstall } from "../../utils/with-install";

import _MvCascader from './MvCascader.vue'
export const MvCascader = withInstall(_MvCascader)
export default MvCascader
export * from './mvCascader'
export * from './types'
export type MvCascaderInstance = InstanceType<typeof _MvCascader>

declare module 'vue' {
    export interface GlobalComponents {
        MvCascader: typeof _MvCascader;
    }
}