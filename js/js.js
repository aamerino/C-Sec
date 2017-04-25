$( function() {
	$( ".vigilant").draggable();
	$( ".supervisor").draggable({
		containment: ".edifici"
	});
	$( ".punt-vigilancia").droppable({
		drop: function( event, ui) {
			$( this )
			.addClass( "punt-vigilancia-actiu" )
		},
		out: function (event, ui) {
			$( this)
			.removeClass( "punt-vigilancia-actiu" )
		}
	});
} );
