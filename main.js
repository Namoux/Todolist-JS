import { getAllTasks, newTask, removeTask, OnClickaddTask, onSubmit, cloneTask } from "./database.js";

const form = document.querySelector("form");
const addTask = document.querySelector(".addTask");
const closeWriteTask = document.querySelector(".writeTask i");

// Boutton pour ajouter les taches 
addTask.addEventListener("click", OnClickaddTask);
closeWriteTask.addEventListener("click", OnClickaddTask);

// Appel de la fonction pr recuperer les taches présentes dans le local storage
const Alltasks = getAllTasks();
console.log("task are", Alltasks);
Alltasks.forEach((task) => {
    cloneTask(task);
}); 

// Appel de la fonction pour Creation d'une tache dans le local storage
form.addEventListener("submit", onSubmit);

const deleteTasks = document.querySelectorAll("#delete");
const divTask = document.querySelectorAll(".task");

for (let i = 0; i < deleteTasks.length; i++) {
    deleteTasks[i].addEventListener("click", function () {
        console.log("delete");
        Alltasks.splice(i,1);
        console.log("task are", Alltasks);
        localStorage.setItem("tasks", JSON.stringify(Alltasks));
        
        for( let j = 0; j < divTask.length; j++) {
            divTask[i].remove();
            console.log("template removed");
        }
        // location.reload();
    });
}

// Affichage de la description au clic du chevron
const chevrons = document.querySelectorAll("#chevron");

for (let i = 0; i < chevrons.length; i++) {
    console.log(chevrons[i]);
    chevrons[i].addEventListener("click", function () {
        console.log("clic sur chevron ok")
        console.log(i);

        for (let j = 0; j < divTask.length; j++) {
            const arrow = divTask[i].firstElementChild;
            const conteneur = divTask[i].nextElementSibling;

            conteneur.classList.toggle("appear");
            divTask[i].classList.toggle("appear");
            console.log(conteneur);
            arrow.classList.toggle("fa-chevron-down");
            arrow.classList.toggle("fa-chevron-up");
        };
    });
}

// for (let i = 0; i < Alltasks.length; i++) {
//     console.log(Alltasks[i]);
// }

// deleteTasks.forEach((deleteTask)=>{
//     deleteTask.addEventListener("click", function(){
//         // localStorage.removeItem(template);
//         removeTask();
//     });
// });


