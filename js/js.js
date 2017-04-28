$(function () {
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
        },
        out: function (event, ui) {
            $(this)
                .removeClass("punt-vigilancia-actiu")
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
        },
        out: function (event, ui) {
            $(this)
                .removeClass("punt-supervisio-actiu")
        }
    });

    $("#llistat-departaments").sortable({
        cursor: 'pointer'
    });

    $("#desplegar-llistat").click(function () {
        $("#llistat-departaments").slideToggle("fast");
    });
    $("#accordion").accordion({
        collapsible: true,
        cursor: 'pointer'
    });
    $(function() {
        $( "#cameras-seguretat" ).tabs();
    });
});
