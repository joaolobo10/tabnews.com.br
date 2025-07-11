import { render, screen } from '@testing-library/react';

import PastTime from '../../../pages/interface/components/PastTime';

describe('PastTime Component', () => {
  it('deve exibir "agora mesmo" para uma data futura', () => {
    const futureDate = new Date();
    futureDate.setMinutes(futureDate.getMinutes() + 5);
    render(<PastTime date={futureDate.toISOString()} />);
    expect(screen.getByText(/agora mesmo/i)).toBeTruthy();
  });

  it('deve exibir o tempo relativo para uma data no passado', () => {
    const pastDate = new Date();
    pastDate.setMinutes(pastDate.getMinutes() - 5);

    render(<PastTime date={pastDate.toISOString()} />);

    const timeElement = screen.getByText(/5 minutos atrás/i);
    expect(timeElement).toBeTruthy();
  });
});
