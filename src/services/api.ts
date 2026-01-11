import { CharactersResponse } from "@/types";
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
