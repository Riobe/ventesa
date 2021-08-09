import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { ThemeProvider } from '@chakra-ui/core';

import Attribute from './Attribute';

import theme from '../../theme';

describe('Attribute', () => {
  it('should render successfully.', async () => {
    const testAttribute = 'testing';
    const { getByLabelText, getByText } = render(
      <ThemeProvider theme={theme}>
        <Attribute name={testAttribute} />
      </ThemeProvider>,
    );

    const label = getByText(testAttribute);
    expect(label).toBeInTheDocument();

    const dotGroup = getByLabelText(testAttribute);
    expect(dotGroup).toBeInTheDocument();
    expect(dotGroup).toHaveClass('DotGroup');
  });

  it('should bold the header.', async () => {
    const testAttribute = 'testing';
    const { getByText } = render(
      <ThemeProvider theme={theme}>
        <Attribute name={testAttribute} />
      </ThemeProvider>,
    );

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
      <ThemeProvider theme={theme}>
        <Attribute name={testAttribute} onValueChange={onValueChange} />
      </ThemeProvider>,
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
      <ThemeProvider theme={theme}>
        <Attribute
          name={testAttribute}
          value={testValue}
          onValueChange={onValueChange}
        />
      </ThemeProvider>,
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
