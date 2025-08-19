import { onMounted, ref } from "vue";
import { client } from "../api";
import { apiConfig } from "../api/apiConfig";

export default function (
  dictCode: string = "",
  getData?: () => Promise<Record<string, any>>
) {
  const options = ref<Record<string, any>>({});
  const getOptions = async (dictCode: string = "") => {
    const sessionDictCode = sessionStorage.getItem(dictCode);
    if (sessionDictCode) {
      options.value = JSON.parse(sessionDictCode);
    } else {
      const res = await client.get(apiConfig.dictUrl, { dictCode: dictCode });
      if (res.data) {
        sessionStorage.setItem(dictCode, JSON.stringify(res.data));
        options.value = res.data;
      }
    }
    return options.value;
  };

  onMounted(async () => {
    if (dictCode) {
      await getOptions(dictCode);
    } else if (getData) {
      options.value = await getData();
    }
  });

  return {
    options,
    getOptions,
  };
}
