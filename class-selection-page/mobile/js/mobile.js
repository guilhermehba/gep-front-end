function main2() {
    var url = "http://apialuno.ergonsistemas.com.br:7073/SELECT?database=GEP_TESTE&TABELA=V_API_TurmasDiario&FILTRO=cdescola=21145660 and exerc=2018 and cpf='012.311.273-76'"
    var postData;

    const xhttp = new XMLHttpRequest();

    xhttp.onload = async function () {
        var dado = await JSON.parse(this.responseText);
        // var aluno = alunos['CDESCOLA'];
        if (this.readyState == 4 && this.status == 200) {

            //Set Up the template
            var s = $("#diarioTemplate")[0].innerHTML.trim();
            var holder = document.createElement('div');
            holder.innerHTML = s;
            var template = holder.childNodes;

            var member = document.getElementById('diario');
            dado.forEach(function (object) {

                //Clone Template
                var newItem = $(template).clone();
                //Populate it
                $(newItem).find(".SERIETURMA").html(object.SERIETURMA);
                $(newItem).find(".DISCIPLINA").html(object.DISCIPLINA);
                $(newItem).find(".PROFESSOR").html(object.PROFESSOR);
                $(newItem).find(".CDSERIE").html(object.CDSERIE);
                //Append it

                $(".diario").append(newItem);

            });

            console.log("it's works");
            console.log(dado[1]);
        } else {
            document.querySelector('.diario').innerHTML += `
            Problem
        `;
        }
    }

    // Send a request
    xhttp.open("GET", url);
    xhttp.setRequestHeader("Authorization", "Basic Z2VwbW9iaWxlOkAjZ2VwbW9iaWxlI0A=");
    xhttp.send();
}

main2();


function test() {
    $(window).on('load resize', function () {
        if ($(window).width() > 950) {
            window.location = "../../class-selection.html"
        }
    });
}

test();

function clicked_on_lock(){
    document.getElementById('class_lock').innerHTML = 'https';
}