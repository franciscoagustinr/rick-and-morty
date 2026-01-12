import Image from "next/image";

interface EpisodesListProps {
    title: string | undefined;
    episodeIds: number[];
    characterId?: number;
    characters?: string;
    image?: string;
    onToggle?: () => void;
    isExpanded?: boolean;
}

const EpisodeListHeader = ({ image, title, episodeIds, characterId, characters, onToggle, isExpanded }: EpisodesListProps) => {

    return (
        <>
            <div className="text-xl mb-4 flex justify-between items-center">
                <div className="flex flex-row gap-2 items-center">
                    {image && (
                        <div>
                            <Image
                                src={image}
                                alt={title!}
                                width={60}
                                height={60}
                                className="rounded-full object-contain" />
                        </div>
                    )}
                    <div className="flex flex-col items-start">
                        {characterId && (
                            <span className="text-xs text-gray-400 font-semibold font-mono">#{characterId}</span>
                        )}
                        <div title={title} className="font-bold">
                            {title}
                            {title === 'Shared Episodes' && characters && (
                                <p title={characters} className="text-[10px] text-gray-400 font-light italic truncate">{characters}</p>
                            )}
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <div title={`${title === 'Shared Episodes' ? `Appears together in ${episodeIds.length}/51 total episodes` : `Appears in ${episodeIds.length}/51 total episodes`}`} className="font-mono tracking-wide select-none">
                        <span className="text-base font-semibold">{episodeIds.length}</span><span className="text-xs font-light text-gray-300">/51</span>
                    </div>
                    {onToggle && (
                        <button
                            onClick={onToggle}
                            className={`lg:hidden p-1 text-gray-400 focus:outline-none transition-transform duration-200 ${!isExpanded ? 'rotate-180' : ''}`}
                            aria-label={isExpanded ? "Collapse section" : "Expand section"}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
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
                    )}
                </div>
            </div>
        </>
    )

}
export default EpisodeListHeader;