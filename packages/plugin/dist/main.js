
        (function () {
          const ws = new WebSocket('ws://localhost:' + 3000);
  
          ws.addEventListener("open", function (event) {
            ws.send("Hello Server!");
          });
  
          ws.addEventListener("message", function (event) {
            console.log("Message from server ", event.data);
            // location.reload()
          });
        })();
      
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ (() => {

eval("function render() {\n  const element = document.createElement('div')\n\n  element.innerHTML = ['Hello', 'webpack'].join('_1_    111  ,,,')\n  console.log('xx')\n  return element\n}\n\ndocument.body.appendChild(render())\n\n\n//# sourceURL=webpack://plugin/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/index.js"]();
/******/ 	
/******/ })()
;