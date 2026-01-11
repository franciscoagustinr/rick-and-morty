import React from 'react';
import { Character } from '@/types';
import CharacterCard from '@/components/characterCard';
import { useCharacters } from '@/hooks/useCharacters';
import Pagination from './pagination';

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
        <div className="px-3 py-3 border border-gray-400 my-2 rounded-lg">
            <div className='flex gap-3 items-center mb-5'>
                <h2 className="text-2xl font-bold text-gray-400">{title}</h2>

                {selectedCharacter && (
                    <div className='relative'>
                        <div className="px-3 py-1 bg-blue-50 border border-blue-200 rounded-lg">
                            <p className="text-sm text-blue-600">
                                <span className="font-semibold">Selected:</span> {selectedCharacter.name}
                            </p>
                        </div>
                        <div onClick={deleteSelected} className='absolute -top-2 -right-2.5 cursor-pointer hover:scale-125 transition-all duration-300'>
                            <svg xmlns="http://www.w3.org/2000/svg" x="0" y="0" width="20" height="20" viewBox="0 0 48 48">
                                <path fill="#f44336" d="M44,24c0,11.045-8.955,20-20,20S4,35.045,4,24S12.955,4,24,4S44,12.955,44,24z"></path><path fill="#fff" d="M29.656,15.516l2.828,2.828l-14.14,14.14l-2.828-2.828L29.656,15.516z"></path><path fill="#fff" d="M32.484,29.656l-2.828,2.828l-14.14-14.14l2.828-2.828L32.484,29.656z"></path>
                            </svg>
                        </div>
                    </div>
                )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
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
                <Pagination
                    currentPage={page}
                    totalPages={data.info.pages}
                    onPageChange={setPage}
                />
            )}
        </div>
    );
}