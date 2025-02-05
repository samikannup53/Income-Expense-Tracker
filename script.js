let catagoryInput = document.getElementById("catagoryInput");
let amountInput = document.getElementById("amountInput");
let discriptionInput = document.getElementById("discriptionInput");
let addButton = document.getElementById("addButton");
let resetButton = document.getElementById("resetButton");
let transactionData = document.getElementById("transactionData");

let transactionDataBase = [];

function addTransaction() {
  const catagory = catagoryInput.value;
  const amount = Number(amountInput.value);
  const discription = discriptionInput.value;

  formValidation();

  transactionDataBase.push({ catagory, amount, discription });
  console.log(transactionDataBase);
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
