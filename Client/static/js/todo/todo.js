document.addEventListener('DOMContentLoaded', () => {
    // 문서 객체를 가져옵니다.
    const div1 = document.querySelector('.todo_inputbox');
    const div2 = document.querySelector('.todo_inputbox');
    const div3 = document.querySelector('.todo_inputbox');
    const daily_category = document.querySelector('#dailyCategory');
    const daily_input = document.querySelector('#dailyContent');
    const daily_btn = document.querySelector('#dailyBtn');
    const study_category = document.querySelector('#studyCategory');
    const study_input = document.querySelector('#studyContent');
    const study_btn = document.querySelector('#studyBtn');
    const etc_category = document.querySelector('#etcCategory');
    const etc_input = document.querySelector('#etcContent');
    const etc_btn = document.querySelector('#etcBtn');
    const dailytodoList = document.querySelector('#daily-todo-list');
    const studytodoList = document.querySelector('#study-todo-list');
    const etctodoList = document.querySelector('#etc-todo-list');
    
    let keyCount = 0;

    // 추가 버튼 클릭 시 실행되는 함수
    daily_btn.addEventListener('click', () => {
        const todoText = daily_input.value.trim();
        const dailyCategory = daily_category.value.trim(); // category 값 가져오기
        const user_id = sessionStorage.getItem('user_id');
        const item = document.createElement('div');
        const checkbox = document.createElement('input');
        const text = document.createElement('span');
        const button = document.createElement('button');

        const key = keyCount++;       // 생성요소 식별 키

        item.id = 'dailyListDiv'
        item.setAttribute('data-key', key);
        item.appendChild(checkbox);
        item.appendChild(text);
        item.appendChild(button);
        dailytodoList.appendChild(item);

        checkbox.type = 'checkbox';
        checkbox.addEventListener('change', (event) => {
            item.style.textDecoration = event.target.checked ? 'line-through' : '';
        });

        text.textContent = daily_input.value;

        button.textContent = '지우기';
        button.addEventListener('click', () => {
            removeTodo(key);
        });

        daily_input.value = '';       // 입력창을 비워준다

        daily_input.focus();          // 포커스를 input창으로 다시 입력되게

        const removeTodo = (key) => {
            const item = document.querySelector(`[data-key="${key}"]`);
            dailytodoList.removeChild(item);
        }

        if (todoText !== '') {
            const data = {
                cmd: "add_todo",
                todo: todoText,
                category: dailyCategory, // 일상
                user_id: user_id
            };
            socket.send(JSON.stringify(data));
            daily_input.value = '';
        }
    });

    study_btn.addEventListener('click', () => {
        const todoText = study_input.value.trim();
        const studyCategory = study_category.value.trim(); // category 값 가져오기
        const user_id = sessionStorage.getItem('user_id');
        const item = document.createElement('div');
        const checkbox = document.createElement('input');
        const text = document.createElement('span');
        const button = document.createElement('button');

        const key = keyCount++;       // 생성요소 식별 키

        item.id = 'studyListDiv'
        item.setAttribute('data-key', key);
        item.appendChild(checkbox);
        item.appendChild(text);
        item.appendChild(button);
        studytodoList.appendChild(item);

        checkbox.type = 'checkbox';
        checkbox.addEventListener('change', (event) => {
            item.style.textDecoration = event.target.checked ? 'line-through' : '';
        });

        text.textContent = study_input.value;

        button.textContent = '제거하기';
        button.addEventListener('click', () => {
            removeTodo(key);
        });

        study_input.value = '';       // 입력창을 비워준다

        study_input.focus();          // 포커스를 input창으로 다시 입력되게

        const removeTodo = (key) => {
            const item = document.querySelector(`[data-key="${key}"]`);
            studytodoList.removeChild(item);
        }
        
        if (todoText !== '') {
            const data = {
                cmd: "add_todo",
                todo: todoText,
                category: studyCategory, // 일상
                user_id: user_id
            };
            socket.send(JSON.stringify(data));
            study_input.value = '';
        }
    });

    etc_btn.addEventListener('click', () => {
        const todoText = etc_input.value.trim();
        const etcCategory = etc_category.value.trim(); // category 값 가져오기
        const user_id = sessionStorage.getItem('user_id');
        const item = document.createElement('div');
        const checkbox = document.createElement('input');
        const text = document.createElement('span');
        const button = document.createElement('button');

        const key = keyCount++;       // 생성요소 식별 키

        item.id = 'etcListDiv'
        item.setAttribute('data-key', key);
        item.appendChild(checkbox);
        item.appendChild(text);
        item.appendChild(button);
        etctodoList.appendChild(item);

        checkbox.type = 'checkbox';
        checkbox.addEventListener('change', (event) => {
            item.style.textDecoration = event.target.checked ? 'line-through' : '';
        });

        text.textContent = etc_input.value;

        button.textContent = '제거하기';
        button.addEventListener('click', () => {
            removeTodo(key);
        });

        etc_input.value = '';       // 입력창을 비워준다

        etc_input.focus();          // 포커스를 input창으로 다시 입력되게

        const removeTodo = (key) => {
            const item = document.querySelector(`[data-key="${key}"]`);
            etctodoList.removeChild(item);
        }

        if (todoText !== '') {
            const data = {
                cmd: "add_todo",
                todo: todoText,
                category: etcCategory, // category 값을 데이터에 추가
                user_id: user_id
            };
            socket.send(JSON.stringify(data));
            etc_input.value = '';
        }
    });
});