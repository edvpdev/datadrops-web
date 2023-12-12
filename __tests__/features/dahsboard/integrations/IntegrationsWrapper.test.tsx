import React from 'react';
import { screen } from '@testing-library/react';
import { server } from '@/mocks/api';
import IntegrationsWrapper from '@/components/dashboard/integrations/IntegrationsWrapper';
import { renderWithProviders } from '@/mocks/store';
import store from 'redux/store';
import { baseApi } from 'redux/apis/baseApi';

beforeAll(() => {
  server.listen();
  console.log(server.listHandlers());
});

// Reset any runtime request handlers we may add during the tests.
afterEach(() => {
  server.resetHandlers();
  store.dispatch(baseApi.util.resetApiState());
});

// Disable API mocking after the tests are done.
afterAll(() => server.close());

xdescribe('IntegrationsWrapper Component', () => {
  it('renders loading state when data is still loading', async () => {
    renderWithProviders(
      <IntegrationsWrapper children={<div>Child component</div>} />
    );

    // Assert that loading state is rendered
    expect(screen.getByText('Loading...')).toBeInTheDocument();

    expect(await screen.findByText('Child component')).toBeInTheDocument();
  });

  //   it('renders error state when there is an error fetching data', async () => {
  //     // Mock the error state for both queries
  //     require('redux/apis/providersApi').useGetProvidersQuery.mockReturnValue({
  //       isError: true
  //     });
  //     require('redux/apis/synchronizationsApi').useGetSynchronizationsQuery.mockReturnValue({
  //       isError: true
  //     });

  //     render(
  //       <QueryClientProvider client={queryClient}>
  //         <IntegrationsWrapper>
  //           <div>Child component</div>
  //         </IntegrationsWrapper>
  //       </QueryClientProvider>
  //     );

  //     // Assert that error state is rendered
  //     expect(screen.getByText('Error')).toBeInTheDocument();
  //   });

  //   it('renders child component when data is successfully fetched', async () => {
  //     // Mock the successful state for both queries
  //     require('redux/apis/providersApi').useGetProvidersQuery.mockReturnValue({
  //       isSuccess: true,
  //       data: [] // Provide mock data as needed
  //     });
  //     require('redux/apis/synchronizationsApi').useGetSynchronizationsQuery.mockReturnValue({
  //       isSuccess: true,
  //       data: [] // Provide mock data as needed
  //     });

  //     render(
  //       <QueryClientProvider client={queryClient}>
  //         <IntegrationsWrapper>
  //           <div>Child component</div>
  //         </IntegrationsWrapper>
  //       </QueryClientProvider>
  //     );

  //     // Assert that the child component is rendered
  //     expect(screen.getByText('Child component')).toBeInTheDocument();
  //   });
});
