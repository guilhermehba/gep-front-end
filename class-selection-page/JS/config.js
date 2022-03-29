// busca de parametros na url
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

    var DATABASE = data['?database'];
    var TABELA = data['TABELA'];
    
// busca de parametros na url
// ==============================
// ============query's===========
// ==============================
// parametros url filtro
var query_filter = location.search;
var partes_filter = query_filter.split('%20');
var filt = {};
partes_filter.forEach(function (url) {
    var PTValor = url.split('=');
    var PT1 = PTValor[0]
    var PT2 = PTValor[1];
    filt[PT1] = PT2;
});
console.log(filt);

var prof_cpf = filt['cpf']

var exerc = filt['exerc'];

var bim = filt['bimestre'];
// parametros url filtro



// condicional para carregamento por bimestre
