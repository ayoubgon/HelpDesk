const type_problem = document.getElementById("type_problem");
const problem_desc = document.getElementById("problem_desc");
const Catégorie = document.getElementById("Catégorie");
const Priorité = document.getElementById("Priorité");
const form = document.querySelector("form");

const filter = document.getElementById("filter")

const search_bar = document.getElementById("search_bar")
const search_btn = document.getElementById("search_btn")

const btn_submit = document.getElementById("btn_submit");

const conter = document.getElementById("conter");
const list_demandes = document.getElementById("list_demandes");

let search_arr;
let filtrage;

let conter_num = 0;
let demands = [{
    "type_problem": "Connexion Wi-Fi instable",
    "problem_desc": "Le réseau se déconnecte régulièrement.",
    "Catégorie": "Réseau",
    "Priorité": "Haute",
    "tickt_id": 1
}, {
    "type_problem": "Installation d’un logiciel",
    "problem_desc": "Installer un logiciel sur le poste.",
    "Catégorie": "Logiciel",
    "Priorité": "Normale",
    "tickt_id": 2
}, {
    "type_problem": "Clavier défectueux",
    "problem_desc": "Certaines touches ne fonctionnent plus.",
    "Catégorie": "Matériel",
    "Priorité": "Basse",
    "tickt_id": 3
}];

let demand_edit;
let edite_stuats = 0;

// check the localstorge if any data store and display it
if (localStorage.getItem("demands")) {
    demands = JSON.parse(localStorage.getItem("demands"));
}
show_demandes(demands);
let tickt_id = demands.length === 0 ? 1 : demands[demands.length - 1].tickt_id + 1

function show_demandes(demands) {
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
                <p class="cate_side_icon">${demands.Catégorie == "Matériel" ? "+" : demands.Catégorie == "Logiciel" ? "-" : "*"} </p>
                <p class="text_side_icon">HD-${String(demands.tickt_id).padStart(3, "0")}</p>
                </div>
                <h3 class="type_problem">${demands.type_problem}</h3>
                <p class="lighter_text problem_desc">${demands.problem_desc}</p>
                <div class="type_holder">
                <p class="Catégorie ">${demands.Catégorie}</p>
                <p class="Priorité ${demands.Priorité} ">${demands.Priorité}</p>
                </div>
                <hr>
                <div class="bottm_carte">
                <a class="modifer_btn" onclick="edit_demandes(${demands.tickt_id})">✎ Modifier</a>
                <a class="supprimer_btn" onclick="delete_demande(${demands.tickt_id})">♜ Supprimer</a>
                </div>
                </article >`

            list_demandes.innerHTML += html_carte;
        })
    }
    console.log(demands);

}
function add_demande() {
    const demand = {};

    demand.type_problem = type_problem.value;
    demand.problem_desc = problem_desc.value;
    demand.Catégorie = Catégorie.value;
    demand.Priorité = Priorité.value;
    demand.tickt_id = tickt_id++;
    demands.push(demand);
    conter_num++;
}

function delete_demande(id) {
    if (!confirm("Êtes-vous sûr de vouloir Supprimer cette demande ?"))
        return
    demands = demands.filter(item => item.tickt_id !== id);
    localStorage.setItem("demands", JSON.stringify(demands));
    show_demandes(demands);
}

function edit_demandes(id) {
    edite_stuats = id;
    btn_submit.textContent = "modifier la demande"

    demand_edit = demands.find(item => item.tickt_id === id);

    if (demand_edit) {
        type_problem.value = demand_edit.type_problem;
        problem_desc.value = demand_edit.problem_desc;
        Catégorie.value = demand_edit.Catégorie;
        Priorité.value = demand_edit.Priorité;
    }
}

btn_submit.addEventListener('click', (event) => {
    event.preventDefault();

    if (type_problem.value === "" || problem_desc.value === "" || Catégorie.value === "" || Priorité.value === "") {
        alert("Veuillez remplir tous les champs obligatoires !");
        return;
    }
    else if (edite_stuats !== 0) {
        if (!confirm("Êtes-vous sûr de vouloir modifier cette demande ?"))
            return

        demand_edit.type_problem = type_problem.value;
        demand_edit.problem_desc = problem_desc.value;
        demand_edit.Catégorie = Catégorie.value;
        demand_edit.Priorité = Priorité.value;
        btn_submit.textContent = "＋ Ajouter la demande"
        edite_stuats = 0;
    }
    else if (edite_stuats == 0) {
        if (!confirm("Êtes-vous sûr de vouloir ajouter cette demande ?"))
            return
        add_demande(demands);
    }


    localStorage.setItem("demands", JSON.stringify(demands));
    show_demandes(demands);
    filter.value = 1
    form.reset();
}
)
search_btn.addEventListener('click', (event) => {
    filter.value = 1

    event.preventDefault();
    if (search_bar.value == "")
        show_demandes(demands)
    else {
        search_arr = demands.filter(item => item.type_problem == search_bar.value);
        console.log(search_arr);
        show_demandes(search_arr);

    }
})

filter.addEventListener("change", () => {
    switch (filter.value) {
        case "Basse":
            filtrage = demands.filter(item => item.Priorité == "Basse")
            show_demandes(filtrage)

            break;
        case "Normale":
            filtrage = demands.filter(item => item.Priorité == "Normale")
            show_demandes(filtrage)
            break;
        case "Haute":
            filtrage = demands.filter(item => item.Priorité == "Haute")
            show_demandes(filtrage)
            break;
        case "Matériel":
            filtrage = demands.filter(item => item.Catégorie == "Matériel")
            show_demandes(filtrage)
            break;
        case "Logiciel":
            filtrage = demands.filter(item => item.Catégorie == "Logiciel")
            show_demandes(filtrage)
            break;
        case "Réseau":
            filtrage = demands.filter(item => item.Catégorie == "Réseau")
            show_demandes(filtrage)
            break;

        default: show_demandes(demands)
            break;
    }



}
)