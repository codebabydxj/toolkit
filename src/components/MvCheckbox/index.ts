import { withInstall } from '@/utils/with-install'
import _MvCheckbox from './MvCheckbox.vue'
export const MvCheckbox = withInstall(_MvCheckbox)
export default MvCheckbox
export * from './mvCheckBox'
export type MvCheckboxInstance = InstanceType<typeof _MvCheckbox>
declare module 'vue' {
    export interface GlobalComponents {
        MvCheckbox: typeof _MvCheckbox
    }
}