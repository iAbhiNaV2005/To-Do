const inputBox = document.getElementById("inputcont");
const listcontainer = document.querySelector(".list");
const button =  document.getElementById("btn");

button.onclick = () => {
    if(inputBox.value === ""){
        alert("You must write some task");
    }
    else{
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        listcontainer.append(li);
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
    }
    inputBox.value="";
    saveData();
}
listcontainer.addEventListener("click",(e)=>{
    if(e.target.tagName ==="LI"){
        e.target.classList.toggle("checked");
        saveData();
    }
    else if(e.target.tagName === "SPAN"){
        e.target.parentElement.remove();
        saveData();
    }
}, false);

function saveData(){
    localStorage.setItem("data",listcontainer.innerHTML);
}
function showData(){
    listcontainer.innerHTML = localStorage.getItem("data");
}
showData();