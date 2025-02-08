let catagoryInput = document.getElementById("catagoryInput");
let amountInput = document.getElementById("amountInput");
let discriptionInput = document.getElementById("discriptionInput");
let dateInput = document.getElementById("dateInput");
let addButton = document.getElementById("addButton");
let resetButton = document.getElementById("resetButton");
let transactionData = document.getElementById("transactionData");
let applyFilterBtn = document.getElementById("applyFilterBtn");
let totalIncomeDisplay = document.getElementById("totalIncomeDisplay");
let formDashboardBalance = document.getElementById("formDashboardBalance");
let headerBalance = document.getElementById("headerBalance");

let dataBase = [];
let totalIncome = 0;
let totalExpense = 0;
let netBalance = 0;

// Adding Data to Local Storage
function addData() {
  localStorage.setItem("dataBase", JSON.stringify(dataBase));
}

//Getting Data From Local Storage
function getData() {
  const storedData = localStorage.getItem("dataBase");
  if (storedData) {
    dataBase = JSON.parse(storedData);
    dataTable(dataBase);
    updateTotal();
  }
}

// Getting Total Income, Expense & Net Balance Values
function updateTotal() {
  totalIncome = dataBase
    .filter((data) => data.catagory === "income")
    .reduce((sum, data) => sum + data.amount, 0);
  totalIncomeDisplay.textContent = `₹ ${totalIncome.toFixed(2)}`;

  totalExpense = dataBase
    .filter((data) => data.catagory === "expense")
    .reduce((sum, data) => sum + data.amount, 0);
  totalExpenseDisplay.textContent = `₹ ${totalExpense.toFixed(2)}`;

  netBalance = totalIncome - totalExpense;
  headerBalance.textContent = `₹ ${netBalance.toFixed(2)}`;
  formDashboardBalance.textContent = `₹ ${netBalance.toFixed(2)}`;
}

function dataTable(filteredData) {
  transactionData.innerHTML = "";

  filteredData.forEach((data, index) => {
    let table = document.getElementById("transactionData");
    let newRow = table.insertRow(table.length);

    cell1 = newRow.insertCell();
    cell1.innerHTML = index + 1;

    cell2 = newRow.insertCell();
    cell2.innerHTML = data.catagory === "income" ? data.amount : "--";

    cell3 = newRow.insertCell();
    cell3.innerHTML = data.catagory === "expense" ? data.amount : "--";

    cell4 = newRow.insertCell();
    cell4.innerHTML = data.discription;

    cell5 = newRow.insertCell();
    cell5.innerHTML = data.entryDate;

    cell6 = newRow.insertCell();
    cell6.innerHTML = `
    <div class="action-cta">
        <button id="deleteBtn"><i class="bi bi-trash3-fill"></i></Button>
        <button id="editBtn"><i class="bi bi-pencil-square"></i></button>
    </div>`;
  });
}

function addTransaction() {
  const catagory = catagoryInput.value;
  const discription = discriptionInput.value;
  const amount = Number(amountInput.value);
  const entryDate = dateInput.value;

  if (catagoryInput.value === "") {
    alert("Kindly Select the Catagory from Dropdown Menu !");
    return;
  }
  if (dateInput.value === "") {
    alert("Kindly Select Valid Transaction Date !");
    return;
  }
  if (
    amountInput.value === isNaN(amountInput.value) ||
    amountInput.value <= 0
  ) {
    alert("Kindly Enter the Amount !");
    return;
  }
  if (discriptionInput.value === "") {
    alert("Kindly Fill Valid Discription !");
    return;
  }

  dataBase.push({ catagory, discription, amount, entryDate });
  dataTable(dataBase);
  addData();
  updateTotal();
  resetEntry();
}

addButton.addEventListener("click", addTransaction);

function resetEntry() {
  catagoryInput.value = "";
  amountInput.value = "";
  discriptionInput.value = "";
  dateInput.value = "";
}

resetButton.addEventListener("click", resetEntry);

applyFilterBtn.addEventListener("click", () => {
  const selectedData = document.querySelector(
    'input[name="filter"]:checked'
  ).value;
  const filteredData = dataBase.filter(
    (data) => selectedData === "all" || data.catagory === selectedData
  );

  dataTable(filteredData);
});

document.addEventListener("DOMContentLoaded", getData);
