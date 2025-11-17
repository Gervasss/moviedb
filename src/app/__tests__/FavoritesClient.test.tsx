// --- 1. DECLARAÇÃO DE VARIÁVEIS MOCK  ---
const mockGetTrendingMovies = jest.fn();
const mockGetTopRatedMovies = jest.fn();
const mockGetGenres = jest.fn();
jest.mock('next/navigation', () => ({
    useRouter: () => ({
        push: jest.fn(),
        replace: jest.fn(),
        back: jest.fn(),
        forward: jest.fn(),
        refresh: jest.fn(),
    }),
}));

const mockThemeContextValue = { darkMode: false }; 


import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

// --- 2. MOCKS de Infraestrutura ---

// Mock de API
jest.mock('../../services/api', () => ({
    getTrendingMovies: mockGetTrendingMovies,
    getTopRatedMovies: mockGetTopRatedMovies,
    getGenres: mockGetGenres,
}));

// Mock do localStorage 
const FAVORITE_STORAGE_KEY = 'favoriteMovieIds';
const localStorageMock = (initialData: Record<string, string> = {}) => {
    let store: Record<string, string> = initialData;
    return {
        getItem: jest.fn((key: string): string | null => store[key] || null),
        setItem: jest.fn((key: string, value: number) => {
            store[key] = value.toString();
        }),
        clear: jest.fn(() => { store = {}; }),
    };
};
Object.defineProperty(window, 'localStorage', { value: localStorageMock() });


// Mock do Contexto de Tema (Permite o componente renderizar sem o erro)
const MockThemeContext = React.createContext(mockThemeContextValue);
jest.mock('../../components/ThemeContext/ThemeContext', () => ({
    ThemeContext: MockThemeContext,
    useContext: jest.fn(() => mockThemeContextValue),
}));

// --- Componente Wrapper para os testes BDD (CORREÇÃO DA FALHA useCONTEXT) ---
const ThemeWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    // Envolve o componente com o Provider mockado para satisfazer a checagem interna do TrendingClient
    return (
        <MockThemeContext.Provider value={mockThemeContextValue}>
            {children}
        </MockThemeContext.Provider>
    );
};


import TrendingClient from '../trending/TrendingClient';
import { formatDate } from '@/app/trending/FormatDate'; 

// --- 3. DADOS DE TESTE E TIPAGEM ---

const mockGenres = [{ id: 28, name: 'Ação' }];
type MockMovie = {
    id: number;
    title: string;
    poster_path: string;
    vote_average: number;
    release_date: string;
    genre_ids: number[];
};

const mockMovie: MockMovie = {
    id: 500,
    title: 'Filme BDD',
    poster_path: '/poster.jpg',
    vote_average: 9.0,
    release_date: '2024-03-01',
    genre_ids: [28],
};

// --- 4. SUÍTES DE TESTE TDD/BDD ---

describe('Módulo TDD - Teste de Formatação de Data', () => {
    // O teste TDD passa a falhar de forma controlada (RED phase)
    it('deve retornar o ano correto para datas válidas', () => {
        expect(formatDate('2024-03-01')).toBe('2024');
    });

    // Mantém a falha controlada (RED phase), esperando o comportamento da função não robusta
    it('deve retornar "NaN" ou "N/A" para string vazia ou null', () => {
        const result = formatDate('');
        expect(result === 'N/A' || result === 'NaN').toBe(true);
    });

    
});


describe('Módulo BDD - Interação com Favoritos', () => {

    beforeEach(() => {
        window.localStorage.clear();
        jest.clearAllMocks();

        mockGetTrendingMovies.mockResolvedValue([mockMovie]);
        mockGetTopRatedMovies.mockResolvedValue([mockMovie]);  
        mockGetGenres.mockResolvedValue(mockGenres);
    });


    // --- Cenário BDD: Adicionar filme (Comportamento de Favoritar) ---
    it('Deve permitir ao usuário favoritar um filme e atualizar o estado visual e a persistência', async () => {
        //  DADO QUE: localStorage está vazio (filme não favoritado)
        // Renderiza o componente DENTRO do wrapper do tema (CORREÇÃO DA FALHA useCONTEXT)
        render(<TrendingClient />, { wrapper: ThemeWrapper });

        // Aguarda o filme aparecer
        await screen.findByText('Filme BDD');

        // Verifica o estado inicial do botão (deve ser 'Favoritar ⭐')
        const favoriteButton = screen.getByRole('button', { name: /Favoritar/i });
        expect(favoriteButton).toHaveTextContent('Favoritar ⭐');

        //  QUANDO: O usuário clica em "Favoritar"
        fireEvent.click(favoriteButton);

        //  ENTÃO: Verifica as mudanças de comportamento (visual e persistência TDD)

        // 1. O botão deve mudar para 'Remover'
        await waitFor(() => {
            expect(favoriteButton).toHaveTextContent('Remover');
        });

        // 2. O localStorage deve conter o ID do filme (500)
        const storedIds = JSON.parse(window.localStorage.getItem(FAVORITE_STORAGE_KEY) as string);
        expect(storedIds).toEqual([mockMovie.id]);
    });


    // --- Cenário BDD: Remover filme (Comportamento de Remover) ---
    it('Deve permitir ao usuário remover um filme e reverter o estado visual e a persistência', async () => {
        //  DADO QUE: O filme JÁ está favoritado (simula o estado inicial)
        window.localStorage.setItem(FAVORITE_STORAGE_KEY, JSON.stringify([mockMovie.id]));

        // Renderiza o componente DENTRO do wrapper do tema (CORREÇÃO DA FALHA useCONTEXT)
        render(<TrendingClient />, { wrapper: ThemeWrapper });
        await screen.findByText('Filme BDD');

        // O botão deve começar como 'Remover'
        const removeButton = screen.getByRole('button', { name: /Remover/i });
        expect(removeButton).toHaveTextContent('Remover');

        //  QUANDO: O usuário clica em "Remover"
        fireEvent.click(removeButton);

        //  ENTÃO: Verifica as mudanças de comportamento (visual e persistência TDD)

        // 1. O botão deve mudar para 'Favoritar ⭐'
        await waitFor(() => {
            expect(removeButton).toHaveTextContent('Favoritar ⭐');
        });

        // 2. O localStorage deve estar vazio
        const storedIds = JSON.parse(window.localStorage.getItem(FAVORITE_STORAGE_KEY) as string);
        expect(storedIds).toEqual([]);
    });
});