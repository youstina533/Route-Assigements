function showFirstLoadSections(){
    const firstNavLink = document.querySelector(".first-navLink");
    const searchFiltersSection = document.getElementById("search-filters-section");
    const mealCategoriesSection  = document.getElementById("meal-categories-section");
    const allRecipesSection = document.getElementById("all-recipes-section");
    searchFiltersSection.classList.remove("hidden");
    mealCategoriesSection.classList.remove("hidden");
    allRecipesSection.classList.remove("hidden");
    firstNavLink.classList.add("bg-emerald-50", "text-emerald-700");
}

function initNavigation() {
    const navLinks = document.querySelectorAll(".nav-link ");
    const navBar = document.querySelector("nav");
    const firstNavLink = document.querySelector(".first-navLink");
    const searchFiltersSection = document.getElementById("search-filters-section");
    const mealCategoriesSection  = document.getElementById("meal-categories-section");
    const allRecipesSection = document.getElementById("all-recipes-section");
    const mealDetails = document.getElementById("meal-details");
    const productsSection = document.getElementById("products-section");
    const foodlogSection = document.getElementById("foodlog-section");

    navBar.addEventListener("click", function(e){
        var target = e.target.closest(".nav-link");
        for(var i = 0 ; i< navLinks.length; i++){
            navLinks[i].classList.remove("bg-emerald-50", "text-emerald-700");
        }
        if(target.getAttribute("id") === "home-link"){
            target.classList.add("bg-emerald-50","text-emerald-700");
            searchFiltersSection.classList.remove("hidden");
            mealCategoriesSection.classList.remove("hidden");
            allRecipesSection.classList.remove("hidden");
            mealDetails.classList.add("hidden");
            foodlogSection.classList.add("hidden");
            productsSection.classList.add("hidden");
        }
        else if(target.getAttribute("id") === "products-link"){
            target.classList.add("bg-emerald-50","text-emerald-700");
            searchFiltersSection.classList.add("hidden");
            mealCategoriesSection.classList.add("hidden");
            allRecipesSection.classList.add("hidden");
            mealDetails.classList.add("hidden");
            foodlogSection.classList.add("hidden");
            productsSection.classList.remove("hidden");
        }
        else if(target.getAttribute("id") === "foodLog-link"){
            target.classList.add("bg-emerald-50","text-emerald-700");
            searchFiltersSection.classList.add("hidden");
            mealCategoriesSection.classList.add("hidden");
            allRecipesSection.classList.add("hidden");
            mealDetails.classList.add("hidden");
            foodlogSection.classList.remove("hidden");
            productsSection.classList.add("hidden");
        }
        });

}

function hideAppLoadingOverlay(){
  const overlay = document.getElementById("app-loading-overlay");
  if(!overlay) return;

  overlay.classList.add("opacity-0"); 
  setTimeout(() => {
    overlay.classList.add("loading");   
    overlay.remove();                   
  }, 500); 
}

export{
    showFirstLoadSections,
    initNavigation,
    hideAppLoadingOverlay 
}
