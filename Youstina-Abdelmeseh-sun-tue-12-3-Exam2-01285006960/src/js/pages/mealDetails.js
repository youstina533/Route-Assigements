import {goToMeal, mealsArray} from "./nutritionPage.js";
import * as logFunctions from "./foodLog.js"
export let logMealObject = ""
export let mealIdNumber = "";
export let mealInformation = "";
async function getMealInformation(recipeName, ingredients){
    let res = await fetch("https://nutriplan-api.vercel.app/api/nutrition/analyze", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "x-api-key": "Q67L4oT9xBGASwrrf41gg7gbcdeFYpkPvMXelZVU"
        },
        body: JSON.stringify({
            recipeName: recipeName,
            ingredients: ingredients
        })
    });
    var dataFromApi = await res.json();
    return dataFromApi;  
}

function backToMeals(){
    let backBtn = document.getElementById("back-to-meals-btn");
    const searchFiltersSection = document.getElementById("search-filters-section");
    const mealCategoriesSection  = document.getElementById("meal-categories-section");
    const allRecipesSection = document.getElementById("all-recipes-section");
    const mealDetails = document.getElementById("meal-details");
    const productsSection = document.getElementById("products-section");
    const foodlogSection = document.getElementById("foodlog-section");
    const recipesSection = document.getElementById("recipes-grid");

    backBtn.addEventListener("click", function(){
        searchFiltersSection.classList.remove("hidden");
        mealCategoriesSection.classList.remove("hidden");
        allRecipesSection.classList.remove("hidden");
        mealDetails.classList.add("hidden");
        foodlogSection.classList.add("hidden");
        productsSection.classList.add("hidden");
    });
}

function getYoutubeEmbedUrl(youtubeUrl) {
    if (!youtubeUrl) return "";
    const match = youtubeUrl.match(/(?:v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
    const videoId = match ? match[1] : null;
    return videoId ? `https://www.youtube.com/embed/${videoId}` : "";
}

function calcPercentage(currentNumber,totalNumber){
    let percentageNumber = (currentNumber/totalNumber)*100;
    console.log("percentage");
    return percentageNumber;
}

function showNutrition(nutritionSection){
    console.log("nutrition");
    return nutritionSection;
}

async function showMealDetails(mealId){
    mealIdNumber = mealId
    const loadingSpinner = `
        <div class="flex items-center justify-center py-12">
           <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
        </div>
    `;
    document.getElementById("meal-hero-section").innerHTML = loadingSpinner;
    document.getElementById("meal-main-content").innerHTML = "";
    document.getElementById("log-btn").innerHTML = "";
   let mealHeroSeaction = "";
   let mealLogBtn = "";
   let mealDetails = ""

   for(let i = 0; i < mealsArray.length; i++){
    if(mealsArray[i].id === mealId ){
        let ingredients = "";
        let instructions = "";
        let number = 1;

        for(let y = 0; y < mealsArray[i].ingredients.length ; y++ ){
           ingredients += `
             <div class="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-emerald-50 transition-colors">
                <input type="checkbox" class="ingredient-checkbox w-5 h-5 text-emerald-600 rounded border-gray-300"/>
                <span class="text-gray-700">
                    <span class="font-medium text-gray-900">${mealsArray[i].ingredients[y].measure}</span> 
                    ${mealsArray[i].ingredients[y].ingredient}
                </span>
            </div>   
        `
        }

        for(let z = 0; z < mealsArray[i].instructions.length ; z++ ){    
        instructions += `
         <div class="flex gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors">
            <div class="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold shrink-0">
                ${number}
            </div>
            <p class="text-gray-700 leading-relaxed pt-2">
                 ${mealsArray[i].instructions[z]}
            </p>
        </div>
        ` 
        number++
        }

        let ingredientStrings = mealsArray[i].ingredients.map(item => `${item.measure} ${item.ingredient}`);
        let mealInfo = await getMealInformation(mealsArray[i].name, ingredientStrings); 
        console.log(mealInfo);
        mealInformation = mealInfo;

        let nutritionSection = `
            <div class="space-y-6">
                <!-- Nutrition Facts -->
                <div class="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
                <h2
                    class="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2"
                >
                    <i class="fa-solid fa-chart-pie text-emerald-600"></i>
                    Nutrition Facts
                </h2>
                <div id="nutrition-facts-container">
                    <p class="text-sm text-gray-500 mb-4">Per serving</p>

                    <div
                    class="text-center py-4 mb-4 bg-linear-to-br from-emerald-50 to-teal-50 rounded-xl"
                    >
                    <p class="text-sm text-gray-600">Calories per serving</p>
                    <p class="text-4xl font-bold text-emerald-600">${mealInfo.data.perServing.calories}</p>
                    <p class="text-xs text-gray-500 mt-1">Total: ${mealInfo.data.totals.calories} cal</p>
                    </div>

                    <div class="space-y-4">
                    <div class="flex items-center justify-between">
                        <div class="flex items-center gap-2">
                        <div class="w-3 h-3 rounded-full bg-emerald-500"></div>
                        <span class="text-gray-700">Protein</span>
                        </div>
                        <span class="font-bold text-gray-900">${mealInfo.data.perServing.protein}g</span>
                    </div>
                    <div class="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                        <div class="bg-emerald-500 h-2 rounded-full overflow-hidden"
                            style="width: ${await calcPercentage(mealInfo.data.perServing.protein,50)}%">
                        </div>
                    </div>

                    <div class="flex items-center justify-between">
                        <div class="flex items-center gap-2">
                        <div class="w-3 h-3 rounded-full bg-blue-500"></div>
                        <span class="text-gray-700">Carbs</span>
                        </div>
                        <span class="font-bold text-gray-900">${mealInfo.data.perServing.carbs}g</span>
                    </div>
                    <div class="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                        <div
                        class="bg-blue-500 h-2 rounded-full overflow-hidden"
                        style="width: ${await calcPercentage(mealInfo.data.perServing.carbs,280)}%"
                        ></div>
                    </div>

                    <div class="flex items-center justify-between">
                        <div class="flex items-center gap-2">
                        <div class="w-3 h-3 rounded-full bg-purple-500"></div>
                        <span class="text-gray-700">Fat</span>
                        </div>
                        <span class="font-bold text-gray-900">${mealInfo.data.perServing.fat}g</span>
                    </div>
                    <div class="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                        <div
                        class="bg-purple-500 h-2 rounded-full overflow-hidden"
                        style="width: ${await calcPercentage(mealInfo.data.perServing.fat,100)}%"
                        ></div>
                    </div>

                    <div class="flex items-center justify-between">
                        <div class="flex items-center gap-2">
                        <div class="w-3 h-3 rounded-full bg-orange-500"></div>
                        <span class="text-gray-700">Fiber</span>
                        </div>
                        <span class="font-bold text-gray-900">${mealInfo.data.perServing.fiber}g</span>
                    </div>
                    <div class="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                        <div
                        class="bg-orange-500 h-2 rounded-full overflow-hidden"
                        style="width: ${await calcPercentage(mealInfo.data.perServing.fiber,30)}%"
                        ></div>
                    </div>

                    <div class="flex items-center justify-between">
                        <div class="flex items-center gap-2">
                        <div class="w-3 h-3 rounded-full bg-pink-500"></div>
                        <span class="text-gray-700">Sugar</span>
                        </div>
                        <span class="font-bold text-gray-900">${mealInfo.data.perServing.sugar}g</span>
                    </div>
                    <div class="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                        <div
                        class="bg-pink-500 h-2 rounded-full overflow-hidden"
                        style="width: ${await calcPercentage(mealInfo.data.perServing.sugar,50)}%"
                        ></div>
                    </div>
                    <div class="flex items-center justify-between">
                        <div class="flex items-center gap-2">
                        <div class="w-3 h-3 rounded-full bg-red-500"></div>
                        <span class="text-gray-700">Saturated Fat</span>
                        </div>
                        <span class="font-bold text-gray-900">${mealInfo.data.perServing.saturatedFat}g</span>
                    </div>
                    <div class="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                        <div
                        class="bg-red-500 h-2 rounded-full overflow-hidden"
                        style="width: ${await calcPercentage(mealInfo.data.perServing.saturatedFat,20)}%"
                        ></div>
                    </div>
                    </div>

                    <div class="mt-6 pt-6 border-t border-gray-100">
                    <h3 class="text-sm font-semibold text-gray-900 mb-3">
                        other
                    </h3>
                    <div class="grid grid-cols-2 gap-3 text-sm">
                        <div class="flex justify-between">
                        <span class="text-gray-600">Cholesterol</span>
                        <span class="font-medium">${mealInfo.data.perServing.cholesterol}mg</span>
                        </div>
                        <div class="flex justify-between">
                        <span class="text-gray-600">Sodium</span>
                        <span class="font-medium">${mealInfo.data.perServing.sodium}mg</span>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        `

        mealHeroSeaction = `
            <div class="relative h-80 md:h-96">
                <img
                src="${mealsArray[i].thumbnail}"
                alt="Teriyaki Chicken Casserole"
                class="w-full h-full object-cover"
                />
                <div
                class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"
                ></div>
                <div class="absolute bottom-0 left-0 right-0 p-8">
                <div class="flex items-center gap-3 mb-3">
                    <span
                    class="px-3 py-1 bg-emerald-500 text-white text-sm font-semibold rounded-full"
                    >${mealsArray[i].category}</span
                    >
                    ${mealsArray[i].area?.[1] 
                      ?`<span class="px-3 py-1 bg-blue-500 text-white text-sm font-semibold rounded-full">${mealsArray[i].area}</span>`
                       : ''}
                    ${mealsArray[i].tags?.[1] 
                      ?`<span class="px-3 py-1 bg-purple-500 text-white text-sm font-semibold rounded-full">${mealsArray[i].tags[1]}</span>`
                       : ''}
                </div>
                <h1 class="text-3xl md:text-4xl font-bold text-white mb-2">
                    ${mealsArray[i].name}
                </h1>
                <div class="flex items-center gap-6 text-white/90">
                    <span class="flex items-center gap-2">
                    <i class="fa-solid fa-clock"></i>
                      <span> 30 mins</span>   
                    </span>
                    <span class="flex items-center gap-2">
                    <i class="fa-solid fa-utensils"></i>
                     <span id="hero-servings">${mealInfo.data.servings} servings</span>
                    </span>
                    <span class="flex items-center gap-2">
                    <i class="fa-solid fa-fire"></i>
                     <span id="hero-calories">${mealInfo.data.perServing.calories} cal/serving</span>   
                    </span>
                </div>
                </div>
            </div>
        `
        document.getElementById("meal-hero-section").innerHTML = mealHeroSeaction;

        mealLogBtn = `
        <button
                id="log-meal-btn"
                class="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all"
                data-meal-id="${mealsArray[i].id}"
            >
                <i class="fa-solid fa-clipboard-list"></i>
                <span>Log This Meal</span>
            </button>
        `
        document.getElementById("log-btn").innerHTML = mealLogBtn;

        mealDetails= `
            <div class="lg:col-span-2 space-y-8">
                <!-- Ingredients -->
                <div class="bg-white rounded-2xl shadow-lg p-6">
                    <h2 class="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <i class="fa-solid fa-list-check text-emerald-600"></i>
                        Ingredients
                        <span class="text-sm font-normal text-gray-500 ml-auto"
                        >${mealsArray[i].ingredients.length}items</span>
                    </h2>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                      ${ingredients}
                    </div>
                </div>
                <!-- Instructions -->
                <div class="bg-white rounded-2xl shadow-lg p-6">
                <h2
                    class="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2"
                >
                    <i class="fa-solid fa-shoe-prints text-emerald-600"></i>
                    Instructions
                </h2>
                <div class="space-y-4">
                    ${instructions}
                </div>
            </div>
                <!-- Video Section -->
                ${mealsArray[i].youtube?
                `<div class="bg-white rounded-2xl shadow-lg p-6">
                    <h2 class="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <i class="fa-solid fa-video text-red-500"></i>
                        Video Tutorial
                    </h2>
                    <div class="relative aspect-video rounded-xl overflow-hidden bg-gray-100">
                        <iframe
                        src="${getYoutubeEmbedUrl(mealsArray[i].youtube)}"
                        class="absolute inset-0 w-full h-full"
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowfullscreen>
                        </iframe>
                    </div>
                </div>`
                : ''}
            </div>

            <!-- Right Column - Nutrition -->
             ${await showNutrition(nutritionSection)}
        `
        document.getElementById("meal-main-content").innerHTML = mealDetails;
    }
   }
}

function logMeal(){
  const logBtnContainer = document.getElementById("log-btn"); 
  logBtnContainer.addEventListener("click",function(e){  
    const logMealButton = e.target.closest("#log-meal-btn");
    if (!logMealButton)
        return;
   for(var i = 0 ; i < mealsArray.length ; i++){
     if(mealsArray[i].id === mealIdNumber ){
        var servingNumber = 1;
        console.log(mealIdNumber);
        console.log(mealInformation);
            let logModal = `
                    <div
                    id="log-meal-modal"
                    class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                    >
                    <div class="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
                        <div class="p-6">
                        <div class="flex items-center gap-4 mb-6">
                            <img
                            id="log-meal-modal-img"
                            src="${mealsArray[i].thumbnail}"
                            alt="Aussie Burgers"
                            class="w-14 h-14 rounded-xl object-cover"
                            />
                            <div>
                            <h3 class="text-xl font-bold text-gray-900">Log This Meal</h3>
                            <p id="log-meal-modal-name" class="text-gray-500">${mealsArray[i].name}</p>
                            </div>
                        </div>
                        <div class="mb-6">
                            <label class="block text-sm font-semibold text-gray-700 mb-2">
                            Number of Servings
                            </label>
                            <div class="flex items-center gap-3">
                            <button
                                id="servings-decrease-btn"
                                class="w-11 h-11 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 transition-all"
                                aria-label="Decrease servings"
                            >
                                <i class="fa-solid fa-minus"></i>
                            </button>
                            <input
                                id="servings-input"
                                type="text"
                                value="${servingNumber}"
                                readonly
                                class="flex-1 text-center border border-gray-300 rounded-lg py-2.5 font-bold text-lg text-gray-900 outline-none"
                            />
                            <button
                                id="servings-increase-btn"
                                class="w-11 h-11 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 transition-all"
                                aria-label="Increase servings"
                            >
                                <i class="fa-solid fa-plus"></i>
                            </button>
                            </div>
                        </div>
                        <div class="bg-emerald-50 rounded-xl p-4 mb-6">
                            <p class="text-sm font-medium text-gray-600 mb-3">
                            Estimated nutrition per serving:
                            </p>
                            <div class="grid grid-cols-4 gap-2 text-center">
                            <div>
                                <p id="modal-calories" class="text-2xl font-bold text-emerald-600">${mealInformation.data.perServing.calories}</p>
                                <p class="text-xs text-gray-500 mt-0.5">Calories</p>
                            </div>
                            <div>
                                <p id="modal-protein" class="text-2xl font-bold text-blue-600">${mealInformation.data.perServing.protein}g</p>
                                <p class="text-xs text-gray-500 mt-0.5">Protein</p>
                            </div>
                            <div>
                                <p id="modal-carbs" class="text-2xl font-bold text-orange-500">${mealInformation.data.perServing.carbs}g</p>
                                <p class="text-xs text-gray-500 mt-0.5">Carbs</p>
                            </div>
                            <div>
                                <p id="modal-fat" class="text-2xl font-bold text-purple-600">${mealInformation.data.perServing.fat}g</p>
                                <p class="text-xs text-gray-500 mt-0.5">Fat</p>
                            </div>
                            </div>
                        </div>
                        <div class="flex gap-3">
                            <button
                            id="log-meal-cancel-btn"
                            class="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl py-3 font-semibold transition-all"
                            >
                            Cancel
                            </button>
                            <button
                            id="log-meal-confirm-btn"
                            class="flex-1 bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-3 font-semibold transition-all flex items-center justify-center gap-2"
                            >
                            <i class="fa-solid fa-clipboard-list"></i>
                            Log Meal
                            </button>
                        </div>
                        </div>
                    </div>
                    </div>
                    `
    document.getElementById("logModal").innerHTML = logModal;

    var mealInformationObject = {
    name: mealsArray[i].name,
    protein:mealInformation.data.perServing.protein,
    carbs: mealInformation.data.perServing.carbs,
    fat: mealInformation.data.perServing.fat,
    calories: mealInformation.data.perServing.calories *servingNumber,
    serving: servingNumber,
    image: mealsArray[i].thumbnail
     }

   }
}     
   const closeModalButton = document.getElementById("log-meal-cancel-btn");
   const confirmMealLogButton = document.getElementById("log-meal-confirm-btn");
   const increaseServingButton= document.getElementById("servings-increase-btn");
   const decreaseServingButton = document.getElementById("servings-decrease-btn");
   const servingInput = document.getElementById("servings-input");
   const modal = document.getElementById("log-meal-modal");

    function closeModal() {
      modal.remove();
    }

    closeModalButton.addEventListener("click", closeModal);

    decreaseServingButton.addEventListener("click", function(){
       if(servingInput.value > 1){
          servingInput.value --;
          mealInformationObject.serving --;
          console.log(mealInformationObject);
       }
    });

    increaseServingButton.addEventListener("click", function(){
        servingInput.value ++;
        mealInformationObject.serving ++;
        console.log(mealInformationObject);
    });
    confirmMealLogButton.addEventListener("click",function(){
        logMealObject = mealInformationObject;
        console.log(logMealObject);
        logFunctions.saveDataToStorage();
        logFunctions.calculateAllNutrition();  
        logFunctions.showAllNutrition();  
        logFunctions.showProducts();
        closeModal();
        Swal.fire({
        title: "Meal Logged!",
        text: `This meal with ${(mealInformationObject.calories * mealInformationObject.serving)} calories is been logged.`,
        icon: "success"
        });
    })
 });
}

export function clearLogMealObject(){
    logMealObject = "";
}

export {
    backToMeals,
    showMealDetails,
    getYoutubeEmbedUrl,
    calcPercentage,
    showNutrition,
    logMeal
}