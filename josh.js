const form = document.querySelector("form");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  // Get form values
  const fullName = document.getElementById("fullname");
  const email = document.getElementById("email");
  const phone = document.getElementById("phone");
  const password = document.getElementById("password");
  const terms = document.getElementById("terms");

  let valid = true;

  // Remove previous errors
  const inputs = form.querySelectorAll("input, select, textarea");

  inputs.forEach(function (input) {
    input.classList.remove("error");
  });

  // =========================
  // NAME VALIDATION
  // =========================

  if (fullName.value.trim() === "") {
    fullName.classList.add("error");

    valid = false;
  }

  // =========================
  // EMAIL VALIDATION
  // =========================

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (email.value.trim() === "" || !emailPattern.test(email.value)) {
    email.classList.add("error");

    valid = false;
  }

  // =========================
  // PHONE VALIDATION
  // =========================

  if (phone.value.trim() === "") {
    phone.classList.add("error");

    valid = false;
  }

  // =========================
  // PASSWORD VALIDATION
  // =========================

  if (password.value.length < 6) {
    password.classList.add("error");

    alert("Password must contain at least 6 characters.");

    valid = false;
  }

  // =========================
  // TERMS VALIDATION
  // =========================

  if (!terms.checked) {
    terms.classList.add("error");

    alert("Please accept the Terms and Conditions.");

    valid = false;
  }

  // =========================
  // SUCCESS
  // =========================

  if (valid) {
    const oldMessage = document.querySelector(".success-message");

    if (oldMessage) {
      oldMessage.remove();
    }

    const message = document.createElement("div");

    message.className = "success-message";

    message.textContent = "✓ Account created successfully!";

    form.appendChild(message);

    // Clear the form
    form.reset();

    // Remove message after 4 seconds
    setTimeout(function () {
      message.remove();
    }, 4000);
  }
});

// =========================
// INPUT INTERACTION
// =========================

const allInputs = document.querySelectorAll("input, select, textarea");

allInputs.forEach(function (input) {
  input.addEventListener("input", function () {
    input.classList.remove("error");
  });
});
