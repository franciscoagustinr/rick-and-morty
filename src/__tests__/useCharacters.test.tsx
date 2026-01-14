import { renderHook, waitFor } from '@testing-library/react';
import { useCharacters } from '@/hooks/useCharacters';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import * as api from '@/services/api';

const createWrapper = () => {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                retry: false,
            },
        },
    });
    // eslint-disable-next-line react/display-name
    return ({ children }: { children: React.ReactNode }) => (
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
};

jest.mock('@/services/api');

describe('useCharacters', () => {
    it('returns data when successful', async () => {
        const mockData = { results: [{ id: 1, name: 'Rick' }], info: { pages: 1 } };
        (api.getCharacters as jest.Mock).mockResolvedValue(mockData);

        const { result } = renderHook(() => useCharacters(1), {
            wrapper: createWrapper(),
        });

        await waitFor(() => expect(result.current.isLoading).toBe(false));

        expect(result.current.data).toEqual(mockData);
        expect(result.current.isError).toBeNull();
    });

    it('returns error when failed', async () => {
        (api.getCharacters as jest.Mock).mockRejectedValue(new Error('Failed'));

        const { result } = renderHook(() => useCharacters(1), {
            wrapper: createWrapper(),
        });

        await waitFor(() => expect(result.current.isLoading).toBe(false));

        expect(result.current.isError).toBe('Error al cargar los personajes');
    });
});
