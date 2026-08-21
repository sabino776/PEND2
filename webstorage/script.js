const nome = document.getElementById("nome");
const salvar = document.getElementById("salvar");
const recuperar = document.getElementById("recuperar");
const remover = document.getElementById("remover");

const resultado = document.getElementById("resultado");


// BOTÃO SALVAR
salvar.addEventListener("click", function() {

    if (nome.value.trim() === "") {
        resultado.textContent = "Digite um nome antes de salvar.";
        return;
    }

    localStorage.setItem("nome", nome.value);

    resultado.textContent = "Nome salvo com sucesso!";
});


// BOTÃO RECUPERAR
recuperar.addEventListener("click", function() {

    const nomeRecuperado = localStorage.getItem("nome");

    if (nomeRecuperado) {
        resultado.textContent = `Nome recuperado: ${nomeRecuperado}`;
        nome.value = nomeRecuperado;
    } else {
        resultado.textContent = "Nenhum nome foi salvo.";
    }

});


// BOTÃO REMOVER
remover.addEventListener("click", function() {

    localStorage.removeItem("nome");

    nome.value = "";

    resultado.textContent = "Nome removido com sucesso.";

});


