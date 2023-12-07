'use client';

import { useLogger } from 'next-axiom';

export function useCustomLog() {
  const log = useLogger();

  if (process.env.NEXT_PUBLIC_ENV === 'production') {
    return log;
  } else {
    return {
      debug: (
        message: string,
        args?: {
          [key: string]: any;
        }
      ) => console.log(message, args),
      info: (
        message: string,
        args?: {
          [key: string]: any;
        }
      ) => console.log(message, args),
      error: (
        message: string,
        args?: {
          [key: string]: any;
        }
      ) => console.log(message, args),
      warn: (
        message: string,
        args?: {
          [key: string]: any;
        }
      ) => console.log(message, args)
    };
  }
}
