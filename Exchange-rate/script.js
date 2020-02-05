const currencyElement_one = document.getElementById("currency-one");
const currencyElement_two = document.getElementById("currency-two");
const amountElement_two = document.getElementById("amount-two");
const amountElement_one = document.getElementById("amount-one");
const rateEl = document.getElementById("rate");
const swap = document.getElementById("swap");

//event listner
currencyElement_one.addEventListener("change", calculate);
currencyElement_two.addEventListener("change", calculate);
amountElement_one.addEventListener("input", calculate);
amountElement_two.addEventListener("input", calculate);
swap.addEventListener("click", () => {
  const temp = currencyElement_one.value;
  currencyElement_one.value = currencyElement_two.value;
  currencyElement_two.value = temp;
  calculate();
});

//fetch exchange rates and update Dom
function calculate() {
  const currency1 = currencyElement_one.value;
  const currency2 = currencyElement_two.value;
  fetch(`https://api.exchangerate-api.com/v4/latest/${currency1}`)
    .then(res => res.json())
    .then(data => {
      const rate = data.rates[currency2];
      rateEl.innerText = `1 ${currency1} = ${rate} ${currency2}`;
      amountElement_two.value = (amountElement_one.value * rate).toFixed(2);
    });
}

calculate();
