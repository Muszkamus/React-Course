import { useState } from "react";

const serviceData = [
  {
    id: 1,
    text: "Dissatisfied (0%)",
    value: 0,
  },
  {
    id: 2,
    text: "It was okay (5%)",
    value: 0.05,
  },
  {
    id: 3,
    text: "It was good (10%)",
    value: 0.1,
  },
  {
    id: 4,
    text: "Absolutely Amazing! (20%)",
    value: 0.2,
  },
];

export default function App() {
  const [bill, setBill] = useState(0);
  const [service, setService] = useState(0);
  const [friendRating, setFriendRating] = useState(0);

  function resetAll() {
    setBill(0);
    setService(0);
    setFriendRating(0);
  }

  return (
    <div>
      <Bill bill={bill} setBill={setBill} />
      <ServiceRating
        serviceData={serviceData}
        service={service}
        setService={setService}
      />
      <FriendRecommendation
        serviceData={serviceData}
        friendRating={friendRating}
        setFriendRating={setFriendRating}
      />
      <TotalBill
        bill={bill}
        setBill={setBill}
        serviceData={serviceData}
        service={service}
        friendRating={friendRating}
        setFriendRating={setFriendRating}
        resetAll={resetAll}
      />
    </div>
  );
}
function DropDown({ value, setValue }) {
  return (
    <select onChange={(e) => setValue(Number(e.target.value))} value={value}>
      {serviceData.map((i) => (
        <option key={i.id} value={i.value}>
          {i.text}
        </option>
      ))}
    </select>
  );
}

function Bill({ bill, setBill }) {
  return (
    <div>
      <p className="text">
        How much was the bill?
        <input
          type="number"
          placeholder=""
          value={bill}
          onChange={(e) => setBill(e.target.value)}
        ></input>
      </p>
    </div>
  );
}

function ServiceRating({ service, setService }) {
  return (
    <div>
      <p className="text">
        How much did you like the service?
        <DropDown value={service} setValue={setService} />
      </p>
    </div>
  );
}

function FriendRecommendation({ friendRating, setFriendRating }) {
  return (
    <div>
      <p className="text">
        How much did your friend like the service?
        <DropDown value={friendRating} setValue={setFriendRating} />
      </p>
    </div>
  );
}
function TotalBill({ bill, service, friendRating, resetAll }) {
  const numericBill = Number(bill);
  const finalService = numericBill * service;
  const finalFriendRating = numericBill * friendRating;

  return (
    <div>
      <p className="textBill">
        You Pay - £{numericBill === "" ? "0" : numericBill} (£
        {numericBill === "" ? "0" : numericBill} +
        {(finalService + finalFriendRating).toFixed(2)} tip)
      </p>
      <button onClick={resetAll}>Reset</button>
    </div>
  );
}
