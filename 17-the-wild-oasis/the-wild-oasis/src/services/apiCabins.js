import supabase, { supabaseUrl } from "./supabase";

// Fetch all cabins from the "cabins" table
export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*"); // Query all cabin rows

  if (error) {
    console.log(error);
    throw new Error("Cabins could not be loaded");
  }
  return data; // Return the list of cabins
}

// Create a new cabin or edit an existing one
export async function createEditCabin(newCabin, id) {
  // Check if image is already hosted in Supabase (not a new upload)
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

  // Generate a unique name for the uploaded image and its public URL
  const imageName = `${Math.random()}-${newCabin.image.name}`.replace("/", "");
  const imagePath = hasImagePath
    ? newCabin.image // Reuse existing image if already uploaded
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  // Build base query
  let query = supabase.from("cabins");

  // CREATE: if no ID is passed
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

  // EDIT: if ID is provided
  if (id)
    query = query
      .update({ ...newCabin, image: imagePath }) // Update cabin fields
      .eq("id", id) // Match by ID
      .select(); // Return updated record

  // Execute query and retrieve single cabin entry
  const { data, error } = await query.select().single();

  if (error) {
    console.log(error);
    throw new Error("Cabin could not be created or updated");
  }

  // Upload image to Supabase storage (only if it’s a new image)
  if (!hasImagePath) {
    const { error: storageError } = await supabase.storage
      .from("cabin-images")
      .upload(imageName, newCabin.image);

    // If image upload fails, remove the record
    if (storageError) {
      await supabase.from("cabins").delete().eq("id", data.id);
      console.log(storageError);
      throw new Error("Cabin image could not be uploaded");
    }
  }

  return data; // Return created or updated cabin
}

// Delete a cabin by its ID
export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id); // Match and delete by ID

  if (error) {
    console.log(error);
    throw new Error("Cabin could not be deleted");
  }
  return data; // Return deleted record (if any)
}
