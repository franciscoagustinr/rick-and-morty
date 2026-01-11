"use client";
import { useEpisodes } from "@/hooks/useEpisodes";

interface EpisodesListProps {
    title: string | undefined;
    episodeIds: number[];
    variant: "character1" | "character2" | "shared";
    characterId?: number;
}

export default function EpisodesList({ title, episodeIds, variant, characterId }: EpisodesListProps) {
    const { data: episodes, isLoading, isError } = useEpisodes(episodeIds);
    const colors = {
        character1: "border-blue-400 bg-blue-50/10",
        character2: "border-purple-400 bg-purple-50/10",
        shared: "border-green-400 bg-green-50/10",
    };

    if (isLoading && !episodes) {
        return (
            <div className="p-4 border-t-4 rounded-lg animate-pulse">
                <p className="text-center">loading...</p>
            </div>
        );
    }

    return (
        <div className={`p-4 border-t-4 rounded-lg shadow-sm ${colors[variant]}`}>
            <h3 className="text-xl font-bold mb-4 flex justify-between items-center">
                <div className="flex flex-row gap-1.5 items-center">
                    {characterId && (
                        <span className="text-xs text-gray-400 font-semibold font-mono">#{characterId} -</span>
                    )}
                    {title}
                </div>
                <span className="text-sm font-mono">{episodeIds.length}</span>
            </h3>

            {!isLoading && episodeIds.length === 0 && (
                <p className="text-gray-500 italic text-sm text-center py-10">No episodes found.</p>
            )}
            {isError && <p className="text-red-500 text-sm">{isError}</p>}

            <div className="space-y-2 max-h-125 overflow-y-auto pr-2">
                {episodes?.map((episode) => (
                    <div key={episode.id}
                        className="p-3 mr-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-md hover:shadow-md transition-shadow">
                        <p className="font-medium text-sm">{episode.name}</p>
                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                            <span>{episode.episode}</span>
                            <span>{episode.air_date}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}