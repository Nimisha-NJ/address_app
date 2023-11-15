
let formDataArray = [];

let countryDropdown = document.getElementById("country-dropdown");
let myForm = document.getElementById("my-form");
let addBtn = document.querySelector(".add-btn");

const showForm = () => {
  console.log("show the form");
  myForm.style.display = "block";
};

addBtn.addEventListener("click", showForm);

var countries = [
  "India",
  "United States",
  "Canada",
  "United Kingdom",
  "Germany",
  "France",
  "Japan",
  "China",
  "Brazil",
  "Australia",
  "Mexico",
  "South Korea",
  "Italy",
  "Spain",
  "Russia",
  "Netherlands",
  "Switzerland",
  "Sweden",
  "Norway",
  "South Africa",
];

countries.map((country) => {
  let option = document.createElement("option");
  option.value = country;
  option.text = country;
  countryDropdown.appendChild(option);
});


function addNewAddress() {
  // Clone the existing address form
  var newAddressForm = myForm.cloneNode(true);

  // Clear input values in the cloned form
  var inputs = newAddressForm.querySelectorAll("input");
  inputs.forEach(function (input) {
    input.value = "";
  });

  // Append the cloned form to the container
  document.getElementById("address-container").appendChild(newAddressForm);
}

const readAll = () => {
  let tableBody = document.querySelector(".table-body");
  var elements = "";
  formDataArray.map((formData) => {
    elements += `<tr data-id="${formData.newId}">
        <td>${formData.data.name}</td>
        <td>${formData.data.address1}</td>
        <td>${formData.data.address2}</td>
        <td>${formData.data.city}</td>
        <td>${formData.data.state}</td>
        <td>${formData.data.country}</td>
        <td> 
          <button onclick="editForm(${formData.newId})">Edit</button>
          <button onclick="deleteForm(${formData.newId})">Delete</button>
        </td>
      </tr>`;
  });
  tableBody.innerHTML = elements;
};

const deleteForm = (id) => {
  // Remove the row from the table
  let tableRow = document.querySelector(`[data-id="${id}"]`);
  tableRow.remove();

  // Remove the data from the formDataArray
  formDataArray = formDataArray.filter((formData) => formData.newId !== id);

  // Update the table
  readAll();
};

const submitForm = () => {
  let formData = {};
  myForm.querySelectorAll("input, select").forEach((input) => {
    formData[input.name] = input.value;
  });

  // Generate a unique id for the new data entry
  let newId = Date.now();

  // Add the form data and corresponding newId to the formDataArray
  formDataArray.push({
    newId: newId,
    data: formData,
  });

  // Update the table
  readAll();

  // Clear input values in the form
  myForm.querySelectorAll("input").forEach((input) => {
    input.value = "";
  });
};


// const editForm = (id) => {
   
//   // Find the corresponding form data in the array
//   const formData = formDataArray.find((formData) => formData.newId === id);

//   // Populate the form with the data for editing
//   myForm.querySelectorAll("input, select").forEach((input) => {
//     input.value = formData.data[input.name];
//   });
// };

const editForm = (id) => {
  // Find the corresponding form data in the array
  const formData = formDataArray.find((formData) => formData.newId === id);

  // Populate the form with the data for editing
  myForm.querySelectorAll("input, select").forEach((input) => {
    input.value = formData.data[input.name];
  });

  // Add the newId as a hidden field in the form
  let hiddenIdField = document.createElement("input");
  hiddenIdField.type = "hidden";
  hiddenIdField.name = "newId";
  hiddenIdField.value = formData.newId;
  myForm.appendChild(hiddenIdField);

  // Change the submit button's text to "Update"
  document.querySelector(".submit-btn").textContent = "Update";

  // Change the submit button's event listener to call editSubmitForm
  document.querySelector(".submit-btn").onclick = editSubmitForm;
};

const editSubmitForm = () => {
  let formData = {};
  myForm.querySelectorAll("input, select").forEach((input) => {
    formData[input.name] = input.value;
  });

  // Find the corresponding form data in the array
  const formDataIndex = formDataArray.findIndex(
    (data) => data.newId == formData.newId
  );

  // Update the existing data
  formDataArray[formDataIndex].data = formData;

  // Update the table
  readAll();

  // Clear input values in the form
  myForm.querySelectorAll("input").forEach((input) => {
    input.value = "";
  });

  // Remove the hiddenIdField from the form
  let hiddenIdField = document.querySelector("input[name='newId']");
  if (hiddenIdField) {
    hiddenIdField.remove();
  }

  // Change the submit button's text back to "Submit"
  document.querySelector(".submit-btn").textContent = "Submit";

  // Change the submit button's event listener back to the original submitForm
  document.querySelector(".submit-btn").onclick = submitForm;
};

