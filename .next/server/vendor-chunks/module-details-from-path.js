"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/module-details-from-path";
exports.ids = ["vendor-chunks/module-details-from-path"];
exports.modules = {

/***/ "(action-browser)/./node_modules/module-details-from-path/index.js":
/*!********************************************************!*\
  !*** ./node_modules/module-details-from-path/index.js ***!
  \********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\n\nvar sep = (__webpack_require__(/*! path */ \"path\").sep)\n\nmodule.exports = function (file) {\n  var segments = file.split(sep)\n  var index = segments.lastIndexOf('node_modules')\n\n  if (index === -1) return\n  if (!segments[index + 1]) return\n\n  var scoped = segments[index + 1][0] === '@'\n  var name = scoped ? segments[index + 1] + '/' + segments[index + 2] : segments[index + 1]\n  var offset = scoped ? 3 : 2\n\n  var basedir = ''\n  var lastBaseDirSegmentIndex = index + offset - 1\n  for (var i = 0; i <= lastBaseDirSegmentIndex; i++) {\n    if (i === lastBaseDirSegmentIndex) {\n      basedir += segments[i]\n    } else {\n      basedir += segments[i] + sep\n    }\n  }\n\n  var path = ''\n  var lastSegmentIndex = segments.length - 1\n  for (var i2 = index + offset; i2 <= lastSegmentIndex; i2++) {\n    if (i2 === lastSegmentIndex) {\n      path += segments[i2]\n    } else {\n      path += segments[i2] + sep\n    }\n  }\n\n  return {\n    name: name,\n    basedir: basedir,\n    path: path\n  }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFjdGlvbi1icm93c2VyKS8uL25vZGVfbW9kdWxlcy9tb2R1bGUtZGV0YWlscy1mcm9tLXBhdGgvaW5kZXguanMiLCJtYXBwaW5ncyI6IkFBQVk7O0FBRVosVUFBVSw2Q0FBbUI7O0FBRTdCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esa0JBQWtCLDhCQUE4QjtBQUNoRDtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsZ0NBQWdDLHdCQUF3QjtBQUN4RDtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9pdGFsby1zYW50b3MvLi9ub2RlX21vZHVsZXMvbW9kdWxlLWRldGFpbHMtZnJvbS1wYXRoL2luZGV4LmpzPzUwODUiXSwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnXG5cbnZhciBzZXAgPSByZXF1aXJlKCdwYXRoJykuc2VwXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGZpbGUpIHtcbiAgdmFyIHNlZ21lbnRzID0gZmlsZS5zcGxpdChzZXApXG4gIHZhciBpbmRleCA9IHNlZ21lbnRzLmxhc3RJbmRleE9mKCdub2RlX21vZHVsZXMnKVxuXG4gIGlmIChpbmRleCA9PT0gLTEpIHJldHVyblxuICBpZiAoIXNlZ21lbnRzW2luZGV4ICsgMV0pIHJldHVyblxuXG4gIHZhciBzY29wZWQgPSBzZWdtZW50c1tpbmRleCArIDFdWzBdID09PSAnQCdcbiAgdmFyIG5hbWUgPSBzY29wZWQgPyBzZWdtZW50c1tpbmRleCArIDFdICsgJy8nICsgc2VnbWVudHNbaW5kZXggKyAyXSA6IHNlZ21lbnRzW2luZGV4ICsgMV1cbiAgdmFyIG9mZnNldCA9IHNjb3BlZCA/IDMgOiAyXG5cbiAgdmFyIGJhc2VkaXIgPSAnJ1xuICB2YXIgbGFzdEJhc2VEaXJTZWdtZW50SW5kZXggPSBpbmRleCArIG9mZnNldCAtIDFcbiAgZm9yICh2YXIgaSA9IDA7IGkgPD0gbGFzdEJhc2VEaXJTZWdtZW50SW5kZXg7IGkrKykge1xuICAgIGlmIChpID09PSBsYXN0QmFzZURpclNlZ21lbnRJbmRleCkge1xuICAgICAgYmFzZWRpciArPSBzZWdtZW50c1tpXVxuICAgIH0gZWxzZSB7XG4gICAgICBiYXNlZGlyICs9IHNlZ21lbnRzW2ldICsgc2VwXG4gICAgfVxuICB9XG5cbiAgdmFyIHBhdGggPSAnJ1xuICB2YXIgbGFzdFNlZ21lbnRJbmRleCA9IHNlZ21lbnRzLmxlbmd0aCAtIDFcbiAgZm9yICh2YXIgaTIgPSBpbmRleCArIG9mZnNldDsgaTIgPD0gbGFzdFNlZ21lbnRJbmRleDsgaTIrKykge1xuICAgIGlmIChpMiA9PT0gbGFzdFNlZ21lbnRJbmRleCkge1xuICAgICAgcGF0aCArPSBzZWdtZW50c1tpMl1cbiAgICB9IGVsc2Uge1xuICAgICAgcGF0aCArPSBzZWdtZW50c1tpMl0gKyBzZXBcbiAgICB9XG4gIH1cblxuICByZXR1cm4ge1xuICAgIG5hbWU6IG5hbWUsXG4gICAgYmFzZWRpcjogYmFzZWRpcixcbiAgICBwYXRoOiBwYXRoXG4gIH1cbn1cbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(action-browser)/./node_modules/module-details-from-path/index.js\n");

/***/ })

};
;