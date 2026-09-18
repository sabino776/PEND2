const pokemonInput = document.getElementById("pokemonInput");
const searchButton = document.getElementById("searchButton");

const status = document.getElementById("status");
const pokemonCard = document.getElementById("pokemonCard");

const pokemonNumber = document.getElementById("pokemonNumber");
const pokemonName = document.getElementById("pokemonName");
const pokemonImage = document.getElementById("pokemonImage");
const pokemonTypes = document.getElementById("pokemonTypes");

const pokemonWeight = document.getElementById("pokemonWeight");
const pokemonHeight = document.getElementById("pokemonHeight");
const pokemonXP = document.getElementById("pokemonXP");
const pokemonAbilities = document.getElementById("pokemonAbilities");


// BOTÃO DE BUSCA
searchButton.addEventListener("click", buscarPokemon);


// PERMITIR PRESSIONAR ENTER
pokemonInput.addEventListener("keydown", function (event) {

    if (event.key === "Enter") {
        buscarPokemon();
    }

});


// FUNÇÃO PRINCIPAL
async function buscarPokemon() {

    const pokemon = pokemonInput.value.trim().toLowerCase();

    // Verificar se o usuário digitou algo
    if (pokemon === "") {

        mostrarErro("Digite o nome ou número de um Pokémon.");

        return;
    }

    // Mostrar carregamento
    status.textContent = "🔄 Buscando Pokémon...";
    pokemonCard.classList.add("hidden");

    try {

        // URL da API
        const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;

        // Fazer requisição para a API
        const resposta = await fetch(url);

        // Verificar se a resposta foi bem-sucedida
        if (!resposta.ok) {

            throw new Error("Pokémon não encontrado.");

        }

        // Converter resposta para JSON
        const dados = await resposta.json();

        // Mostrar os dados na página
        mostrarPokemon(dados);

        status.textContent = "";

    } catch (erro) {

        console.error("Erro:", erro);

        mostrarErro(
            "❌ Pokémon não encontrado. Verifique o nome ou número digitado."
        );

    }

}


// MOSTRAR POKÉMON NO DOM
function mostrarPokemon(dados) {

    pokemonCard.classList.remove("hidden");

    // Nome
    pokemonName.textContent = dados.name;

    // Número
    pokemonNumber.textContent =
        `#${String(dados.id).padStart(3, "0")}`;

    // Imagem
    pokemonImage.src =
        dados.sprites.other["official-artwork"].front_default;

    pokemonImage.alt =
        `Imagem do Pokémon ${dados.name}`;

    // Peso
    pokemonWeight.textContent =
        `${(dados.weight / 10).toFixed(1)} kg`;

    // Altura
    pokemonHeight.textContent =
        `${(dados.height / 10).toFixed(1)} m`;

    // Experiência
    pokemonXP.textContent =
        dados.base_experience;

    // Habilidades
    const habilidades = dados.abilities
        .map((item) => item.ability.name)
        .join(", ");

    pokemonAbilities.textContent = habilidades;

    // TIPOS
    pokemonTypes.innerHTML = "";

    dados.types.forEach((item) => {

        const tipo = document.createElement("span");

        tipo.classList.add("type");

        tipo.textContent = item.type.name;

        pokemonTypes.appendChild(tipo);

    });


    // ESTATÍSTICAS

    const hp = dados.stats[0].base_stat;
    const attack = dados.stats[1].base_stat;
    const defense = dados.stats[2].base_stat;
    const specialAttack = dados.stats[3].base_stat;
    const specialDefense = dados.stats[4].base_stat;
    const speed = dados.stats[5].base_stat;


    // HP
    document.getElementById("hpValue").textContent = hp;

    document.getElementById("hpBar").style.width =
        calcularPorcentagem(hp) + "%";


    // ATAQUE
    document.getElementById("attackValue").textContent = attack;

    document.getElementById("attackBar").style.width =
        calcularPorcentagem(attack) + "%";


    // DEFESA
    document.getElementById("defenseValue").textContent = defense;

    document.getElementById("defenseBar").style.width =
        calcularPorcentagem(defense) + "%";


    // ATAQUE ESPECIAL
    document.getElementById("specialAttackValue").textContent =
        specialAttack;

    document.getElementById("specialAttackBar").style.width =
        calcularPorcentagem(specialAttack) + "%";


    // DEFESA ESPECIAL
    document.getElementById("specialDefenseValue").textContent =
        specialDefense;

    document.getElementById("specialDefenseBar").style.width =
        calcularPorcentagem(specialDefense) + "%";


    // VELOCIDADE
    document.getElementById("speedValue").textContent = speed;

    document.getElementById("speedBar").style.width =
        calcularPorcentagem(speed) + "%";

}


// CALCULAR PORCENTAGEM DA BARRA
function calcularPorcentagem(valor) {

    const maximo = 255;

    let porcentagem = (valor / maximo) * 100;

    if (porcentagem > 100) {
        porcentagem = 100;
    }

    return porcentagem;

}


// MOSTRAR ERRO
function mostrarErro(mensagem) {

    status.textContent = mensagem;

    pokemonCard.classList.add("hidden");

}

