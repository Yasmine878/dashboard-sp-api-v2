import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import Dashboard from './Dashboard';

vi.mock('chart.js/auto', async () => {
    const actual = await vi.importActual('chart.js/auto');
    return {
      ...actual,
      default: {
        ...actual.default,
        // Simuler l'enregistrement du scale "category"
        register: vi.fn(),
      },
    };
  });
  

// 🧪 Mock global fetch
vi.stubGlobal('fetch', vi.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve([
      {
        fournisseur: 'Biotech S.A.',
        date: '07/04/2025',
        heure: '08:15',
        durée: '2m35s',
        commandes: 324,
      },
    ]),
  })
));

describe('Dashboard - Tests d’intégration', () => {
  it('charge et affiche les données API', async () => {
    render(<Dashboard />);
    await waitFor(() => {
      const cell = screen.getByRole('cell', { name: 'Biotech S.A.' });
      expect(cell).toBeInTheDocument();
    });
  });

  it('rafraîchit les données quand on clique sur le bouton', async () => {
    render(<Dashboard />);
    const button = screen.getByRole('button', { name: /rafraîchir/i });
    await userEvent.click(button);
    await waitFor(() => {
      expect(screen.getByText('Biotech S.A.')).toBeInTheDocument();
    });
  });

  it('affiche le titre du tableau de bord', () => {
    render(<Dashboard />);
    expect(screen.getByText(/Tableau de bord/i)).toBeInTheDocument();
  });
});
