$(function () {
    comprovarEstats();
    /*  Els elements amb la classe "vigilant" els afegim la funcionalitat "draggable" per poder moure'ls per la pantalla
     li afegim la propietat "cursor: 'move'" perquè en moure els elements el cursor canviï per una creu */
    $(".vigilant").draggable({
        cursor: 'move'
    });
    // Aquí fem el mateix amb el supervisor i limitem el seu moviment a l'edifici  amb la propietat "containment"
    $(".supervisor").draggable({
        revert: 'invalid',
        cursor: 'move'
    });
    // Seleccionem l'element marcat amb la classe "punt-vigilancia" per afegir-li la funcionalitat droppable de jquery
    $(".punt-vigilancia").droppable({
        accept: function (d) {
            // Vam comprovant que l'element introduït està marcat amb la classe "vigilant" per acceptar-lo
            if (d.hasClass("vigilant")) {
                return true;
            }
        },
        drop: function (event, ui) {
            $(this)
            // Quan el punt de vigilància té un element l'hi afegim una classe per canviar-li el color
                .addClass("punt-vigilancia-actiu");
            //I comprovam els estats
            comprovarEstats();
        },
        out: function (event, ui) {
            $(this)
            // Quan el punt de vigilància NO té un element l'hi afegim una classe per canviar-li el color
                .removeClass("punt-vigilancia-actiu");
            // I comprovam els estats
            comprovarEstats();
        },
        // Li afegim la propietat "tolerance" per indicar-li que només estigui actiu quan tot l'element estigui endins
        tolerance: "fit"
    });
    // També li afegim la funcionalitat droppable a l'element marcat amb la classe "punt-supervisio"
    $(".punt-supervisio").droppable({
        // Comprovem que l'element te la classe "supervisor" perquè es pugui ficar.
        accept: function (d) {
            if (d.hasClass("supervisor")) {
                return true;
            }
        },
        drop: function (event, ui) {
            $(this)
            // Camviem el color de l'element una vegada té un supervisor ficat.
                .addClass("punt-supervisio-actiu");
            comprovarEstats();
        },
        out: function (event, ui) {
            $(this)
            // I llevam el color quan el traguem.
                .removeClass("punt-supervisio-actiu");
            // Comprovem els estats.
            comprovarEstats();
        },
        tolerance: "fit"
    });

    // Aquest droppable fa que el supervisor no pugui sortir de l'edifici, ames fa que l'animació sigui més suau.

    $(".edifici").droppable({
        accept: function (d) {
            if (d.hasClass("supervisor")) {
                return true;
            }
        },
        tolerance: "fit"
    });
    /* Marquem la llista desordenada dins de l'element "departaments" amb la funcionalitat sortable  de jquery per poder modificar
     l'ordre del llistat agafant i deixant anar elements, li afegim la propietat "cursor:move" perquè aparegui una mà quan agafam elements del llistat */
    $("#departaments > ul").sortable({
        cursor: 'move'
    });

    // Deixem d'amagar l'element marcat amb "desplegarLlistat" i despleguem l'element en fer clic.
    $(".desplegarLlistat").click(function (event) {
        $(event.target).next().slideToggle("fast");
    });

    // Aquesta part li dóna la funcionalitat de desplegar el menú a cada element de la llista de portes.

    $(".desplegarLlistatControls").click(function (event) {
        $(event.target).next().animate({ width: "toggle" });
    });

    /*Aquesta part es crida quan pitja a obrir alguna porta, totes les portes tenen aquest listener que es crida quan
    es vol obrir.*/

    $(".obrir").click(function (event) {
        var classList = $(event.target).attr("class");
        var classes = classList.split(" ");
        for (var i = 0; i < classes.length; i++) {
            switch (classes[i]) {
                case "controlPortaVendes":
                    var portaVendes = $(".portaVendes");
                    portaVendes.first().slideUp(3000);
                    portaVendes.removeClass("tancada");
                    comprovarEstats();
                    break;
                case "controlPortaInterior":
                    var portaInterior = $(".portaInterior");
                    portaInterior.first().hide();
                    portaInterior.removeClass("tancada");
                    comprovarEstats();
                    break;
                case "controlPortaMagatzem":
                    var portaMagatzem = $(".portaMagatzem");
                    portaMagatzem.first().fadeOut(3000);
                    portaMagatzem.removeClass("tancada");
                    comprovarEstats();
                    break;
                default:
                    break;
            }
        }
    });

    // Aquí passa el mateix que la part anterior d'obrir però per tancar.

    $(".tancar").click(function (event) {
        var classList = $(event.target).attr("class");
        var classes = classList.split(" ");
        for (var i = 0; i < classes.length; i++) {
            switch (classes[i]) {
                case "controlPortaVendes":
                    $(".portaVendes").first().slideDown(3000);
                    $(".portaVendes").addClass("tancada");
                    comprovarEstats();
                    break;
                case "controlPortaInterior":
                    $(".portaInterior").first().show();
                    $(".portaInterior").addClass("tancada");
                    comprovarEstats();
                    break;
                case "controlPortaMagatzem":
                    $(".portaMagatzem").first().fadeIn(3000);
                    $(".portaMagatzem").addClass("tancada");
                    comprovarEstats();
                    break;
                default:
                    break;
            }
        }
    });

    // Aquí està la funcionalitat per aturar les portes, només s'aturen la porta de Vendes i la del Magatzem.

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

    //Apliquem la funció accordion() de jquery  a l'element "accordion" per afegir la seva funcionalitat, li afegim
    // la propietat "collapsible: true" perquè  es pugui tancar
    $("#accordion").accordion({
        collapsible: true
    });
    // Apliquem la funció tabs() de jquery  a l'element "cameras-seguretat" per afegir la seva funcionalitat.
    $("#cameras-seguretat").tabs({
        collapsible: true
    });
});

function comprovarEstats() {
    // Aquesta funció comprova l'estat de les portes per saber si estan tancades o obertes
    var portaVendes = $(".portaVendes");
    var portaInterior = $(".portaInterior");
    var portaMagatzem = $(".portaMagatzem");
    var puntVigilancia = $(".punt-vigilancia");
    var puntSupervisio = $(".punt-supervisio");

    // Si totes les portes estan tancades, fem visible l'element html amb el missatge "Totes les portes estan tancades".
    if (portaVendes.hasClass("tancada") && portaInterior.hasClass("tancada") &&
        portaMagatzem.hasClass("tancada")) {
        $("#portesTancades").show();
    } else {
        $("#portesTancades").hide();
    }

    // El mateix amb el punt de vigilància, alternant entre ensenyar l'element amb el missatge "Tots els punts estan atesos" o no.
    if (puntVigilancia.hasClass("punt-vigilancia-actiu") &&
        puntSupervisio.hasClass("punt-supervisio-actiu")) {
        $("#puntsAtesos").show();
    } else {
        $("#puntsAtesos").hide();
    }
}
