
import { withInstall } from '@/utils/with-install'
import _MvTreeSelect from './MvTreeSelect.vue'
export const MvTreeSelect = withInstall(_MvTreeSelect)
export default MvTreeSelect
export * from './mvTreeSelect'
export type MvTreeSelectInstance = InstanceType<typeof _MvTreeSelect>

declare module 'vue' {
    export interface GlobalComponents {
        MvTreeSelect: typeof _MvTreeSelect
    }
}
