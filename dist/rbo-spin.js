(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("angular"));
	else if(typeof define === 'function' && define.amd)
		define(["angular"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("angular")) : factory(root["angular"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	__webpack_require__(2);
	__webpack_require__(3);
	var httpSpinner_1 = __webpack_require__(4);
	var SpinnerModel_1 = __webpack_require__(5);
	var SpinComponent_1 = __webpack_require__(6);
	exports.SpinnerModule = angular.module("reibo.spin", [])
	    .service("rboSpinModel", SpinnerModel_1.SpinnerModel)
	    .component("rboSpin", new SpinComponent_1.SpinComponent())
	    .config(httpSpinner_1.config);


/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ },
/* 3 */
/***/ function(module, exports) {

	//fgnass.github.com/spin.js#v1.2.5
	/**
	 * Copyright (c) 2011 Felix Gnass [fgnass at neteye dot de]
	 * Licensed under the MIT license
	 */

	var prefixes = ['webkit', 'Moz', 'ms', 'O']; /* Vendor prefixes */
	var animations = {}; /* Animation rules keyed by their name */
	var useCssAnimations;

	/**
	 * Utility function to create elements. If no tag name is given,
	 * a DIV is created. Optionally properties can be passed.
	 */
	function createEl(tag, prop) {
	  var el = document.createElement(tag || 'div');
	  var n;

	  for(n in prop) {
	    el[n] = prop[n];
	  }
	  return el;
	}

	/**
	 * Appends children and returns the parent.
	 */
	function ins(parent /* child1, child2, ...*/) {
	  for (var i=1, n=arguments.length; i<n; i++) {
	    parent.appendChild(arguments[i]);
	  }
	  return parent;
	}

	/**
	 * Insert a new stylesheet to hold the @keyframe or VML rules.
	 */
	var sheet = function() {
	  var el = createEl('style');
	  ins(document.getElementsByTagName('head')[0], el);
	  return el.sheet || el.styleSheet;
	}();

	/**
	 * Creates an opacity keyframe animation rule and returns its name.
	 * Since most mobile Webkits have timing issues with animation-delay,
	 * we create separate rules for each line/segment.
	 */
	function addAnimation(alpha, trail, i, lines) {
	  var name = ['opacity', trail, ~~(alpha*100), i, lines].join('-');
	  var start = 0.01 + i/lines*100;
	  var z = Math.max(1-(1-alpha)/trail*(100-start) , alpha);
	  var prefix = useCssAnimations.substring(0, useCssAnimations.indexOf('Animation')).toLowerCase();
	  var pre = prefix && '-'+prefix+'-' || '';

	  if (!animations[name]) {
	    sheet.insertRule(
	      '@' + pre + 'keyframes ' + name + '{' +
	      '0%{opacity:'+z+'}' +
	      start + '%{opacity:'+ alpha + '}' +
	      (start+0.01) + '%{opacity:1}' +
	      (start+trail)%100 + '%{opacity:'+ alpha + '}' +
	      '100%{opacity:'+ z + '}' +
	      '}', 0);
	    animations[name] = 1;
	  }
	  return name;
	}

	/**
	 * Tries various vendor prefixes and returns the first supported property.
	 **/
	function vendor(el, prop) {
	  var s = el.style;
	  var pp;
	  var i;

	  if(s[prop] !== undefined) return prop;
	  prop = prop.charAt(0).toUpperCase() + prop.slice(1);
	  for(i=0; i<prefixes.length; i++) {
	    pp = prefixes[i]+prop;
	    if(s[pp] !== undefined) return pp;
	  }
	}

	/**
	 * Sets multiple style properties at once.
	 */
	function css(el, prop) {
	  for (var n in prop) {
	    el.style[vendor(el, n)||n] = prop[n];
	  }
	  return el;
	}

	/**
	 * Fills in default values.
	 */
	function merge(obj) {
	  for (var i=1; i < arguments.length; i++) {
	    var def = arguments[i];
	    for (var n in def) {
	      if (obj[n] === undefined) obj[n] = def[n];
	    }
	  }
	  return obj;
	}

	/**
	 * Returns the absolute page-offset of the given element.
	 */
	function pos(el) {
	  var o = {x:el.offsetLeft, y:el.offsetTop};
	  while((el = el.offsetParent)) {
	    o.x+=el.offsetLeft;
	    o.y+=el.offsetTop;
	  }
	  return o;
	}

	var defaults = {
	  lines: 12,            // The number of lines to draw
	  length: 7,            // The length of each line
	  width: 5,             // The line thickness
	  radius: 10,           // The radius of the inner circle
	  rotate: 0,            // rotation offset
	  color: '#000',        // #rgb or #rrggbb
	  speed: 1,             // Rounds per second
	  trail: 100,           // Afterglow percentage
	  opacity: 1/4,         // Opacity of the lines
	  fps: 20,              // Frames per second when using setTimeout()
	  zIndex: 2e9,          // Use a high z-index by default
	  className: 'spinner', // CSS class to assign to the element
	  top: 'auto',          // center vertically
	  left: 'auto'          // center horizontally
	};

	/** The constructor */
	var Spinner = function Spinner(o) {
	  if (!this.spin) return new Spinner(o);
	  this.opts = merge(o || {}, Spinner.defaults, defaults);
	};

	Spinner.defaults = {};
	merge(Spinner.prototype, {
	  spin: function(target) {
	    this.stop();
	    var self = this;
	    var o = self.opts;
	    var el = self.el = css(createEl(0, {className: o.className}), {position: 'relative', zIndex: o.zIndex});
	    var mid = o.radius+o.length+o.width;
	    var ep; // element position
	    var tp; // target position

	    if (target) {
	      target.insertBefore(el, target.firstChild||null);
	      tp = pos(target);
	      ep = pos(el);
	      css(el, {
	        left: (o.left == 'auto' ? tp.x-ep.x + (target.offsetWidth >> 1) : o.left+mid) + 'px',
	        top: (o.top == 'auto' ? tp.y-ep.y + (target.offsetHeight >> 1) : o.top+mid)  + 'px'
	      });
	    }

	    el.setAttribute('aria-role', 'progressbar');
	    self.lines(el, self.opts);

	    if (!useCssAnimations) {
	      // No CSS animation support, use setTimeout() instead
	      var i = 0;
	      var fps = o.fps;
	      var f = fps/o.speed;
	      var ostep = (1-o.opacity)/(f*o.trail / 100);
	      var astep = f/o.lines;

	      !function anim() {
	        i++;
	        for (var s=o.lines; s; s--) {
	          var alpha = Math.max(1-(i+s*astep)%f * ostep, o.opacity);
	          self.opacity(el, o.lines-s, alpha, o);
	        }
	        self.timeout = self.el && setTimeout(anim, ~~(1000/fps));
	      }();
	    }
	    return self;
	  },
	  stop: function() {
	    var el = this.el;
	    if (el) {
	      clearTimeout(this.timeout);
	      if (el.parentNode) el.parentNode.removeChild(el);
	      this.el = undefined;
	    }
	    return this;
	  },
	  lines: function(el, o) {
	    var i = 0;
	    var seg;

	    function fill(color, shadow) {
	      return css(createEl(), {
	        position: 'absolute',
	        width: (o.length+o.width) + 'px',
	        height: o.width + 'px',
	        background: color,
	        boxShadow: shadow,
	        transformOrigin: 'left',
	        transform: 'rotate(' + ~~(360/o.lines*i+o.rotate) + 'deg) translate(' + o.radius+'px' +',0)',
	        borderRadius: (o.width>>1) + 'px'
	      });
	    }
	    for (; i < o.lines; i++) {
	      seg = css(createEl(), {
	        position: 'absolute',
	        top: 1+~(o.width/2) + 'px',
	        transform: o.hwaccel ? 'translate3d(0,0,0)' : '',
	        opacity: o.opacity,
	        animation: useCssAnimations && addAnimation(o.opacity, o.trail, i, o.lines) + ' ' + 1/o.speed + 's linear infinite'
	      });
	      if (o.shadow) ins(seg, css(fill('#000', '0 0 4px ' + '#000'), {top: 2+'px'}));
	      ins(el, ins(seg, fill(o.color, '0 0 1px rgba(0,0,0,.1)')));
	    }
	    return el;
	  },
	  opacity: function(el, i, val) {
	    if (i < el.childNodes.length) el.childNodes[i].style.opacity = val;
	  }
	});

	/////////////////////////////////////////////////////////////////////////
	// VML rendering for IE
	/////////////////////////////////////////////////////////////////////////

	/**
	 * Check and init VML support
	 */
	!function() {

	  function vml(tag, attr) {
	    return createEl('<' + tag + ' xmlns="urn:schemas-microsoft.com:vml" class="spin-vml">', attr);
	  }

	  var s = css(createEl('group'), {behavior: 'url(#default#VML)'});

	  if (!vendor(s, 'transform') && s.adj) {

	    // VML support detected. Insert CSS rule ...
	    sheet.addRule('.spin-vml', 'behavior:url(#default#VML)');

	    Spinner.prototype.lines = function(el, o) {
	      var r = o.length+o.width;
	      var s = 2*r;

	      function grp() {
	        return css(vml('group', {coordsize: s +' '+s, coordorigin: -r +' '+-r}), {width: s, height: s});
	      }

	      var margin = -(o.width+o.length)*2+'px';
	      var g = css(grp(), {position: 'absolute', top: margin, left: margin});

	      var i;

	      function seg(i, dx, filter) {
	        ins(g,
	          ins(css(grp(), {rotation: 360 / o.lines * i + 'deg', left: ~~dx}),
	            ins(css(vml('roundrect', {arcsize: 1}), {
	                width: r,
	                height: o.width,
	                left: o.radius,
	                top: -o.width>>1,
	                filter: filter
	              }),
	              vml('fill', {color: o.color, opacity: o.opacity}),
	              vml('stroke', {opacity: 0}) // transparent stroke to fix color bleeding upon opacity change
	            )
	          )
	        );
	      }

	      if (o.shadow) {
	        for (i = 1; i <= o.lines; i++) {
	          seg(i, -2, 'progid:DXImageTransform.Microsoft.Blur(pixelradius=2,makeshadow=1,shadowopacity=.3)');
	        }
	      }
	      for (i = 1; i <= o.lines; i++) seg(i);
	      return ins(el, g);
	    };
	    Spinner.prototype.opacity = function(el, i, val, o) {
	      var c = el.firstChild;
	      o = o.shadow && o.lines || 0;
	      if (c && i+o < c.childNodes.length) {
	        c = c.childNodes[i+o]; c = c && c.firstChild; c = c && c.firstChild;
	        if (c) c.opacity = val;
	      }
	    };
	  }
	  else {
	    useCssAnimations = vendor(s, 'animation');
	  }
	}();

	module.exports = Spinner;


/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";
	config.$inject = ["$httpProvider"];
	function config($httpProvider) {
	    function interceptor(q, spinModel) {
	        return {
	            request: function (config) {
	                spinModel.start();
	                return config;
	            },
	            response: function (response) {
	                spinModel.stop();
	                return response;
	            },
	            responseError: function (rejection) {
	                spinModel.stop();
	                return q.reject(rejection);
	            }
	        };
	    }
	    interceptor.$inject = ["$q", "rboSpinModel"];
	    $httpProvider.interceptors.push(interceptor);
	}
	exports.config = config;


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var Spinner = __webpack_require__(3);
	var SpinnerModel = (function () {
	    function SpinnerModel(document) {
	        this.document = document;
	        this.options = {
	            top: "50",
	            left: "50",
	            scale: 3
	        };
	        this.totalRuns = 0;
	        this.element = document.find("rbo-spin");
	        this.start();
	    }
	    SpinnerModel.prototype.start = function () {
	        if (this.totalRuns === 0) {
	            console.log(this.options);
	            this.spinner = new Spinner({
	                lines: 13,
	                length: 28,
	                width: 14,
	                radius: 42,
	                scale: 3,
	                corners: 1,
	                color: '#000',
	                opacity: 0.25,
	                rotate: 0,
	                direction: 1,
	                speed: 1,
	                trail: 60,
	                fps: 20,
	                zIndex: 2e9,
	                className: 'spinner',
	                top: '50%',
	                left: '50%',
	                shadow: false,
	                hwaccel: false,
	                position: 'absolute'
	            }).spin();
	            this.element.append(this.spinner.el);
	        }
	        this.totalRuns++;
	    };
	    SpinnerModel.prototype.stop = function () {
	        this.totalRuns--;
	        if (this.totalRuns === 0) {
	            this.spinner.spin();
	        }
	    };
	    SpinnerModel.$inject = ["$document"];
	    return SpinnerModel;
	}());
	exports.SpinnerModel = SpinnerModel;


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	__webpack_require__(7);
	var SpinComponent = (function () {
	    function SpinComponent() {
	    }
	    return SpinComponent;
	}());
	exports.SpinComponent = SpinComponent;


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(8);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(10)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../node_modules/css-loader/index.js!./../node_modules/sass-loader/index.js?name=resources/[name]-[hash].[ext]!./style.scss", function() {
				var newContent = require("!!./../node_modules/css-loader/index.js!./../node_modules/sass-loader/index.js?name=resources/[name]-[hash].[ext]!./style.scss");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(9)();
	// imports


	// module
	exports.push([module.id, "rbo-spin {\n  height: 100VH;\n  width: 100VW;\n  display: block;\n  position: fixed; }\n  rbo-spin .spinner {\n    top: 50%;\n    bottom: 50%; }\n", ""]);

	// exports


/***/ },
/* 9 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ }
/******/ ])
});
;