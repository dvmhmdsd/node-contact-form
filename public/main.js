// Select the form element
const formElement = document.querySelector("#contact");

// Attach the submit event to the form
formElement.addEventListener("submit", function(e) {
  e.preventDefault();

  // 'this' refers to the formElement
  let reqBody = convertFormIntoJSON(this);

  // Set the loading
  controlSubmitBtn("Submitting...", "btn-info", "btn-primary");

  // Send the form to "/" because it's the origin
  postFormData("/", reqBody, () => {
    controlSubmitBtn(
      "Submitted Successfully &#9786;",
      "btn-success",
      "btn-primary"
    );

    setTimeout(() => {
      controlSubmitBtn("Send", "btn-primary", "btn-success");
    }, 3000);
  });
});

/**
 * @param {string} url
 * @param {JSON} body
 * @param {string} successCallBack
 */
function postFormData(url, body, successCallBack) {
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json" // Set the header to json as the body will be json
    },
    body: body
  }).then(successCallBack);
}

/**
 * @param {string} content
 * @param {string} classToAdd
 * @param {string} classToRemove
 */
function controlSubmitBtn(content, classToAdd, classToRemove) {
  const submitBtn = document.querySelector(".submit-btn");

  submitBtn.innerHTML = content;
  submitBtn.classList.add(classToAdd);
  submitBtn.classList.remove(classToRemove);
}

/**
 * @param {HTMLElement} form
 * @returns {JSON}
 */
function convertFormIntoJSON(form) {
  let formObject = {};

  // Use querySelectorAll to get all inputs and textareas in the form
  let formFields = form.querySelectorAll("input, textarea");

  // Using forEach to produce an object of [name] of the field as property and value of the field
  formFields.forEach(input => {
    formObject[input.name] = input.value;
  });

  return JSON.stringify(formObject);
}
