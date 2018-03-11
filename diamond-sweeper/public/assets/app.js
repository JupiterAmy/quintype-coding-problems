/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/assets/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

global.startApp = function (container) {
  console.log("Here is the container:", container);
};
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 1 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ })
/******/ ]);



/* Here goes my changes */


$('document').ready(function() {
	console.log("document ready");
	var numOfTries = 0;
	var diamondsFound = 0;
	var saveTries = 0;
	var saveDiamond = 0;
	var $saved;
	var diamondArray = generateRandomNum();
	
	console.log(diamondArray);
	
	cellClicked();

	/* Click handler for all the cells a user clicks to find a diamond*/
	function cellClicked() {
		$('.cell.unknown').click(function() {
			$(this).off("click");
			numOfTries = numOfTries + 1;
			console.log("try: " + numOfTries);
			var gridPosition = $('.cell').index(this);
	
			/* Below function iterates over the diamonds and keep track of the game progress. When all the diamonds
			   are found the user gets a message and also the final score */
			
			   diamondArray.forEach(function(hasDiamond) {
				if(gridPosition === hasDiamond) {
					diamondsFound = diamondsFound + 1;
					if(diamondsFound < 8) {
						console.log("DiamondFound: " + diamondsFound);
						$(this).removeClass("unknown").addClass("diamond");	
					} else if(diamondsFound === 8) {
						$(this).removeClass("unknown").addClass("diamond");	
						$('#Game-Board').off("click");
						$('#message').text("Game Over!!!");
						$('#finalScore').text("Final Score: " + (64-numOfTries));
					}
				} else {
					$(this).removeClass("unknown");
				}
			}, this);
		});
	}
	

	/* This function generates an array of 8 random numbers to get the 8 hidden diamonds for our game. */

	function generateRandomNum() {
		var arrOfRandNums = [];
		for(var i = 0; i < 15; i++) {
			arrOfRandNums.push(Math.floor(Math.random() * 63));
		}
		var diamondArray = uniq(arrOfRandNums).slice(0,8);
		return diamondArray;
	}
   /* This ES6 function returns a uniqe array  */
	function uniq(a) {
		return Array.from(new Set(a));
	 }

	/* This is a click handler to save the game state*/ 
	$('#saveProgress').click(function() {
		$saved = $('#board-grids').clone();
		saveTries = numOfTries;
		saveDiamond = diamondsFound;
	});

	/* This is a click handler to load the saved state*/ 
	$('#loadSaved').click(function() {
		$('#board-grids').remove();
		$('#Game-Board').prepend($saved);
		numOfTries = saveTries;
		diamondsFound = saveDiamond;
		cellClicked();
	});

});