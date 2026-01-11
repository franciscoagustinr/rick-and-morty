"use client";
import { useQuery } from "@tanstack/react-query";
import { getEpisodes } from "@/services/api";

export const useEpisodes = (ids: number[]) => {
  const { data, isLoading, isFetching, isError } = useQuery({
    queryKey: ["episodes", ids],
    queryFn: () => getEpisodes(ids),
    placeholderData: undefined,
    enabled: ids.length > 0,
  });

  return {
    data,
    isLoading: isLoading || isFetching,
    isError: isError ? "Error al cargar" : null,
  };
};
