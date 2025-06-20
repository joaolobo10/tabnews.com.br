import { render } from '@testing-library/react';
import { useRouter } from 'next/router';
import { useUser } from 'pages/interface'; // O caminho pode variar
import Login from './index'; // O caminho pode variar

// Mock das dependências (hooks)
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));
jest.mock('pages/interface', () => ({
  useUser: jest.fn(),
  createErrorMessage: jest.fn(),
}));

const mockUseRouter = useRouter;
const mockUseUser = useUser;

describe('Login Page useEffect Logic', () => {

  // CT1: Testa o redirecionamento para URL interna
  test('CT1: deve redirecionar para o path interno quando o usuário está logado e o router está pronto', () => {
    const mockReplace = jest.fn();
    mockUseRouter.mockReturnValue({
      isReady: true,
      query: { redirect: '/perfil/usuario' },
      replace: mockReplace,
    });
    mockUseUser.mockReturnValue({ user: { id: 'user-123' } });

    render(<Login />);
    expect(mockReplace).toHaveBeenCalledWith('/perfil/usuario');
  });

  // CT2: Testa o redirecionamento para a home com URL externa
  test('CT2: deve redirecionar para a home (/) quando a URL é externa', () => {
    const mockReplace = jest.fn();
    mockUseRouter.mockReturnValue({
      isReady: true,
      query: { redirect: 'http://externalsite.com' },
      replace: mockReplace,
    });
    mockUseUser.mockReturnValue({ user: { id: 'user-123' } });

    render(<Login />);
    expect(mockReplace).toHaveBeenCalledWith('/');
  });

  // CT3: Testa o caso de usuário não logado
  test('CT3: não deve redirecionar se o usuário não estiver logado', () => {
    const mockReplace = jest.fn();
    mockUseRouter.mockReturnValue({
      isReady: true,
      query: { redirect: '/perfil' },
      replace: mockReplace,
    });
    mockUseUser.mockReturnValue({ user: null }); // Usuário nulo

    render(<Login />);
    expect(mockReplace).not.toHaveBeenCalled();
  });

  // CT4: Testa o caso do router não estar pronto
  test('CT4: não deve redirecionar se o router não estiver pronto', () => {
    const mockReplace = jest.fn();
    mockUseRouter.mockReturnValue({
      isReady: false, // Router não está pronto
      query: { redirect: '/perfil' },
      replace: mockReplace,
    });
    mockUseUser.mockReturnValue({ user: { id: 'user-123' } });

    render(<Login />);
    expect(mockReplace).not.toHaveBeenCalled();
  });
});