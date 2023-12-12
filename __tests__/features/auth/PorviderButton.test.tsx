import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { signIn } from 'next-auth/react';
import '@testing-library/jest-dom';

import { IProvider } from '@/lib/types';
import { APP_DOMAIN } from '@/lib/constants';
import ProviderButton from '@/components/auth/ProviderButton';

jest.mock('next-auth/react', () => ({
  signIn: jest.fn()
}));

const mockProviderIcons: { [x: string]: React.ReactNode } = {
  Google: <div data-testid="provider-icon" />
};

const mockProvider: Pick<IProvider, 'title' | '_id'> = {
  _id: 'mockProviderId',
  title: 'Google'
};

describe('ProviderButton Component', () => {
  it('renders the component with the correct provider title', () => {
    render(<ProviderButton provider={mockProvider} />);

    const buttonElement = screen.getByText(
      `Sign in with ${mockProvider.title}`
    );
    expect(buttonElement).toBeInTheDocument();
  });

  it('triggers the signIn function with the correct parameters on button click', () => {
    render(<ProviderButton provider={mockProvider} />);

    const buttonElement = screen.getByText(
      `Sign in with ${mockProvider.title}`
    );
    fireEvent.click(buttonElement);

    expect(signIn).toHaveBeenCalledWith(mockProvider._id, {
      callbackUrl: APP_DOMAIN
    });
  });

  it('displays the provider icon', () => {
    render(<ProviderButton provider={mockProvider} />);

    const iconElement = screen.getByTestId('provider-icon'); // Add data-testid="provider-icon" to the element containing the provider icon
    expect(iconElement).toBeInTheDocument();
  });
});
