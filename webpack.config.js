const webpack = require( "webpack" );
const ResolverPlugin = webpack.ResolverPlugin;
const DirectoryDescriptionFilePlugin = ResolverPlugin.DirectoryDescriptionFilePlugin;
const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;

module.exports = {
	"entry": "./ceries.support.js",
	"resolve": {
		"modulesDirectories": [ "bower_components", "node_modules" ]
	},
	"module": {
		"preLoaders": [
			{
				"test": /\.support\.js$/,
				"loader": "source-map-loader"
			}
		]
	},
	"output": {
		"library": "ceries",
		"libraryTarget": "umd",
		"filename": "ceries.deploy.js"
	},
	"plugins": [
		new ResolverPlugin( new DirectoryDescriptionFilePlugin( "bower.json", [ "support" ] ) ),
		new ResolverPlugin( new DirectoryDescriptionFilePlugin( "package.json", [ "browser" ] ) ),
		new ResolverPlugin( new DirectoryDescriptionFilePlugin( ".bower.json", [ "main" ] ) ),
		new UglifyJsPlugin( {
			"compress": {
				"keep_fargs": true,
				"keep_fnames": true,
				"warnings": false
			},
			"comments": false,
			"sourceMap": true,
			"mangle": false
		} )
	],
	"devtool": "#inline-source-map"
};
