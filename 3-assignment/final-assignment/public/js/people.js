console.log("Hello from my-script.js!");

const form = document.getElementById("form-create");
const fullNameInput = document.getElementById("fullName");
const dobInput = document.getElementById("dob");
const fullNameError = document.getElementById("fullNameError");
const dobError = document.getElementById("dobError");

form.addEventListener("submit", (event) => {
  let isValid = true;

  if (fullNameInput.value.trim() === "") {
    fullNameError.textContent = "Full Name is required";
    isValid = false;
  } else {
    fullNameError.textContent = "";
  }

  if (
    dobInput.value === "" ||
    isNaN(dobInput.value) ||
    dobInput.value > 1990 ||
    dobInput.value < 1900
  ) {
    dobError.textContent = "Please enter a valid year of birth (1900-1990)";
    isValid = false;
  } else {
    dobError.textContent = "";
  }

  if (!isValid) {
    event.preventDefault(); // Prevent form submission
  }
});
