var todoData = []

todoData.push({
  id: 1,
  text: "Attend that byld session",
  done: false
})

todoData.push({
  id: 2,
  text: "Prepare that presentation for byld session",
  done: true
})

// assign a new id to every todo without recycling
todoDataIdCounter = 2

var markAsDone = function (event) {
  let id = event.target.getAttribute("todo-id")
  //mark as done
  let found = todoData.find((x) => x.id === parseInt(id))
  found.done = true
  refreshUI()
}

var showEditBox = function (event) {
  let id = event.target.getAttribute("todo-id")
  
  let editBox = document.getElementById("todo-edit-box")
  editBox.style.visibility = "visible"
  
  let button = editBox.getElementsByTagName("button")[0]
  
  let inputBox = editBox.getElementsByTagName("input")[0]
  
  inputBox.value = todoData.find((x) => x.id === parseInt(id)).text
  
  var handler = function () {
    editTodo(id, inputBox.value)
    inputBox.value = ""
    editBox.style.visibility = "hidden"
    button.removeEventListener("click", handler)
  }
  
  button.addEventListener("click", handler)
}

var createTodoListElement = function (data) {
  let todo = document.createElement("li")
  
  let doneButton = document.createElement("button")
  doneButton.innerHTML = "done"
  doneButton.setAttribute("todo-id", data.id) 
  doneButton.addEventListener("click", markAsDone)
  
  let editButton = document.createElement("button")
  editButton.innerHTML = "edit"
  editButton.setAttribute("todo-id", data.id)
  editButton.addEventListener("click", showEditBox)
  
  todo.appendChild(document.createTextNode(data.text))
  todo.appendChild(doneButton)
  todo.appendChild(editButton)
  
  return todo
}

var removeTodo = function (event) {
  let id = event.target.getAttribute("todo-id")
  let found = todoData.find((x) => x.id === parseInt(id))
  todoData.splice(todoData.indexOf(found), 1)
  refreshUI()
}

var createDoneListElement = function (data) {
  let todo = document.createElement("li")
  let deleteButton = document.createElement("button")
  deleteButton.innerHTML = "delete"
  deleteButton.setAttribute("todo-id", data.id)
  deleteButton.addEventListener("click", removeTodo)
  
  todo.appendChild(document.createTextNode(data.text))
  todo.appendChild(deleteButton)
  
  return todo
}

var refreshUI = function () {
  let todoList = todoData.filter((x) => x.done === false)
  let doneList = todoData.filter((x) => x.done === true)
  
  let todoContainer = document.getElementById("todo-list")
  todoContainer.innerHTML = ""
  
  let todoUL = document.createElement("ul")
  
  todoContainer.appendChild(todoUL)
  for (let i = 0; i < todoList.length; i++) {
    todoUL.appendChild(createTodoListElement(todoList[i]))
  }
  
  let doneContainer = document.getElementById("done-list")
  doneContainer.innerHTML = ""

  let doneUL = document.createElement("ul")
  
  doneContainer.appendChild(doneUL)
  for (let i = 0; i < doneList.length; i++) {
    doneUL.appendChild(createDoneListElement(doneList[i]))
  }
}

var editTodo = function (id, text) {
  var found = todoData.find((todo) => todo.id == id)
  
  found.text = text
  
  refreshUI()
}

var addTodo = function () {
  let input = document.getElementById("new-item-input-field")
  
  // Reject empty todo messages
  if (input.value === "") {
    return
  }
  
  todoDataIdCounter++
  
  todoData.push({
    id: todoDataIdCounter,
    text: input.value,
    done: false
  })
  
  // Reset the input value and make it empty
  input.value = ""
  
  refreshUI()
}

// when things on DOM are ready
document.addEventListener("DOMContentLoaded", function () {
  let newItemAddButton = document.getElementById("new-item-add-button")
  newItemAddButton.addEventListener("click", addTodo)
  
  refreshUI()
})

