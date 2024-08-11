const form = document.querySelector('.feedback-form__form');

if (form) {
const requiredFields = form.querySelectorAll('.feedback-form__input.--req input');
const emailField = form.querySelector('input[name="email"]');
const phoneInput = form.querySelector('input[name="phone"]');
const customSelect = document.querySelector('.custom-select');
const customSelectCurrent = customSelect.querySelector('.custom-select__current');
const customSelectOptions = customSelect.querySelectorAll('.custom-select__option');

function validateField(field) {
const label = field.closest('label');
if (!field.value.trim()) {
label.classList.add('--error');
} else {
label.classList.remove('--error');
}
}

function validateEmailField() {
const label = emailField.closest('label');
if (!validateEmail(emailField.value)) {
label.classList.add('--error');
} else {
label.classList.remove('--error');
}
}

function validatePhoneField() {
const label = phoneInput.closest('label');
const mask = phoneInput.placeholder;
const value = phoneInput.value;
const isValid = mask.split('').every((char, index) => {
if (char === '_') {
return /\d/.test(value[index]);
}
return char === value[index];
});

if (!isValid) {
label.classList.add('--error');
} else {
label.classList.remove('--error');
}
}

requiredFields.forEach(field => {
field.addEventListener('blur', () => validateField(field));
field.addEventListener('input', () => validateField(field));
});

emailField.addEventListener('blur', validateEmailField);
emailField.addEventListener('input', validateEmailField);

phoneInput.addEventListener('blur', validatePhoneField);
phoneInput.addEventListener('input', validatePhoneField);

form.addEventListener('submit', function (event) {
let isValid = true;

requiredFields.forEach(field => {
validateField(field);
if (!field.value.trim()) {
isValid = false;
}
});

validateEmailField();
if (!validateEmail(emailField.value)) {
isValid = false;
}

validatePhoneField();
if (phoneInput.closest('label').classList.contains('--error')) {
isValid = false;
}

if (!isValid) {
event.preventDefault();
}
});

function validateEmail(email) {
const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
return re.test(email);
}

function updatePhonePlaceholderAndMask() {
const selectedOption = customSelect.querySelector('.custom-select__option.--current');
const mask = selectedOption.getAttribute('data-mask');
phoneInput.placeholder = mask;
phoneInput.value = ''; // Очищаем значение поля

phoneInput.removeEventListener('input', maskInput);
phoneInput.addEventListener('input', maskInput);
}

function maskInput(e) {
let value = e.target.value.replace(/\D/g, '');
const mask = phoneInput.placeholder;
let formattedValue = mask;
let cursorPosition = e.target.selectionStart;

for (let i = 0; i < value.length; i++) {
formattedValue = formattedValue.replace('_', value[i]);
}

e.target.value = formattedValue;

let newCursorPosition = formattedValue.indexOf('_');
if (newCursorPosition === -1) {
newCursorPosition = formattedValue.length;
}
e.target.setSelectionRange(newCursorPosition, newCursorPosition);
}

customSelectCurrent.addEventListener('click', function() {
customSelect.classList.toggle('--active');
});

customSelectOptions.forEach(option => {
option.addEventListener('click', function() {
customSelectCurrent.value = this.textContent;
customSelectOptions.forEach(opt => opt.classList.remove('--current'));
this.classList.add('--current');
updatePhonePlaceholderAndMask();
customSelect.classList.remove('--active');
});
});

document.addEventListener('click', function(event) {
if (!customSelect.contains(event.target)) {
customSelect.classList.remove('--active');
}
});

updatePhonePlaceholderAndMask();
}