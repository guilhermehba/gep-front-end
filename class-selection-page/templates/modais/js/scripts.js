function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }


  const d = new Date();
function acionar() {
    
    swal({
        text: 'Digite o seguinte código 123465 para confirmar.\n Exclusão da frequência do dia: '+d.getDate()+'/'+d.getMonth()+'/'+d.getFullYear()+'',
        content: "input",
        buttons: {
            
            confirmButtonText:"Enviar",
            cancel:"Cancelar",
            
          },
        showLoaderOnConfirm: true,

        preConfirm: (code) => {
            return new Promise((resolve) => {
              setTimeout(() => {
                if (code === '123456') {
                  swal.showValidationError(
                    'Código Inválido.'
                  )
                }
                resolve()
              }, 2000)
            })
          },
          allowOutsideClick: false
        }).then((result) => {
          if (result.value) {
            swal({
              type: 'success',
              title: 'Código Confirmado, exclusão autorizada!',
              
            })
          }
        })
    
}

// Alert With Input Type
function teste (){
  swal("Hello world!", {
    className: "red-bg",
  });
}