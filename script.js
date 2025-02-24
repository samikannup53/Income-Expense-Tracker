// Declaring Global Variables
let loginBtn = document.getElementById("loginBtn");
let refreshBtn = document.getElementById("refreshBtn");
let exitBtn = document.getElementById("exitBtn");
let headerBalance = document.getElementById("headerBalance");
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
let totalRecords = document.getElementById("totalRecords");
let allFilter = document.getElementById("allFilter");

let app = document.getElementById("app");
let welcomePage = document.getElementById("welcome-page");

let dataBase = [];
let totalIncome = 0;
let totalExpense = 0;
let netBalance = 0;

let isEditing = false;
let editIndex = -1;

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

// Function for Login to the Application
loginBtn.addEventListener("click", login);

function login() {
  welcomePage.style.display = "none";
  app.style.display = "block";
  app.style.top = "0";

  applyFilter();
}

// Function for Refresh the Application
refreshBtn.addEventListener("click", refresh);

function refresh() {
  login();

  isEditing = false;
  editIndex = -1;
  addButton.innerHTML = `Add &nbsp;<i class="fa-solid fa-plus"></i>`;
  resetButton.style.display = "block";

  allFilter.checked = true;
  applyFilter();

  addData();
  getData();
  dataTable(dataBase);
  updateTotal();
  resetEntry();
  setTimeout(refreshAlert, 300);
}

// Function for Exit the Application
exitBtn.addEventListener("click", exit);

function exit() {
  if (confirm("Are you Sure Want to Exit the Application ?")) {
    app.style.display = "none";
    welcomePage.style.display = "block";
  } else {
    return;
  }
}

// Function to Add the Transaction after Clicking the Add Button
addButton.addEventListener("click", addTransaction);

// Add Transaction Function
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

  if (isEditing) {
    dataBase[editIndex] = { catagory, discription, amount, entryDate };
    isEditing = false;
    editIndex = -1;
    addButton.innerHTML = `Add &nbsp;<i class="fa-solid fa-plus"></i>`;
    resetButton.style.display = "block";
    addData();
    updateTotal();
    resetEntry();
    dataTable(dataBase);

    setTimeout(updateAlert, 200);
  } else {
    dataBase.push({ catagory, discription, amount, entryDate });
    addData();
    updateTotal();
    resetEntry();
    dataTable(dataBase);

    setTimeout(addAlert, 200);
  }
}

// Function to Create Table
function dataTable(filteredData) {
  transactionData.innerHTML = "";

  filteredData.forEach((data, index) => {
    let table = document.getElementById("transactionData");
    let newRow = table.insertRow(table.length);

    let cell1 = newRow.insertCell();
    cell1.innerHTML = index + 1;

    let cell2 = newRow.insertCell();
    cell2.innerHTML = data.catagory === "income" ? data.amount : "--";

    let cell3 = newRow.insertCell();
    cell3.innerHTML = data.catagory === "expense" ? data.amount : "--";

    let cell4 = newRow.insertCell();
    cell4.innerHTML = data.discription;

    let cell5 = newRow.insertCell();
    cell5.innerHTML = data.entryDate;

    let cell6 = newRow.insertCell();

    // Creating Delete Button Inside the Table
    let deleteBtn = document.createElement("button");
    let editBtn = document.createElement("button");

    deleteBtn.innerHTML = `<i class="fa-solid fa-trash"></i>`;
    deleteBtn.setAttribute("id", "deleteBtn");

    // Function to Delete the Transaction
    deleteBtn.addEventListener("click", () => {
      if (confirm("Are You Sure want to Delete the Transaction?")) {
        if (
          confirm(
            "Once the Data is Deleted, then it will be Recoverd Anymore !"
          )
        ) {
          dataBase.splice(index, 1);

          addData();
          updateTotal();
          dataTable(dataBase);

          setTimeout(deleteAlert, 200);
        } else {
          return;
        }
      } else {
        return;
      }
    });

    cell6.appendChild(deleteBtn);

    // Creating Edit Button Inside the Table
    editBtn.innerHTML = `<i class="fa-solid fa-pen-to-square"></i>`;
    editBtn.setAttribute("id", "editBtn");
    editBtn.style.marginLeft = "10px";

    // Function to Edit the Transaction
    editBtn.addEventListener("click", () => {
      if (confirm("Are You Sure want to Edit/Update the Transaction?")) {
        catagoryInput.value = data.catagory;
        dateInput.value = data.entryDate;
        amountInput.value = data.amount;
        discriptionInput.value = data.discription;
        isEditing = true;
        editIndex = index;
        addButton.innerHTML = `Update &nbsp;<i class="fa-solid fa-pen-to-square"></i>`;
        resetButton.style.display = "none";
      } else {
        return;
      }
    });

    cell6.appendChild(editBtn);
  });
}

// Function to Show Transaction Add Alert Message
function addAlert() {
  alert("The Transaction has Been Added Successfully !");
}

// Function to Show Transaction Update Alert Message
function updateAlert() {
  alert("The Transaction has Been Updated Successfully !");
}

// Function to Show Transaction Delete Alert Message
function deleteAlert() {
  alert("The Transaction has Been Deleted Successfully !");
}

// Function to Show App Refresh Alert Message
function refreshAlert() {
  alert("All the Data are upto date !");
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

  totalRecords.textContent = dataBase.length;
}

// Function to Reset the Entry Form after Clicking the Reset Button
resetButton.addEventListener("click", resetEntry);

function resetEntry() {
  catagoryInput.value = "";
  amountInput.value = "";
  discriptionInput.value = "";
  dateInput.value = "";
}

// Function for Applying Filters after Clicking the Apply Button above the Data Table
applyFilterBtn.addEventListener("click", applyFilter);

function applyFilter() {
  const selectedData = document.querySelector(
    'input[name="filter"]:checked'
  ).value;
  const filteredData = dataBase.filter(
    (data) => selectedData === "all" || data.catagory === selectedData
  );
  totalRecords.textContent = filteredData.length;
  dataTable(filteredData);
}

// Loading Data
document.addEventListener("DOMContentLoaded", getData);

window.addEventListener("beforeunload", () => {
  event.preventDefault();
  event.returnValue = "";
});
