function test() {
    $(window).on('load resize', function () {
        if ($(window).width() < 950) {
            window.location = "class-selection-page/mobile/class-selection-mobile.html"
        }
    });
}

test();
/* JS for load another html with Resize Window - end */
/* alter status for 'diario' */
function clicked_on_lock() {
    document.getElementById('class_lock').innerHTML = 'https';
}
/* alter status for 'diario' - end */


function notificationGEP(msg, position) {
    var html = '<div class="position-fixed ' + position + '-0 end-0 p-3" style="z-index: 9999"> <div id="liveToast" class="toast" role="alert" aria-live="assertive" aria-atomic="true"> <div class="toast-header"> <img src="http://teste.ergonsistemas.com.br/gepweb_d.dll/cache/gepweb_e_exe/n0/favicon.ico" class="rounded me-2" style="width:20px; height:20px" alt="logo-ergon"> <strong class="me-auto">GEP</strong> <small>' + 'Agora' + '</small> <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button> </div> <div class="toast-body"> ' + msg + ' </div> </div> </div>';

    document.querySelector('.class-selection-alert-head').innerHTML += html;
    var toastLiveExample = document.getElementById('liveToast')
    var toast = new bootstrap.Toast(toastLiveExample)

    toast.show();
}

/* =============================== 
if(navigator.onLine){
    alert('online');
   } else {
    alert('offline');
   }*/

   function clicked_on_lock() {
    document.getElementById('icon-ergon-lock').innerHTML = 'https';
}


function collapseGrupo(){
    var seta = document.getElementById('icon-ergon-collapse')
    
    if(seta.innerHTML = 'arrow_drop_down'){
        document.getElementById('icon-ergon-collapse').innerHTML = 'arrow_drop_up';
    }

}
function collapseGrupo2(){
    var seta = document.getElementById('icon-ergon-collapse')
    
    if(seta.innerHTML = 'arrow_drop_up'){
        document.getElementById('icon-ergon-collapse').innerHTML = 'arrow_drop_down';
    }

}