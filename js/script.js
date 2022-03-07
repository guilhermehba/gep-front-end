function isPhone() {
    $(window).on('load resize', function () {
        if ($(window).width() < 950) {
            window.location = "mobile/attendance-page-mobile.html"
        }
    });
}

isPhone();

var numero = 0;

function somaAula() {
    // var titulo = $(".attendance-legend-title").text();

    if(numero >= 0){
        numero = numero+1;
        document.querySelector( '.lce_number' ).innerHTML = numero;
    }
}

function notificationGEP(msg, position) {
    var html = '<div class="position-fixed '+position+'-0 end-0 p-3" style="z-index: 9999"> <div id="liveToast" class="toast" role="alert" aria-live="assertive" aria-atomic="true"> <div class="toast-header"> <img src="http://teste.ergonsistemas.com.br/gepweb_d.dll/cache/gepweb_e_exe/n0/favicon.ico" class="rounded me-2" alt="logo-ergon"> <strong class="me-auto">GEP</strong> <small>'+ 'Agora' +'</small> <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button> </div> <div class="toast-body"> '+msg+' </div> </div> </div>';

    document.querySelector('.attendance-alert-head').innerHTML += html;
    var toastLiveExample = document.getElementById('liveToast')
    var toast = new bootstrap.Toast(toastLiveExample)
        
    toast.show();
}

function subtrairAula() {
    if(numero <= 0){
        var data = new Date();
        var html = '<div class="position-fixed bottom-0 end-0 p-3" style="z-index: 11"> <div id="liveToast1" class="toast" role="alert" aria-live="assertive" aria-atomic="true"> <div class="toast-header"> <img src="http://teste.ergonsistemas.com.br/gepweb_d.dll/cache/gepweb_e_exe/n0/favicon.ico" class="rounded me-2" alt="logo-ergon"> <strong class="me-auto">GEP</strong> <small>'+ 'Agora' +'</small> <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button> </div> <div class="toast-body"> Operação negada! </div> </div> </div>';

        document.querySelector('.attendance-alert').innerHTML = html;
        var toastLiveExample = document.getElementById('liveToast1')
        var toast = new bootstrap.Toast(toastLiveExample)
        
        toast.show();
    } else{
        numero = numero-1;
        document.querySelector( '.lce_number' ).innerHTML = numero;
    }
}

// var conteudos = ["língua portuguesa", "matemática", "ciência", "história", "geografia"];

// function mostrarConteudos() {
//     for (var i = 0; i < conteudos.length; i++) {
//         document.querySelector('.record-type').innerHTML += conteudos[i];
//     }
// }