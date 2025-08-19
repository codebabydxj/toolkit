
import { withInstall } from '@/utils/with-install'
import _MvProjectProgress from './MvProjectProgress.vue'
export const MvProjectProgress = withInstall(_MvProjectProgress)
export default MvProjectProgress
export * from './mvProjectProgress'
export * from './types'
export type MvProjectProgressInstance = InstanceType<typeof _MvProjectProgress>

declare module 'vue' {
    export interface GlobalComponents {
        MvProjectProgress: typeof _MvProjectProgress
    }
}