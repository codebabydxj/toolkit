
import { withInstall } from '@/utils/with-install'
import _TableController from './TableController.vue'
export const TableController = withInstall(_TableController)
export default TableController
export * from './tableController'
export * from './types'
export type TableControllerInstance = InstanceType<typeof _TableController>

declare module 'vue' {
    export interface GlobalComponents {
        TableController: typeof _TableController
    }
}
