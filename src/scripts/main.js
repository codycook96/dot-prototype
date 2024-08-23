//HTML Variable Definitions
const dotAddTextbox = document.getElementById("dot-add-textbox");
/*const dotAddButton = document.getElementById("dot-add-button");*/
const dotViewList = document.getElementById("dot-view-list");
const dotReadView = document.getElementById("dot-reader-textarea");

let dots = ["test1", "test2"];

function addDot(){
    if(dotAddTextbox.value === ''){
        alert("You must enter some text!");
    }
    else{
        let li = document.createElement("li");
        li.innerHTML = dotAddTextbox.value;
        dotViewList.appendChild(li);
        let mySpan = document.createElement("span");
        mySpan.innerHTML = "\u00d7";
        li.appendChild(mySpan);
    }
    dotAddTextbox.value = "";
}

dotViewList.addEventListener("click", function(e){
    if(e.target.tagName === "LI"){
        e.target.classList.toggle("checked");
    }else if(e.target.tagName === "SPAN"){
        e.target.parentElement.remove();
    }
}, false);

function readDots(){
    fetch('../test/dots.json')
        .then(function(response) { return response.json(); })
        .then(function(json) {
        dots = json.dots
        //dotReadView.value = json.dots[0];
    });
    
}
   
function displayDots(){
    let dotString = "";
    dots.forEach(dot => {
        dotString = dotString + dot + "\n"
    });
    dotReadView.value = dotString;
    
}    