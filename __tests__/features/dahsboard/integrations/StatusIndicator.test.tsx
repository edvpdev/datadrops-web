import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import StatusIndicator from '@/components/dashboard/integrations/StatusIndicator';

describe('StatusIndicator Component', () => {
  it('renders the component with "started" status', () => {
    render(<StatusIndicator status="started" />);

    const indicatorElement = screen.getByTestId('status-indicator');
    const circleDiv = indicatorElement.firstChild;

    expect(circleDiv).toHaveClass('bg-secondary');
  });

  it('renders the component with "finished" status', () => {
    render(<StatusIndicator status="finished" />);

    const indicatorElement = screen.getByTestId('status-indicator');
    const circleDiv = indicatorElement.firstChild;

    expect(circleDiv).toHaveClass('bg-success');
  });

  it('renders the component with "failed" status', () => {
    render(<StatusIndicator status="failed" />);

    const indicatorElement = screen.getByTestId('status-indicator');
    const circleDiv = indicatorElement.firstChild;

    // expect(indicatorElement).toHaveClass('bg-secondary');
    expect(circleDiv).toHaveClass('bg-error');
  });

  it('renders null for unknown status', () => {
    render(<StatusIndicator status="random" />);

    const indicatorElement = screen.queryByTestId('status-indicator');
    const circleDiv = indicatorElement?.firstChild || null;

    expect(indicatorElement).toBeNull();
    expect(circleDiv).toBeNull();
  });
});
