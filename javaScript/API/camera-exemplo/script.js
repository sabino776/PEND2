const video = document.querySelector("#camera");
const canvas = document.querySelector("#canvas");
const botao = document.querySelector("#botao");
const foto = document.querySelector("#foto");
const context = canvas.getContext("2d");
navigator.mediaDevices.getUserMedia({ video: true, audio:true })
    .then(function (stream) {
        video.srcObject = stream;
    })
    .catch(function (error) {
        console.log("Não foi possivel acessar a câmera.", error);
    });

botao.addEventListener("click", function () {
    canvas.width = video.clientWidth;
    canvas.height = video.clientHeight;

    const constexto = canvas.getContext("2d");

    constexto.drawImage(
       video,
       0,
       0,
         canvas.width,
        canvas.height
    );
    foto.src = canvas.toDataURL("image/png");
});
