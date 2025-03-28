
/** fonction setter, creation ou ajout de tache dans le localstorage */
export function createTask(ID, title, description, date, check) {

    let task = {
        ID,
        title,
        description,
        date,
        check
    };

    let tasks = JSON.parse(localStorage.getItem("tasks") ?? "[]");
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));

    return task;
};

/**
 * fonction getter, lit le localstorage pour en exploiter les données 
 * @returns {Array|null}
 */
export function getAllTasks() {
    const rawTasks = localStorage.getItem("tasks");
    if (rawTasks == null) return null;
    // if(rawTasks == null) throw new Error("Tasks raw data inside localstorage are corrupted !!!");

    const tasks = JSON.parse(rawTasks);
    // console.log(tasks);

    return tasks;
};



