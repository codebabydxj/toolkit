import { withInstall } from '@/utils/with-install'
import _MvCountsItem from './MvCountsItem.vue'
export const MvCountsItem = withInstall(_MvCountsItem)
export default MvCountsItem
export * from './types'
export * from './mvCountsItem'
export type MvCountsItemInstance = InstanceType<typeof _MvCountsItem>

declare module 'vue' {
    export interface GlobalComponents {
        MvCountsItem: typeof _MvCountsItem
    }
}