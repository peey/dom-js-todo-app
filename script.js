var todoData = []

todoData.push({
  text: "Attend that byld session",
  done: false
})

var addTodo = function () {
  let input = document.getElementById("new-item-input-field")
  
  todoData.push({
    text: input.value,
    done: false
  })
  
  refreshUI()
}

var refreshUI = function () {
  let todoList = todoData.filter((x) => x.done === false)
  let doneList = todoData.filter((x) => x.done === true)
  
  let todoContainer = document.getElementById("todo-list")
  todoContainer.innerHTML = ""
  for (let i = 0; i < todoList.length; i++) {
    todoContainer.innerHTML += todoList[i].text + "<br>"
  }
  
  let doneContainer = document.getElementById("done-list")
  doneContainer.innerHTML = ""
  for (let i = 0; i < doneList.length; i++) {
    todoContainer.innerHTML += doneList[i].text + "<br>"
  }
}

refreshUI()