import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";


const firebaseConfig = {
  apiKey: "AIzaSyDv2uaKuoOlLXdfitOY1XnHPgAV6p0TZIE",
  authDomain: "projetolista-1fcef.firebaseapp.com",
  /*databaseURL: "https://projetolista-1fcef-default-rtdb.firebaseio.com",*/
  projectId: "projetolista-1fcef",
  storageBucket: "projetolista-1fcef.appspot.com",
  messagingSenderId: "449486682341",
  appId: "1:449486682341:web:9ffc69f4cdb42c67237c0c"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

document.querySelector('#addBtn').addEventListener('click', function(e) {
  e.preventDefault(); // Evita o comportamento padrão do formulário
  addTodoItem();
});

async function addTodoItem() {
  const todoInput = document.getElementById('todoInput');
  const todoText = todoInput.value.trim();

  if (todoText !== '') {
    await addDoc(collection(db, "todos"), { text: todoText, isChecked: false });
    const listItem = createTodoItem(todoText, false);
    document.querySelector('.todo-list').appendChild(listItem);
    todoInput.value = '';
  }
}



function createTodoItem(text, isChecked) {
  const listItem = document.createElement('li');
  listItem.innerHTML = `
    <label class="checkbox-container">
      <input type="checkbox" ${isChecked ? 'checked' : ''}>
      <span class="checkbox-custom"></span>
    </label>
    <span class="todo-text">${text}</span>
    <button class="delete-btn">Deletar</button>
  `;
  
  listItem.querySelector('input[type="checkbox"]').addEventListener('change', async (e) => {
    await saveTodos();
  });
  listItem.querySelector('.delete-btn').addEventListener('click', async (e) => {
    await deleteTodoItem(text);
    listItem.remove();
  });
  return listItem;
}


async function saveTodos(text, isChecked) {
  const collectionRef = collection(db, "todos");
  await addDoc(collectionRef, { text, isChecked });
}


async function loadTodos() {
  const querySnapshot = await getDocs(collection(db, "todos"));
  querySnapshot.forEach(doc => {
    const todo = doc.data();
    const listItem = createTodoItem(todo.text, todo.isChecked);
    document.querySelector('.todo-list').appendChild(listItem);
  });
}

async function deleteTodoItem(todoText) {
  const querySnapshot = await getDocs(collection(db, "todos"));
  querySnapshot.forEach(async (docSnapshot) => {
    const todo = docSnapshot.data();
    if (todo.text === todoText) {
      await deleteDoc(doc(db, "todos", docSnapshot.id));
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  loadTodos();
});