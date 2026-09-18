const botão = document.querySelector("#buscarUsuarios");
const resultado = document.querySelector("#resultado");
const idUsuario = document.querySelector("#idUsuario");

botão.addEventListener("click", async () => {

    const id = idUsuario.value;

    if (id === "") {
        resultado.innerHTML = "Digite um ID";
        return;
    }

    try {

        const resposta = await fetch(
            `https://jsonplaceholder.typicode.com/users/${id}`
        );

        const dados = await resposta.json();

        resultado.innerHTML = `
            <p>
                <strong>${dados.name}</strong><br>
                Email: ${dados.email}<br>
                Cidade: ${dados.address.city}<br>
                Telefone: ${dados.phone}<br>   
            </p>
            <hr>
        `;

    } catch (error) {
        resultado.innerHTML = "Ocorreu um erro ao buscar os dados.";
        console.log(error);
    }
});



//         const resposta = await fetch(
//             "https://jsonplaceholder.typicode.com/users"
//         );

//         const dados = await resposta.json();

//         resultado.innerHTML = "";
//         dados.forEach(usuario => {
//             resultado.innerHTML += `
//             <p>
//                 <strong>Nome:</strong> ${usuario.name} <br>
//             </p>
//             <hr>
//         `;
//         });
//     } catch (error) {
//         resultado.innerHTML = "Ocorreu um erro ao buscar os dados.";
//         console.log(error);
//     }
// });


//     fetch("https://jsonplaceholder.typicode.com/users")
//         .then(response => response.json())
//         .then(dados => {
//             resultado.innerHTML = "";
//             dados.forEach(usuario => {
//                 resultado.innerHTML += `
//             <p>
//                 <strong>Nome:</strong> ${usuario.name} <br>
//             </p>
//             <hr>
//         `;
//             })
//                 .catch(error => {
//                     resultado.innerHTML = "Ocorreu um erro ao buscar os dados.";
//                     console.log("Erro", error);
//                 });
//         });
// });

