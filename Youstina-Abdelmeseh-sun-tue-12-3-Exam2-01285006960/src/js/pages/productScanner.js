import * as logFunctions from "./foodLog.js"
export let searchBtn = document.getElementById("search-product-btn");
export let barcodeBtn = document.getElementById("lookup-barcode-btn");
export let logProductObject = "";
export let productsArray = [];
export let ProductIdNumber = "";

function searchProductsByName(){
    searchBtn.addEventListener("click",function(){
    let searchInput = document.getElementById("product-search-input");
    getProductBySearchApi(searchInput.value);
});
}

function searchProductsByBarcode(){
    barcodeBtn.addEventListener("click",function(){
    let barcodeInput = document.getElementById("barcode-input");
    getProductByBarcodeApi(barcodeInput.value)
   })
}

async function getAllProductsApi(){
    let searchProducts=[];
    let res = await fetch("https://nutriplan-api.vercel.app/api/products/search?page=1&limit=24");
    var dataFromApi = await res.json();
    searchProducts = dataFromApi.results;
    console.log("response:", dataFromApi);
    showProducts(searchProducts);
}

async function getProductsByNutriScoreApi(mealValue){
   let searchProducts=[];
    let res = await fetch(`https://nutriplan-api.vercel.app/api/products/search?page=1&limit=24`);
    var dataFromApi = await res.json();
    searchProducts = dataFromApi.results;
    showProductsByScore(searchProducts,mealValue);

}

async function getProductByBarcodeApi(productValue){
    let res = await fetch(`https://nutriplan-api.vercel.app/api/products/barcode/${productValue}`);
    var dataFromApi = await res.json();
    let product = dataFromApi.result; 
    if (product) {
        showProducts([product]); 
    } else {
        showProducts([]);
    }

}

async function getProductBySearchApi(productValue){
    let searchProducts=[];
    let res = await fetch(`https://nutriplan-api.vercel.app/api/products/search?q=${productValue}&page=1&limit=24`);
    var dataFromApi = await res.json();
    searchProducts = dataFromApi.results;
    showProducts(searchProducts);
}

async function getProductsByCategoryApi(mealValue){
    let searchProducts=[];
    let res = await fetch(`https://nutriplan-api.vercel.app/api/products/category/${mealValue}`);
    var dataFromApi = await res.json();
    searchProducts = dataFromApi.results;
    showProducts(searchProducts);
}

async function getCategoriesApi(){
    let categoriesBtns=[];
    let res = await fetch("https://nutriplan-api.vercel.app/api/products/categories");
    var dataFromApi = await res.json();
    categoriesBtns = dataFromApi.results;
    showCategoryButtons(categoriesBtns);
}

function showCategoryButtons(categoriesBtns){
    let categoriesButtons = "";
    for(let i =0; i < categoriesBtns.length ; i++ ){
       categoriesButtons += `
        <button
                class="product-category-btn px-4 py-2 bg-emerald-100 text-emerald-700 rounded-lg text-sm font-medium whitespace-nowrap hover:bg-emerald-200 transition-all"
                data-category = "${categoriesBtns[i].id}"
              >
                ${categoriesBtns[i].name}
              </button>
       `
    }
    document.getElementById("product-categories").innerHTML = categoriesButtons;
}

function chooseCategory(){
   const categoryBtns = document.getElementById("product-categories");
   categoryBtns.addEventListener("click",function(e){
      const target = e.target.closest(".product-category-btn");
      let categoryid = target.getAttribute("data-category");
      getProductsByCategoryApi(categoryid);
   });
}


function getAllProducts(){
  const allScoresBtn = document.getElementById("all-scores-btn");
  allScoresBtn.addEventListener("click", function(){
   getAllProductsApi();
 })
}


function chooseNutriScore(){
   const scoreBtns = document.getElementById("scores-btns");
   scoreBtns.addEventListener("click",function(e){
      const target = e.target.closest(".nutri-score-filter");
      let scoreName = target.getAttribute("data-grade");
      getProductsByNutriScoreApi(scoreName );
   });
}

function showProductsByScore(searchProducts,mealValue){
    var productCard = "";
    if(searchProducts.length === 0){
        productCard = `
        <div class="flex flex-col items-center justify-center py-12 text-center">
            <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <i class="fa-solid fa-search text-gray-400 text-2xl"></i>
            </div>
            <p class="text-gray-500 text-lg">No products found</p>
            <p class="text-gray-400 text-sm mt-2">Try searching for something else</p>
        </div>
        `
        }
    for(let i = 0; i < searchProducts.length; i++ ){
      if(searchProducts[i].nutritionGrade === mealValue){
            productCard += `
            <div
                  class="product-card bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer group"
                  data-barcode="7613034626844"
                >
                  <div
                    class="relative h-40 bg-gray-100 flex items-center justify-center overflow-hidden"
                  >
                    <img
                      class="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                      src="${searchProducts[i].image}"
                      alt="${searchProducts[i].name}"
                      loading="lazy"
                    />

                    <!-- Nutri-Score Badge -->
                    <div
                      class="absolute top-2 left-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded uppercase"
                    >
                      Nutri-Score ${searchProducts[i].nutritionGrade}
                    </div>

                    <!-- NOVA Badge -->
                    ${searchProducts[i].novaGroup ?
                  ` <div
                      class="absolute top-2 right-2 bg-lime-500 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center"
                      title="NOVA ${searchProducts[i].novaGroup}"
                    >
                    ${searchProducts[i].novaGroup} 
                    </div>`
                    : ''}
                  </div>

                  <div class="p-4">
                    <p
                      class="text-xs text-emerald-600 font-semibold mb-1 truncate"
                    >
                      ${searchProducts[i].brand} 
                    </p>
                    <h3
                      class="font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-emerald-600 transition-colors"
                    >
                      ${searchProducts[i].name} 
                    </h3>

                    <div
                      class="flex items-center gap-3 text-xs text-gray-500 mb-3"
                    >
                      <span
                        ><i class="fa-solid fa-fire mr-1"></i>${(searchProducts[i].nutrients.calories).toFixed(2)} kcal/100g</span
                      >
                    </div>

                    <!-- Mini Nutrition -->
                    <div class="grid grid-cols-4 gap-1 text-center">
                      <div class="bg-emerald-50 rounded p-1.5">
                        <p class="text-xs font-bold text-emerald-700">${(searchProducts[i].nutrients.protein).toFixed(2)} g</p>
                        <p class="text-[10px] text-gray-500">Protein</p>
                      </div>
                      <div class="bg-blue-50 rounded p-1.5">
                        <p class="text-xs font-bold text-blue-700">${(searchProducts[i].nutrients.carbs).toFixed(2)}g</p>
                        <p class="text-[10px] text-gray-500">Carbs</p>
                      </div>
                      <div class="bg-purple-50 rounded p-1.5">
                        <p class="text-xs font-bold text-purple-700">${(searchProducts[i].nutrients.fat).toFixed(2)}g</p>
                        <p class="text-[10px] text-gray-500">Fat</p>
                      </div>
                      <div class="bg-orange-50 rounded p-1.5">
                        <p class="text-xs font-bold text-orange-700">${(searchProducts[i].nutrients.sugar).toFixed(2)}g</p>
                        <p class="text-[10px] text-gray-500">Sugar</p>
                      </div>
                    </div>
                  </div>
                </div>
          `
           }
        }
    document.getElementById("products-grid").innerHTML = productCard;
}

function showProducts(searchProducts){
    productsArray = searchProducts;
    var productCard = "";
    if(searchProducts.length === 0){
        productCard = `
        <div class="flex flex-col items-center justify-center py-12 text-center">
            <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <i class="fa-solid fa-search text-gray-400 text-2xl"></i>
            </div>
            <p class="text-gray-500 text-lg">No products found</p>
            <p class="text-gray-400 text-sm mt-2">Try searching for something else</p>
        </div>
        `
        }
    for(let i = 0; i < searchProducts.length; i++ ){
          productCard += `
           <div
                id="product-card"
                class="product-card bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer group"
                data-barcode="${searchProducts[i].barcode}"
              >
                <div
                  class="relative h-40 bg-gray-100 flex items-center justify-center overflow-hidden"
                >
                  <img
                    class="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                    src="${searchProducts[i].image}"
                    alt="${searchProducts[i].name}"
                    loading="lazy"
                  />

                  <!-- Nutri-Score Badge -->
                  <div
                    class="absolute top-2 left-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded uppercase"
                  >
                    Nutri-Score ${searchProducts[i].nutritionGrade}
                  </div>

                  <!-- NOVA Badge -->
                  ${searchProducts[i].novaGroup ?
                 ` <div
                    class="absolute top-2 right-2 bg-lime-500 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center"
                    title="NOVA ${searchProducts[i].novaGroup}"
                  >
                   ${searchProducts[i].novaGroup} 
                  </div>`
                  : ''}
                </div>

                <div class="p-4">
                  <p
                    class="text-xs text-emerald-600 font-semibold mb-1 truncate"
                  >
                    ${searchProducts[i].brand} 
                  </p>
                  <h3
                    class="font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-emerald-600 transition-colors"
                  >
                    ${searchProducts[i].name} 
                  </h3>

                  <div
                    class="flex items-center gap-3 text-xs text-gray-500 mb-3"
                  >
                    <span
                      ><i class="fa-solid fa-fire mr-1"></i>${(searchProducts[i].nutrients.calories).toFixed(2)} kcal/100g</span
                    >
                  </div>

                  <!-- Mini Nutrition -->
                  <div class="grid grid-cols-4 gap-1 text-center">
                    <div class="bg-emerald-50 rounded p-1.5">
                      <p class="text-xs font-bold text-emerald-700">${(searchProducts[i].nutrients.protein).toFixed(2)} g</p>
                      <p class="text-[10px] text-gray-500">Protein</p>
                    </div>
                    <div class="bg-blue-50 rounded p-1.5">
                      <p class="text-xs font-bold text-blue-700">${(searchProducts[i].nutrients.carbs).toFixed(2)}g</p>
                      <p class="text-[10px] text-gray-500">Carbs</p>
                    </div>
                    <div class="bg-purple-50 rounded p-1.5">
                      <p class="text-xs font-bold text-purple-700">${(searchProducts[i].nutrients.fat).toFixed(2)}g</p>
                      <p class="text-[10px] text-gray-500">Fat</p>
                    </div>
                    <div class="bg-orange-50 rounded p-1.5">
                      <p class="text-xs font-bold text-orange-700">${(searchProducts[i].nutrients.sugar).toFixed(2)}g</p>
                      <p class="text-[10px] text-gray-500">Sugar</p>
                    </div>
                  </div>
                </div>
              </div>
        `

        }
    document.getElementById("products-grid").innerHTML = productCard;
}

function calcPercentage(currentNumber,totalNumber){
    let percentageNumber = (currentNumber/totalNumber)*100;
    console.log("percentage",percentageNumber);
    return percentageNumber;
}

function logProduct(){ 
  const productcontainer = document.getElementById("products-grid");
  productcontainer.addEventListener("click",function(e){  
    const productLog = e.target.closest(".product-card");
    if (!productLog )
        return;
   for(var i = 0 ; i < productsArray.length ; i++){
     ProductIdNumber =productLog.getAttribute("data-barcode");
     if(productsArray[i].barcode === ProductIdNumber){
        var servingNumber = 1;
        console.log(ProductIdNumber);
            let logModal = `
              <div
              id="product-details-modal"
              class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            >
              <div class="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden">
                <div class="p-6">
                  <div class="flex items-start gap-4 mb-4">
                    <div class="w-20 h-20 rounded-xl bg-gray-100 flex items-center justify-center overflow-hidden shrink-0">
                      <i class="fa-solid fa-box text-gray-400 text-2xl"></i>
                    </div>
                    <div class="flex-1">
                      <p class="text-emerald-600 font-semibold text-sm">${productsArray[i].brand}</p>
                      <h3 class="text-2xl font-bold text-gray-900">${productsArray[i].name}</h3>
                      <div class="flex flex-wrap gap-2 mt-3">
                        <div class="flex items-center gap-2 border bg-red-50 border-red-200 rounded-lg px-3 py-1.5">
                          <span class="w-7 h-7 rounded  text-black font-bold flex items-center justify-center text-sm">
                            ${productsArray[i].nutritionGrade}
                          </span>
                          <div class="leading-tight">
                            <p class="text-sm font-semibold text-gray-900">Nutri-Score</p>
                          </div>
                        </div>
                        <div class="flex items-center gap-2 border bg-red-50 border-red-200 rounded-lg px-3 py-1.5">
                          <span class="w-7 h-7 rounded-full  text-black font-bold flex items-center justify-center text-sm">
                            ${productsArray[i].novaGroup}
                          </span>
                          <div class="leading-tight">
                            <p class="text-sm font-semibold text-gray-900">NOVA</p>
                            <p class="text-xs text-red-600">Ultra-processed</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <button
                      id="product-modal-close-x"
                      class="text-gray-400 hover:text-gray-600 transition-colors"
                      aria-label="Close"
                    >
                      <i class="fa-solid fa-xmark text-xl"></i>
                    </button>
                  </div>
                  <div class="bg-emerald-50 rounded-xl p-6">
                    <div class="flex items-center gap-2 mb-4">
                      <i class="fa-solid fa-chart-pie text-emerald-600"></i>
                      <h4 class="font-bold text-gray-900">Nutrition Facts</h4>
                      <span class="text-sm text-gray-500">(per 100g)</span>
                    </div>

                    <div class="text-center mb-4">
                      <p class="text-4xl font-bold text-gray-900"> ${productsArray[i].nutrients.calories}</p>
                      <p class="text-sm text-gray-500">Calories</p>
                    </div>

                    <div class="grid grid-cols-4 gap-3 text-center mb-5">
                      <div>
                        <div class="h-5 w-full bg-gray-200 rounded-full overflow-hidden mb-2">
                          <div class="h-full bg-emerald-600 rounded-full" style="width: ${calcPercentage(productsArray[i].nutrients.protein,50)}%"></div>
                        </div>
                        <p class="text-lg font-bold text-emerald-600">${productsArray[i].nutrients.protein}g</p>
                        <p class="text-xs text-gray-500">Protein</p>
                      </div>
                      <div>
                        <div class="h-5 w-full bg-gray-200 rounded-full overflow-hidden mb-2">
                          <div class="h-full bg-blue-600 rounded-full" style="width: ${calcPercentage(productsArray[i].nutrients.carbs,260)}%"></div>
                        </div>
                        <p class="text-lg font-bold text-blue-600">${productsArray[i].nutrients.carbs}g</p>
                        <p class="text-xs text-gray-500">Carbs</p>
                      </div>
                      <div>
                        <div class="h-5 w-full bg-gray-200 rounded-full overflow-hidden mb-2">
                          <div class="h-full bg-purple-600 rounded-full" style="width: ${calcPercentage(productsArray[i].nutrients.fat,100)}%"></div>
                        </div>
                        <p class="text-lg font-bold text-purple-600">${productsArray[i].nutrients.fat}g</p>
                        <p class="text-xs text-gray-500">Fat</p>
                      </div>
                      <div>
                        <div class="h-5 w-full bg-gray-200 rounded-full overflow-hidden mb-2">
                          <div class="h-full bg-orange-600 rounded-full" style="width: ${calcPercentage(productsArray[i].nutrients.sugar,50)}%"></div>
                        </div>
                        <p class="text-lg font-bold text-orange-600">${productsArray[i].nutrients.sugar}g</p>
                        <p class="text-xs text-gray-500">Sugar</p>
                      </div>
                    </div>

                    <div class="border-t border-emerald-200 pt-4 grid grid-cols-3 gap-2 text-center">
                      <div>
                        <p class="font-semibold text-gray-900">0.0g</p>
                        <p class="text-xs text-gray-500">Saturated Fat</p>
                      </div>
                      <div>
                        <p class="font-semibold text-gray-900">${productsArray[i].nutrients.fiber}g</p>
                        <p class="text-xs text-gray-500">Fiber</p>
                      </div>
                      <div>
                        <p class="font-semibold text-gray-900">0.0g</p>
                        <p class="text-xs text-gray-500">Salt</p>
                      </div>
                    </div>
                  </div>
                  <div class="flex gap-3 mt-6">
                    <button
                      id="product-modal-log-btn"
                      class="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl py-3 font-semibold transition-all flex items-center justify-center gap-2"
                    >
                      <i class="fa-solid fa-plus"></i>
                      Log This Food
                    </button>
                    <button
                      id="product-modal-close-btn"
                      class="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl py-3 font-semibold transition-all"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
                   
                    `
    document.getElementById("logModalProduct").innerHTML = logModal;

    var ProductInformationObject = {
    name: productsArray[i].name,
    image:productsArray[i].image,
    protein:productsArray[i].nutrients.protein,
    carbs:productsArray[i].nutrients.carbs,
    fat: productsArray[i].nutrients.fat,
    calories:productsArray[i].nutrients.calories,
     }

   }
}     
   const closeModalButton = document.getElementById("product-modal-close-btn");
   const closeXBtn = document.getElementById("product-modal-close-x");
   const confirmMealLogButton = document.getElementById("product-modal-log-btn");
   const servingInput = document.getElementById("servings-input");
   const modal = document.getElementById("product-details-modal");

    function closeModal() {
      modal.remove();
    }

    closeModalButton.addEventListener("click", closeModal);
    closeXBtn.addEventListener("click",closeModal);

    confirmMealLogButton.addEventListener("click",function(){
        logProductObject =ProductInformationObject  ;
        console.log(logProductObject);
        logFunctions.saveDataToStorage();
        logFunctions.calculateAllNutrition();  
        logFunctions.showAllNutrition();  
        logFunctions.showProducts();
        closeModal();
    })
 });
}

export function clearLogProductObject(){
    logProductObject = "";
}
export{
    searchProductsByName,
    searchProductsByBarcode,
    getCategoriesApi,
    chooseCategory,
    getAllProducts,
    chooseNutriScore,
    logProduct,
}