//objeto:
//celular

//atributos:
//marca, modelo, cor, gb

//metodos:
//ligar, desligar, reiniciar,abrir aplicativo

//classe
class Celular {
    constructor(marca, modelo, cor, gb) {
        this.marca = marca;
        this.modelo = modelo;
        this.cor = cor;
        this.gb = gb;
    }

    ligar() {
        console.log("Celular ligado.");
    }

    desligar() {
        console.log("Celular desligado.");
    }

    reiniciar() {
        console.log("Celular reiniciando...");
    }
    abrirAplicativo(app) {
        console.log(`Abrindo o aplicativo ${app}...`);
    }
}

//objetos
const celular1 = new Celular("Samsung", "Galaxy S21", "Preto" , "256GB");
console.log("Celular 1: ", celular1);

//
const celular2 = new Celular("Apple", "iPhone 17", "Azul-intenso" , "512GB");
console.log("Celular 2: ", celular2);

// 
const celular3 = new Celular("Xiaomi", "Redmi Note 10", "Verde" , "128GB");
console.log("Celular 3: ", celular3);

//
console.log("---------------------------------");
console.log("Atributos do celular 1:");
console.log("- Marca: ", celular1.marca);
console.log("- Modelo: ", celular1.modelo);
console.log("- Cor: ", celular1.cor);
console.log("- gb: ", celular1.gb);
console.log("---------------------------------");

//
console.log("---------------------------------");
console.log("Atributos do celular 2:");
console.log("- Marca: ", celular2.marca);
console.log("- Modelo: ", celular2.modelo);
console.log("- Cor: ", celular2.cor);
console.log("- gb: ", celular2.gb);
console.log("---------------------------------");

//
console.log("---------------------------------");
console.log("Atributos do celular 3:");
console.log("- Marca: ", celular3.marca);
console.log("- Modelo: ", celular3.modelo);
console.log("- Cor: ", celular3.cor);
console.log("- gb: ", celular3.gb);
console.log("---------------------------------");

//
celular1.ligar();

//
celular1.abrirAplicativo("WhatsApp");

//
celular1.reiniciar();

//
celular2.ligar();

//
celular2.abrirAplicativo("Instagram");

//
celular2.reiniciar();

//
celular3.ligar();

//
celular3.abrirAplicativo("TikTok");

//
celular3.reiniciar();





