// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`

import { useEffect, useState } from "react";

const currencies = ["USD", "EUR", "CAD", "INR", "GBP", "PLN"];

export default function App() {
  const [userAmountInput, setUserAmountInput] = useState(1);
  const [fromCurrency, setFromCurrency] = useState(currencies[0]);
  const [toCurrency, setToCurrency] = useState(currencies[1]);
  const [currencyRate, setCurrencyRate] = useState("");

  function handleSwap() {
    const temp = fromCurrency;
    setFromCurrency(toCurrency);
    setToCurrency(temp);
  }

  useEffect(() => {
    const controller = new AbortController();

    const timeout = setTimeout(() => {
      async function fetchCurrency() {
        try {
          const res = await fetch(
            `https://api.frankfurter.app/latest?amount=${userAmountInput}&from=${fromCurrency}&to=${toCurrency}`,
            { signal: controller.signal }
          );
          if (!res.ok) throw new Error("something went wrong");
          const data = await res.json();
          setCurrencyRate(data.rates[toCurrency]);

          if (data.response === "False") throw new Error("ERRORITO");
        } catch (err) {
          console.log(err);
        }
      }

      fetchCurrency();
    }, 200); // debounce by 200 ms

    return () => {
      clearTimeout(timeout); // cancel pending call if input changes
      controller.abort(); // cancel previous fetch
    };
  }, [fromCurrency, toCurrency, userAmountInput]);

  const calculateRate = Number(currencyRate);

  return (
    <div>
      <input
        type="number"
        onChange={(e) => setUserAmountInput(e.target.value)}
        value={userAmountInput}
      ></input>
      <select
        onChange={(e) => setFromCurrency(e.target.value)}
        value={fromCurrency}
      >
        {currencies
          .filter((currency) => currency !== toCurrency)
          .map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
      </select>
      <select
        onChange={(e) => setToCurrency(e.target.value)}
        value={toCurrency}
      >
        {currencies
          .filter((currency) => currency !== fromCurrency)
          .map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
      </select>
      <SwapButton handleSwap={handleSwap} />

      <Output calculateRate={calculateRate} />
    </div>
  );
}

function Output({ calculateRate }) {
  const formatting = calculateRate.toFixed(4);
  return (
    <div>
      <p>{formatting}</p>
    </div>
  );
}

function SwapButton({ handleSwap }) {
  return <button onClick={handleSwap}>Swap</button>;
}
