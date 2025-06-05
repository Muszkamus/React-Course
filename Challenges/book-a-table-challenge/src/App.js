import { useState } from "react";

const bookingData = [];

export default function App() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [guests, setGuests] = useState(1);
  const [date, setDate] = useState(formatDate(new Date()));
  const [hour, setHour] = useState("");
  const [minute, setMinute] = useState("");
  const [bookings, setBookings] = useState(bookingData);
  const [submittedBooking, setSubmittedBooking] = useState();
  const [isBookingSubmitted, setIsBookingSubmitted] = useState(false);

  function formatDate(date) {
    // Copied from StackOverflow
    let d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  }

  function bookATable(e) {
    e.preventDefault();
    const uniqueID = new Date().getTime(); // This will work for now
    const newBooking = {
      id: uniqueID,
      firstName,
      lastName,
      emailAddress,
      phoneNumber,
      guests,
      date,
      hour,
      minute,
    };

    if (
      !firstName ||
      !lastName ||
      !emailAddress ||
      !phoneNumber ||
      !hour ||
      !minute
    ) {
      return;
    } else {
      setBookings([...bookings, newBooking]);
      setFirstName("");
      setLastName("");
      setEmailAddress("");
      setPhoneNumber("");
      setGuests(1);
      setDate(formatDate(new Date()));
      setHour("");
      setMinute("");
      setIsBookingSubmitted(true);
      setSubmittedBooking(newBooking);
    }
  }

  return (
    <div className="mainApp">
      <BookingForm
        firstName={firstName}
        setFirstName={setFirstName}
        lastName={lastName}
        setLastName={setLastName}
        emailAddress={emailAddress}
        setEmailAddress={setEmailAddress}
        phoneNumber={phoneNumber}
        setPhoneNumber={setPhoneNumber}
        guests={guests}
        setGuests={setGuests}
        date={date}
        setDate={setDate}
        hour={hour}
        setHour={setHour}
        minute={minute}
        setMinute={setMinute}
        bookATable={bookATable}
      />
      <ExistingBookingsform
        isBookingSubmitted={isBookingSubmitted}
        setIsBookingSubmitted={setIsBookingSubmitted}
        submittedBooking={submittedBooking}
        bookings={bookings}
      />
    </div>
  );
}
function BookingForm({
  firstName,
  setFirstName,
  lastName,
  setLastName,
  emailAddress,
  setEmailAddress,
  phoneNumber,
  setPhoneNumber,
  guests,
  setGuests,
  date,
  setDate,
  hour,
  setHour,
  minute,
  setMinute,
  bookATable,
}) {
  return (
    <form
      className="bookingForm"
      onSubmit={(e) => e.preventDefault()}
      onKeyDown={(e) => e.key === "Enter" && e.preventDefault()}
    >
      <NameInput
        firstName={firstName}
        setFirstName={setFirstName}
        lastName={lastName}
        setLastName={setLastName}
      />
      <EmailInput
        emailAddress={emailAddress}
        setEmailAddress={setEmailAddress}
      />
      <PhoneGuestsInput
        phoneNumber={phoneNumber}
        setPhoneNumber={setPhoneNumber}
        guests={guests}
        setGuests={setGuests}
      />
      <DateTimeInput
        date={date}
        setDate={setDate}
        hour={hour}
        setHour={setHour}
        minute={minute}
        setMinute={setMinute}
      />
      <SubmitButton bookATable={bookATable} />
    </form>
  );
}
function NameInput({ firstName, setFirstName, lastName, setLastName }) {
  return (
    <div className="sectionArea">
      <h1>Booking form</h1>
      <label className="titleText"> Name:</label>
      <div className="inputRow">
        <input
          className="inputBox"
          placeholder="First*"
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        ></input>
        <input
          className="inputBox"
          placeholder="Last*"
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        ></input>
      </div>
    </div>
  );
}
function EmailInput({ emailAddress, setEmailAddress }) {
  return (
    <div className="sectionArea">
      <label className="titleText">Email: </label>
      <div className="inputRow">
        <input
          className="inputBox"
          placeholder="Email Address*"
          type="text"
          value={emailAddress}
          onChange={(e) => setEmailAddress(e.target.value)}
        ></input>
      </div>
    </div>
  );
}

function PhoneGuestsInput({ phoneNumber, setPhoneNumber, guests, setGuests }) {
  const maxGuestsAvailable = 6;
  const guestsTotal = Array.from({ length: maxGuestsAvailable }, (_, i) => ++i);
  return (
    <div className="sectionArea">
      <div className="inputRow">
        <div className="formGroup">
          <label className="titleText">Phone:</label>
          <input
            className="inputBox"
            placeholder="Phone Number*"
            type="text"
            maxLength="11"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ""))}
          />
        </div>
        <div className="formGroup">
          <label className="titleText">Guests:</label>
          <select
            className="inputBox"
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
          >
            {guestsTotal.map((numGuests) => (
              <option key={numGuests} value={numGuests}>
                {numGuests}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}

function DateTimeInput({ date, setDate, hour, setHour, minute, setMinute }) {
  const openingHour = 16;
  const closingHour = 23;
  const openingMinute = 0;
  const closingMinute = 12;
  const hours = Array.from(
    { length: closingHour - openingHour },
    (_, i) => openingHour + i
  ); // This is very useful, I got to learn it

  const minutes = Array.from(
    { length: closingMinute },
    (_, i) => openingMinute + i * 5
  );
  return (
    <div className="sectionArea">
      <label className="titleText">Date: </label>
      <div className="inputRow">
        <input
          type="date"
          className="inputBox"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        ></input>
        <select
          className="inputBox"
          value={hour}
          onChange={(e) => setHour(e.target.value)}
        >
          {hours.map((hour) => (
            <option key={hour} value={hour}>
              {hour}
            </option>
          ))}
        </select>
        <select
          className="inputBox"
          value={minute}
          onChange={(e) => setMinute(e.target.value)}
        >
          {minutes.map((minute) => (
            <option key={minute} value={minute}>
              {String(minute).padStart(2, "0")}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

function SubmitButton({ bookATable }) {
  return (
    <button className="submitButton" onClick={bookATable}>
      Book
    </button>
  );
}

function ExistingBookingsform({
  isBookingSubmitted,
  submittedBooking,
  bookings,
}) {
  return (
    <div className="existingBookingsform">
      {submittedBooking &&
        isBookingSubmitted &&
        bookings.map((booking) => (
          <div key={booking.id}>
            <p>
              {booking.firstName} {booking.lastName} has booked a table for {""}
              {booking.guests} people on {booking.date} at {booking.hour}:
              {String(booking.minute).padStart(2, "0")}. Email Address:{" "}
              {booking.emailAddress} Phone Number: {booking.phoneNumber}
            </p>
          </div>
        ))}
    </div>
  );
}
