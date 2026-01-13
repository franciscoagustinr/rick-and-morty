import React, { useRef, useState } from 'react';
import { Character } from '@/types';
import CharacterCard from '@/components/characters/characterCard';
import { useCharacters } from '@/hooks/useCharacters';
import Pagination from '@/components/pagination';
import SelectedCharacterIndicator from './selectedCharacterIndicator';

interface CharacterSectionProps {
    title: string;
    selectedCharacter: Character | null;
    otherSelectedCharacter?: Character | null;
    onSelectCharacter: (character: Character | null) => void;
}

export default function CharacterSection({
    title,
    selectedCharacter,
    otherSelectedCharacter,
    onSelectCharacter,
}: CharacterSectionProps) {
    const [page, setPage] = useState<number>(1);
    const [isExpanded, setIsExpanded] = useState<boolean>(true);
    const titleRef = useRef<HTMLDivElement>(null);

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
        titleRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

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
            <div ref={titleRef} className={`flex gap-2 lg:gap-3 items-center ${!isExpanded ? 'mb-0' : 'mb-3'} lg:mb-5`}>
                <div className='flex flex-col md:flex-row gap-2'>
                    <h2 className="text-lg lg:text-2xl font-bold text-gray-400 underline underline-offset-4 decoration-wavy decoration-yellow-400 ">{title}</h2>
                    <SelectedCharacterIndicator selectedCharacter={selectedCharacter} deleteSelected={deleteSelected} />
                </div>
                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className={`ml-auto lg:hidden p-1 text-gray-400 focus:outline-none transition-transform duration-200 ${!isExpanded ? 'rotate-180' : ''}`}
                    aria-label={isExpanded ? "Collapse section" : "Expand section"}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                </button>
            </div>

            <div className={`${isExpanded ? 'flex flex-col justify-between h-full' : 'hidden'} lg:flex flex-col justify-between h-full`}>
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 justify-items-center">
                    {data?.results.map((character) => (
                        <CharacterCard
                            key={character.id}
                            character={character}
                            isSelected={selectedCharacter?.id === character.id}
                            disabled={otherSelectedCharacter?.id === character.id}
                            onClick={() => onSelectCharacter(character)}
                        />
                    ))}
                </div>
                {data && (
                    <div className=''>
                        <Pagination
                            currentPage={page}
                            totalPages={data.info.pages}
                            onPageChange={handlePageChange}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}