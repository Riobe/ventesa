import React from 'react';
import { render, waitFor, fireEvent } from '@testing-library/react';

import FullCharacterForm from './FullCharacterForm.jsx';
describe('Form rendering and validation', () => {
  let fillOutForm;
  let queries;

  beforeEach(() => {
    const containerQueries = render(<FullCharacterForm />);
    queries = containerQueries;

    const { getByLabelText } = queries;

    fillOutForm = ({ except = [] } = {}) => {
      if (
        !Array.isArray(except) ||
        (except.length > 0 && typeof except[0] !== 'string')
      ) {
        throw new Error(
          'Cannot call fillOutForm with an except value that is not an array of strings.',
        );
      }

      const defaultValues = {
        'Exalt Name': 'Arslan',
        essence: 1,
        'Exalt Type': 'solar',
        description: 'This is a test description',
        force: 4,
        finesse: 2,
        fortitude: 1,
        soak: 1,
        hardness: 2,
        parry: 0,
        evasion: 2,
        resolve: 3,
        motes: 7,
        athletics: 5,
        awareness: 3,
        closeCombat: 4,
        craft: 0,
        embassy: 1,
        integrity: 2,
        navigate: 2,
        performance: 3,
        physique: 5,
        presence: 3,
        rangedCombat: 0,
        sagacity: 2,
        stealth: 1,
        war: 2,
      };

      Object.entries(defaultValues).forEach(([label, value]) => {
        if (except.includes(label)) {
          return;
        }

        fireEvent.change(getByLabelText(label), { target: { value } });
      });
    };
  });

  it('should disable submit button with an empty form', async () => {
    const { getByRole } = queries;

    expect(getByRole('button', { name: /submit/i })).toBeDisabled();
  });

  it('should submit the form with correct values', async () => {
    const { getByRole, container } = queries;

    expect(getByRole('button', { name: /submit/i })).toBeDisabled();

    fillOutForm();

    expect(getByRole('button', { name: /submit/i })).toBeEnabled();

    fireEvent.click(getByRole('button'), { name: /sumbit/i });

    expect(getByRole('button', { name: /submit/i })).toBeDisabled();
    await waitFor(
      () => {
        expect(getByRole('button', { name: /submit/i })).toBeEnabled();
      },
      { container },
    );
  });

  it('should error if one of the required values is missing', async () => {
    const { getByRole } = queries;

    fillOutForm({ except: ['Exalt Name'] });

    await waitFor(() => {
      expect(getByRole('button', { name: /submit/i })).toBeDisabled();
    });
  });
});
