import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabins";

export function useCabins() {
  // Fetch cabin data from the API using React Query
  const {
    isLoading, // True while data is being fetched
    data: cabins, // The fetched cabins data (renamed from "data")
    error, // Contains error info if the fetch fails
  } = useQuery({
    queryKey: ["cabins"], // Unique key to identify and cache this query
    queryFn: getCabins, // Function that performs the actual data fetch
  });

  return { isLoading, cabins, error };
}
