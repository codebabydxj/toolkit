
import { withInstall } from '@/utils/with-install'
import _MvTabPanel from './MvTabPanel.vue'
export const MvTabPanel = withInstall(_MvTabPanel)
export default MvTabPanel
export * from './mvTabPanel'
export * from './types'
export type MvTabPanelInstance = InstanceType<typeof _MvTabPanel>

declare module 'vue' {
    export interface GlobalComponents {
        MvTabPanel: typeof _MvTabPanel
    }
}
