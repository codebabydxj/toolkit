import { computed, ref } from "vue";
import { useRoute } from "vue-router";

export default function (routerQuery: boolean = true) {
  const route = useRoute();
  const page = computed(() => {
    if (route?.query && route.query?.page) {
      return Number(route.query.page);
    } else {
      return 1;
    }
  });
  const isRouter = routerQuery;
  const pages = ref({
    page: routerQuery ? page : 1,
    size: 10,
  });
  const total = ref(0);
  const sizes = ref([10, 30, 50, 100]);

  return { pages, total, sizes, isRouter };
}
