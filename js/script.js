function isPhone() {
    $(window).on('load resize', function () {
        if ($(window).width() < 450) {
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

function notificationGEP(msg, position, tagName, optionalbg) {
    var html = '<div class="position-fixed '+position+'-0 end-0 p-3" style="z-index: 9999"> <div id="'+tagName+'" class="toast '+optionalbg+'" role="alert" aria-live="assertive" aria-atomic="true"> <div class="toast-header"> <img src="http://teste.ergonsistemas.com.br/gepweb_d.dll/cache/gepweb_e_exe/n0/favicon.ico" class="rounded me-2" alt="logo-ergon"> <strong class="me-auto">GEP </strong> <small>'+ 'Agora' +'</small> <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button> </div> <div class="toast-body"> '+msg+' </div> </div> </div>';

    document.querySelector('.attendance-alert-head').innerHTML += html;
    var toastLiveExample = document.getElementById(tagName)
    var toast = new bootstrap.Toast(toastLiveExample)
        
    toast.show();
    return toast;
}

function alertGEP(msg, position, tagName) {

    var html2 = `
    
    <div class="toast-container position-absolute ${position}-0 end-0 p-3 animation-left-right" style="z-index: 9999">
    <div id="${tagName}" class="toast align-items-center" role="alert" aria-live="assertive" aria-atomic="true">
    
    <div class="d-flex">
        <div class="toast-body text-white">
            ${msg}
        </div>
        <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
    </div>
    </div>
    `;

    document.querySelector('.attendance-alert-head').innerHTML += html2;
    var toastLiveExample = document.getElementById(tagName)
    var toast = new bootstrap.Toast(toastLiveExample)
        
    toast.show();
    return toast;
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


// função de inatividade

function inactivityTime () {
    let time;
    // reset timer
    window.onload = resetTimer;
    document.onmousemove = resetTimer;
    document.onkeydown = resetTimer;
    function doSomething() {
        // do something when user is inactive
        swal('Alerta de inatividade', 'Você está inativo a mais de 5 segundos', 'warning');
        // notificationGEP("Alerta de inatividade!","Você está inativo a mais de 5 segundos", "top", "alertInativid")
    }
    function resetTimer() {
        clearTimeout(time);
        time = setTimeout(doSomething, 900000)
    }

    console.log("tempo" + time);
};

inactivityTime();