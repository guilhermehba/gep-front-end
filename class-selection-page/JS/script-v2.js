var listaByGrupo;  // > ================================= dia 18/03
var dado;

var newURL;


function clicouSelect(bimestre) {
            //alert(valor);
            

            
       
    $.getScript("class-selection-page/JS/config.js",function projeto(){
        
        function main3() {

            // ======================================================================================================================================================================
            //  var newURL = `http://apialuno.ergonsistemas.com.br:7073/SELECT?database=${database}&TABELA=${table}&FILTRO=cdescola=${codescola} and exerc=${ano_exerc} and cpf='${prof_cpf}'`;
            newURL = `http://apialuno.ergonsistemas.com.br:7073/select?database=${DATABASE}&TABELA=${TABELA}&FILTRO=cdescola=17000000 and exerc=2021 and cpf='648.578.671-68' and bimestre=${bimestre}`;
            console.log(newURL)
            const xhttp = new XMLHttpRequest();

            var tentativa = 1;

            xhttp.onload = async function conection () {

                var getSelector = document.querySelector("#demo");

                //alert(newURL)

                getSelector.innerHTML = "";

                // ^^^ ================================= dia 18/03

                console.log("code: " + this.status);

                if (this.readyState == 4 && this.status == 200) {

                    dado = await JSON.parse(this.responseText);

                    if(dado.length == 0){
                        console.log("not found!");
                    }

                    // vvv ================================= dia 18/03
                    var groupBy = function (xs, key) {
                        return xs.reduce(function (rv, x) {
                            (rv[x[key]] = rv[x[key]] || []).push(x);
                            return rv;
                        }, {});
                    };

                    listaByGrupo = (groupBy(dado, 'GRUPO'));

                    var render1;
                    var render2;

                    //listaByGrupo['ATENDIMENTO EDUCACIONAL ESPECIALIZADO - MATUTINO'][0]['BIMESTRE']

                    /*
                        1 bim  <= data final do 1 bim

                        2 bim <= data final do 2 bim e maior que a data final do 1 bim

                        3 bim <= data final do 3 bim e maior que a data final do 2 bim
                    */

                    let bimestreAtual;
                    let bimestre1 = document.getElementById('bimestre1');
                    let bimestre2 = document.getElementById('bimestre2');
                    let bimestre3 = document.getElementById('bimestre3');
                    let bimestre4 = document.getElementById('bimestre4');
                    let hoje = new Date().toLocaleDateString();

                
                    
                    for (const key in listaByGrupo) {


                    let target = 0;
                    target++
                    
                        render1 = `
                        <div class="row diario">
                        <div class="new-grupo col-12 row" data-bs-toggle="collapse" data-bs-target="#demoCollapse-${target}" onclick="collapseGrupo()"><span id="GRUPO" class="col-6 GRUPO">${key}</span></div>
                        `;
                        
                        render2 = desenhaSubList(listaByGrupo[key]).join('') + `</div>`;
                        
                        getSelector.innerHTML += render1 + render2;
                    }
                    
                    console.log("it's works");
                    console.log(dado[1]);
                }
                else if (this.status == 424) {
                    swal({
                        icon: "error",
                        title: "erro 424",
                        text: "Código de resposta desconhecido! tentando reconectar em " + i,
                        confirm: false
                    });

                    // erro 424 Código de resposta desconhecido
                    var counter = 0;

                    var i = setInterval(function () {
                        // do your thing
                        counter++;
                        if (counter === 10) {
                            clearInterval(i);
                        }
                    }, 5000);

                } else {
                    var x = 5;
                    swal({
                        icon: "error",
                        title: "Ops! Algo não está funcionando muito bem.",
                        text: " ",
                        timer: 6000,
                        confirm: false
                    });

                    document.querySelector(".swal-text").innerHTML = "tentando reconectar em "+(x)+"<br> tentativa "+tentativa;

                    var y = setInterval(myTimer, 1000);

                    function myTimer() {
                        document.querySelector(".swal-text").innerHTML = "tentando reconectar em "+(x--)+"<br> tentativa "+tentativa;
                    }

                    //var counter = 2;
                    var i = setInterval(function () {
                        // do your thing
                        x=5;
                        
                        if (tentativa === 3) {
                            clearInterval(i);
                            clearInterval(y);
                            swal({
                                icon: "error",
                                title: "Ops! Algo não está funcionando muito bem.",
                                text: "A requisição falhou",
                                confirm: false
                            });
                        }else{
                            tentativa++;
                            console.log(tentativa);
                            conection();
                        }
                    }, 6000);
                }
            }


            // Send a request
            xhttp.open("GET", newURL);
            xhttp.setRequestHeader("Authorization", "Basic Z2VwbW9iaWxlOkAjZ2VwbW9iaWxlI0A=");
            xhttp.send();
        }

        main3()
    });
}
function desenhaSubList(params) {
    var retorno = [];
    for (const key in params) {
        let cont = 0;
        let value1 = params[key]['BIM_DIASLETPREV'];
        let value2 = params[key]['BIM_DIASLETDADOS'];

        var porcentagem = (value2 / value1) * 100;

        let id = 0;
        if(id == id){
        id++
    }
        console.log(id)
        var html = `
        <div id="demoCollapse-${id}" class="collapse show">
        
        <div class="card new-card-diario">

        <div class="d-flex flex-row grupo-geral">

        <div class="p-2 d-flex flex-row bd-highlight grupo1 flex-fill">
            <div id="icon-ergon-lock" class="icon-ergon" title="${params[key]['STATUS']}">lock_open</div>
            <div class="d-flex flex-row ">
            <div class="flex-fill marcadores">&bull;</div>
            <div class="p-2 flex-fill parte-1 new-SERIETURMA">
                ${params[key]['SERIETURMA']}
            </div>
            <div class="flex-fill marcadores">&bull;</div>
            <div class="p-2 flex-fill parte-2 new-SEQUENCIAL" title="Código sequencial deste diário">
                ${params[key]['SEQUENCIAL']}
            </div>
            <div class="flex-fill marcadores">&bull;</div>
                <a class="bd-highlight d-flex flex-row flex-fill btn btn-alunos" href="class-selection-page/templates/grid-lst/grid-students.html">
                    <div class="flex-fill icons-conjunto-alunos">perm_identity</div>
                    <div class="p-2 flex-fill icons-conjunto-ponto">&bull;</div>
                    <div class="flex-fill contador-alunos parte-3 icons-conjunto-valor" title="Quantidade de Alunos Matriculados">
                        ${params[key]['LOTACAO']}
                    </div>
                </a>
            </div>

        </div>
        <div class="d-flex flex-row grupo2 col-4">
            <div class="p-2 flex-fill marcadores">&bull;</div>
            <a href="attendance-page.html" class="p-3 d-flex flex-fill bd-highlight new-disciplinas" title="${params[key]['DISCIPLINA']}">
                ${params[key]['DISCIPLINA']}
            </a>
        </div>

        <div class="grupo3 col-4">
            <div class="d-flex p-1 align-items-baseline ">
            <div class="d-flex bd-highlight marcadores">&bull;</div>
                <div class="d-flex">
                    <div class="new-progress">
                    <div class="progress" title="Aulas Dadas x Aulas Previstas" style="background: #E0E0DE; border-radius: 50px">
                        <div class="progress-bar bg-success" role="progressbar" style="width: ${porcentagem}%; border-radius: 0 20px 20px 0;" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
                            <a id="cont-prog" class="contador-progress" style="text-align: right;">
                                ${value2}/${value1} &nbsp 
                            </a>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
            <div class="card-footer">
                <div><a class="new-professor">${params[key]['PROFESSOR']} - <span class="new-professor-cpf">${params[key]['CPF']}</span></a></div>
            </div>
        </div>
    
        
        

        `;
        retorno.push(html);
    }
    return retorno;
}

//main3();
// ======================================================================================================================================================================
