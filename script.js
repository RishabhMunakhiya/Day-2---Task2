const inputBox = document.getElementById('input-box');
const listContainer = document.getElementById('list-container');

// Add task when Enter key is pressed
inputBox.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        addTask();
    }
});

function addTask() {
    const taskText = inputBox.value.trim();

    if (taskText === '') {
        alert("You must write something");
        return;
    }

    const li = document.createElement("li");
    const textNode = document.createTextNode(taskText);
    li.appendChild(textNode);

    const span = document.createElement("span");
    span.textContent = "×";
    span.classList.add("delete-button"); // optional styling
    li.appendChild(span);

    listContainer.appendChild(li);
    inputBox.value = "";
    saveData();
}

// Handle check and delete
listContainer.addEventListener("click", function(e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData();
    } else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        saveData();
    }
});

function saveData() {
    const tasks = [];
    listContainer.querySelectorAll("li").forEach(li => {
        tasks.push({
            text: li.firstChild.textContent,
            checked: li.classList.contains("checked")
        });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function showTask() {
    const data = localStorage.getItem("tasks");
    if (!data) return;

    const tasks = JSON.parse(data);
    tasks.forEach(task => {
        const li = document.createElement("li");
        const textNode = document.createTextNode(task.text);
        li.appendChild(textNode);

        if (task.checked) {
            li.classList.add("checked");
        }

        const span = document.createElement("span");
        span.textContent = "×";
        span.classList.add("delete-button");
        li.appendChild(span);

        listContainer.appendChild(li);
    });
}

showTask();
