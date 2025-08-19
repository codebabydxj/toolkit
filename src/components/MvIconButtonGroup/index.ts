
import { withInstall } from '@/utils/with-install'
import _MvIconButtonGroup from './MvIconButtonGroup.vue'
export const MvIconButtonGroup = withInstall(_MvIconButtonGroup)
export default MvIconButtonGroup
export type MvIconButtonGroupInstance = InstanceType<typeof _MvIconButtonGroup>

declare module 'vue' {
    export interface GlobalComponents {
        MvIconButtonGroup: typeof _MvIconButtonGroup
    }
}
