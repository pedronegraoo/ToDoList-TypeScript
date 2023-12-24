let inputTask = <HTMLSelectElement>document.querySelector(".inputTask");
const btnTask = document.getElementById("btn-task");
const completeList = <HTMLSelectElement>document.querySelector(".tarefas");

interface ILista {
  li: string;
  checked: boolean;
}
let store: ILista[] = [];

btnTask?.addEventListener("click", getValueInput);
document.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    getValueInput();
  }
});

function getValueInput(): void {
  if (inputTask.value === "") {
    alert("Preencha o campo.");
    inputTask.classList.add("erro");
  } else if (validateDuoTask(store)) {
    alert(`Já existe essa tarefa`);
    inputTask.value = "";
    inputTask.focus();
  } else {
    let tasks: ILista = {
      li: inputTask.value,
      checked: false,
    };
    store.push(tasks);

    addTask(store);
    inputTask.value = "";
    inputTask.focus();
  }
}

inputTask.addEventListener("click", () => {
  inputTask.classList.remove("erro");
});

// VALIDANDO TASK REPETIDA
function validateDuoTask(store: ILista[]): boolean {
  let find = store.find((element) => element.li === inputTask.value);

  return find ? true : false;
}

// ADICIONAR TAREFA NA TELA
function addTask(store: ILista[]): void {
  let task: string = "";

  store.forEach((item, index) => {
    task += `
      <li class="task ${item.checked && "checked"}">
      <i class="bi bi-check-circle-fill check" onclick="checkedTask(${index})"></i>
      <p>${item.li}<p/>
      <i class="bi bi-x-circle-fill delete" onclick="removeTask(${index})"></i>
      </li>`;
  });

  completeList.innerHTML = task;

  localStorage.setItem("taskKey", JSON.stringify(store));
}

// FUNÇÃO PARA TAREFA CONCLUIDA
function checkedTask(position: number): void {
  store[position].checked = !store[position].checked;
  addTask(store);
}

// FUNÇÃO EXCLUIR TAREFA
function removeTask(position: number): void {
  store.splice(position, 1);
  addTask(store);
}

function realodProgram(): void {
  const filesToLocalStorage = localStorage.getItem("taskKey");

  if (filesToLocalStorage) {
    store = JSON.parse(filesToLocalStorage);
    validateDuoTask(store);
  }

  addTask(store);
}

realodProgram();
