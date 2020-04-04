const taskList = document.querySelector('.collection');
const form = document.querySelector('#task-form');
const taskInput  = document.querySelector('#task');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');


function fireEventListeners(){
  document.addEventListener('DOMContentLoaded', getTasks);
  form.addEventListener('submit',addTask);
  taskList.addEventListener('click',removeTask);
  clearBtn.addEventListener('click',clearTasks);
  filter.addEventListener('keyup',filterTasks);
}

fireEventListeners();

function filterTasks(){
  tasks = document.querySelectorAll('.collection-item');
  tasks.forEach(function(task){
    if(task.innerText.toLowerCase().indexOf(filter.value.toLowerCase())!=-1){
      task.style.display="block";
    }
    else{
      task.style.display="none";
    }
  })
};

function clearTasks(){
  taskList.innerHTML = "";
  localStorage.clear();
}

function clearLocalStorage(){
  localStorage.clear();
}

function removeTask(e){
  if(e.target.className==="fa fa-remove"){
    e.target.parentElement.parentElement.remove();
    deleteTaskFromLocalStorage(e.target.parentElement.parentElement.innerText);
  }
}

function deleteTaskFromLocalStorage(task){
  let tasks;
  if(localStorage.getItem('tasks')===null){
    tasks=[]
  }
  else{
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.forEach(function(item, index){
    if(task===item){
      tasks.splice(index,1);
    }
  })
  localStorage.setItem('tasks',JSON.stringify(tasks));
};

function getTasks(){
  let tasks;
  if(localStorage.getItem('tasks')===null){
    tasks=[]
  }
  else{
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.forEach(function(task){
    const li = document.createElement('li');
    li.className = "collection-item";
    li.innerText = task;
    const a = document.createElement('a');
    a.className = "delete-item secondary-content";
    const i = document.createElement('i');
    i.className = "fa fa-remove";
    a.appendChild(i);
    li.appendChild(a);
    taskList.appendChild(li);
  })
}

function addTask(e){
  const li = document.createElement('li');
  li.className = "collection-item";
  li.innerText = taskInput.value;
  const a = document.createElement('a');
  a.className = "delete-item secondary-content";
  const i = document.createElement('i');
  i.className = "fa fa-remove";
  a.appendChild(i);
  li.appendChild(a);
  taskList.appendChild(li);
  addTaskToLocalStorage(taskInput.value);
  taskInput.value="";
  e.preventDefault();
}

function addTaskToLocalStorage(task){
  let tasks;
  if(localStorage.getItem('tasks')===null){
    tasks=[]
  }
  else{
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
};
