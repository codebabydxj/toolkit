
import { withInstall } from '@/utils/with-install'
import _MvGap from './MvGap.vue'
export const MvGap = withInstall(_MvGap)
export default MvGap
export * from './mvGap'
export type MvGapInstance = InstanceType<typeof _MvGap>

declare module 'vue' {
    export interface GlobalComponents {
        MvGap: typeof _MvGap
    }
}
