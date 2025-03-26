const inputBox = document.getElementById("inputcont");
const listcontainer = document.querySelector(".list");
const button =  document.getElementById("btn");
const time = document.querySelector(".clock");

function playAudio(){
    const audio = new Audio("1.wav");
    audio.currentTime = 0;
    audio.play();
}

const handler1 = (e)=>{
    if(e.target.tagName ==="LI"){
        e.target.classList.toggle("checked");
        saveData();
        updateTaskCounter();
    }
    else if(e.target.tagName === "SPAN"){
        e.target.parentElement.remove();
        saveData();
        updateTaskCounter();
    }
}

const handler2 = () => {
    if(inputBox.value === ""){
        alert("You must write some task");
    }
    else{
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        li.draggable = true;
        listcontainer.append(li);
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
        playAudio();
        updateTaskCounter();////////////////////
    }
    inputBox.value="";
    saveData();
}

button.addEventListener("click",handler2);

inputBox.addEventListener("keyup", (event) => {
    if (event.key === "Enter") { 
        handler2();
        inputBox.value="";
        saveData();
    }
});
 

listcontainer.addEventListener("click" , handler1);

function saveData(){
    localStorage.setItem("data",listcontainer.innerHTML);
}
function showData(){
    listcontainer.innerHTML = localStorage.getItem("data");
}
showData();
setInterval(() => {
    let currentTime = new Date();
    let hours = currentTime.getHours();
    let minutes = currentTime.getMinutes();
    let seconds = currentTime.getSeconds();

    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    time.innerHTML = hours + ':' + minutes + ':' + seconds;
}, 1000);


// Add this line to grab your counter display element (you need to add it in the HTML too)
const taskCounter = document.getElementById("task-counter");

// Function to update the remaining tasks counter
function updateTaskCounter() {
    const tasks = listcontainer.querySelectorAll("li");
    const remainingTasks = Array.from(tasks).filter(task => !task.classList.contains("checked")).length;
    taskCounter.innerText = `Tasks Remaining: ${remainingTasks}`;
}

// Call this after showData() to display the correct count on page load
showData();
updateTaskCounter();

// Add drag-and-drop functionality
listcontainer.addEventListener("dragstart", (event) => {
    if (event.target.tagName === "LI") {
        event.target.classList.add("dragging");
    }
});

listcontainer.addEventListener("dragend", (event) => {
    if (event.target.tagName === "LI") {
        event.target.classList.remove("dragging");
    }
});

listcontainer.addEventListener("dragover", (event) => {
    event.preventDefault(); // Allows the drop
    const draggingElement = document.querySelector(".dragging");
    const siblings = Array.from(listcontainer.querySelectorAll("li:not(.dragging)"));
    const nextSibling = siblings.find((sibling) => {
        const rect = sibling.getBoundingClientRect();
        return event.clientY < rect.top + rect.height / 2;
    });
    listcontainer.insertBefore(draggingElement, nextSibling);
});

listcontainer.addEventListener("drop", () => {
    saveData(); // Save the new order in localStorage
    updateTaskCounter(); // Update task counter (if necessary)
});

