import * as http from "./http.js";
let employees = [];
let empregadosFiltrados = []
let countEmployee = 0;
let roles = [];
const checkboxFilters = document.querySelector(".checkboxes");
const cardGroup = document.querySelector(".card-group");
const orderBy = document.getElementById("order-by");

async function init() {
  [employees, roles] = await Promise.all([
    http.listEmployees(),
    http.listRoles(),
  ]);
  employees.sort(function (a, b) {
    if (a.name > b.name) {
      return 1;
    }
    if (a.name < b.name) {
      return -1;
    }
    // a must be equal to b
    return 0;
  });
  renderFiltros();
  renderEmpregados();
}
init();

function renderFiltros() {
  for (const role of roles) {
    const label = document.createElement("label");
    const input = document.createElement("input");
    input.type = "checkbox";
    input.value = role.id;
    input.addEventListener("change", filtraPorCargo);
    label.textContent = role.name;
    label.appendChild(input);
    checkboxFilters.appendChild(label);
  }
}

function renderEmpregados(empregados=employees) {
  cardGroup.innerHTML = "";
  countEmployee = 0;
  empregados = empregados.length == 0 ? employees : empregados;
  for (const employee of empregados) {
    let role = roles.find((role) => role.id == employee.role_id);
    const card = cardMontaContent(
      document.createElement("div"),
      "card-funcionario"
    );
    const cardId = cardMontaContent(
      document.createElement("div"),
      "card-id",
      employee.id
    );
    const cardImg = cardMontaContent(document.createElement("div"), "card-img");
    const cardTitle = cardMontaContent(
      document.createElement("div"),
      "card-title",
      employee.name
    );
    const cardCargo = cardMontaContent(
      document.createElement("div"),
      "card-text",
      `Cargo: ${role.name}`
    );
    const cardSalario = cardMontaContent(
      document.createElement("div"),
      "card-text",
      `Salário: R$${employee.salary}`
    );
    const cardContent = cardMontaContent(
      document.createElement("div"),
      "card-content"
    );

    const imgFromCard = document.createElement("img");
    imgFromCard.alt = "Perfil";
    imgFromCard.src = "img/perfil.png";

    cardImg.appendChild(imgFromCard);
    /*Appenda filhos*/
    cardContent.appendChild(cardTitle);
    cardContent.appendChild(cardCargo);
    cardContent.appendChild(cardSalario);
    card.appendChild(cardId);
    card.appendChild(cardImg);
    card.appendChild(cardContent);
    cardGroup.appendChild(card);
    countEmployee += 1;
  }
  document.getElementById("count-of-employee").innerHTML = `Nº Registros Filtro Atual: ${countEmployee}`;
}

function cardMontaContent(elemento, className, textContent = "") {
  elemento.classList.add(className);
  if (textContent != "") {
    elemento.textContent = textContent;
  }
  return elemento;
}

orderBy.addEventListener("change", () => {
  let empregados = empregadosFiltrados.length == 0? employees : empregadosFiltrados;
  if (orderBy.value == 1) {
    empregados.sort(function (a, b) {
      if (a.name > b.name) {
        return 1;
      }
      if (a.name < b.name) {
        return -1;
      }
      return 0;
    });
  }

  if (orderBy.value == 2) {
    empregados.sort(function (a, b) {
      if (b.name > a.name) {
        return 1;
      }
      if (b.name < a.name) {
        return -1;
      }
      return 0;
    });
  }

  if (orderBy.value == 3) {
    empregados.sort(function (a, b) {
      if (a.salary > b.salary) {
        return 1;
      }
      if (a.salary < b.salary) {
        return -1;
      }
      return 0;
    });
  }

  if (orderBy.value == 4) {
    empregados.sort(function (a, b) {
      if (b.salary > a.salary) {
        return 1;
      }
      if (b.salary < a.salary) {
        return -1;
      }
      return 0;
    });
  }
  renderEmpregados(empregados);
});

function filtraPorCargo() {
  let checboxesCheckeds = document.querySelectorAll(".checkboxes input:checked");  
  empregadosFiltrados = [];
  
  checboxesCheckeds.forEach(item =>{
      let empregadosFiltradosAux = employees.filter(employee =>{
        return employee.role_id == item.value;   
      })
      
      empregadosFiltrados = empregadosFiltrados.concat(empregadosFiltradosAux)
  })
  

  renderEmpregados(empregadosFiltrados);
  
}

