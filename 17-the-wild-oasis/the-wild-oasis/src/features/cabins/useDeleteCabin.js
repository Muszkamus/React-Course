import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCabin as deleteCabinApi } from "../../services/apiCabins";
import toast from "react-hot-toast";

export function useDeleteCabin() {
  // Access React Query's client to manually refetch or update cache
  const queryClient = useQueryClient();

  // Mutation for deleting a cabin (React Query handles async + cache)
  const { isLoading: isDeleting, mutate: deleteCabin } = useMutation({
    mutationFn: deleteCabinApi, // The async function that performs the deletion
    onSuccess: () => {
      toast.success("Cabin successfully deleted"); // Notify user of success
      queryClient.invalidateQueries({
        queryKey: ["cabins"], // Refresh the cabins list after deletion
      });
    },
    onError: (err) => toast.error(err.message), // Show error message if deletion fails
  });

  return { isDeleting, deleteCabin };
}
