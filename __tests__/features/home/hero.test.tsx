import { render, screen } from '@testing-library/react';

import '@testing-library/jest-dom';
import Hero from '@/components/home/hero';

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

describe('Hero Component', () => {
  it('renders the component with the provided props', () => {
    render(<Hero className="custom-class" />);

    // Use `screen` to query the rendered elements
    const heroElement = screen.getByTestId('hero'); // Add data-testid="hero" to the outer div in your component

    // Use jest-dom custom matchers
    expect(heroElement).toBeInTheDocument();
    expect(heroElement).toHaveClass('custom-class');
  });

  it('displays the Datadrops logo with the correct attributes', () => {
    render(<Hero />);

    const logoImage = screen.getByAltText('Datadrops Logo');

    expect(logoImage).toBeInTheDocument();
    expect(logoImage).toHaveAttribute('width', '240');
    expect(logoImage).toHaveAttribute('height', '54');
  });

  it('renders the heading with the correct text', () => {
    render(<Hero />);

    const headingElement = screen.getByText(/Inspect Drops of Your Data With/);

    expect(headingElement).toBeInTheDocument();
    expect(headingElement).toHaveClass('font-extrabold');
  });

  it('renders the "Get Started" button with a link to "/sign-in"', () => {
    render(<Hero />);

    const getStartedButton = screen.getByText('Get Started');
    const linkElement = screen.getByRole('link', { name: 'Get Started' });

    expect(getStartedButton).toBeInTheDocument();
    expect(linkElement).toHaveAttribute('href', '/sign-in');
  });
});
