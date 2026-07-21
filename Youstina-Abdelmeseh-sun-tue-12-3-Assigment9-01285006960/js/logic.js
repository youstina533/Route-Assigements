var contactImageInput = document.getElementById("image-input");
var contactNameInput = document.getElementById("name-input");
var contactPhoneInput = document.getElementById("phone-input");
var contactEmailInput = document.getElementById("email-input");
var contactAddressInput = document.getElementById("address-input");
var contactGroupInput = document.getElementById("group-input");
var contactNotesInput = document.getElementById("notes-input");
var contactFavoriteInput = document.getElementById("favorite-checkbox-input");
var contactEmergencyInput = document.getElementById("emergency-checkbox-input");
var seacrhInput = document.getElementById("searchInput");
var contactsList = [];
var totalFavoriteContacts = "";
var totalEmergencyContacts = "" ;

if(localStorage.getItem("contactsList") !=null){
  contactsList = JSON.parse(localStorage.getItem("contactsList"));
}
showContacts();

function closeContactModal(){
  clearInputs();
  document.getElementById("modal-close-btn").click();
}

function clearInputs(){
    contactNameInput.value = "";
    contactImageInput.value = "";
    contactAddressInput.value = "";
    contactEmailInput.value = "";
    contactEmergencyInput.checked = false;   
    contactFavoriteInput.checked = false;  
    contactNotesInput.value = "";
    contactPhoneInput.value = "";
    contactGroupInput.value = "no-group"
    contactEmailInput.classList.remove("is-valid");
    contactEmailInput.classList.remove("is-invalid");
    contactImageInput.classList.remove("is-valid");
    contactImageInput.classList.remove("is-invalid");
    contactNameInput.classList.remove("is-valid");
    contactNameInput.classList.remove("is-invalid");
    contactPhoneInput.classList.remove("is-valid");
    contactPhoneInput.classList.remove("is-invalid");
}

function getInitials(nameInputValue){
    var nameInitials = "";
    var nameParts = nameInputValue.trim().split(" ");
    var firstInitial = nameParts[0] ? nameParts[0].charAt(0).toUpperCase() : "";
    var secondInitial = nameParts[1] ? nameParts[1].charAt(0).toUpperCase() : "";
    nameInitials = firstInitial + secondInitial;
    return nameInitials;
}

function normalizePhone(phone){
    var cleaned = phone.trim();
    if(cleaned.startsWith("+20")){
        cleaned = cleaned.slice(3);       
    } 
    else if(cleaned.startsWith("0020")){
        cleaned = cleaned.slice(4);   
    } 
    else if(cleaned.startsWith("20") && cleaned.length === 12){
        cleaned = cleaned.slice(2);    
    }

    if(!cleaned.startsWith("0")){
        cleaned = "0" + cleaned;  
    }
    return cleaned;
}

function addcontact(){
  if(validName() && validEmail() &&  validPhone()){
    var newContact = {
      name : contactNameInput.value , 
      email : contactEmailInput.value , 
      phone : contactPhoneInput.value.trim(),
      notes : contactNotesInput.value,
      emergency : contactEmergencyInput.checked,
      favorite : contactFavoriteInput.checked,
      address : contactAddressInput.value,
      group : contactGroupInput.value,
      image : contactImageInput.files[0] ? `./images/${contactImageInput.files[0].name}` : null,
    }
    if(newContact.name == ""){
      Swal.fire({
        icon: "error",
        title: "Missing Name",
        text: "Please enter a name for the contact!",
      });
      return;
    }
    if(newContact.phone == ""){
      Swal.fire({
        icon: "error",
        title: "Missing Phone Number",
        text: "Please enter a Phone Number !",
      });
      return;
    }
    for(var i = 0; i < contactsList.length; i ++){
      if(normalizePhone(newContact.phone) === normalizePhone(contactsList[i].phone)) {
        Swal.fire({
          icon: "error",
          title: "Duplicate Phone Number",
          text: `A contact with this phone number already exists: ${contactsList[i].name}`,
        });
        return;
      } 
    }
    contactsList.push(newContact);
    clearInputs();
    showContacts();
    console.log(contactsList);
    localStorage.setItem("contactsList",JSON.stringify(contactsList));
    document.getElementById("modal-close-btn").click();
    Swal.fire({
      icon: "success",
      title: "Added",
      text: "Contact has been added successfully",
      showConfirmButton: false,
      timer: 1500
    });
 }
}

function showContacts(){
    var contactCard = "";
    for(var i = 0; i < contactsList.length; i ++){

        var imageMarkup = contactsList[i].image ? 
        `<img class="contact-image" src="${contactsList[i].image}" alt="user-image">`
        : `<span class="contact-name-letters">${getInitials(contactsList[i].name)}</span>`;

        var addressMarkup = contactsList[i].address ? 
        `<span class="address-icon details-icon"> <i class="fa-solid fa-location-dot"></i></span>
        <p class="address details-content">${contactsList[i].address}</p>`
        : `<span class="address-icon details-icon d-none m-0 p-0"> <i class="fa-solid fa-location-dot"></i></span>
        <p class="address details-content d-none m-0 p-0">${contactsList[i].address}</p>`

        var emailMarkup = contactsList[i].email ?
        `<span class="email-icon details-icon"> <i class="fa-solid fa-envelope"></i> </span>
        <p class="email details-content">${contactsList[i].email}</p>`
        : `<span class="email-icon details-icon d-none m-0 p-0""> <i class="fa-solid fa-envelope"></i> </span>
        <p class="email details-content d-none m-0 p-0"">${contactsList[i].email}</p>`

        var favoriteClass = contactsList[i].favorite ? "favorite-activated" : "";
        var emergencyClass = contactsList[i].emergency ? "emergency-activated" : "";

        var favoriteIconClass = contactsList[i].favorite ? "" : "d-none";
        var emergencyIconClass = contactsList[i].emergency ? "" : "d-none";
        var emergencyWordClass = contactsList[i].emergency ? "" : "d-none";

        contactCard += `
        <div class="contact-card col-lg-6 col-md-6 col-sm-12">
            <div class="contact-card-inner">
                <div class="contact-title d-flex gap-3">
                    <div class="contact-name-letters-div">
                        <span class="favorite-icon contact-icon ${favoriteIconClass}">
                        <i class="fa-solid fa-star"></i>
                        </span>
                          ${imageMarkup}
                        <span class="emergency-icon contact-icon ${emergencyIconClass}">
                        <i class="fa-solid fa-heart-pulse"></i>
                        </span>
                    </div>
                    <div class="contact-name-phone">
                        <p class="contact-name">${contactsList[i].name}</p>
                        <div class="contact-phone-div d-flex gap-2">
                            <span class="phone-icon">
                                <i class="fa-solid fa-phone"></i>
                            </span>
                            <span class="contact-phone-number">${contactsList[i].phone}</span>
                        </div>
                    </div>
                </div>
                <div class="contact-details-div mt-2">
                    <div class="contact-email-address-div">
                        <div class="contact-email contact-details d-flex gap-2">
                           ${emailMarkup}
                        </div>
                        <div class="contact-address contact-details d-flex gap-2">
                            ${addressMarkup}
                        </div>
                    </div>
                    <div class="other-deatils-div d-flex gap-2">
                        <span class="group-type">${contactsList[i].group}</span>
                        <span class="emergency-word ${emergencyWordClass}">
                        <i class="fa-solid fa-heart-pulse"></i>
                        Emergency
                        </span>
                    </div>
                </div>  
                <div class="contact-buttons d-flex justify-content-between mt-3">
                    <div class="email-phone-buttons">
                        <a href="tel:${contactsList[i].phone}" class="btn phone-btn" title="Call" >
                            <i class="fa-solid fa-phone"></i>
                        </a>
                        <a href="mailto:${contactsList[i].email}" class="btn email-btn" title="Email">
                        <i class="fa-solid fa-envelope"></i>
                        </a>
                    </div>
                    <div class="update-delete-buttons">
                        <button onclick="addRemoveToFavorite(${i},this)" class="btn favorite-btn ${favoriteClass}" id="favorite-btn" title="Favorite">
                        <i class="fa-solid fa-star"></i>
                        </button>
                        <button onclick="addRemoveToEmergency(${i},this)" class="btn emergency-btn ${emergencyClass}" id="emergency-btn" title="Emergency">
                        <i class="fa-solid fa-heart-pulse"></i>
                        </button>
                        <button type="button" onclick="updateContact(${i})" class="btn update-btn" title="Update" aria-current="page" data-bs-toggle="modal" data-bs-target="#exampleModal">
                        <i class="fa-solid fa-pen"></i>
                        </button>
                        <button onclick="deleteContact(${i})" class="btn delete-btn" title="Delete">
                        <i class="fa-solid fa-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `
    }
    document.getElementById("all-contacts-cards").innerHTML = contactCard;

    countTotalFavoriteContacts();
    countTotalContacts();
    countTotalEmergencyContacts();
    makeContactFavorite();
    makeContactEmergency();
}

function countTotalContacts(){
  var totalContactsNumber = contactsList.length;
  var totalContactSpan = "";
  totalContactSpan = `
    <h5>TOTAL</h5>
    <span class="total-number">${totalContactsNumber}</span>
  `
  document.getElementById("contacts-summetion-card-title").innerHTML = totalContactSpan ;

  var totalContactParagraph = "";
  totalContactParagraph = `
   <p>Manage and organize your ${totalContactsNumber} contacts</p> 
  `
  document.getElementById("total-contacts-no").innerHTML = totalContactParagraph;
}

function countTotalFavoriteContacts(){
  var totalFavoriteContacts = 0;
  for(var i = 0 ; i <contactsList.length ; i++){
    if(contactsList[i].favorite === true){
      totalFavoriteContacts +=1;
    } 
  }
  var totalFavoriteContactSpan = "";
    totalFavoriteContactSpan = `
     <h5>Favorites</h5>
     <span class="total-number">${totalFavoriteContacts}</span>
    `
    document.getElementById("contacts-summetion-favorite-card-title").innerHTML = totalFavoriteContactSpan;
}

function countTotalEmergencyContacts(){
  var totalEmergencyContacts = 0;
  for(var i = 0 ; i <contactsList.length ; i++){
    if(contactsList[i].emergency === true){
      totalEmergencyContacts +=1;
    } 
  }
  var totalEmergencyContactSpan = "";
    totalEmergencyContactSpan = `
     <h5>Emergency</h5>
     <span class="total-number">${totalEmergencyContacts}</span>
    `
    document.getElementById("contacts-summetion-emergency-card-title").innerHTML = totalEmergencyContactSpan;
}
 
function deleteContact(index){
  Swal.fire({
    title: "Delete Contact?",
    text:"Are you sure you want to delete Tina? This action cannot be undone.",
    confirmButtonText: "Yes, delete it!",
    confirmButtonColor: "#dc2626",  
    showCancelButton: true,
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire("Deleted!", "Contact has been deleted successfully", "success")
      console.log("delete");
      contactsList.splice(index, 1);
      showContacts();
      localStorage.setItem("contactsList", JSON.stringify(contactsList));
    }
  });
  console.log(contactsList);
}

var contactIndex = 0;

function updateContact(index){
  contactIndex = index;
  console.log("update" + index);
  var updateContact = contactsList[index];

    contactNameInput.value = updateContact.name;
    contactAddressInput.value = updateContact.address;
    contactEmailInput.value = updateContact.email;
    contactEmergencyInput.checked = updateContact.emergency;   
    contactFavoriteInput.checked =updateContact.favorite ;  
    contactNotesInput.value = updateContact.notes;
    contactPhoneInput.value = updateContact.phone ;
    contactGroupInput.value = updateContact.group;

  document.getElementById("save-for-first-time-btn").classList.add("d-none");
  document.getElementById("update-for-second-time-btn").classList.remove("d-none");
}

function saveContact(){
  var existingImage = contactsList[contactIndex].image;
  if(validName() && validEmail() &&  validPhone()){
    var newContact = {
        name : contactNameInput.value , 
        email : contactEmailInput.value , 
        phone : contactPhoneInput.value,
        notes : contactNotesInput.value,
        emergency : contactEmergencyInput.checked,
        favorite : contactFavoriteInput.checked,
        address : contactAddressInput.value,
        group : contactGroupInput.value,
        image : contactImageInput.files[0] ? `./images/${contactImageInput.files[0].name}` : existingImage, 
    }
    if(newContact.name == ""){
        Swal.fire({
          icon: "error",
          title: "Missing Name",
          text: "Please enter a name for the contact!",
        });
        return;
      }
      if(newContact.phone == ""){
        Swal.fire({
          icon: "error",
          title: "Missing Phone Number",
          text: "Please enter a Phone Number !",
        });
        return;
      }
    for(var i = 0; i < contactsList.length; i ++){
        if(normalizePhone(newContact.phone) === normalizePhone(contactsList[i].phone) && i != contactIndex) {
          Swal.fire({
            icon: "error",
            title: "Duplicate Phone Number",
            text: `A contact with this phone number already exists: ${contactsList[i].name}`,
          });
          return;
        } 
      }
    contactsList.splice(contactIndex, 1, newContact);
    console.log(contactsList);
    showContacts();
    clearInputs();
    localStorage.setItem("contactsList", JSON.stringify(contactsList));

    document.getElementById("save-for-first-time-btn").classList.remove("d-none");
    document.getElementById("update-for-second-time-btn").classList.add("d-none");
    document.getElementById("modal-close-btn").click();
      Swal.fire({
        icon: "success",
        title: "Updated",
        text: "Contact has been updated successfully",
        showConfirmButton: false,
        timer: 1500
      });
  }
}

function searchContact(){
   var searchText = seacrhInput.value;
   if(validsearch()){
    var contactCard = ""
     for(var i=0; i<contactsList.length; i++){
      if(contactsList[i].name.toLocaleLowerCase().trim().includes(searchText.toLocaleLowerCase().trim()) ||
        contactsList[i].phone.trim().includes(searchText.trim()) ||
        contactsList[i].email.toLocaleLowerCase().trim().includes(searchText.toLocaleLowerCase().trim())){

          var imageMarkup = contactsList[i].image ? 
          `<img class="contact-image" src="${contactsList[i].image}" alt="user-image">`
          : `<span class="contact-name-letters">${getInitials(contactsList[i].name)}</span>`;

          var addressMarkup = contactsList[i].address ? 
          `<span class="address-icon details-icon"> <i class="fa-solid fa-location-dot"></i></span>
          <p class="address details-content">${contactsList[i].address}</p>`
          : `<span class="address-icon details-icon d-none m-0 p-0"> <i class="fa-solid fa-location-dot"></i></span>
          <p class="address details-content d-none m-0 p-0">${contactsList[i].address}</p>`

          var emailMarkup = contactsList[i].email ?
          `<span class="email-icon details-icon"> <i class="fa-solid fa-envelope"></i> </span>
          <p class="email details-content">${contactsList[i].email}</p>`
          : `<span class="email-icon details-icon d-none m-0 p-0""> <i class="fa-solid fa-envelope"></i> </span>`

          var favoriteClass = contactsList[i].favorite ? "favorite-activated" : "";
          var emergencyClass = contactsList[i].emergency ? "emergency-activated" : "";

          var favoriteIconClass = contactsList[i].favorite ? "" : "d-none";
          var emergencyIconClass = contactsList[i].emergency ? "" : "d-none";
          var emergencyWordClass= contactsList[i].emergency ? "" : "d-none";

          contactCard += `
            <div class="contact-card col-lg-6 col-md-6 col-sm-12">
              <div class="contact-card-inner">
                  <div class="contact-title d-flex gap-3">
                      <div class="contact-name-letters-div">
                          <span class="favorite-icon contact-icon ${favoriteIconClass}">
                          <i class="fa-solid fa-star"></i>
                          </span>
                            ${imageMarkup}
                          <span class="emergency-icon contact-icon ${emergencyIconClass}">
                          <i class="fa-solid fa-heart-pulse"></i>
                          </span>
                      </div>
                      <div class="contact-name-phone">
                          <p class="contact-name">${contactsList[i].name}</p>
                          <div class="contact-phone-div d-flex gap-2">
                              <span class="phone-icon">
                                  <i class="fa-solid fa-phone"></i>
                              </span>
                              <span class="contact-phone-number">${contactsList[i].phone}</span>
                          </div>
                      </div>
                  </div>
                  <div class="contact-details-div mt-2">
                      <div class="contact-email-address-div">
                          <div class="contact-email contact-details d-flex gap-2">
                            ${emailMarkup}
                          </div>
                          <div class="contact-address contact-details d-flex gap-2">
                              ${addressMarkup}
                          </div>
                      </div>
                      <div class="other-deatils-div d-flex gap-2">
                          <span class="group-type">${contactsList[i].group}</span>
                          <span class="emergency-word ${emergencyWordClass}">
                          <i class="fa-solid fa-heart-pulse"></i>
                          Emergency
                          </span>
                      </div>
                  </div>  
                  <div class="contact-buttons d-flex justify-content-between mt-3">
                      <div class="email-phone-buttons">
                          <a href="tel:${contactsList[i].phone}" class="btn phone-btn" title="Call" >
                              <i class="fa-solid fa-phone"></i>
                          </a>
                          <a href="mailto:${contactsList[i].email}" class="btn email-btn" title="Email">
                          <i class="fa-solid fa-envelope"></i>
                          </a>
                      </div>
                      <div class="update-delete-buttons">
                          <button onclick="addRemoveToFavorite(${i},this)" class="btn favorite-btn ${favoriteClass}" id="favorite-btn" title="Favorite">
                          <i class="fa-solid fa-star"></i>
                          </button>
                          <button onclick="addRemoveToEmergency(${i},this)" class="btn emergency-btn ${emergencyClass}" id="emergency-btn" title="Emergency">
                          <i class="fa-solid fa-heart-pulse"></i>
                          </button>
                          <button type="button" onclick="updateContact(${i})" class="btn update-btn" title="Update" aria-current="page" data-bs-toggle="modal" data-bs-target="#exampleModal">
                          <i class="fa-solid fa-pen"></i>
                          </button>
                          <button onclick="deleteContact(${i})" class="btn delete-btn" title="Delete">
                          <i class="fa-solid fa-trash"></i>
                          </button>
                      </div>
                  </div>
              </div>
            </div>
     `
      }
      document.getElementById("all-contacts-cards").innerHTML = contactCard;
     }
  }
}

function validsearch(){
  var userText = seacrhInput.value.trim();
  var searchRegex = /^[A-Za-z0-9\s@.+_-]*$/;
  if(searchRegex.test(userText)){
    console.log( "Search matchs");    
    return true;
  }
  else{
    console.log("Search does not match");
  }
}

function validName(){
  var userText = contactNameInput.value.trim();
  var nameRegex = /^[A-Z][A-Za-z ]{2,50}$/;
  if(nameRegex.test(userText)){
    console.log( "Name matchs");
    contactNameInput.classList.add("is-valid");
    contactNameInput.classList.remove("is-invalid");
    document.getElementById("invalid-name").classList.add("d-none");
    return true;
  }
  else if(userText.trim() == ""){
    console.log( "Name is missing");
    contactNameInput.classList.remove("is-invalid");
    contactNameInput.classList.remove("is-valid");
    document.getElementById("invalid-name").classList.add("d-none");
    return true;
  }
  else{
    console.log("Name does not match");
    contactNameInput.classList.remove("is-valid");
    contactNameInput.classList.add("is-invalid");
    document.getElementById("invalid-name").classList.remove("d-none");
  }
}

function validEmail(){
  var userText = contactEmailInput.value.trim();
  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;;
  if(emailRegex.test(userText)){
    console.log( "Email matchs");
    contactEmailInput.classList.add("is-valid");
    contactEmailInput.classList.remove("is-invalid");
    document.getElementById("invalid-email").classList.add("d-none");
    return true;
  }
  else if(userText.trim() == ""){
    console.log( "Email is missing");
    contactEmailInput.classList.remove("is-invalid");
    contactEmailInput.classList.remove("is-valid");
    document.getElementById("invalid-email").classList.add("d-none");
    return true;
  }
  else{
    console.log("Email does not match");
    contactEmailInput.classList.remove("is-valid");
    contactEmailInput.classList.add("is-invalid");
    document.getElementById("invalid-email").classList.remove("d-none");
  }
}

function validPhone(){
  var userText = contactPhoneInput.value.trim();
  var phoneRegex = /^(\+?20|0)1[0125][0-9]{8}$/;
  if(phoneRegex.test(userText)){
    console.log( "Phone Number matchs");
    contactPhoneInput.classList.add("is-valid");
    contactPhoneInput.classList.remove("is-invalid");
    document.getElementById("invalid-phone-number").classList.add("d-none");
    return true;
  }
  else if(userText.trim() == ""){
    console.log( "Phone number is missing");
    contactPhoneInput.classList.remove("is-invalid");
    contactPhoneInput.classList.remove("is-valid");
    document.getElementById("invalid-phone-number").classList.add("d-none");
    return true;
  }
  else{
    console.log("Phone Number does not match");
    contactPhoneInput.classList.remove("is-valid");
    contactPhoneInput.classList.add("is-invalid");
    document.getElementById("invalid-phone-number").classList.remove("d-none");
  }
}

function addRemoveToFavorite(index,btn){
  if(contactsList[index].favorite == true){
  contactsList[index].favorite = false;
  btn.classList.remove('favorite-activated');
  }
  else if(contactsList[index].favorite == false){
  contactsList[index].favorite = true;
  btn.classList.add('favorite-activated');
  }
  localStorage.setItem("contactsList", JSON.stringify(contactsList));
  console.log(contactsList[index]);
  showContacts();
}

function addRemoveToEmergency(index,btn){
  if(contactsList[index].emergency == true){
  contactsList[index].emergency = false;
  btn.classList.remove('emergency-activated');
 }
  else if(contactsList[index].emergency == false){
  contactsList[index].emergency = true;
  btn.classList.add('emergency-activated');
  }
  localStorage.setItem("contactsList", JSON.stringify(contactsList));
  console.log(contactsList[index]);
  showContacts();
}

function makeContactFavorite(){
  var favoriteCard = "";
    for(var i = 0 ; i <contactsList.length ; i++){
      if(contactsList[i].favorite=== true){
        var imageMarkup = contactsList[i].image ? 
          `<img class="contact-image" src="${contactsList[i].image}" alt="user-image">`
          : `<span class="contact-name-letters">${getInitials(contactsList[i].name)}</span>`;

        favoriteCard += `
          <a href="#" class="favorite-contact special-contact d-flex justify-content-between mt2">
            <div class="favorite-contact-name-div">
              <div class="favorite-contact-name special-contact-name d-flex gap-2">
                ${imageMarkup}
                <div class="favorite-contact-name-phone special-contact-name-phone">
                  <p class="contact-name"> ${contactsList[i].name}</p>
                  <p class="contact-phone">${contactsList[i].phone}</p>
                </div>
              </div>
            </div>
            <button type="button" class="call-btn btn" title="call">
                <i class="fa-solid fa-phone"></i>
            </button>
          </a>
        `
      } 
    } 
    document.getElementById("favorite-details").innerHTML = favoriteCard ; 
}


function makeContactEmergency(){
  var emergencyCard = "";
      for(var i = 0 ; i <contactsList.length ; i++){
        if(contactsList[i].emergency=== true){
          var imageMarkup = contactsList[i].image ? 
            `<img class="contact-image" src="${contactsList[i].image}" alt="user-image">`
            : `<span class="contact-name-letters">${getInitials(contactsList[i].name)}</span>`;

          emergencyCard += `
            <a href="#" class="emergency-contact special-contact d-flex justify-content-between mt-2">
              <div class="emergency-contacts-name-div">
                <div class="emergency-contact-name special-contact-name d-flex gap-2">
                ${imageMarkup}
                <div class="emergency-contact-name-phone special-contact-name-phone">
                  <p class="contact-name">${contactsList[i].name}</p>
                  <p class="contact-phone">${contactsList[i].phone}</p>
                </div>
              </div>
              </div>
              <button type="button" class="call-btn btn" title="call">
                  <i class="fa-solid fa-phone"></i>
              </button>
            </a>
          `
        } 
      } 
      document.getElementById("emergency-details").innerHTML = emergencyCard ; 
}


// Some Notes for You:

// On page load
// if (localStorage.getItem("contactsList") != null) loads saved data → showContacts() runs immediately.

// Inside showContacts() itself (this is the core render loop):
// it rebuilds every card's HTML from contactsList, calling getInitials() for avatars without a photo, then at the end calls, in this exact order:

// countTotalFavoriteContacts() – counts favorites, writes the "Favorites" summary card
// countTotalContacts() – writes the "Total" summary card
// countTotalEmergencyContacts() – writes the "Emergency" summary card
// makeContactFavorite() – rebuilds the right-side "Favorites" panel
// makeContactEmergency() – rebuilds the right-side "Emergency" panel

// The four entry points that trigger this whole cascade:

// 1-addcontact() → validates via validName(), validEmail(), validPhone(), checks for duplicates via normalizePhone(),
// pushes to contactsList, saves to localStorage, then calls showContacts().

// 2-updateContact(index) → just pre-fills the modal and swaps which save button shows;
// the actual write happens when the user clicks Save, which calls saveContact() → same validation/duplicate flow → contactsList.splice() → localStorage.setItem() → showContacts()

// 3-addRemoveToFavorite(index, btn) / addRemoveToEmergency(index, btn) → flips the boolean on that contact, saves to localStorage, then calls showContacts()

// 4-deleteContact(index) → after a SweetAlert2 confirmation, splices the contact out, saves, then calls showContacts()

// One independent branch:
// searchContact() doesn't go through showContacts() at all — it calls validsearch(), 
// then filters and re-renders the card markup directly, so it doesn't refresh the summary counters or the side panels.

// The pattern is consistent throughout:
// mutate contactsList → persist to localStorage → call showContacts() → let it re-render everything and recalculate state.
// That's what keeps the UI and the stored data in sync after every action.

// Why the numbers change instantly, without a reload:

// Nothing here ever touches the server or reloads the page — it's all happening inside the browser's memory and the DOM, synchronously, in JavaScript:

// You click the star button → onclick="addRemoveToFavorite(index, this)" fires.
// That function flips contactsList[index].favorite from true/false right there in the in-memory array.
// It saves that array to localStorage (so it survives a refresh).
// It calls showContacts(), which rebuilds the HTML string for every card and recalculates the counters, 
// then does document.getElementById(...).innerHTML = ... to shove the new HTML into the page.

// That innerHTML assignment is what makes it feel instant — the browser repaints only that piece of the page, 
// in milliseconds, with no network round-trip and no reload. 
// "No reload" isn't a special feature you built — it's just what happens whenever JS updates the DOM directly instead of the browser fetching a new page.

// Why some functions call showContacts() and others don't

// The rule your code (correctly) follows is: only call showContacts() if you changed contactsList.

// showContacts()'s entire job is: read contactsList → rebuild the DOM to match it. 
// So it only needs to run after something has actually mutated that array:

// addcontact(), saveContact(), deleteContact(), addRemoveToFavorite(), addRemoveToEmergency() — these all push, splice, or flip a property on contactsList. 
// They call showContacts() because the data just changed and the screen needs to catch up.

// validName(), validEmail(), validPhone(), validsearch(), getInitials(), normalizePhone(), clearInputs(), closeContactModal(), updateContact() — none of these touch contactsList. 
// validName() just toggles a red/green border on one input field while you type. 
// Calling showContacts() there would rebuild every single contact card on every keystroke, for no reason — wasted work, 
// and the input might even lose focus while typing.


// Why showContacts() only calls some functions, not all:

// showContacts() calls exactly the functions that compute things derived from contactsList that 
// live outside the main card list: the three summary counters and the two side panels. 
// Those five are sub-renderers — each owns one small piece of the page that also needs to reflect the current data.

// It doesn't call things like addcontact(), deleteContact(), or the valid...() functions because those aren't rendering anything
// — they're input handlers (respond to a click/keystroke) and validators (check one field). showContacts() isn't supposed to know 
// about user input at all; it just renders whatever contactsList currently contains.


// Why you can't just make everything call showContacts(), or make showContacts() call everything:
// Two concrete problems would show up immediately:

// Infinite loops. If showContacts() called addcontact(), and addcontact() calls showContacts() at the end 
// — that's a function calling itself forever, and the browser tab freezes/crashes.

// Wasted, wrong-timed work. validName() runs on every keystroke in the name field (oninput="validName()"). 
// If it also called showContacts(), you'd re-render all contact cards on every letter typed — the input could lose focus mid-typing, 
// and you'd be doing hundreds of unnecessary DOM rebuilds for a field that hasn't even been submitted yet.

// The underlying principle (this is a real, named concept — separation of concerns) is: each function should do one job.

// Mutators change the data (addcontact, deleteContact, addRemoveToFavorite...)
// The renderer (showContacts) turns data into DOM
// Sub-renderers render one derived piece (countTotalContacts, makeContactFavorite...)
// Validators/utilities check or transform a value and hand back true/false or a string (validName, normalizePhone, getInitials)

// Mutators call the renderer because they changed the data. The renderer calls sub-renderers because they display derived data. 
// Validators and utilities call neither, because they don't touch the shared data at all. 
// If you collapsed this into "everything calls everything," you'd lose that structure — and get either infinite recursion or a laggy, over-rendering UI.
