// ======================================================================================================================================================================
// FAZENDO A LISTAGEM POR GRUPO /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ======================================================================================================================================================================
var listOfGroups = []
listOfGroups.push('ENSINO FUNDAMENTAL ANOS INICIAIS - MATUTINO',
                  'ENSINO FUNDAMENTAL ANOS INICIAIS - VESPERTINO', 
                  'ATENDIMENTO EDUCACIONAL ESPECIALIZADO - MATUTINO', 
                  'Educação Infantil - Creche/ Pré Escola - MATUTINO', 
                  'ENSINO FUNDAMENTAL 6º/9º ANOS - MATUTINO', 
                  'EJA 1º SEGMENTO - NOTURNO');
var listGruposAll = []; // > ================================= dia 18/03
var listaByGrupo;  // > ================================= dia 18/03
var dado;
var Arreios;
// ======================================================================================================================================================================
// FAZENDO A BUSCA NO CORPO DA REQUISIÇÃO ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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
    // console.log(data);

    var database = data['?database'];
    var table = data['TABELA'];

// ======================================================================================================================================================================
    var newURL = `http://apialuno.ergonsistemas.com.br:7073/SELECT?database=${database}&TABELA=${table}&FILTRO=cdescola=17000000 and exerc=2021 and cpf='648.578.671-68'`;
// ======================================================================================================================================================================
// FAZENDO A BUSCA NO CORPO DA REQUISIÇÃO ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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

        listOfGroups = (groupBy(dado, 'GRUPO'));

        // ^^^ ================================= dia 18/03

        if (this.readyState == 4 && this.status == 200) {

            //Set Up the template
            
            // ======================================================================================================================================================================
            // FAZENDO A BUSCA DOS DADOS A SEREM RENDERIZADOS NO TEMPLATE COM ID #diarioTemplate ////////////////////////////////////////////////////////////////////////////////////
            // ======================================================================================================================================================================
            var s = $("#diarioTemplate")[0].innerHTML.trim();
            var holder = document.createElement('div');
            holder.innerHTML = s;
            var template = holder.childNodes;

            var member = document.getElementById('diario');
            dado.forEach(function (object) {
                // ======================================================================================================================================================================
                // FAZENDO A FILTRAGEM E ORGANIZAÇÃO DA BUSCA BASEADO NO CAMPO 'GRUPO' //////////////////////////////////////////////////////////////////////////////////////////////////
                // ======================================================================================================================================================================
               if (grupos = object.GRUPO){
				    // console.log("Os Seguintes Grupos possuem diários: " + grupos);
				    listGruposAll.push(grupos);
                    
                    var newItem = $(template).clone();

                    //Populate it
                    $(newItem).find('.GRUPO').html(object.GRUPO);
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
				}
                
                // / ======================================================================================================================================================================

            });
            
            // console.log(dado[1]);
            console.log(listOfGroups)
        } else {
            document.querySelector('.diario').innerHTML += `Deve haver algum erro na requisição. Nenhum diário foi encontrado!`;
        }
    }


    // Send a request
    xhttp.open("GET", newURL);
    xhttp.setRequestHeader("Authorization", "Basic Z2VwbW9iaWxlOkAjZ2VwbW9iaWxlI0A=");
    xhttp.send();