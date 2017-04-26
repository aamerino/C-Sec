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

    $("#llistat-productes").sortable();

    $("#desplegar-llistat").click(function () {
        $("#llistat-productes").slideToggle("fast");
    });
});
