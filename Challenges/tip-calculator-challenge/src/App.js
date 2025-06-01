import { use, useState } from "react";

const serviceData = [
  {
    id: 1,
    text: "Dissatisfied (0%)",
    value: 0,
  },
  {
    id: 2,
    text: "It was okay (5%)",
    value: 5,
  },
  {
    id: 3,
    text: "It was good (10%)",
    value: 10,
  },
  {
    id: 4,
    text: "Absolutely Amazing! (20%)",
    value: 20,
  },
];

export default function App() {
  const [bill, setBill] = useState(null);
  const [service, setService] = useState("");
  const [friend, setFriend] = useState("");
  return (
    <div>
      <Bill bill={bill} setBill={setBill} />
      <ServiceRating
        serviceData={serviceData}
        service={Number(service)}
        setService={setService}
      />
      <FriendRecommendation
        serviceData={serviceData}
        friend={Number(friend)}
        setFriend={setFriend}
      />
      <TotalBill
        bill={Number(bill)}
        setBill={setBill}
        serviceData={serviceData}
        service={Number(service)}
        friend={Number(friend)}
        setFriend={setFriend}
      />
    </div>
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

function ServiceRating({ serviceData, setService }) {
  return (
    <div>
      <p className="text">
        How much did you like the service?
        <select onChange={(e) => setService(e.target.value)}>
          {serviceData.map((i) => (
            <option key={i.id} value={i.value}>
              {i.text}
            </option>
          ))}
        </select>
      </p>
    </div>
  );
}

function FriendRecommendation({ serviceData, setFriend }) {
  return (
    <div>
      <p className="text">
        How much did your friend like the service?
        <select onChange={(e) => setFriend(e.target.value)}>
          {serviceData.map((i) => (
            <option key={i.id} value={i.value}>
              {i.text}
            </option>
          ))}
        </select>
      </p>
    </div>
  );
}
function TotalBill({ bill, setBill, service, setService, friend, setFriend }) {
  // Reset button to do
  function resetAll() {
    setBill(0);
    setService(0);
    setFriend(0);
  }
  return (
    <div>
      <p className="textBill">
        You Pay - £{bill} (£{bill} +
        {(bill * service) / 100 + (bill * friend) / 100})
      </p>

      <button onClick={resetAll}>Reset</button>
    </div>
  );
}
