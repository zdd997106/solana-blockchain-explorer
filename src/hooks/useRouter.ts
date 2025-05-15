'use client';

import { useRouter as useNextRouter, useSearchParams } from 'next/navigation';

export function useRouter() {
  const router = useNextRouter();
  const searchParams = useSearchParams();
  const cluster = searchParams.get('cluster');

  const getUrl = (url: string) => {
    if (!url.startsWith('/')) return url;
    const [path, search] = url.split('?');
    const searchParams = new URLSearchParams(search);

    // Add cluster to search params if it exists in the current URL
    if (cluster && !searchParams.get('cluster')) searchParams.set('cluster', cluster);

    return `${path}?${searchParams.toString()}`;
  };

  return {
    ...router,
    push: (url: string) => router.push(getUrl(url)),
    replace: (url: string) => router.replace(getUrl(url)),
    prefetch: (url: string) => router.prefetch(getUrl(url)),
  } as ReturnType<typeof useNextRouter>;
}
