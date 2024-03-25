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



const sendShowDailyCommand = function(){
    const packet = {
        cmd: "show_daily"
    }
    const jsonStr = JSON.stringify(packet);
    sendMessage(jsonStr);
};
    


const sendShowStudyCommand = function(){
const packet = {
    cmd: "show_study"
}
const jsonStr = JSON.stringify(packet);
sendMessage(jsonStr);
};

const sendShowEtcCommand = function(){
    const packet = {
        cmd: "show_etc"
    }
    const jsonStr = JSON.stringify(packet);
    sendMessage(jsonStr);
    };


