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
            <tr>
                <td class="fixed-side">${aluno[a].id}</td>
                <td class="fixed-side">${aluno[a].nome}</td>
                <td class="fixed-side">${aluno[a].matricula}</td>
                <td class="fixed-side">${aluno[a].legenda ? aluno[a].legenda : "Não existe"}</td>
            </tr>
            `;
        }
    }
}

// Send a request
xhttp.open("GET", "./js/json/alunos.json");
xhttp.send();

$(function () {
    $("td").dblclick(function () {
        conteudoOriginal = $(this).text();

        $(this).addClass("celulaEmEdicao");
        $(this).html("<input type='text' value='" + conteudoOriginal + "' />");
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