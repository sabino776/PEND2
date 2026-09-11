const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");

context.lineWidth = 5;
context.lineCap = "round";
context.lineJoin = "round"
// CABEÇA MEIO TORTA
context.beginPath();
context.arc(335, 100, 22, 0, Math.PI * 2);
context.stroke();

// CABELO ESTILO CEBOLINHA
context.beginPath();
context.moveTo(316, 90);
context.lineTo(312, 78);
context.lineTo(320, 84);
context.lineTo(322, 70);
context.lineTo(329, 83);
context.lineTo(335, 68);
context.lineTo(340, 83);
context.lineTo(349, 72);
context.lineTo(348, 87);
context.stroke();

// OLHO ESQUERDO
context.beginPath();
context.arc(328, 96, 2, 0, Math.PI * 2);
context.fill();

// OLHO DIREITO
context.beginPath();
context.arc(341, 96, 2, 0, Math.PI * 2);
context.fill();

// SORRISO
context.beginPath();
context.arc(335, 101, 9, 0, Math.PI);
context.stroke();

// CORPO
context.beginPath();
context.moveTo(325, 122);
context.lineTo(325, 200);
context.stroke();

// BRAÇO ESQUERDO
context.beginPath();
context.moveTo(325, 125);
context.lineTo(300, 150);
context.lineTo(330, 160);
context.stroke();

// BRAÇO DIREITO
context.beginPath();
context.moveTo(325, 125);
context.lineTo(350, 150);
context.lineTo(370, 115);
context.stroke();

// PERNA ESQUERDA
context.beginPath();
context.moveTo(325, 200);
context.lineTo(300, 220);
context.lineTo(300, 270);
context.stroke();

// PERNA DIREITA
context.beginPath();
context.moveTo(325, 200);
context.lineTo(350, 220);
context.lineTo(350, 270);
context.stroke();