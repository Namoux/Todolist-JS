
// fonction fenetre qui apparait
export function OnClickaddTask() {
    const writeTask = document.querySelector(".writeTask");
    writeTask.classList.toggle("select");
    console.log("WriteTask appear or disappear");
}

// fonction setter
export function newTask(ID, title, description, check) {
    
    let task = {
        ID,
        title,
        description,
        check
    };
    
    let tasks = JSON.parse(localStorage.getItem("tasks") ?? "[]");
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    
    return task;
}

// fonction getter 
export function getAllTasks(){
    let tasks = localStorage.getItem("tasks");
    if(tasks == null) return null;
    
    let task = JSON.parse(tasks);
    // console.log(task);

    return task;
}

// Compteur Pour definir un ID a chaque tache
let compteur = 0; 
export function CreateId() {
    let Alltasks = getAllTasks();
    if (Alltasks != null) {
        Alltasks.forEach((task) => {
            Alltasks.forEach((task) => {
                compteur = task.ID +1;
            })
        }); 
    }
    return compteur;

}

// fonction remove 
export function removeAllTasks(){
    let tasks = localStorage.removeItem("tasks");
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
    // console.log("id1 :", task.ID);
    

    // Boutont delete de chaque tache
    const BTNdelete = cloneTemplate.querySelector("#delete");
    const divTask = cloneTemplate.querySelector(".task");
    const divDescritption = cloneTemplate.querySelector(".post-description");
    
    BTNdelete.addEventListener("click", () => {
        let PositionTab = 0;
        let Alltasks = getAllTasks();

        // console.log("id2 :", task.ID);
        for(let i = 0; i < Alltasks.length; i++) {
            // console.log("TaskID ds le for :", Alltasks[i].ID);
            if (Alltasks[i].ID === task.ID) {
                console.log("i :", i);
                PositionTab = i;
                break;
            }
        }

        console.log("PositionTab :", PositionTab);
        Alltasks.splice(PositionTab, 1);
        divTask.remove();
        divDescritption.remove();
        localStorage.setItem("tasks", JSON.stringify(Alltasks));
        console.log("task removed");
        console.log("task are", Alltasks);
    });  
    

    // On lit la description en activant le chevron
    const chevrons = cloneTemplate.querySelector("#chevron");
    chevrons.addEventListener("click", () => {
        const conteneur = divTask.nextElementSibling;
        conteneur.classList.toggle("appear");
        divTask.classList.toggle("appear");
        chevrons.classList.toggle("fa-chevron-down");
        chevrons.classList.toggle("fa-chevron-up");
    });
    
    // On retourne la valeur si la tache est effectuée ou pas
    const checkbox = cloneTemplate.querySelector("#mycheck");
    let Alltasks = getAllTasks();
    checkbox.addEventListener("click", () => {
        let PositionTab = 0;
        
        console.log("id2 :", task.ID);
        for(let i = 0; i < Alltasks.length; i++) {
            // console.log("TaskID ds le for :", Alltasks[i].ID);
            if (Alltasks[i].ID === task.ID) {
                PositionTab = i;
                console.log("PositionTab :", i);
                break;
            }
        }
        
        if (Alltasks[PositionTab].check == false) {
            console.log("false ok");
            Alltasks[PositionTab].check = true;
            console.log("taskcheck apres le click", task.check);
            localStorage.setItem("tasks", JSON.stringify(Alltasks));	
        } else if (Alltasks[PositionTab].check == true) {
            console.log("true ok");
            Alltasks[PositionTab].check = false;
            localStorage.setItem("tasks", JSON.stringify(Alltasks));
        } else {
            console.log("Marche pas");
        }
        Alltasks = getAllTasks();
        console.log("task are", Alltasks);
    });

    // Au chargement de la page, on verifie les checkboxs
    let PositionTab = 0;
        
    // console.log("id2 :", task.ID);
    for(let i = 0; i < Alltasks.length; i++) {
        // console.log("TaskID ds le for :", Alltasks[i].ID);
        if (Alltasks[i].ID === task.ID) {
            console.log("i :", i);
            PositionTab = i;
            break;
        }
    }

    if (Alltasks[PositionTab].check == true) {
        checkbox.checked = true;
        console.log("c'est true");
    } else if (Alltasks[PositionTab].check == false) {
        console.log("c'est false");
        checkbox.checked = false;
    } else {
        console.log("Marche pas");
    }
    
    scrollTask.appendChild(cloneTemplate);
};

// Creation de la tache dans le local storage
export function onSubmit(event){
    event.preventDefault();
    const formData = new FormData(event.target);
    console.log(formData);

    let task = {
        ID: CreateId(), 
        title: formData.get("inputTitre"),
        description: formData.get("description"),
        check: false,
    };

    newTask(task.ID, task.title, task.description, task.check);
    OnClickaddTask();
    cloneTask(task);
    let Alltasks = getAllTasks();
    console.log("task are", Alltasks);
}   
