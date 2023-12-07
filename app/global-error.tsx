'use client';

import { useCustomLog } from '@/lib/hooks';

export default function GlobalError({
  error,
  reset
}: {
  error: Error;
  reset: () => void;
}) {
  const customLog = useCustomLog();
  customLog.debug('GlobalError', error);
  return (
    <html>
      <body>
        <h2>Something went wrong!</h2>
        <button onClick={() => reset()}>Try again</button>
      </body>
    </html>
  );
}
