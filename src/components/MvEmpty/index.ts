
import { withInstall } from '@/utils/with-install'
import _MvEmpty from './MvEmpty.vue'
export const MvEmpty = withInstall(_MvEmpty)
export default MvEmpty
export * from './mvEmpty'
export * from './types'
export type MvEmptyInstance = InstanceType<typeof _MvEmpty>

declare module 'vue' {
    export interface GlobalComponents {
        MvEmpty: typeof _MvEmpty
    }
}