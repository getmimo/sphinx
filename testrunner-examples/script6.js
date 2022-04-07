let selectBool = false;
let firstNameBool = false;
let lastNameBool = false;
let checkBool = false;
let termsBool = false;
let notification = document.createElement('h5');
let notificationExists = false;

let h6 = document.createElement('h6');
document.body.appendChild(h6);

function getValue() {
  let selectResult = document.getElementById('select-value').value;
  document.getElementById(
    'employment-status',
  ).innerHTML = `Please select employment status: ${selectResult}`;
  document.getElementById('employment-status').style.color = '#62d76b';
  selectBool = true;
}
