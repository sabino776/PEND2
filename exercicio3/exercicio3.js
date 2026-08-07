//classe
class Produto {
    constructor(nome, preco, estoque) {
        this.nome = nome;
        this.preco = preco;
        this.estoque = estoque;
    }

    vender() {
        console.log("Produto vendido.");
    }

    repor() {
        console.log("Estoque do produto reposto.");
    }

    alterarPreco() {
        console.log("Preço do produto alterado.");
    }
}

//objetos
const produto1 = new Produto("Celular", 3500, 10);
console.log("Produto 1: ", produto1);

//
const produto2 = new Produto("Monitor", 1200, 15);
console.log("Produto 2: ", produto2);

//
const produto3 = new Produto("Fone de Ouvido", 250, 30);
console.log("Produto 3: ", produto3);
//
console.log("---------------------------------");
console.log("Atributos do produto 1:");
console.log("- Nome: ", produto1.nome);
console.log("- Preço: R$", produto1.preco);
console.log("- Estoque: ", produto1.estoque);
console.log("---------------------------------");

//
console.log("---------------------------------");
console.log("Atributos do produto 2:");
console.log("- Nome: ", produto2.nome);
console.log("- Preço: R$", produto2.preco);
console.log("- Estoque: ", produto2.estoque);
console.log("---------------------------------");

//
console.log("---------------------------------");
console.log("Atributos do produto 3:");
console.log("- Nome: ", produto3.nome);
console.log("- Preço: R$", produto3.preco);
console.log("- Estoque: ", produto3.estoque);
console.log("---------------------------------");

produto1.vender();
produto2.repor();
produto3.alterarPreco();