const formulario = document.getElementById("formContato");

formulario.addEventListener("submit", function(event){

    event.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const email = document.getElementById("email").value.trim();

    const mensagem = document.getElementById("mensagem");

    if(nome === "" || email === ""){
        mensagem.style.color = "red";
        mensagem.innerHTML = "Preencha todos os campos!";
        return;
    }

    if(!email.includes("@") || !email.includes(".")){
        mensagem.style.color = "red";
        mensagem.innerHTML = "Digite um e-mail válido!";
        return;
    }

    mensagem.style.color = "green";
    mensagem.innerHTML = `Obrigado pelo contato, ${nome}! Em breve retornaremos para ${email}.`;

    formulario.reset();

});