import { withInstall } from "@/utils/with-install";

import _MvMenuItem from './MvMenuItem.vue'
export const MvMenuItem = withInstall(_MvMenuItem)
export default MvMenuItem;
export * from './mvMenuItem'
export type MvMenuItemInstance = InstanceType<typeof _MvMenuItem>

declare module 'vue' {
    export interface GlobalComponents {
        MvMenuItem: typeof _MvMenuItem;
    }
}