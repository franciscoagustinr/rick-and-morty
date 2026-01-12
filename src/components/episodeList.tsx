import { useEpisodes } from "@/hooks/useEpisodes";
import EpisodeListHeader from "./episodeListHeader";
import EpisodeDetails from "./episodeDetails";

interface EpisodesListProps {
    title: string | undefined;
    episodeIds: number[];
    variant: "character1" | "character2" | "shared";
    characterId?: number;
    characters?: string;
    image?: string;
}

export default function EpisodesList({ title, episodeIds, variant, characterId, characters, image }: EpisodesListProps) {
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
            <EpisodeListHeader title={title} episodeIds={episodeIds} characterId={characterId} characters={characters} image={image} />

            {!isLoading && episodeIds.length === 0 && (
                <p className="text-gray-500 italic text-sm text-center py-10">No episodes found.</p>
            )}
            {isError && <p className="text-red-500 text-sm">{isError}</p>}

            <div className="space-y-2 max-h-125 overflow-y-auto pr-2">
                {episodes?.map((episode) => (
                    <EpisodeDetails key={episode.id} episode={episode} />
                ))}
            </div>
        </div>
    );
}