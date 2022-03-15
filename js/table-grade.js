var alunos;
var aluno;

var html = document.querySelector('.table-array');

var conteudoOriginal;
var novoConteudo;

// Função de tabela editável
// Create an XMLHttpRequest object
const xhttp = new XMLHttpRequest();

// Define a callback function
xhttp.onload = async function tabela () {
    dados = await JSON.parse(this.responseText);
    data = dados['Alunos'];
    console.log(data);
    if (this.readyState == 4 && this.status == 200) {
        orderByOrder();
    }
}

function headerTable(data) {
    document.querySelector('.table-array').innerHTML = ``;
    for (const a in data) {
        document.querySelector('.table-array').innerHTML += `
        <tr>
            <td class="fixed-side">${data[a].id}</td>
            <td class="fixed-side">${data[a].nome}</td>
            <td class="fixed-side">${data[a].matricula}</td>
            <td class="fixed-side">${data[a].legenda}</td>
            <td style="text-align: center;">${data[a].notas.a}</td>
            <td style="text-align: center;">${data[a].notas.b}</td>
            <td style="text-align: center;">${data[a].notas.c}</td>
            <td style="text-align: center;">${data[a].notas.d}</td>
            <td style="text-align: center;">${data[a].notas.media}</td>
            <td style="text-align: center;">${data[a].notas.historico}</td>
            <td style="text-align: center;">${data[a].notas.ft}</td>
        </tr>
        `;
    }
}

// Send a request
xhttp.open("GET", "./js/json/alunos.json");
xhttp.send();

// ordenação

var ordenado;
var ctrue = true;
var ordenadoAux;
var toast;

function orderByName() {
    if (ordenado != "name") {
        data.sort(function (obj1, obj2) {
            return obj1.nome < obj2.nome ? -1 :
                (obj1.nome > obj2.nome ? 1 : 0);
        });
        headerTable(data);
        ordenado = "name";
        if(toast){ toast.hide(); }
        toast = alertGEP('Ordenado por nome!', 'bottom', 'inamen');
        
    } else{
        orderByOrder();
    }
}

function orderByOrder(){
    if (ordenado != "order") {
        data.sort(function (obj1, obj2) {
            return obj1.id < obj2.id ? -1 :
                (obj1.id > obj2.id ? 1 : 0);
        });
        headerTable(data);
        ordenado = "order";
        if(toast) { toast.hide(); toast = alertGEP('Ordenado por ordem numérica!', 'bottom', 'ordemNumerica'); }
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