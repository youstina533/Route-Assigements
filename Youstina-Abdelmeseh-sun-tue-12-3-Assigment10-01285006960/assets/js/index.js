// offsetTop is  represents the distance in pixels from the top outer border of the element to the top inner edge of its offsetParent
// (ya3ny distance mn top border of the element to the top inner edge of the parent )
// section.offsetHeight represents the element's total visible height in pixels, which includes its CSS height,
// vertical padding, borders, and any rendered horizontal scrollbars.

var sections = document.querySelectorAll("section");
var links = document.querySelectorAll(".nav-links a");
var toggleThemButton = document.getElementById("theme-toggle-button");
var htmlContent = document.querySelector("html");
var bodyContent = document.body;
var theme = "";
var font = "";
var primaryColor = "";
var secondaryColor = "";
var accentColor = "";
var portfolioButtons = document.querySelectorAll(".portfolio-filter");
var portfolioFilterButtons= document.getElementById("portfolio-filters");
var portfolioCards = document.querySelectorAll(".portfolio-item");
var nextTestimonial = document.getElementById("next-testimonial");
var prevTestimonial = document.getElementById("prev-testimonial");
var carouselIndicator = document.querySelectorAll(".carousel-indicator");
var carousel = document.getElementById("testimonials-carousel");
var currentCarouselIndex = 0;
var settingsToggleButton = document.getElementById("settings-toggle");
var closeSettingsButton = document.getElementById("close-settings");
var closeSettingsButtonIcon = document.querySelector("#close-settings i");
var settingsSidebar = document.getElementById("settings-sidebar");
var fontOptionsButtons = document.getElementById("font-div");
var fontOptions = document.querySelectorAll(".font-option");
var colorOptionsButtons = document.getElementById("theme-colors-grid");
var colorOptions = document.querySelectorAll(".color-btn");
var resetButton = document.getElementById("reset-settings");
var scrollToTopButton = document.getElementById("scroll-to-top");


var themeName = localStorage.getItem("theme");
if (themeName === "dark") {
  toggleThemButton.setAttribute("aria-pressed", "false");
}
 else if (themeName === "white") {
  toggleThemButton.setAttribute("aria-pressed", "true");
}

var fontName = localStorage.getItem("font");
if(fontName === "alexandria"){
  bodyContent.classList.add("font-alexandria");
  activeFontButton();
}
else if(fontName === "tajawal"){
  bodyContent.classList.add("font-tajawal");
  activeFontButton();
}
else if(fontName === "cairo"){
  bodyContent.classList.add("font-cairo");
  activeFontButton();
}

primaryColor = localStorage.getItem("--color-primary");
secondaryColor = localStorage.getItem("--color-secondary");
accentColor = localStorage.getItem("--color-accent");
applyColorTheme(primaryColor, secondaryColor, accentColor);
for(var i = 0; i < colorOptions.length; i++){
  if(colorOptions[i].getAttribute("data-primary") === primaryColor)
    colorOptions[i].classList.add("ring-2" ,"ring-primary", "ring-offset-2", "ring-offset-white", "dark:ring-offset-slate-900");
}

window.addEventListener("scroll", function(){
   var sectionTop = 0;
   var sectionBottom = 0;
   var navbarOffset = 100;
   var sectionID = "";
   var linkHref = "";
   for (var i = 0; i < links.length; i++) {
    links[i].classList.remove("active");
   }
   for(var i=0; i< sections.length;i++){
    sectionTop = sections[i].offsetTop - navbarOffset;
    sectionBottom = sections[i].offsetTop + sections[i].offsetHeight;
    if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
     sectionID = sections[i].getAttribute("id");
     for(var y = 0; y< links.length; y++){
        linkHref = links[y].getAttribute("href");
        if(linkHref === "#" + sectionID ){
          links[y].classList.add("active");
        }
   }
  }
 }
})

toggleThemButton.addEventListener("click",function(){
   if(toggleThemButton.getAttribute("aria-pressed") === "true"){
    toggleThemButton.setAttribute("aria-pressed", "false");
    htmlContent.classList.add("dark");
    theme = "dark";
   }
   else if(toggleThemButton.getAttribute("aria-pressed") === "false"){
    toggleThemButton.setAttribute("aria-pressed", "true");
    htmlContent.classList.remove("dark");
    theme = "white";
   }
   localStorage.setItem('theme', theme);
})


portfolioFilterButtons.addEventListener("click", function(e){  
   for(var i = 0; i< portfolioButtons.length; i++){
    portfolioButtons[i].classList.remove("bg-linear-to-r", "from-primary", "to-secondary", "text-white");
    portfolioButtons[i].classList.add("border", "border-slate-300", "dark:border-slate-700");
   }
   if(e.target.getAttribute("data-filter") === "web"){
    e.target.classList.remove("bg-white","dark:bg-slate-800", "text-slate-600", "dark:text-slate-300")
    e.target.classList.add("bg-linear-to-r", "from-primary", "to-secondary", "text-white");
    for(var i=0 ; i < portfolioCards.length ; i++){
        if(portfolioCards[i].getAttribute("data-category") === "web"){
          portfolioCards[i].classList.remove("hidden");
        }
        else{
            portfolioCards[i].classList.add("hidden");
        }
     }
   }
   else if(e.target.getAttribute("data-filter") === "app"){
    e.target.classList.remove("bg-white","dark:bg-slate-800", "text-slate-600", "dark:text-slate-300")
    e.target.classList.add("bg-linear-to-r", "from-primary", "to-secondary", "text-white");
    for(var i=0 ; i < portfolioCards.length ; i++){
        if(portfolioCards[i].getAttribute("data-category") === "app"){
          portfolioCards[i].classList.remove("hidden");
        }
        else{
            portfolioCards[i].classList.add("hidden");
        }
     }
   }
   else if(e.target.getAttribute("data-filter") === "design"){
    e.target.classList.remove("bg-white","dark:bg-slate-800", "text-slate-600", "dark:text-slate-300")
    e.target.classList.add("bg-linear-to-r", "from-primary", "to-secondary", "text-white");
    for(var i=0 ; i < portfolioCards.length ; i++){
        if(portfolioCards[i].getAttribute("data-category") === "design"){
          portfolioCards[i].classList.remove("hidden");
        }
        else{
            portfolioCards[i].classList.add("hidden");
        }
     }
   }
   else if(e.target.getAttribute("data-filter") === "ecommerce"){
    e.target.classList.remove("bg-white","dark:bg-slate-800", "text-slate-600", "dark:text-slate-300")
    e.target.classList.add("bg-linear-to-r", "from-primary", "to-secondary", "text-white");
    for(var i=0 ; i < portfolioCards.length ; i++){
        if(portfolioCards[i].getAttribute("data-category") === "ecommerce"){
          portfolioCards[i].classList.remove("hidden");
        }
        else{
            portfolioCards[i].classList.add("hidden");
        }
     }
   }
   else if(e.target.getAttribute("data-filter") ==="all"){
    e.target.classList.remove("bg-white","dark:bg-slate-800", "text-slate-600", "dark:text-slate-300")
    e.target.classList.add("bg-linear-to-r", "from-primary", "to-secondary", "text-white");
    for(var i=0 ; i < portfolioCards.length ; i++){
        portfolioCards[i].classList.remove("hidden");
    }
   }
})


function updateCarousel(index){
  carousel.style.transform = `translateX(${index * (100 / 3)}%)`;
  for (var i = 0; i < carouselIndicator.length; i++) {
   carouselIndicator[i].classList.add("dark:bg-slate-600");
  }
  carouselIndicator[index].classList.remove("dark:bg-slate-600");
};

nextTestimonial.addEventListener("click",function(){
  if (currentCarouselIndex < carouselIndicator.length - 1) {
    currentCarouselIndex++;
    updateCarousel(currentCarouselIndex);
  }
});

prevTestimonial.addEventListener("click",function(){
  if(currentCarouselIndex > 0) {
    currentCarouselIndex--;
    updateCarousel(currentCarouselIndex);
  }
});


for (let i = 0; i < carouselIndicator.length; i++) {
  carouselIndicator[i].addEventListener("click", function () {
    currentCarouselIndex = i;
    updateCarousel(currentCarouselIndex);
  });
};


closeSettingsButton.addEventListener("click",function(){
  if(closeSettingsButtonIcon.getAttribute("aria-hidden") === "true"){
    closeSettingsButtonIcon.setAttribute("aria-hidden", "false");
    settingsSidebar.classList.remove("translate-x-full");
  }
  else if(closeSettingsButtonIcon.getAttribute("aria-hidden") === "false"){
   closeSettingsButtonIcon.setAttribute("aria-hidden", "true");
   settingsSidebar.classList.add("translate-x-full");
  }
});


settingsToggleButton.addEventListener("click",function(){
  if(settingsToggleButton.getAttribute("aria-expanded") === "false"){
    settingsToggleButton.setAttribute("aria-expanded", "true");
    settingsSidebar.classList.add("translate-x-full");
  }
  else if(settingsToggleButton.getAttribute("aria-expanded") === "true"){
    settingsToggleButton.setAttribute("aria-expanded", "false");
    settingsSidebar.classList.remove("translate-x-full");
  }
})

function activeFontButton(){
  for(var i = 0; i < fontOptions.length ; i++){
    if(fontOptions[i].getAttribute("data-font") === fontName){
      fontOptions[i].classList.add("active");
      fontOptions[i].classList.add("border-primary");
      fontOptions[i].classList.remove("border-slate-200","dark:border-slate-700");
      fontOptions[i].setAttribute("aria-checked","true");
    }
   }
}

function deactiveFontButton(){
 for(var i = 0; i < fontOptions.length ; i++){
    fontOptions[i].classList.remove("active");
    fontOptions[i].classList.remove("border-primary");
    fontOptions[i].classList.add("border-slate-200","dark:border-slate-700");
    fontOptions[i].setAttribute("aria-checked","false");
  }
  bodyContent.classList.remove("font-alexandria", "font-tajawal", "font-cairo");
}

fontOptionsButtons.addEventListener("click",function(e){
    var target = e.target.closest(".font-option");
    if(!target) return;

    function activeFontButtonStyle(){
      target.setAttribute("aria-checked","true");
      target.classList.add("active");
      target.classList.remove("border-slate-200","dark:border-slate-700");
      target.classList.add("border-primary");
    }

    function deactiveButtonStyle(){
      target.setAttribute("aria-checked","false");
      target.classList.remove("active");
      target.classList.add("border-slate-200","dark:border-slate-700");
      target.classList.remove("border-primary");
    }

    if(target.getAttribute("data-font") === "alexandria"){
      deactiveFontButton();
      if(target.getAttribute("aria-checked") === "false"){
        bodyContent.classList.add("font-alexandria");
        font = "alexandria";
        activeFontButtonStyle();
      }
      else if(target.getAttribute("aria-checked") === "true"){
        bodyContent.classList.remove("font-alexandria");
        deactiveButtonStyle();
      }
    }
    else if(target.getAttribute("data-font") === "tajawal"){
      deactiveFontButton();
      if(target.getAttribute("aria-checked") === "false"){
        bodyContent.classList.add("font-tajawal");
        font = "tajawal";
        activeFontButtonStyle();
      }
      else if(target.getAttribute("aria-checked") === "true"){
        bodyContent.classList.remove("font-tajawal");
        deactiveButtonStyle();
      }
    }
    else if(target.getAttribute("data-font") === "cairo"){
      deactiveFontButton();
      if(target.getAttribute("aria-checked") === "false"){
        bodyContent.classList.add("font-cairo");
        font = "cairo";
        activeFontButtonStyle();
      }
      else if(target.getAttribute("aria-checked") === "true"){
        bodyContent.classList.remove("font-cairo");
        deactiveButtonStyle()
      }
    }
     localStorage.setItem('font', font);
});

function applyColorTheme(primaryColor, secondaryColor, accentColor){
  document.documentElement.style.setProperty("--color-primary", primaryColor);
  document.documentElement.style.setProperty("--color-secondary",secondaryColor);
  document.documentElement.style.setProperty("--color-accent",accentColor);
  localStorage.setItem("--color-primary",primaryColor);
  localStorage.setItem("--color-secondary",secondaryColor);
  localStorage.setItem("--color-accent",accentColor);
};

colorOptionsButtons.addEventListener("click", function(e){
  for(var i = 0; i < colorOptions.length; i++){
    colorOptions[i].classList.remove("ring-2" ,"ring-primary", "ring-offset-2", "ring-offset-white", "dark:ring-offset-slate-900");
  }
  var target = e.target.closest(".color-btn");
  if(!target) return;
  target.classList.add("ring-2" ,"ring-primary", "ring-offset-2", "ring-offset-white", "dark:ring-offset-slate-900");
  applyColorTheme(
    target.getAttribute("data-primary"),
    target.getAttribute("data-secondary"),
    target.getAttribute("data-accent")
  )
});

resetButton.addEventListener("click",function(){
  for(var i = 0; i < colorOptions.length; i++){
    primaryColor = colorOptions[0].getAttribute("data-primary");
    secondaryColor = colorOptions[0].getAttribute("data-secondary");
    accentColor =  colorOptions[0].getAttribute("data-accent");
    applyColorTheme(primaryColor, secondaryColor, accentColor);
    for(var i = 0; i < colorOptions.length; i++){
       colorOptions[i].classList.remove("ring-2" ,"ring-primary", "ring-offset-2", "ring-offset-white", "dark:ring-offset-slate-900");
    }
    colorOptions[0].classList.add("ring-2" ,"ring-primary", "ring-offset-2", "ring-offset-white", "dark:ring-offset-slate-900");
 }
 deactiveFontButton();
 bodyContent.classList.add("font-tajawal");
 fontName = "tajawal";
 activeFontButton();
});

var threshold = 300;
if(window.scrollY > threshold){
  scrollToTopButton.classList.remove("opacity-0", "invisible");
}

scrollToTopButton.addEventListener("click",function(){
    window.scrollTo({ top: 0, behavior: 'smooth' })
});