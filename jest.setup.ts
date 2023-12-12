import '@testing-library/jest-dom/extend-expect';
import { mockDeep, mockReset, DeepMockProxy } from 'jest-mock-extended';

import prisma from './lib/prismadb';
import { PrismaClient } from '@prisma/client';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { AuthOptions } from 'next-auth';
import { authOptions } from './lib/constants';

jest.mock('./lib/prismadb.ts', () => ({
  __esModule: true,
  default: mockDeep<PrismaClient>()
}));

// global.fetch = fetch;
// global.Headers = Headers;
// global.Request = Request;
// global.Response = Response;
// global.AbortController = AbortController;

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn()
  }))
});

jest.mock('./lib/constants/index.ts', () => ({
  // __esModule: true,
  authOptions: {
    adapter: undefined,
    providers: [],
    callbacks: {
      async signIn({}) {
        return true;
      },
      async jwt({}) {
        return {};
      },
      async session({}) {
        return {};
      }
    }
  }
}));

export const authOptionsMock =
  authOptions as unknown as DeepMockProxy<AuthOptions>;
export const prismaMock = prisma as unknown as DeepMockProxy<PrismaClient>;
