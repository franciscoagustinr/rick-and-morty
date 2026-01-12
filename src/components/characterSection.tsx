import React from 'react';
import { Character } from '@/types';
import CharacterCard from '@/components/characterCard';
import { useCharacters } from '@/hooks/useCharacters';
import Pagination from './pagination';
import SelectedCharacterIndicator from './selectedCharacterIndicator';

interface CharacterSectionProps {
    title: string;
    selectedCharacter: Character | null;
    onSelectCharacter: (character: Character | null) => void;
}

export default function CharacterSection({
    title,
    selectedCharacter,
    onSelectCharacter,
}: CharacterSectionProps) {
    const [page, setPage] = React.useState(1);
    const { data, isLoading, isError } = useCharacters(page);
    const deleteSelected = () => {
        if (selectedCharacter) {
            onSelectCharacter(null);
        }
    };


    if (isLoading) {
        return (
            <div className="px-3 py-2 border border-gray-400 my-2 rounded-lg">
                <h2 className="text-2xl font-bold text-gray-400">{title}</h2>
                <div className="flex flex-col justify-center items-center gap-4 h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-blue-500" />
                    <p className='text-gray-200 text-sm'>Loading data</p>
                </div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="px-3 py-2 border border-gray-400 my-2 rounded-lg">
                <h2 className="text-2xl font-bold text-gray-400">{title}</h2>
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                    {isError}
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col px-3 py-3 border border-gray-400 my-2 rounded-lg">
            <div className='flex gap-3 items-center mb-5'>
                <h2 className="text-xl lg:text-2xl font-bold text-gray-400 underline underline-offset-4 decoration-wavy decoration-yellow-400 ">{title}</h2>
                <SelectedCharacterIndicator selectedCharacter={selectedCharacter} deleteSelected={deleteSelected} />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 justify-items-center">
                {data?.results.map((character) => (
                    <CharacterCard
                        key={character.id}
                        character={character}
                        isSelected={selectedCharacter?.id === character.id}
                        onClick={() => onSelectCharacter(character)}
                    />
                ))}
            </div>
            {data && (
                <div className='mt-auto'>
                    <Pagination
                        currentPage={page}
                        totalPages={data.info.pages}
                        onPageChange={setPage}
                    />
                </div>
            )}
        </div>
    );
}