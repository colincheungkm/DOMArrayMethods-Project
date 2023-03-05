const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillionairesBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calculateWealthBtn = document.getElementById('calculate-wealth');

let data = [];

getRandomUser();
getRandomUser();
getRandomUser();

// Fetch random user from API and add money
async function getRandomUser() {
  const response = await fetch('https://randomuser.me/api');
  const data = await response.json();

  const user = data.results[0];

  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000),
  };

  addData(newUser);
}

// MAP + spread operator (deep copy)
function doubleMoney() {
  data = data.map((user) => {
    return { ...user, money: user.money * 2 };
  });

  updateDOM();
}

// SORT - compare callback function
function sortByRichest() {
  data.sort(function (a, b) {
    return b.money - a.money;
  });

  updateDOM();
}

// FILTER - showing millionaires
function showMillionaires() {
  data = data.filter((user) => user.money > 1000000);
  updateDOM();
}

// REUDCE - calculate total wealth
function calculateWealth() {
  const wealth = data.reduce((acc, user) => (acc += user.money), 0);

  const wealthEl = document.createElement('div');
  wealthEl.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(wealth)}</strong></h3>`;

  main.appendChild(wealthEl);
}

//////////////////////////
// Add new Object to data arr
function addData(obj) {
  data.push(obj);
  updateDOM();
}

// default parameter to data
function updateDOM(providedData = data) {
  main.innerHTML = `<h2 class="border-b-2 pb-[10px] flex justify-between mb-[20px]"><strong>Person</strong> Wealth</h2>`;

  providedData.forEach((item) => {
    const element = document.createElement('div');
    element.classList.add('person', 'flex', 'justify-between', 'text-[20px]', 'mb-[10px]');
    element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(item.money)}`;
    main.appendChild(element);
  });
}

// Format number as Money
function formatMoney(number) {
  return '$ ' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

// LISTENERS
addUserBtn.addEventListener('click', getRandomUser);
doubleBtn.addEventListener('click', doubleMoney);
sortBtn.addEventListener('click', sortByRichest);
showMillionairesBtn.addEventListener('click', showMillionaires);
calculateWealthBtn.addEventListener('click', calculateWealth);
