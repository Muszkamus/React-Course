import { useState } from "react";

const bookingData = [];

export default function App() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [bookings, setBookings] = useState(bookingData);

  function bookATable(e) {
    e.preventDefault();
    const uniqueID = new Date().getTime(); // This will work for now
    const newBooking = {
      id: uniqueID,
      firstName,
      lastName,
      emailAddress,
      phoneNumber,
      // guests: "",
      // date: "",
      //  hour: "",
      // minute: "",
    };

    if (!firstName || !lastName) {
      return;
    } else {
      setBookings([...bookings, newBooking]);
      setFirstName("");
      setLastName("");
      setEmailAddress("");
      console.log("Available");
      console.log(newBooking);
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
        bookATable={bookATable}
      />
      <ExistingBookingsform
        firstName={firstName}
        lastName={lastName}
        emailAddress={emailAddress}
        phoneNumber={phoneNumber}
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
  bookATable,
  availableBooking,
}) {
  return (
    <form className="bookingForm" onSubmit={(e) => e.preventDefault()}>
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
      />
      <DateTimeInput />
      <SubmitButton
        bookATable={bookATable}
        availableBooking={availableBooking}
      />
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

function PhoneGuestsInput({ phoneNumber, setPhoneNumber }) {
  const maxGuestsAvailable = 6;
  const guests = Array.from({ length: maxGuestsAvailable }, (_, i) => ++i);
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
          <select className="inputBox">
            {guests.map((guests) => (
              <option key={guests} value={guests}>
                {guests}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}

function DateTimeInput() {
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
        <input type="date" className="inputBox"></input>
        <select className="inputBox">
          {hours.map((hour) => (
            <option key={hour} value={hour}>
              {hour}
            </option>
          ))}
        </select>
        <select className="inputBox">
          {minutes.map((minute) => (
            <option key={minute} value={minute}>
              {minute}
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
  firstName,
  lastName,
  emailAddress,
  phoneNumber,
}) {
  return <div className="existingBookingsform"></div>;
}
