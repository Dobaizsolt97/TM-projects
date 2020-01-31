const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");
const button = document.getElementById("submitBtn");

// button interaction
button.addEventListener("click", function(e) {
  e.preventDefault();
  checkValue([username, email, password, password2]);
  checkLength(username, 3, 15);
  checkLength(password, 3, 8);
  checkEmail(email);
  checkPasswords(password, password2);
});

//checking if there is an entered value
function checkValue(inputArr) {
  inputArr.forEach(function(input) {
    if (input.value.trim() === "") {
      displayError(input, ` ${input.id} is required`);
    } else {
      displaySuccess(input);
    }
  });
}

// visual representation of the unaccepted values
function displayError(field, message) {
  const formControl = field.parentElement;
  formControl.className = "form-control error";
  small = formControl.querySelector("small");
  small.innerText = message;
}

// visual representation of the accepted values
function displaySuccess(field) {
  const formControl = field.parentElement;
  formControl.className = "form-control success";
}
// checking the lenght
function checkLength(input, minimum, maximum) {
  if (input.value.length > maximum) {
    displayError(input, `No more than ${maximum} characters alowed`);
  } else if (input.value.length < minimum) {
    displayError(input, `at least ${minimum} characters required`);
  }
}
// checking if the email coresponds to a template
function checkEmail(input) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(input.value)) {
    displaySuccess(input);
  } else {
    displayError(input, "not a valid email");
  }
}
//checking if passwords match
function checkPasswords(input, input2) {
  if (input.value === input2.value) {
    displaySuccess(input);
    displaySuccess(input2);
  } else {
    displayError(input2, `passwords do not match`);
  }
}
