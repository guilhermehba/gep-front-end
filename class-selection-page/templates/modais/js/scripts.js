// gerador de numero aleatorio
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

// buscar data do dia atual
  const d = new Date();
  function dataHoje(){
    var Date = '0'+d.getDate()+'/'+'04/'+d.getFullYear()
    document.getElementById('dataHoje').innerHTML = Date
  }
  
// condição para confirmar a exclusão

function confirmarExclusao(){
  var input_code = document.querySelector('#input_code');
  var input_cod = input_code.value
  var hash_cod = document.getElementById('random_numero').innerHTML
  console.log("Valor do Input Code: "+input_cod, "\n", "Valor do Hash Code: "+ hash_cod)
  if(input_cod === hash_cod){
    console.log('Deu Certo')
    
    
      swal({
        icon: "success",
        text: 'Data excluida com Sucesso!',
        buttons:{
          confirm: false
        },
        className: "sucesso-exclusao",
      }); $('#delete_on_confirm_code').modal('hide');
      
     
      }
      else
      swal({
        icon: "warning",
        text:  'Insira o código correto',
        buttons:{
          confirm: false
        },
        className: "Warning-exclusao",
        
      });

  
  

}
// test validation

// test validation
// função para aativar o sweet alert
function acionar() {
    
  swal({
    icon: "success",
    text: 'Data excluida com Sucesso!',
    buttons:{
      confirm: false
    }
  });
}

if(navigator.onLine){
    
} else {
  $('#networkModal').modal({backdrop: 'static'});

  //countdown per seconds
  var timeleft = 30;
  var networkTimer = setInterval(function(){
    if(timeleft <= 0){
      clearInterval(networkTimer);
      setTimeout(function(){
        window.location.reload(1);
      })
    } else {
      document.getElementById("countdown").innerText = timeleft + "s";
    }
    timeleft -= 1;
  }, 1000);
  //countdown per seconds
}