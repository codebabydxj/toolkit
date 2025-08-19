interface NumFormatObject {
    value: string
    unit: string
}
export type NumFormatValueResult = string | NumFormatObject
export type NumFormatPrefix = '' | '万'
export type NumFormatResultType = 'string' | 'object'