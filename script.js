let catagoryInput = document.getElementById("catagoryInput");
let amountInput = document.getElementById("amountInput");
let discriptionInput = document.getElementById("discriptionInput");
let addButton = document.getElementById("addButton");
let resetButton = document.getElementById("resetButton");
let transactionData = document.getElementById("transactionData");

const transactionDataBase = [
  // { catagory: "income", discription: "salary", amount: 500 },
  // { catagory: "expense", discription: "ticket", amount: 400 },
  // { catagory: "income", discription: "salary", amount: 300 },
  // { catagory: "expense", discription: "petrol", amount: 200 },
  // { catagory: "income", discription: "salary", amount: 100 },
];

let transactions = transactionDataBase;

function loadTranscationDetails(transaction) {
  let table = document.getElementById("transactionData");
  let newRow = table.insertRow(table.length);

  cell1 = newRow.insertCell();
  cell1.innerHTML = transactions.length;

  cell2 = newRow.insertCell();
  cell2.innerHTML =
    transaction.catagory === "income" ? transaction.amount : "--";

  cell3 = newRow.insertCell();
  cell3.innerHTML =
    transaction.catagory === "expense" ? transaction.amount : "--";

  cell4 = newRow.insertCell();
  cell4.innerHTML = transaction.discription;

  cell5 = newRow.insertCell();
  cell5.innerHTML = transaction.date;

  cell6 = newRow.insertCell();
  cell6.innerHTML = `
    <div class="action-cta">
        <button id="deleteBtn"><i class="bi bi-trash3-fill"></i></Button>
        <button id="editBtn"><i class="bi bi-pencil-square"></i></button>
    </div>`;
}

function addTransaction() {
  formValidation();

  const transaction = {
    catagory: catagoryInput.value,
    discription: discriptionInput.value,
    amount: amountInput.value,
  };

  transactionDataBase.push(transaction);

  loadTranscationDetails(transaction);
}

function formValidation() {
  if (catagoryInput.value === "") {
    alert("Kindly Select the Catagory from Dropdown Menu !");
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
}

addButton.addEventListener("click", addTransaction);

function resetEntry() {
  catagoryInput.value = "";
  amountInput.value = "";
  discriptionInput.value = "";
}

resetButton.addEventListener("click", resetEntry);

function config() {
  transactionData.innerHTML = "";
  transactions.forEach(loadTranscationDetails);
}

window.addEventListener("load", function () {
  config();
});
