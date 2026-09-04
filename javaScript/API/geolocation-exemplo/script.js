navigator.geolocation.getCurrentPosition(

    function (posicao) {

        document.getElementById("resultado").innerHTML =
            '<img src="image1.png" width="300" height="300">';

        console.log("Localização permitida!");

    },

    function (erro) {

        document.getElementById("resultado").innerHTML =
            '<img src="image.png" width="300" height="300">';

        console.log("Localização negada!");

    }

);