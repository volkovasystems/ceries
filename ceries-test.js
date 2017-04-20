const ceries = require( "./ceries.js" );

ceries( [
			function one( callback ) {
			    console.log( "step 1" );
			    callback( null, 23 );
			},
			function two( callback, option ) {
			    console.log( "step 2", callback );
			    callback( null, 24 );
			},
			function three( callback, option ) {
			    console.log( "step 3", callback );
			    callback( null, 25 );
			}
        ] )
		( function lastly( error, option ) {
			if( error ){
			    console.log( "Error", error );
			}else{
			    console.log( "Option", option );
			}
		} );
