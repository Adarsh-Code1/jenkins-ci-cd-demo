const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const taskCount = document.getElementById("taskCount");
const completedCount = document.getElementById("completedCount");

async function loadTasks() {
    const response = await fetch("/api/tasks");
    const tasks = await response.json();
    renderTasks(tasks);
}

function renderTasks(tasks) {
    taskList.innerHTML = "";

    const completed = tasks.filter(task => task.completed).length;
    taskCount.textContent = `${tasks.length} tasks`;
    completedCount.textContent = `${completed} completed`;

    if (tasks.length === 0) {
        taskList.innerHTML =
            '<p class="empty-state">No tasks yet. Add your first task!</p>';
        return;
    }

    tasks.forEach(task => {
        const item = document.createElement("div");
        item.className = `task-item ${task.completed ? "completed" : ""}`;

        const title = document.createElement("span");
        title.className = "task-title";
        title.textContent = task.title;

        const completeButton = document.createElement("button");
        completeButton.className = "complete-btn";
        completeButton.textContent = task.completed ? "Undo" : "Complete";
        completeButton.addEventListener("click", () => toggleTask(task.id));

        const deleteButton = document.createElement("button");
        deleteButton.className = "delete-btn";
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", () => deleteTask(task.id));

        item.append(title, completeButton, deleteButton);
        taskList.appendChild(item);
    });
}

async function addTask() {
    const title = taskInput.value.trim();

    if (!title) {
        taskInput.focus();
        return;
    }

    const response = await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title })
    });

    if (response.ok) {
        taskInput.value = "";
        loadTasks();
    }
}

async function toggleTask(id) {
    await fetch(`/api/tasks/${id}`, { method: "PUT" });
    loadTasks();
}

async function deleteTask(id) {
    await fetch(`/api/tasks/${id}`, { method: "DELETE" });
    loadTasks();
}

addTaskBtn.addEventListener("click", addTask);

taskInput.addEventListener("keydown", event => {
    if (event.key === "Enter") {
        addTask();
    }
});

loadTasks();