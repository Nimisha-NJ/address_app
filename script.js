let countryDropdown = document.getElementById("country-dropdown");

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
     var addressForm = document.querySelector(".address-form");
     var newAddressForm = addressForm.cloneNode(true);

     // Clear input values in the cloned form
     var inputs = newAddressForm.querySelectorAll("input");
     inputs.forEach(function (input) {
       input.value = "";
     });

     // Append the cloned form to the container
     document.getElementById("address-container").appendChild(newAddressForm);
   }