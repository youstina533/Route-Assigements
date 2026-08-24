import * as uiLogic from "./ui/components.js";
import * as allMeals from "./pages/nutritionPage.js"
import * as mealDetails from "./pages/mealDetails.js"
import * as logMeal from "./pages/foodLog.js"
import * as allProducts from "./pages/productScanner.js"
uiLogic.showFirstLoadSections();
uiLogic.initNavigation();
allMeals.getAllMeals();
allMeals.getAllMealsApi();
allMeals.searchMeal();
allMeals.getCategoriesApi();
allMeals.getAreasApi();
allMeals.chooseCategory();
allMeals.chooseArea();
allMeals.goToMeal();
mealDetails.backToMeals();
mealDetails.logMeal();
allProducts.searchProductsByName();
allProducts.searchProductsByBarcode();
allProducts.chooseCategory();
allProducts.getCategoriesApi();
allProducts.getAllProducts();
allProducts.chooseNutriScore();
allProducts.logProduct();
logMeal.getTodayDate();  
logMeal.confirmData();  
logMeal.showProducts();
logMeal.deleteAllProducts();
logMeal.deleteProduct();
logMeal.showWeeklyStats();
logMeal.showWeeklyOverview();
uiLogic.hideAppLoadingOverlay();
