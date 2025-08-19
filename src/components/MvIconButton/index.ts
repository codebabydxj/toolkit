
import { withInstall } from '@/utils/with-install'
import _MvIconButton from './MvIconButton.vue'
export const MvIconButton = withInstall(_MvIconButton)
export default MvIconButton
export * from './mvIconButton'
export * from './types'
export type MvIconButtonInstance = InstanceType<typeof _MvIconButton>

declare module 'vue' {
    export interface GlobalComponents {
        MvIconButton: typeof _MvIconButton
    }
}
