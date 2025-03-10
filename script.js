document.addEventListener("DOMContentLoaded", () => {
    // Haetaan käyttöliittymän elementit
    const taskInput = document.getElementById("taskInput");
    const addTaskBtn = document.getElementById("addTaskBtn");
    const taskList = document.getElementById("taskList");

    // Ladataan tehtävät LocalStoragesta, jos niitä on tallennettu
    loadTasks();

    // Kun käyttäjä painaa "Lisää"-nappia, lisätään uusi tehtävä listaan
    addTaskBtn.addEventListener("click", () => {
        const taskText = taskInput.value.trim(); // Poistetaan turhat välilyönnit
        if (taskText.length < 3) { // Tarkistetaan, ettei tehtävä ole liian lyhyt
            alert("Tehtävän tulee olla vähintään 3 merkkiä pitkä.");
            return;
        }
        addTask(taskText); // Kutsutaan tehtävän lisäysfunktiota
        taskInput.value = ""; // Tyhjennetään syöttökenttä
    });

    // Funktio tehtävän lisäämiseen listaan
    function addTask(taskText) {
        const taskItem = document.createElement("li"); // Luodaan uusi listaelementti
        taskItem.textContent = taskText;
        
        // Napit tehtävän merkitsemiseen tehdyksi ja poistamiseen
        const completeBtn = document.createElement("button");
        completeBtn.textContent = "✔";
        completeBtn.addEventListener("click", () => {
            taskItem.classList.toggle("completed"); // Lisätään tai poistetaan tehty-luokka
            saveTasks(); // Päivitetään LocalStorage
        });

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "❌";
        deleteBtn.addEventListener("click", () => {
            taskItem.remove(); // Poistetaan tehtävä listasta
            saveTasks(); // Päivitetään LocalStorage
        });

        // Lisätään napit tehtävän viereen ja lisätään tehtävä listaan
        taskItem.appendChild(completeBtn);
        taskItem.appendChild(deleteBtn);
        taskList.appendChild(taskItem);
        saveTasks();
    }

    // Tallennetaan tehtävät LocalStorageen
    function saveTasks() {
        const tasks = [];
        document.querySelectorAll("#taskList li").forEach(taskItem => {
            tasks.push({ 
                text: taskItem.textContent.replace("✔❌", ""), // Poistetaan nappien merkit tekstistä
                completed: taskItem.classList.contains("completed") // Tarkistetaan, onko tehtävä valmis
            });
        });
        localStorage.setItem("tasks", JSON.stringify(tasks)); // Tallennetaan JSON-muodossa
    }

    // Ladataan tallennetut tehtävät LocalStoragesta
    function loadTasks() {
        const savedTasks = JSON.parse(localStorage.getItem("tasks")) || []; // Haetaan tallennetut tehtävät
        savedTasks.forEach(task => {
            const taskItem = document.createElement("li");
            taskItem.textContent = task.text;
            if (task.completed) {
                taskItem.classList.add("completed"); // Jos tehtävä oli merkitty tehdyksi, lisätään sille luokka
            }

            // Napit pitää lisätä uudelleen, jotta ne toimivat ladatuissa tehtävissä
            const completeBtn = document.createElement("button");
            completeBtn.textContent = "✔";
            completeBtn.addEventListener("click", () => {
                taskItem.classList.toggle("completed");
                saveTasks();
            });

            const deleteBtn = document.createElement("button");
            deleteBtn.textContent = "❌";
            deleteBtn.addEventListener("click", () => {
                taskItem.remove();
                saveTasks();
            });

            taskItem.appendChild(completeBtn);
            taskItem.appendChild(deleteBtn);
            taskList.appendChild(taskItem);
        });
    }
});
