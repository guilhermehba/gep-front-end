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

var popoverLegendaAluno;

function headerTableTbody(aluno) {
    console.log(aluno[0]);

    document.querySelector('.table-attendance-array').innerHTML = ``;
    for (const a in aluno) {
        document.querySelector('.table-attendance-array').innerHTML += `
        <tr class="">
            <td class="">${aluno[a].id}</td>
            <td class="">${aluno[a].nome}</td>
            <td class="">${aluno[a].matricula}</td>

            <td class="legenda-${aluno[a].matricula}" data-bs-toggle="popover"
            data-bs-placement="top">
            <span>
                ${aluno[a].legenda ? aluno[a].legenda : ""}
            </span>
            </td>
            
            <td class="status-attendance-${aluno[a].id} text-center" title-label="${aluno[a].nome}"><span style='color: #089944; font-weight: 600; cursor: context-menu;'>*</span></td>
            <td class="status-attendance-${aluno[a].id} text-center" title-label="${aluno[a].nome}"><span style='color: #089944; font-weight: 600; cursor: context-menu;'>*</span></td>
            <td class="status-attendance-${aluno[a].id} text-center" title-label="${aluno[a].nome}"><span style='color: #089944; font-weight: 600; cursor: context-menu;'>*</span></td>
            <td class="status-attendance-${aluno[a].id} text-center" title-label="${aluno[a].nome}"><span style='color: #089944; font-weight: 600; cursor: context-menu;'>*</span></td>
            <td class="status-attendance-${aluno[a].id} text-center" title-label="${aluno[a].nome}"><span style='color: #089944; font-weight: 600; cursor: context-menu;'>*</span></td>
            <td class="status-attendance-${aluno[a].id} text-center" title-label="${aluno[a].nome}"><span style='color: #089944; font-weight: 600; cursor: context-menu;'>*</span></td>
            <td class="status-attendance-${aluno[a].id} text-center" title-label="${aluno[a].nome}"><span style='color: #089944; font-weight: 600; cursor: context-menu;'>*</span></td>
            <td class="status-attendance-${aluno[a].id} text-center" title-label="${aluno[a].nome}"><span style='color: #089944; font-weight: 600; cursor: context-menu;'>*</span></td>
            <td class="status-attendance-${aluno[a].id} text-center" title-label="${aluno[a].nome}"><span style='color: #089944; font-weight: 600; cursor: context-menu;'>*</span></td>
            <td class="status-attendance-${aluno[a].id} text-center" title-label="${aluno[a].nome}"><span style='color: #089944; font-weight: 600; cursor: context-menu;'>*</span></td>
            <td class="status-attendance-${aluno[a].id} text-center" title-label="${aluno[a].nome}"><span style='color: #089944; font-weight: 600; cursor: context-menu;'>*</span></td>
            <td class="status-attendance-${aluno[a].id} text-center" title-label="${aluno[a].nome}"><span style='color: #089944; font-weight: 600; cursor: context-menu;'>*</span></td>
            <td class="status-attendance-${aluno[a].id} text-center" title-label="${aluno[a].nome}"><span style='color: #089944; font-weight: 600; cursor: context-menu;'>*</span></td>
            <td class="status-attendance-${aluno[a].id} text-center" title-label="${aluno[a].nome}"><span style='color: #089944; font-weight: 600; cursor: context-menu;'>*</span></td>
            <td class="status-attendance-${aluno[a].id} text-center" title-label="${aluno[a].nome}"><span style='color: #089944; font-weight: 600; cursor: context-menu;'>*</span></td>
            <td class="status-attendance-${aluno[a].id} text-center" title-label="${aluno[a].nome}"><span style='color: #089944; font-weight: 600; cursor: context-menu;'>*</span></td>
            <td class="status-attendance-${aluno[a].id} text-center" title-label="${aluno[a].nome}"><span style='color: #089944; font-weight: 600; cursor: context-menu;'>*</span></td>
            <td class="status-attendance-${aluno[a].id} text-center" title-label="${aluno[a].nome}"><span style='color: #089944; font-weight: 600; cursor: context-menu;'>*</span></td>
            <td class="status-attendance-${aluno[a].id} text-center" title-label="${aluno[a].nome}"><span style='color: #089944; font-weight: 600; cursor: context-menu;'>*</span></td>
            <td class="status-attendance-${aluno[a].id} text-center" title-label="${aluno[a].nome}"><span style='color: #089944; font-weight: 600; cursor: context-menu;'>*</span></td>
            <td class="status-attendance-${aluno[a].id} text-center" title-label="${aluno[a].nome}"><span style='color: #089944; font-weight: 600; cursor: context-menu;'>*</span></td>
            <td class="status-attendance-${aluno[a].id} text-center" title-label="${aluno[a].nome}"><span style='color: #089944; font-weight: 600; cursor: context-menu;'>*</span></td>
            <td class="status-attendance-${aluno[a].id} text-center" title-label="${aluno[a].nome}"><span style='color: #089944; font-weight: 600; cursor: context-menu;'>*</span></td>
        </tr>
        `;

        if (aluno[a].legenda) {
            switch (aluno[a].legenda) {
                case 'TRF 11/02/2022':
                    document.querySelector('.legenda-'+aluno[a].matricula).classList.add('table-warning');
                    
                    document.querySelector(`.legenda-${aluno[a].matricula}`).classList.add('popover-aluno-transferido');

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
                ${selectedFormErgon == 'falta' ? "<span style='color: red; font-weight: 600; cursor: context-menu;'>F</span>":""}
                ${selectedFormErgon == 'falta justificada' ? "<span style='color: #AB58B9; font-weight: 600; cursor: context-menu;'>FJ</span>":""}
                ${selectedFormErgon == 'presente' ? "<span style='color: #089944; font-weight: 600; cursor: context-menu;'>*</span>":""}
                `);
                $(this).children().first().focus();
    
                novoConteudo = selectedFormErgon;

                console.log(nome);
                console.log(id);

                if (selectedFormErgon == 'falta justificada') {
                    desenhaModalFJ(nome, id);
                }
                
                personas.push({nome, id, conteudoOriginal, novoConteudo});
            } else {
                if(toast){ toast.dispose(); }
                toast = alertGEP("Você não selecionou um tipo de registro!", "bottom", "tipoderegistro");
            }
        });
    });
}

function desenhaModalFJ(nome, id) {
    var options;
    document.querySelector("#faltaJustificadaModal").innerHTML = `
                    <div class="modal-dialog modal-lg" role="document">
                        <div class="modal-content rounded-16px">
                            <div class="modal-header text-center">
                                <div class="d-flex" style="width: 100%;">
                                <div class="flex-grow-1"><span class="font-weight-bold-ergon title">Justificativa de falta (${nome})</span></div>
                                
                                <div>
                                    <a href="" class="close" data-bs-dismiss="modal" aria-label="Close">
                                        <i class="bi bi-x-circle" style="font-size: 1.5rem;"></i>
                                    </a>
                                </div>
                                </div>
                            </div>
                            
                            <div class="modal-body rounded-bottom-16px">
                                <div class="d-flex align-items-start">
                                <div class="nav flex-column nav-pills me-3 border border-1 border-dark rounded-16px" style="height: 50vh" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                                <div class="dataDaFalta-header text-center fw-bold">
                                Data da falta
                                </div>
                                    <button class="nav-link active" id="v-pills-home-tab" data-bs-toggle="pill" data-bs-target="#v-pills-home" type="button" role="tab" aria-controls="v-pills-home" aria-selected="true">12/06/2022</button>
                                    <button class="nav-link" id="v-pills-profile-tab" data-bs-toggle="pill" data-bs-target="#v-pills-profile" type="button" role="tab" aria-controls="v-pills-profile" aria-selected="false">13/06/2022</button>
                                    <button class="nav-link" id="v-pills-messages-tab" data-bs-toggle="pill" data-bs-target="#v-pills-messages" type="button" role="tab" aria-controls="v-pills-messages" aria-selected="false">14/06/2022</button>
                                </div>
                                <div class="tab-content" id="v-pills-tabContent" style="width: 100%;">
                                    
                                    <div class="tab-pane fade show active" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab">
                                    
                                    <div class="d-flex flex-column">
                                        <textarea class="form-control text-start border rounded-16px" placeholder="Escreva aqui o motivo da falta do aluno" id="faltaJustificadaTexto" style="height: 50vh"></textarea>
                                        <div class="d-flex flex-row-reverse">
                                            <button class="btn btn-option btn-shadow mt-2 ms-2" data-bs-dismiss="modal">Cancelar</button>
                                            <button class="btn btn-ergon btn-shadow mt-2" onclick='SalvarFaltaJustificada("${nome}", document.getElementById("faltaJustificadaTexto").value);' data-bs-dismiss="modal">Salvar</button>
                                        </div>
                                    </div>

                                    </div>
                                    
                                    <div class="tab-pane fade" id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-profile-tab">...</div>
                                    
                                    <div class="tab-pane fade" id="v-pills-messages" role="tabpanel" aria-labelledby="v-pills-messages-tab">...</div>
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    `;

                    var myModal = new bootstrap.Modal(document.getElementById('faltaJustificadaModal'), options);
                    myModal.show();
}

function SalvarFaltaJustificada(aluno, msm) {

    var dadosAluno = {"aluno":aluno, "texto":msm};

    swal({
        icon: "success",
        text: `O Aluno ${aluno} ${msm}`
      });

    console.log(dadosAluno);
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