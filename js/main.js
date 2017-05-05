$(function () {
    comprobarEstats();
    /*   Als elements amb la classe "vigilant" els afegim la funcionalitat "draggable" per poder moure'ls per la pantalla
     li afegim la propietat "cursor: 'move'" perque en moure els elements el cursor canviï per una creu */
    $(".vigilant").draggable({
        cursor: 'move'
    });
    //Aquí fem el mateix amb el supervisor i limitem el seu moviment a l'edifici  amb la propietat "containment"
    $(".supervisor").draggable({
        containment: ".edifici",
        cursor: 'move'
    });
    //seleccionem l'element marcat amb la classe "punt-vigilancia" per afegir-li la funcionalitat droppable de jquery
    $(".punt-vigilancia").droppable({
        accept: function (d) {
            //vam comprovant que l'element introduït està marcat amb la classe "vigilant" per acceptar-lo
            if (d.hasClass("vigilant")) {
                return true;
            }
        },
        drop: function (event, ui) {
            $(this)
            //Quan el punt de vigilància té un element l'hi afegim una classe per canviar-li el color
                .addClass("punt-vigilancia-actiu");
            //I comprovam els estats
            comprobarEstats();
        },
        out: function (event, ui) {
            $(this)
            // //Quan el punt de vigilància NO té un element l'hi afegim una classe per canviar-li el color
                .removeClass("punt-vigilancia-actiu");
            ////I comprovam els estats
            comprobarEstats();
        },
        //li afegim la propietat "tolerance" per indicar-li que només estigui actiu quan tot l'element estigui endins
        tolerance: "fit"
    });
    //Tambe li afegim la funcionalitat droppable a l'element marcat amb la clase "punt-supervisio"
    $(".punt-supervisio").droppable({
        //comprobam que l'element te la clase "supervisor" perque es pugui fica.
        accept: function (d) {
            if (d.hasClass("supervisor")) {
                return true;
            }
        },
        drop: function (event, ui) {
            $(this)
            //cambiem el color de l'element una vegada te un supervisor ficat.
                .addClass("punt-supervisio-actiu");
            comprobarEstats();
        },
        out: function (event, ui) {
            $(this)
            //I llevam el color quan el traguem.
                .removeClass("punt-supervisio-actiu");
            //comprobam els estats.
            comprobarEstats();
        },
        tolerance: "fit"
    });

    /*    Marquem la llista desordenada dins de l'element "departaments" amb la funcionalitat sortable  de jquery per poder modificar
     l'ordre del llistat agafant y soltant elements, li afegim la propietat "cursor:move" perque aparegui una ma quan agafam elements del llistat */
    $("#departaments > ul").sortable({
        cursor: 'move'
    });

    //Deixem d'amagar l'element marcat amb "desplegarLlistat" i despleguem l'element en fer clic.
    $(".desplegarLlistat").click(function (event) {
        $(event.target).next().slideToggle("fast");
    });

    $(".desplegarLlistatControls").click(function (event) {
        $(event.target).next().animate({ width: "toggle" });
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

    //Apliquem la funció accordion() de jquery  a l'element "accordion" per per afegir-la seva funcionalitat, li afegim
    // la propietat "collapsible: true" perquè  es pugui tancar
    $("#accordion").accordion({
        collapsible: true
    });
    //Apliquem la funció tabs() de jquery  a l'element "cameras-seguretat" per afegir-la seva funcionalitat.
    $("#cameras-seguretat").tabs({
        collapsible: true
    });
});

function comprobarEstats() {
    //Aquesta funció comprova l'estat de les portes per saber si estan tancades o obertes
    var portaVendes = $(".portaVendes");
    var portaInterior = $(".portaInterior");
    var portaMagatzem = $(".portaMagatzem");
    var puntVigilancia = $(".punt-vigilancia");
    var puntSupervisio = $(".punt-supervisio");

    //Si totes les portes estan tancades fem visible l'element html amb el missatge "Totes les portes estan tancades".
    if (portaVendes.hasClass("tancada") && portaInterior.hasClass("tancada") &&
        portaMagatzem.hasClass("tancada")) {
        $("#portesTancades").show();
    } else {
        $("#portesTancades").hide();
    }

    //El mateix amb el punt de vigilància, alternant entre ensenyar l'element amb el missatge "Tots els punts estan atesos" o no.
    if (puntVigilancia.hasClass("punt-vigilancia-actiu") &&
        puntSupervisio.hasClass("punt-supervisio-actiu")) {
        $("#puntsAtesos").show();
    } else {
        $("#puntsAtesos").hide();
    }
}
