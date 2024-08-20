const forms = document.querySelectorAll('.feedback-form__form');
forms.forEach(form => {
  const requiredFields = form.querySelectorAll('.feedback-form__input.--req input');
  const emailField = form.querySelector('input[name="email"]');
  const phoneInput = form.querySelector('input[name="phone"]');
  const customSelect = form.querySelector('.custom-select');
  const customSelectCurrent = customSelect.querySelector('.custom-select__current');
  const customSelectOptions = customSelect.querySelectorAll('.custom-select__option');
  const feedbackMark = form.querySelector('.feedback-form__mark');
  const defaultFeedbackText = feedbackMark.getAttribute('data-default');
  const countryCodeInput = form.querySelector('input[name="country-code"]');
  const formSubmit = form.querySelector('.feedback-form__submit[type="submit"]'); // Замените на ваш класс
  const fakeFormSubmit = form.querySelector('.feedback-form__submit:not([type="submit"])'); // Замените на ваш класс

  function validateField(field) {
    const inputWrapper = field.closest('.feedback-form__input');
    if (!field.value.trim()) {
      inputWrapper.classList.add('--error');
      feedbackMark.classList.add('--error');
      feedbackMark.textContent = 'Ошибка! Проверьте правильность заполнения данных';
    } else {
      inputWrapper.classList.remove('--error');
      checkFormValidity();
    }
  }

  function validateEmailField() {
    const inputWrapper = emailField.closest('.feedback-form__input');
    if (!validateEmail(emailField.value)) {
      inputWrapper.classList.add('--error');
      feedbackMark.classList.add('--error');
      feedbackMark.textContent = 'Ошибка! Проверьте правильность заполнения данных';
    } else {
      inputWrapper.classList.remove('--error');
      checkFormValidity();
    }
  }

  function validatePhoneField() {
    const inputWrapper = phoneInput.closest('.feedback-form__input');
    const mask = phoneInput.placeholder;
    const value = phoneInput.value;
    const isValid = mask.split('').every((char, index) => {
      if (char === '_') {
        return /\d/.test(value[index]);
      }
      return char === value[index];
    });
    if (!isValid) {
      inputWrapper.classList.add('--error');
      feedbackMark.classList.add('--error');
      feedbackMark.textContent = 'Ошибка! Проверьте правильность заполнения данных';
    } else {
      inputWrapper.classList.remove('--error');
      checkFormValidity();
    }
  }

  function checkFormValidity() {
    const hasError = form.querySelectorAll('.feedback-form__input.--error').length > 0;
    if (!hasError) {
      feedbackMark.classList.remove('--error');
      feedbackMark.textContent = defaultFeedbackText;
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

  if (fakeFormSubmit) {
    fakeFormSubmit.addEventListener('click', function () {
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
      if (phoneInput.closest('.feedback-form__input').classList.contains('--error')) {
        isValid = false;
      }
  
      if (isValid) {
        formSubmit.click();
      }
    });
  }

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  function updatePhonePlaceholderAndMask() {
    const selectedOption = customSelect.querySelector('.custom-select__option.--current');
    const mask = selectedOption.getAttribute('data-mask');
    phoneInput.placeholder = mask;
    phoneInput.value = '';
    phoneInput.removeEventListener('input', maskInput);
    phoneInput.addEventListener('input', maskInput);
    countryCodeInput.value = selectedOption.textContent; // Подставляем значение в скрытое поле
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

  customSelect.addEventListener('click', function () {
    customSelect.classList.toggle('--active');
  });

  customSelectOptions.forEach(option => {
    option.addEventListener('click', function () {
      customSelectCurrent.textContent = this.textContent;
      customSelectOptions.forEach(opt => opt.classList.remove('--current'));
      this.classList.add('--current');
      updatePhonePlaceholderAndMask();
    });
  });

  document.addEventListener('click', function (event) {
    if (!customSelect.contains(event.target)) {
      customSelect.classList.remove('--active');
    }
  });

  updatePhonePlaceholderAndMask();

  const inputWrappers = form.querySelectorAll('.feedback-form__input');
  inputWrappers.forEach(wrapper => {
    wrapper.addEventListener('click', function () {
      const input = wrapper.querySelector('input');
      if (input) {
        input.focus();
      }
    });
  });
});