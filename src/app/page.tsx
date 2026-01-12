'use client';
import Header from "@/components/header";
import CharacterSection from "@/components/characterSection";
import { useState, useMemo } from "react";
import { Character } from "@/types";
import { getComparisonEpisodes, getIds } from "@/utils/episodeHelpers";
import { EpisodesSection } from "@/components/episodesSection";

export default function Home() {
  const [character1, setCharacter1] = useState<Character | null>(null);
  const [character2, setCharacter2] = useState<Character | null>(null);

  const { shared } = useMemo(
    () => getComparisonEpisodes(character1, character2),
    [character1, character2]
  );
  const ids1 = useMemo(() => getIds(character1), [character1]);
  const ids2 = useMemo(() => getIds(character2), [character2]);
  const showEpisodes = character1 && character2;

  return (
    <main className="min-h-screen w-full bg-white dark:bg-black dark:text-white px-4 font-sans">
      <Header />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
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

      <EpisodesSection character1={character1} character2={character2} ids1={ids1} ids2={ids2} shared={shared} showEpisodes={showEpisodes} />
    </main>
  );
}