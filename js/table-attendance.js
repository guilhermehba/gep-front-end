$('table').on('scroll', function () {
    $("table > *").width($("table").width() + $("table").scrollLeft());
});

var alunos;
var aluno;

var html = document.querySelector('.table-attendance-array');

var selectedFormErgon;
var conteudoOriginal;
var novoConteudo;

// Função de tabela editável
// Create an XMLHttpRequest object
const xhttp = new XMLHttpRequest();

// Define a callback function
xhttp.onload = async function () {
    alunos = await JSON.parse(this.responseText);
    aluno = alunos['Alunos'];
    if (this.readyState == 4 && this.status == 200) {
        orderByOrder();
    }
}

function headerTableThead() {
    
}

function headerTableTbody(aluno) {
    console.log(aluno[0]);
    document.querySelector('.table-attendance-array').innerHTML = ``;
    for (const a in aluno) {
        document.querySelector('.table-attendance-array').innerHTML += `
        <tr class="">
            <td class="">${aluno[a].id}</td>
            <td class="">${aluno[a].nome}</td>
            <td class="">${aluno[a].matricula}</td>
            <td class="legenda-${aluno[a].matricula}">${aluno[a].legenda ? aluno[a].legenda : ""}</td>
            <td class="status-attendance-${aluno[a].id}" title-label="${aluno[a].nome}">*</td>
            <td class="status-attendance-${aluno[a].id}" title-label="${aluno[a].nome}">*</td>
            <td class="status-attendance-${aluno[a].id}" title-label="${aluno[a].nome}">*</td>
            <td class="status-attendance-${aluno[a].id}" title-label="${aluno[a].nome}">*</td>
            <td class="status-attendance-${aluno[a].id}" title-label="${aluno[a].nome}">*</td>
            <td class="status-attendance-${aluno[a].id}" title-label="${aluno[a].nome}">*</td>
            <td class="status-attendance-${aluno[a].id}" title-label="${aluno[a].nome}">*</td>
            <td class="status-attendance-${aluno[a].id}" title-label="${aluno[a].nome}">*</td>
            <td class="status-attendance-${aluno[a].id}" title-label="${aluno[a].nome}">*</td>
            <td class="status-attendance-${aluno[a].id}" title-label="${aluno[a].nome}">*</td>
            <td class="status-attendance-${aluno[a].id}" title-label="${aluno[a].nome}">*</td>
            <td class="status-attendance-${aluno[a].id}" title-label="${aluno[a].nome}">*</td>
            <td class="status-attendance-${aluno[a].id}" title-label="${aluno[a].nome}">*</td>
            <td class="status-attendance-${aluno[a].id}" title-label="${aluno[a].nome}">*</td>
            <td class="status-attendance-${aluno[a].id}" title-label="${aluno[a].nome}">*</td>
            <td class="status-attendance-${aluno[a].id}" title-label="${aluno[a].nome}">*</td>
            <td class="status-attendance-${aluno[a].id}" title-label="${aluno[a].nome}">*</td>
            <td class="status-attendance-${aluno[a].id}" title-label="${aluno[a].nome}">*</td>
            <td class="status-attendance-${aluno[a].id}" title-label="${aluno[a].nome}">*</td>
            <td class="status-attendance-${aluno[a].id}" title-label="${aluno[a].nome}">*</td>
            <td class="status-attendance-${aluno[a].id}" title-label="${aluno[a].nome}">*</td>
            <td class="status-attendance-${aluno[a].id}" title-label="${aluno[a].nome}">*</td>
            <td class="status-attendance-${aluno[a].id}" title-label="${aluno[a].nome}">*</td>
        </tr>
        `;

        if (aluno[a].legenda) {
            switch (aluno[a].legenda) {
                case 'TRF 11/02/2022':
                    document.querySelector('.legenda-'+aluno[a].matricula).classList.add('table-warning');
                    break;
                case 'success':
                    document.querySelector('.legenda-'+aluno[a].matricula).classList.add('table-success');
                    break;
                case 'TE 01/02/2022':
                    document.querySelector('.legenda-'+aluno[a].matricula).classList.add('table-primary');
                    break;
            
                default:
                    break;
            }
        }

        update(aluno[a].nome, aluno[a].id);
    }
}

// Send a request
xhttp.open("GET", "./js/json/alunos.json");
xhttp.send();

var personas = [];

function update(nome, id) {
    $(function () {
        $(".table-ergon .status-attendance-"+id).click(function () {
            conteudoOriginal = $(this).text();
            selectedFormErgon = $('.select-ergon-select').val();
    
            if (selectedFormErgon) {
                $(this).html(`
                ${selectedFormErgon == 'falta' ? "<span style='color: red; font-weight: 600;'>F</span>":""}
                ${selectedFormErgon == 'falta justificada' ? "<span style='color: #AB58B9; font-weight: 600;'>FJ</span>":""}
                ${selectedFormErgon == 'presente' ? "<span style='color: #089944; font-weight: 600;'>*</span>":""}
                `);
                $(this).children().first().focus();
    
                novoConteudo = selectedFormErgon;

                console.log(nome);
                console.log(id);
                personas.push({nome, id, conteudoOriginal, novoConteudo});
                alert(nome);
            } else {
                if(toast){ toast.dispose(); }
                toast = alertGEP("Você não selecionou um tipo de registro!", "bottom", "tipoderegistro");
            }
        });
    });
}

function salvar() {
    for (const key in personas) {
        if (personas[key].nome) {
            return personas;
        }
        else {
            return false;
        }
    }
}

function mostrarConteudoOriginal() {
    return conteudoOriginal;
}

function mostrarConteudoNovo(params) {
    return novoConteudo;
}

function listarAlunos() {
    return alunos;
}

function mostrar() {
    return selectedFormErgon;
}

// ordenação

var ordenado;
var ctrue = true;
var ordenadoAux;
var toast;

function orderByName() {
    if (ordenado != "name") {
        aluno.sort(function (obj1, obj2) {
            return obj1.nome < obj2.nome ? -1 :
                (obj1.nome > obj2.nome ? 1 : 0);
        });
        headerTableTbody(aluno);
        ordenado = "name";
        if(toast){ toast.dispose(); }
        toast = alertGEP('Ordenado por nome!', 'bottom', 'inamen');
    } else{
        orderByOrder();
    }
}

function orderByOrder(){
    if (ordenado != "order") {
        aluno.sort(function (obj1, obj2) {
            return obj1.id < obj2.id ? -1 :
                (obj1.id > obj2.id ? 1 : 0);
        });
        headerTableTbody(aluno);
        ordenado = "order";
        if(toast) { toast.dispose(); toast = alertGEP('Ordenado por ordem numérica!', 'bottom', 'ordemNumerica'); }
    }
}

function clickTrue() {
    if (ctrue) {
        $(".i"+ordenado).css("color", "#AB58B9");
        $(".i"+ordenado).css("textShadow", "0.1em 0.1em 0.2em #da00ff");
        $(".i"+ordenadoAux).css("color", "#212529");
        $(".i"+ordenadoAux).css("textShadow", "none");
        ctrue = false;
        ordenadoAux = ordenado;
    }else{
        $(".i"+ordenado).css("color", "#AB58B9");
        $(".i"+ordenado).css("textShadow", "0.1em 0.1em 0.2em #da00ff");
        $(".i"+ordenadoAux).css("color", "#212529");
        $(".i"+ordenadoAux).css("textShadow", "none");
        ctrue = true;
        ordenadoAux = ordenado;
    }
}