// const d = new Date();
//   function dataHoje(){
//     var Date = d.getDate()+'/'+d.getMonth()+'/'+d.getFullYear()
//     document.getElementById('dataHoje').innerHTML = Date
//   }
  const d = new Date();
  const dataHoje = 
  function dataHoje(){
    var Date =d.getFullYear()
    document.getElementById('dataHoje').innerHTML = Date
  }
  dataHoje();


  function ValidaCPF(){   

    var ao_cpf=document.forms.form1.ao_cpf.value; 
    var cpfValido = /^(([0-9]{3}.[0-9]{3}.[0-9]{3}-[0-9]{2}))$/;     
    if (cpfValido.test(ao_cpf) == false)    { 
        
        ao_cpf = ao_cpf.replace( /\D/g , ""); //Remove tudo o que não é dígito
                    
        if (ao_cpf.length==11){
            ao_cpf = ao_cpf.replace( /(\d{3})(\d)/ , "$1.$2"); //Coloca um ponto entre o terceiro e o quarto dígitos
            ao_cpf = ao_cpf.replace( /(\d{3})(\d)/ , "$1.$2"); //Coloca um ponto entre o terceiro e o quarto dígitos
            //de novo (para o segundo bloco de números)
            ao_cpf = ao_cpf.replace( /(\d{3})(\d{1,2})$/ , "$1-$2"); //Coloca um hífen entre o terceiro e o quarto dígitos
                        
            var valorValido = document.getElementById("ao_cpf").value = ao_cpf;
            }else{
            console.log("CPF invalido");
            }
            
    }
}



/* Função Validar */
function validar() {
    // pegando o valor do nome pelos names
    var cpf = document.getElementById("ao_cpf");
    var senha = document.getElementById("senha");
    var ano = document.getElementById("ano-letivo");
   
  
    // verificar se o nome está vazio
    if (cpf.value == "") {
      alert("cpf não informado");
  
      // Deixa o input com o focus
      cpf.focus();
      // retorna a função e não olha as outras linhas
      return;
    }
    
    if (senha.value == "") {
      alert("Senha não informada");
      senha.focus();
      return;
    }
    if(ano ==""){
        alert("Defina um Ano Letivo")
        ano.focus();
        return;
    }
    alert("login bem Sucedido!");
    // envia o formulário
    //formulario.submit();
  }