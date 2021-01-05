const form = document.querySelector("form");
const input = document.querySelector(".toDoInput");
const pText = document.querySelector("section.todoTask p");
const btnAdd = document.querySelector(".addBtn");
const ul = document.querySelector(".todoTask ul");
let li;

// popup
const popup = document.querySelector(".popUp");
const popupInfo = document.querySelector("p.info");
const popupInput = document.querySelector(".editPopup");
const popupAccept = document.querySelector(".popupAccept");
const popupCancel = document.querySelector(".popupCancel");
const findTask = document.querySelector("#findTask");

let table = [];
let liChange;

const search = (e) => {
  const valueTarget = e.target.value.toLowerCase();
  const find = table.filter((task) =>
    task.textContent.toLowerCase().includes(valueTarget)
  );
  ul.textContent = "";
  find.forEach((li) => ul.appendChild(li));
};

const createToolsArea = () => {
  const div = document.createElement("div");
  div.classList.add("toolsTask");
  div.innerHTML = `<button class="complete"><i class="fas fa-check"></i></button>
    <button class="edit">EDIT</button>
    <button class="remove"><i class="fas fa-trash-alt"></i></button>`;
  li.appendChild(div);
};
const render = () => {
  ul.textContent = "";
  table.forEach((li, id) => {
    li.setAttribute("id", `new-${id}`);
    ul.appendChild(li);
  });
};
const changeTask = (e) => {
  popup.style.display = "block";
  const value = e.target.closest("li").id;
  liChange = document.querySelector(`#${value}`);
  popupInput.value = liChange.firstChild.textContent.trim();
};

const removeTask = (e) => {
  const index = e.target.closest("li").id;
  console.log(index);
  table.splice(index, 1);
  render();
  liList = ul.getElementsByTagName("li");
  if (liList.length === 0) {
    pText.textContent = `There are no tasks in the list...`;
  }
};

const handleClick = (e) => {
  if (e.target.closest("button").className === "complete") {
    console.log(e.target.closest("button"));
    console.log(e.target);
    e.target.closest("li").classList.toggle("done");
  } else if (e.target.closest("button").className === "edit") {
    changeTask(e);
  } else if (e.target.closest("button").className === "remove") {
    removeTask(e);
  }
};

const addTask = (e) => {
  e.preventDefault();
  if (input.value.length && input.value !== " ") {
    li = document.createElement("li");
    li.textContent = input.value;
    createToolsArea();
    table.push(li);
    render();
    pText.textContent = "";
    input.value = "";
  } else if (input.value === "" || input.value === " ")
    return alert(`Add Task`);
  else {
    pText.textContent = `There are no tasks in the list...`;
  }
};

const acceptChangeTask = () => {
  if (popupInput.value !== "") {
    liChange.firstChild.textContent = popupInput.value;
    popup.style.display = "none";
  } else {
    popupInfo.textContent = "Enter the content of the task!";
    popupInfo.style.color = "red";
    popupInfo.style.fontSize = "1.7rem";
    setTimeout(function () {
      popupInfo.textContent = "";
    }, 3000);
  }
};

const closePopup = () => {
  popup.style.display = "none";
};
findTask.addEventListener("input", search);
popupCancel.addEventListener("click", closePopup);
ul.addEventListener("click", handleClick);
form.addEventListener("submit", addTask);
popupAccept.addEventListener("click", acceptChangeTask);
