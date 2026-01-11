'use client';
import Header from "@/components/header";
import CharacterSection from "@/components/characterSection";
import { useState } from "react";
import { Character } from "@/types";

export default function Home() {
  const [character1, setCharacter1] = useState<Character | null>(null);
  const [character2, setCharacter2] = useState<Character | null>(null);

  return (
    <main className=" min-h-screen w-full  bg-white dark:bg-black dark:text-white">
      <Header />
      <div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mx-2 mb-12">
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

      </div>
    </main>
  );
}
