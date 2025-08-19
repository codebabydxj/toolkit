// 表单验证 start
// 表单验证区域类型
export type AreaCodeType = 'lang' | 'short'
// 表单验证触发类型及消息
export interface ValidatorProps {
    msg?: string
    trigger?: 'blur' | 'change'
}