"use client";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { getCharacters } from "@/services/api";

export const useCharacters = (page: number) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["characters", page],
    queryFn: () => getCharacters(page),
    placeholderData: keepPreviousData,
  });

  return {
    data,
    isLoading,
    isError: isError ? "Error al cargar los personajes" : null,
  };
};
