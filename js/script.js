if (localStorage.getItem("token") == null) {
  alert("Você precisa estar logado para acessar essa página");
  window.location.href = "/login-v3.html?#";
}

function sair() {
  localStorage.removeItem("token");
  window.location.href = "/login-v3.html?#";
}

function media1017() {
  var tamanho = 0;
  $(window).on("load resize", function () {
    if ($(window).width() < 1017) {
      console.log("celular");
    } else if ($(window).width() < 1434) {
      $(".tamanhoModalPequeno").removeClass("modal-lg");

      $(".sidebar-home-link").addClass("p-2");

      console.log("monitor pequeno");
    } else if ($(window).width() > 1434) {
      console.log("monitor normal");
    }
  });
}

media1017();

function isPhone() {
  $(window).on("load resize", function () {
    if ($(window).width() < 450) {
      window.location = "mobile/attendance-page-mobile.html";
    }
  });
}

isPhone();

function notificationGEP(msg, position, tagName, optionalbg) {
  var html =
    '<div class="position-fixed ' +
    position +
    '-0 end-0 p-3" style="z-index: 9999"> <div id="' +
    tagName +
    '" class="toast ' +
    optionalbg +
    '" role="alert" aria-live="assertive" aria-atomic="true"> <div class="toast-header"> <img src="http://teste.ergonsistemas.com.br/gepweb_d.dll/cache/gepweb_e_exe/n0/favicon.ico" class="rounded me-2" alt="logo-ergon"> <strong class="me-auto">GEP </strong> <small>' +
    "Agora" +
    '</small> <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button> </div> <div class="toast-body"> ' +
    msg +
    " </div> </div> </div>";

  document.querySelector(".attendance-alert-head").innerHTML += html;
  var toastLiveExample = document.getElementById(tagName);
  var toast = new bootstrap.Toast(toastLiveExample);

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

  document.querySelector(".attendance-alert-head").innerHTML += html2;
  var toastLiveExample = document.getElementById(tagName);
  var toast = new bootstrap.Toast(toastLiveExample);

  toast.show();
  return toast;
}

var numero = 0;

function somaAula() {
  // var titulo = $(".attendance-legend-title").text();

  if (numero >= 0) {
    numero = numero + 1;
    document.querySelector(".lce_number").innerHTML = numero;
  }
  nextContentModal();
}

function subtrairAula() {
  if (numero <= 0) {
    var html =
      '<div class="position-fixed bottom-0 end-0 p-3" style="z-index: 11"> <div id="liveToast1" class="toast" role="alert" aria-live="assertive" aria-atomic="true"> <div class="toast-header"> <img src="http://teste.ergonsistemas.com.br/gepweb_d.dll/cache/gepweb_e_exe/n0/favicon.ico" class="rounded me-2" alt="logo-ergon"> <strong class="me-auto">GEP</strong> <small>' +
      "Agora" +
      '</small> <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button> </div> <div class="toast-body"> Operação negada! </div> </div> </div>';

    document.querySelector(".attendance-alert").innerHTML = html;
    var toastLiveExample = document.getElementById("liveToast1");
    var toast = new bootstrap.Toast(toastLiveExample);

    toast.show();
  } else {
    numero = numero - 1;
    document.querySelector(".lce_number").innerHTML = numero;
  }

  nextContentModal();
}

function nextContentModal() {
  if (numero == 0) {
    $(
      "button.btn.btn-ergon.btn-ergon-modal-large.btn-shadow.nextContentModal"
    ).addClass("btn-disable");
    $(
      "button.btn.btn-ergon.btn-ergon-modal-large.btn-shadow.nextContentModal"
    ).attr("disabled", true);
  } else {
    $(
      "button.btn.btn-ergon.btn-ergon-modal-large.btn-shadow.nextContentModal"
    ).removeClass("btn-disable");
    $(
      "button.btn.btn-ergon.btn-ergon-modal-large.btn-shadow.nextContentModal"
    ).attr("disabled", false);
  }
}

// adicionar conteúdo
function renderTextArea() {
  var $preview, editor, mobileToolbar, toolbar;
  Simditor.locale = "en-US";
  toolbar = [
    "title",
    "bold",
    "italic",
    "underline",
    "strikethrough",
    "fontScale",
    "color",
    "|",
    "ol",
    "ul",
    "blockquote",
    "code",
    "table",
    "|",
    "link",
    "image",
    "hr",
    "|",
    "indent",
    "outdent",
    "alignment",
  ];
  mobileToolbar = ["bold", "underline", "strikethrough", "color", "ul", "ol"];

  var editor1 = new Simditor({
    textarea: $("#editor1"),
    placeholder: "Digite o conteúdo",
    toolbar: toolbar,
    pasteImage: true,
    defaultImage: "assets/images/image.png",
    upload:
      location.search === "?upload"
        ? {
            url: "/upload",
          }
        : false,
    //optional options
  });
  var editor2 = new Simditor({
    textarea: $("#editor2"),
    placeholder: "Digite o conteúdo",
    toolbar: toolbar,
    pasteImage: true,
    defaultImage: "assets/images/image.png",
    upload:
      location.search === "?upload"
        ? {
            url: "/upload",
          }
        : false,
    //optional options
  });
  var editor3 = new Simditor({
    textarea: $("#editor3"),
    placeholder: "Digite o conteúdo",
    toolbar: toolbar,
    pasteImage: true,
    defaultImage: "assets/images/image.png",
    upload:
      location.search === "?upload"
        ? {
            url: "/upload",
          }
        : false,
    //optional options
  });
}

// função de inatividade
function inactivityTime() {
  let time;
  // reset timer
  window.onload = resetTimer;
  document.onmousemove = resetTimer;
  document.onkeydown = resetTimer;
  function doSomething() {
    // do something when user is inactive
    swal(
      "Alerta de inatividade",
      "Você está inativo a mais de 5 segundos",
      "warning"
    );
    // notificationGEP("Alerta de inatividade!","Você está inativo a mais de 5 segundos", "top", "alertInativid")
  }
  function resetTimer() {
    clearTimeout(time);
    time = setTimeout(doSomething, 900000);
  }
}

inactivityTime();

// calcular faltas e presenças
function calcularFaltasEPresencas() {
  var msg = `Recalcular faltas da disciplina ARTE|EDUCAÇÃO FÍSICA|HISTÓRIA 3º ANO A - MATUTINO`;
  swal({
    icon: "warning",
    text: msg,
    buttons: {
      confirm: "Sim",
      cancel: "Não",
    },
  }).then((willDelete) => {
    if (willDelete) {
      swal("Poof! Total de  falta e presença atualizado!", {
        icon: "success",
        className: "confirmAtualizado",
      });
    } else {
      swal("Operação cancelada!");
    }
  });
}