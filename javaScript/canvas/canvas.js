const canvas = document.querySelector("#canvas");
const context = canvas.getContext("2d");

context.beginPath(); // desenhando uma linha
context.moveTo(10, 0);
context.lineTo(50, 200);
context.lineTo(200, 300);
context.stroke();
context.fillRect(50, 50, 150, 100); // desenhando um retângulo
context.strokeRect(250, 50, 150, 100); // desenhando a borda do retângulo
context.beginPath(); // desenhando um círculo
context.arc(250, 250, 50, 0, Math.PI * 2);
context.stroke();