import { withInstall } from '@/utils/with-install'
import _MvCounts from './MvCounts.vue'
export const MvCounts = withInstall(_MvCounts)
export default MvCounts
export * from './mvCounts'
export type MvCountsInstance = InstanceType<typeof _MvCounts>


declare module 'vue' {
    export interface GlobalComponents {
        MvCounts: typeof _MvCounts
    }
}