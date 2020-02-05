const main = document.getElementById("main");
const addUserBtn = document.getElementById("add-user");
const sortBtn = document.getElementById("sort");
const showMillionairesBtn = document.getElementById("show-millionaires");
const doubleBtn = document.getElementById("double");
const calculateWealthBtn = document.getElementById("calculate-wealth");
let data = [];
let lastcalled = false;

// fetch random user and add money
async function getRandomUser() {
  const res = await fetch("https://randomuser.me/api/");
  const data = await res.json();

  const user = data.results[0];
  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000)
  };
  addData(newUser);
}
// add Data to the actual data array
function addData(obj) {
  data.push(obj);
  updateDom();
}
// Update DOM
function updateDom(providedData = data) {
  //clear the main div
  main.innerHTML = `<main id="main">
  <h2><strong>Person</strong>Wealth</h2>
  </main>`;
  providedData.forEach(person => {
    const element = document.createElement("div");
    element.classList.add("person");
    element.innerHTML = `<strong>${person.name}</strong> ${formatMoney(
      person.money
    )}`;
    main.appendChild(element);
  });
  lastcalled = false;
}
getRandomUser();
getRandomUser();
getRandomUser();

// format number as money
function formatMoney(number) {
  return "$" + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
}

//event listners
addUserBtn.addEventListener("click", getRandomUser);
doubleBtn.addEventListener("click", doubmeMoney);
sortBtn.addEventListener("click", sortUsers);
showMillionairesBtn.addEventListener("click", showMilioaires);
calculateWealthBtn.addEventListener("click", calculateWealth);

//double money
function doubmeMoney() {
  data = data.map(user => {
    return { ...user, money: user.money * 2 };
  });
  updateDom();
  lastcalled = false;
}

//sort users by money
function sortUsers() {
  data.sort((a, b) => b.money - a.money);
  updateDom();
  lastcalled = false;
}
// show milionaires function
function showMilioaires() {
  data = data.filter(user => user.money > 1000000);
  updateDom();
  lastcalled = false;
}
//calculate the total wealth
function calculateWealth() {
  if (!lastcalled) {
    const totalWealth = data.reduce((acc, num) => {
      acc = acc + num.money;
      return acc;
    }, 0);
    const wealthEl = document.createElement("div");
    wealthEl.innerHTML = `<h3>Total wealth: <strong>${formatMoney(
      totalWealth
    )}</strong></h3>`;
    main.appendChild(wealthEl);
    lastcalled = true;
  }
}
