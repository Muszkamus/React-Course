import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCreateCabin } from "./useCreateCabin";
import { createEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

export function useEditCabin() {
  /* ----------- React Query Setup ----------- */
  const queryClient = useQueryClient(); // Access query cache for refreshing data

  const { isCreating, createCabin } = useCreateCabin();
  // Mutation for editing an existing cabin
  const { mutate: editCabin, isLoading: isEditing } = useMutation({
    mutationFn: ({ newCabinData, id }) => createEditCabin(newCabinData, id),
    onSuccess: () => {
      toast.success("Cabin successfully edited");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isEditing, editCabin };
}
