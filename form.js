(function () {
  'use strict';

  var form = document.getElementById('appointment-form');
  var summary = document.getElementById('error-summary');
  var summaryList = summary.querySelector('ul');
  var status = document.getElementById('form-status');
  var dateInput = document.getElementById('date');

  // Block past dates
  var today = new Date();
  var iso = today.getFullYear() + '-' +
    String(today.getMonth() + 1).padStart(2, '0') + '-' +
    String(today.getDate()).padStart(2, '0');
  dateInput.min = iso;

  var messages = {
    name: {
      valueMissing: 'Enter your full name.',
      tooShort: 'Full name must be at least 2 characters.'
    },
    phone: {
      valueMissing: 'Enter your phone number.',
      patternMismatch: 'Enter a phone number with 10 to 15 digits.'
    },
    email: {
      valueMissing: 'Enter your email address.',
      typeMismatch: 'Enter an email address like name@example.com.'
    },
    department: {
      valueMissing: 'Select a department.'
    },
    date: {
      valueMissing: 'Choose a preferred date.',
      rangeUnderflow: 'Choose today or a future date.'
    }
  };

  function getMessage(field) {
    var v = field.validity;
    var map = messages[field.id] || {};
    for (var key in map) {
      if (v[key]) return map[key];
    }
    return field.validationMessage;
  }

  function showError(field, message) {
    var err = document.getElementById(field.id + '-error');
    field.setAttribute('aria-invalid', 'true');
    if (err) { err.textContent = message; err.hidden = false; }
  }

  function clearError(field) {
    var err = document.getElementById(field.id + '-error');
    field.removeAttribute('aria-invalid');
    if (err) { err.textContent = ''; err.hidden = true; }
  }

  function validateField(field) {
    if (field.checkValidity()) { clearError(field); return null; }
    var message = getMessage(field);
    showError(field, message);
    return message;
  }

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    status.textContent = '';
    summaryList.innerHTML = '';

    var fields = form.querySelectorAll('input, select, textarea');
    var firstInvalid = null;

    fields.forEach(function (field) {
      var message = validateField(field);
      if (message) {
        var li = document.createElement('li');
        var a = document.createElement('a');
        a.href = '#' + field.id;
        a.textContent = message;
        a.addEventListener('click', function (e) {
          e.preventDefault();
          field.focus();
        });
        li.appendChild(a);
        summaryList.appendChild(li);
        if (!firstInvalid) firstInvalid = field;
      }
    });

    if (firstInvalid) {
      summary.hidden = false;
      summary.focus();           // moves screen-reader and keyboard users to the errors
      return;
    }

    summary.hidden = true;
    status.textContent = 'Thank you. Your appointment request has been received.';
    form.reset();
  });

  // Re-validate a field after the user leaves it, and clear errors as they fix them
  form.addEventListener('focusout', function (e) {
    var f = e.target;
    if (f.matches('input, select, textarea') && f.getAttribute('aria-invalid')) validateField(f);
  });
  form.addEventListener('input', function (e) {
    var f = e.target;
    if (f.getAttribute('aria-invalid') && f.checkValidity()) clearError(f);
  });
})();
