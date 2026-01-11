import { Character } from '@/types';

export const getIds = (char: Character | null): number[] =>
    char ? char.episode.map(url => Number(url.split('/').pop())) : [];

export const getComparisonEpisodes = (
    char1: Character | null,
    char2: Character | null
) => {
    const ids1 = getIds(char1);
    const ids2 = getIds(char2);

    if (!char1 || !char2) {
        return { only1: ids1, only2: ids2, shared: [] };
    }

    const set1 = new Set(ids1);
    const set2 = new Set(ids2);

    return {
        only1: ids1.filter(id => !set2.has(id)),
        shared: ids1.filter(id => set2.has(id)),
        only2: ids2.filter(id => !set1.has(id))
    };
};