const type_problem = document.getElementById("type_problem");
const problem_desc = document.getElementById("problem_desc");
const Catégorie = document.getElementById("Catégorie");
const Priorité = document.getElementById("Priorité");
const form = document.querySelector("form");

const btn_submit = document.getElementById("btn_submit");

const conter = document.getElementById("conter");
const list_demandes = document.getElementById("list_demandes");

let conter_num = 0;
let demands = [];
let edite_stuats = null;

// check the localstorge if any data store and display it
if (localStorage.getItem("demands")) {
    demands = JSON.parse(localStorage.getItem("demands"));
    show_demandes();
}


btn_submit.addEventListener('click', (event) => {
    event.preventDefault();
    if (type_problem.value === "" || problem_desc.value === "" || Catégorie.value === "" || Priorité.value === "") {
        alert("Veuillez remplir tous les champs obligatoires !");
        return;
    }
    else if (edite_stuats == null) {
        add_demande();
        show_demandes();
    }
}
)

function show_demandes() {
    list_demandes.innerHTML = "";
    conter.textContent = demands.length + " demandes";
    if (demands.length === 0) {
        return
    }

    else {
        demands.forEach((demands) => {
            const html_carte = `
                <article  class="carte">
                <div class="top_carte">
                <p class="cate_side_icon">⌁</p>
                <p class="text_side_icon">HD-001</p>
                </div>
                <h3 class="type_problem">${demands.type_problem}</h3>
                <p class="problem_desc">${demands.problem_desc}</p>
                <div class="type_holder">
                <p class="Catégorie ">${demands.Catégorie}</p>
                <p class="Priorité ${demands.Priorité} ">${demands.Priorité}</p>
                </div>
                <hr>
                <div class="bottm_carte">
                <a class="modifer_btn" onclick="edit_demandes(${demands.id})">✎ Modifier</a>
                <a class="supprimer_btn" onclick="delete_demande(${demands.id})">♜ Supprimer</a>
                </div>
                </article >`

            list_demandes.innerHTML += html_carte;
        })
    }
}

function add_demande() {
    const demand = {};

    demand.type_problem = type_problem.value;
    demand.problem_desc = problem_desc.value;
    demand.Catégorie = Catégorie.value;
    demand.Priorité = Priorité.value;
    demand.id = Date.now();
    demands.push(demand);
    localStorage.setItem("demands", JSON.stringify(demands));
    conter_num++;
    form.reset();

}

function delete_demande(id) {
    demands = demands.filter(item => item.id !== id);
    localStorage.setItem("demands", JSON.stringify(demands));
    show_demandes();
}

function edit_demandes(id) {
    edite_stuats = id;

    let demand_edit = demands.find(item => item.id === id);

    if (demand_edit) {
        type_problem.value = demand_edit.type_problem;
        problem_desc.value = demand_edit.problem_desc;
        Catégorie.value = demand_edit.Catégorie;
        Priorité.value = demand_edit.Priorité;
    }
}

btn_submit.addEventListener('click', (event) => {
    event.preventDefault();

    let demand_edit = demands.find(item => item.id === edite_stuats);

    if (edite_stuats !== null) {
        if (type_problem.value === "" || problem_desc.value === "" || Catégorie.value === "" || Priorité.value === "") {
        alert("Veuillez remplir tous les champs obligatoires !");
        return;
    }
        demand_edit.type_problem = type_problem.value;
        demand_edit.problem_desc = problem_desc.value;
        demand_edit.Catégorie = Catégorie.value;
        demand_edit.Priorité = Priorité.value;
        edite_stuats = null;
    }
    localStorage.setItem("demands", JSON.stringify(demands));
    show_demandes();
    form.reset();
}
)