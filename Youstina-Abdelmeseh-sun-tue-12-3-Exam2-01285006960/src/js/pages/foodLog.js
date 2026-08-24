import {logMealObject,clearLogMealObject} from "./mealDetails.js";
import{logProductObject,clearLogProductObject} from "./productScanner.js"
export let mealsArray = [];
export let productsArray = [];
export let allProteinNo = 0;
export let allCaloriesNo = 0;
export let allCarbsNo = 0;
export let allFatNo = 0;
let cardIndex =0;
let allNumbersPerWeek = {};
let weeklyLog = {};

function saveDataToStorage(){
  if((logMealObject !== null) && (logMealObject !== undefined) && (logMealObject !== "")){
    mealsArray.push(structuredClone(logMealObject));
    localStorage.setItem("mealsArray", JSON.stringify(mealsArray));
    clearLogMealObject();
  }
  if((logProductObject !== null) && (logProductObject !== undefined) && (logProductObject !== "")){
    productsArray.push(structuredClone(logProductObject));
    localStorage.setItem("productsArray", JSON.stringify(productsArray));
    clearLogProductObject();
  }
  syncTodayIntoWeeklyLog();
  showWeeklyOverview();
  showWeeklyStats();
}


function confirmData(){
  checkWeekReset();
  checkDayReset();

  const savedMeals = localStorage.getItem("mealsArray");
  const savedProducts = localStorage.getItem("productsArray");

  if (savedMeals !== null) mealsArray = JSON.parse(savedMeals);
  if (savedProducts !== null) productsArray = JSON.parse(savedProducts);

  syncTodayIntoWeeklyLog();   
  calculateAllNutrition();
  showAllNutrition();
  showProducts();
  showWeeklyOverview();
  showWeeklyStats();
}


function syncTodayIntoWeeklyLog(){
  const todayKey = getDateKey(new Date());
  let todayCalories = 0;
  let todayItems = 0;

  for(const meal of mealsArray){
    todayCalories += meal.calories;
    todayItems++;
  }
  for(const product of productsArray){
    todayCalories += product.calories;
    todayItems++;
  }

  weeklyLog[todayKey] = { calories: todayCalories, items: todayItems };
  localStorage.setItem("weeklyLog", JSON.stringify(weeklyLog));
}

function checkDayReset(){
  const todayKey = getDateKey(new Date());
  const lastActiveDate = localStorage.getItem("lastActiveDate");
  if(lastActiveDate !== todayKey){
    mealsArray = [];
    productsArray = [];
    localStorage.setItem("mealsArray", JSON.stringify(mealsArray));
    localStorage.setItem("productsArray", JSON.stringify(productsArray));
    localStorage.setItem("lastActiveDate", todayKey);
  }
}

function checkWeekReset(){
  const currentWeekStart = getWeekStartKey(new Date());
  const storedWeekStart = localStorage.getItem("weekStartDate");
  if(storedWeekStart !== currentWeekStart){
    weeklyLog = {};
    localStorage.setItem("weeklyLog", JSON.stringify(weeklyLog));
    localStorage.setItem("weekStartDate", currentWeekStart);
  } else {
    const savedWeeklyLog = localStorage.getItem("weeklyLog");
    weeklyLog = savedWeeklyLog ? JSON.parse(savedWeeklyLog) : {};
  }
}

function getDateKey(date){
  return date.toLocaleDateString("en-CA"); 
}

function parseDateKey(key){
  const [y, m, d] = key.split("-").map(Number);
  return new Date(y, m - 1, d);
}

function getWeekStartKey(date){
  const d = new Date(date);
  const day = d.getDay(); 
  const diffToMonday = (day === 0) ? -6 : 1 - day;
  d.setDate(d.getDate() + diffToMonday);
  return getDateKey(d);
}

function showWeeklyOverview(){
  const dayNames = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
  const todayKey = getDateKey(new Date());
  const weekStartKey = localStorage.getItem("weekStartDate") || getWeekStartKey(new Date());
  const weekStart = parseDateKey(weekStartKey);

  let daysHtml = "";
  for(let i = 0; i < 7; i++){
    const currentDay = new Date(weekStart);
    currentDay.setDate(weekStart.getDate() + i);
    const dayKey = getDateKey(currentDay);
    const dayData = weeklyLog[dayKey];
    const isToday = dayKey === todayKey;

    daysHtml += `
      <div class="rounded-xl p-3 ${isToday ? "bg-indigo-100" : ""}">
        <p class="text-sm text-gray-500">${dayNames[i]}</p>
        <p class="font-semibold text-gray-900 mb-3">${currentDay.getDate()}</p>
        <p class="text-2xl font-bold ${dayData ? "text-emerald-600" : "text-gray-300"}">${dayData ? dayData.calories : 0}</p>
        <p class="text-xs ${dayData ? "text-emerald-600" : "text-gray-300"}">kcal</p>
        ${dayData ? `<p class="text-xs text-gray-400 mt-1">${dayData.items} items</p>` : ""}
      </div>
    `;
  }
  document.getElementById("weekly-days-grid").innerHTML = daysHtml;
}

function showWeeklyStats(){
  const dailyGoal = 2000; 
  const days = Object.keys(weeklyLog);
  const totalCalories = days.reduce((sum, key) => sum + weeklyLog[key].calories, 0);
  const totalItems = days.reduce((sum, key) => sum + weeklyLog[key].items, 0);
  const daysOnGoal = days.filter(key => weeklyLog[key].calories >= dailyGoal).length;
  const weeklyAverage = Math.round(totalCalories / 7);

  document.getElementById("weekly-average-calories-text").innerHTML = `${weeklyAverage} kcal`;
  document.getElementById("weekly-total-items-text").innerHTML = `${totalItems} items`;
  document.getElementById("weekly-days-goal-text").innerHTML = `${daysOnGoal} / 7`;
}


function getTodayDate(){
  let todaydate = new Date();
  const formattedDate = todaydate.toLocaleDateString("en-US", {
  weekday: "long",
  month: "short",
  day: "numeric"
});
 document.getElementById("foodlog-date").innerHTML = formattedDate;
}

function calculateAllNutrition(){
  allProteinNo = 0;
  allCaloriesNo = 0;
  allCarbsNo = 0;
  allFatNo = 0;

  for (var i = 0; i < productsArray.length; i++) {
    allProteinNo += productsArray[i].protein;
    allCaloriesNo += productsArray[i].calories;
    allCarbsNo += productsArray[i].carbs;
    allFatNo += productsArray[i].fat;
  }

  for (var y = 0; y < mealsArray.length; y++) {
    allProteinNo += mealsArray[y].protein;
    allCaloriesNo += mealsArray[y].calories * mealsArray[y].serving;
    allCarbsNo += mealsArray[y].carbs;
    allFatNo += mealsArray[y].fat;
  }

  allNumbersPerWeek = {
    allProteinNo,
    allCaloriesNo,
    allCarbsNo,
    allFatNo,
  };

  localStorage.setItem("allNumbersPerWeek", JSON.stringify(allNumbersPerWeek));
}

function calcPercentage(currentNumber,totalNumber){
    let percentageNumber = (currentNumber/totalNumber)*100;
    console.log("percentage");
    return percentageNumber;
}

function showAllNutrition(){
    let nutritionProgress = "";
    nutritionProgress = `
       <div class="bg-emerald-50 rounded-xl p-4">
            <div class="flex items-center justify-between mb-2">
                <span class="text-sm font-semibold text-gray-700"
                >Calories</span
                >
                <span class="text-sm text-gray-500">${allNumbersPerWeek.allCaloriesNo}/ 2000 kcal</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                <div
                class="bg-emerald-500 h-2.5 rounded-full"
                style="width: ${calcPercentage(allNumbersPerWeek.allCaloriesNo,2000)}%"
                ></div>
            </div>
            </div>
            <!-- Protein Progress -->
            <div class="bg-blue-50 rounded-xl p-4">
            <div class="flex items-center justify-between mb-2">
                <span class="text-sm font-semibold text-gray-700"
                >Protein</span
                >
                <span class="text-sm text-gray-500">${allNumbersPerWeek.allProteinNo} / 50 g</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                <div
                class="bg-blue-500 h-2.5 rounded-full"
                style="width: ${calcPercentage(allNumbersPerWeek.allProteinNo,50)}%"
                ></div>
            </div>
            </div>
            <!-- Carbs Progress -->
            <div class="bg-amber-50 rounded-xl p-4">
            <div class="flex items-center justify-between mb-2">
                <span class="text-sm font-semibold text-gray-700">Carbs</span>
                <span class="text-sm text-gray-500">${allNumbersPerWeek.allCarbsNo} / 250 g</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                <div
                class="bg-amber-500 h-2.5 rounded-full"
                style="width: ${calcPercentage(allNumbersPerWeek.allCarbsNo,250)}%"
                ></div>
            </div>
            </div>
            <!-- Fat Progress -->
            <div class="bg-purple-50 rounded-xl p-4">
            <div class="flex items-center justify-between mb-2">
                <span class="text-sm font-semibold text-gray-700">Fat</span>
                <span class="text-sm text-gray-500">${allNumbersPerWeek.allFatNo} / 65 g</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                <div
                class="bg-purple-500 h-2.5 rounded-full"
                style="width: ${calcPercentage(allNumbersPerWeek.allFatNo,65)}%"
                ></div>
            </div>
        </div>
    `
   document.getElementById("nutrition-progress").innerHTML = nutritionProgress;  
}

function showProducts(){
   let fullSection = "";
   if((mealsArray.length ===0) && (productsArray.length === 0)){
    fullSection = `
      <div class="flex items-center justify-between mb-3">
        <h4 class="text-sm font-semibold text-gray-700">
            Logged Items
        </h4>
        <button
            id="clear-foodlog"
            class="text-red-500 hover:text-red-600 text-sm font-medium"
            style="display: none"
        >
            <i class="fa-solid fa-trash mr-1"></i>Clear All
        </button>
        </div>

        <div id="logged-items-list" class="space-y-2">
        <div class="text-center py-8 text-gray-500">
            <i
            class="fa-solid fa-utensils text-4xl mb-3 text-gray-300"
            ></i>
            <p class="font-medium">No meals logged today</p>
            <p class="text-sm">
            Add meals from the Meals page or scan products
            </p>
        </div>
      </div>
    `
   }
   else{
    let logProducts = "";
    for (let i = 0; i < mealsArray.length; i++) {
        logProducts += `
            <div class="bg-gray-50 rounded-2xl p-4 flex items-center justify-between gap-4">
            <div class="flex items-center gap-4">
                <img
                src="${mealsArray[i].image}"
                alt="${mealsArray[i].name}"
                class="w-14 h-14 rounded-xl object-cover"
                />
                <div>
                <h4 class="font-bold text-gray-900">${mealsArray[i].name}</h4>
                <p class="text-sm text-gray-500">
                    ${mealsArray[i].serving} serving
                    <span class="mx-1">•</span>
                    <span class="text-emerald-600 font-medium">Recipe</span>
                </p>
                </div>
            </div>

            <div class="flex items-center gap-3">
                <div class="text-right">
                <p class="text-xl font-bold text-emerald-600">${mealsArray[i].calories}</p>
                <p class="text-xs text-gray-500">kcal</p>
                </div>
                <span class="bg-blue-50 text-blue-700 text-xs font-semibold px-2.5 py-1 rounded-lg">${mealsArray[i].protein}g P</span>
                <span class="bg-yellow-50 text-yellow-700 text-xs font-semibold px-2.5 py-1 rounded-lg">${mealsArray[i].carbs}g C</span>
                <span class="bg-purple-50 text-purple-700 text-xs font-semibold px-2.5 py-1 rounded-lg">${mealsArray[i].fat}g F</span>
                <button id="delete-btn" onclick="deleteProduct(${i},'meal')"
                class="delete-log-entry-btn text-gray-400 hover:text-red-500 transition-colors ml-1"
                data-index="${i}"
                aria-label="Delete entry"
                >
                <i class="fa-solid fa-trash"></i>
                </button>
            </div>
            </div>
        `;
    }
    for (let i = 0; i < productsArray.length; i++) {
        logProducts += `
            <div class="bg-gray-50 rounded-2xl p-4 flex items-center justify-between gap-4">
            <div class="flex items-center gap-4">
                <img
                src="${productsArray[i].image}"
                alt="${productsArray[i].name}"
                class="w-14 h-14 rounded-xl object-cover"
                />
                <div>
                <h4 class="font-bold text-gray-900">${productsArray[i].name}</h4>
                <p class="text-sm text-gray-500">
                    
                    <span class="mx-1">•</span>
                    <span class="text-emerald-600 font-medium">Product</span>
                </p>
                </div>
            </div>

            <div class="flex items-center gap-3">
                <div class="text-right">
                <p class="text-xl font-bold text-emerald-600">${productsArray[i].calories}</p>
                <p class="text-xs text-gray-500">kcal</p>
                </div>
                <span class="bg-blue-50 text-blue-700 text-xs font-semibold px-2.5 py-1 rounded-lg">${productsArray[i].protein}g P</span>
                <span class="bg-yellow-50 text-yellow-700 text-xs font-semibold px-2.5 py-1 rounded-lg">${productsArray[i].carbs}g C</span>
                <span class="bg-purple-50 text-purple-700 text-xs font-semibold px-2.5 py-1 rounded-lg">${productsArray[i].fat}g F</span>
                <button id="delete-btn" onclick="deleteProduct(${i},'product')"
                class="delete-log-entry-btn text-gray-400 hover:text-red-500 transition-colors ml-1"
                data-index="${i}"
                aria-label="Delete entry"
                >
                <i class="fa-solid fa-trash"></i>
                </button>
            </div>
            </div>
        `;
    }


     fullSection = `
    <div class="flex items-center justify-between mb-3">
        <h4 class="text-sm font-semibold text-gray-700">Logged Items</h4>
        <button
        id="clear-foodlog"
        class="text-red-500 hover:text-red-600 text-sm font-medium"
        >
        <i class="fa-solid fa-trash mr-1"></i>Clear All
        </button>
    </div>

    <div id="logged-items-list" class="space-y-2">
        ${logProducts}
    </div>
    `;
    }
   document.getElementById("allProducts-grid").innerHTML =  fullSection;
}

function deleteProduct(index, itemType){
  if(itemType === "product"){
    if(!productsArray[index]) return;
    productsArray.splice(index, 1);
    localStorage.setItem("productsArray", JSON.stringify(productsArray));
  }
  else if(itemType === "meal"){
    if(!mealsArray[index]) return;
    mealsArray.splice(index, 1);
    localStorage.setItem("mealsArray", JSON.stringify(mealsArray));
  }
  syncTodayIntoWeeklyLog();
  calculateAllNutrition();
  showAllNutrition();
  showProducts();
  showWeeklyOverview();
  showWeeklyStats();
}

window.deleteProduct = deleteProduct; 

function deleteAllProducts(){
  const container = document.getElementById("allProducts-grid"); // stable — only its CONTENTS get replaced

  container.addEventListener("click", function(e){
    const clearBtn = e.target.closest("#clear-foodlog");
    if (!clearBtn) return;   // click wasn't on the clear button — ignore

    Swal.fire({
        title: "Clear Today's Log?",
        text: "This will delete all logged items for today",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "rgb(208, 205, 205)",
        confirmButtonText: "Yes, delete it!"
    }).then((result) => {
        if (result.isConfirmed) {
            productsArray = [];
            mealsArray = [];
            localStorage.setItem("productsArray", JSON.stringify(productsArray));
            localStorage.setItem("mealsArray", JSON.stringify(mealsArray));
            syncTodayIntoWeeklyLog();
            calculateAllNutrition();
            showAllNutrition();
            showProducts();
            showWeeklyOverview();
            showWeeklyStats();
            Swal.fire({
                title: "Deleted!",
                text: "Your food log has been cleared",
                icon: "success"
            });
        }
    });
  });
}

export{
    getTodayDate,
    calculateAllNutrition,
    showAllNutrition,
    confirmData,
    saveDataToStorage,
    showProducts,
    deleteAllProducts,
    deleteProduct,
    showWeeklyOverview,
    showWeeklyStats
}