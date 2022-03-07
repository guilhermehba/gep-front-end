$('table').on('scroll', function () {
    $("table > *").width($("table").width() + $("table").scrollLeft());
});

var alunos;
var aluno;

var html = document.querySelector('.table-attendance-array');

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
                <td class="fixed-side">${aluno[a].id}</td>
                <td class="fixed-side">${aluno[a].nome}</td>
                <td class="fixed-side">${aluno[a].matricula}</td>
                <td class="fixed-side">${aluno[a].legenda ? aluno[a].legenda : "Não existe"}</td>
                <td class="fixed-side" title-label="${aluno[a].nome}">*</td>
                <td class="fixed-side" title-label="${aluno[a].nome}">*</td>
                <td class="fixed-side" title-label="${aluno[a].nome}">*</td>
                <td class="fixed-side" title-label="${aluno[a].nome}">*</td>
                <td class="fixed-side" title-label="${aluno[a].nome}">*</td>
                <td class="fixed-side" title-label="${aluno[a].nome}">*</td>
                <td class="fixed-side" title-label="${aluno[a].nome}">*</td>
                <td class="fixed-side" title-label="${aluno[a].nome}">*</td>
                <td class="fixed-side" title-label="${aluno[a].nome}">*</td>
                <td class="fixed-side" title-label="${aluno[a].nome}">*</td>
                <td class="fixed-side" title-label="${aluno[a].nome}">*</td>
                <td class="fixed-side" title-label="${aluno[a].nome}">*</td>
                <td class="fixed-side" title-label="${aluno[a].nome}">*</td>
                <td class="fixed-side" title-label="${aluno[a].nome}">*</td>
                <td class="fixed-side" title-label="${aluno[a].nome}">*</td>
                <td class="fixed-side" title-label="${aluno[a].nome}">*</td>
                <td class="fixed-side" title-label="${aluno[a].nome}">*</td>
                <td class="fixed-side" title-label="${aluno[a].nome}">*</td>
                <td class="fixed-side" title-label="${aluno[a].nome}">*</td>
                <td class="fixed-side" title-label="${aluno[a].nome}">*</td>
                <td class="fixed-side" title-label="${aluno[a].nome}">*</td>
                <td class="fixed-side" title-label="${aluno[a].nome}">*</td>
                <td class="fixed-side" title-label="${aluno[a].nome}">*</td>
            </tr>
            `;
        }
    }
}

// Send a request
xhttp.open("GET", "./js/json/alunos.json");
xhttp.send();

function name(params) {
    
}

$(function () {
    $(".table-ergon td").dblclick(function () {
        conteudoOriginal = $(this).text();

        $(this).addClass("celulaEmEdicao");
        $(this).html(`<input type='text' style='padding: 0; font-size: 13px;' ${conteudoOriginal=='*' ? 'size=1' : ''} value='${conteudoOriginal}' />`);
        $(this).children().first().focus();

        $(this).children().first().keypress(function (e) {
            if (e.which == 13) {
                novoConteudo = $(this).val();
                $(this).parent().text(novoConteudo);
                $(this).parent().removeClass("celulaEmEdicao");
                salvar();
            }
        });

        $(this).children().first().blur(function () {
            $(this).parent().text(conteudoOriginal);
            $(this).parent().removeClass("celulaEmEdicao");
        });
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