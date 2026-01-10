'use client';
import { useCharacters } from "./hooks/useCharacters";
import Header from "./components/header";

export default function Home() {
  const { data, isLoading, isError } = useCharacters(2);

  return (
    <main className=" min-h-screen w-full  bg-white dark:bg-black dark:text-white">
      <Header />
      <div>
        {isLoading ? (
          <div className="text-white text-center p-3">
            loading characters...
          </div>
        ) : isError ? (
          <div className="text-red text-center p-3">
            error
          </div>
        ) : data?.results?.length ? (
          data.results.map((ch) => (
            <p key={ch.id}>{ch.name}</p>
          ))
        ) : (
          <div className="text-gray-400 text-center p-3">
            no characters found
          </div>
        )}
      </div>
    </main>
  );
}
