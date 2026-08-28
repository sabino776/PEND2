const bola = document.getElementById("bola");

const gol = document.getElementById("gol");

const pontosTexto = document.getElementById("pontos");

const chutesTexto = document.getElementById("chutes");

const mensagem = document.getElementById("mensagem");


let pontos = 0;

let chutes = 0;


// COMEÇAR A ARRASTAR A BOLA

bola.addEventListener("dragstart", function(event) {

    event.dataTransfer.setData(
        "text/plain",
        "bola"
    );

    mensagem.textContent =
        "Solte a bola dentro do gol!";

});


// BOLA PASSANDO PELO GOL

gol.addEventListener("dragover", function(event) {

    event.preventDefault();

    gol.style.transform =
        "translateX(-50%) scale(1.03)";

});


// BOLA SAINDO DO GOL

gol.addEventListener("dragleave", function() {

    gol.style.transform =
        "translateX(-50%) scale(1)";

});


// SOLTAR A BOLA

gol.addEventListener("drop", function(event) {

    event.preventDefault();

    event.stopPropagation();


    gol.style.transform =
        "translateX(-50%) scale(1)";


    // AUMENTA OS CHUTES

    chutes++;

    chutesTexto.textContent =
        chutes;


    // PEGA A POSIÇÃO DA BOLA

    const rect =
        gol.getBoundingClientRect();


    const x =
        event.clientX - rect.left;


    const y =
        event.clientY - rect.top;


    const altura =
        rect.height;


    let pontosGanhos;


    // PARTE DE CIMA

    if (y < altura * 0.35) {

        pontosGanhos = 30;

        mensagem.textContent =
            "🔥 GOLAÇO! +30 pontos!";

    }


    // PARTE CENTRAL

    else if (y < altura * 0.70) {

        pontosGanhos = 20;

        mensagem.textContent =
            "⚽ GOL! +20 pontos!";

    }


    // PARTE DE BAIXO

    else {

        pontosGanhos = 10;

        mensagem.textContent =
            "🥅 Gol! +10 pontos!";

    }


    // SOMAR PONTOS

    pontos += pontosGanhos;

    pontosTexto.textContent =
        pontos;


    // EFEITO

    gol.classList.add("gol-destacado");


    setTimeout(function() {

        gol.classList.remove("gol-destacado");

    }, 600);

});


// SOLTAR FORA DO GOL

document.addEventListener("drop", function(event) {

    if (!gol.contains(event.target)) {

        chutes++;

        chutesTexto.textContent =
            chutes;

        mensagem.textContent =
            "❌ Pra fora! 0 pontos.";

    }

});
