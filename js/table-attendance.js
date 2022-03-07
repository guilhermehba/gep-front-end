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
        for (const a in aluno) {
            document.querySelector('.table-attendance-array').innerHTML += `
            <tr class="${aluno[a].legenda == 'TRF 11/02/2022' ? 'table-warning':''}">
                <td class="">${aluno[a].id}</td>
                <td class="">${aluno[a].nome}</td>
                <td class="">${aluno[a].matricula}</td>
                <td class="">${aluno[a].legenda ? aluno[a].legenda : "Não existe"}</td>
                <td class="status-attendance" title-label="${aluno[a].nome}">*</td>
                <td class="status-attendance" title-label="${aluno[a].nome}">*</td>
                <td class="status-attendance" title-label="${aluno[a].nome}">*</td>
                <td class="status-attendance" title-label="${aluno[a].nome}">*</td>
                <td class="status-attendance" title-label="${aluno[a].nome}">*</td>
                <td class="status-attendance" title-label="${aluno[a].nome}">*</td>
                <td class="status-attendance" title-label="${aluno[a].nome}">*</td>
                <td class="status-attendance" title-label="${aluno[a].nome}">*</td>
                <td class="status-attendance" title-label="${aluno[a].nome}">*</td>
                <td class="status-attendance" title-label="${aluno[a].nome}">*</td>
                <td class="status-attendance" title-label="${aluno[a].nome}">*</td>
                <td class="status-attendance" title-label="${aluno[a].nome}">*</td>
                <td class="status-attendance" title-label="${aluno[a].nome}">*</td>
                <td class="status-attendance" title-label="${aluno[a].nome}">*</td>
                <td class="status-attendance" title-label="${aluno[a].nome}">*</td>
                <td class="status-attendance" title-label="${aluno[a].nome}">*</td>
                <td class="status-attendance" title-label="${aluno[a].nome}">*</td>
                <td class="status-attendance" title-label="${aluno[a].nome}">*</td>
                <td class="status-attendance" title-label="${aluno[a].nome}">*</td>
                <td class="status-attendance" title-label="${aluno[a].nome}">*</td>
                <td class="status-attendance" title-label="${aluno[a].nome}">*</td>
                <td class="status-attendance" title-label="${aluno[a].nome}">*</td>
                <td class="status-attendance" title-label="${aluno[a].nome}">*</td>
            </tr>
            `;
        }
    }
}

// Send a request
xhttp.open("GET", "./js/json/alunos.json");
xhttp.send();

$(function () {
    $(".table-ergon .status-attendance").dblclick(function () {
        conteudoOriginal = $(this).text();
        selectedFormErgon = $('.select-ergon-select').val();

        $(this).html(`
        ${selectedFormErgon == 'falta' ? "<span style='color: red; font-weight: 600;'>F</span>":""}
        ${selectedFormErgon == 'falta justificada' ? "<span style='color: #AB58B9; font-weight: 600;'>FJ</span>":""}
        ${selectedFormErgon == 'presente' ? "<span style='color: #089944; font-weight: 600;'>*</span>":""}
        `);
        $(this).children().first().focus();

        novoConteudo = selectedFormErgon;
    });
});

function salvar() {
    for (const key in personas) {
        if (personas[key].nome == conteudoOriginal) {
            personas[key].nome = novoConteudo;
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