const type_problem = document.getElementById("type_problem");
const problem_desc = document.getElementById("problem_desc");
const Catégorie = document.getElementById("Catégorie");
const Priorité = document.getElementById("Priorité");
const btn_submit = document.getElementById("btn_submit");

const conter  = document.getElementById("conter");
const list_demandes = document.getElementById("list_demandes");

const demands = [];
let conter_num = 0; 



btn_submit.addEventListener('click', ( event ) =>{
    event.preventDefault();
    add_demande();
    show_demandes();
}
)

function show_demandes() {
    list_demandes.innerHTML = "";
    if (demands.length === 0) {
        return
    }
    else {
        demands.forEach((demands) => {
                conter.textContent = conter_num + " demandes";
                console.log(demands.length)
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
                <p class="Priorité ">${demands.Priorité}</p>
                </div>
                <hr>
                <div class="bottm_carte">
                <a class="modifer_btn" href="">✎ Modifier</a>
                <a class="supprimer_btn" href="">♜ Supprimer</a>
                </div>
                </article >`

            list_demandes.innerHTML += html_carte
        })
    }
}

function add_demande() {
    const demand = {};

    demand.type_problem = type_problem.value;
    demand.problem_desc = problem_desc.value;
    demand.Catégorie = Catégorie.value;
    demand.Priorité = Priorité.value;

    demands.push(demand);
    conter_num++;
    // console.log(demands);

}

function delet_demandes() {

}

function edit_demandes() {

}






// const html_carte = `
//     <div class="carte">
//     <div class="top_carte">
//     <p class="cate_side_icon">⌁</p>
//     <p class="text_side_icon">HD-001</p>
//     </div>
//     <h3 class="type_problem">${type_problem}</h3>
//     <p class="problem_desc">${problem_desc}</p>
//     <div class="type_holder">
//     <p class="Catégorie ">${Catégorie}</p>
//     <p class="Priorité ">${Priorité}</p>
//     </div>
//     <hr>
//     <div class="bottm_carte">
//     <a class="modifer_btn" href="">✎ Modifier</a>
//     <a class="supprimer_btn" href="">♜ Supprimer</a>
//     </div>
//     </div>`