import { getAllTasks, newTask, removeAllTasks, OnClickaddTask, onSubmit, cloneTask, CreateId } from "./database.js";

const form = document.querySelector("form");
const addTask = document.querySelector(".addTask");
const closeWriteTask = document.querySelector(".writeTask i");

// Boutton pour ajouter les taches 
addTask.addEventListener("click", OnClickaddTask);
closeWriteTask.addEventListener("click", OnClickaddTask);

// Appel de la fonction pr recuperer les taches présentes dans le local storage
const Alltasks = getAllTasks();

console.log("tasks are", Alltasks);
if (Alltasks != null) {
    Alltasks.forEach((task, i) => {
        cloneTask(task);
    }); 
}

// Appel de la fonction pour Creation d'une tache dans le local storage
form.addEventListener("submit", onSubmit);

// for (let i = 0; i < Alltasks.length; i++) {
//     console.log(Alltasks[i]);
// }

// deleteTasks.forEach((deleteTask)=>{
//     deleteTask.addEventListener("click", function(){
//         // localStorage.removeItem(template);
//         removeTask();
//     });
// });

