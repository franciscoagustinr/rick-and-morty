'use client';
import Header from "@/components/header";
import CharacterSection from "@/components/characterSection";
import EpisodesList from "@/components/episodeList";
import { useState, useMemo } from "react";
import { Character } from "@/types";
import { getComparisonEpisodes, getIds } from "@/utils/episodeHelpers";

export default function Home() {
  const [character1, setCharacter1] = useState<Character | null>(null);
  const [character2, setCharacter2] = useState<Character | null>(null);

  const { shared } = useMemo(
    () => getComparisonEpisodes(character1, character2),
    [character1, character2]
  );
  const ids1 = useMemo(() => getIds(character1), [character1]);
  const ids2 = useMemo(() => getIds(character2), [character2]);
  const showEpisodes = character1 || character2;

  console.log(character1)

  return (
    <main className="min-h-screen w-full bg-white dark:bg-black dark:text-white px-4">
      <Header />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-12">
        <CharacterSection
          title="Character #1"
          selectedCharacter={character1}
          onSelectCharacter={setCharacter1}
        />
        <CharacterSection
          title="Character #2"
          selectedCharacter={character2}
          onSelectCharacter={setCharacter2}
        />
      </div>

      {!showEpisodes ? (
        <p>
          no characters selected
        </p>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pb-20">
          <EpisodesList
            title={character1?.name}
            characterId={character1?.id}
            episodeIds={ids1}
            variant="character1"
          />
          <EpisodesList
            title="Shared Episodes"
            episodeIds={shared}
            variant="shared"
          />
          <EpisodesList
            title={character2?.name}
            characterId={character2?.id}
            episodeIds={ids2}
            variant="character2"
          />
        </div>
      )}
    </main>
  );
}