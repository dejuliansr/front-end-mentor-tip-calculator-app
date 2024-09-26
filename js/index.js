const billInput = document.getElementById('bill');
const peopleInput = document.getElementById('people');
const tipButtons = document.querySelectorAll('.tip-btn');
const customTipInput = document.getElementById('custom-tip');
const tipAmountDisplay = document.getElementById('tip-amount');
const totalAmountDisplay = document.getElementById('total-amount');
const resetButton = document.getElementById('reset');
const errorMessage = document.getElementById('error-message');
const buttons = document.querySelectorAll('.tip-btn');

let billValue = 0;
let peopleValue = 1;
let tipValue = 0;

// Function to check if reset button should be active
function checkResetButton() {
  if (billInput.value || peopleInput.value || customTipInput.value || tipValue) {
    resetButton.disabled = false;
    resetButton.classList.add('active'); // Tambahkan kelas active
  } else {
    resetButton.disabled = true;
    resetButton.classList.remove('active'); // Hapus kelas active
  }
}

// Update bill value
billInput.addEventListener('input', () => {
  billValue = parseFloat(billInput.value) || 0;
  calculateTip();
  checkResetButton();
});

// Update number of people value
peopleInput.addEventListener('input', () => {
  peopleValue = parseFloat(peopleInput.value) || 1;
  if (peopleValue === 0) {
    errorMessage.style.visibility = 'visible';
  } else {
    errorMessage.style.visibility = 'hidden';
    calculateTip();
  }
  checkResetButton();
});

// Handle tip buttons
tipButtons.forEach(button => {
  button.addEventListener('click', (e) => {
    tipValue = parseFloat(e.target.getAttribute('data-tip'));
    customTipInput.value = '';
    calculateTip();
    checkResetButton();
  });
});

buttons.forEach(button => {
  button.addEventListener('click', function() {
    // Hapus kelas 'active' dari semua tombol
    buttons.forEach(btn => btn.classList.remove('active'));
    
    // Tambahkan kelas 'active' ke tombol yang diklik
    this.classList.add('active');
    checkResetButton();
  });
});

// Handle custom tip input
customTipInput.addEventListener('input', () => {
  tipValue = parseFloat(customTipInput.value) || 0;
  calculateTip();
  checkResetButton();
});

// Reset the values
resetButton.addEventListener('click', () => {
  billInput.value = '';
  peopleInput.value = '';
  customTipInput.value = '';
  tipAmountDisplay.textContent = '$0.00';
  totalAmountDisplay.textContent = '$0.00';
  errorMessage.style.visibility = 'hidden';
  billValue = 0;
  peopleValue = 1;
  tipValue = 0;
  buttons.forEach(btn => btn.classList.remove('active'));
  checkResetButton();
});

// Calculate the tip and total per person
function calculateTip() {
  if (peopleValue >= 1 && tipValue > 0) {
    const tipAmount = (billValue * (tipValue / 100)) / peopleValue;
    const totalAmount = (billValue + tipAmount * peopleValue) / peopleValue;
    tipAmountDisplay.textContent = `$${tipAmount.toFixed(2)}`;
    totalAmountDisplay.textContent = `$${totalAmount.toFixed(2)}`;
  }
}
