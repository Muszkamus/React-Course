export default function App() {
  return (
    <div>
      <BookingForm />
    </div>
  );
}
function BookingForm() {
  return (
    <div className="bookingForm">
      <div className="sectionArea">
        <label className="titleText"> Name:</label>
        <div className="inputRow">
          <input className="inputBox" placeholder="First*"></input>
          <input className="inputBox" placeholder="Last*"></input>
        </div>
      </div>
      <div className="sectionArea">
        <label className="titleText">Email: </label>
        <div className="inputRow">
          <input className="inputBox" placeholder="Email Address*"></input>
        </div>
      </div>
      <div className="sectionArea">
        <div className="inputRow">
          <div className="formGroup">
            <label className="titleText">Phone:</label>
            <input className="inputBox" placeholder="Phone Number*" />
          </div>
          <div className="formGroup">
            <label className="titleText">Guests:</label>
            <select className="inputBox">
              <option>1</option>
              <option>2</option>
              <option>3</option>
            </select>
          </div>
        </div>
      </div>

      <div className="sectionArea">
        <label className="titleText">Date: </label>
        <div className="inputRow">
          <input className="inputBox" placeholder="Date*"></input>
          <input className="inputBox" placeholder="Time*"></input>
        </div>
      </div>

      <button className="submitButton">Book a table</button>
    </div>
  );
}
