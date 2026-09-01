const titleErrorMsg = document.getElementById("title-error-msg");
const addTaskBtnFromNavBar = document.getElementById("add-task-btn");
let toDoTasksArray = [];
let progressTasksArray = [];
let completeTasksArray = [];
const storedToDo = localStorage.getItem("toDoTasksArray");
if (storedToDo != null) {
    toDoTasksArray = JSON.parse(storedToDo);
}
const storedProgress = localStorage.getItem("progressTasksArray");
if (storedProgress != null) {
    progressTasksArray = JSON.parse(storedProgress);
}
const storedComplete = localStorage.getItem("completeTasksArray");
if (storedComplete != null) {
    completeTasksArray = JSON.parse(storedComplete);
}
showAllTasks();
clickOnButtons();
function getTodayDateString() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}
function getTimeAgo(timestamp) {
    const now = Date.now();
    const diffMs = now - timestamp;
    const minutes = Math.floor(diffMs / (1000 * 60));
    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    if (minutes < 1)
        return "just now";
    if (minutes < 60)
        return `${minutes}m ago`;
    if (hours < 24)
        return `${hours}h ago`;
    return `${days}d ago`;
}
function clickOnButtons() {
    document.addEventListener("click", function (e) {
        const target = e.target;
        const btn = target.closest(".to-do-btn, .start-btn, .complete-btn ,.update-btn , .delete-btn");
        if (!btn)
            return;
        let index = Number(btn.dataset.index);
        let fromName = btn.dataset.type;
        let btnAction = btn.dataset.action;
        if (btnAction === 'toDo') {
            addToDoTasksArray(index, fromName);
        }
        else if (btnAction === 'complete') {
            addToCompleteTasksArray(index, fromName);
        }
        else if (btnAction === 'progress') {
            addToProgressTasksArray(index, fromName);
        }
        else if (btnAction === 'update') {
            updateTask(index, fromName);
        }
        else if (btnAction === 'delete') {
            deleteTask(index, fromName);
        }
    });
}
function getModalTemplate(task) {
    return `
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
   <div class="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
      <div class="model-title-div flex justify-between">
          <h3 class="text-[#1D293D] font-medium text-[18px]">${task ? "Edit Task" : "Create New Task"}</h3>
          <button id="delete-btn" class="delete-btn text-[16px] text-[#90A1B9] py-1 px-1.5 rounded-lg hover:bg-[#F1F5F9] hover:text-[#45556C]">
              <i class="fa-solid fa-x"></i>
          </button>
      </div>
      <hr class="my-4 text-[#E2E8F0] border-1">
      <div class="task-inputs-div">
          <div class="input-div task-title-input mb-3">
              <label class="input-title text-[#314158] text-[14px] font-medium" for="taskName">
                  <span class="letter-icon text-[#92A3BA] text-[13px]">
                      <i class="fa-solid fa-h"></i>
                  </span>
                  Task Title
                  <span class="letter-icon text-red-500 text-[6px] align-super">
                      <i class="fa-solid fa-star-of-life"></i>
                  </span>
              </label>
              <br>
              <input class="mt-2 rounded-lg placeholder:text-[#94A4BB] focus:outline-[#4F39F6] w-full p-2 border-2 border-[#CAD5E2]" type="text" id="taskName" name="taskName" placeholder="What needs to be done?" required value="${task?.name ?? ''}">
              <span id="title-error-msg" class="text-[12px] text-red-600 hidden">
              Task Title is required
              </span>
          </div>

          <div class="flex flex-col sm:flex-row sm:items-start gap-4">
              <div class="input-div task-priority-input w-full sm:w-45">
                  <label class="input-title text-[#314158] text-[14px] font-medium" for="priority">
                      <span class="letter-icon text-[#92A3BA] text-[13px]">
                          <i class="fa-solid fa-flag"></i>
                      </span>
                      Priority
                  </label>
                  <br>
                  <select name="priority" class="mt-2 rounded-lg placeholder:text-[#94A4BB] focus:outline-[#4F39F6] w-full p-2 border-2 border-[#CAD5E2]" id="priority">
                      <option value="medium" ${task?.priority === "medium" ? "selected" : ""}>Medium</option>
                      <option value="low" ${task?.priority === "low" ? "selected" : ""}>Low</option>
                      <option value="high" ${task?.priority === "high" ? "selected" : ""}>High</option>
                  </select>
              </div>

              <div class="input-div task-date-input w-full sm:w-45">
                  <label class="input-title text-[#314158] text-[14px] font-medium" for="taskDate">
                      <span class="letter-icon text-[#92A3BA] text-[13px]">
                          <i class="fa-regular fa-calendar"></i>
                      </span>
                      Due Date
                  </label>
                  <br>
                  <input class="mt-2 rounded-lg placeholder:text-[#94A4BB] focus:outline-[#4F39F6] w-full p-2 border-2 border-[#CAD5E2]" type="date" id="taskDate" name="taskDate" value="${task?.date ?? ''}">
              </div>
          </div>

          <div class="input-div task-discription-input mb-3 mt-3">
              <label class="input-title text-[#314158] text-[14px] font-medium" for="taskDescription">
                  <span class="letter-icon text-[#92A3BA] text-[13px]">
                      <i class="fa-solid fa-bars-staggered"></i>
                  </span>
                  Description
              </label>
              <br>
              <textarea 
              class="mt-2 rounded-lg text-[#92A3BA] placeholder:text-[#92A3BA] text-left focus:outline-[#4F39F6] w-full p-2 border-2 border-[#CAD5E2]" 
              rows="2" 
              cols="2" 
              maxlength="500"
              id="taskDescription" 
              name="taskDescription" 
              placeholder="Add more details about this task ...">${task?.description ?? ''}</textarea>
              <span class="text-[#92A3BA] text-[12px]">Max. 500 character.</span>
          </div>
      </div>

      <div class="model-bnts flex flex-col sm:flex-row gap-2">
          <button id="cancel-btn" class="cancel-btn bg-[#F1F5F9] text-[16px] font-medium rounded-md text-[#314158] px-2.5 py-2 w-full sm:w-50 hover:bg-[#E2E8F0]">
              Cancel
          </button>
          <button id="add-task-finally-btn" class="add-task-finally-btn bg-[#4F39F6] text-[16px] font-medium rounded-md text-white px-2.5 py-2 w-full sm:w-47 hover:bg-[#432DD7]">
              <span class="plus-icon text-white text-[14px]">
                  <i class="fa-solid fa-${task ? "check" : "plus"}"></i>
              </span>
              ${task ? "Save Changes" : "Add Task"}
          </button>
      </div>
    </div>
  </div>
  `;
}
addTaskBtnFromNavBar?.addEventListener('click', () => {
    document.getElementById("modal").innerHTML = getModalTemplate();
    setupModalListeners();
});
function setupModalListeners(editIndex, editFromName) {
    const taskName = document.getElementById("taskName");
    const taskPriority = document.getElementById("priority");
    const taskDate = document.getElementById("taskDate");
    const taskDescription = document.getElementById("taskDescription");
    const addTaskBtn = document.getElementById("add-task-finally-btn");
    const cancelModelBtn = document.getElementById("cancel-btn");
    const XBtn = document.getElementById("delete-btn");
    const titleErrorMsg = document.getElementById("title-error-msg");
    taskDate.min = getTodayDateString();
    function clearInputs() {
        taskName.value = '';
        taskPriority.value = '';
        taskDate.value = '';
        taskDescription.value = '';
        titleErrorMsg?.classList.add("hidden");
    }
    cancelModelBtn?.addEventListener("click", () => {
        clearInputs();
        document.getElementById("modal").innerHTML = "";
    });
    XBtn?.addEventListener("click", () => {
        clearInputs();
        document.getElementById("modal").innerHTML = "";
    });
    addTaskBtn?.addEventListener('click', () => {
        if (taskName.value === "") {
            titleErrorMsg?.classList.remove("hidden");
            return;
        }
        if (editIndex !== undefined && editFromName !== undefined) {
            saveTask(taskName, taskPriority, taskDate, taskDescription, editIndex, editFromName);
        }
        else {
            addTask(taskName, taskPriority, taskDate, taskDescription);
        }
        clearInputs();
        document.getElementById("modal").innerHTML = "";
    });
}
function addTask(taskName, taskPriority, taskDate, taskDescription) {
    if (taskName != null) {
        let newTaskObject = {
            name: taskName.value,
            priority: taskPriority.value,
            date: taskDate.value,
            description: taskDescription.value,
            createdAt: Date.now()
        };
        toDoTasksArray.push(newTaskObject);
        showToDoTasks();
        showProgressTasks();
        showCompleteTasks();
        localStorage.setItem("toDoTasksArray", JSON.stringify(toDoTasksArray));
    }
}
function showToDoTasks() {
    let toDoTasksNumber = toDoTasksArray.length;
    let toDoTasksNumberElement = `
  <span> ${toDoTasksNumber} Tasks</span>
  `;
    document.getElementById("to-do-tasks-cards-index").innerHTML = toDoTasksNumberElement;
    let toDoTasksCards = "";
    for (let i = 0; i < toDoTasksArray.length; i++) {
        let taskPriorityColor = "";
        if (toDoTasksArray[i].priority === "high") {
            taskPriorityColor = "bg-[#FEF2F2] text-[#FB2C36]";
        }
        else if (toDoTasksArray[i].priority === "medium") {
            taskPriorityColor = "bg-[#FFFBEB] text-[#FE9A00]";
        }
        else if (toDoTasksArray[i].priority === "low") {
            taskPriorityColor = "bg-[#EFF6FF] text-[#2B7FFF]";
        }
        toDoTasksCards += `
     <div class="task-toDo-card my-4.5 rounded-xl bg-[#FFFFFF] border-[#EDF0F2] border-2 hover:shadow-md py-2 px-2.5 group/btn">
      <div class="task-toDo-card-inner">
          <div class="task-index-btns-div flex justify-between mb-3">
              <div class="task-index-div">
                  <span class="circle-icon text-[#CAD5E2] text-[8px]">
                      <i class="fa-solid fa-circle"></i>
                  </span>
                  <span class="task-index text-[10px] text-[#96A6BD] ml-1">
                      #${i + 1}
                  </span>
              </div>
              <div class="task-btns">
                  <button data-index="${i}" data-type="toDo" data-action="update" class="update-btn text-[10px] opacity-0 py-1 px-1.5 rounded-lg hover:bg-[#EEF2FF] hover:text-[#615FFF] group-hover/btn:text-[#77879d] group-hover/btn:opacity-100 transition-opacity">
                    <i class="fa-solid fa-pen"></i>
                  </button>
                  <button data-index="${i}" data-type="toDo" data-action="delete" class="delete-btn text-[10px] opacity-0 py-1 px-1.5 rounded-lg hover:bg-[#FEF2F2] hover:text-[#FB2C36] group-hover/btn:text-[#77879d] group-hover/btn:opacity-100 transition-opacity">
                    <i class="fa-solid fa-trash"></i>
                  </button>
              </div>
          </div>
          <div class="task-details">
              <h4 class="task-name text-[16px] font-semibold text-[#1D293D] mt-1">${toDoTasksArray[i].name}</h4>
              <p class="task-description text-[#697B93] text-[13px] font-medium mt-2">${toDoTasksArray[i].description}</p>
              <span class="task-level-span mt-4 inline-block text-[6px] py-1 px-2 rounded-xl ${taskPriorityColor}">
                  <i class="fa-solid fa-circle align-text-top"></i>
                  <span class="task-level text-[10px] font-medium ml-1">${toDoTasksArray[i].priority.toUpperCase()}</span> 
              </span>
              <br>
              ${toDoTasksArray[i].date ?
            `<span class="task-day-date mt-4 inline-block text-[#98A8BE] text-[11px] font-medium">
                  <span class="task-day-date-icon">
                      <i class="fa-regular fa-calendar"></i>
                  </span>
                  ${toDoTasksArray[i].date}
              </span> ` : ""}
              <span class="task-hour-date mt-4 inline-block text-[#98A8BE] text-[11px] font-medium ">
                  <span class="task-hour-date-icon">
                    <i class="fa-regular fa-clock"></i>
                  </span>
                    ${getTimeAgo(toDoTasksArray[i].createdAt)}
              </span>
          </div>
          <hr class="my-3 text-[#F1F5F9]">
          <div class="task-btns mb-3">
              <button data-index="${i}" data-type="toDo" data-action="progress" class="start-btn bg-[#FEF3C6] text-[12px] font-medium rounded-md text-[#BC4F02] px-2.5 py-1.5 hover:bg-[#FEE685]">
                  <span class="start-icon text-[10px]">
                    <i class="fa-solid fa-play"></i>
                  </span>
                  Start
              </button>
              <button data-index="${i}" data-type="toDo" data-action="complete" class="complete-btn bg-[#D0FAE5] text-[12px] font-medium rounded-md text-[#007A55] px-2.5 py-1.5 hover:bg-[#A4F4CF]">
                  <span class="complete-icon text-[10px]">
                    <i class="fa-solid fa-check"></i>
                  </span>
                  Complete
              </button>
          </div>
      </div>
  </div>
  `;
    }
    document.getElementById("task-toDo-cards").innerHTML = toDoTasksCards;
}
function showProgressTasks() {
    let progressTasksNumber = progressTasksArray.length;
    let progressTasksNumberElement = `
   <span> ${progressTasksNumber} Tasks</span>
   `;
    document.getElementById("progress-tasks-cards-index").innerHTML = progressTasksNumberElement;
    let progressTasksCards = "";
    for (let i = 0; i < progressTasksArray.length; i++) {
        let taskPriorityColor = "";
        if (progressTasksArray[i].priority === "high") {
            taskPriorityColor = "bg-[#FEF2F2] text-[#FB2C36]";
        }
        else if (progressTasksArray[i].priority === "medium") {
            taskPriorityColor = "bg-[#FFFBEB] text-[#FE9A00]";
        }
        else if (progressTasksArray[i].priority === "low") {
            taskPriorityColor = "bg-[#EFF6FF] text-[#2B7FFF]";
        }
        progressTasksCards += `
       <div class="task-progress-card my-4.5 rounded-xl bg-[#FFFFFF] border-[#EDF0F2] border-2 hover:shadow-md py-2 px-2.5 group/btn">
        <div class="task-progress-card-inner">
            <div class="task-index-btns-div flex justify-between mb-3">
                <div class="task-index-div">
                    <span class="circle-icon text-[#FFB900] text-[8px]">
                        <i class="fa-solid fa-circle"></i>
                    </span>
                    <span class="task-index text-[10px] text-[#96A6BD] ml-1">
                        #${i + 1}
                    </span>
                </div>
                <div class="task-btns">
                    <button data-index="${i}" data-type="progress" data-action="update" class="update-btn text-[10px] opacity-0 py-1 px-1.5 rounded-lg hover:bg-[#EEF2FF] hover:text-[#615FFF] group-hover/btn:text-[#77879d] group-hover/btn:opacity-100 transition-opacity">
                      <i class="fa-solid fa-pen"></i>
                    </button>
                    <button data-index="${i}" data-type="progress" data-action="delete" class="delete-btn text-[10px] opacity-0 py-1 px-1.5 rounded-lg hover:bg-[#FEF2F2] hover:text-[#FB2C36] group-hover/btn:text-[#77879d] group-hover/btn:opacity-100 transition-opacity">
                      <i class="fa-solid fa-trash"></i>
                    </button>
                </div>
            </div>
            <div class="task-details">
                <h4 class="task-name text-[16px] font-semibold text-[#1D293D] mt-1">${progressTasksArray[i].name}</h4>
                <p class="task-description text-[#697B93] text-[13px] font-medium mt-2">${progressTasksArray[i].description}</p>
                <span class="task-level-span mt-4 inline-block text-[6px] py-1 px-2 rounded-xl ${taskPriorityColor}">
                    <i class="fa-solid fa-circle align-text-top"></i>
                    <span class="task-level text-[10px] font-medium ml-1">${progressTasksArray[i].priority.toUpperCase()}</span> 
                </span>
                <br>
                ${progressTasksArray[i].date ?
            `<span class="task-day-date mt-4 inline-block text-[#98A8BE] text-[11px] font-medium">
                    <span class="task-day-date-icon">
                        <i class="fa-regular fa-calendar"></i>
                    </span>
                    ${progressTasksArray[i].date}
                </span> ` : ""}
                <span class="task-hour-date mt-4 inline-block text-[#98A8BE] text-[11px] font-medium ">
                    <span class="task-hour-date-icon">
                      <i class="fa-regular fa-clock"></i>
                    </span>
                    ${getTimeAgo(progressTasksArray[i].createdAt)}
                </span>
            </div>
            <hr class="my-3 text-[#F1F5F9]">
            <div class="task-btns mb-3">
                <button data-index="${i}" data-type="progress" data-action="toDo" class="to-do-btn bg-[#F1F5F9] text-[12px] font-medium rounded-md text-[#45556C] px-2.5 py-1.5 hover:bg-[#E2E8F0]">
                    <span class="to-do-icon text-[10px]">
                      <i class="fa-solid fa-arrow-rotate-left"></i>
                    </span>
                    To Do
                </button>
                <button data-index="${i}" data-type="progress" data-action="complete" class="complete-btn bg-[#D0FAE5] text-[12px] font-medium rounded-md text-[#007A55] px-2.5 py-1.5 hover:bg-[#A4F4CF]">
                    <span class="complete-icon text-[10px]">
                      <i class="fa-solid fa-check"></i>
                    </span>
                    Complete
                </button>   
            </div>
        </div>
    </div>
      `;
    }
    document.getElementById("task-progress-cards").innerHTML = progressTasksCards;
}
function showCompleteTasks() {
    let completeTasksNumber = completeTasksArray.length;
    let completeTasksNumberElement = `
  <span> ${completeTasksNumber} Tasks</span>
   `;
    document.getElementById("complete-tasks-cards-index").innerHTML = completeTasksNumberElement;
    let completeTasksCards = "";
    for (let i = 0; i < completeTasksArray.length; i++) {
        let taskPriorityColor = "";
        if (completeTasksArray[i].priority === "high") {
            taskPriorityColor = "bg-[#FEF2F2] text-[#FB2C36]";
        }
        else if (completeTasksArray[i].priority === "medium") {
            taskPriorityColor = "bg-[#FFFBEB] text-[#FE9A00]";
        }
        else if (completeTasksArray[i].priority === "low") {
            taskPriorityColor = "bg-[#EFF6FF] text-[#2B7FFF]";
        }
        completeTasksCards += `
     <div class="task-complete-card my-4.5 rounded-xl bg-[#FFFFFF] border-[#EDF0F2] border-2 hover:shadow-md py-2 px-2.5 group/btn">
        <div class="task-complete-card-inner">
            <div class="task-index-btns-div flex justify-between mb-3">
                <div class="task-index-div">
                    <span class="circle-icon text-[#3FCC9E] text-[8px]">
                        <i class="fa-solid fa-circle"></i>
                    </span>
                    <span class="task-index text-[10px] text-[#96A6BD] ml-1">
                        #${i + 1}
                    </span>
                </div>
                <div class="task-btns">
                    <button data-index="${i}" data-type="complete" data-action="update" class="update-btn text-[10px] opacity-0 py-1 px-1.5 rounded-lg hover:bg-[#EEF2FF] hover:text-[#615FFF] group-hover/btn:text-[#77879d] group-hover/btn:opacity-100 transition-opacity">
                      <i class="fa-solid fa-pen"></i>
                    </button>
                    <button data-index="${i}" data-type="complete" data-action="delete" class="delete-btn text-[10px] opacity-0 py-1 px-1.5 rounded-lg hover:bg-[#FEF2F2] hover:text-[#FB2C36] group-hover/btn:text-[#77879d] group-hover/btn:opacity-100 transition-opacity">
                      <i class="fa-solid fa-trash"></i>
                    </button>
                </div>
            </div>
            <div class="task-details">
                <h4 class="task-name text-[16px] font-semibold text-[#1D293D] mt-1">${completeTasksArray[i].name}</h4>
                <p class="task-description text-[#697B93] text-[13px] font-medium mt-2">${completeTasksArray[i].description}</p>
                <span class="task-level-span mt-4 inline-block text-[6px] py-1 px-2 rounded-xl ${taskPriorityColor}">
                    <i class="fa-solid fa-circle align-text-top"></i>
                    <span class="task-level text-[10px] font-medium ml-1">${completeTasksArray[i].priority}</span> 
                </span>
                <br>
                ${completeTasksArray[i].date ?
            `<span class="task-day-date mt-4 inline-block text-[#98A8BE] text-[11px] font-medium">
                    <span class="task-day-date-icon">
                        <i class="fa-regular fa-calendar"></i>
                    </span>
                    ${completeTasksArray[i].date}
                </span>` : ''}
                <span class="task-hour-date mt-4 inline-block text-[#98A8BE] text-[11px] font-medium ">
                    <span class="task-hour-date-icon">
                      <i class="fa-regular fa-clock"></i>
                    </span>
                    ${getTimeAgo(completeTasksArray[i].createdAt)}
                </span>
            </div>
            <hr class="my-3 text-[#F1F5F9]">
            <div class="task-btns mb-3">
                  <button data-index="${i}" data-type="complete" data-action="toDo" class="to-do-btn bg-[#F1F5F9] text-[12px] font-medium rounded-md text-[#45556C] px-2.5 py-1.5 hover:bg-[#E2E8F0]">
                    <span class="to-do-icon text-[10px]">
                      <i class="fa-solid fa-arrow-rotate-left"></i>
                    </span>
                    To Do
                </button>
                <button data-index="${i}" data-type="complete" data-action="progress" class="start-btn bg-[#FEF3C6] text-[12px] font-medium rounded-md text-[#BC4F02] px-2.5 py-1.5 hover:bg-[#FEE685]">
                    <span class="start-icon text-[10px]">
                      <i class="fa-solid fa-play"></i>
                    </span>
                    Start
                </button>
            </div>
        </div>
    </div>
    `;
    }
    document.getElementById("task-complete-cards").innerHTML = completeTasksCards;
}
function getArrayByName(fromName) {
    if (fromName === 'toDo')
        return { array: toDoTasksArray, key: 'toDoTasksArray' };
    if (fromName === 'progress')
        return { array: progressTasksArray, key: 'progressTasksArray' };
    if (fromName === 'complete')
        return { array: completeTasksArray, key: 'completeTasksArray' };
}
function showAllTasks() {
    showToDoTasks();
    showProgressTasks();
    showCompleteTasks();
}
function addToCompleteTasksArray(cardIndex, fromName) {
    const source = getArrayByName(fromName);
    const card = source.array[cardIndex];
    if (!card)
        return;
    completeTasksArray.push(card);
    source.array.splice(cardIndex, 1);
    localStorage.setItem("completeTasksArray", JSON.stringify(completeTasksArray));
    localStorage.setItem(source.key, JSON.stringify(source.array));
    showAllTasks();
}
function addToProgressTasksArray(cardIndex, fromName) {
    const source = getArrayByName(fromName);
    const card = source.array[cardIndex];
    if (!card)
        return;
    progressTasksArray.push(card);
    source.array.splice(cardIndex, 1);
    localStorage.setItem("progressTasksArray", JSON.stringify(progressTasksArray));
    localStorage.setItem(source.key, JSON.stringify(source.array));
    showAllTasks();
}
function addToDoTasksArray(cardIndex, fromName) {
    const source = getArrayByName(fromName);
    const card = source.array[cardIndex];
    if (!card)
        return;
    toDoTasksArray.push(card);
    source.array.splice(cardIndex, 1);
    localStorage.setItem("toDoTasksArray", JSON.stringify(toDoTasksArray));
    localStorage.setItem(source.key, JSON.stringify(source.array));
    showAllTasks();
}
function updateTask(cardIndex, fromName) {
    const source = getArrayByName(fromName);
    const task = source?.array[cardIndex];
    if (!task)
        return;
    document.getElementById("modal").innerHTML = getModalTemplate(task);
    setupModalListeners(cardIndex, fromName);
}
function saveTask(taskName, taskPriority, taskDate, taskDescription, cardIndex, fromName) {
    const source = getArrayByName(fromName);
    const task = source?.array[cardIndex];
    if (!task)
        return;
    task.name = taskName.value;
    task.priority = taskPriority.value;
    task.date = taskDate.value;
    task.description = taskDescription.value;
    localStorage.setItem(source.key, JSON.stringify(source.array));
    showAllTasks();
}
function deleteTask(cardIndex, fromName) {
    const source = getArrayByName(fromName);
    const card = source.array[cardIndex];
    if (!card)
        return;
    source.array.splice(cardIndex, 1);
    localStorage.setItem(source.key, JSON.stringify(source.array));
    showAllTasks();
}
export {};
