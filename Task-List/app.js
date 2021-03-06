// Define UI Vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Load all event listeners
loadEventListeners();

// Load all event listeners
function loadEventListeners() {
  // DOM content loaded
  document.addEventListener('DOMContentLoaded', getTasks);
  // Add task event
  form.addEventListener('submit', addTask);
  // remove task
  taskList.addEventListener('click', removeTask);
  // clear all tasks
  clearBtn.addEventListener('click', removeTasks);
  // filter tasks
  filter.addEventListener('keyup', filterTasks);
}

// Add new task
function addTask(e) {
  // prevent default form behavior
  e.preventDefault();
  // assign val of input to var
  let newTask = taskInput.value;
  // check for empty input
  if (newTask !== "") {
    // create li element
    let newEntry = document.createElement('li');
    // assign class to element
    newEntry.className = 'collection-item';
    // add populated text node to element
    newEntry.appendChild(document.createTextNode(newTask));
    // create delete item link element
    let deleteLink = document.createElement('a');
    // assign class to element
    deleteLink.className = 'deleteItem secondary-content';
    // insert innerHTML into new element
    deleteLink.innerHTML = '<i class="fa fa-remove"></i>';
    // append delete link to new task li
    newEntry.appendChild(deleteLink);
    // append new task li to taskList ul
    taskList.appendChild(newEntry);
    // reset value of text input
    taskInput.value = '';
  }
  storeTask(newTask);
}

// Store task in localStorage
function storeTask(task) {
  // init tasks var
  let tasks;
  console.log(task);
  // check existence of tasks in LS
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    // parsing stored data to array
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  // add new task to array
  tasks.push(task);
  // store stringified array back in LS
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Get task from localStorage
function getTasks(e) {
  let tasks = localStorage.getItem('tasks');
  if (tasks === null) {
    return;
  }
  tasks = JSON.parse(tasks);
  tasks.forEach(function(task) {
    let newEntry = document.createElement('li');
    // assign class to element
    newEntry.className = 'collection-item';
    // add populated text node to element
    newEntry.appendChild(document.createTextNode(task));
    // create delete item link element
    let deleteLink = document.createElement('a');
    // assign class to element
    deleteLink.className = 'deleteItem secondary-content';
    // insert innerHTML into new element
    deleteLink.innerHTML = '<i class="fa fa-remove"></i>';
    // append delete link to new task li
    newEntry.appendChild(deleteLink);
    // append new task li to taskList ul
    taskList.appendChild(newEntry);
  });
}


function removeTask(e) {
  e.preventDefault();
  if (e.target.classList.contains('fa-remove')) {
    if (confirm('Are you sure you want to delete this task?')) {
      removeTaskFromLS(e.target.parentElement.parentElement.textContent);
      e.target.parentElement.parentElement.remove();
    }
  }
}

function removeTaskFromLS(task) {
  let tasks = JSON.parse(localStorage.getItem('tasks'));
  if (tasks === null) {
    return;
  } else {
    tasks.forEach(function(taskItem, index) {
      if (taskItem == task) {
        tasks.splice(index, 1);
      }
    });
  }
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function removeTasks() {
  if (confirm('Do you really want to delete all tasks?')) {
    while (taskList.firstChild) {
      taskList.removeChild(taskList.lastChild);
    }
  }
  localStorage.removeItem('tasks');
}

function filterTasks(e) {
  let filterText = e.target.value.toLowerCase();
  let entries = Array.from(taskList.children);
  entries.forEach(function(ele) {
    if (ele.textContent.toLowerCase().includes(filterText)) {
      ele.style.display = 'block';
    } else {
      ele.style.display = 'none';
    }
  });
}





// e.preventDefault();
// taskList.innerHTML = '';