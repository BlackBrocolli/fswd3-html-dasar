// TODO LIST WITH FETCH API

const baseURL = `https://crudcrud.com/api/`;
const apiKey = "28845251e290422790c2555804539c4e";
const url = baseURL + apiKey;
const endpointTodo = `${url}/todo`;
const endpointNama = `${url}/nama`;

let todos;

// == GET ==
const getLists = () => {
    fetch(endpointTodo)
    .then(result => result.json())
    .then(data => {
        todos = [];
        todos.push(...data);
        displayTodos();
    })
    .catch((error) => console.log(error));
}

window.addEventListener('load', () => {
    
    getLists();

    const newTodoForm = document.querySelector('#new-todo-form');

    newTodoForm.addEventListener('submit', e => {
        // preventDefault disini mencegah perilaku default dari form
        // yaitu reload halaman web ketika datanya dikirim
        // sehingga halaman web tidak akan memuat ulang saat form dikirimkan.
        e.preventDefault(); 

        // object todo yang akan disimpan
        const todo = {
            content: e.target.elements.content.value, // mengambil value dari elemen target dengan nama 'content'
            category: e.target.elements.category.value,
            done: false,
            // createdAt: new Date().getTime()
        };

        // == POST ==
        fetch(endpointTodo, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(todo)
        })
        .then(result => result.json())
        .then(data => {
            getLists();
        })
        .catch(error => console.error(error));

        // setelah semua proses selesai
        // reset form (field-field di dalamnya)
        e.target.reset();
    });
});

function displayTodos() {

    const todoList = document.querySelector('#todo-list');

    // pertama, bersihkan dulu semua isi dari elemen todoList
    todoList.innerHTML = "";

    // untuk setiap item pada array todos
    // create element-element berikut
    todos.forEach(todo => {

        // cara menambahkan element lewat JS
        // 1. create element
        // 2. sesuaikan atribut (class, type, checked, dll)
        // 3. appendChild

        const todoItem = document.createElement("div");
        todoItem.classList.add("todo-item");

        const label = document.createElement("label");
        const input = document.createElement("input");
        const span = document.createElement("span");
        const content = document.createElement("div");
        const actions = document.createElement("div");
        const editButton =  document.createElement("button");
        const deleteButton =  document.createElement("button");

        input.type = "checkbox";
        input.checked = todo.done; // true or false
        span.classList.add("bubble");
        span.classList.add("checkbox");

        if (todo.category == "personal") {
            span.classList.add('personal');
        } else {
            span.classList.add('business');
        }

        content.classList.add("todo-content");
        actions.classList.add('actions');
        editButton.classList.add('edit');
        deleteButton.classList.add('delete');

        content.innerHTML =  `<input type="text" value="${todo.content}" readonly />`;
        editButton.innerHTML = "Edit";
        deleteButton.innerHTML = "Delete";

        label.appendChild(input);
        label.appendChild(span);
        actions.appendChild(editButton);
        actions.appendChild(deleteButton);
        todoItem.appendChild(label);
        todoItem.appendChild(content);
        todoItem.appendChild(actions);

        todoList.appendChild(todoItem);

        if (todo.done) {
            todoItem.classList.add("done");
        }

        // berikan eventListener kepada checkbox
        // jika checkbox diklik
        input.addEventListener('click', e => {

            // == PUT ==
            const data = {
                content: todo.content,
                category: todo.category,
                done: e.target.checked,
            };

            fetch(`${endpointTodo}/${todo._id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
            .then(result => {
                getLists();
            })
            .catch((error) => console.log(error));

            todoItem.classList.toggle('done');
        });

        editButton.addEventListener('click', e => {
            const input = content.querySelector('input'); // input di dalam div content
            input.removeAttribute('readonly'); // hilankan readonly sehingga input bisa diedit
            input.focus(); // highlight inputnya

            // eventListener blur(kehilangan fokus) pada inputField
            input.addEventListener('blur', e => {
                input.setAttribute('readonly', true);
                /* todo.content = e.target.value; // set atribut content dengan value hasil edit tadi
                localStorage.setItem('todos', JSON.stringify(todos)); // simpan perubahan
                displayTodos(); */

                // == PUT ==

                const data = {
                    content: e.target.value,
                    category: todo.category,
                    done: todo.done,
                };

                fetch(`${endpointTodo}/${todo._id}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(data)
                })
                .then(result => getLists())
                .catch((error) => console.log(error));
            });
        });

        deleteButton.addEventListener('click', e => {
            
            // == DELETE ==
            fetch(`${endpointTodo}/${todo._id}`, {
                method: "DELETE"
            })
            .then(data => {
                // filter array todos, isi array baru dengan elemen yang != elemen yg diklik
                // sehingga menghilangkan elemen 'todo' yang diklik sekarang dari array
                todos = todos.filter(t => t != todo);
                displayTodos();
            })
            .catch((error) => console.log(error));
        });
    });
}