"use strict";

/*;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNlcmllcy5qcyJdLCJuYW1lcyI6WyJidWRnZSIsInJlcXVpcmUiLCJjYWxsZWQiLCJjbGF6b2YiLCJoYXJkZW4iLCJsZXRnbyIsInBsb3VnaCIsInJhemUiLCJzbmFwZCIsInZvdW5kIiwiemVsZiIsImNlcmllcyIsIm1ldGhvZCIsImFyZ3VtZW50cyIsInJldmVyc2UiLCJzZWxmIiwiY2F0Y2hlciIsImJpbmQiLCJjaGFpbiIsImNhY2hlIiwiZXhlY3V0ZSIsIm5leHQiLCJwYXJhbWV0ZXIiLCJwdXNoIiwib25UaWNrIiwiY2FsbGJhY2siLCJlcnJvciIsIkVycm9yIiwiZmx1c2giLCJhcHBseSIsImNvbmNhdCIsImxlbmd0aCIsInBvcCIsInJlc3VsdCIsInN0b3AiLCJyZWxlYXNlIiwiaGFsdCIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiJBQUFBOztBQUVBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQWlFQSxJQUFNQSxRQUFRQyxRQUFTLE9BQVQsQ0FBZDtBQUNBLElBQU1DLFNBQVNELFFBQVMsUUFBVCxDQUFmO0FBQ0EsSUFBTUUsU0FBU0YsUUFBUyxRQUFULENBQWY7QUFDQSxJQUFNRyxTQUFTSCxRQUFTLFFBQVQsQ0FBZjtBQUNBLElBQU1JLFFBQVFKLFFBQVMsT0FBVCxDQUFkO0FBQ0EsSUFBTUssU0FBU0wsUUFBUyxRQUFULENBQWY7QUFDQSxJQUFNTSxPQUFPTixRQUFTLE1BQVQsQ0FBYjtBQUNBLElBQU1PLFFBQVFQLFFBQVMsT0FBVCxDQUFkO0FBQ0EsSUFBTVEsUUFBUVIsUUFBUyxPQUFULENBQWQ7QUFDQSxJQUFNUyxPQUFPVCxRQUFTLE1BQVQsQ0FBYjs7QUFFQSxJQUFNVSxTQUFTLFNBQVNBLE1BQVQsQ0FBaUJDLE1BQWpCLEVBQXlCO0FBQ3ZDOzs7Ozs7Ozs7OztBQVdBQSxVQUFTTixPQUFRTyxTQUFSLEVBQW9CQyxPQUFwQixFQUFUOztBQUVB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LE1BQVIsQ0FBZUQsR0FBZjtBQUNBOztBQUVELFNBQU9oQixPQUFQO0FBQ0EsRUFWRCxFQVVHQSxPQVZIOztBQVlBLFFBQU9BLE9BQVA7QUFDQSxDQTlGRDs7QUFnR0FxQixPQUFPQyxPQUFQLEdBQWlCM0IsTUFBakIiLCJmaWxlIjoiY2VyaWVzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qO1xuXHRAbW9kdWxlLWxpY2Vuc2U6XG5cdFx0VGhlIE1JVCBMaWNlbnNlIChNSVQpXG5cdFx0QG1pdC1saWNlbnNlXG5cblx0XHRDb3B5cmlnaHQgKEBjKSAyMDE3IFJpY2hldmUgU2lvZGluYSBCZWJlZG9yXG5cdFx0QGVtYWlsOiByaWNoZXZlLmJlYmVkb3JAZ21haWwuY29tXG5cblx0XHRQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG5cdFx0b2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuXHRcdGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcblx0XHR0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG5cdFx0Y29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG5cdFx0ZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcblxuXHRcdFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluIGFsbFxuXHRcdGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG5cblx0XHRUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG5cdFx0SU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG5cdFx0RklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG5cdFx0QVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuXHRcdExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG5cdFx0T1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEVcblx0XHRTT0ZUV0FSRS5cblx0QGVuZC1tb2R1bGUtbGljZW5zZVxuXG5cdEBtb2R1bGUtY29uZmlndXJhdGlvbjpcblx0XHR7XG5cdFx0XHRcInBhY2thZ2VcIjogXCJjZXJpZXNcIixcblx0XHRcdFwicGF0aFwiOiBcImNlcmllcy9jZXJpZXMuanNcIixcblx0XHRcdFwiZmlsZVwiOiBcImNlcmllcy5qc1wiLFxuXHRcdFx0XCJtb2R1bGVcIjogXCJjZXJpZXNcIixcblx0XHRcdFwiYXV0aG9yXCI6IFwiUmljaGV2ZSBTLiBCZWJlZG9yXCIsXG5cdFx0XHRcImVNYWlsXCI6IFwicmljaGV2ZS5iZWJlZG9yQGdtYWlsLmNvbVwiLFxuXHRcdFx0XCJyZXBvc2l0b3J5XCI6IFwiaHR0cHM6Ly9naXRodWIuY29tL3ZvbGtvdmFzeXN0ZW1zL2Nlcmllcy5naXRcIixcblx0XHRcdFwidGVzdFwiOiBcImNlcmllcy10ZXN0LmpzXCIsXG5cdFx0XHRcImdsb2JhbFwiOiB0cnVlXG5cdFx0fVxuXHRAZW5kLW1vZHVsZS1jb25maWd1cmF0aW9uXG5cblx0QG1vZHVsZS1kb2N1bWVudGF0aW9uOlxuXHRcdENoYWluIGV4ZWN1dGlvbi5cblxuXHRcdFBhc3NpbmcgcGFyYW1ldGVyIHRvIGNhbGxiYWNrIHdpbGwgcGFzcyB0aGF0IHBhcmFtZXRlciB0byB0aGUgbmV4dCBtZXRob2QuXG5cblx0XHRQYXJhbWV0ZXJzIGFyZSBvcHRpb25hbCB0aGVyZWZvcmUgdGhlIGNhbGxiYWNrIHdpbGwgYmUgcGFzc2VkIGFzIHRoZSBmaXJzdCBwYXJhbWV0ZXIuXG5cdEBlbmQtbW9kdWxlLWRvY3VtZW50YXRpb25cblxuXHRAaW5jbHVkZTpcblx0XHR7XG5cdFx0XHRcImJ1ZGdlXCI6IFwiYnVkZ2VcIixcblx0XHRcdFwiY2FsbGVkXCI6IFwiY2FsbGVkXCIsXG5cdFx0XHRcImNsYXpvZlwiOiBcImNsYXpvZlwiLFxuXHRcdFx0XCJoYXJkZW5cIjogXCJoYXJkZW5cIixcblx0XHRcdFwibGV0Z29cIjogXCJsZXRnb1wiLFxuXHRcdFx0XCJwbG91Z2hcIjogXCJwbG91Z2hcIixcblx0XHRcdFwicmF6ZVwiOiBcInJhemVcIixcblx0XHRcdFwic25hcGRcIjogXCJzbmFwZFwiLFxuXHRcdFx0XCJ2b3VuZFwiOiBcInZvdW5kXCIsXG5cdFx0XHRcInplbGZcIjogXCJ6ZWxmXCJcblx0XHR9XG5cdEBlbmQtaW5jbHVkZVxuKi9cblxuY29uc3QgYnVkZ2UgPSByZXF1aXJlKCBcImJ1ZGdlXCIgKTtcbmNvbnN0IGNhbGxlZCA9IHJlcXVpcmUoIFwiY2FsbGVkXCIgKTtcbmNvbnN0IGNsYXpvZiA9IHJlcXVpcmUoIFwiY2xhem9mXCIgKTtcbmNvbnN0IGhhcmRlbiA9IHJlcXVpcmUoIFwiaGFyZGVuXCIgKTtcbmNvbnN0IGxldGdvID0gcmVxdWlyZSggXCJsZXRnb1wiICk7XG5jb25zdCBwbG91Z2ggPSByZXF1aXJlKCBcInBsb3VnaFwiICk7XG5jb25zdCByYXplID0gcmVxdWlyZSggXCJyYXplXCIgKTtcbmNvbnN0IHNuYXBkID0gcmVxdWlyZSggXCJzbmFwZFwiICk7XG5jb25zdCB2b3VuZCA9IHJlcXVpcmUoIFwidm91bmRcIiApO1xuY29uc3QgemVsZiA9IHJlcXVpcmUoIFwiemVsZlwiICk7XG5cbmNvbnN0IGNlcmllcyA9IGZ1bmN0aW9uIGNlcmllcyggbWV0aG9kICl7XG5cdC8qO1xuXHRcdEBtZXRhLWNvbmZpZ3VyYXRpb246XG5cdFx0XHR7XG5cdFx0XHRcdFwibWV0aG9kOnJlcXVpcmVkXCI6IFtcblx0XHRcdFx0XHRbIFwiZnVuY3Rpb25cIiBdLFxuXHRcdFx0XHRcdFwiLi4uZnVuY3Rpb25cIlxuXHRcdFx0XHRdXG5cdFx0XHR9XG5cdFx0QGVuZC1tZXRhLWNvbmZpZ3VyYXRpb25cblx0Ki9cblxuXHRtZXRob2QgPSBwbG91Z2goIGFyZ3VtZW50cyApLnJldmVyc2UoICk7XG5cblx0bGV0IHNlbGYgPSB6ZWxmKCB0aGlzICk7XG5cblx0bGV0IGNhdGNoZXIgPSBsZXRnby5iaW5kKCBzZWxmICkoIGZ1bmN0aW9uIGNoYWluKCBjYWNoZSApe1xuXHRcdGxldCBleGVjdXRlID0gZnVuY3Rpb24gZXhlY3V0ZSggbmV4dCApe1xuXHRcdFx0bGV0IHBhcmFtZXRlciA9IGJ1ZGdlKCBhcmd1bWVudHMgKTtcblxuXHRcdFx0Y2F0Y2hlci5jaGFpbi5wdXNoKCBzbmFwZC5iaW5kKCBzZWxmICkoIGZ1bmN0aW9uIG9uVGljayggKXtcblx0XHRcdFx0dHJ5e1xuXHRcdFx0XHRcdGxldCBjYWxsYmFjayA9IGNhbGxlZC5iaW5kKCBzZWxmICkoIGZ1bmN0aW9uIGNhbGxiYWNrKCBlcnJvciApe1xuXHRcdFx0XHRcdFx0bGV0IHBhcmFtZXRlciA9IHJhemUoIGFyZ3VtZW50cyApO1xuXG5cdFx0XHRcdFx0XHRpZiggY2xhem9mKCBlcnJvciwgRXJyb3IgKSApe1xuXHRcdFx0XHRcdFx0XHRjYXRjaGVyLmZsdXNoKCApO1xuXG5cdFx0XHRcdFx0XHRcdGNhY2hlLmNhbGxiYWNrLmFwcGx5KCBzZWxmLCBwYXJhbWV0ZXIuY29uY2F0KCBbIGNhdGNoZXIgXSApICk7XG5cblx0XHRcdFx0XHRcdH1lbHNlIGlmKCBtZXRob2QubGVuZ3RoICl7XG5cdFx0XHRcdFx0XHRcdGV4ZWN1dGUuYXBwbHkoIHNlbGYsIFsgdm91bmQoIG1ldGhvZC5wb3AoICksIHNlbGYgKSBdLmNvbmNhdCggcGFyYW1ldGVyICkgKTtcblxuXHRcdFx0XHRcdFx0fWVsc2V7XG5cdFx0XHRcdFx0XHRcdGxldCByZXN1bHQgPSBbIF0uY29uY2F0KCBjYXRjaGVyLnJlc3VsdCApO1xuXG5cdFx0XHRcdFx0XHRcdGNhdGNoZXIuZmx1c2goICk7XG5cblx0XHRcdFx0XHRcdFx0Lyo7XG5cdFx0XHRcdFx0XHRcdFx0QG5vdGU6XG5cdFx0XHRcdFx0XHRcdFx0XHRMaXN0IG9mIGFjY3VtdWxhdGVkIHJlc3VsdHMgd2lsbCBiZSBwYXNzZWQgb24gdGhlIGZpcnN0IHBhcmFtZXRlci5cblx0XHRcdFx0XHRcdFx0XHRAZW5kLW5vdGVcblx0XHRcdFx0XHRcdFx0Ki9cblx0XHRcdFx0XHRcdFx0Y2FjaGUuY2FsbGJhY2suYXBwbHkoIHNlbGYsIFsgcmVzdWx0IF0uY29uY2F0KCBwYXJhbWV0ZXIgKS5jb25jYXQoIFsgY2F0Y2hlciBdICkgKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9ICk7XG5cblx0XHRcdFx0XHQvKjtcblx0XHRcdFx0XHRcdEBub3RlOlxuXHRcdFx0XHRcdFx0XHRJbW1lZGlhdGUgc3RvcCBmcm9tIHRoZSBjYWxsYmFjay5cblx0XHRcdFx0XHRcdEBlbmQtbm90ZVxuXHRcdFx0XHRcdCovXG5cdFx0XHRcdFx0aGFyZGVuKCBcInN0b3BcIiwgZnVuY3Rpb24gc3RvcCggKXtcblx0XHRcdFx0XHRcdGNhdGNoZXIuZmx1c2goICk7XG5cblx0XHRcdFx0XHRcdGNhY2hlLmNhbGxiYWNrLmFwcGx5KCBzZWxmLCByYXplKCBhcmd1bWVudHMgKS5jb25jYXQoIFsgY2F0Y2hlciBdICkgKTtcblxuXHRcdFx0XHRcdFx0cmV0dXJuIGNhdGNoZXI7XG5cdFx0XHRcdFx0fSwgY2FsbGJhY2sgKTtcblxuXHRcdFx0XHRcdC8qO1xuXHRcdFx0XHRcdFx0QG5vdGU6XG5cdFx0XHRcdFx0XHRcdENoYWluZWQgc2VyaWVzIG1ldGhvZHMgbWF5IHJldHVybiByZXN1bHRzIHRvIGJlIGFjY3VtdWxhdGVkLlxuXHRcdFx0XHRcdFx0QGVuZC1ub3RlXG5cdFx0XHRcdFx0Ki9cblx0XHRcdFx0XHRjYXRjaGVyLnJlc3VsdC5wdXNoKCBuZXh0LmFwcGx5KCBzZWxmLCBbIGNhbGxiYWNrIF0uY29uY2F0KCBwYXJhbWV0ZXIgKSApICk7XG5cblx0XHRcdFx0fWNhdGNoKCBlcnJvciApe1xuXHRcdFx0XHRcdGNhdGNoZXIuZmx1c2goICk7XG5cblx0XHRcdFx0XHRjYWNoZS5jYWxsYmFjay5hcHBseSggc2VsZiwgWyBlcnJvciBdLmNvbmNhdCggcGFyYW1ldGVyICkgKTtcblx0XHRcdFx0fVxuXHRcdFx0fSApLnJlbGVhc2UoICkgKTtcblx0XHR9O1xuXG5cdFx0ZXhlY3V0ZSggdm91bmQoIG1ldGhvZC5wb3AoICksIHNlbGYgKSApO1xuXHR9ICk7XG5cblx0aGFyZGVuKCBcImNoYWluXCIsIFsgXSwgY2F0Y2hlciApO1xuXHRoYXJkZW4oIFwicmVzdWx0XCIsIFsgXSwgY2F0Y2hlciApO1xuXG5cdGhhcmRlbiggXCJmbHVzaFwiLCBmdW5jdGlvbiBmbHVzaCggKXtcblx0XHR3aGlsZSggY2F0Y2hlci5jaGFpbi5sZW5ndGggKXtcblx0XHRcdGNhdGNoZXIuY2hhaW4ucG9wKCApLmhhbHQoICk7XG5cdFx0fVxuXG5cdFx0d2hpbGUoIGNhdGNoZXIucmVzdWx0Lmxlbmd0aCApe1xuXHRcdFx0Y2F0Y2hlci5yZXN1bHQucG9wKCApO1xuXHRcdH1cblxuXHRcdHJldHVybiBjYXRjaGVyO1xuXHR9LCBjYXRjaGVyICk7XG5cblx0cmV0dXJuIGNhdGNoZXI7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGNlcmllcztcbiJdfQ==
