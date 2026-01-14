import { getIds, getComparisonEpisodes } from "@/utils/episodeHelpers";
import { Character } from "@/types";

const mockCharacter = (id: number, episodes: string[]): Character => ({
  id,
  name: `Char ${id}`,
  status: "Alive",
  species: "Human",
  type: "",
  gender: "Male",
  origin: { name: "Earth", url: "" },
  location: { name: "Earth", url: "" },
  image: "",
  episode: episodes,
  url: "",
  created: "",
});

describe("episodeHelpers", () => {
  describe("getIds", () => {
    it("should return empty array if character is null", () => {
      expect(getIds(null)).toEqual([]);
    });

    it("should return IDs from episode URLs", () => {
      const char = mockCharacter(1, [
        "https://rickandmortyapi.com/api/episode/1",
        "https://rickandmortyapi.com/api/episode/2",
      ]);
      expect(getIds(char)).toEqual([1, 2]);
    });
  });

  describe("getComparisonEpisodes", () => {
    it("should not display comparison if any character is null", () => {
      const char1 = mockCharacter(1, ["url/1"]);
      expect(getComparisonEpisodes(null, null)).toEqual({
        only1: [],
        only2: [],
        shared: [],
      });
      expect(getComparisonEpisodes(char1, null)).toEqual({
        only1: [1],
        only2: [],
        shared: [],
      });
      expect(getComparisonEpisodes(null, char1)).toEqual({
        only1: [],
        only2: [1],
        shared: [],
      });
    });

    it("should handle null values", () => {
      const char1 = mockCharacter(1, ["url/1"]);
      expect(getComparisonEpisodes(null, null)).toEqual({
        only1: [],
        only2: [],
        shared: [],
      });

      expect(getComparisonEpisodes(char1, null)).toEqual({
        only1: [1],
        only2: [],
        shared: [],
      });

      expect(getComparisonEpisodes(null, char1)).toEqual({
        only1: [],
        only2: [1],
        shared: [],
      });
    });

    it("should categorize episodes", () => {
      const char1 = mockCharacter(1, ["url/1", "url/2", "url/3"]);
      const char2 = mockCharacter(2, ["url/2", "url/3", "url/4"]);

      const result = getComparisonEpisodes(char1, char2);

      expect(result.only1).toEqual([1]);
      expect(result.shared).toEqual([2, 3]);
      expect(result.only2).toEqual([4]);
    });
  });
});
