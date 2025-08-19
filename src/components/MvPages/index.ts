
import { withInstall } from '@/utils/with-install'
import _MvPages from './MvPages.vue'
export const MvPages = withInstall(_MvPages)
export default MvPages
export * from './mvPages'
export * from './types'
export type MvPagesInstance = InstanceType<typeof _MvPages>

declare module 'vue' {
    export interface GlobalComponents {
        MvPages: typeof _MvPages
    }
}
