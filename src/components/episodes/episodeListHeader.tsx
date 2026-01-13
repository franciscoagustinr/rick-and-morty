import Image from "next/image";
import { useState } from "react";
import CopyButton from "@/components/copyButton";
import ToggleArrowButton from "@/components/toggleArrowButton";

interface EpisodesListProps {
    title: string | undefined;
    episodeIds: number[];
    characterId?: number;
    characters?: string;
    image?: string;
    onToggle?: () => void;
    isExpanded?: boolean;
    onCopy?: () => void;
}

const EpisodeListHeader = ({ image, title, episodeIds, characterId, characters, onToggle, isExpanded, onCopy }: EpisodesListProps) => {
    const [isCopied, setIsCopied] = useState(false);

    const handleCopy = () => {
        if (onCopy) {
            onCopy();
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 3000);
        }
    };

    return (
        <>
            <div className="relative text-xl mb-4 flex justify-between items-start">
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
                    <div className="flex flex-col items-start ">
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
                    <div title={`${title === 'Shared Episodes' ? `Appears together in ${episodeIds.length}/51 total episodes` : `Appears in ${episodeIds.length}/51 total episodes`}`}
                        className="font-mono tracking-wide select-none"
                    >
                        <span className="text-base font-semibold">{episodeIds.length}</span><span className="text-xs font-light text-gray-300">/51</span>
                    </div>
                    {onToggle && (
                        <ToggleArrowButton isExpanded={isExpanded} onToggle={onToggle} />
                    )}
                </div>
                {onCopy && (
                    <CopyButton isCopied={isCopied} handleCopy={handleCopy} quantityEpisodes={episodeIds.length} />
                )}

            </div>

        </>
    )

}
export default EpisodeListHeader;