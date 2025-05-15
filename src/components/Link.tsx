'use client';

import NextLink from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';

interface LinkProps extends Omit<React.ComponentProps<typeof NextLink>, 'href'> {
  href: string;
}

export default function Link({ children, ...props }: LinkProps) {
  const searchParams = useSearchParams();
  const cluster = searchParams.get('cluster');

  const href = useMemo(() => {
    if (!props.href.startsWith('/')) return props.href;

    const [path, search] = props.href.split('?');
    const searchParams = new URLSearchParams(search);

    if (cluster) searchParams.set('cluster', cluster);

    return `${path}?${searchParams.toString()}`;
  }, [props.href, cluster]);

  return (
    <NextLink {...props} href={href}>
      {children}
    </NextLink>
  );
}
