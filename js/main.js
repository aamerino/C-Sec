$(function () {
    comprobarEstats();

    $(".vigilant").draggable({
        cursor: 'pointer'
    });
    $(".supervisor").draggable({
        containment: ".edifici",
        cursor: 'pointer'
    });
    $(".punt-vigilancia").droppable({
        accept: function (d) {
            if (d.hasClass("vigilant")) {
                return true;
            }
        },
        drop: function (event, ui) {
            $(this)
                .addClass("punt-vigilancia-actiu")
                comprobarEstats();
        },
        out: function (event, ui) {
            $(this)
                .removeClass("punt-vigilancia-actiu")
                comprobarEstats();
        }
    });
    $(".punt-supervisio").droppable({
        accept: function (d) {
            if (d.hasClass("supervisor")) {
                return true;
            }
        },
        drop: function (event, ui) {
            $(this)
                .addClass("punt-supervisio-actiu")
                comprobarEstats();
        },
        out: function (event, ui) {
            $(this)
                .removeClass("punt-supervisio-actiu")
                comprobarEstats();
        }
    });

    $("#departaments > ul").sortable({
        cursor: 'pointer'
    });

    $(".desplegarLlistat").click(function (event) {
        $(event.target).next().slideToggle("fast");
    });

    $(".desplegarLlistatControls").click(function (event) {
        $(event.target).next().animate({width: "toggle"});
    });

    $(".obrir").click(function (event) {
        var classList = $(event.target).attr("class");
        var classes = classList.split(" ");
        for (var i = 0; i < classes.length; i++) {
            switch (classes[i]) {
                case "controlPortaVendes":
                    $(".portaVendes").first().slideUp("slow");
                    $(".portaVendes").removeClass("tancada");
                    comprobarEstats();
                    break;
                case "controlPortaInterior":
                    $(".portaInterior").first().hide();
                    $(".portaInterior").removeClass("tancada");   
                    comprobarEstats();                
                    break;
                case "controlPortaMagatzem":
                    $(".portaMagatzem").first().fadeOut("slow");
                    $(".portaMagatzem").removeClass("tancada");
                    comprobarEstats();
                    break;
                default:
                    break;
            }
        }
    });

    $(".tancar").click(function (event) {
        var classList = $(event.target).attr("class");
        var classes = classList.split(" ");
        for (var i = 0; i < classes.length; i++) {
            switch (classes[i]) {
                case "controlPortaVendes":
                    $(".portaVendes").first().slideDown("slow");
                    $(".portaVendes").addClass("tancada");
                    comprobarEstats();
                    break;
                case "controlPortaInterior":
                    $(".portaInterior").first().show();
                    $(".portaInterior").addClass("tancada");
                    comprobarEstats();
                    break;
                case "controlPortaMagatzem":
                    $(".portaMagatzem").first().fadeIn("slow");
                    $(".portaMagatzem").addClass("tancada");
                    comprobarEstats();
                    break;
                default:
                    break;
            }
        }
    });

    $(".aturar").click(function (event) {
        var classList = $(event.target).attr("class");
        var classes = classList.split(" ");
        for (var i = 0; i < classes.length; i++) {
            switch (classes[i]) {
                case "controlPortaVendes":
                    $(".portaVendes").first().stop();
                    break;
                case "controlPortaMagatzem":
                    $(".portaMagatzem").first().stop();
                    break;
                default:
                    break;
            }
        }
    });

    $("#accordion").accordion({
        collapsible: true
    });
});

function comprobarEstats() {
    var portaVendes = $(".portaVendes");
    var portaInterior = $(".portaInterior");
    var portaMagatzem = $(".portaMagatzem");
    var puntVigilancia = $(".punt-vigilancia");
    var puntSupervisio = $(".punt-supervisio");

    if (portaVendes.hasClass("tancada") && portaInterior.hasClass("tancada") && 
        portaMagatzem.hasClass("tancada")) {
        $("#portesTancades").show();
    } else {
        $("#portesTancades").hide();
    }

    if (puntVigilancia.hasClass("punt-vigilancia-actiu") && 
        puntSupervisio.hasClass("punt-supervisio-actiu")) {
        $("#puntsAtesos").show();
    } else {
        $("#puntsAtesos").hide();
    }
}
