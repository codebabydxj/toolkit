import currency from "currency.js";
import { ref } from "vue";
import type { NumFormatPrefix, NumFormatResultType, NumFormatValueResult } from "./types";

export default function (unit: string, prefixType: NumFormatPrefix = '') {
    const prefix = ref(prefixType + unit)
    const unitDict = ref<Record<number, string>>({ 1: unit, 2: '万' + unit })
    const defaultValue = ref<string | number>('')
    const defaultResultType = ref<NumFormatResultType>('string')

    const value = (value: string | number, resultType: NumFormatResultType = 'string'): NumFormatValueResult => {
        defaultValue.value = value
        defaultResultType.value = resultType
        let resultValue: string | number = ''
        if (value) {
            if (prefix.value.startsWith('万')) {
                resultValue = !prefixType ? currency(value, { precision: 6, symbol: '' }).divide(10000).format() : currency(value, { symbol: '' }).format()
            } else {
                resultValue = !prefixType ? currency(value, { symbol: '' }).format() : currency(value, { precision: 2, symbol: '' }).multiply(10000).format()
            }
        } else {
            resultValue = "0"
        }
        resultValue = resultValue.toString().replace(/(?<=\.\d*)0+$|\.0*$/gi, '')
        return resultType === 'string' ?
            resultValue + prefix.value :
            {
                value: resultValue,
                unit: prefix.value
            }

    }
    const change = (index?: number) => {
        if (index) {
            prefix.value = unitDict.value[index]
        } else {
            prefix.value = prefix.value ? unit : ('万' + unit)
        }
        value(defaultValue.value, defaultResultType.value)
    }

    return {
        value, change, prefix, unitDict
    }
}