document.addEventListener("DOMContentLoaded", () => {
   const storedTasks = JSON.parse(localStorage.getItem('tasks'))

   if(storedTasks) {
      storedTasks.forEach((task)=> tasks.push(task));
      updateTasksList();
      updateStats();
   }
})

let tasks = [];

const saveTasks = () => {
   localStorage.setItem('tasks', JSON.stringify(tasks))
}

const addTask = () => {
   const taskInput = document.getElementById('taskInput')
   const text = taskInput.value.trim()

   if(text){
      tasks.push({text: text, completed: false})

      updateTasksList();

      taskInput.value = '';
      updateStats();
      saveTasks();
   }
};

const toggleTaskCompleted = (index) => {
   tasks[index].completed = !tasks[index].completed;
   updateTasksList();
   updateStats();
   saveTasks();
};

const deleteTask = (index) => {
   tasks.splice(index, 1);
   updateTasksList();
   updateStats();
   saveTasks();
};

const editTask = (index) => {
   const taskInput = document.getElementById('taskInput')
   taskInput.value = tasks[index].text

   tasks.splice(index,1)
   updateTasksList();
   updateStats();
   saveTasks();
}

const updateStats = ()=> {
   const completedTasks = tasks.filter(task=> task.completed).length;
   const totalTasks = tasks.length;
   const progress = (completedTasks/totalTasks) * 100;
   const progressBar = document.getElementById("progress");

   progressBar.style.width = `${progress}%`;

   document.getElementById('numbers').innerText = `${completedTasks} / ${totalTasks}`;

   if(tasks.length && completedTasks === totalTasks) {
      blastConfetti();
   }
}

const updateTasksList = ()=> {
   const taskList = document.getElementById('task-list')
   taskList.innerHTML = ''

   tasks.forEach((task, index) =>{
      const listItem = document.createElement("li");

      listItem.innerHTML = `
         <div class="taskItem">
            <div class="task ${task.completed ? "completed" : ""}">
               <input type="checkbox" class="checkbox" ${task.completed ? "checked" : ""}/>
               <p>${task.text}</p>
            </div>
            <div class="icons">
               <img src="./img/edit.png" onClick="editTask(${index})">
               <img src="./img/bin.png" onClick="deleteTask(${index})">
            </div>
         </div>
      `;

      listItem.addEventListener("change", ()=> toggleTaskCompleted(index));
      taskList.append(listItem);
   })
}

document.getElementById('newTask').addEventListener('click', function(e) {
   e.preventDefault()

   addTask();
})

const blastConfetti = ()=> {
   const defaults = {
      spread: 360,
      ticks: 100,
      gravity: 0,
      decay: 0.94,
      startVelocity: 30,
    };
    
    function shoot() {
      confetti({
        ...defaults,
        particleCount: 30,
        scalar: 1.2,
        shapes: ["circle", "square"],
        colors: ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"],
      });
    
      confetti({
        ...defaults,
        particleCount: 20,
        scalar: 2,
        shapes: ["emoji"],
        shapeOptions: {
          emoji: {
            value: ["🦄", "🌈"],
          },
        },
      });
    }
    
    setTimeout(shoot, 0);
    setTimeout(shoot, 100);
    setTimeout(shoot, 200);
}