$( function() {
	$( ".vigilant").draggable();
	$( ".supervisor").draggable({
		containment: ".edifici"
	});
} );
