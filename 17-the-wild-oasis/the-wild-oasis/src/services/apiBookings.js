import { getToday } from "../utils/helpers";
import supabase from "./supabase";

/**
 * Fetch a single booking by its ID.
 * Includes related cabin and guest data through foreign key relationships.
 */
export async function getBooking(id) {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, cabins(*), guests(*)") // Joins related tables
    .eq("id", id)
    .single(); // Ensures only one record is returned

  if (error) {
    console.error(error);
    throw new Error("Booking not found");
  }

  return data;
}

/**
 * Get all bookings created after a specified date.
 * Useful for showing recent activity or revenue in dashboards.
 */
export async function getBookingsAfterDate(date) {
  const { data, error } = await supabase
    .from("bookings")
    .select("created_at, totalPrice, extrasPrice") // Select only needed fields
    .gte("created_at", date)
    .lte("created_at", getToday({ end: true })); // Limit to today’s end date

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data;
}

/**
 * Get all stays (bookings) that started after a specified date.
 * Includes guest information for display in activity or occupancy reports.
 */
export async function getStaysAfterDate(date) {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, guests(fullName)") // Include guest full name only
    .gte("startDate", date)
    .lte("startDate", getToday()); // Up to today's date

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data;
}

/**
 * Get all stays where there is activity today (check-in or check-out).
 * Uses logical OR in Supabase filter to match both conditions.
 */
export async function getStaysTodayActivity() {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, guests(fullName, nationality, countryFlag)")
    .or(
      `and(status.eq.unconfirmed,startDate.eq.${getToday()}),and(status.eq.checked-in,endDate.eq.${getToday()})`
    ) // Returns stays checking in or out today
    .order("created_at");

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data;
}

/**
 * Update a specific booking by ID.
 * Accepts an object of fields to update.
 */
export async function updateBooking(id, obj) {
  const { data, error } = await supabase
    .from("bookings")
    .update(obj) // Partial update (PATCH)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking could not be updated");
  }

  return data;
}

/**
 * Delete a booking by ID.
 * Be aware of Supabase Row-Level Security (RLS) policies.
 */
export async function deleteBooking(id) {
  const { data, error } = await supabase.from("bookings").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Booking could not be deleted");
  }

  return data;
}
