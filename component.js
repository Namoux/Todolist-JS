import {getAllTasks, createTask} from "./database.js"
/**
 * get -> crud database
 * set -> crud database
 * on -> event callback
 * print
 * handle / listen -> addEventListener
 */

/** Appel de la fonction pr recuperer les taches présentes dans le local storage  */
export function printAllTasks() {
    const Alltasks = getAllTasks();
    console.log("tasks are", Alltasks);

    // Supprimer les tâches existantes de l'affichage
    RemoveTaskHTML();

    if (Alltasks != null) {
        // Affichage des taches en clonant chaque tache avec une balise template
        Alltasks.forEach((task) => {
            cloneTask(task);
        });
    } else if (Alltasks == null) {
        // Affichage d'un message pop up pour avertir l'utilisateur de l'absence de tâche.
        AppearComponentNoTask();
    } else if (Alltasks.length === 0) { // Vérifier si le tableau est a 0
        AppearComponentNoTask();
    }

};

/** Compteur Pour definir un ID a chaque tache */
let lastTaskId = 0;
export function CreateId() {
    let Alltasks = getAllTasks();
    if (Alltasks != null) {
        Alltasks.forEach((task) => {
            Alltasks.forEach((task) => {
                lastTaskId = task.ID + 1;
            })
        });
    }
    return lastTaskId;
};

/** Affichage des taches sur le HTML */
export function cloneTask(task) {

    // On clone la div template pour chaque tache
    const scrollTask = document.querySelector(".scrollTask");
    const template = document.querySelector(".post-template");

    const cloneTemplate = template.content.cloneNode(true);

    const title = cloneTemplate.querySelector(".post-titre>p");
    title.textContent = task.title;

    const description = cloneTemplate.querySelector(".post-description>p");
    // description.textContent = task.description;
    description.innerHTML = task.description.replace(/\n/g, "<br>");

    const date = cloneTemplate.querySelector(".date>h2");
    date.textContent = task.date;

    // Bouton delete de chaque tache
    const BTNdelete = cloneTemplate.querySelector("#delete");
    const divTask = cloneTemplate.querySelector(".task");
    const divDescritption = cloneTemplate.querySelector(".post-description");

    BTNdelete.addEventListener("click", () => {
        // On determine la position de la tache dans le tableau
        let PositionTab = 0;
        let Alltasks = getAllTasks();

        for (let i = 0; i < Alltasks.length; i++) {
            if (Alltasks[i].ID === task.ID) {
                PositionTab = i;
                break;
            }
        }

        // classe pour la transition slide
        divTask.classList.add("slide");
        divDescritption.classList.add("slide");

        setTimeout(() => {
            // console.log("PositionTab :", PositionTab);
            Alltasks.splice(PositionTab, 1);
            divTask.remove();
            divDescritption.remove();
            localStorage.setItem("tasks", JSON.stringify(Alltasks));
            console.log("task removed");
            console.log("task are", Alltasks);
            // Vérifier si la liste des tâches est vide
            if (Alltasks.length === 0) {
                AppearComponentNoTask();
                localStorage.removeItem("tasks");
            }
        }, 500);

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
    
    // On retourne la valeur true or false si la tache est effectuée ou pas
    const checkbox = cloneTemplate.querySelector("#mycheck");
    checkbox.addEventListener("click", () => {
        
        // On determine la position de la tache dans le tableau
        let Alltasks = getAllTasks();
        console.log("task are", Alltasks);
        let PositionTab = 0;
        
        for (let i = 0; i < Alltasks.length; i++) {
            if (Alltasks[i].ID === task.ID) {
                PositionTab = i;
                console.log("PositionTab :", i);
                break;
            }
        }
        
        console.log("task are", Alltasks);
        // Alltasks[PositionTab].check = !Alltasks[PositionTab].check;
        if (Alltasks[PositionTab].check == false) {
            divTask.classList.add("finish");
            // console.log("false ok");
            Alltasks[PositionTab].check = true;
            console.log("taskcheck apres le click", Alltasks[PositionTab].check);
            localStorage.setItem("tasks", JSON.stringify(Alltasks));
        } else if (Alltasks[PositionTab].check == true) {
            // console.log("true ok");
            Alltasks[PositionTab].check = false;
            console.log("taskcheck apres le click", Alltasks[PositionTab].check);
            localStorage.setItem("tasks", JSON.stringify(Alltasks));
            divTask.classList.remove("finish");
        } else {
            console.log("Marche pas");
        }
        // localStorage.setItem("tasks", JSON.stringify(Alltasks));
        Alltasks = getAllTasks();
        console.log("task are", Alltasks);
        
        SortbyTruecheck();
    });
    
    // Au chargement de la page, on verifie les checkboxs
    // On determine la position de la tache dans le tableau
    let Alltasks = getAllTasks();
    let PositionTab = 0;
    
    for (let i = 0; i < Alltasks.length; i++) {
        if (Alltasks[i].ID === task.ID) {
            // console.log("i :", i);
            PositionTab = i;
            break;
        }
    }
    
    if (Alltasks[PositionTab].check == true) {
        checkbox.checked = true;
        // console.log("c'est true");
    } else if (Alltasks[PositionTab].check == false) {
        // console.log("c'est false");
        checkbox.checked = false;
    } else {
        console.log("Marche pas");
    }
    
    // Suppression de toutes les taches
    const BTNOoui = document.querySelector(".oui");
    const divAllTasks = cloneTemplate.querySelectorAll(".task");
    const divAllDescritptions = cloneTemplate.querySelectorAll(".post-description");
    
    BTNOoui.addEventListener("click", () => {
        // onClickTrash();

        // classe pour la transition slide
        divAllTasks.forEach((task) => {
            task.classList.add("slide");
        });

        // classe pour la transition slide
        divAllDescritptions.forEach((description) => {
            description.classList.add("slide");
        });

        setTimeout(() => {
            divAllTasks.forEach((task) => {
                task.remove();
            });
            divAllDescritptions.forEach((description) => {
                description.remove();
            });
            
            localStorage.removeItem("tasks");
            
            // Mettre à jour l'affichage après la suppression
            printAllTasks();
        }, 500);

        // Masquer le composant de confirmation
        const ConfirmationDeleteALL = document.querySelector(".ConfirmationDeleteALL");
        ConfirmationDeleteALL.classList.remove("appear");
    });

    // cloneTemplate est un enfant de scrollTask
    scrollTask.appendChild(cloneTemplate);
};

/** Creation de la tache dans le local storage, affichage de la tache */
export function onSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    console.log(formData);
    const date = new Date();
    const formattedDate = date.toLocaleString();
    
    let task = {
        ID: CreateId(),
        title: formData.get("inputTitre"),
        description: formData.get("description"),
        date: formattedDate,
        check: false,
    };
    
    createTask(task.ID, task.title, task.description, task.date, task.check);
    OnClickaddTask();
    cloneTask(task);
    sortbyIDdecreasing();

    // Réinitialiser les champs de saisie titre et description
    document.querySelector("#inputTitre").value = ""; 
    document.querySelector("#description").value = ""; 

    // Si une tache est crée, on supprime la fenetre pas de tache
    const NoTask = document.querySelector(".NoTask");
    if (NoTask != null) {
        NoTask.classList.remove("appear");
    }

    const closeNoTask = document.querySelector(".NoTasktodelete");
    if (closeNoTask != null) {
        closeNoTask.classList.remove("appear");
    }

    let Alltasks = getAllTasks();
    console.log("task are", Alltasks);
};

/** Fonction de la recherche par mot clé */
export function searchTagSubmit(event) {
    event.preventDefault();

    const Alltasks = getAllTasks();
    console.log("task are", Alltasks);

    if (Alltasks == null) {
        onClickTrashNoTask();
    } else {
        const search = document.querySelector("#rech").value.trim();
        console.log("search :", search);

        const resultsTask = Alltasks.filter((task)=>{
            return task.title == search;
        });

        const resultsDescription = Alltasks.filter((task)=>{
            return task.description == search;
        });

        console.log("resultsTask : ", resultsTask);
        console.log("resultsDescription : ", resultsDescription);
        
        const results = [...resultsTask, ...resultsDescription];
        console.log("results : ", results);
        console.log("results length : ", results.length);
        
        RemoveTaskHTML (); 
        appearBTNreturn();
        
        results.forEach((task) => {
            cloneTask(task);
        });
    };
};

/** Supression des divs taches sur le html */
export function RemoveTaskHTML () {
    const divTask = document.querySelectorAll(".task");
    const divDescritption = document.querySelectorAll(".post-description");
    
    divTask.forEach((task)=>{
        task.remove();
    });
    
    divDescritption.forEach((description)=>{
        description.remove();
    });
};

/** Fonction composant pas de tache qui apparait */
export function AppearComponentNoTask() {
    const NoTask = document.querySelector(".NoTask");
    // NoTask.classList.toggle("appear");
    NoTask.classList.add("appear");
};

/** fonction composant ajout de tache  */
export function OnClickaddTask() {
    const writeTask = document.querySelector(".writeTask");
    writeTask.classList.toggle("select");
    console.log("WriteTask appear or disappear");
};

/** fonction fenetre confirmation de suppression des taches */
export function onClickTrash() {
    const ConfirmationDeleteALL = document.querySelector(".ConfirmationDeleteALL");
    ConfirmationDeleteALL.classList.toggle("appear");
    console.log("ConfirmationDeleteALL appear or disappear");
};

/** fonction composant pas de tache a supprimer  */
export function onClickTrashNoTask() {
    const NoTask = document.querySelector(".NoTasktodelete");
    NoTask.classList.toggle("appear");
    console.log("NoTask appear or disappear");
};

/** Bouton "retour" qui apparait */
export function appearBTNreturn () {
    const BTNreturn = document.querySelector("#return");
    BTNreturn.classList.add("appear");
};

/** Bouton retour a l'acceuil */
export function returnToHome() {
    const BTNreturn = document.querySelector("#return");

    BTNreturn.addEventListener("click", () =>{
        console.log("return ok");
        RemoveTaskHTML();
        const BTNreturn = document.querySelector("#return");
        BTNreturn.classList.remove("appear");
        printAllTasks();
    });
};

/** fonction de tri par check */
export function SortbyTruecheck() {
    const Alltasks = getAllTasks();
    console.log("task are", Alltasks);

    if (Alltasks == null) return null;

    // Je recupere les taches checked
    const trueCheck = Alltasks.filter((task)=>{
        return task.check == true;
    });
    console.log("trueCheck", trueCheck);
    
    // je recupere les taches non checked
    const falseCheck = Alltasks.filter((task)=>{
        return task.check == false;
    });
    console.log("falseCheck", falseCheck);
    
    // Destructuring je met tout dans un tableau, les non checked en 1er
    const sortcheck = [...falseCheck, ...trueCheck];
    console.log("sortcheck", sortcheck);

    // transition pour un fade out-in, on commence par le rendre invisible
    const divAllTasks = document.querySelectorAll(".task");
    const divAllDescritptions = document.querySelectorAll(".post-description");

    divAllTasks.forEach((task) => {
        task.classList.remove("fade-in");
        task.classList.add("fade-out");
    });

    divAllDescritptions.forEach((description) => {
        description.classList.remove("fade-in");
        description.classList.add("fade-out");
    });
    
    // Utiliser setTimeout pour attendre la fin de la transition avant de mettre à jour l'affichage
    setTimeout(() => {
        RemoveTaskHTML ();
        sortcheck.forEach((task) => {
            cloneTask(task);
        });

        // Rendre les tâches visibles après le tri
        const newdivAllTasks = document.querySelectorAll(".task");
        const newdivAllDescritptions = document.querySelectorAll(".post-description");
    
        newdivAllTasks.forEach((task, i) => {
            task.classList.remove("fade-out");
            if (sortcheck[i].check == true){
                task.classList.add("finish");
            } else if (sortcheck[i].check == false) {
                task.classList.add("fade-in");
            }
        });
    
        newdivAllDescritptions.forEach((description) => {
            description.classList.remove("fade-out");
            description.classList.add("fade-in");
        });
    }, 300);
};

/** fonction de tri décroissant par ID decroissant*/
export function sortbyIDdecreasing(){
    const Alltasks = getAllTasks();
    console.log("task are", Alltasks);

    if (Alltasks == null) return null;

    // Je recupere les taches checked
    const trueCheck = Alltasks.filter((task)=>{
        return task.check == true;
    });
    console.log("trueCheck", trueCheck);
    
    // je les tri en decroissant
    const trueCheckSorted = trueCheck.reverse((a, b)=>{
        return a.ID - b.ID;
    });
    console.log("trueChecksorted", trueCheckSorted);

    // je recupere les taches non checked
    const falseCheck = Alltasks.filter((task)=>{
        return task.check == false;
    });
    console.log("falseCheck", falseCheck);

    // je les tri en decroissant
    const falseCheckSorted = falseCheck.reverse((b, a)=>{
        return a.ID - b.ID;
    });
    console.log("falseChecksorted", falseCheckSorted);

    // Destructuring je met tout dans un tableau, les non checked en 1er
    const sortcheck = [...falseCheckSorted, ...trueCheckSorted];
    console.log("sortcheck", sortcheck);
    

    // Rendre les tâches invisibles avant le tri
    const divAllTasks = document.querySelectorAll(".task");
    const divAllDescritptions = document.querySelectorAll(".post-description");

    divAllTasks.forEach((task) => {
        task.classList.remove("fade-in");
        task.classList.add("fade-out");
    });

    divAllDescritptions.forEach((description) => {
        description.classList.remove("fade-in");
        description.classList.add("fade-out");
    });
    
    // Utiliser setTimeout pour attendre la fin de la transition avant de mettre à jour l'affichage
    setTimeout(() => {
        RemoveTaskHTML ();
        sortcheck.forEach((task) => {
            cloneTask(task);
        });

        // Rendre les tâches visibles après le tri
        const newdivAllTasks = document.querySelectorAll(".task");
        const newdivAllDescritptions = document.querySelectorAll(".post-description");
    
        newdivAllTasks.forEach((task, i) => {
            task.classList.remove("fade-out");
            if (sortcheck[i].check == true){
                task.classList.add("finish");
            } else if (sortcheck[i].check == false) {
                task.classList.add("fade-in");
            }
        });
    
        newdivAllDescritptions.forEach((description) => {
            description.classList.remove("fade-out");
            description.classList.add("fade-in");
        });
    }, 500);
};

/** fonction de tri décroissant par ID croissant*/
export function sortbyIDincreasing(){
    const Alltasks = getAllTasks();
    console.log("task are", Alltasks);

    if (Alltasks == null) return null;

    // Je recupere les taches checked
    const trueCheck = Alltasks.filter((task)=>{
        return task.check == true;
    });
    console.log("trueCheck", trueCheck);
    
    // je les tri en croissant
    const trueCheckSorted = trueCheck.sort((a, b)=>{
        return a.ID - b.ID;
    });
    console.log("trueChecksorted", trueCheckSorted);

    // je recupere les taches non checked
    const falseCheck = Alltasks.filter((task)=>{
        return task.check == false;
    });
    console.log("falseCheck", falseCheck);

    // je les tri en croissant
    const falseCheckSorted = falseCheck.sort((a, b)=>{
        return a.ID - b.ID;
    });
    console.log("falseChecksorted", falseCheckSorted);

    // Destructuring je met tout dans un tableau, les non checked en 1er
    const sortcheck = [...falseCheckSorted, ...trueCheckSorted];
    console.log("sortcheck", sortcheck);
    
    // Rendre les tâches invisibles avant le tri
    const divAllTasks = document.querySelectorAll(".task");
    const divAllDescritptions = document.querySelectorAll(".post-description");

    divAllTasks.forEach((task) => {
        task.classList.remove("fade-in");
        task.classList.add("fade-out");
    });

    divAllDescritptions.forEach((description) => {
        description.classList.remove("fade-in");
        description.classList.add("fade-out");
    });
    
    // Utiliser setTimeout pour attendre la fin de la transition avant de mettre à jour l'affichage
    setTimeout(() => {
        RemoveTaskHTML ();
        sortcheck.forEach((task) => {
            cloneTask(task);
        });

        // Rendre les tâches visibles après le tri
        const newdivAllTasks = document.querySelectorAll(".task");
        const newdivAllDescritptions = document.querySelectorAll(".post-description");
    
        newdivAllTasks.forEach((task, i) => {
            task.classList.remove("fade-out");
            if (sortcheck[i].check == true){
                task.classList.add("finish");
            } else if (sortcheck[i].check == false) {
                task.classList.add("fade-in");
            }
        });
    
        newdivAllDescritptions.forEach((description) => {
            description.classList.remove("fade-out");
            description.classList.add("fade-in");
        });
    }, 500);
};

/** fonction de tri décroissant par titre croissant*/
export function sortbyTitleIncreasing(){
    const Alltasks = getAllTasks();
    console.log("task are", Alltasks);

    if (Alltasks == null) return null;

    // Je recupere les taches checked
    const trueCheck = Alltasks.filter((task)=>{
        return task.check == true;
    });
    console.log("trueCheck", trueCheck);

    // je les trie en croissant
    const trueCheckSorted = trueCheck.sort((a, b)=>{
        // return a.title - b.title;
        const TitleA = a.title.toUpperCase(); // ignore upper and lowercase
        const TitleB = b.title.toUpperCase(); // ignore upper and lowercase
        console.log("a title ", a.title);
        if (TitleA < TitleB) {
            return -1;
        } else if (TitleA > TitleB) {
            return 1;
        }
          return 0;
    });
    console.log("trueChecksorted", trueCheckSorted);

    // je recupere les taches non checked
    const falseCheck = Alltasks.filter((task)=>{
        return task.check == false;
    });
    console.log("falseCheck", falseCheck);

    // je les trie en croissant
    const falseCheckSorted = falseCheck.sort((a, b)=>{
        // return a.title - b.title;
        const TitleA = a.title.toUpperCase(); // ignore upper and lowercase
        const TitleB = b.title.toUpperCase(); // ignore upper and lowercase
        console.log("a title ", a.title);
        if (TitleA < TitleB) {
            return -1;
        } else if (TitleA > TitleB) {
            return 1;
        }
          return 0;
    });
    console.log("falseChecksorted", falseCheckSorted);

    // Destructuring je met tout dans un tableau, les non checked en 1er
    const sortcheck = [...falseCheckSorted, ...trueCheckSorted];
    console.log("sortcheck", sortcheck);
    
    // Rendre les tâches invisibles avant le tri
    const divAllTasks = document.querySelectorAll(".task");
    const divAllDescritptions = document.querySelectorAll(".post-description");

    divAllTasks.forEach((task) => {
        task.classList.remove("fade-in");
        task.classList.add("fade-out");
    });

    divAllDescritptions.forEach((description) => {
        description.classList.remove("fade-in");
        description.classList.add("fade-out");
    });
    
    // Utiliser setTimeout pour attendre la fin de la transition avant de mettre à jour l'affichage
    setTimeout(() => {
        RemoveTaskHTML ();
        sortcheck.forEach((task) => {
            cloneTask(task);
        });

        // Rendre les tâches visibles après le tri
        const newdivAllTasks = document.querySelectorAll(".task");
        const newdivAllDescritptions = document.querySelectorAll(".post-description");
    
        newdivAllTasks.forEach((task, i) => {
            task.classList.remove("fade-out");
            if (sortcheck[i].check == true){
                task.classList.add("finish");
            } else if (sortcheck[i].check == false) {
                task.classList.add("fade-in");
            }
        });
    
        newdivAllDescritptions.forEach((description) => {
            description.classList.remove("fade-out");
            description.classList.add("fade-in");
        });
    }, 500);
};
