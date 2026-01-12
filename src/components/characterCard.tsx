import { Character } from '@/types';
import Image from 'next/image';

interface CharacterCardProps {
    character: Character;
    isSelected?: boolean;
    onClick?: () => void;
}

export default function CharacterCard({ character, isSelected, onClick }: CharacterCardProps) {
    const statusColor = {
        Alive: 'bg-green-500',
        Dead: 'bg-red-500',
        unknown: 'bg-gray-500',
    }[character.status] || 'bg-gray-500';

    return (
        <div
            onClick={onClick}
            className={`w-full max-w-36 sm:max-w-none h-full cursor-pointer rounded-lg overflow-hidden border border-gray-200 transition-all duration-300 hover:scale-105 ${isSelected ? 'ring-4 ring-blue-500 scale-105 shadow-lg' : 'shadow-sm'
                }`}
        >
            <div className="relative aspect-square w-full">
                <Image
                    src={character.image}
                    alt={character.name}
                    loading="eager"
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-contain lg:object-cover"
                />
            </div>
            <div className="bg-gray-50 h-full p-2 border-t border-gray-700">
                <h3 title={character.name} className="font-bold text-base text-gray-800 truncate">
                    {character.name}
                </h3>
                <div className="flex items-center gap-1">
                    <span className={`w-2 h-2 rounded-full ${statusColor}`}></span>
                    <span className="text-xs text-gray-600 truncate" title={`${character.status} - ${character.species}`}  >
                        {character.status} - {character.species}
                    </span>
                </div>
            </div>
        </div >
    );
}