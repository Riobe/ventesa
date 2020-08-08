import React from 'react';
import { render, fireEvent } from '@testing-library/react';
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

  it('should respond with the new value when clicking a dot.', async () => {
    const testAttribute = 'testing';
    const onValueChange = jest.fn();

    const { getAllByRole } = render(
      <Attribute name={testAttribute} onValueChange={onValueChange} />,
    );

    const dots = getAllByRole('radio');
    dots.forEach((dot, i) => {
      fireEvent.click(dot);
      expect(onValueChange).toHaveBeenCalledWith(i + 1);
    });
  });

  it('should check the right amount of dots based on value.', async () => {
    const testAttribute = 'testing';
    const testValue = 3;
    const onValueChange = jest.fn();

    const { getAllByRole } = render(
      <Attribute
        name={testAttribute}
        value={testValue}
        onValueChange={onValueChange}
      />,
    );

    const dots = getAllByRole('radio');
    dots.forEach((dot, index) => {
      if (index < testValue) {
        expect(dot).toBeChecked();
      } else {
        expect(dot).not.toBeChecked();
      }
    });
  });
});
