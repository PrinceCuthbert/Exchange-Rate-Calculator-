const currencyEl_one = document.getElementById("currency-one");
const amountEl_one = document.getElementById("amount-one");
const currencyEl_two = document.getElementById("currency-two");
const amountEl_two = document.getElementById("amount-two");

const rateEl = document.getElementById("rate");
const swap = document.getElementById("swap");

// Fetch exchange rates and update the DOM
function calculate() {
  const currency_one = currencyEl_one.value;
  const currency_two = currencyEl_two.value;

  // Replace with your API key from ExchangeRate-API
  const apiKey = "440383da53a0387f7270622a";

  fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/latest/${currency_one}`)
    .then((res) => res.json())
    .then((data) => {
      const rate = data.conversion_rates[currency_two];

      rateEl.innerText = `1 ${currency_one} = ${rate} ${currency_two}`;

      // Ensure amountEl_one has a valid number before multiplying
      let amountOneValue = parseFloat(amountEl_one.value) || 1;
      amountEl_two.value = (amountOneValue * rate).toFixed(2);
    });
}

// Event listeners
currencyEl_one.addEventListener("change", calculate);
amountEl_one.addEventListener("input", calculate);
currencyEl_two.addEventListener("change", calculate);
amountEl_two.addEventListener("input", calculate);

swap.addEventListener("click", () => {
  const tempCurrency = currencyEl_one.value;
  currencyEl_one.value = currencyEl_two.value;
  currencyEl_two.value = tempCurrency;

  // Swap amount values correctly
  let tempAmount = parseFloat(amountEl_one.value);
  amountEl_one.value = amountEl_two.value; // Set new input value
  amountEl_two.value = tempAmount ? tempAmount.toFixed(2) : "1"; // Default to 1 if empty

  calculate();
});

calculate();
