const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
function addTask(){
     if(inputBox.value == ''){
        alert("You must write something!");
     }else{
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);

        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);

     }
     inputBox.value = "";
     saveData(); 
     updateItemsLeftCount();
}

listContainer.addEventListener("click", function(e){
    if(e.target.tagName === "LI"){
        e.target.classList.toggle("checked");
        saveData();
        updateItemsLeftCount();
    }else if(e.target.tagName ==="SPAN"){
        e.target.parentElement.remove();
        saveData()
        updateItemsLeftCount();
    }
}, false)

 
function saveData(){
    localStorage.setItem("data", listContainer.innerHTML);
}

function showTask(){
    listContainer.innerHTML = localStorage.getItem("data"); 
}
showTask();
/*buttons*/
/* All */ 
const allButton = document.getElementById("all-btn");

allButton.addEventListener("click", function() {
  showTask();
  updateItemsLeftCount();
});

function showTask() {
  listContainer.innerHTML = localStorage.getItem("data"); 
}
/* completed*/ 
const completedButton = document.getElementById("completed-btn");

completedButton.addEventListener("click", function() {
  showCompletedTasks();
  updateItemsLeftCount();
});

function showCompletedTasks() {
  const listItems = listContainer.getElementsByTagName("li");

  for (let i = 0; i < listItems.length; i++) {
    const listItem = listItems[i];

    if (listItem.classList.contains("checked")) {
      listItem.style.display = "block";
    } else {
      listItem.style.display = "none";
    }
  }
}

/*Active */

const activeButton = document.getElementById("active-btn");

activeButton.addEventListener("click", function() {
  showActiveTasks();
  updateItemsLeftCount();
});

function showActiveTasks() {
  const listItems = listContainer.getElementsByTagName("li");

  for (let i = 0; i < listItems.length; i++) {
    const listItem = listItems[i];

    if (listItem.classList.contains("checked")) {
      listItem.style.display = "none";
    } else {
      listItem.style.display = "block";
    }
  }
}

/* clear completed*/

const clearCompletedButton = document.getElementById("clear-completed-btn");

clearCompletedButton.addEventListener("click", function() {
  clearCompletedTasks();
  updateItemsLeftCount();
});

function clearCompletedTasks() {
  const listItems = listContainer.getElementsByTagName("li");

  for (let i = listItems.length - 1; i >= 0; i--) {
    const listItem = listItems[i];

    if (listItem.classList.contains("checked")) {
      listItem.remove();
    }
  }
  saveData();
}

/* items left*/

const itemsLeftElement = document.getElementById("items-left");

function updateItemsLeftCount() {
  const listItems = listContainer.getElementsByTagName("li");
  let uncheckedCount = 0;

  for (let i = 0; i < listItems.length; i++) {
    const listItem = listItems[i];

    if (!listItem.classList.contains("checked")) {
      uncheckedCount++;
    }
  }

  itemsLeftElement.textContent = uncheckedCount + " items left";
}


updateItemsLeftCount();

/* drag and drop */

const listItems = listContainer.getElementsByTagName("li");
let draggedItem = null;


for (let i = 0; i < listItems.length; i++) {
  const listItem = listItems[i];
  listItem.draggable = true;

  listItem.addEventListener("dragstart", function (e) {
    draggedItem = this;
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/html", this.innerHTML);
    this.classList.add("dragging");
  });

  listItem.addEventListener("dragover", function (e) {
    e.preventDefault();
    this.classList.add("drag-over");
  });

  listItem.addEventListener("dragleave", function () {
    this.classList.remove("drag-over");
  });

  listItem.addEventListener("drop", function (e) {
    e.preventDefault();
    this.classList.remove("drag-over");
    if (draggedItem !== this) {
      draggedItem.innerHTML = this.innerHTML;
      this.innerHTML = e.dataTransfer.getData("text/html");
      saveData();
    }
  });

  listItem.addEventListener("dragend", function () {
    this.classList.remove("drag-over");
    this.classList.remove("dragging");
  });
}

/*default display */

window.onload = function() {
    document.getElementById("active-btn").click();
  };
  
/*toggle */

const sunIcon = document.querySelector('.fa-sun');
const moonIcon = document.querySelector('.fa-moon');
const body = document.body;


const themeMode = localStorage.getItem('themeMode');


if (themeMode === 'dim') {
  body.classList.add('dim-theme');
  sunIcon.style.display = 'inline-block';
  moonIcon.style.display = 'none';
} else {
  body.classList.add('bright-theme');
  sunIcon.style.display = 'none';
  moonIcon.style.display = 'inline-block';
}

sunIcon.addEventListener('click', function() {
  body.classList.remove('dim-theme');
  body.classList.add('bright-theme');
  sunIcon.style.display = 'none';
  moonIcon.style.display = 'inline-block';
  
  localStorage.setItem('themeMode', 'bright');
});

moonIcon.addEventListener('click', function() {
  body.classList.remove('bright-theme');
  body.classList.add('dim-theme');
  moonIcon.style.display = 'none';
  sunIcon.style.display = 'inline-block';
 
  localStorage.setItem('themeMode', 'dim');
});

// hover should apply to only buttons not clicked on
const filterButtons = document.querySelectorAll('#buttons-container button');

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    filterButtons.forEach(btn => {
      btn.classList.remove('inactive');
    });
    button.classList.add('inactive');
  });
});



