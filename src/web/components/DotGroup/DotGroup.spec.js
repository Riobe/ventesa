import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import DotGroup from './DotGroup';

describe('DotGroup', () => {
  describe('rendering', () => {
    it('should render successfully.', async () => {
      const { getByRole } = render(<DotGroup />);

      const dotGroup = getByRole('radiogroup');

      expect(dotGroup).toBeInTheDocument();
      expect(dotGroup).not.toBeEmpty();
      expect(dotGroup).toHaveClass('DotGroup');
    });

    it('should have 5 unchecked dots by default.', async () => {
      const { getAllByRole } = render(<DotGroup />);

      const dots = getAllByRole('radio');

      expect(dots.length).toBe(5);
      dots.forEach(dot => {
        expect(dot).not.toBeChecked();
      });
    });

    it('should render an zero dot if told to.', async () => {
      const { getAllByRole } = render(<DotGroup zeroDot={true} />);

      const dots = getAllByRole('radio');

      expect(dots.length).toBe(6);
      expect(dots[0]).toHaveStyle(`
        background-color: transparent;
        border: 0.2rem dashed black;
      `);
    });

    it('should render the amount of dots given as a maximum.', async () => {
      const { getAllByRole } = render(<DotGroup maxDots={3} />);

      const dots = getAllByRole('radio');

      expect(dots.length).toBe(3);
    });

    it('should make max + 1 dots if outputting a zero dot.', async () => {
      const { getAllByRole } = render(<DotGroup maxDots={3} zeroDot={true} />);

      const dots = getAllByRole('radio');

      expect(dots.length).toBe(4);
      expect(dots[0]).toHaveStyle(`
        background-color: transparent;
        border: 0.2rem dashed black;
      `);
    });

    it('should check dots with a value between zero and max.', async () => {
      const { getAllByRole } = render(<DotGroup value={1} maxDots={2} />);

      const dots = getAllByRole('radio');

      expect(dots.length).toBe(2);
      expect(dots[0]).toBeChecked();
      expect(dots[1]).not.toBeChecked();
    });

    it('should check no dots if given a value of zero.', async () => {
      const { getAllByRole } = render(<DotGroup value={0} />);

      const dots = getAllByRole('radio');

      expect(dots.length).toBe(5);
      dots.forEach(dot => {
        expect(dot).not.toBeChecked();
      });
    });

    it('should check no dots if given a negative value.', async () => {
      const { getAllByRole } = render(<DotGroup value={-1} />);

      const dots = getAllByRole('radio');

      expect(dots.length).toBe(5);
      dots.forEach(dot => {
        expect(dot).not.toBeChecked();
      });
    });

    it('should check all dots if given value matching max dots.', async () => {
      const { getAllByRole } = render(<DotGroup value={3} maxDots={3} />);

      const dots = getAllByRole('radio');

      expect(dots.length).toBe(3);
      dots.forEach(dot => {
        expect(dot).toBeChecked();
      });
    });

    it('should check all dots if given value above max dots.', async () => {
      const { getAllByRole } = render(<DotGroup value={6} maxDots={3} />);

      const dots = getAllByRole('radio');

      expect(dots.length).toBe(3);
      dots.forEach(dot => {
        expect(dot).toBeChecked();
      });
    });
  });

  describe('interaction', () => {
    it('should emit the value of a clicked dot.', async () => {
      const onValueChange = jest.fn();
      const { getAllByRole } = render(
        <DotGroup onValueChange={onValueChange} />,
      );

      const dots = getAllByRole('radio');

      dots.forEach((dot, i) => {
        fireEvent.click(dot);
        expect(onValueChange).toHaveBeenCalledWith(i + 1);
      });
    });

    it('should emit zero if a zero dot is clicked.', async () => {
      const onValueChange = jest.fn();
      const { getAllByRole } = render(
        <DotGroup zeroDot={true} onValueChange={onValueChange} />,
      );

      const dots = getAllByRole('radio');

      expect(dots.length).toBeGreaterThan(1);
      fireEvent.click(dots[0]);

      expect(onValueChange).toHaveBeenCalledWith(0);
    });

    it('should perform no operation if a dot is clicked without a value changed event handler.', async () => {
      const { getAllByRole } = render(<DotGroup zeroDot={true} />);

      const dots = getAllByRole('radio');

      expect(() => {
        fireEvent.click(dots[0]);
      }).not.toThrow();
    });
  });
});
