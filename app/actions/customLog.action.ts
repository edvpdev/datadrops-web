import { Logger } from 'next-axiom';

export const customLog =
  process.env.NEXT_PUBLIC_ENV === 'production'
    ? new Logger()
    : {
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
        ) => console.log(message, args),
        flush: async () => {}
      };
