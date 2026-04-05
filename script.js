let time = 1500;
let interval;

// Load tasks
window.onload = function () {
  loadTasks();
};

function startTimer() {
  clearInterval(interval);

  interval = setInterval(() => {
    if (time > 0) {
      time--;

      let m = Math.floor(time / 60);
      let s = time % 60;

      document.getElementById("timer").innerText =
        `${m}:${s < 10 ? '0' : ''}${s}`;
    } else {
      clearInterval(interval);
      notifyUser();
    }
  }, 1000);
}

function resetTimer() {
  clearInterval(interval);
  time = 1500;
  document.getElementById("timer").innerText = "25:00";
}

// 🔔 Notification + Sound
function notifyUser() {
  // Sound
  let audio = new Audio("https://www.soundjay.com/buttons/beep-07.wav");
  audio.play();

  // Notification
  if (Notification.permission === "granted") {
    new Notification("Time's up! Take a break 😄");
  } else {
    Notification.requestPermission();
  }
}

// Add Task
function addTask() {
  let input = document.getElementById("taskInput");

  if (input.value.trim() === "") return;

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  tasks.push({ text: input.value, done: false });

  localStorage.setItem("tasks", JSON.stringify(tasks));

  input.value = "";
  loadTasks();
}

// Load Tasks
function loadTasks() {
  let taskList = document.getElementById("taskList");
  taskList.innerHTML = "";

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  tasks.forEach((task, index) => {
    let li = document.createElement("li");

    // Checkbox
    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.done;

    checkbox.onchange = function () {
      tasks[index].done = checkbox.checked;
      localStorage.setItem("tasks", JSON.stringify(tasks));
      loadTasks();
    };

    // Text
    let span = document.createElement("span");
    span.innerText = task.text;

    if (task.done) {
      span.classList.add("completed");
    }

    // Delete button
    let btn = document.createElement("button");
    btn.innerText = "❌";
    btn.onclick = function () {
      tasks.splice(index, 1);
      localStorage.setItem("tasks", JSON.stringify(tasks));
      loadTasks();
    };

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(btn);

    taskList.appendChild(li);
  });
}