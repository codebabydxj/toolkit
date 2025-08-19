<template>
    <div style="width: 50%">
        <!-- <mv-calendar type="dot" size="small"></mv-calendar> -->
    </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import { fv, listToTree, treeToList, removeOrigin, dictToArr, client } from '../../src/'

import MvCalendar from "../../src/components/MvCalendar/MvCalendar.vue";

const areaCodeFormat = (code: string | number) => {
    if (typeof code === "number") code = code.toString();

    let resultCode = code.replace(/0+?$/, "");
    //将行政区划编码统一去掉末尾的所有0
    let newCode = {
        areaCodeLang: resultCode.padEnd(12, '0'),
        areaCodeShort: "",
        areaCodeMiddle: "",
    };

    //处理中间码判断
    if (resultCode.length > 0 && resultCode.length <= 6) {
        newCode.areaCodeMiddle = resultCode.padEnd(6, "0");
    }
    if (resultCode.length > 6 && resultCode.length <= 9) {
        newCode.areaCodeMiddle = resultCode.padEnd(9, "0");
    }
    if (resultCode.length > 9 && resultCode.length <= 12) {
        newCode.areaCodeMiddle = resultCode.padEnd(12, "0");
    }

    //处理精简码判断（将末尾0不是多余的 进行补0）
    if (resultCode.length > 0 && resultCode.length <= 2) {
        newCode.areaCodeShort = resultCode.padEnd(2, "0");
    }
    if (resultCode.length > 2 && resultCode.length <= 4) {
        newCode.areaCodeShort = resultCode.padEnd(4, "0");
    }
    if (resultCode.length > 4 && resultCode.length <= 6) {
        newCode.areaCodeShort = resultCode.padEnd(6, "0");
    }
    if (resultCode.length > 6 && resultCode.length <= 9) {
        newCode.areaCodeShort = resultCode.padEnd(9, "0");
    }
    if (resultCode.length > 9 && resultCode.length <= 12) {
        newCode.areaCodeShort = resultCode.padEnd(12, "0");
    }

    return newCode;
};

const code = areaCodeFormat('140400')
console.log(code)

const coo = (data: any) => {
    console.log(data)
}
const value = ref(true)
const countData = ref({
    label: '拉伸快点解封',
    value: 294992.45,
    unit: '万元'
})

const countDataChange = () => {
    countData.value.unit = countData.value.unit === '元' ? '万元' : '元'
}
const defaultRaido = ref('')
const raidos = ref([
    { label: 'AAA', value: 'AAA' },
    { label: 'BBB', value: 'BBB' },
])
const asdf = ref("lsakdjfklajsdlk");
const abc = () => {
    asdf.value = "";
};
const form = reactive({
    host: ''
})
const formRules = reactive({
    host: [fv.isRequired({}), fv.passwordValidator()]
})
const select = ref('1')

const list = ref<any[]>([
    {
        "budgetUnit": "仿真表单字段测试",
        "children": [
            {
                "children": [
                    {
                        "canChange": false,
                        "canSubmitTask": false,
                        "finished": false,
                        "formId": "919,954",
                        "processInstanceId": "1558bc86-8d8f-11ed-aeb6-8e1fb0936ad1",
                        "rankLevel": 1,
                        "taskId": "1564caae-8d8f-11ed-aeb6-8e1fb0936ad1",
                        "taskName": "项目入库表"
                    }
                ],
                "finishTaskSize": 0,
                "finished": false,
                "nodeName": "申请报告",
                "phaseState": 1,
                "starting": false,
                "totalTaskSize": 1
            },
            {
                "children": [
                    {
                        "canChange": false,
                        "canSubmitTask": false,
                        "finished": false,
                        "formId": "920,943",
                        "processInstanceId": "1558bc86-8d8f-11ed-aeb6-8e1fb0936ad1",
                        "rankLevel": 2,
                        "taskId": "1564f1c1-8d8f-11ed-aeb6-8e1fb0936ad1",
                        "taskName": "实施方案表"
                    }
                ],
                "finishTaskSize": 0,
                "finished": false,
                "nodeName": "实施方案",
                "phaseState": 1,
                "starting": false,
                "totalTaskSize": 1
            }
        ],
        "finishTaskSize": 0,
        "finished": false,
        "nodeName": "项目申请",
        "tel": "15202310011",
        "totalTaskSize": 2,
        "tag": 1
    },
    {
        "budgetUnit": "仿真表单字段测试",
        "children": [
            {
                "children": [
                    {
                        "canChange": false,
                        "canSubmitTask": false,
                        "finished": false,
                        "formId": "950",
                        "processInstanceId": "1558bc86-8d8f-11ed-aeb6-8e1fb0936ad1",
                        "rankLevel": 3,
                        "taskId": "1564f1c4-8d8f-11ed-aeb6-8e1fb0936ad1",
                        "taskName": "批复文件"
                    }
                ],
                "finishTaskSize": 0,
                "finished": false,
                "nodeName": "批复文件",
                "phaseState": 1,
                "starting": false,
                "totalTaskSize": 1
            }
        ],
        "finishTaskSize": 0,
        "finished": false,
        "nodeName": "项目批复",
        "tel": "15202310011",
        "totalTaskSize": 1,
        "tag": 1
    },
    {
        "budgetUnit": "仿真表单字段测试",
        "children": [
            {
                "children": [
                    {
                        "canChange": false,
                        "canSubmitTask": false,
                        "finished": false,
                        "formId": "951",
                        "processInstanceId": "1558bc86-8d8f-11ed-aeb6-8e1fb0936ad1",
                        "rankLevel": 4,
                        "taskId": "1564f1c7-8d8f-11ed-aeb6-8e1fb0936ad1",
                        "taskName": "村民代表会议记录"
                    },
                    {
                        "canChange": false,
                        "canSubmitTask": false,
                        "finished": false,
                        "formId": "952",
                        "processInstanceId": "1558bc86-8d8f-11ed-aeb6-8e1fb0936ad1",
                        "rankLevel": 5,
                        "taskId": "1564f1ca-8d8f-11ed-aeb6-8e1fb0936ad1",
                        "taskName": "四一两公开会议记录"
                    },
                    {
                        "canChange": false,
                        "canSubmitTask": false,
                        "finished": false,
                        "formId": "953",
                        "processInstanceId": "1558bc86-8d8f-11ed-aeb6-8e1fb0936ad1",
                        "rankLevel": 6,
                        "taskId": "156518dd-8d8f-11ed-aeb6-8e1fb0936ad1",
                        "taskName": "村民代表征求农户意见表"
                    },
                    {
                        "canChange": false,
                        "canSubmitTask": false,
                        "finished": false,
                        "formId": "945",
                        "processInstanceId": "1558bc86-8d8f-11ed-aeb6-8e1fb0936ad1",
                        "rankLevel": 7,
                        "taskId": "156518e0-8d8f-11ed-aeb6-8e1fb0936ad1",
                        "taskName": "表决签字复印件"
                    }
                ],
                "finishTaskSize": 0,
                "finished": false,
                "nodeName": "村民代表会议",
                "phaseState": 1,
                "starting": false,
                "totalTaskSize": 4
            },
            {
                "children": [
                    {
                        "canChange": false,
                        "canSubmitTask": false,
                        "finished": false,
                        "formId": "921,944",
                        "processInstanceId": "1558bc86-8d8f-11ed-aeb6-8e1fb0936ad1",
                        "rankLevel": 8,
                        "taskId": "156518e3-8d8f-11ed-aeb6-8e1fb0936ad1",
                        "taskName": "一事一议预算表"
                    },
                    {
                        "canChange": false,
                        "canSubmitTask": false,
                        "finished": false,
                        "formId": "941",
                        "processInstanceId": "1558bc86-8d8f-11ed-aeb6-8e1fb0936ad1",
                        "rankLevel": 9,
                        "taskId": "156518e6-8d8f-11ed-aeb6-8e1fb0936ad1",
                        "taskName": "项目申请方案公式照片"
                    },
                    {
                        "canChange": false,
                        "canSubmitTask": false,
                        "duringTime": 488109,
                        "dutyPerson": "rcjb003",
                        "dutyUnit": "芮城县古魏镇农经局",
                        "endTime": "2023-01-06 15:03:27",
                        "finished": true,
                        "formId": "922,955",
                        "rankLevel": 10,
                        "startTime": "2023-01-06 14:55:19",
                        "taskId": "1558bc86-8d8f-11ed-aeb6-8e1fb0936ad1",
                        "taskName": "项目建设申报审批表",
                        "tel": ""
                    },
                    {
                        "canChange": false,
                        "canSubmitTask": false,
                        "finished": false,
                        "formId": "963",
                        "processInstanceId": "1558bc86-8d8f-11ed-aeb6-8e1fb0936ad1",
                        "rankLevel": 11,
                        "taskId": "15653ffc-8d8f-11ed-aeb6-8e1fb0936ad1",
                        "taskName": "分户汇总分户清册"
                    },
                    {
                        "canChange": false,
                        "canSubmitTask": false,
                        "finished": false,
                        "formId": "923,956",
                        "processInstanceId": "1558bc86-8d8f-11ed-aeb6-8e1fb0936ad1",
                        "rankLevel": 12,
                        "taskId": "15653fff-8d8f-11ed-aeb6-8e1fb0936ad1",
                        "taskName": "建设项目资金进账报告单"
                    }
                ],
                "finishTaskSize": 1,
                "finished": false,
                "nodeName": "项目资金申请",
                "phaseState": 2,
                "startTime": "2023-01-06",
                "starting": true,
                "totalTaskSize": 5
            },
            {
                "children": [
                    {
                        "canChange": false,
                        "canSubmitTask": false,
                        "finished": false,
                        "formId": "946",
                        "processInstanceId": "1558bc86-8d8f-11ed-aeb6-8e1fb0936ad1",
                        "rankLevel": 13,
                        "taskId": "15654002-8d8f-11ed-aeb6-8e1fb0936ad1",
                        "taskName": "工程承包合同协议书"
                    },
                    {
                        "canChange": false,
                        "canSubmitTask": false,
                        "finished": false,
                        "formId": "942",
                        "processInstanceId": "1558bc86-8d8f-11ed-aeb6-8e1fb0936ad1",
                        "rankLevel": 14,
                        "taskId": "15654005-8d8f-11ed-aeb6-8e1fb0936ad1",
                        "taskName": "工程项目照片（施工前）"
                    },
                    {
                        "canChange": false,
                        "canSubmitTask": false,
                        "finished": false,
                        "formId": "961",
                        "processInstanceId": "1558bc86-8d8f-11ed-aeb6-8e1fb0936ad1",
                        "rankLevel": 15,
                        "taskId": "15656719-8d8f-11ed-aeb6-8e1fb0936ad1",
                        "taskName": "工程项目照片（施工中）"
                    },
                    {
                        "canChange": false,
                        "canSubmitTask": false,
                        "finished": false,
                        "formId": "962",
                        "processInstanceId": "1558bc86-8d8f-11ed-aeb6-8e1fb0936ad1",
                        "rankLevel": 16,
                        "taskId": "1565671c-8d8f-11ed-aeb6-8e1fb0936ad1",
                        "taskName": "工程项目照片（施工后）"
                    }
                ],
                "finishTaskSize": 0,
                "finished": false,
                "nodeName": "项目施工",
                "phaseState": 1,
                "starting": false,
                "totalTaskSize": 4
            }
        ],
        "finishTaskSize": 0,
        "finished": false,
        "nodeName": "项目实施",
        "tel": "15202310011",
        "totalTaskSize": 3,
        "tag": 1
    },
    {
        "budgetUnit": "仿真表单字段测试",
        "children": [
            {
                "children": [
                    {
                        "canChange": false,
                        "canSubmitTask": false,
                        "finished": false,
                        "formId": "926,960",
                        "processInstanceId": "1558bc86-8d8f-11ed-aeb6-8e1fb0936ad1",
                        "rankLevel": 17,
                        "taskId": "1565671f-8d8f-11ed-aeb6-8e1fb0936ad1",
                        "taskName": "一事一议财奖补项目验收表"
                    }
                ],
                "finishTaskSize": 0,
                "finished": false,
                "nodeName": "竣工验收",
                "phaseState": 1,
                "starting": false,
                "totalTaskSize": 1
            }
        ],
        "finishTaskSize": 0,
        "finished": false,
        "nodeName": "竣工验收",
        "tel": "15202310011",
        "totalTaskSize": 1,
        "tag": 1
    },
    {
        "budgetUnit": "仿真表单字段测试",
        "children": [
            {
                "children": [
                    {
                        "canChange": false,
                        "canSubmitTask": false,
                        "finished": false,
                        "formId": "924,959",
                        "processInstanceId": "1558bc86-8d8f-11ed-aeb6-8e1fb0936ad1",
                        "rankLevel": 18,
                        "taskId": "15656722-8d8f-11ed-aeb6-8e1fb0936ad1",
                        "taskName": "项目结算表"
                    },
                    {
                        "canChange": false,
                        "canSubmitTask": false,
                        "finished": false,
                        "formId": "927,958",
                        "processInstanceId": "1558bc86-8d8f-11ed-aeb6-8e1fb0936ad1",
                        "rankLevel": 19,
                        "taskId": "15658e35-8d8f-11ed-aeb6-8e1fb0936ad1",
                        "taskName": "财政奖补级申请申领表"
                    },
                    {
                        "canChange": false,
                        "canSubmitTask": false,
                        "finished": false,
                        "formId": "928,957",
                        "processInstanceId": "1558bc86-8d8f-11ed-aeb6-8e1fb0936ad1",
                        "rankLevel": 20,
                        "taskId": "15658e38-8d8f-11ed-aeb6-8e1fb0936ad1",
                        "taskName": "国库支付中心付款通知单"
                    }
                ],
                "finishTaskSize": 0,
                "finished": false,
                "nodeName": "项目结算",
                "phaseState": 1,
                "starting": false,
                "totalTaskSize": 3
            }
        ],
        "finishTaskSize": 0,
        "finished": false,
        "nodeName": "项目结算",
        "tel": "15202310011",
        "totalTaskSize": 1,
        "tag": 1
    }
])

const tree = ref<any[]>([])

const aa = () => {
    list.value = listToTree(tree.value)
    console.table(list.value)
}
const bb = () => {
    tree.value = treeToList(list.value)
    console.log(tree.value)
}

const obj = ref({
    "obj": "AAA",
    "arr": "BBB"
})

const arr1 = ref([
    {
        "aaa": "AAA",
        "bbb": "obj"
    },
    {
        "aaa": "BBB",
        "bbb": "arr"
    }
])
const arr: any[] = dictToArr(arr1.value, 'aaa', 'bbb')
// console.log(arr)

const numToString = <T>(value: T): string => {
    return `${value}`
}

const a = numToString(["asdf"])

</script>

<style lang="scss" scoped></style>
