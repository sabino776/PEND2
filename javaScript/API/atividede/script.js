// =========================================
// ELEMENTOS DA PÁGINA
// =========================================

const btnLocalizacao =
    document.getElementById("btnLocalizacao");

const latitude =
    document.getElementById("latitude");

const longitude =
    document.getElementById("longitude");

const precisao =
    document.getElementById("precisao");


const btnCamera =
    document.getElementById("btnCamera");

const camera =
    document.getElementById("camera");

const statusCamera =
    document.getElementById("statusCamera");

const cameraMensagem =
    document.getElementById("cameraMensagem");


// =========================================
// GEOLOCATION
// =========================================

btnLocalizacao.addEventListener("click", () => {

    // Verifica se o navegador possui Geolocation
    if (!navigator.geolocation) {

        alert(
            "Seu navegador não suporta Geolocation."
        );

        return;
    }


    // Mostra que está buscando
    latitude.textContent = "Obtendo...";
    longitude.textContent = "Obtendo...";
    precisao.textContent = "Obtendo...";


    // Solicita localização
    navigator.geolocation.getCurrentPosition(

        function (position) {

            const dados = position.coords;


            // Latitude
            latitude.textContent =
                dados.latitude.toFixed(6);


            // Longitude
            longitude.textContent =
                dados.longitude.toFixed(6);


            // Precisão
            precisao.textContent =
                dados.accuracy.toFixed(2) +
                " metros";


            btnLocalizacao.textContent =
                "✓ Localização obtida";


            console.log(
                "Latitude:",
                dados.latitude
            );

            console.log(
                "Longitude:",
                dados.longitude
            );

            console.log(
                "Precisão:",
                dados.accuracy
            );

        },


        function (error) {

            console.error(error);


            latitude.textContent =
                "Não autorizado";

            longitude.textContent =
                "Não autorizado";

            precisao.textContent =
                "Não disponível";


            alert(
                "Não foi possível obter sua localização. " +
                "Verifique a permissão do navegador."
            );

        },

        {
            enableHighAccuracy: true,

            timeout: 10000,

            maximumAge: 0
        }

    );

});


// =========================================
// CÂMERA
// =========================================

btnCamera.addEventListener(
    "click",
    async function () {

        // Verifica suporte
        if (!navigator.mediaDevices ||
            !navigator.mediaDevices.getUserMedia) {

            alert(
                "Seu navegador não suporta acesso à câmera."
            );

            return;
        }


        try {

            // Solicita acesso à câmera
            const stream =
                await navigator.mediaDevices.getUserMedia({

                    video: {
                        facingMode: "user"
                    },

                    audio: false

                });


            // Coloca a câmera no vídeo
            camera.srcObject = stream;


            // Remove mensagem
            cameraMensagem.style.display = "none";


            // Atualiza status
            statusCamera.textContent =
                "✓ Câmera ativada com sucesso.";


            // Atualiza botão
            btnCamera.textContent =
                "✓ Câmera ativada";


        } catch (error) {

            console.error(error);


            statusCamera.textContent =
                "Não foi possível acessar a câmera.";


            alert(
                "O acesso à câmera foi negado " +
                "ou ela não está disponível."
            );

        }

    }
);