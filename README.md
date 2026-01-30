# SEMAFORO-INTELIGENTE
O projeto Semáforo Inteligente foi desenvolvido no SENAI com o objetivo de criar um semáforo inteligente usando IoT. O sistema simula sensores de tráfego e clima, ajusta os tempos dos sinais, trata falhas e prioriza segurança. O projeto aplica programação, redes, SO, segurança e trabalho em equipe. Tudo simples e prático, SENAI top.
<img width="1603" height="1181" alt="Diagrama de sequencia" src="https://github.com/user-attachments/assets/b0192d5c-b863-4f51-986f-e39276787d64" />
<img width="1592" height="1439" alt="diagrama de classe" src="https://github.com/user-attachments/assets/69168297-d141-4179-abc2-881ddffb2001" />
<img width="1142" height="288" alt="requisitos nao funcionais" src="https://github.com/user-attachments/assets/381f07f4-0cda-4287-9ab2-d1b91da8c281" />
<img width="1124" height="608" alt="requisitos funcionais" src="https://github.com/user-attachments/assets/745384df-9bc8-43b0-a4b8-ce934ea2ec42" />
[semaforo.css](https://github.com/user-attachments/files/24972254/semaforo.css)
body,
html {
  display: flex;
  height: 100%;
  width: 100%;
  justify-content: center;
  overflow: hidden;
  align-items: center;
  flex-direction: column;
  gap: 5%;
}

#semaforo {
  background-color: rgb(109, 109, 109);
  display: flex;
  width: 65%;
  height: 40%;
  border-radius: 10px;
  justify-content: space-around;
  padding: 3%;
  box-shadow: 1px 1px 20px rgba(0, 0, 0, 0.35);
}

.luzes {
  border-radius: 100%;
  width: 28%;
  height: auto;
  color: transparent;
}

#amarelo {
  background-color: rgb(255, 255, 48);
}

#vermelho {
  background-color: rgb(255, 48, 48);
}

#verde {
  background-color: rgb(48, 255, 48);
}

.desativado {
  background-color: rgb(189, 189, 189) !important;
}

#controles {
  background-color: rgb(255, 255, 255);
  padding: 1%;
  justify-content: center;
  align-items: center;
  width: 40%;
  height: 20%;
  display: flex;
  flex-direction: row;
  box-shadow: 1px 1px 20px rgba(0, 0, 0, 0.35);
  border-radius: 10px;
}

.sn {
  font-family: "SN Pro", sans-serif;
  font-optical-sizing: auto;
  font-weight: normal;
  font-style: normal;
}

p {
  font-family: "SN Pro", sans-serif;
  font-optical-sizing: auto;
  font-weight: normal;
  font-style: normal;
}

.condicao {
  display: flex;
  flex-direction: column;
  width: fit-content;
  width: 20%;
  height: 100%;
  gap: 10%;
  justify-content: center;
  align-items: center;
  text-align: center;
}

button:hover {
  cursor: pointer;
}

.condicao > button {
  width: 50%;
  text-align: center;
  align-items: center;
  border-radius: 5px;
  border: none;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.45);
  height: 40%;
  font-size: xx-large;
  background-color: white;
}

.alerta {
  width: 30%;
  height: 40%;
  background-color: rgb(189, 189, 189);
  border: none;
  border-radius: 100%;
  display: flex;
  color: transparent;
}

.ativo {
  background-color: rgb(255, 83, 83) !important;
}

#iniciar {
  width: 8%;
  height: 8%;
  box-shadow: 1px 1px 20px rgba(0, 0, 0, 0.35);
  font-size: x-large;
  background-color: white;
  border: none;
  border-radius: 7px;
}
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Semáforo inteligente</title>
    <link rel="stylesheet" href="semaforo.css" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=SN+Pro:ital,wght@0,200..900;1,200..900&display=swap"
      rel="stylesheet"
    />
  </head>
  <body>
    <button id="iniciar" class="sn" onclick="iniciar()">Iniciar</button>
    <section id="semaforo">
      <div id="vermelho" class="luzes"></div>
      <div id="amarelo" class="luzes desativado"></div>
      <div id="verde" class="luzes desativado"></div>
    </section>
    <section id="controles">
      <div class="condicao">
        <button onclick="chuva()">🌧️</button>
        <p>Chuva</p>
        <div id="alertaChuva" class="alerta">A</div>
      </div>
      <div class="condicao">
        <button onclick="transito()">🚗</button>
        <p>Trânsito alto</p>
        <div id="alertaTransito" class="alerta">A</div>
      </div>
      <div class="condicao">
        <button onclick="sensor()">🚨</button>
        <p>Falha no sensor</p>
        <div id="alertaSensor" class="alerta">A</div>
      </div>
      <div class="condicao">
        <button onclick="servidor()">⚠️</button>
        <p>Falha no servidor</p>
        <div id="alertaServidor" class="alerta">A</div>
      </div>
    </section>

    <script src="semaforo.js"></script>
  </body>
</html>
let vermelho = document.getElementById("vermelho");
let amarelo = document.getElementById("amarelo");
let verde = document.getElementById("verde");

let timerCiclo = null;
let timerPisca = null;
let amareloLigado = false;

function getAtivaId() {
  const luzes = document.querySelectorAll(".luzes");
  for (const luz of luzes) {
    if (!luz.classList.contains("desativado")) return luz.id;
  }
  return null;
}

function setSomente(cor) {
  vermelho.classList.add("desativado");
  amarelo.classList.add("desativado");
  verde.classList.add("desativado");

  if (cor === "vermelho") vermelho.classList.remove("desativado");
  if (cor === "amarelo") amarelo.classList.remove("desativado");
  if (cor === "verde") verde.classList.remove("desativado");
}

function pararTimers() {
  if (timerCiclo) clearTimeout(timerCiclo);
  timerCiclo = null;
  if (timerPisca) clearInterval(timerPisca);
  timerPisca = null;
}

function modoSegurancaPiscaAmarelo() {
  vermelho.classList.add("desativado");
  verde.classList.add("desativado");
  amarelo.classList.remove("desativado");
  amareloLigado = true;

  timerPisca = setInterval(() => {
    amareloLigado = !amareloLigado;
    if (amareloLigado) amarelo.classList.remove("desativado");
    else amarelo.classList.add("desativado");
  }, 700);
}

function iniciar() {
  if (sensorAtivo === true) {
    pararTimers();
    modoSegurancaPiscaAmarelo();
    return;
  }

  if (timerPisca) {
    clearInterval(timerPisca);
    timerPisca = null;
  }

  const ativaId = getAtivaId();
  if (!ativaId) setSomente("vermelho");

  const atual = ativaId || "vermelho";

  let tempo;
  if (atual === "verde" && transitoAtivo === true) {
    tempo = 8000;
  } else if (atual === "amarelo" && chuvaAtiva === true) {
    tempo = 3500;
  } else if (atual === "amarelo") {
    tempo = 2000;
  } else {
    tempo = 5000;
  }

  timerCiclo = setTimeout(() => {
    trocarcor(atual);
    iniciar();
  }, tempo);
}

function trocarcor(cor) {
  if (cor == "vermelho") {
    vermelho.classList.add("desativado");
    verde.classList.remove("desativado");
  } else if (cor == "amarelo") {
    amarelo.classList.add("desativado");
    vermelho.classList.remove("desativado");
  } else {
    verde.classList.add("desativado");
    amarelo.classList.remove("desativado");
  }
}

let chuvaAtiva = false;
let transitoAtivo = false;
let sensorAtivo = false;
let servidorAtivo = false;

let alertaChuva = document.getElementById("alertaChuva");
let alertaTransito = document.getElementById("alertaTransito");
let alertaSensor = document.getElementById("alertaSensor");
let alertaServidor = document.getElementById("alertaServidor");

function chuva() {
  if (sensorAtivo === false && servidorAtivo === false && chuvaAtiva === false) {
    chuvaAtiva = true;
    alertaChuva.classList.add("ativo");
  } else if (sensorAtivo === false && servidorAtivo === false && chuvaAtiva === true) {
    chuvaAtiva = false;
    alertaChuva.classList.remove("ativo");
  }
}

function transito() {
  if (sensorAtivo === false && servidorAtivo === false && transitoAtivo === false) {
    transitoAtivo = true;
    alertaTransito.classList.add("ativo");
  } else if (sensorAtivo === false && servidorAtivo === false && transitoAtivo === true) {
    transitoAtivo = false;
    alertaTransito.classList.remove("ativo");
  }
}

function sensor() {
  if (sensorAtivo === false && servidorAtivo === false) {
    sensorAtivo = true;
    transitoAtivo = false;
    chuvaAtiva = false;
    alertaSensor.classList.add("ativo");
    alertaChuva.classList.remove("ativo");
    alertaTransito.classList.remove("ativo");
  } else if (sensorAtivo === true) {
    sensorAtivo = false;
    alertaSensor.classList.remove("ativo");
    iniciar();
  }
}

function servidor() {
  if (sensorAtivo === false && servidorAtivo === false) {
    servidorAtivo = true;
    transitoAtivo = false;
    chuvaAtiva = false;
    alertaServidor.classList.add("ativo");
    alertaChuva.classList.remove("ativo");
    alertaTransito.classList.remove("ativo");
  } else if (servidorAtivo === true) {
    servidorAtivo = false;
    alertaServidor.classList.remove("ativo");
  }
}
