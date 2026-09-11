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


const btnFoto =
    document.getElementById("btnFoto");

const fotoCanvas =
    document.getElementById("fotoCanvas");

const statusFoto =
    document.getElementById("statusFoto");


// Guarda o acesso à câmera

let streamCamera = null;


// =========================================
// GEOLOCATION
// =========================================

btnLocalizacao.addEventListener(
    "click",
    () => {

        // Verifica se o navegador possui Geolocation

        if (!navigator.geolocation) {

            alert(
                "Seu navegador não suporta Geolocation."
            );

            return;
        }


        // Mostra que está buscando

        latitude.textContent =
            "Obtendo...";

        longitude.textContent =
            "Obtendo...";

        precisao.textContent =
            "Obtendo...";


        // Solicita localização

        navigator.geolocation.getCurrentPosition(

            function (position) {

                const dados =
                    position.coords;


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


                // Atualiza botão

                btnLocalizacao.textContent =
                    "✓ Localização obtida";


                // Mostra no console

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

    }
);


// =========================================
// CÂMERA
// =========================================

btnCamera.addEventListener(
    "click",
    async function () {

        // Verifica suporte

        if (
            !navigator.mediaDevices ||
            !navigator.mediaDevices.getUserMedia
        ) {

            alert(
                "Seu navegador não suporta acesso à câmera."
            );

            return;
        }


        try {

            // Solicita acesso à câmera

            streamCamera =
                await navigator.mediaDevices.getUserMedia({

                    video: {
                        facingMode: "user"
                    },

                    audio: false

                });


            // Coloca a câmera no vídeo

            camera.srcObject =
                streamCamera;


            // Remove mensagem

            cameraMensagem.style.display =
                "none";


            // Atualiza status

            statusCamera.textContent =
                "✓ Câmera ativada com sucesso.";


            // Atualiza botão

            btnCamera.textContent =
                "✓ Câmera ativada";


            // Mostra botão de tirar foto

            btnFoto.style.display =
                "block";


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


// =========================================
// TIRAR FOTO
// =========================================

btnFoto.addEventListener(
    "click",
    function () {

        // Verifica se a câmera está ligada

        if (!streamCamera) {

            alert(
                "Ative a câmera primeiro."
            );

            return;
        }


        // Verifica se o vídeo está carregado

        if (
            camera.videoWidth === 0 ||
            camera.videoHeight === 0
        ) {

            alert(
                "Aguarde a câmera carregar."
            );

            return;
        }


        // Define o tamanho da foto

        fotoCanvas.width =
            camera.videoWidth;

        fotoCanvas.height =
            camera.videoHeight;


        // Pega o contexto do Canvas

        const contexto =
            fotoCanvas.getContext("2d");


        // Captura a imagem da câmera

        contexto.drawImage(

            camera,

            0,
            0,

            fotoCanvas.width,
            fotoCanvas.height

        );


        // Mostra a foto

        fotoCanvas.style.display =
            "block";


        // Atualiza mensagem

        statusFoto.textContent =
            "✓ Foto tirada com sucesso!";


        console.log(
            "Foto registrada."
        );

    }
);