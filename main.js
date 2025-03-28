import {getAllTasks} from "./database.js";
import {OnClickaddTask, onClickTrash, onClickTrashNoTask, printAllTasks, onSubmit, searchTagSubmit, returnToHome, SortbyTruecheck, sortbyIDdecreasing, sortbyIDincreasing, sortbyTitleIncreasing} from "./component.js"

/**
 * Entry point
 */
function main() {
    const form = document.querySelector(".writeTask");
    const addTask = document.querySelector(".addTask");
    const closeWriteTask = document.querySelector(".writeTask i");
    const trash = document.querySelector(".deleteAllTask i");
    const BTNnon = document.querySelector(".non");
    const BTNclose = document.querySelector(".close");
    const loupe = document.querySelector(".searchbar");
    const BTNSortID91 = document.querySelector("#sort91");
    const BTNSortID19 = document.querySelector("#sort19");
    const BTNSortTitleAZ = document.querySelector("#sortAZ");

    // Boutton pour ajouter les taches 
    addTask.addEventListener("click", OnClickaddTask);
    closeWriteTask.addEventListener("click", OnClickaddTask);

    // Boutton non pour ne pas supprimer les taches 
    BTNnon.addEventListener("click", onClickTrash);

    // Boutton pour fermer la fenetre pas de taches a supprimer
    BTNclose.addEventListener("click", onClickTrashNoTask);

    printAllTasks();

    // Vider la corbeille
    // Ecouteur d'event sur la corbeille qui permet de supprimer TOUTES les taches
    trash.addEventListener("click", () => {
        // try {
        //     let Alltask = getAllTasks();
        
        // } catch (error) {
            
        // }
        let Alltask = getAllTasks();
        if (Alltask == null) {
            onClickTrashNoTask();
        } else if (Alltask = ! null) {
            onClickTrash();
        } else {
            console.log("BUG");
        };
    });

    // Appel de la fonction pour Creation d'une tache dans le local storage
    form.addEventListener("submit", onSubmit);

    // Searchbar
    loupe.addEventListener("submit", searchTagSubmit);

    // Bouton retour a l'acceuil
    returnToHome();

    // Tri automatique selon la tache est checké ou non 
    SortbyTruecheck();

    // Tri ordre decroissant par ID 
    BTNSortID91.addEventListener("click", sortbyIDdecreasing);
    
    // Tri ordre croissant par ID 
    BTNSortID19.addEventListener("click", sortbyIDincreasing);

    // Tri ordre croissant par Titre
    BTNSortTitleAZ.addEventListener("click", sortbyTitleIncreasing);
}

main();