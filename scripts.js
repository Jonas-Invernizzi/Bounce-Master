const body = document.body;
const bola = document.getElementById('circulo');
const barra = document.getElementById('barra');

const pontosTXT = document.getElementById('pontos');
const maximoTXT = document.getElementById('maximo');

const WIDTH = 600;
const HEIGHT = 300;
const WIDTH_BARRA = 100;
const RAIO = 25;

let pontos = 0;
let pontosMax = 0;

let barraX = 250;
let bolaX = 300;
let bolaY = 80;

let velocidade = 3;
let direcaoX = 1;
let direcaoY = 1;

let controleId = null;
let jogoAtivo = true;

body.addEventListener("keydown", (e) => {
    if (!jogoAtivo) return;
    if (e.code === "ArrowRight") moverDireita();
    if (e.code === "ArrowLeft") moverEsquerda();
});

function moverDireita() {
    if (barraX + WIDTH_BARRA < WIDTH) {
        barraX += 10;
        barra.setAttribute("x", barraX);
    }
}

function moverEsquerda() {
    if (barraX > 0) {
        barraX -= 10;
        barra.setAttribute("x", barraX);
    }
}

function atualizaPontos() {
    pontos++;
    pontosTXT.innerText = "Pontuação: " + pontos;

    if (pontos > pontosMax) {
        pontosMax = pontos;
        maximoTXT.innerText = "Pontuação Máxima: " + pontosMax;
    }
}

function verificaColisao() {
    if (bolaY + RAIO < 290) return;

    if (bolaX >= barraX && bolaX <= barraX + WIDTH_BARRA) {
        atualizaPontos();
        direcaoY *= -1;
        velocidade += 0.25;
        return;
    }

    perderJogo();
}

function perderJogo() {
    clearInterval(controleId);
    jogoAtivo = false;

    bola.style.display = "none";

    if (pontos > pontosMax) {
        pontosMax = pontos;
        maximoTXT.innerText = "Pontuação Máxima: " + pontosMax;
    }
}

function novoJogo() {
    clearInterval(controleId);
    jogoAtivo = true;

    pontos = 0;
    pontosTXT.innerText = "Pontuação: 0";

    barraX = 250;
    bolaX = 300;
    bolaY = 80;
    velocidade = 3;
    direcaoX = 1;
    direcaoY = 1;

    barra.setAttribute("x", barraX);
    bola.setAttribute("cx", bolaX);
    bola.setAttribute("cy", bolaY);
    bola.style.display = "block";

    controleId = setInterval(() => {
        if (bolaX >= WIDTH - RAIO || bolaX <= RAIO) direcaoX *= -1;
        if (bolaY <= RAIO) direcaoY *= -1;

        bolaX += direcaoX * velocidade;
        bolaY += direcaoY * velocidade;

        verificaColisao();

        bola.setAttribute("cx", bolaX);
        bola.setAttribute("cy", bolaY);
    }, 50);
}

novoJogo();
