export const VUE_QUERY_CACHE: { [type: string]: any } = {};

export function getCacheByKey(key: string) {
  return VUE_QUERY_CACHE[key];
}

export function updateCache(
  key: string,
  data: any,
  timestamp: number | null = Date.now()
) {
  const update = { data, timestamp };
  VUE_QUERY_CACHE[key] = update;
  return update;
}

export function clearCache(key: string) {
  delete VUE_QUERY_CACHE[key];
}

export function cacheIsInvalid(key: string, time: number) {
  return (
    !getCacheByKey(key) || getCacheByKey(key).timestamp < Date.now() - time
  );
}

export function wait(time: number) {
  return new Promise(resolve => {
    const t = setTimeout(() => {
      resolve();
      clearTimeout(t);
      console.log("cleared!");
    }, time);
  });
}
