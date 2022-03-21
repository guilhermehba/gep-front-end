function main2() {


    //var url = "http://apialuno.ergonsistemas.com.br:7073/SELECT?database=GEP_TESTE&TABELA=V_API_TurmasDiario&FILTRO=cdescola=21145660 and exerc=2020 and cpf='012.311.273-76'"
    //var url = "http://apialuno.ergonsistemas.com.br:7073/SELECT?database=GEP_TESTE_AUX&TABELA=V_API_TurmasDiario&FILTRO=cdescola=17000000 and exerc=2021 and cpf='648.578.671-68'"
    var url = "http://apialuno.ergonsistemas.com.br:7073/SELECT";
    var listGruposAll = []; // > ================================= dia 18/03
    var listaByGrupo;  // > ================================= dia 18/03
    var dado;
// ======================================================================================================================================================================
    var query = location.search;
    var partes = query.split('&');
    var data = {};
    partes.forEach(function (url) {
        var chaveValor = url.split('=');
        var chave = chaveValor[0]
        var valor = chaveValor[1];
        data[chave] = valor;
    });
    console.log(data);
    // var prof_cpf = data['cpf'];
    // var ano_exerc = data['exerc'];
    // var codescola = data['cdescola'];
    var database = data['?database'];
    var table = data['TABELA'];

// ======================================================================================================================================================================
//  var newURL = `http://apialuno.ergonsistemas.com.br:7073/SELECT?database=${database}&TABELA=${table}&FILTRO=cdescola=${codescola} and exerc=${ano_exerc} and cpf='${prof_cpf}'`;
    var newURL = `http://apialuno.ergonsistemas.com.br:7073/SELECT?database=${database}&TABELA=${table}&FILTRO=cdescola=17000000 and exerc=2021 and cpf='648.578.671-68'`;
// ======================================================================================================================================================================
    console.log("novo url:" + newURL);

// ======================================================================================================================================================================

    const xhttp = new XMLHttpRequest();

    xhttp.onload = async function () {
        dado = await JSON.parse(this.responseText);

        // vvv ================================= dia 18/03
            var groupBy = function(xs, key) {
          return xs.reduce(function(rv, x) {
            (rv[x[key]] = rv[x[key]] || []).push(x);
            return rv;
          }, {});
        };

        listaByGrupo = (groupBy(dado, 'GRUPO'));

        if (this.readyState == 4 && this.status == 200) {

            //Set Up the template
            var s = $("#diarioTemplate")[0].innerHTML.trim();
            var holder = document.createElement('div');
            holder.innerHTML = s;
            var template = holder.childNodes;

            var member = document.getElementById('diario');
            dado.forEach(function (object) {
            // / ======================================================================================================================================================================
                // dado[1]['GRUPO']
               if (grupos = object.GRUPO){
				    console.log("Os Seguintes Grupos possuem diários: " + grupos);
				    listGruposAll.push(grupos);

				}
				
				for (dado[0] in object.GRUPO){
                      
				}
                var newItem = $(template).clone();

                    //Populate it
                    $(newItem).find(".SERIETURMA").html(object.SERIETURMA);
                    $(newItem).find(".DISCIPLINA").html(object.DISCIPLINA);
                    $(newItem).find(".PROFESSOR").html(object.PROFESSOR);
                    $(newItem).find(".CDSERIE").html(object.CDSERIE);
                    
                    //  if (object.STATUSDIARIO == 1) {
                    //     $(newItem).find("#lock_open").html(object.STATUSDIARIO)
                    //  }
                    //  else{
                    //      document.getElementById('#class_lock').innerHTML = 'https';
                    //  }
                    $(newItem).find("#COD").html(object.SEQUENCIAL);
                    $(newItem).find("#BIM_DIASLETDADOS").html(object.BIM_DIASLETDADOS);
                    $(newItem).find("#BIM_DIASLETPREV").html(object.BIM_DIASLETPREV);
                    //Append it

                    
            
                $(".diario").append(newItem);
            // / ======================================================================================================================================================================

                //Clone Template
                var newItem = $(template).clone();

                    //Populate it
                    $(newItem).find(".GRUPO").html(object.GRUPO);
                    $(newItem).find(".SERIETURMA").html(object.SERIETURMA);
                    $(newItem).find(".DISCIPLINA").html(object.DISCIPLINA);
                    $(newItem).find(".PROFESSOR").html(object.PROFESSOR);
                    $(newItem).find(".CDSERIE").html(object.CDSERIE);
                    
                    //  if (object.STATUSDIARIO == 1) {
                    //     $(newItem).find("#lock_open").html(object.STATUSDIARIO)
                    //  }
                    //  else{
                    //      document.getElementById('#class_lock').innerHTML = 'https';
                    //  }
                    $(newItem).find("#COD").html(object.SEQUENCIAL);
                    $(newItem).find("#BIM_DIASLETDADOS").html(object.BIM_DIASLETDADOS);
                    $(newItem).find("#BIM_DIASLETPREV").html(object.BIM_DIASLETPREV);
                    //Append it

                    
            
                $(".diario").append(newItem);

            });

            console.log("it's works");
            console.log(dado[1]);
        } else {
            document.querySelector('.diario').innerHTML += `Deve haver algum erro na requisição. Nenhum diário foi encontrado!`;
        }
    }


    // Send a request
    xhttp.open("GET", newURL);
    xhttp.setRequestHeader("Authorization", "Basic Z2VwbW9iaWxlOkAjZ2VwbW9iaWxlI0A=");
    xhttp.send();
}

main2();
// ======================================================================================================================================================================

/* JS for load another html with Resize Window */


function test() {
    $(window).on('load resize', function () {
        if ($(window).width() < 950) {
            window.location = "class-selection-page/mobile/class-selection-mobile.html"
        }
    });
}

test();
/* JS for load another html with Resize Window - end */
// ======================================================================================================================================================================
/* alter status for 'diario' */
function clicked_on_lock() {
    document.getElementById('class_lock').innerHTML = 'https';
}
/* alter status for 'diario' - end */

// ======================================================================================================================================================================
function notificationGEP(msg, position) {
    var html = '<div class="position-fixed ' + position + '-0 end-0 p-3" style="z-index: 9999"> <div id="liveToast" class="toast" role="alert" aria-live="assertive" aria-atomic="true"> <div class="toast-header"> <img src="http://teste.ergonsistemas.com.br/gepweb_d.dll/cache/gepweb_e_exe/n0/favicon.ico" class="rounded me-2" style="width:20px; height:20px" alt="logo-ergon"> <strong class="me-auto">GEP</strong> <small>' + 'Agora' + '</small> <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button> </div> <div class="toast-body"> ' + msg + ' </div> </div> </div>';

    document.querySelector('.class-selection-alert-head').innerHTML += html;
    var toastLiveExample = document.getElementById('liveToast')
    var toast = new bootstrap.Toast(toastLiveExample)

    toast.show();
}

// ======================================================================================================================================================================
/*
if(navigator.onLine){
    alert('online');
   } else {
    alert('offline');
   }*/
 

