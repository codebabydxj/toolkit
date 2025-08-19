import { onMounted, ref } from "vue";
import { client } from "../api";
import { apiConfig } from "../api/apiConfig";

export default function (dictCode: string='', getData?: ()=> Promise<[]>) {
    const arr = ref<Record<string, any>[]>([])
    const getArray = async () => {
        const sessionDictCode = sessionStorage.getItem(dictCode)
        if (sessionDictCode) {
            arr.value = JSON.parse(sessionDictCode)
        } else {
            const res = await client.get(apiConfig.dictArrUrl, { dictCode: dictCode })
            if (res.data && res.data.length) {
                sessionStorage.setItem(dictCode, JSON.stringify(res.data))
                arr.value = res.data
            }
        }
    }

    onMounted(async () => {
        if (dictCode){
            await getArray()
        } else if(getData) {
            arr.value = await getData()
        }
    })
    return {
        arr
    }
}