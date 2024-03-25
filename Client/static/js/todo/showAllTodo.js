// todo.js

const displayDailyTodos = (dailyList) => {
    const dailytodoList = document.querySelector('#daily-todo-list');
    // 목록을 초기화합니다.
    dailytodoList.innerHTML = "";

    if (dailyList.length > 0) {
        // 일상 할 일 목록이 비어 있지 않은 경우
        dailyList.forEach(todo => {
            const item = document.createElement('div');
            const checkbox = document.createElement('input');
            const text = document.createElement('span');
            const button = document.createElement('button');

            item.id = 'showDailyList'
            button.id = 'showDailyDel'
            item.setAttribute('data-key', todo.todolist_id);
            item.appendChild(checkbox);
            item.appendChild(text);
            item.appendChild(button);
            dailytodoList.appendChild(item);

            checkbox.type = 'checkbox';
            checkbox.addEventListener('change', (event) => {
                item.style.textDecoration = event.target.checked ? 'line-through' : '';
            });

            text.textContent = todo.todolist_content;

            button.textContent = '지우기';
            button.addEventListener('click', () => {
                removeDailyTodo(todo.todolist_id);
            });
        });
    } else {
        // 게시물이 없을 경우
        console.log("게시물이 없습니다.");
    }
};

const removeDailyTodo = (key) => {
    const item = document.querySelector(`#daily-todo-list [data-key="${key}"]`);
    item.parentNode.removeChild(item);
};

const displayStudyTodos = (studyList) => {
    const studytodoList = document.querySelector('#study-todo-list');
    // 목록을 초기화합니다.
    studytodoList.innerHTML = "";

    if (studyList.length > 0) {
        // 일상 할 일 목록이 비어 있지 않은 경우
        studyList.forEach(todo => {
            const item = document.createElement('div');
            const checkbox = document.createElement('input');
            const text = document.createElement('span');
            const button = document.createElement('button');

            item.id = 'showStudyList'
            button.id = 'showStudyDel'
            item.setAttribute('data-key', todo.todolist_id);
            item.appendChild(checkbox);
            item.appendChild(text);
            item.appendChild(button);
            studytodoList.appendChild(item);

            checkbox.type = 'checkbox';
            checkbox.addEventListener('change', (event) => {
                item.style.textDecoration = event.target.checked ? 'line-through' : '';
            });

            text.textContent = todo.todolist_content;

            button.textContent = '지우기';
            button.addEventListener('click', () => {
                removeStudyTodo(todo.todolist_id);
            });
        });
    } else {
        // 게시물이 없을 경우
        console.log("게시물이 없습니다.");
    }
};

const removeStudyTodo = (key) => {
    const item = document.querySelector(`#study-todo-list [data-key="${key}"]`);
    item.parentNode.removeChild(item);

    const delete_Data = {
        cmd: "delete_todo",
        content: item.outerHTML
    };

    socket.send(JSON.stringify(delete_Data));
};

const displayEtcTodos = (etcList) => {
    const etctodoList = document.querySelector('#etc-todo-list');
    // 목록을 초기화합니다.
    etctodoList.innerHTML = "";

    if (etcList.length > 0) {
        // 일상 할 일 목록이 비어 있지 않은 경우
        etcList.forEach(todo => {
            const item = document.createElement('div');
            const checkbox = document.createElement('input');
            const text = document.createElement('span');
            const button = document.createElement('button');

            item.id = 'showEtcList'
            button.id = 'showEtcDel'
            item.setAttribute('data-key', todo.todolist_id);
            item.appendChild(checkbox);
            item.appendChild(text);
            item.appendChild(button);
            etctodoList.appendChild(item);

            checkbox.type = 'checkbox';
            checkbox.addEventListener('change', (event) => {
                item.style.textDecoration = event.target.checked ? 'line-through' : '';
            });

            text.textContent = todo.todolist_content;

            button.textContent = '지우기';
            button.addEventListener('click', () => {
                removeEtcTodo(todo.todolist_id);
            });
        });
    } else {
        // 게시물이 없을 경우
        console.log("게시물이 없습니다.");
    }
};

const removeEtcTodo = (key) => {
    const item = document.querySelector(`#etc-todo-list [data-key="${key}"]`);
    item.parentNode.removeChild(item);
};

// Socket 설정
socket.onopen = () => {
    const sendShowDailyCommand = () => {
        const data = {
            cmd: "show_daily"
        };
        socket.send(JSON.stringify(data));
    };

    const sendShowStudyCommand = () => {
        const data = {
            cmd: "show_study"
        };
        socket.send(JSON.stringify(data));
    };

    const sendShowEtcCommand = () => {
        const data = {
            cmd: "show_etc"
        };
        socket.send(JSON.stringify(data));
    };

    socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data.cmd === "show_daily") {
            displayDailyTodos(data.posts);
        } else if (data.cmd === "show_study") {
            displayStudyTodos(data.posts);
        } else if (data.cmd === "show_etc") {
            displayEtcTodos(data.posts);
        }
    };

    sendShowDailyCommand();
    sendShowStudyCommand();
    sendShowEtcCommand();
};

socket.onerror = (error) => {
    console.error('WebSocket 오류 발생:', error);
};
