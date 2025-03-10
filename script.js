document.addEventListener("DOMContentLoaded", () => {
    const taskInput = document.getElementById("taskInput");
    const addTaskBtn = document.getElementById("addTaskBtn");
    const taskList = document.getElementById("taskList");

    // Lataa tehtävät LocalStoragesta
    loadTasks();

    addTaskBtn.addEventListener("click", () => {
        const taskText = taskInput.value.trim();
        if (taskText.length < 3) {
            alert("Tehtävän tulee olla vähintään 3 merkkiä pitkä.");
            return;
        }
        addTask(taskText);
        taskInput.value = "";
    });

    function addTask(taskText) {
        const taskItem = document.createElement("li");
        taskItem.textContent = taskText;
        
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
        saveTasks();
    }

    function saveTasks() {
        const tasks = [];
        document.querySelectorAll("#taskList li").forEach(taskItem => {
            tasks.push({ text: taskItem.textContent, completed: taskItem.classList.contains("completed") });
        });
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    function loadTasks() {
        const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
        savedTasks.forEach(task => {
            const taskItem = document.createElement("li");
            taskItem.textContent = task.text;
            if (task.completed) {
                taskItem.classList.add("completed");
            }
            taskList.appendChild(taskItem);
        });
    }
});
