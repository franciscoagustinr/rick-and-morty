import axios from "axios";

const BASE_URL = "https://rickandmortyapi.com/api";

export const ApiCall = {
  getCharacters: async (page: number = 1) => {
    const response = await axios.get(`${BASE_URL}/character?page=${page}`);
    return response.data;
  },
};
