import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useSettings } from "./useSettings"; // Custom React Query hook (useQuery) to fetch data
import { useUpdateSetting } from "./useUpdateSetting.js"; // Custom React Query hook (useMutation) to update data
import Spinner from "../../ui/Spinner";

function UpdateSettingsForm() {
  // Destructure query results (data, loading, error) from React Query hook
  const {
    isLoading,
    error,
    settings: {
      minBookingLength,
      maxBookingLength,
      maxGuestsPerBooking,
      breakfastPrice,
    } = {},
  } = useSettings();

  //  Destructure mutation function + status from useMutation
  const { isUpdating, updateSetting } = useUpdateSetting();

  //  Show loading spinner while query is fetching
  if (isLoading) return <Spinner />;

  //  Generic handler to update a single field via mutation when input loses focus
  function handleUpdate(e, field) {
    const { value } = e.target;
    if (!value) return;
    updateSetting({ [field]: value }); // Triggers React Query mutation + cache invalidation
  }

  //  Controlled UI: display fetched values and update each field onBlur
  return (
    <Form>
      <FormRow label="Minimum nights/booking">
        <Input
          type="number"
          id="min-nights"
          defaultValue={minBookingLength}
          disabled={isUpdating} // Disable during mutation to prevent race conditions
          onBlur={(e) => handleUpdate(e, "minBookingLength")}
        />
      </FormRow>

      <FormRow label="Maximum nights/booking">
        <Input
          type="number"
          id="max-nights"
          defaultValue={maxBookingLength}
          disabled={isUpdating}
          onBlur={(e) => handleUpdate(e, "maxBookingLength")}
        />
      </FormRow>

      <FormRow label="Maximum guests/booking">
        <Input
          type="number"
          id="max-guests"
          defaultValue={maxGuestsPerBooking}
          disabled={isUpdating}
          onBlur={(e) => handleUpdate(e, "maxGuestsPerBooking")}
        />
      </FormRow>

      <FormRow label="Breakfast price">
        <Input
          type="number"
          id="breakfast-price"
          defaultValue={breakfastPrice}
          disabled={isUpdating}
          onBlur={(e) => handleUpdate(e, "breakfastPrice")}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
