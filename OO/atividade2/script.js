class Produto {

    constructor(nome, preco, categoria, desconto) {
        this.nome = nome;
        this.preco = preco;
        this.categoria = categoria;
        this.desconto = desconto;
    }

    aplicarDesconto() {
        return this.preco - (this.preco * this.desconto / 100);
    }

    exibir(indice) {

        let precoComDesconto = this.aplicarDesconto();

        return `
            <div class="produto">
                <h2>${this.nome}</h2>

                <p><strong>Preço:</strong> 
                R$ ${precoComDesconto.toFixed(2)}</p>

                <p><strong>Categoria:</strong> 
                ${this.categoria}</p>

                <p><strong>Desconto:</strong> 
                ${this.desconto}%</p>

                <button onclick="excluirProduto(${indice})">
                    Excluir
                </button>
            </div>
        `;
    }
}

const produtos = [];

const formulario = document.getElementById("formProduto");
const resultado = document.getElementById("resultado");

const produtosSalvos = JSON.parse(localStorage.getItem("produtos"));

if (produtosSalvos) {

    produtosSalvos.forEach(function(produto) {

        produtos.push(
            new Produto(
                produto.nome,
                produto.preco,
                produto.categoria,
                produto.desconto
            )
        );

    });

    mostrarProdutos();
}

formulario.addEventListener("submit", function(event) {

    event.preventDefault();

    const nome = document.getElementById("nome").value;

    const preco = Number(
        document.getElementById("preco").value
    );

    const categoria = document.getElementById("categoria").value;

    const desconto = Number(
        document.getElementById("desconto").value
    );


    const produto = new Produto(
        nome,
        preco,
        categoria,
        desconto
    );

    produtos.push(produto);

    localStorage.setItem(
        "produtos",
        JSON.stringify(produtos)
    );


    mostrarProdutos();

    formulario.reset();
});

function mostrarProdutos() {

    resultado.innerHTML = "";

    produtos.forEach(function(produto, indice) {

        resultado.innerHTML += produto.exibir(indice);

    });
}

function excluirProduto(indice) {

    produtos.splice(indice, 1);

    localStorage.setItem(
        "produtos",
        JSON.stringify(produtos)
    );


    mostrarProdutos();
}