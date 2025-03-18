
// fonction fenetre qui apparait
export function OnClickaddTask() {
    const writeTask = document.querySelector(".writeTask");
    writeTask.classList.toggle("select");
    console.log("WriteTask appear or disappear");
}

// fonction setter
export function newTask(title, description) {
    const task = {
        title,
        description
    };
    const tasks = JSON.parse(localStorage.getItem("tasks") ?? "[]");
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));

    return task;
}

// fonction getter 
export function getAllTasks(){
    const tasks = localStorage.getItem("tasks");
    if(tasks == null) return null;

    const task = JSON.parse(tasks);
    // console.log(task);

    return task;
}

// fonction remove 
export function removeTask(){
    const tasks = localStorage.removeItem("tasks");
}

// Affichage des taches sur le HTML
export function cloneTask (task) {
    const scrollTask = document.querySelector(".scrollTask");
    const template = document.querySelector(".post-template");

    const cloneTemplate = template.content.cloneNode(true);

    const title = cloneTemplate.querySelector(".post-titre>p");
    title.textContent = task.title;

    const description = cloneTemplate.querySelector(".post-description>p");
    description.textContent = task.description;

    scrollTask.appendChild(cloneTemplate);
};

// Creation de la tache dans le local storage
export function onSubmit(event){
    event.preventDefault();
    const formData = new FormData(event.target);
    console.log(formData);
    
    const task = {
        title: formData.get("inputTitre"),
        description: formData.get("description"),
    }
    newTask(task.title, task.description);
    OnClickaddTask();
    cloneTask(task);
    
}   