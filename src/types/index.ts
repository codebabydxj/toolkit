// 公共包使用Install必传类型
interface PermissionItem {
    perms: string
    [x: string]: any
}

interface RolesItem {
    roleCode: string
    [x: string]: any
}

export interface InstallOptions {
    permissions?: PermissionItem[],
    roles?: RolesItem[],
    [x: string]: any
}
// 公共包end