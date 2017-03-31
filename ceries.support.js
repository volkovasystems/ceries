"use strict"; /*;
              	@module-license:
              		The MIT License (MIT)
              		@mit-license
              
              		Copyright (@c) 2017 Richeve Siodina Bebedor
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
              			"contributors": [
              				"John Lenon Maghanoy <johnlenonmaghanoy@gmail.com>"
              			],
              			"eMail": "richeve.bebedor@gmail.com",
              			"repository": "https://github.com/volkovasystems/ceries.git",
              			"test": "ceries-test.js",
              			"global": true
              		}
              	@end-module-configuration
              
              	@module-documentation:
              		Chain execution.
              
              		Passing parameter to callback will pass that parameter to the next method.
              
              		Parameters are optional therefore the callback will be passed as the first parameter.
              	@end-module-documentation
              
              	@include:
              		{
              			"budge": "budge",
              			"called": "called",
              			"clazof": "clazof",
              			"harden": "harden",
              			"letgo": "letgo",
              			"plough": "plough",
              			"raze": "raze",
              			"snapd": "snapd",
              			"vound": "vound",
              			"zelf": "zelf"
              		}
              	@end-include
              */

var budge = require("budge");
var called = require("called");
var clazof = require("clazof");
var harden = require("harden");
var letgo = require("letgo");
var plough = require("plough");
var raze = require("raze");
var snapd = require("snapd");
var vound = require("vound");
var zelf = require("zelf");

var ceries = function ceries(method) {
	/*;
                                      	@meta-configuration:
                                      		{
                                      			"method:required": [
                                      				[ "function" ],
                                      				"...function"
                                      			]
                                      		}
                                      	@end-meta-configuration
                                      */

	method = plough(arguments).reverse();

	var self = zelf(this);

	var catcher = letgo.bind(self)(function chain(cache) {
		var execute = function execute(next) {
			var parameter = budge(arguments);

			catcher.chain.push(snapd.bind(self)(function onTick() {
				try {
					var callback = called.bind(self)(function callback(error) {
						var parameter = raze(arguments);

						if (clazof(error, Error)) {
							catcher.flush();

							cache.callback.apply(self, parameter.concat([catcher]));

						} else if (method.length) {
							execute.apply(self, [vound(method.pop(), self)].concat(parameter));

						} else {
							var result = [].concat(catcher.result);

							catcher.flush();

							/*;
                        	@note:
                        		List of accumulated results will be passed on the first parameter.
                        	@end-note
                        */
							cache.callback.apply(self, [result].concat(parameter).concat([catcher]));
						}
					});

					/*;
         	@note:
         		Immediate stop from the callback.
         	@end-note
         */
					harden("stop", function stop() {
						catcher.flush();

						cache.callback.apply(self, raze(arguments).concat([catcher]));

						return catcher;
					}, callback);

					/*;
                   	@note:
                   		Chained series methods may return results to be accumulated.
                   	@end-note
                   */
					catcher.result.push(next.apply(self, [callback].concat(parameter)));

				} catch (error) {
					catcher.flush();

					cache.callback.apply(self, [error].concat(parameter));
				}
			}).release());
		};

		execute(vound(method.pop(), self));
	});

	harden("chain", [], catcher);
	harden("result", [], catcher);

	harden("flush", function flush() {
		while (catcher.chain.length) {
			catcher.chain.pop().halt();
		}

		while (catcher.result.length) {
			catcher.result.pop();
		}

		return catcher;
	}, catcher);

	return catcher;
};

module.exports = ceries;

//# sourceMappingURL=ceries.support.js.map