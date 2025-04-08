import React from 'react';
import '@testing-library/jest-dom';
/// <reference types="vitest" />
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import AlertBox from './AlertBox';

describe('AlertBox', () => {
  it('affiche le message d’alerte', () => {
    render(<AlertBox message="Anomalie détectée" />);
    expect(screen.getByText('Anomalie détectée')).toBeInTheDocument();
  });
});
