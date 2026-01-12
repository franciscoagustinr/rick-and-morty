import Image from "next/image";

interface EpisodesListProps {
    title: string | undefined;
    episodeIds: number[];
    characterId?: number;
    characters?: string;
    image?: string;
}

const EpisodeListHeader = ({ image, title, episodeIds, characterId, characters }: EpisodesListProps) => {

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
                <div title={`${title === 'Shared Episodes' ? `Appears together in ${episodeIds.length}/51 total episodes` : `Appears in ${episodeIds.length}/51 total episodes`}`} className="font-mono tracking-wide select-none">
                    <span className="text-base font-semibold">{episodeIds.length}</span><span className="text-xs font-light text-gray-300">/51</span>
                </div>
            </div>
        </>
    )

}
export default EpisodeListHeader;