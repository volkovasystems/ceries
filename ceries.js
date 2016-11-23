"use strict";

/*;
	@module-license:
		The MIT License (MIT)
		@mit-license

		Copyright (@c) 2016 Richeve Siodina Bebedor
		@email: richeve.bebedor@gmail.com

		Permission is hereby granted, free of charge, to any person obtaining a copy
		of this software and associated documentation files (the "Software"), to deal
		in the Software without restriction, including without limitation the rights
		to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
		copies of the Software, and to permit persons to whom the Software is
		furnished to do so, subject to the following conditions:

		The above copyright notice and this permission notice shall be included in all
		copies or substantial portions of the Software.

		THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
		IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
		FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
		AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
		LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
		OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
		SOFTWARE.
	@end-module-license

	@module-configuration:
		{
			"package": "ceries",
			"path": "ceries/ceries.js",
			"file": "ceries.js",
			"module": "ceries",
			"author": "Richeve S. Bebedor",
			"eMail": "richeve.bebedor@gmail.com",
			"repository": "https://github.com/volkovasystems/ceries.git",
			"test": "ceries-test.js",
			"global": true
		}
	@end-module-configuration

	@module-documentation:
		Chain execution.

		Passing parameter to callback will pass that parameter to the next method.
	@end-module-documentation

	@include:
		{
			"budge": "budge",
			"called": "called",
			"letgo": "letgo",
			"plough": "plough",
			"raze": "raze",
			"snapd": "snapd",
			"zelf": "zelf"
		}
	@end-include
*/

const budge = require( "budge" );
const called = require( "called" );
const letgo = require( "letgo" );
const plough = require( "plough" );
const raze = require( "raze" );
const snapd = require( "snapd" );
const zelf = require( "zelf" );

const ceries = function ceries( method ){
	/*;
		@meta-configuration:
			{
				"method:required": [
					"[function]",
					..."function"
				]
			}
		@end-meta-configuration
	*/

	method = plough( arguments ).reverse( );

	let self = zelf( this );

	let catcher = letgo.bind( self )( function chain( ){
		let execute = ( function execute( next ){
			let parameter = budge( arguments, 1 );

			snapd.bind( self )( function onTick( ){
				try{
					next.apply( self, [ called.bind( self )( function callback( error ){
						let parameter = raze( arguments );

						if( error ){
							catcher.cache.callback.apply( self, parameter );

						}else if( method.length ){
							execute.apply( self, [ method.pop( ).bind( self ) ]
								.concat( parameter ) );

						}else{
							catcher.cache.callback.apply( self, parameter );
						}
					} ) ].concat( parameter ) );

				}catch( error ){
					catcher.cache.callback( error );
				}
			} );
		} ).bind( self );

		execute( method.pop( ).bind( self ) );
	} );

	return catcher;
};

module.exports = ceries;
