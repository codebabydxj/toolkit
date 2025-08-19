
import { withInstall } from '@/utils/with-install'
import _MvSelect from './MvSelect.vue'
export const MvSelect = withInstall(_MvSelect)
export default MvSelect
export * from './mvSelect'
export type MvSelectInstance = InstanceType<typeof _MvSelect>

declare module 'vue' {
    export interface GlobalComponents {
        MvSelect: typeof _MvSelect
    }
}
