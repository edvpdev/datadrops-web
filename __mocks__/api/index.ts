import { http, HttpResponse, delay } from 'msw';
import { setupServer } from 'msw/node';
import { mockEntities } from '../data/entities.mock';
import { mockSynchronizations } from '../data/synchronizations.mock';
import { mockProviders } from '../data/providers.mock';

typeof clearImmediate !== 'undefined';

global.structuredClone = jest.fn((val) => {
  return JSON.parse(JSON.stringify(val));
});

export const handlers = [
  http.get(
    `${process.env.NEXT_PUBLIC_API_URL}/entities/mini/google/google-labels`,
    async () => {
      await delay(150);
      return HttpResponse.json(mockEntities.map((el) => el['data']));
    }
  ),
  http.get(`${process.env.NEXT_PUBLIC_API_URL}/providerss`, async () => {
    console.log(process.env.NODE_ENV);
    await delay(150);
    return HttpResponse.json(mockProviders);
  }),
  http.get(
    `${process.env.NEXT_PUBLIC_API_URL}/synchronizations`,
    async ({ params }) => {
      console.log(params);
      await delay(150);
      return HttpResponse.json(mockSynchronizations);
    }
  ),
  http.post(`${process.env.NEXT_PUBLIC_API_URL}/synchronizations`, async () => {
    await delay(150);
    return HttpResponse.json(mockSynchronizations[0]);
  })
];

export const server = setupServer(...handlers);
