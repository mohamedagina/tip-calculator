const input = {
  bill: 0,
  tip: 0,
  nop: 0,
  isEmpty() {
    return !(this.bill || this.tip || this.nop);
  }
};

const mainForm = document.getElementById('main-form');
const inputContainers = mainForm.getElementsByClassName('input-primary');

const handleFocus = e => e.target.parentElement.classList.add('focused');
const handleBlur = e => e.target.parentElement.classList.remove('focused');
const checkRadio = () => document.getElementById('tip').click();

const handleInput = e => {
  Object.assign(input, { [e.target.name]: parseInt(e.target.value || 0) });

  const { bill, nop, tip } = input;
  const tipAmount = nop ? (bill * tip) / 100 / nop : 0;
  const total = nop ? tipAmount + bill / nop : 0;
  document.getElementById('tip-amount').innerText = tipAmount.toFixed(2);
  document.getElementById('total').innerText = total.toFixed(2);
  document.getElementById('reset-btn').disabled = input.isEmpty();

  const nopInput = document.querySelector('.input-primary > input[name=nop]');
  if (nopInput.value === '0') nopInput.parentElement.classList.add('invalid');
  else nopInput.parentElement.classList.remove('invalid');
};

mainForm.addEventListener('input', handleInput);
mainForm.addEventListener('reset', () => {
  Object.assign({ bill: 0, tip: 0, nop: 0 });
  document.getElementById('tip-amount').innerText = '0.00';
  document.getElementById('total').innerText = '0.00';
  document.getElementById('reset-btn').disabled = true;
});

for (const inputContainer of inputContainers) {
  const mInput = inputContainer.querySelector('input');
  mInput.addEventListener('focus', handleFocus);
  mInput.addEventListener('blur', handleBlur);
  if (mInput.name === 'tip') mInput.addEventListener('click', checkRadio);
}
