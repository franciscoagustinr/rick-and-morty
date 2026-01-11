import { CharactersResponse, Episode } from "@/types";
import axios from "axios";

const BASE_URL = "https://rickandmortyapi.com/api";

export const getCharacters = async (
  page: number = 1
): Promise<CharactersResponse> => {
  const response = await axios.get<CharactersResponse>(
    `${BASE_URL}/character`,
    { params: { page } }
  );
  return response.data;
};

export const getEpisodes = async (
  ids: number | number[]
): Promise<Episode[]> => {
  if (Array.isArray(ids) && ids.length === 0) return [];

  const idParam = Array.isArray(ids) ? ids.join(",") : ids;
  const response = await axios.get<Episode | Episode[]>(
    `${BASE_URL}/episode/${idParam}`
  );

  return Array.isArray(response.data) ? response.data : [response.data];
};
