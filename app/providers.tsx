'use client';

import { isPagePrivate } from '@/lib/middleware/utils';
import { Analytics } from '@vercel/analytics/react';

export default function RootProviders() {
  return (
    <Analytics
      mode={'production'}
      beforeSend={(event) => {
        if (isPagePrivate(event.url)) {
          return null;
        }
        return event;
      }}
    />
  );
}
