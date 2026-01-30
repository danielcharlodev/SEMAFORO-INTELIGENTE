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
