'use client';

import NextLink from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense, useMemo } from 'react';

// ----------

interface LinkProps extends Omit<React.ComponentProps<typeof NextLink>, 'href'> {
  href: string;
}

function LinkBase({ children, ...props }: LinkProps) {
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
    <Suspense fallback={<NextLink {...props}>{children}</NextLink>}>
      <NextLink {...props} href={href}>
        {children}
      </NextLink>
    </Suspense>
  );
}

export default function Link(props: LinkProps) {
  return (
    <Suspense fallback={<NextLink {...props} />}>
      <LinkBase {...props} />
    </Suspense>
  );
}
