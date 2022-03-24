    


function media(){
    
    var nota1 = parseFloat(document.getElementById("nota1").value);
    var nota2 = parseFloat(document.getElementById("nota2").value);
    var nota3 = parseFloat(document.getElementById("nota3").value);
    var nota4 = parseFloat(document.getElementById("nota4").value);

    var situacaoNota = document.getElementById('bg-situacao')
    var barrraNota = document.getElementById('barraNota')
    var nota = document.getElementById('media')
    var situacao = document.getElementById('situacao')
    

 var media = ((nota1 + nota2 + nota3 + nota4)/4).toFixed(1) ;


 if ( media >= 7 ) 
    situacao.innerText = "Aprovado(a)", 
    nota.innerText = media, 
    situacaoNota.style.backgroundColor = '#089944',

    nota.style.borderColor = '#089944',
    nota.style.color = '#089944'

     else 
    if ( media <= 6 ) 
    situacao.innerText = "Reprovado(a)", 
    nota.innerText = media, 
    situacaoNota.style.backgroundColor = '#C20101',

    nota.style.borderColor = ' #C20101',
    nota.style.color = '#C20101'
    
    if (media == 1)
        barrraNota.style.width = '10%',
        barrraNota.style.backgroundColor = '#C20101'
        else
    if (media == 2)
        barrraNota.style.width = '20%',
        barrraNota.style.backgroundColor = '#C20101'
        else
    if (media == 3)
        barrraNota.style.width = '30%',
        barrraNota.style.backgroundColor = '#C20101'
        else
    if (media == 4)
        barrraNota.style.width = '40%',
        barrraNota.style.backgroundColor = '#C20101'
        else
    if (media == 5)
        barrraNota.style.width = '50%',
        barrraNota.style.backgroundColor = '#C20101'
        else
    if (media == 6)
        barrraNota.style.width = '60%',
        barrraNota.style.backgroundColor = '#C20101'
        else
    if (media == 7)
        barrraNota.style.width = '70%',
        barrraNota.style.backgroundColor = '#089944'
        else 
    if (media == 8)
        barrraNota.style.width = '80%',
        barrraNota.style.backgroundColor = '#089944'
        else 
    if (media == 9)
        barrraNota.style.width = '90%',
        barrraNota.style.backgroundColor = '#089944'
        else 
    if (media == 10)
        barrraNota.style.width = '100%',
        barrraNota.style.backgroundColor = '#089944'
    
    

}
// ===========================================================================================================================
function nota1(){
    var nota = document.getElementById('media')
    var nota1 = parseFloat(document.getElementById("nota1").value);
    var barrraNota = document.getElementById('barraNota')

    nota.innerText = nota1
    
}
function nota2(){
    var media = ((nota1 + nota2 + nota3 + nota4)/4).toFixed(1) ;
    var nota1 = parseFloat(document.getElementById("nota1").value);
    var nota2 = parseFloat(document.getElementById("nota2").value);

    document.getElementById('media').innerText = nota1+nota2
    
   

}
function nota3(){
    var media = ((nota1 + nota2 + nota3 + nota4)/4).toFixed(1) ;
    var nota1 = parseFloat(document.getElementById("nota1").value);
    var nota2 = parseFloat(document.getElementById("nota2").value);
    var nota3 = parseFloat(document.getElementById("nota3").value);

    document.getElementById('media').innerText = nota1+nota2+nota3
    


}
