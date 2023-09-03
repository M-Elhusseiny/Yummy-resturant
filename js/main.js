const navBar = document.querySelector(".navbar");
const navBarBars = document.querySelector("#togglerIconBars");
const navBarXmark = document.querySelector("#togglerIconXmark");
const navLink1 = document.querySelector(".nav-item1");
const navLink2 = document.querySelector(".nav-item2");
const navLink3 = document.querySelector(".nav-item3");
const navLink4 = document.querySelector(".nav-item4");
const navLink5 = document.querySelector(".nav-item5");

$(".navbar-toggler").click(function () {
  navBar.classList.toggle("navbar-translate");
  navBarBars.classList.toggle("hide");
  navBarXmark.classList.toggle("hide");

  setTimeout(() => {
    navLink1.classList.toggle("animate__fadeInUp");
    setTimeout(() => {
      navLink2.classList.toggle("animate__fadeInUp");
      setTimeout(() => {
        navLink3.classList.toggle("animate__fadeInUp");
        setTimeout(() => {
          navLink4.classList.toggle("animate__fadeInUp");
          setTimeout(() => {
            navLink5.classList.toggle("animate__fadeInUp");
          }, 50);
        }, 60);
      }, 70);
    }, 80);
  }, 90);
});
// $(selector).toggleClass(className);
const searchBtn = document.querySelector("#searchBtn");
const areaBtn = document.querySelector("#areaBtn");
const ingredientsBtn = document.querySelector("#ingredientsBtn");
const contactBtn = document.querySelector("#contactBtn");

const searchSection = document.querySelector("#searchSection");
const mainSection = document.querySelector("#mainSection");
const categoryBtn = document.querySelector("#categoryBtn");

searchBtn.addEventListener("click", function () {
  navBar.classList.toggle("navbar-translate");
  navBarBars.classList.toggle("hide");
  navBarXmark.classList.toggle("hide");
  displaySearch();
});

function displayMeals(data) {
  let contain = [];
  for (let i = 0; i < data.length; i++) {
    contain += ` <div class="col-md-3">
    <div class="img-box position-relative overflow-hidden rounded-3" onclick="getListOneMeal(${data[i].idMeal})">
      <img class="w-100" src="${data[i].strMealThumb}" alt="" />
      <div
        class="inner-layout-box position-absolute top-0 end-0 start-0 bottom-0 d-flex align-items-center justify-content-start"
      >
        <h3 class='ps-3'>${data[i].strMeal}</h3>
        <p></p>
      </div>
    </div>
  </div>`;
  }
  let cartona = `<div class="container">
  <div id="mealsContainer" class="row g-4">
  ${contain}
  </div>
  </div>`;
  mainSection.innerHTML = cartona;
}

async function getListMeals() {
  const meals = await fetch(
    "https://www.themealdb.com/api/json/v1/1/search.php?s="
  );

  const mealsRes = await meals.json();
  displayMeals(mealsRes.meals);
  $("#loading").fadeOut(() => {
    $("body").css({ overflow: "auto" });
  });
}
$(document).ready(function () {
  getListMeals();
});
// SEARCH
///////////////
function displaySearch() {
  let cartona = `<div class="container">
  <div class="row pb-5">
    <div class="mb-3 col-md-6">
      <input
        type="text"
        class="form-control"
        id="searchByNameInput"
        placeholder="Search By Name"
      />
    </div>
    <div class="mb-3 col-md-6">
      <input
        type="text"
        class="form-control"
        id="searchByLetterInput"
        placeholder="Search By Letter"
      />
    </div>
  </div>
  <div id="mealsContainerS" class="row g-4">
  
  </div>
</div> `;
  mainSection.innerHTML = cartona;
  $("#searchByLetterInput").keyup(function (e) {
    let event = e.target.value;
    if (event === "") {
      document.querySelector("#mealsContainerS").innerHTML = "";
    } else {
      getListMealsByLetter(event);
    }
  });
  function displayMealsSearchLetter(data) {
    let contain = [];
    for (let i = 0; i < data.length; i++) {
      contain += ` <div class="col-md-3">
    <div class="img-box position-relative overflow-hidden rounded-3" onclick="getListOneMeal(${data[i].idMeal})" >
      <img class="w-100" src="${data[i].strMealThumb}" alt="" />
      <div
        class="inner-layout-box position-absolute top-0 end-0 start-0 bottom-0 d-flex align-items-center justify-content-start"
      >
        <h3 class='ps-3'>${data[i].strMeal}</h3>
      </div>
    </div>
  </div>`;
    }
    document.querySelector("#mealsContainerS").innerHTML = contain;
  }

  async function getListMealsByLetter(letter) {
    const meals = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`
    );

    const mealsRes = await meals.json();
    displayMealsSearchLetter(mealsRes.meals);
  }
  $("#searchByNameInput").keyup(function (e) {
    let event = e.target.value;
    if (event === "") {
      document.querySelector("#mealsContainerS").innerHTML = "";
    } else {
      getListMealsByName(event);
    }
  });
  function displayMealsSearchName(data) {
    let contain = [];
    for (let i = 0; i < data.length; i++) {
      contain += ` <div class="col-md-3">
    <div class="img-box position-relative overflow-hidden rounded-3" onclick="getListOneMeal(${data[i].idMeal})" >
      <img class="w-100" src="${data[i].strMealThumb}" alt="" />
      <div
        class="inner-layout-box position-absolute top-0 end-0 start-0 bottom-0 d-flex align-items-center justify-content-start"
      >
        <h3 class='ps-3'>${data[i].strMeal}</h3>
      </div>
    </div>
  </div>`;
    }
    document.querySelector("#mealsContainerS").innerHTML = contain;
  }

  async function getListMealsByName(letter) {
    const meals = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${letter}`
    );

    const mealsRes = await meals.json();
    displayMealsSearchName(mealsRes.meals);
  }
}

///////////////////////////
// CATEGORY

$("#categoryBtn").click(function () {
  navBar.classList.toggle("navbar-translate");
  navBarBars.classList.toggle("hide");
  navBarXmark.classList.toggle("hide");
  getListMealsCategory();
});

function displayMealsCategory(data) {
  let contain = [];
  for (let i = 0; i < data.length; i++) {
    contain += ` 
    <div class="col-md-3">
    <div class="img-box position-relative overflow-hidden rounded-3" onclick="getListMealsCategoryOne('${
      data[i].strCategory
    }')">
      <img class="w-100" src="${data[i].strCategoryThumb}" alt="" />
      <div
        class="inner-layout-box position-absolute top-0  start-0 text-center position-absolute  text-black p-2"
      >
        <h3>${data[i].strCategory}</h3>
        <p>${data[i].strCategoryDescription
          .split(" ")
          .slice(0, 15)
          .join(" ")}</p>
      </div>
    </div>
  </div>
   `;
  }
  let cartona = `<div class="container">
<div id="mealsContainer" class="row g-4">
${contain}
</div>
</div>
`;
  mainSection.innerHTML = cartona;
}

async function getListMealsCategory() {
  const meals = await fetch(
    `https://www.themealdb.com/api/json/v1/1/categories.php`
  );

  const mealsRes = await meals.json();
  displayMealsCategory(mealsRes.categories);
  $(document).ready(function () {
    $("#loading").fadeOut(() => {
      $("body").css({ overflow: "auto" });
    });
  });
}
//////////////
function displayMealsCategoryOne(data) {
  let contain = [];

  for (let i = 0; i < data.length; i++) {
    contain += ` <div class="col-md-3">
    <div class="img-box position-relative overflow-hidden rounded-3" onclick="getListOneMeal(${data[i].idMeal})" >
      <img class="w-100" src="${data[i].strMealThumb}" alt="" />
      <div
        class="px-1 py-3 inner-layout-box position-absolute top-0 end-0 start-0 bottom-0 d-flex flex-column gap-2 text-center justify-content-center"
      >
        <h3>${data[i].strMeal}</h3>
       
      </div>
    </div>
  </div> `;
  }
  let cartona = `<div class="container">
  <div id="mealsContainer" class="row g-4">
  ${contain}
  </div>
  </div>`;
  mainSection.innerHTML = cartona;
}
async function getListMealsCategoryOne(meal) {
  const meals = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${meal}`
  );

  const mealsRes = await meals.json();
  displayMealsCategoryOne(mealsRes.meals);
  $("#loading").fadeOut(() => {
    $("body").css({ overflow: "auto" });
  });
}
///////////////////////////
// AREA

$("#areaBtn").click(function () {
  navBar.classList.toggle("navbar-translate");
  navBarBars.classList.toggle("hide");
  navBarXmark.classList.toggle("hide");
  getListMealsArea();
});

function displayMealsArea(data) {
  let contain = [];
  for (let i = 0; i < data.length; i++) {
    contain += ` <div class="col-md-3">
    <div class="img-box text-center  d-flex flex-column" onclick="getListMealsAreaOne('${data[i].strArea}')">
      
      <i class="fa-solid fa-house-laptop fa-4x text-grey"></i>
        <h3 class="text-grey">${data[i].strArea}</h3>
       
      
    </div>
  </div> `;
  }
  let cartona = `<div class="container">
  <div id="mealsContainer" class="row g-4">
  ${contain}
  </div>
  </div>`;
  mainSection.innerHTML = cartona;
}
async function getListMealsArea() {
  const meals = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?a=list`
  );

  const mealsRes = await meals.json();
  displayMealsArea(mealsRes.meals);
  $("#loading").fadeOut(() => {
    $("body").css({ overflow: "auto" });
  });
}
//////////////
function displayMealsAreaOne(data) {
  let contain = [];
  for (let i = 0; i < data.length; i++) {
    contain += ` <div class="col-md-3">
    <div class="img-box position-relative overflow-hidden rounded-3" onclick="getListOneMeal(${data[i].idMeal})">
      <img class="w-100" src="${data[i].strMealThumb}" alt="" />
      <div
        class="px-1 py-3 inner-layout-box position-absolute top-0 end-0 start-0 bottom-0 d-flex flex-column gap-2 text-center justify-content-center"
      >
        <h3>${data[i].strMeal}</h3>
       
      </div>
    </div>
  </div> `;
  }
  let cartona = `<div class="container">
  <div id="mealsContainer" class="row g-4">
  ${contain}
  </div>
  </div>`;
  mainSection.innerHTML = cartona;
}
async function getListMealsAreaOne(meal) {
  const meals = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?a=${meal}`
  );
  const mealsRes = await meals.json();
  displayMealsAreaOne(mealsRes.meals);
  $("#loading").fadeOut(() => {
    $("body").css({ overflow: "auto" });
  });
}
// INGREDIENTS
$("#ingredientsBtn").click(function () {
  navBar.classList.toggle("navbar-translate");
  navBarBars.classList.toggle("hide");
  navBarXmark.classList.toggle("hide");
  getListMealsIng();
});
function displayMealsIng(data) {
  let contain = [];
  for (let i = 0; i < 20; i++) {
    contain += ` <div class="col-md-3">
    <div class="img-box text-center d-flex flex-column" onclick="getListMealsIngOne('${
      data[i].strIngredient
    }')">
      
      <i class="fa-solid fa-drumstick-bite fa-4x text-grey"></i>
        <h3 class="text-grey">${data[i].strIngredient}</h3>
        <p  class="text-grey">${data[i].strDescription
          .split(" ")
          .slice(0, 15)
          .join(" ")}</p>
      
      
    </div>
  </div> `;
  }
  let cartona = `<div class="container">
  <div id="mealsContainer" class="row g-4">
  ${contain}
  </div>
  </div>`;
  mainSection.innerHTML = cartona;
}
async function getListMealsIng() {
  const meals = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?i=list`
  );
  const mealsRes = await meals.json();
  displayMealsIng(mealsRes.meals);
  $("#loading").fadeOut(() => {
    $("body").css({ overflow: "auto" });
  });
}
//////////////

function displayMealsIngOne(data) {
  let contain = [];
  for (let i = 0; i < data.length; i++) {
    contain += ` <div class="col-md-3">
    <div class="img-box position-relative overflow-hidden rounded-3" onclick="getListOneMeal(${data[i].idMeal})" >
      <img class="w-100" src="${data[i].strMealThumb}" alt="" />
      <div
        class="px-1 py-3 inner-layout-box position-absolute top-0 end-0 start-0 bottom-0 d-flex flex-column gap-2 text-center justify-content-center"
      >
        <h3>${data[i].strMeal}</h3>
       
      </div>
    </div>
  </div> `;
  }
  let cartona = `<div class="container">
  <div id="mealsContainer" class="row g-4">
  ${contain}
  </div>
  </div>`;
  mainSection.innerHTML = cartona;
}
async function getListMealsIngOne(meal) {
  const meals = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${meal}`
  );
  const mealsRes = await meals.json();
  displayMealsIngOne(mealsRes.meals);
  $("#loading").fadeOut(() => {
    $("body").css({ overflow: "auto" });
  });
}
// LOOKUP MEAL
function displayOneMeal(data) {
  let contain = [];
  let ingredients = ``;

  for (let i = 1; i <= 20; i++) {
    let data1 = data[0];
    if (data1[`strIngredient${i}`]) {
      ingredients += `<span class="alert alert-info m-2 p-1">${
        data1[`strMeasure${i}`]
      } ${data1[`strIngredient${i}`]}</span>`;
    }
  }

  let tags = data[0].strTags?.split(",");
  if (!tags) tags = [];

  let tagsStr = "";
  for (let i = 0; i < tags.length; i++) {
    tagsStr += `
      <li class="alert alert-danger m-2 p-1">${tags[i]}</li>`;
  }

  for (let i = 0; i < data.length; i++) {
    contain += `  <div class="col-md-4">
    <img
      src="${data[i].strMealThumb}"
      class="rounded-3 w-100"
      alt=""
    />
    
    <h3 class="text-white">${data[i].strMeal}</h3>
  </div>
  <div class="col-md-7 text-white">
    <h2>Instructions</h2>
    <p>${data[i].strInstructions}</p>
    <div class="meal-details-box my-4">
      <h3 class="meal-details">Area: ${data[i].strArea}</h3>
      <h3 class="meal-details">Category : ${data[i].strCategory}</h3>
      <h3 class="meal-details">Recipes :</h3>
    </div>
    <div class="meals-recipes-box">
     ${ingredients}
    </div>
    
    <h3 class="meal-details my-3">Tags:</h3>
    
    <ul class="d-flex tags-box">${tagsStr}</ul>
    <div class="meal-links">
    <a href="${data[i].strSource}" target="_blank" class="btn btn-success">Source</a>
    <a href="${data[i].strYoutube}" target="_blank" class="btn btn-danger">Youtube</a>
    </div>
  </div> `;
  }
  let cartona = `<div class="container">
  <div id="mealsContainer" class="row g-4">
  ${contain}
  </div>
  </div>`;
  mainSection.innerHTML = cartona;
}
async function getListOneMeal(meal) {
  const meals = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal}`
  );
  const mealsRes = await meals.json();
  displayOneMeal(mealsRes.meals);
  $("#loading").fadeOut(() => {
    $("body").css({ overflow: "auto" });
  });
}
/////////////////
//CONTACT US
contactBtn.addEventListener("click", function () {
  navBar.classList.toggle("navbar-translate");
  navBarBars.classList.toggle("hide");
  navBarXmark.classList.toggle("hide");
  displayContactUs();
});
function displayContactUs() {
  const cartona = `<div class="container vh-100 d-flex align-items-center">
  <form class="">
  <div class="row  align-items-center justify-content-center">
      <div class="col-md-6">
        <div class="mb-3">
          <input
          type="text" class="form-control" id="nameInput" placeholder="Enter Your Name"
            
            
          >
          </input>
          <div id="nameError" class="alert alert-danger my-2 d-none">
            Special characters and numbers not allowed
          </div>
        </div>
      </div>
      <div class="col-md-6">
        <div class="mb-3">
          <input
          type="email" class="form-control" id="email" placeholder="name@example.com"    
          >
          </input>
          <div id="emailError" class="alert alert-danger my-2 d-none">
            Email not valid *exemple@yyy.zzz
          </div>
        </div>
      </div>
      <div class="col-md-6">
        <div class="mb-3">
          <input
          type= "tel" class="form-control" id="phoneInput" placeholder="Enter Your phone Number"
           
            
          >
          </input>
          <div id="phoneError" class="alert alert-danger my-2 d-none">
            Enter valid Phone Number
          </div>
        </div>
      </div>
      <div class="col-md-6">
        <div class="mb-3">
          <input
          type="number" max="100" class="form-control" id="ageInput" placeholder="Enter Your Age"
          >
          </input>
          <div id="ageError" class="alert alert-danger my-2 d-none">
            Enter valid age
          </div>
        </div>
      </div>
      <div class="col-md-6">
        <div class="mb-3">
          <input
          type="password" class="form-control" id="passwordInput" placeholder="Enter Your Password"
            required
            
          >
          </input>
          <div id="passwordError" class="alert alert-danger my-2 d-none">
            Enter valid password *Minimum eight characters, at least one letter and one number:*
          </div>
        </div>
      </div>
      <div class="col-md-6">
        <div class="mb-3">
          <input
          type="password" class="form-control" id="rePasswordInput" placeholder="Enter Re password"
          >
          </input>
          <div id="rePasswordError" class="alert alert-danger my-2 d-none">
            Enter valid repassword
          </div>
        </div>
      </div>
      <div class="col-md-6 text-center">
        <div class="mb-3">
          <button id="btnSubmit" class="btn btn-outline-danger" type="submit">
            Submit 
          </button>
        </div>
      </div>
    </div>
  </form>
</div>`;
  mainSection.innerHTML = cartona;
  let form = document.querySelector("form");
  //EMAIL VALIDATE
  const email = document.querySelector("#email");
  function ValidateEmail() {
    const emailError = document.querySelector("#emailError");
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(email.value)) {
      emailError.classList.replace("d-block", "d-none");
      return true;
    }
    emailError.classList.replace("d-none", "d-block");
    return false;
  }
  $("#email").keyup(function () {
    ValidateEmail();
  });
  //////////////
  // NAME VALIDATE
  const nameInput = document.querySelector("#nameInput");
  function ValidateName() {
    const nameError = document.querySelector("#nameError");
    const reg = /^[_A-z]*((-|\s)*[_A-z])*$/;
    if (reg.test(nameInput.value)) {
      nameError.classList.replace("d-block", "d-none");
      return true;
    }
    nameError.classList.replace("d-none", "d-block");
    return false;
  }
  $("#nameInput").keyup(function () {
    ValidateName();
  });
  ////////////
  // PHONE VALIDATE
  const phoneInput = document.querySelector("#phoneInput");
  function ValidatePhone() {
    const phoneError = document.querySelector("#phoneError");
    const reg = /^(\d{3})[- ]?(\d{3})[- ]?(\d{5})$/;
    if (reg.test(phoneInput.value)) {
      phoneError.classList.replace("d-block", "d-none");
      return true;
    }
    phoneError.classList.replace("d-none", "d-block");

    return false;
  }
  $("#phoneInput").keyup(function () {
    ValidatePhone();
  });
  ///////////////
  // AGE VALIDATE
  const ageInput = document.querySelector("#ageInput");
  function ValidateAge() {
    const ageError = document.querySelector("#ageError");
    const reg = /^[0-9]{0,3}$/;
    if (reg.test(ageInput.value)) {
      ageError.classList.replace("d-block", "d-none");
      return true;
    }
    ageError.classList.replace("d-none", "d-block");

    return false;
  }
  $("#ageInput").keyup(function () {
    ValidateAge();
  });
  ///////////////
  // PASS VALIDATE
  const passwordInput = document.querySelector("#passwordInput");
  function ValidatePass() {
    const passwordError = document.querySelector("#passwordError");
    const reg = /^(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;
    if (reg.test(passwordInput.value)) {
      passwordError.classList.replace("d-block", "d-none");
      return true;
    }
    passwordError.classList.replace("d-none", "d-block");
    return false;
  }
  $("#passwordInput").keyup(function () {
    ValidatePass();
  });
  ///////////////
  // REPASS VALIDATE
  const rePasswordInput = document.querySelector("#rePasswordInput");
  function ValidateRePass() {
    const rePasswordError = document.querySelector("#rePasswordError");
    if (rePasswordInput.value === passwordInput.value) {
      rePasswordError.classList.replace("d-block", "d-none");
      return true;
    }
    rePasswordError.classList.replace("d-none", "d-block");
    return false;
  }
  $("#rePasswordInput").keyup(function () {
    ValidateRePass();
  });
  ///////
  function disabledBtn() {
    if (
      ValidateEmail() &&
      ValidateName() &&
      ValidatePhone() &&
      ValidatePass() &&
      ValidateRePass() &&
      ValidateRePass()
    ) {
      document.querySelector("#btnSubmit").disabled = false;
    } else {
      document.querySelector("#btnSubmit").disabled = true;
    }
  }

  form.addEventListener("input", () => {
    disabledBtn();
  });
  document.querySelector("#btnSubmit").disabled = true;
}
