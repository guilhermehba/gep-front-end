var listaByGrupo;  // > ================================= dia 18/03
var dado;

var newURL;

$.getScript("../JS/config.js", function(){

function main3() {

    // ======================================================================================================================================================================
    //  var newURL = `http://apialuno.ergonsistemas.com.br:7073/SELECT?database=${database}&TABELA=${table}&FILTRO=cdescola=${codescola} and exerc=${ano_exerc} and cpf='${prof_cpf}'`;
    newURL = `http://apialuno.ergonsistemas.com.br:7073/select?database=${DATABASE}&TABELA=${TABELA}&FILTRO${FILTRO}`;

    const xhttp = new XMLHttpRequest();

    var tentativa = 1;

    xhttp.onload = async function conection () {


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

            var getSelector = document.querySelector("#demo");

            var render1;
            var render2;

            //listaByGrupo['ATENDIMENTO EDUCACIONAL ESPECIALIZADO - MATUTINO'][0]['BIMESTRE']

            /*
                1 bim  <= data final do 1 bim

                2 bim <= data final do 2 bim e maior que a data final do 1 bim

                3 bim <= data final do 3 bim e maior que a data final do 2 bim
            */

            let bimestreAtual;
            let bimestre1;
            let bimestre2;
            let bimestre3;
            let bimestre4;
            let hoje = new Date().toLocaleDateString();

          
            if (!bimestreAtual) {

            }
            
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

function desenhaSubList(params) {
    var retorno = [];
    for (const key in params) {
        let cont = 0;
        let value1 = params[key]['BIM_DIASLETPREV'];
        let value2 = params[key]['BIM_DIASLETDADOS'];

        var porcentagem = (value2 / value1) * 100;
      
        let id = 0;
        id++
        
        console.log(id)
        var html = `
        <div id="demoCollapse-${id}" class="collapse show">
        <div class="col-md-3 col-diario">
            <div class="card card-erg">
                <div class="card-header border-radios-erg pb-4 pt-1">    
                    <div class="float-start">
                        <span id="SERIETURMA" class="SERIETURMA d-block">${params[key]['SERIETURMA']}</span>
                        &nbsp
                        <span id="COD" class="d-block cod-serie">Cod: ${params[key]['SEQUENCIAL']}</span>
                        <span class="d-block PROFESSOR" id="teacher">${params[key]['PROFESSOR']}</span>
                    </div> 
                    <div id="cont_div3" class="">
                        <span id="class_lock" class="material-icons" data-bs-toggle="modal"
                            data-bs-target="#modal_confirmation">lock_open</span>
                    </div>
                    <div id="cont_div2" class="float-end">
                        <a id="student_icon" class="material-icons" href="class-selection-page/templates/grid-lst/grid-students.html">perm_identity</a>
                        <span id="dot" class="material-icons">&bull;</span><span class="CDSERIE"
                            id="student_count">${params[key]['CDSERIE']}</span>
                    </div>
                </div>
                <div class="card-body pb-0">
                    <div class="card-title"></div>
                        <div class="card-text text-center"><a class="DISCIPLINA" href="attendance-page.html">${params[key]['DISCIPLINA']}</a></div>
                    <div class="col-12"></div>
                    
                </div>
                <div class="card-footer card-footer-ergon bg-white">
                    <div class="aulas-porcentagem">AULAS DADAS X AULAS PREVISTAS</div>
                    <div class="col-12" id="progress_bar">
                        <div class="progress progress-ergon" style="position: relative;">
                            <div id="BIM_DIASLETDADOS" class="progress-bar progress-bar-ergon bg-success" role="progressbar" aria-valuenow="55"
                                aria-valuemin="0" aria-valuemax="100" style="width: ${porcentagem}%;">${params[key]['BIM_DIASLETDADOS']}</div>
                                <span style="position: absolute; top: -4px; right: 12px; font-size: 12px;">${params[key]['BIM_DIASLETPREV']}</span>
                        </div>

                    </div>
                </div>
            </div>
        </div>
        </div>
        `;
        retorno.push(html);
    }
    return retorno;
}

//main3();
// ======================================================================================================================================================================



function test() {
    $(window).on('load resize', function () {
        if ($(window).width() > 950) {
            window.location = "../../new-diario.html"
        }
    });
}

test();

function clicked_on_lock(){
    document.getElementById('class_lock').innerHTML = 'https';
}

function resolution(){
    $(window).on('load resize', function () {
        
        if($(window).width() < 970){

            $(".parte-1").removeClass("col-md-6");
            $(".parte-2").removeClass("col-md-6");
            $(".parte-3").removeClass("col-md-12");


            $(".parte-1").addClass("col-md-12");
            $(".parte-2").addClass("col-md-12");
            $(".parte-3").addClass("col-md-12");

        }
   
        
       
    });
}
resolution();