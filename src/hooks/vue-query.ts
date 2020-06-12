import { onMounted, ref } from "@vue/composition-api";
import {
  updateCache,
  cacheIsInvalid,
  getCacheByKey,
  VUE_QUERY_CACHE,
  wait
} from "./utils";

interface QueryOptions {
  cacheFor: number;
  retryTimes: number;
  retryDelay: number;
}

const defaultOptions: QueryOptions = {
  cacheFor: 1000 * 60,
  retryTimes: 3,
  retryDelay: 1000
};

export function useQuery(
  keyValue: any | any[],
  fetcher: (args: any[] | any) => PromiseLike<any>,
  instanceOpts: Partial<QueryOptions> = {}
) {
  const key = keyValue.toString();
  const opts: QueryOptions = { ...defaultOptions, ...instanceOpts };

  const loading = ref(false);
  const data = ref(null);
  const error = ref(null);
  const retryCount = ref(1);

  async function refetch(bypassCache = false) {
    // Cache is empty or needs to be refetched
    if (cacheIsInvalid(key, opts.cacheFor) || bypassCache) {
      try {
        // Set init loading state
        loading.value = true;
        // reset error state
        error.value = null;
        // Fetch data with keys as args
        const fetchedData = await fetcher(keyValue);
        // add data to cache
        updateCache(key, fetchedData);
        // update date in hook
        data.value = fetchedData;
      } catch (e) {
        // update error in hook
        error.value = e;

        if (retryCount.value < opts.retryTimes) {
          // wait for delay
          await wait(opts.retryDelay);
          // refetch
          refetch(true);
          // increment the retry count
          retryCount.value++;
        } else {
          console.log("Error for the last time");
          // reset retry count
          retryCount.value = 1;
        }
      }

      // Done loading
      loading.value = false;
    } else {
      // Use cached data
      data.value = getCacheByKey(key).data;
    }
  }

  onMounted(refetch);
  return { loading, data, error, refetch };
}

export function queryCache(key: any | any[]) {
  return getCacheByKey(key.toString()).data;
}

declare global {
  interface Window {
    debugQuery: Function;
  }
}

window.debugQuery = () => {
  console.table(VUE_QUERY_CACHE);
};
