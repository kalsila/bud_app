// Declaration des variable global
const formAddBudget = document.getElementById('montBudget');
const formAddExpense = document.getElementById('addExpense');
const montantBudget = document.getElementById('montantBudget');
const viewExpense = document.getElementById('viewExpense');
const totalBalance = document.getElementById('totalBalance');
const listDepense = document.getElementById('listDepense');
const budgetInput = document.getElementById('budgetInput');
let expTitleInp = document.getElementById('expTitle');
let expValueInp = document.getElementById('expValue');
let bugetValue = 0
let totalExpense = [];
let totalExpenseValue = 0;
let BalanceTotal = 0;
let ids = 0;
//recuperation de la valuer saisi dans le form 1
formAddBudget.addEventListener('submit', getBudgetValue);

function getBudgetValue(e) {
  e.preventDefault()

  bugetValue = parseInt(budgetInput.value);
  if (bugetValue <= 0) {
    alert(`la valeur ${bugetValue} est null ou négative`)
  } else {
    montantBudget.innerHTML = bugetValue;

  }

  e.target[0].value = '';


};

// recuperation de la valueur saisi dans le form 2

formAddExpense.addEventListener('submit', getExpenseValue);

function getExpenseValue(e) {
  e.preventDefault();
  let expTitle = expTitleInp.value;
  let expValue = parseInt(expValueInp.value);
  let newExpense = {
    id: ids += 1,
    title: expTitle,
    value: expValue
  };
  if (expTitle == '') {
    alert('Le titre est Vide ') 
  } if (expValue <= 0) {
    alert('la depense null ou negative')
  } else {
    totalExpense.push(newExpense);
    let div = document.createElement('div');

    div.innerHTML = `

    <div class="col-12 d-flex justify-content-around">
      <h5 class="text-success">. ${newExpense.title}</h5>
      <h5 class="text-danger">${newExpense.value}</h5>
      <h5 class="d-flex" >
        <i class="fa-solid fa-pen-to-square text-primary mx-4" data-id="${newExpense.id}" onclick="editExpense(this)"></i>

        <i class="fa-solid fa-trash text-danger data-id="${newExpense.id}"  onclick="deleteExpense(this)">
        </i>
      </h5>
    </div>
    `
    listDepense.appendChild(div);
  }
  e.target[0].value = ''
  e.target[1].value = ''
  //sumExpenseValue()
  calculateTotalValue(totalExpense)
}


function calculateTotalValue(totalExpense) {
  let sum = 0;
  if (totalExpense.length > 0) {

    for (let i = 0; i < totalExpense.length; i++) {
      let expense = totalExpense[i];
      sum += (expense.value);
    }

    totalExpenseValue = sum
    viewExpense.innerHTML = totalExpenseValue
    calculBalance()
    return sum;

  }

}
function calculBalance() {

  if (bugetValue > 0 && totalExpenseValue > 0) {
    BalanceTotal = bugetValue - totalExpenseValue;
    totalBalance.innerHTML = BalanceTotal
  }
}

function editExpense(element) {

  let getId = parseInt(element.getAttribute("data-id"));
  console.log(getId);
  let getParent = element.parentElement.parentElement.parentElement

  let selectedExpense = totalExpense.filter(elemt => {
    return elemt.id === getId
  })
  let removeItem = totalExpense.filter(item => {
    return item.id !== getId
  })
  totalExpense = removeItem
  //console.log('Total',totalExpense.indexOf(id= ));
  expTitleInp.value = selectedExpense[0].title;
  expValueInp.value = selectedExpense[0].value;

  listDepense.removeChild(getParent)


  calculateTotalValue(totalExpense)
}
function deleteExpense(element) {
  let getId = parseInt(element.getAttribute("data-id"));
  console.log(getId);

  let getParent = element.parentElement.parentElement.parentElement;

  let removeItem = totalExpense.filter(item => {
    return item.id !== getId
  })
  console.log('item remove', removeItem);
  //totalExpense = removeItem
  console.log(totalExpense);

  calculateTotalValue(totalExpense);
  listDepense.removeChild(getParent);
}
