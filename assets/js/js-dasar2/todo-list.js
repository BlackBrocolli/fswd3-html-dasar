window.addEventListener('load', () => {
    // tanpa menulis let atau const membuat variabel todos global
    todos = JSON.parse(localStorage.getItem('todos')) || []; // ambil item/todo listnya dengan key 'todos'

    const nameInput = document.querySelector('#name');
    const newTodoForm = document.querySelector('#new-todo-form');

    const username = localStorage.getItem('username') || ""; // ambil item dengan key 'username'
    nameInput.value = username;
    
    // jika ada perubahan pada inputan nama, simpan item ke localStorage
    nameInput.addEventListener('change', e => {
        localStorage.setItem('username', e.target.value);
    });

    newTodoForm.addEventListener('submit', e => {
        // preventDefault disini mencegah perilaku default dari form
        // yaitu reload halaman web ketika datanya dikirim
        // sehingga halaman web tidak akan memuat ulang saat form dikirimkan.
        e.preventDefault(); 

        // object todo yang akan disimpan ke localStorage
        const todo = {
            content: e.target.elements.content.value, // mengambil value dari elemen target dengan nama 'content'
            category: e.target.elements.category.value,
            done: false,
            createdAt: new Date().getTime()
        };

        // update isi todos array dengan cara
        // push object todo ke dalam array todos
        todos.push(todo);

        // lalu simpan array todos tadi ke dalam localStorage
        localStorage.setItem('todos', JSON.stringify(todos));
        /* 
        localStorage hanya memperbolehkan untuk menyimpan data primitive
        sehingga untuk menyimpan array/object, digunakanlah
        JSON.stringify untuk mengubah array/object tsb menjadi string
        */

        // setelah semua proses selesai
        // reset form (field-field di dalamnya)
        e.target.reset();

        displayTodos();
    });

    displayTodos();
});

function displayTodos() {
    const todoList = document.querySelector('#todo-list');

    // pertama, bersihkan dulu semua isi dari elemen todoList
    todoList.innerHTML = "";

    // untuk setiap item pada array todos
    // create element-element berikut
    todos.sort((a, b) => a.createdAt - b.createdAt).forEach(todo => {

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
            // update properti done lalu simpan
            todo.done = e.target.checked; // true or false
            // setiap kali terjadi perubahan, kita simpan ke localStorage
            localStorage.setItem('todos', JSON.stringify(todos));

            if (todo.done) {
                todoItem.classList.add('done');
            } else {
                todoItem.classList.remove('done');
            }

            displayTodos();
        });

        editButton.addEventListener('click', e => {
            const input = content.querySelector('input'); // input di dalam div content
            input.removeAttribute('readonly'); // hilankan readonly sehingga input bisa diedit
            input.focus(); // highlight inputnya

            // eventListener blur(kehilangan fokus) pada inputField
            input.addEventListener('blur', e => {
                input.setAttribute('readonly', true);
                todo.content = e.target.value; // set atribut content dengan value hasil edit tadi
                localStorage.setItem('todos', JSON.stringify(todos)); // simpan perubahan
                displayTodos();
            });
        });

        deleteButton.addEventListener('click', e => {
            // filter array todos, isi array baru dengan elemen yang != elemen yg diklik
            // sehingga menghilangkan elemen 'todo' yang diklik sekarang dari array
            todos = todos.filter(t => t != todo);
            localStorage.setItem('todos', JSON.stringify(todos));
            displayTodos();
        });
    });
}