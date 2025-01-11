const createTodoBtn = document.getElementById('create-Todo-Btn');
const completeStatus = document.querySelectorAll('#complete-status');
let TodoItem = document.querySelector('Todo-item');
const todoBox = document.querySelector('.Todo-box');
let TodoText = document.getElementById("TodoText");
const navLinks = document.querySelectorAll('.nav-link');
let action = 'All';




createTodoBtn.addEventListener('click', handleCreateTodo);

const Todos = JSON.parse(localStorage.getItem('Todos') || "[]");

let isUpdated = false, updateId;

/*function toggleActive(){
    navLinks.forEach((link, index) => {
        navLinks[0].classList.add('active');
        link.addEventListener('click', () => {
            navLinks.forEach(nav => nav.classList.remove('active'));
            
            link.classList.add('active');

            if (index === navLinks.length - 1) {
                navLinks[0].classList.remove('active');
                navLinks[1].classList.remove('active');
            } else if (index === 2) {
                navLinks[0].classList.remove('active');
            }
        });
    });
}

toggleActive();*/

function TodosFiltering(){
    navLinks.forEach((link, index) => {
        navLinks[0].classList.add('active');
        link.addEventListener('click', () => {
            navLinks.forEach(nav => nav.classList.remove('active'));
            
            link.classList.add('active');
            action = link.dataset.name;
     
            

            if (index === navLinks.length - 1) {
                navLinks[0].classList.remove('active');
                navLinks[1].classList.remove('active');
            } else if (index === 2) {
                navLinks[0].classList.remove('active');
            }

            showTodos(action);
        });
    });
}

TodosFiltering();

function handleCreateTodo(){  
    if (TodoText.value.trim() === "") {
        alert("Your task can't be empty!");
        return;
    }

    createTodo(TodoText.value);
    showTodos(action);
    clearTodoValue();
}

function createTodo(){
        let todoVal = TodoText.value;
        let TodoInfo = {
           title : todoVal,
           status:'Pending'
        }

        if(!isUpdated){
            Todos.push(TodoInfo);
         }else{
            isUpdated = false;
            Todos[updateId] = TodoInfo;
         }
       

       localStorage.setItem("Todos", JSON.stringify(Todos)); 

}

function showTodos(filterAction){
    
    todoBox.innerHTML = "";
   
    const filteredTodos = filterAction === 'All' ? Todos : Todos.filter(todo => todo.status === filterAction);

    
    filteredTodos.forEach((todoElt) => {
        let actualIndex = Todos.indexOf(todoElt); // Récupérer l'index réel dans le tableau principal
        let html = `
            <div class="Todo-list">
                <input type="checkbox" class="complete-status" data-index="${actualIndex}" ${todoElt.status === 'Completed' ? 'checked' : ''}>
                <li class="Todo-item ${todoElt.status === 'Completed' ? 'on-complete' : ''}">${todoElt.title}</li>
                <i class="fa-solid fa-pen-to-square update-btn icon" data-index="${actualIndex}" onclick=updateTodo(${actualIndex},'${todoElt.title}')></i>
                <i class="fa fa-close trash-btn icon" data-index="${actualIndex}" onclick=deleteTodo(${actualIndex})></i>
            </div>
            <div class="bar"></div>
        `;

        todoBox.insertAdjacentHTML('beforeend', html); 
    });

    document.querySelectorAll('.complete-status').forEach(checkbox => {
        checkbox.addEventListener('change', toggleCompleteStatus);
    });
    
}

function toggleCompleteStatus(e) {
    const index = e.target.dataset.index; 
    const todoItem = e.target.nextElementSibling; 

    if (e.target.checked) {
        Todos[index].status = 'Completed';
        todoItem.classList.add('on-complete');
    } else {
        Todos[index].status = 'Pending';
        todoItem.classList.remove('on-complete');
    }

    localStorage.setItem("Todos", JSON.stringify(Todos));
}



function clearTodoValue(){
    TodoText.value = '';
}

function updateTodo(todoId, todoText){
    isUpdated = true;
    updateId = todoId;
    TodoText.value = todoText;
}

function deleteTodo(deleteId){
    Todos.splice(deleteId, 1);
    localStorage.setItem("Todos", JSON.stringify(Todos)); 
    showTodos(action);
}



showTodos(action);



