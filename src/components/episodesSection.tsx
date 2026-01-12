import { Character } from "@/types";
import EpisodesList from "./episodeList"

interface EpisodesSectionProps {
    character1: Character | null;
    character2: Character | null;
    ids1: number[];
    ids2: number[];
    shared: number[];
    showEpisodes: Character | null;
}

export const EpisodesSection = ({ character1, character2, ids1, ids2, shared, showEpisodes }: EpisodesSectionProps) => {
    const isDesktop = window.innerWidth >= 1024;


    return !showEpisodes ? (
        <div className="px-2 py-3 text-center border-2 border-red-500 mb-4 rounded-lg font-sans text-sm">
            Please, select one character of each side to get the list of episodes they appeared in.
        </div>
    ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pb-20">
            <EpisodesList
                title={character1?.name}
                characterId={character1?.id}
                episodeIds={ids1}
                variant="character1"
                image={character1?.image}
            />
            {
                !isDesktop ? (
                    <>
                        <EpisodesList
                            title={character2?.name}
                            characterId={character2?.id}
                            episodeIds={ids2}
                            variant="character2"
                            image={character2?.image}

                        />
                        <EpisodesList
                            title="Shared Episodes"
                            episodeIds={shared}
                            variant="shared"
                            characters={`${character1?.name} & ${character2?.name}`}
                        />
                    </>
                ) : (
                    <>
                        <EpisodesList
                            title="Shared Episodes"
                            episodeIds={shared}
                            variant="shared"
                            characters={`${character1?.name} & ${character2?.name}`}
                        />
                        <EpisodesList
                            title={character2?.name}
                            characterId={character2?.id}
                            episodeIds={ids2}
                            variant="character2"
                            image={character2?.image}

                        />
                    </>
                )
            }
        </div>
    );
}