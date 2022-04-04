function main() {
  let url =
    "http://apiprofessor.ergonsistemas.com.br:7073/login?tipo=BANCO&CPF='003.380.853-86'";

  var xhr = new XMLHttpRequest();

  xhr.addEventListener("readystatechange", function () {
    if (this.readyState === 4) {
      console.log(this.responseText);
    }
  });

  xhr.open(
    "GET",
    "http://apialuno.ergonsistemas.com.br:7073/select?database=GEP_TESTE_AUX&TABELA=V_API_TurmasDiario&FILTRO=cdescola=17000000%20and%20exerc=2021%20and%20cpf_coordenador='003.380.853-86'"
  );
  xhr.setRequestHeader(
    "Authorization",
    "Basic Z2VwbW9iaWxlOkAjZ2VwbW9iaWxlI0A="
  );

  xhr.send();
}

var listarBanco = [];
var varListarEscolas = [];

function digitouCpf() {
  let cpf = document.querySelector("#validationCustom01").value;
  let tamanho = cpf.length;

  if (tamanho == 14) {
    listarDB("BANCO", cpf);

    return listarBanco;
  }
}

function listarDB(tipo, cpf) {
  console.log("listando banco de dados");
  var xhr = new XMLHttpRequest();

  xhr.addEventListener("readystatechange", function () {
    if (this.readyState === 4) {
      listarBanco = JSON.parse(this.responseText);
      console.log(listarBanco);

      let seletor = document.querySelector(".form-select.municipio");
      seletor.innerHTML = "";
      //disabled
      if (listarBanco.length == 1) {
        seletor.setAttribute("disabled", true);
      }

      for (const key in listarBanco) {
        seletor.innerHTML += `<option value="${listarBanco[key]["BANCODADOS"]}">${listarBanco[key]["CLIENTE"]}</option>`;
      }
    }
  });

  xhr.open(
    "GET",
    `http://apiprofessor.ergonsistemas.com.br:7073/login?tipo=${tipo}&CPF='003.380.853-86'/login?tipo=BANCO&CPF='${cpf}'`
  );
  xhr.setRequestHeader(
    "Authorization",
    "Basic Z2VwbW9iaWxlOkAjZ2VwbW9iaWxlI0A="
  );

  xhr.send();
}

function listarEscolas(tipo, cpf, database) {
  return new Promise(function (resolve, reject) {
    console.log("listando escolas");
    var xhr = new XMLHttpRequest();
    xhr.open(
      "GET",
      `http://apiprofessor.ergonsistemas.com.br:7073/login?tipo=${tipo}&CPF='${cpf}'&DATABASE=${database}`
    );
    xhr.setRequestHeader(
      "Authorization",
      "Basic Z2VwbW9iaWxlOkAjZ2VwbW9iaWxlI0A="
    );

    xhr.onload = function () {
      if (this.status >= 200 && this.status < 300) {
        resolve(xhr.response);
        varListarEscolas = xhr.response;
      } else {
        reject({
          status: this.status,
          statusText: xhr.statusText,
        });
      }
    };
    xhr.onerror = function () {
      reject({
        status: this.status,
        statusText: xhr.statusText,
      });
    };

    xhr.send();
  });
}

var userValid = {
  CDESCOLA: "",
  ID_GRUPO: "",
  DESCRICAO_GRUPO: "",
  ESCOLA: "",
  COORDENADOR: "",
  PROFESSOR: "",
  NOMEUSER: "",
  SUPORTE: "",
  NOME: "",
  SEXO: "",
};

async function entrar(tipo, cpf, banco, escola, senha) {
  if (tipo != "" && cpf != "" && senha != "" && escola != "" && banco != "") {
    let response = await fazerLogin(tipo, cpf, escola, banco, senha);
    let validacao = JSON.parse(response);
    if (validacao.aviso) {
      // se não passar fazer

      alert(validacao.aviso);
      document.location.reload(true);
    } else {
      // se o usuário passar no login fazer

      validacao.forEach((item) => {
        userValid = {
          CDESCOLA: item.CDESCOLA,
          ID_GRUPO: item.ID_GRUPO,
          DESCRICAO_GRUPO: item.DESCRICAO_GRUPO,
          ESCOLA: item.ESCOLA,
          COORDENADOR: item.COORDENADOR,
          PROFESSOR: item.PROFESSOR,
          NOMEUSER: item.NOMEUSER,
          SUPORTE: item.SUPORTE,
          NOME: item.NOME,
          SEXO: item.SEXO,
        };
      });

      console.log(userValid);

      window.location.href = "/index.html";

      let token =
        Math.random().toString(16).substring(2) +
        Math.random().toString(16).substring(2);
      localStorage.setItem("token", token);

      localStorage.setItem("userLogado", JSON.stringify(userValid));
      localStorage.setItem("escolas", JSON.stringify(arrayEscolas));
    }
  }
}

function fazerLogin(tipo, cpf, cdescola, database, senha) {
  return new Promise(function (resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.open(
      "GET",
      `http://apiprofessor.ergonsistemas.com.br:7073/login?tipo=${tipo}&CPF=${cpf}&CDESCOLA=${cdescola}&DATABASE=${database}&SENHA=${senha}`
    );
    xhr.setRequestHeader(
      "Authorization",
      "Basic Z2VwbW9iaWxlOkAjZ2VwbW9iaWxlI0A="
    );

    xhr.onload = function () {
      if (this.status >= 200 && this.status < 300) {
        resolve(xhr.response);
      } else {
        reject({
          status: this.status,
          statusText: xhr.statusText,
        });
      }
    };
    xhr.onerror = function () {
      reject({
        status: this.status,
        statusText: xhr.statusText,
      });
    };

    xhr.send();
  });
}

function anoLetivo() {
  renderOptionAnoLetivo();
}

function renderOptionAnoLetivo() {
  let getSelect = document.querySelector(".form-select.ano-letivo");

  let anoAtual = new Date().getFullYear();

  getSelect.innerHTML = `<option value="0">${anoAtual}</option>`;
}

async function selecionaEscola(cpf, municipio, senha) {
  let value = await listarEscolas("ESCOLA", cpf.value, municipio.value);

  arrayEscolas = JSON.parse(value);

  return new Promise(function (resolve) {
    document.querySelector("body").innerHTML += `
    <!-- Modal -->
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Selecione a Escola</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <select class="form-select seleciona-escola" aria-label="Default select example">
              <option selected>Escolher a Escola</option>
            </select>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" onclick="entrar('PERFIL', '${cpf.value}', '${municipio.value}', document.querySelector('.form-select.seleciona-escola').value , '${senha.value}')">Selecionar</button>
          </div>
        </div>
      </div>
    </div>
  `;

    let getSelect = document.querySelector(".form-select.seleciona-escola");
    getSelect.innerHTML = "";

    for (const key in arrayEscolas) {
      getSelect.innerHTML += `<option value="${arrayEscolas[key]["CDESCOLA"]}">${arrayEscolas[key]["ESCOLA"]}</option>`;
    }

    var myModal = new bootstrap.Modal(document.getElementById("exampleModal"), {
      keyboard: false,
    });

    myModal.show();

    resolve(true);
  });
}
