const input = document.querySelector('.toDoInput');
const pText = document.querySelector('section.todoTask p');
const btnAdd = document.querySelector('.addBtn');
const ul = document.querySelector('.todoTask ul');
let li;
let liList;
// popup
const popup = document.querySelector('.popUp');
const popupInfo = document.querySelector('p.info');
const popupInput = document.querySelector('.editPopup');
const popupAccept = document.querySelector('.popupAccept');
const popupCancel = document.querySelector('.popupCancel');
let editToDoTask;

let idNumber = 0;

const createToolsArea = () => {
    const div = document.createElement('div');
    div.classList.add('toolsTask');
    div.innerHTML = `<button class="complete"><i class="fas fa-check"></i></button>
    <button class="edit">EDIT</button>
    <button class="remove"><i class="fas fa-trash-alt"></i></button>`;
    li.appendChild(div);
}
const addNewTask = (e) => {
    e.preventDefault();
    if (input.value.length && input.value !== " ") {
        idNumber++;
        li = document.createElement("li");
        li.textContent = input.value;
        li.setAttribute('id', `new-${idNumber}`);
        ul.appendChild(li);
        input.value = "";
        pText.textContent = '';
        createToolsArea();
    } else {
        pText.textContent = `Enter the task text!`;
    }

}

const checkClick = (e) => {
    if (e.target.closest('button').className === "complete") {
        console.log(e.target)
        e.target.closest('li').classList.toggle('done');
    } else if (e.target.closest('button').className === "edit") {
        editTask(e);
    } else if (e.target.closest('button').className === "remove") {
        deleteTask(e);
    }
}

const deleteTask = (e) => {
    const deleteTodoTask = e.target.closest('li');
    deleteTodoTask.remove();
    console.log(li.length);
    liList = ul.getElementsByTagName("li");
    if (liList.length === 0) {
        pText.textContent = `There are no tasks in the list...`;
    }
}

const editTask = (e) => {
    const oldTodo = e.target.closest('li').id;
    editToDoTask = document.getElementById(oldTodo);
    popupInput.value = editToDoTask.firstChild.textContent;
    popup.style.display = "block";
}

const changeTodo = () => {
    if (popupInput.value !== "") {
        editToDoTask.firstChild.textContent = popupInput.value;
        popup.style.display = "none";
    } else {
        popupInfo.textContent = "Enter the content of the task!"
        popupInfo.style.color = "red";
        popupInfo.style.fontSize = "1.7rem";
        setTimeout(function () {
            popupInfo.textContent = "";
        }, 3000);
    }
}

const closePopup = () => {
    popup.style.display = "none";
}

popupAccept.addEventListener('click', changeTodo)
popupCancel.addEventListener('click', closePopup);
ul.addEventListener('click', checkClick);
btnAdd.addEventListener('click', addNewTask);