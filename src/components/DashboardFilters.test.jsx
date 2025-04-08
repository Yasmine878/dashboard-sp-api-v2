
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import DashboardFilters from './DashboardFilters';

describe('DashboardFilters', () => {
  it('déclenche un changement de filtre', () => {
    const mockFn = vi.fn();
    const fournisseurs = ['Biotech S.A.', 'Pharmaco Inc.'];

    render(
      <DashboardFilters
        fournisseurs={fournisseurs}
        selectedFournisseur=""
        onFilterChange={mockFn}
        onDateChange={() => {}}
      />
    );

    fireEvent.change(screen.getByRole('combobox'), {
      target: { value: 'Biotech S.A.' },
    });

    expect(mockFn).toHaveBeenCalledWith('Biotech S.A.');
  });
});
