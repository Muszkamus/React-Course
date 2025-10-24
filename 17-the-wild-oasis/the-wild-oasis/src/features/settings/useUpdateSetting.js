import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateSetting as updateSettingApi } from "../../services/apiSettings";

export function useUpdateSetting() {
  /* ----------- React Query Setup ----------- */
  const queryClient = useQueryClient();
  // Gives direct access to the cache — used to refresh queries after mutation

  /* ----------- Mutation Hook ----------- */
  const { mutate: updateSetting, isLoading: isUpdating } = useMutation({
    mutationFn: updateSettingApi, // Function that performs the actual API call (PUT/PATCH)

    // Called automatically when mutation succeeds
    onSuccess: () => {
      toast.success("Settings successfully edited"); // UI feedback
      queryClient.invalidateQueries({ queryKey: ["settings"] });
      // Forces React Query to refetch latest settings → keeps UI in sync
    },

    // Handles API or network errors gracefully
    onError: (err) => toast.error(err.message),
  });

  // Expose mutation state + trigger function to components
  return { isUpdating, updateSetting };
}
