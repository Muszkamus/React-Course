# CheatSheet

## ✅ 1. Currency Input (e.g. £12.34)

- ✨ Format: Only digits and a single . (up to 2 decimal places)

```js
<input
  type="text"
  inputMode="decimal"
  placeholder="0.00"
  value={amount}
  onChange={(e) => {
    const value = e.target.value;
    if (/^\d*\.?\d{0,2}$/.test(value)) {
      setAmount(value);
    }
  }}
/>
```

- Accepts: 12, 12.3, 12.34
- Blocks: letters, multiple dots, more than 2 decimal places
- Set step="0.01" if you switch back to type="number"

## ✅ 2. Phone Number Input (UK-style: 07XXXXXXXXX)

```js
<input
  type="text"
  inputMode="numeric"
  maxLength="11"
  placeholder="07XXXXXXXXX"
  value={phone}
  onChange={(e) => {
    const value = e.target.value.replace(/\D/g, ""); // remove non-digits
    if (value.length <= 11) setPhone(value);
  }}
/>
```

## ✅ 3. ZIP / Postal Code (UK: SW1A 1AA, US: 12345 or 12345-6789)

```js
<input
  type="text"
  inputMode="numeric"
  maxLength="10"
  placeholder="e.g. 12345 or 12345-6789"
  value={zip}
  onChange={(e) => {
    const value = e.target.value;
    if (/^\d{0,5}(-\d{0,4})?$/.test(value)) {
      setZip(value);
    }
  }}
/>
```

## ✅ 4. Bank Account Number (max 8 digits, digits only)

```js
<input
  type="text"
  inputMode="numeric"
  placeholder="Account Number"
  maxLength="8"
  value={accountNumber}
  onChange={(e) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value.length <= 8) setAccountNumber(value);
  }}
/>
```

## ✅ 5. Alphanumeric only (e.g. usernames, IDs)s

- 🔒 Disallows !@#$%^&\*() etc.

```js
<input
  type="text"
  value={username}
  onChange={(e) => {
    const cleaned = e.target.value.replace(/[^a-zA-Z0-9]/g, "");
    setUsername(cleaned);
  }}
/>
```

### ✅ 6. Name Input (letters and spaces only)

```js
<input
  type="text"
  placeholder="Full Name"
  value={fullName}
  onChange={(e) => {
    const cleaned = e.target.value.replace(/[^a-zA-Z\s]/g, "");
    setFullName(cleaned);
  }}
/>
```
