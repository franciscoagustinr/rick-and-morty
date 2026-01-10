"use client";
import { useState, useEffect } from "react";
import { ApiCall } from "../api/services";

export const useCharacters = (page: number) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCharacters = async () => {
      setIsLoading(true);
      setIsError(null);
      try {
        const response = await ApiCall.getCharacters(page);
        setData(response);
      } catch (err) {
        setIsError("Error al cargar los personajes");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCharacters();
  }, [page]);

  return { data, isLoading, isError };
};
