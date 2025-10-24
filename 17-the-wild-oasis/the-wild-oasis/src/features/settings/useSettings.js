import { useQuery } from "@tanstack/react-query";
import { getSettings } from "../../services/apiSettings";

export function useSettings() {
  /* ----------- Query Hook ----------- */
  const {
    isLoading, // True while data is being fetched
    error, // Contains error object if query fails
    data: settings, // Data returned from API (renamed for clarity)
  } = useQuery({
    queryKey: ["settings"], // Unique key — identifies this query in the cache
    queryFn: getSettings, // Function that actually fetches the data (GET request)
  });

  /* ----------- Return State ----------- */
  // Return key states for use in components
  return { isLoading, error, settings };
}
