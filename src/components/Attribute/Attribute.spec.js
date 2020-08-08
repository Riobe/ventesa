import React from 'react';
import { render } from '@testing-library/react';
import Attribute from './Attribute';

describe('Attribute', () => {
  it('should render successfully.', async () => {
    const testAttribute = 'testing';
    const { getByLabelText, getByText } = render(
      <Attribute name={testAttribute} />,
    );

    const label = getByText(testAttribute);
    expect(label).toBeInTheDocument();

    const dotGroup = getByLabelText(testAttribute);
    expect(dotGroup).toBeInTheDocument();
    expect(dotGroup).toHaveClass('DotGroup');
  });

  it('should bold the header.', async () => {
    const testAttribute = 'testing';
    const { getByText } = render(<Attribute name={testAttribute} />);

    const label = getByText(testAttribute);
    expect(label).toBeInTheDocument();
    expect(label).toHaveStyle(`
      font-weight: 800;
    `);
  });
});
