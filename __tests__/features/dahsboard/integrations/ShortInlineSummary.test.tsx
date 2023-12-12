import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import ShortSummaryWrapper from '@/components/dashboard/integrations/ShortInlineSummary';

const mockButton = (
  <button type="button" onClick={() => {}}>
    Click me
  </button>
);

describe('StatusIndicator Component', () => {
  it('renders the component with "started" status', () => {
    render(
      <ShortSummaryWrapper
        button={mockButton}
        preButtonText="pre-button-text"
        mainText="text"
      />
    );

    const wrapper = screen.getByTestId('short-summary-wrapper');

    expect(wrapper).toHaveClass('my-2');
  });
});
