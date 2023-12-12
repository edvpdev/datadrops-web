import { render, screen } from '@testing-library/react';

import '@testing-library/jest-dom';
import Home from '@/app/home/page';

// jest.mock('next-auth/react', () => {
//   const originalModule = jest.requireActual('next-auth/react');
//   const mockSession = {
//     expires: new Date(Date.now() + 2 * 86400).toISOString(),
//     user: { username: 'admin' }
//   };
//   return {
//     __esModule: true,
//     ...originalModule,
//     useSession: jest.fn(() => {
//       return { data: mockSession, status: 'authenticated' }; // return type is [] in v3 but changed to {} in v4
//     })
//   };
// });

describe('Home', () => {
  it('renders the component with the provided props', () => {
    render(<Home />);

    // Use `screen` to query the rendered elements
    const heroElement = screen.getByTestId('hero'); // Add data-testid="hero" to the outer div in your component

    // Use jest-dom custom matchers
    expect(heroElement).toBeInTheDocument();
  });
});
