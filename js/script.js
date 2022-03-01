var numero = 1;

function somaAula() {
    // var titulo = $(".attendance-legend-title").text();

    if(numero >= 1){
        numero = numero+1;
        document.querySelector( '.lce_number' ).innerHTML = numero;
    }
}

function subtrairAula() {
    if(numero <= 1){
        var data = new Date();
        var html = '<div class="position-fixed bottom-0 end-0 p-3" style="z-index: 11"> <div id="liveToast" class="toast" role="alert" aria-live="assertive" aria-atomic="true"> <div class="toast-header"> <img src="http://teste.ergonsistemas.com.br/gepweb_d.dll/cache/gepweb_e_exe/n0/favicon.ico" class="rounded me-2" alt="logo-ergon"> <strong class="me-auto">GEP</strong> <small>'+ 'Agora' +'</small> <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button> </div> <div class="toast-body"> Operação negada! </div> </div> </div>';

        document.querySelector('.attendance-alert').innerHTML = html;
        var toastLiveExample = document.getElementById('liveToast')
        var toast = new bootstrap.Toast(toastLiveExample)
        
        toast.show();
    } else{
        numero = numero-1;
        document.querySelector( '.lce_number' ).innerHTML = numero;
    }
}