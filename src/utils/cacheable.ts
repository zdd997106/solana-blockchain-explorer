export function cacheable<T extends FunctionType>(func: T, options: CacheableOptions = {}) {
  const cache = new Map<string, CachedItem<ReturnType<T>>>();

  const isExpired = (key: string) => {
    const cachedItem = cache.get(key);
    if (!cachedItem) return true;
    return cachedItem.expiry !== null && Date.now() > cachedItem.expiry;
  };

  const newExpiry = () => {
    return options.revalidate ? Date.now() + options.revalidate : null;
  };

  const setCache = (key: string, value: ReturnType<T>) => {
    const fallback = cache.get(key)?.value || value;
    cache.set(key, { value: fallback, expiry: null });

    Promise.resolve(value)
      .then((res) => {
        cache.set(key, { value: res, expiry: newExpiry() });
      })
      .catch(() => {
        cache.set(key, { value: fallback, expiry: Date.now() });
      });
  };

  return (...args: Parameters<T>) => {
    const cacheKey = JSON.stringify(args, (_, v) => (typeof v === 'bigint' ? v.toString() : v));

    if (options.useStaleWhileRevalidate && cache.has(cacheKey)) {
      const cachedItem = cache.get(cacheKey)!;
      if (isExpired(cacheKey)) {
        setCache(cacheKey, func(...args));
      }
      return cachedItem.value;
    }

    if (!cache.has(cacheKey) || isExpired(cacheKey)) setCache(cacheKey, func(...args));

    return cache.get(cacheKey)!.value;
  };
}

// ----- TYPES -----

type FunctionType = (...args: any[]) => any;

interface CacheableOptions {
  revalidate?: number;
  useStaleWhileRevalidate?: boolean;
}

interface CachedItem<T> {
  value: T;
  expiry: number | null;
}
