import type { FormItemRule } from "element-plus"
import type { ValidatorProps } from "./types"



/**
 * @description: 验证是否必填
 * @param {ValidatorProps} props { msg = '请填写', trigger = 'blur' }
 * @return {*}
 */
export const isRequired = function (props: ValidatorProps = {}): FormItemRule {
    const { msg = '请填写', trigger = 'blur' } = props
    return {
        required: true, message: msg, trigger: trigger
    }
}

/**
 * @description: 验证手机号码是否正确
 * @param {ValidatorProps} props { msg = '请输入正确的手机号', trigger = 'blur' }
 * @return {*}
 */
export const isMobilePhone = (props: ValidatorProps = {}): FormItemRule => {
    const { msg = '请输入正确的手机号', trigger = 'blur' } = props
    const regex = /^(?:(?:\+|00)86)?1[3-9]\d{9}$/
    const validatorPhone = (rule: any, value: any, callback: any) => {
        if (!regex.test(value) && value) {
            callback(new Error(msg))
        } else {
            callback()
        }
    }
    return {
        validator: validatorPhone, trigger
    }
}

/**
 * @description: 验证密码格式
 * @param {ValidatorProps} props { msg = '密码包含 数字、英文、_中的两种以上，且以字母开头，长度为8-20', trigger = 'blur' }
 * @return {*}
 */
export const passwordValidator = (props: ValidatorProps = {}): FormItemRule => {
    const { msg = '密码最少12位，包括至少1个大写字母，1个小写字母，1个数字，1个特殊字符', trigger = 'blur' } = props
    const regex = /^\S*(?=\S{12,})(?=\S*\d)(?=\S*[A-Z])(?=\S*[a-z])(?=\S*[!@#$%^&*? ])\S*$/
    const validator = (rule: any, value: any, callback: any) => {
        if (!regex.test(value) && value) {
            callback(new Error(msg));
        } else {
            callback();
        }
    }
    return { validator: validator, trigger }
};

/**
 * @description: 验证URL是否正确
 * @param {ValidatorProps} props { msg = '请输入正确的url地址', trigger = 'blur' }
 * @return {*}
 */
export const isUrl = (props: ValidatorProps = {}): FormItemRule => {
    const { msg = '请输入正确的url地址', trigger = 'blur' } = props
    const ipRegex = /^(ht|f)tp(s?)\:\/\/[0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*(:(0-9)*)*(\/?)([a-zA-Z0-9\-\.\?\,\'\/\\\+&amp;%$#_]*)?/

    const validator = (rule: any, value: any, callback: any) => {
        if (!ipRegex.test(value) && value) {
            callback(new Error(msg))
        } else {
            callback()
        }
    }
    return { validator: validator, trigger }
}

/**
 * @description: 验证身份证
 * @param {ValidatorProps} props { msg = '请输入正确的身份证号码', trigger = 'blur' }
 * @return {*}
 */
export const isIdCard = (props: ValidatorProps = {}): FormItemRule => {
    const { msg = '请输入正确的身份证号码', trigger = 'blur' } = props
    const regex = /^[1-9]\d{5}(?:18|19|20)\d{2}(?:0[1-9]|10|11|12)(?:0[1-9]|[1-2]\d|30|31)\d{3}[\dXx]$/
    const validator = (rule: any, value: any, callback: any) => {
        if (!regex.test(value) && value) {
            callback(new Error(msg))
        } else {
            callback()
        }
    }
    return { validator: validator, trigger }
}

/**
 * @description: 验证银行卡号
 * @param {ValidatorProps} props { msg = '请输入正确的银行卡号', trigger = 'blur' }
 * @return {*}
 */
export const isBankCard = (props: ValidatorProps = {}): FormItemRule => {
    const { msg = '请输入正确的银行卡号', trigger = 'blur' } = props
    const regex = /^[1-9]\d{9,29}$/
    const validator = (rule: any, value: any, callback: any) => {
        if (!regex.test(value) && value) {
            callback(new Error(msg))
        } else {
            callback()
        }
    }
    return { validator: validator, trigger }
}

/**
 * @description: 验证邮箱
 * @param {ValidatorProps} props { msg = '请输入正确邮箱号码', trigger = 'blur' }
 * @return {*}
 */
export const isEmail = (props: ValidatorProps = {}): FormItemRule => {
    const { msg = '请输入正确邮箱号码', trigger = 'blur' } = props
    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    const validator = (rule: any, value: any, callback: any) => {
        if (!regex.test(value) && value) {
            callback(new Error(msg))
        } else {
            callback()
        }
    }
    return { validator: validator, trigger }
}


/**
 * @description: 验证统一社会信用代码
 * @param {ValidatorProps} props { msg = '请输入正确的统一社会信用代码', trigger = 'blur' }
 * @return {*}
 */
export const isUnifiedSocialCreditCode = (props: ValidatorProps = {}): FormItemRule => {
    const { msg = '请输入正确的统一社会信用代码', trigger = 'blur' } = props
    const regex = /^[0-9A-HJ-NPQRTUWXY]{2}\d{6}[0-9A-HJ-NPQRTUWXY]{10}$/
    const validator = (rule: any, value: any, callback: any) => {
        if (!regex.test(value) && value) {
            callback(new Error(msg))
        } else {
            callback()
        }
    }
    return { validator: validator, trigger }
}

/**
 * @description: 验证车牌号，包含新能源
 * @param {ValidatorProps} props { msg = '请输入正确的车牌号', trigger = 'blur' }
 * @return {*}
 */
export const isCarCode = (props: ValidatorProps = {}): FormItemRule => {
    const { msg = '请输入正确的车牌号', trigger = 'blur' } = props
    const regex = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-HJ-NP-Z][A-HJ-NP-Z0-9]{4,5}[A-HJ-NP-Z0-9挂学警港澳]$/
    const validator = (rule: any, value: any, callback: any) => {
        if (!regex.test(value) && value) {
            callback(new Error(msg))
        } else {
            callback()
        }
    }
    return { validator: validator, trigger }
}

/**
 * @description: 验证用户名格式
 * @param {ValidatorProps} props { msg = '用户名必须字母开头，长度为6-15位，仅允许字母数字下划线', trigger = 'blur' }
 * @return {*}
 */
export const userNameValidator = (props: ValidatorProps = {}): FormItemRule => {
    const { msg = '用户名必须字母开头，长度为6-15位，仅允许字母数字下划线', trigger = 'blur' } = props
    const regex = /^[a-zA-Z]\w{5,15}$/
    const validator = (rule: any, value: any, callback: any) => {
        if (!regex.test(value) && value) {
            callback(new Error(msg))
        } else {
            callback()
        }
    }
    return { validator: validator, trigger }
}

/**
 * @description: 验证是否汉字
 * @param {ValidatorProps} props { msg = '仅允许汉字', trigger = 'blur' }
 * @return {*}
 */
export const isChineseCharacter = (props: ValidatorProps = {}): FormItemRule => {
    const { msg = '仅允许汉字', trigger = 'blur' } = props
    const regex = /^(?:[\u3400-\u4DB5\u4E00-\u9FEA\uFA0E\uFA0F\uFA11\uFA13\uFA14\uFA1F\uFA21\uFA23\uFA24\uFA27-\uFA29]|[\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879][\uDC00-\uDFFF]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0])+$/
    const validator = (rule: any, value: any, callback: any) => {
        if (!regex.test(value) && value) {
            callback(new Error(msg))
        } else {
            callback()
        }
    }
    return { validator: validator, trigger }
}

/**
 * @description: 验证姓名是否正确
 * @param {ValidatorProps} props { msg = '请输入正确的名字', trigger = 'blur' }
 * @return {*}
 */
export const isChineseName = (props: ValidatorProps = {}): FormItemRule => {
    const { msg = '请输入正确的名字', trigger = 'blur' } = props
    const regex = /^(?:[\u4e00-\u9fa5·]{2,16})$/
    const validator = (rule: any, value: any, callback: any) => {
        if (!regex.test(value) && value) {
            callback(new Error(msg))
        } else {
            callback()
        }
    }
    return { validator: validator, trigger }
}