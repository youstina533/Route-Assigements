import {showMealDetails} from "./mealDetails.js";
const navLinks = document.querySelectorAll(".nav-link ");
const navBar = document.querySelector("nav");
const firstNavLink = document.querySelector(".first-navLink");
export let mealsArray = [];
 
async function getMealsBySearchApi(mealValue){
    let searchMeals=[];
    let res = await fetch(`https://nutriplan-api.vercel.app/api/meals/search?q=${mealValue}&page=1&limit=25`);
    var dataFromApi = await res.json();
    searchMeals = dataFromApi.results;
    showMeals(searchMeals);
}

async function getMealsByAreaApi(mealValue){
   let searchMeals=[];
    let res = await fetch(`https://nutriplan-api.vercel.app/api/meals/filter?area=${mealValue}&page=1&limit=25`);
    var dataFromApi = await res.json();
    searchMeals = dataFromApi.results;
    showMeals(searchMeals);
}

async function getAllMealsApi(){
    let searchMeals=[];
    let res = await fetch("https://nutriplan-api.vercel.app/api/meals/search?page=1&limit=25");
    var dataFromApi = await res.json();
    searchMeals = dataFromApi.results;
    showMeals(searchMeals);
}

async function getMealsByCategoryApi(mealValue){
    let searchMeals=[];
    let res = await fetch(`https://nutriplan-api.vercel.app/api/meals/filter?category=${mealValue}&page=1&limit=25`);
    var dataFromApi = await res.json();
    searchMeals = dataFromApi.results;
    showMeals(searchMeals);
}

async function getCategoriesApi(){
    let categoriesBtns=[];
    let res = await fetch("https://nutriplan-api.vercel.app/api/meals/categories");
    var dataFromApi = await res.json();
    categoriesBtns = dataFromApi.results;
    showCategoryButtons(categoriesBtns);
}

async function getAreasApi(){
    let areasBtns=[];
    let res = await fetch("https://nutriplan-api.vercel.app/api/meals/areas");
    var dataFromApi = await res.json();
    areasBtns = dataFromApi.results;
    showAreasButtons(areasBtns);
}

function showAreasButtons(areasBtns){
    let areasButtons = "";
    for(let i =0; i < 8; i++ ){
       areasButtons += `
       <button
            class=" area-button px-4 py-2 bg-gray-100 text-gray-700 rounded-full font-medium text-sm whitespace-nowrap hover:bg-gray-200 transition-all"
            data-category="${areasBtns[i].name}"
        >
           ${areasBtns[i].name}
        </button>
       `
    }
    document.getElementById("area-btn").innerHTML = areasButtons;
}

function showCategoryButtons(categoriesBtns){
    let categoriesButtons = "";
    for(let i =0; i < 12 ; i++ ){
       let iconVariable = "";
       if(categoriesBtns[i].name === "Beef" || categoriesBtns[i].name === "Chicken" || categoriesBtns[i].name === "Lamb" ){
        iconVariable = "fa-solid fa-drumstick-bite";
       }
       else if(categoriesBtns[i].name === "Dessert"){
          iconVariable = "fa-solid fa-cake-candles" ;
       }
       else if(categoriesBtns[i].name === "Vegan" || categoriesBtns[i].name === "Vegetarian"){
          iconVariable = "fa-solid fa-leaf" ;
       }
       else if(categoriesBtns[i].name === "Seafood"){
          iconVariable ="fa-solid fa-fish";
       }
       else if(categoriesBtns[i].name === "Pork"){
          iconVariable ="fa-solid fa-bacon";
       }
       else if(categoriesBtns[i].name === "Side"){
          iconVariable = "fa-solid fa-plate-wheat";
       }
       else if(categoriesBtns[i].name === "Starter"){
          iconVariable = "fa-solid fa-utensils";
       }
       else if(categoriesBtns[i].name === "Miscellaneous"){
          iconVariable ="fa-solid fa-bowl-rice";
       }
       else if(categoriesBtns[i].name === "Pasta"){
          iconVariable ="fa-solid fa-bowl-food";
       }
       categoriesButtons += `
        <div
            class="category-card bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-3 border border-emerald-200 hover:border-emerald-400 hover:shadow-md cursor-pointer transition-all group"
            data-category="${categoriesBtns[i].name}"
        >
            <div class="flex items-center gap-2.5">
            <div
                class="text-white w-9 h-9 bg-gradient-to-br from-emerald-400 to-green-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm"
            >
                <i class="${iconVariable}"></i>
            </div>
            <div>
                <h3 class="text-sm font-bold text-gray-900">${categoriesBtns[i].name}</h3>
            </div>
            </div>
        </div>
       `
    }
    document.getElementById("categories-grid").innerHTML = categoriesButtons;
}

function chooseCategory(){
   const categoryBtns = document.getElementById("categories-grid");
   categoryBtns.addEventListener("click",function(e){
      const target = e.target.closest(".category-card");
      let categoryName = target.getAttribute("data-category");
      getMealsByCategoryApi(categoryName);
   });
}

function chooseArea(){
   const areaBtns = document.getElementById("area-btn");
   areaBtns.addEventListener("click",function(e){
      const target = e.target.closest(".area-button");
      let areaName = target.getAttribute("data-category");
      getMealsByAreaApi(areaName);
   });
}

function getAllMeals(){
  const allRecipesBtn = document.getElementById("all-recipes-btn");
  const searchInput = document.getElementById("search-input");
  allRecipesBtn.addEventListener("click", function(){
  getAllMealsApi();
  searchInput.value = "";
 })
}

function searchMeal(){
  const searchInput = document.getElementById("search-input");
  let debounceTimer;
  searchInput.addEventListener("input",function(){
  clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      getMealsBySearchApi(searchInput.value);
    }, 300);
  })
}

function showMeals(searchMeals){
    mealsArray = searchMeals;
    var mealCard = "";
    if(searchMeals.length === 0){
        mealCard = `
        <div class="flex flex-col items-center justify-center py-12 text-center">
            <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <i class="fa-solid fa-search text-gray-400 text-2xl"></i>
            </div>
            <p class="text-gray-500 text-lg">No recipes found</p>
            <p class="text-gray-400 text-sm mt-2">Try searching for something else</p>
        </div>
        `
        }
    for(let i = 0; i < searchMeals.length; i++ ){
          mealCard += `
            <div
                class="recipe-card bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer group"
                data-meal-id="${searchMeals[i].id}"
            >
                <div class="relative h-48 overflow-hidden">
                <img
                    class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    src="${searchMeals[i].thumbnail}"
                    alt="${searchMeals[i].name}"
                    loading="lazy"
                />
                <div class="absolute bottom-3 left-3 flex gap-2">
                    <span
                    class="px-2 py-1 bg-white/90 backdrop-blur-sm text-xs font-semibold rounded-full text-gray-700"
                    >
                    ${searchMeals[i].category}
                    </span>
                    ${searchMeals[i].area
                      ?`<span class="px-3 py-1 bg-blue-500 text-white text-sm font-semibold rounded-full">${searchMeals[i].area}</span>`
                       : ''}
                </div>
                </div>
                <div class="p-4">
                <h3
                    class="text-base font-bold text-gray-900 mb-1 group-hover:text-emerald-600 transition-colors line-clamp-1"
                >
                    ${searchMeals[i].name}
                </h3>
                <p class="text-xs text-gray-600 mb-3 line-clamp-2">
                    ${searchMeals[i].instructions}
                </p>
                <div class="flex items-center justify-between text-xs">
                    <span class="font-semibold text-gray-900">
                    <i class="fa-solid fa-utensils text-emerald-600 mr-1"></i>
                    ${searchMeals[i].category}
                    </span>
                    <span class="font-semibold text-gray-500">
                    ${searchMeals[i].area?.[1] 
                      ?`<i class="fa-solid fa-globe text-blue-500 mr-1"></i>
                      <span class="  text-black text-sm font-semibold">${searchMeals[i].area}</span>`
                       : ''}
                    </span>
                </div>
                </div>
            </div>
        `

        }
    document.getElementById("recipes-grid").innerHTML = mealCard;
}

function goToMeal(){
    const searchFiltersSection = document.getElementById("search-filters-section");
    const mealCategoriesSection  = document.getElementById("meal-categories-section");
    const allRecipesSection = document.getElementById("all-recipes-section");
    const mealDetails = document.getElementById("meal-details");
    const productsSection = document.getElementById("products-section");
    const foodlogSection = document.getElementById("foodlog-section");
    const recipesSection = document.getElementById("recipes-grid");

    recipesSection.addEventListener("click",function(e){
    let target = e.target.closest(".recipe-card")
    if (!target) return;
    searchFiltersSection.classList.add("hidden");
    mealCategoriesSection.classList.add("hidden");
    allRecipesSection.classList.add("hidden");
    mealDetails.classList.remove("hidden");
    foodlogSection.classList.add("hidden");
    productsSection.classList.add("hidden");
    showMealDetails(target.getAttribute("data-meal-id"));
    });
}

export{
    searchMeal,
    getAllMeals,
    getAllMealsApi,
    getAreasApi,
    getCategoriesApi,
    chooseCategory,
    chooseArea,
    goToMeal
}