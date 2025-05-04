"use strict";

let taskInput = document.getElementById("taskInput");
let taskButton = document.getElementById("addTaskBtn");
let taskList = document.getElementById("taskList");

taskButton.addEventListener("click", addItem);

//adds input task and remove button in list
function addItem() {
  if (taskInput.value == "") {
    alert("Nothing to Note!");
  } else {
    console.log(taskInput.value);
    let newTask = taskList.insertAdjacentHTML(
      "beforeend",
      `<li>${taskInput.value}<button>Remove</button></li>`
    );
  }
}

//finds which task to remove and removes it
taskList.onclick = function (event) {
  let target = event.target;

  if (target.tagName != "BUTTON") return;

  console.log(target);
  target.parentElement.remove();
};
