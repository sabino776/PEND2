//classe
class Aluno {
    constructor(nome, idade, curso, matricula) {
        this.nome = nome;
        this.idade = idade;
        this.curso = curso;
        this.matricula = matricula;
    }

    aprender() {
        console.log("O aluno está aprendendo.");
    }

    estudar() {
        console.log("O aluno está estudando.");
    }

    apresentar() {
        console.log("O aluno está se apresentando.");
    }
}

//objetos
const aluno1 = new Aluno("vitor", 18, "Desenvolvimento de Sistemas", "2025001");
console.log("Aluno 1: ", aluno1);

//
const aluno2 = new Aluno("ana", 18, "Eletrotécnica", "2025002");
console.log("Aluno 2: ", aluno2);

//
const aluno3 = new Aluno("Pedro", 16, "Mecânica", "2025003");
console.log("Aluno 3: ", aluno3);

//
console.log("---------------------------------");
console.log("Atributos do aluno 1:");
console.log("- Nome: ", aluno1.nome);
console.log("- Idade: ", aluno1.idade);
console.log("- Curso: ", aluno1.curso);
console.log("- Matrícula: ", aluno1.matricula);
console.log("---------------------------------");

//
console.log("---------------------------------");
console.log("Atributos do aluno 2:");
console.log("- Nome: ", aluno2.nome);
console.log("- Idade: ", aluno2.idade);
console.log("- Curso: ", aluno2.curso);
console.log("- Matrícula: ", aluno2.matricula);
console.log("---------------------------------");

//
console.log("---------------------------------");
console.log("Atributos do aluno 3:");
console.log("- Nome: ", aluno3.nome);
console.log("- Idade: ", aluno3.idade);
console.log("- Curso: ", aluno3.curso);
console.log("- Matrícula: ", aluno3.matricula);
console.log("---------------------------------");

//
aluno1.aprender();

//
aluno2.estudar();

//
aluno3.apresentar();