/**
 * @file Home.test.tsx
 * @description Unit tests for the Home component.
 */

import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Home from './Home';

describe('Home Page', () => {
  it('Debe renderizar el título de la aplicación', () => {
    const { getByText } = render(<Home />);
    expect(getByText(/Futurama/i)).toBeDefined();
  });
});