// Bosy ya st al kl anty awl konty wa5da section kolo aly feh al 2 buttons wa 7ateteh feh al function showTodayInSpace()

// fah anty b2a kan eh al mo4kla aly bt3mleha, howa ank konty feh awl file al js 
// btktby :

// var loadDataBtn = document.getElementById("load-date-btn");     // null — doesn't exist yet
// var apodDateInput = document.getElementById("apod-date-input"); // null — doesn't exist yet

// konty btnady 3alehm wa homa feh al HTML file, bs homa makano4 mawgoden feh al HTML asln !!!

// tb al 7l aly howa katbo kan eh : Event Delegation 🔴🔴🔴
// ya3ny lw feh event 3ayzah ye7sl l children kolhm, badl ma alf b loop 3alehm adef al event l2 adeh l parent beta3hm wa howa haydaf lehm kolhm 
// "Whenever anything inside this section is clicked, run this function." That's it — one listener, attached once, forever.

// fah ay haga btdas (wa mafe4 8er al 2 buttons aly homa load wa today)
// fah sa3tha hay4of lw howa al haga aly id beta3ha "#load-date-btn" or "#today-apod-btn" wa lw haga menhm fah ye7sl haga mn al if or else if 

// tb bardo eh al fekra .... 
// an tarteb code aly feh al js file
// 1- ana ba3ml function showTodayInSpace() aly heya bdef al html aly ana 4elto mn al HTML file mn awl, wa once any defto 
// 2a2dr any aktb keda 
// 2- var input = document.getElementById("apod-date-input"); 
// la2eno 5alas b2a mawgod feh al HTML file bssb al showTodayInSpace() 
// 3- bs wa 3amlt variable input 34an 2a2dr any a3rf al value beta3o wa ab3to l function    AnyDayInSpaceApi(input.value);

var navLinks = document.querySelectorAll(".nav-link");
var firstSection = document.getElementById("today-in-space");
var firstNavLink = document.querySelector(".nav-link[data-section='today-in-space']");
var navBar = document.querySelector("nav");
var sections = document.querySelectorAll(".app-section");
var todaySection = document.getElementById("today-in-space");
var planetsCard = document.getElementById("planets-grid");


firstSection.classList.remove("hidden");
firstNavLink.classList.add("bg-blue-500/10", "text-blue-400");

navBar.addEventListener("click", function (e) {
   var target = e.target.closest(".nav-link");
   for(var i = 0 ; i< navLinks.length; i++){
    navLinks[i].classList.remove("bg-blue-500/10", "text-blue-400");
   }
   if(target.getAttribute("data-section") === "today-in-space"){
    target.classList.add("bg-blue-500/10", "text-blue-400");
    for(var i = 0 ; i< sections.length; i++){
       if(sections[i].getAttribute("data-section") === "today-in-space"){
            sections[i].classList.remove("hidden");
       }
       else{
        sections[i].classList.add("hidden");
       }
    }
   } 
   else if(target.getAttribute("data-section") === "launches"){
    target.classList.add("bg-blue-500/10", "text-blue-400");
    for(var i = 0 ; i< sections.length; i++){
       if(sections[i].getAttribute("data-section") === "launches"){
            sections[i].classList.remove("hidden");
       }
       else{
        sections[i].classList.add("hidden");
       }
    }
   } 
   else if(target.getAttribute("data-section") === "planets"){
    target.classList.add("bg-blue-500/10", "text-blue-400");
    for(var i = 0 ; i< sections.length; i++){
       if(sections[i].getAttribute("data-section") === "planets"){
            sections[i].classList.remove("hidden");
       }
       else{
        sections[i].classList.add("hidden");
       }
    }
   } 
});

var todayInSpaceFromApi = {};
var anyDayInSpaceFromApi = {};

async function TodayInSpaceApi() {
    var res = await fetch("https://api.nasa.gov/planetary/apod?api_key=lItlFJc85FYUs1FdG89aIJRu5r3aPZx4pd5K6tq5");
    var dataFromApi = await res.json();
    todayInSpaceFromApi = dataFromApi;
    showTodayInSpace();
}   
TodayInSpaceApi();

function showTodayInSpace(){
  var todayInfo = "";
  todayInfo = `
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
            <h2 class="text-xl md:text-2xl font-space font-bold mb-1">
            Today in Space
            </h2>
            <p id="apod-date" class="text-slate-400 text-xs md:text-sm">
            Astronomy Picture of the Day - ${todayInSpaceFromApi.date}
            </p>
        </div>
        <div class="flex items-center space-x-2 md:space-x-3">
            <label for="apod-date-input" class="date-input-wrapper">
            <input
                type="date"
                id="apod-date-input"
                class="custom-date-input"
                value="${todayInSpaceFromApi.date}"
                max=""
                min="1995-06-16"
            />
            <span class="text-sm">${todayInSpaceFromApi.date}</span>
            </label>
            <button
            id="load-date-btn"
            class="px-3 md:px-4 py-2 bg-blue-500 rounded-xl hover:bg-blue-600 transition-colors font-semibold text-sm flex items-center space-x-1 md:space-x-2"
            >
            <i class="fas fa-search"></i>
            <span class=" sm:inline">Load</span>
            </button>

            <button
            id="today-apod-btn"
            class="px-3 md:px-4 py-2 bg-slate-800 border border-slate-700 rounded-xl hover:bg-slate-700 transition-colors font-semibold text-sm"
            >
            Today
            </button>
        </div>
        </div>
        <div class="grid grid-cols-1 xl:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
        <div class="xl:col-span-2">
            <div
            id="apod-image-container"
            class="relative rounded-2xl overflow-hidden group h-[300px] md:h-[400px] lg:h-[600px] bg-slate-800/50 flex items-center justify-center"
            >
            <div id="apod-loading" class="text-center hidden">
                <i
                class="fas fa-spinner fa-spin text-4xl text-blue-400 mb-4"
                ></i>
                <p class="text-slate-400">Loading today's image...</p>
            </div>
            <!-- Using a placeholder image or one from assets if available. Using a reliable external placeholder for now or a relative path if we knew one. Sticking to a colored placeholder div if no image, but let's try a realistic placeholder or just the rocket icon style used elsewhere if we want to be safe. But user wants design. I'll use a relative path assuming assets exist or a generic space placeholder. -->
            <img
                id="apod-image"
                class="w-full h-full object-cover"
                src="${todayInSpaceFromApi.url}"
                alt="Astronomy Picture of the Day"
            />
            <div
                class="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
            >
                <div class="absolute bottom-6 left-6 right-6">
                <button
                    class="w-full py-3 bg-white/10 backdrop-blur-md rounded-lg font-semibold hover:bg-white/20 transition-colors"
                >
                    <i class="fas fa-expand mr-2"></i>View Full Resolution
                </button>
                </div>
            </div>
            </div>
        </div>
        <div class="space-y-4 md:space-y-6">
            <div
            class="bg-slate-800/50 border border-slate-700 rounded-xl md:rounded-2xl p-4 md:p-6"
            >
            <h3
                id="apod-title"
                class="text-lg md:text-2xl font-semibold mb-3 md:mb-4"
            >
               ${todayInSpaceFromApi.title}
            </h3>
            <div
                class="flex items-center space-x-4 mb-4 text-sm text-slate-400"
            >
                <span id="apod-date-detail"
                ><i class="far fa-calendar mr-2"></i>${todayInSpaceFromApi.date}</span
                >
            </div>
            <p
                id="apod-explanation"
                class="text-slate-300 leading-relaxed mb-4"
            >
                ${todayInSpaceFromApi.explanation}
            </p>
            <div
                id="apod-copyright"
                class="text-xs text-slate-400 italic mb-4"
            >
                &copy; NASA/JPL
            </div>
            </div>
            <div
            class="bg-slate-800/50 border border-slate-700 rounded-2xl p-6"
            >
            <h4 class="font-semibold mb-3 flex items-center">
                <i class="fas fa-info-circle text-blue-400 mr-2"></i>
                Image Details
            </h4>
            <div class="space-y-3 text-sm">
                <div class="flex justify-between">
                <span class="text-slate-400">Date</span>
                <span id="apod-date-info" class="font-medium"
                    >${todayInSpaceFromApi.date}</span
                >
                </div>
                <div class="flex justify-between">
                <span class="text-slate-400">Media Type</span>
                <span id="apod-media-type" class="font-medium">Image</span>
                </div>
                <div class="flex justify-between">
                <span class="text-slate-400">Source</span>
                <span class="font-medium">NASA APOD</span>
                </div>
            </div>
            </div>
        </div>
        </div> `
    document.getElementById("today-information-div").innerHTML = todayInfo
}

todaySection.addEventListener("click", function (e) {
    if (e.target.closest("#load-date-btn")) {
        var input = document.getElementById("apod-date-input");
        console.log(input.value);
        if (input && input.value) {
            AnyDayInSpaceApi(input.value);
        }
    } 
    else if (e.target.closest("#today-apod-btn")) {
        showTodayInSpace();
    }
});


async function AnyDayInSpaceApi(dateValue) {
    var res = await fetch(`https://api.nasa.gov/planetary/apod?api_key=lItlFJc85FYUs1FdG89aIJRu5r3aPZx4pd5K6tq5&date=${dateValue}`);
    var dataFromApi = await res.json();
    anyDayInSpaceFromApi = dataFromApi;
    showAnyDayInSpace();
}   

function showAnyDayInSpace(){
  var anyDayInfo = "";
  anyDayInfo = `
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
            <h2 class="text-xl md:text-2xl font-space font-bold mb-1">
            Today in Space
            </h2>
            <p id="apod-date" class="text-slate-400 text-xs md:text-sm">
            Astronomy Picture of the Day - ${anyDayInSpaceFromApi.date}
            </p>
        </div>
        <div class="flex items-center space-x-2 md:space-x-3">
            <label for="apod-date-input" class="date-input-wrapper">
            <input
                type="date"
                id="apod-date-input"
                class="custom-date-input"
                value="${anyDayInSpaceFromApi.date}"
                max=""
                min="1995-06-16"
            />
            <span class="text-sm">${anyDayInSpaceFromApi.date}</span>
            </label>
            <button
            id="load-date-btn"
            class="px-3 md:px-4 py-2 bg-blue-500 rounded-xl hover:bg-blue-600 transition-colors font-semibold text-sm flex items-center space-x-1 md:space-x-2"
            >
            <i class="fas fa-search"></i>
            <span class=" sm:inline">Load</span>
            </button>

            <button
            id="today-apod-btn"
            class="px-3 md:px-4 py-2 bg-slate-800 border border-slate-700 rounded-xl hover:bg-slate-700 transition-colors font-semibold text-sm"
            >
            Today
            </button>
        </div>
        </div>
        <div class="grid grid-cols-1 xl:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
        <div class="xl:col-span-2">
            <div
            id="apod-image-container"
            class="relative rounded-2xl overflow-hidden group h-[300px] md:h-[400px] lg:h-[600px] bg-slate-800/50 flex items-center justify-center"
            >
            <div id="apod-loading" class="text-center hidden">
                <i
                class="fas fa-spinner fa-spin text-4xl text-blue-400 mb-4"
                ></i>
                <p class="text-slate-400">Loading today's image...</p>
            </div>
            <!-- Using a placeholder image or one from assets if available. Using a reliable external placeholder for now or a relative path if we knew one. Sticking to a colored placeholder div if no image, but let's try a realistic placeholder or just the rocket icon style used elsewhere if we want to be safe. But user wants design. I'll use a relative path assuming assets exist or a generic space placeholder. -->
            <img
                id="apod-image"
                class="w-full h-full object-cover"
                src="${anyDayInSpaceFromApi.url}"
                alt="Astronomy Picture of the Day"
            />
            <div
                class="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
            >
                <div class="absolute bottom-6 left-6 right-6">
                <button
                    class="w-full py-3 bg-white/10 backdrop-blur-md rounded-lg font-semibold hover:bg-white/20 transition-colors"
                >
                    <i class="fas fa-expand mr-2"></i>View Full Resolution
                </button>
                </div>
            </div>
            </div>
        </div>
        <div class="space-y-4 md:space-y-6">
            <div
            class="bg-slate-800/50 border border-slate-700 rounded-xl md:rounded-2xl p-4 md:p-6"
            >
            <h3
                id="apod-title"
                class="text-lg md:text-2xl font-semibold mb-3 md:mb-4"
            >
               ${anyDayInSpaceFromApi.title}
            </h3>
            <div
                class="flex items-center space-x-4 mb-4 text-sm text-slate-400"
            >
                <span id="apod-date-detail"
                ><i class="far fa-calendar mr-2"></i>${anyDayInSpaceFromApi.date}</span
                >
            </div>
            <p
                id="apod-explanation"
                class="text-slate-300 leading-relaxed mb-4"
            >
                ${anyDayInSpaceFromApi.explanation}
            </p>
            <div
                id="apod-copyright"
                class="text-xs text-slate-400 italic mb-4"
            >
                &copy; NASA/JPL
            </div>
            </div>
            <div
            class="bg-slate-800/50 border border-slate-700 rounded-2xl p-6"
            >
            <h4 class="font-semibold mb-3 flex items-center">
                <i class="fas fa-info-circle text-blue-400 mr-2"></i>
                Image Details
            </h4>
            <div class="space-y-3 text-sm">
                <div class="flex justify-between">
                <span class="text-slate-400">Date</span>
                <span id="apod-date-info" class="font-medium"
                    >${anyDayInSpaceFromApi.date}</span
                >
                </div>
                <div class="flex justify-between">
                <span class="text-slate-400">Media Type</span>
                <span id="apod-media-type" class="font-medium">Image</span>
                </div>
                <div class="flex justify-between">
                <span class="text-slate-400">Source</span>
                <span class="font-medium">NASA APOD</span>
                </div>
            </div>
            </div>
        </div>
        </div> `
    document.getElementById("today-information-div").innerHTML = anyDayInfo
}

var upcomingLanchesFromApi = [];

async function GetLanchesApi(){
    var res = await fetch("https://lldev.thespacedevs.com/2.3.0/launches/upcoming/?limit=10");
    var dataFromApi = await res.json();
    upcomingLanchesFromApi = dataFromApi.results;
    showFirstLanch();
    showAllLanches();
}   
GetLanchesApi();

function showAllLanches(){
    var firstLanchesInfo = "";
    for(var i = 0; i< 1; i++){
        var net = upcomingLanchesFromApi[i].net;
        var netList=net.split("T")
        var launchDate = netList[0];
        var timeParts = netList[1].slice(0, -1).split(":")
        var hour = +(timeParts[0])
        var minute = timeParts[1]

        var period = hour >= 12 ? "PM" : "AM"
        var hour12 = hour % 12
        if (hour12 === 0) hour12 = 12

        var formattedTime = hour12 + ":" + minute + " " + period
    }
    var allLanchesInfo = "";
    for(var i = 1; i< upcomingLanchesFromApi.length; i++){
        allLanchesInfo += `
        <div
              class="bg-slate-800/50 border border-slate-700 rounded-2xl overflow-hidden hover:border-blue-500/30 transition-all group cursor-pointer"
            >
              <div
                class="relative h-48 bg-slate-900/50 flex items-center justify-center"
              >
                <img class="w-full h-full object-cover allLaunch-image" src="${upcomingLanchesFromApi[i].image.image_url}" alt="${upcomingLanchesFromApi[i].image.name}" />
                <div class="absolute top-3 right-3">
                  <span
                    class="px-3 py-1 bg-green-500/90 text-white backdrop-blur-sm rounded-full text-xs font-semibold"
                  >
                    ${upcomingLanchesFromApi[i].status.abbrev}
                  </span>
                </div>
              </div>
              <div class="p-5">
                <div class="mb-3">
                  <h4
                    class="font-bold text-lg mb-2 line-clamp-2 group-hover:text-blue-400 transition-colors"
                  >
                    ${upcomingLanchesFromApi[i].name}
                  </h4>
                  <p class="text-sm text-slate-400 flex items-center gap-2">
                    <i class="fas fa-building text-xs"></i>
                    ${upcomingLanchesFromApi[i].launch_service_provider.name}
                  </p>
                </div>
                <div class="space-y-2 mb-4">
                  <div class="flex items-center gap-2 text-sm">
                    <i class="fas fa-calendar text-slate-500 w-4"></i>
                    <span class="text-slate-300">${launchDate}</span>
                  </div>
                  <div class="flex items-center gap-2 text-sm">
                    <i class="fas fa-clock text-slate-500 w-4"></i>
                    <span class="text-slate-300">${formattedTime}</span>
                  </div>
                  <div class="flex items-center gap-2 text-sm">
                    <i class="fas fa-rocket text-slate-500 w-4"></i>
                    <span class="text-slate-300">${upcomingLanchesFromApi[i].rocket.configuration.name}</span>
                  </div>
                  <div class="flex items-center gap-2 text-sm">
                    <i class="fas fa-map-marker-alt text-slate-500 w-4"></i>
                    <span class="text-slate-300 line-clamp-1">${upcomingLanchesFromApi[i].pad.location.name}</span>
                  </div>
                </div>
                <div
                  class="flex items-center gap-2 pt-4 border-t border-slate-700"
                >
                  <button
                    class="flex-1 px-4 py-2 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors text-sm font-semibold"
                  >
                    Details
                  </button>
                  <button
                    class="px-3 py-2 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors"
                  >
                    <i class="far fa-heart"></i>
                  </button>
                </div>
              </div>
            </div>

        `
    }
    document.getElementById("launches-grid").innerHTML = allLanchesInfo; //Lazm aktb deh awl 2abl ma aktb al function aly ta7teha 34an yekon feh HTML haslo inject 34an a3ml 3aleh al Function
    var allLaunchImage =document.querySelectorAll(".allLaunch-image");
    for(var y = 0 ; y< allLaunchImage.length; y++){
      allLaunchImage[y].addEventListener("error", function(e){
         e.target.src = "./assets/images/launch-placeholder.png"
      });
    }
}

function showFirstLanch(){
  var firstLanchesInfo = "";
  for(var i = 0; i< 1; i++){
    var net = upcomingLanchesFromApi[i].net;
    var netList=net.split("T")
    var launchDate = netList[0];
    var timeParts = netList[1].slice(0, -1).split(":")
    var hour = +(timeParts[0])
    var minute = timeParts[1]

    var period = hour >= 12 ? "PM" : "AM"
    var hour12 = hour % 12
    if (hour12 === 0) hour12 = 12

    var formattedTime = hour12 + ":" + minute + " " + period
    firstLanchesInfo = `
        <div class="relative bg-slate-800/30 border border-slate-700 rounded-3xl overflow-hidden group hover:border-blue-500/50 transition-all">
            <div class="absolute inset-0 bg-linear-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div class="relative grid grid-cols-1 lg:grid-cols-2 gap-6 p-8">
                <div class="flex flex-col justify-between">
                  <div>
                    <div class="flex items-center gap-3 mb-4">
                        <span class="px-4 py-1.5 bg-blue-500/20 text-blue-400 rounded-full text-sm font-semibold flex items-center gap-2">
                        <i class="fas fa-star"></i>
                        Featured Launch
                        </span>
                        <spanclass="px-4 py-1.5 bg-green-500/20 text-green-400 rounded-full text-sm font-semibold">
                          ${upcomingLanchesFromApi[i].status.abbrev}
                        </spanclass=>
                    </div>
                    <h3 class="text-3xl font-bold mb-3 leading-tight">
                        ${upcomingLanchesFromApi[i].name}
                    </h3>
                    <div
                        class="flex flex-col xl:flex-row xl:items-center gap-4 mb-6 text-slate-400"
                    >
                        <div class="flex items-center gap-2">
                        <i class="fas fa-building"></i>
                        <span>${upcomingLanchesFromApi[i].launch_service_provider.name}</span>
                        </div>
                        <div class="flex items-center gap-2">
                        <i class="fas fa-rocket"></i>
                        <span>${upcomingLanchesFromApi[i].rocket.configuration.name}</span>
                        </div>
                    </div>
                    <div
                        class="inline-flex items-center gap-3 px-6 py-3 bg-linear-to-r from-blue-500/20 to-purple-500/20 rounded-xl mb-6"
                    >
                        <i class="fas fa-clock text-2xl text-blue-400"></i>
                        <div>
                        <p class="text-2xl font-bold text-blue-400">${upcomingLanchesFromApi[i].net_precision.id}</p>
                        <p class="text-xs text-slate-400">${upcomingLanchesFromApi[i].net_precision.name} Until Launch</p>
                        </div>
                    </div>
                    <div class="grid xl:grid-cols-2 gap-4 mb-6">
                        <div class="bg-slate-900/50 rounded-xl p-4">
                        <p
                            class="text-xs text-slate-400 mb-1 flex items-center gap-2"
                        >
                            <i class="fas fa-calendar"></i>
                            Launch Date
                        </p>
                        <p class="font-semibold">${launchDate}</p>
                        </div>
                        <div class="bg-slate-900/50 rounded-xl p-4">
                        <p
                            class="text-xs text-slate-400 mb-1 flex items-center gap-2"
                        >
                            <i class="fas fa-clock"></i>
                            Launch Time
                        </p>
                        <p class="font-semibold">${formattedTime} UTC</p>
                        </div>
                        <div class="bg-slate-900/50 rounded-xl p-4">
                        <p
                            class="text-xs text-slate-400 mb-1 flex items-center gap-2"
                        >
                            <i class="fas fa-map-marker-alt"></i>
                            Location
                        </p>
                        <p class="font-semibold text-sm">${upcomingLanchesFromApi[i].pad.location.name}</p>
                        </div>
                        <div class="bg-slate-900/50 rounded-xl p-4">
                        <p
                            class="text-xs text-slate-400 mb-1 flex items-center gap-2"
                        >
                            <i class="fas fa-globe"></i>
                            Country
                        </p>
                        <p class="font-semibold">${upcomingLanchesFromApi[i].pad.country.name}</p>
                        </div>
                    </div>
                    <p class="text-slate-300 leading-relaxed mb-6">
                        ${upcomingLanchesFromApi[i].mission.description}
                    </p>
                    </div>
                    <div class="flex flex-col md:flex-row gap-3">
                    <button
                        class="flex-1 self-start md:self-center px-6 py-3 bg-blue-500 rounded-xl hover:bg-blue-600 transition-colors font-semibold flex items-center justify-center gap-2"
                    >
                        <i class="fas fa-info-circle"></i>
                        View Full Details
                    </button>
                    <div class="icons self-end md:self-center">
                        <button
                        class="px-4 py-3 bg-slate-700 rounded-xl hover:bg-slate-600 transition-colors"
                        >
                        <i class="far fa-heart"></i>
                        </button>
                        <button
                        class="px-4 py-3 bg-slate-700 rounded-xl hover:bg-slate-600 transition-colors"
                        >
                        <i class="fas fa-bell"></i>
                        </button>
                    </div>
                    </div>
                </div>
                <div class="relative">
                    <div
                    class="relative h-full min-h-[400px] rounded-2xl overflow-hidden bg-slate-900/50"
                    >
                    <div
                        class="flex items-center justify-center h-full min-h-[400px] bg-slate-800"
                    >
                        <img class="w-full h-full object-cover" id="launch-image" src="${upcomingLanchesFromApi[i].image.image_url}" alt="${upcomingLanchesFromApi[i].image.name}" />
                    </div>
                    <div
                        class="absolute inset-0 bg-linear-to-t from-slate-900 via-transparent to-transparent"
                    ></div>
                    </div>
              </div>
            </div>
        </div>
   `
  }
  document.getElementById("featured-launch").innerHTML = firstLanchesInfo;
  var launchImage =document.getElementById("launch-image")
  launchImage.addEventListener("error", function(e){
    e.target.src = "./assets/images/launch-placeholder.png"
   });
}

var planetsFromApi = [];

async function GetPlanetsApi(){
    var res = await fetch("https://solar-system-opendata-proxy.vercel.app/api/planets");
    var dataFromApi = await res.json();
    planetsFromApi = dataFromApi.bodies;
    showEarth();
}   
GetPlanetsApi();

function formatDistance(km) {
    var num = Number(km);
    if (num >= 1_000_000) {
        return (num / 1_000_000).toFixed(1) + "M km";
    } else if (num >= 1_000) {
        return (num / 1_000).toFixed(1) + "K km";
    }
    return num + " km";
}

function formatEscapeVelocity(value) {
    var kmPerSec = Number(value) / 1000;
    return kmPerSec.toFixed(2) + " km/s";
}

function showEarth(){
  var earthPlanetInfo = "";
  for(var i = 0; i < planetsFromApi.length; i++ ){
    if(planetsFromApi[i].englishName === "Earth"){
    var distanceToPlanet = planetsFromApi[i].semimajorAxis;
    distanceToPlanet = formatDistance(distanceToPlanet);
    var meanRadius = `  ${Math.round(planetsFromApi[i].meanRadius)} Km`
    var perihelion = planetsFromApi[i].perihelion;
    perihelion = formatDistance(perihelion);
    var aphelion = planetsFromApi[i].aphelion;
    aphelion = formatDistance(aphelion);
    earthPlanetInfo = 
    `
    <div class="grid grid-cols-1 xl:grid-cols-3 gap-4 md:gap-6">
        <div
            class="xl:col-span-2 bg-slate-800/50 border border-slate-700 rounded-xl md:rounded-2xl p-4 md:p-6 lg:p-8"
        >
            <div
            class="flex flex-col xl:flex-row xl:items-start space-y-4 xl:space-y-0"
            >
            <div
                class="relative h-48 w-48 md:h-64 md:w-64 shrink-0 mx-auto xl:mr-6"
            >
                <img
                id="planet-detail-image"
                class="w-full h-full object-contain"
                src="${planetsFromApi[i].image}"
                alt="earth planet detailed realistic render with clouds and continents"
                />
            </div>
            <div class="flex-1">
                <div class="flex items-center justify-between mb-3 md:mb-4">
                <h3
                    id="planet-detail-name"
                    class="text-2xl md:text-3xl font-space font-bold"
                >
                    ${planetsFromApi[i].englishName}
                </h3>
                <button
                    class="w-10 h-10 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors"
                >
                    <i class="far fa-heart"></i>
                </button>
                </div>
                <p
                id="planet-detail-description"
                class="text-slate-300 mb-4 md:mb-6 leading-relaxed text-sm md:text-base"
                >
                  ${planetsFromApi[i].description}
                </p>
            </div>
            </div>
            <div class="grid grid-cols-2 gap-2 md:gap-4 mt-4">
            <div class="bg-slate-900/50 rounded-lg p-3 md:p-4">
                <p
                class="text-xs text-slate-400 mb-1 flex items-center gap-1"
                >
                <i class="fas fa-ruler text-xs"></i>
                <span class="text-xs">Semimajor Axis</span>
                </p>
                <p
                id="planet-distance"
                class="text-sm md:text-lg font-semibold"
                >
                 ${distanceToPlanet}
                </p>
            </div>
            <div class="bg-slate-900/50 rounded-lg p-4">
                <p
                class="text-xs text-slate-400 mb-1 flex items-center gap-1"
                >
                <i class="fas fa-circle"></i>
                Mean Radius
                </p>
                <p id="planet-radius" class="text-lg font-semibold">
                 ${meanRadius}
                </p>
            </div>
            <div class="bg-slate-900/50 rounded-lg p-4">
                <p
                class="text-xs text-slate-400 mb-1 flex items-center gap-1"
                >
                <i class="fas fa-weight"></i>
                Mass
                </p>
                <p id="planet-mass" class="text-lg font-semibold">
                ${planetsFromApi[i].mass.massValue} x 10^${planetsFromApi[i].mass.massExponent}
                </p>
            </div>
            <div class="bg-slate-900/50 rounded-lg p-4">
                <p
                class="text-xs text-slate-400 mb-1 flex items-center gap-1"
                >
                <i class="fas fa-compress"></i>
                Density
                </p>
                <p id="planet-density" class="text-lg font-semibold">
                  ${planetsFromApi[i].density} g/cm³
                </p>
            </div>
            <div class="bg-slate-900/50 rounded-lg p-4">
                <p
                class="text-xs text-slate-400 mb-1 flex items-center gap-1"
                >
                <i class="fas fa-sync-alt"></i>
                Orbital Period
                </p>
                <p id="planet-orbital-period" class="text-lg font-semibold">
                  ${planetsFromApi[i].sideralOrbit} days
                </p>
            </div>
            <div class="bg-slate-900/50 rounded-lg p-4">
                <p
                class="text-xs text-slate-400 mb-1 flex items-center gap-1"
                >
                <i class="fas fa-redo"></i>
                Rotation Period
                </p>
                <p id="planet-rotation" class="text-lg font-semibold">
                  ${planetsFromApi[i].sideralRotation} hours
                </p>
            </div>
            <div class="bg-slate-900/50 rounded-lg p-4">
                <p
                class="text-xs text-slate-400 mb-1 flex items-center gap-1"
                >
                <i class="fas fa-moon"></i>
                Moons
                </p>
                <p id="planet-moons" class="text-lg font-semibold">${planetsFromApi[i].moons.length}</p>
            </div>
            <div class="bg-slate-900/50 rounded-lg p-4">
                <p
                class="text-xs text-slate-400 mb-1 flex items-center gap-1"
                >
                <i class="fas fa-arrows-alt-v"></i>
                Gravity
                </p>
                <p id="planet-gravity" class="text-lg font-semibold">
                ${Number((planetsFromApi[i].gravity).toFixed(2))} m/s²
                </p>
            </div>
            </div>
        </div>
        <div class="space-y-6">
            <div
            class="bg-slate-800/50 border border-slate-700 rounded-2xl p-6"
            >
            <h4 class="font-semibold mb-4 flex items-center">
                <i class="fas fa-user-astronaut text-purple-400 mr-2"></i>
                Discovery Info
            </h4>
            <div class="space-y-3 text-sm">
                <div
                class="flex justify-between items-center py-2 border-b border-slate-700"
                >
                <span class="text-slate-400">Discovered By</span>
                <span
                    id="planet-discoverer"
                    class="font-semibold text-right"
                    >${planetsFromApi[i].discoveredBy}</span
                >
                </div>
                <div
                class="flex justify-between items-center py-2 border-b border-slate-700"
                >
                <span class="text-slate-400">Discovery Date</span>
                <span id="planet-discovery-date" class="font-semibold"
                    >${planetsFromApi[i].discoveryDate}</span
                >
                </div>
                <div
                class="flex justify-between items-center py-2 border-b border-slate-700"
                >
                <span class="text-slate-400">Body Type</span>
                <span id="planet-body-type" class="font-semibold"
                    >${planetsFromApi[i].bodyType}</span
                >
                </div>
                <div class="flex justify-between items-center py-2">
                <span class="text-slate-400">Volume</span>
                <span id="planet-volume" class="font-semibold">${planetsFromApi[i].vol.volValue} x 10^${planetsFromApi[i].vol.volExponent} km³</span>
                </div>
            </div>
            </div>
            <div
            class="bg-slate-800/50 border border-slate-700 rounded-2xl p-6"
            >
            <h4 class="font-semibold mb-4 flex items-center">
                <i class="fas fa-lightbulb text-yellow-400 mr-2"></i>
                Quick Facts
            </h4>
            <ul id="planet-facts" class="space-y-3 text-sm">
                <li class="flex items-start">
                <i class="fas fa-check text-green-400 mt-1 mr-2"></i>
                <span class="text-slate-300"
                    >Mass: ${planetsFromApi[i].mass.massValue} x 10^${planetsFromApi[i].mass.massExponent} Kg  </span
                >
                </li>
                <li class="flex items-start">
                <i class="fas fa-check text-green-400 mt-1 mr-2"></i>
                <span class="text-slate-300"
                    >Surface gravity: ${Number((planetsFromApi[i].gravity).toFixed(2))} m/s² </span
                >
                </li>
                <li class="flex items-start">
                <i class="fas fa-check text-green-400 mt-1 mr-2"></i>
                <span class="text-slate-300"
                    >Density: ${planetsFromApi[i].density} g/cm³ </span
                >
                </li>
                <li class="flex items-start">
                <i class="fas fa-check text-green-400 mt-1 mr-2"></i>
                <span class="text-slate-300"
                    >Axial tilt: ${planetsFromApi[i].axialTilt}° </span
                >
                </li>
            </ul>
            </div>
            <div
            class="bg-slate-800/50 border border-slate-700 rounded-2xl p-6"
            >
            <h4 class="font-semibold mb-4 flex items-center">
                <i class="fas fa-satellite text-blue-400 mr-2"></i>
                Orbital Characteristics
            </h4>
            <div class="space-y-3 text-sm">
                <div
                class="flex justify-between items-center py-2 border-b border-slate-700"
                >
                <span class="text-slate-400">Perihelion</span>
                <span id="planet-perihelion" class="font-semibold"
                    >${perihelion}</span
                >
                </div>
                <div
                class="flex justify-between items-center py-2 border-b border-slate-700"
                >
                <span class="text-slate-400">Aphelion</span>
                <span id="planet-aphelion" class="font-semibold"
                    >${aphelion}</span
                >
                </div>
                <div
                class="flex justify-between items-center py-2 border-b border-slate-700"
                >
                <span class="text-slate-400">Eccentricity</span>
                <span id="planet-eccentricity" class="font-semibold"
                    >${planetsFromApi[i].eccentricity}</span
                >
                </div>
                <div
                class="flex justify-between items-center py-2 border-b border-slate-700"
                >
                <span class="text-slate-400">Inclination</span>
                <span id="planet-inclination" class="font-semibold"
                    >${planetsFromApi[i].nclination}°</span
                >
                </div>
                <div
                class="flex justify-between items-center py-2 border-b border-slate-700"
                >
                <span class="text-slate-400">Axial Tilt</span>
                <span id="planet-axial-tilt" class="font-semibold"
                    >${planetsFromApi[i].axialTilt}°</span
                >
                </div>
                <div
                class="flex justify-between items-center py-2 border-b border-slate-700"
                >
                <span class="text-slate-400">Avg Temperature</span>
                <span id="planet-temp" class="font-semibold">${planetsFromApi[i].avgTemp}°C</span>
                </div>
                <div class="flex justify-between items-center py-2">
                <span class="text-slate-400">Escape Velocity</span>
                <span id="planet-escape" class="font-semibold"
                    >${formatEscapeVelocity(planetsFromApi[i].escape)} </span
                >
                </div>
            </div>
            </div>
            <button
            class="w-full py-3 bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors font-semibold"
            >
            <i class="fas fa-book mr-2"></i>Learn More
            </button>
        </div>
        </div>
    `
    }
  }
  document.getElementById("planet-all-information").innerHTML = earthPlanetInfo;
}


planetsCard.addEventListener("click",function(e){
  target = e.target.closest(".planet-card");
  if (!target) return;
  var planetInfo = ""; 
    for(var i = 0; i < planetsFromApi.length; i++ ){
        if(planetsFromApi[i].englishName.toLowerCase() === target.getAttribute("data-planet-id")){
            var distanceToPlanet = planetsFromApi[i].semimajorAxis;
            distanceToPlanet = formatDistance(distanceToPlanet);
            var meanRadius = `  ${Math.round(planetsFromApi[i].meanRadius)} Km`
            var perihelion = planetsFromApi[i].perihelion;
            perihelion = formatDistance(perihelion);
            var aphelion = planetsFromApi[i].aphelion;
            aphelion = formatDistance(aphelion);
            planetInfo = 
            `
            <div class="grid grid-cols-1 xl:grid-cols-3 gap-4 md:gap-6">
                <div
                    class="xl:col-span-2 bg-slate-800/50 border border-slate-700 rounded-xl md:rounded-2xl p-4 md:p-6 lg:p-8"
                >
                    <div
                    class="flex flex-col xl:flex-row xl:items-start space-y-4 xl:space-y-0"
                    >
                    <div
                        class="relative h-48 w-48 md:h-64 md:w-64 shrink-0 mx-auto xl:mr-6"
                    >
                        <img
                        id="planet-detail-image"
                        class="w-full h-full object-contain"
                        src="${planetsFromApi[i].image}"
                        alt="earth planet detailed realistic render with clouds and continents"
                        />
                    </div>
                    <div class="flex-1">
                        <div class="flex items-center justify-between mb-3 md:mb-4">
                        <h3
                            id="planet-detail-name"
                            class="text-2xl md:text-3xl font-space font-bold"
                        >
                            ${planetsFromApi[i].englishName}
                        </h3>
                        <button
                            class="w-10 h-10 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors"
                        >
                            <i class="far fa-heart"></i>
                        </button>
                        </div>
                        <p
                        id="planet-detail-description"
                        class="text-slate-300 mb-4 md:mb-6 leading-relaxed text-sm md:text-base"
                        >
                        ${planetsFromApi[i].description}
                        </p>
                    </div>
                    </div>
                    <div class="grid grid-cols-2 gap-2 md:gap-4 mt-4">
                    <div class="bg-slate-900/50 rounded-lg p-3 md:p-4">
                        <p
                        class="text-xs text-slate-400 mb-1 flex items-center gap-1"
                        >
                        <i class="fas fa-ruler text-xs"></i>
                        <span class="text-xs">Semimajor Axis</span>
                        </p>
                        <p
                        id="planet-distance"
                        class="text-sm md:text-lg font-semibold"
                        >
                        ${distanceToPlanet}
                        </p>
                    </div>
                    <div class="bg-slate-900/50 rounded-lg p-4">
                        <p
                        class="text-xs text-slate-400 mb-1 flex items-center gap-1"
                        >
                        <i class="fas fa-circle"></i>
                        Mean Radius
                        </p>
                        <p id="planet-radius" class="text-lg font-semibold">
                        ${meanRadius}
                        </p>
                    </div>
                    <div class="bg-slate-900/50 rounded-lg p-4">
                        <p
                        class="text-xs text-slate-400 mb-1 flex items-center gap-1"
                        >
                        <i class="fas fa-weight"></i>
                        Mass
                        </p>
                        <p id="planet-mass" class="text-lg font-semibold">
                        ${planetsFromApi[i].mass.massValue} x 10^${planetsFromApi[i].mass.massExponent}
                        </p>
                    </div>
                    <div class="bg-slate-900/50 rounded-lg p-4">
                        <p
                        class="text-xs text-slate-400 mb-1 flex items-center gap-1"
                        >
                        <i class="fas fa-compress"></i>
                        Density
                        </p>
                        <p id="planet-density" class="text-lg font-semibold">
                        ${planetsFromApi[i].density} g/cm³
                        </p>
                    </div>
                    <div class="bg-slate-900/50 rounded-lg p-4">
                        <p
                        class="text-xs text-slate-400 mb-1 flex items-center gap-1"
                        >
                        <i class="fas fa-sync-alt"></i>
                        Orbital Period
                        </p>
                        <p id="planet-orbital-period" class="text-lg font-semibold">
                        ${planetsFromApi[i].sideralOrbit} days
                        </p>
                    </div>
                    <div class="bg-slate-900/50 rounded-lg p-4">
                        <p
                        class="text-xs text-slate-400 mb-1 flex items-center gap-1"
                        >
                        <i class="fas fa-redo"></i>
                        Rotation Period
                        </p>
                        <p id="planet-rotation" class="text-lg font-semibold">
                        ${planetsFromApi[i].sideralRotation} hours
                        </p>
                    </div>
                    <div class="bg-slate-900/50 rounded-lg p-4">
                        <p
                        class="text-xs text-slate-400 mb-1 flex items-center gap-1"
                        >
                        <i class="fas fa-moon"></i>
                        Moons
                        </p>
                        <p id="planet-moons" class="text-lg font-semibold">${planetsFromApi[i].moons ? planetsFromApi[i].moons.length : 0}</p>
                    </div>
                    <div class="bg-slate-900/50 rounded-lg p-4">
                        <p
                        class="text-xs text-slate-400 mb-1 flex items-center gap-1"
                        >
                        <i class="fas fa-arrows-alt-v"></i>
                        Gravity
                        </p>
                        <p id="planet-gravity" class="text-lg font-semibold">
                        ${Number((planetsFromApi[i].gravity).toFixed(2))} m/s²
                        </p>
                    </div>
                    </div>
                </div>
                <div class="space-y-6">
                    <div
                    class="bg-slate-800/50 border border-slate-700 rounded-2xl p-6"
                    >
                    <h4 class="font-semibold mb-4 flex items-center">
                        <i class="fas fa-user-astronaut text-purple-400 mr-2"></i>
                        Discovery Info
                    </h4>
                    <div class="space-y-3 text-sm">
                        <div
                        class="flex justify-between items-center py-2 border-b border-slate-700"
                        >
                        <span class="text-slate-400">Discovered By</span>
                        <span
                            id="planet-discoverer"
                            class="font-semibold text-right"
                            >${planetsFromApi[i].discoveredBy}</span
                        >
                        </div>
                        <div
                        class="flex justify-between items-center py-2 border-b border-slate-700"
                        >
                        <span class="text-slate-400">Discovery Date</span>
                        <span id="planet-discovery-date" class="font-semibold"
                            >${planetsFromApi[i].discoveryDate}</span
                        >
                        </div>
                        <div
                        class="flex justify-between items-center py-2 border-b border-slate-700"
                        >
                        <span class="text-slate-400">Body Type</span>
                        <span id="planet-body-type" class="font-semibold"
                            >${planetsFromApi[i].bodyType}</span
                        >
                        </div>
                        <div class="flex justify-between items-center py-2">
                        <span class="text-slate-400">Volume</span>
                        <span id="planet-volume" class="font-semibold">${planetsFromApi[i].vol.volValue} x 10^${planetsFromApi[i].vol.volExponent} km³</span>
                        </div>
                    </div>
                    </div>
                    <div
                    class="bg-slate-800/50 border border-slate-700 rounded-2xl p-6"
                    >
                    <h4 class="font-semibold mb-4 flex items-center">
                        <i class="fas fa-lightbulb text-yellow-400 mr-2"></i>
                        Quick Facts
                    </h4>
                    <ul id="planet-facts" class="space-y-3 text-sm">
                        <li class="flex items-start">
                        <i class="fas fa-check text-green-400 mt-1 mr-2"></i>
                        <span class="text-slate-300"
                            >Mass: ${planetsFromApi[i].mass.massValue} x 10^${planetsFromApi[i].mass.massExponent} Kg  </span
                        >
                        </li>
                        <li class="flex items-start">
                        <i class="fas fa-check text-green-400 mt-1 mr-2"></i>
                        <span class="text-slate-300"
                            >Surface gravity: ${Number((planetsFromApi[i].gravity).toFixed(2))} m/s² </span
                        >
                        </li>
                        <li class="flex items-start">
                        <i class="fas fa-check text-green-400 mt-1 mr-2"></i>
                        <span class="text-slate-300"
                            >Density: ${planetsFromApi[i].density} g/cm³ </span
                        >
                        </li>
                        <li class="flex items-start">
                        <i class="fas fa-check text-green-400 mt-1 mr-2"></i>
                        <span class="text-slate-300"
                            >Axial tilt: ${planetsFromApi[i].axialTilt}° </span
                        >
                        </li>
                    </ul>
                    </div>
                    <div
                    class="bg-slate-800/50 border border-slate-700 rounded-2xl p-6"
                    >
                    <h4 class="font-semibold mb-4 flex items-center">
                        <i class="fas fa-satellite text-blue-400 mr-2"></i>
                        Orbital Characteristics
                    </h4>
                    <div class="space-y-3 text-sm">
                        <div
                        class="flex justify-between items-center py-2 border-b border-slate-700"
                        >
                        <span class="text-slate-400">Perihelion</span>
                        <span id="planet-perihelion" class="font-semibold"
                            >${perihelion}</span
                        >
                        </div>
                        <div
                        class="flex justify-between items-center py-2 border-b border-slate-700"
                        >
                        <span class="text-slate-400">Aphelion</span>
                        <span id="planet-aphelion" class="font-semibold"
                            >${aphelion}</span
                        >
                        </div>
                        <div
                        class="flex justify-between items-center py-2 border-b border-slate-700"
                        >
                        <span class="text-slate-400">Eccentricity</span>
                        <span id="planet-eccentricity" class="font-semibold"
                            >${planetsFromApi[i].eccentricity}</span
                        >
                        </div>
                        <div
                        class="flex justify-between items-center py-2 border-b border-slate-700"
                        >
                        <span class="text-slate-400">Inclination</span>
                        <span id="planet-inclination" class="font-semibold"
                            >${planetsFromApi[i].nclination}°</span
                        >
                        </div>
                        <div
                        class="flex justify-between items-center py-2 border-b border-slate-700"
                        >
                        <span class="text-slate-400">Axial Tilt</span>
                        <span id="planet-axial-tilt" class="font-semibold"
                            >${planetsFromApi[i].axialTilt}°</span
                        >
                        </div>
                        <div
                        class="flex justify-between items-center py-2 border-b border-slate-700"
                        >
                        <span class="text-slate-400">Avg Temperature</span>
                        <span id="planet-temp" class="font-semibold">${planetsFromApi[i].avgTemp}°C</span>
                        </div>
                        <div class="flex justify-between items-center py-2">
                        <span class="text-slate-400">Escape Velocity</span>
                        <span id="planet-escape" class="font-semibold"
                            >${formatEscapeVelocity(planetsFromApi[i].escape)} </span
                        >
                        </div>
                    </div>
                    </div>
                    <button
                    class="w-full py-3 bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors font-semibold"
                    >
                    <i class="fas fa-book mr-2"></i>Learn More
                    </button>
                </div>
                </div>
            `
         }
    }

  document.getElementById("planet-all-information").innerHTML = planetInfo;

});
