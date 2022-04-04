
/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */



/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */

var url = "http://apialuno.ergonsistemas.com.br:7073/SELECT?database=GEP_TESTE&TABELA=V_API_TurmasDiario&FILTRO=cdescola=21145660%20and%20exerc=2018%20and%20cpf='012.311.273-76'";
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Basic Z2VwbW9iaWxlOkAjZ2VwbW9iaWxlI0A=");

        var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow',
        mode: 'no-cors',
        credentials: 'include'
        };

        fetch(url, requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));