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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/code.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/code.ts":
/*!*********************!*\
  !*** ./src/code.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _common_events__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./common/events */ "./src/common/events.js");
/* harmony import */ var _common_convertColor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./common/convertColor */ "./src/common/convertColor.js");


const SupportNode = ['FRAME', 'RECTANGLE', 'ELLIPSE', 'LINE', 'POLYGON', 'STAR'];
const hasChildrenNode = ['FRAME', 'GROUP'];
const loadFonts = [];
const selectNode = () => {
    let selections = jsDesign.currentPage.selection;
    let selection;
    for (let node of selections) {
        if (selection && SupportNode.includes(node.type))
            jsDesign.notify('已选择多个图层，默认采用最后一个');
        if (SupportNode.includes(node.type)) {
            selection = node;
        }
    }
    return selection;
};
const addLoadFont = (fontName) => {
    if (!loadFonts.map(font => JSON.stringify(font)).includes(JSON.stringify(fontName))) {
        loadFonts.push(fontName);
    }
};
const getTextNode = (nodes, fonts) => {
    for (const node of nodes) {
        if (node.type === 'TEXT' && node.visible) {
            addLoadFont(node.fontName);
            let fillSolid = node.fills.find(attr => attr.type === 'SOLID');
            let color = Object(_common_convertColor__WEBPACK_IMPORTED_MODULE_1__["jsDesignRGBToRGB"])(fillSolid.color);
            fonts.push({
                content: node.characters,
                fontFamily: node.fontName,
                fontSize: node.fontSize,
                color: `rgba(${color.r},${color.g},${color.b},${fillSolid.opacity})`,
            });
        }
    }
};
const selectChangedHandler = () => {
    let selection = selectNode();
    if (selection) {
        Object(_common_events__WEBPACK_IMPORTED_MODULE_0__["emit"])('SELECTION_CHANGED', true);
        let fills = selection.fills;
        let fillColor;
        for (let item of fills) {
            if (item.type === 'SOLID')
                fillColor = item.color;
        }
        let fonts = [];
        if (hasChildrenNode.includes(selection.type)) {
            getTextNode(selection.children, fonts);
        }
        (async () => {
            try {
                for (let item of loadFonts) {
                    await jsDesign.loadFontAsync(item);
                }
            }
            catch (err) {
                console.error(err);
            }
        })();
        Object(_common_events__WEBPACK_IMPORTED_MODULE_0__["emit"])('UPDATE_COLOR', {
            color: fillColor ? Object(_common_convertColor__WEBPACK_IMPORTED_MODULE_1__["RGBToHSL"])(Object(_common_convertColor__WEBPACK_IMPORTED_MODULE_1__["jsDesignRGBToRGB"])(fillColor)) : { h: 0, s: 100, l: 100 },
            fonts
        });
    }
    else {
        Object(_common_events__WEBPACK_IMPORTED_MODULE_0__["emit"])('SELECTION_CHANGED', false);
    }
};
jsDesign.showUI(__html__, { width: 440, height: 260, themeColors: true });
Object(_common_events__WEBPACK_IMPORTED_MODULE_0__["emit"])('SELECTION_CHANGED', jsDesign.currentPage.selection.length > 0);
Object(_common_events__WEBPACK_IMPORTED_MODULE_0__["on"])("CHANGE_GUI_SIZE", (guiSize) => {
    jsDesign.ui.resize(guiSize === null || guiSize === void 0 ? void 0 : guiSize.width, guiSize === null || guiSize === void 0 ? void 0 : guiSize.height);
});
Object(_common_events__WEBPACK_IMPORTED_MODULE_0__["on"])("APPLY_COLOR", (hsl) => {
    let RGB = Object(_common_convertColor__WEBPACK_IMPORTED_MODULE_1__["HSLToRGB"])(hsl);
    let jsDesignRGB = Object(_common_convertColor__WEBPACK_IMPORTED_MODULE_1__["webRGBToJsDesignRGB"])(RGB);
    let selection = selectNode();
    if (selection) {
        selection.fills = selection.fills.length > 0 ? selection.fills.map(fill => {
            if (fill.type === 'SOLID')
                return { type: 'SOLID', color: jsDesignRGB };
        }) : [{ type: 'SOLID', color: jsDesignRGB }];
    }
    else {
        jsDesign.notify('应用失败，未选择含填充色图层');
    }
});
jsDesign.on('selectionchange', selectChangedHandler);
selectChangedHandler();


/***/ }),

/***/ "./src/common/convertColor.js":
/*!************************************!*\
  !*** ./src/common/convertColor.js ***!
  \************************************/
/*! exports provided: webRGBToJsDesignRGB, hexToJsDesignRGB, hexToRGB, jsDesignRGBToRGB, RGBToHSL, HSLToRGB */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "webRGBToJsDesignRGB", function() { return webRGBToJsDesignRGB; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hexToJsDesignRGB", function() { return hexToJsDesignRGB; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hexToRGB", function() { return hexToRGB; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "jsDesignRGBToRGB", function() { return jsDesignRGBToRGB; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RGBToHSL", function() { return RGBToHSL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HSLToRGB", function() { return HSLToRGB; });
const namesRGB = ['r', 'g', 'b'];

const webRGBToJsDesignRGB = (color) => {
    const rgb = {};
    namesRGB.forEach((e, i) => {
        rgb[e] = color[e] / 255;
    });
    if (color['a'] !== undefined) rgb['a'] = color['a'];
    return rgb;
}

// 十六进制转RGB[JsDesign]
const hexToJsDesignRGB = (color) => {
    let opacity = '';
    color = color.toLowerCase();
    if (color[0] === '#') color = color.slice(1);

    if (color.length === 3) {
        color = color.replace(/(.)(.)(.)?/g, '$1$1$2$2$3$3');
    } else if (color.length === 8) {
        const arr = color.match(/(.{6})(.{2})/);
        color = arr[1];
        opacity = arr[2];
    }
    const num = parseInt(color, 16);
    const rgb = { r: num >> 16, g: num >> 8 & 255, b: num & 255 };

    if (opacity) {
        rgb.push(parseInt(opacity, 16) / 255);
        return webRGBToJsDesignRGB(rgb);
    } else {
        return webRGBToJsDesignRGB(rgb);
    }
}

// 十六进制转RGB
const hexToRGB = (hex) => {
    let opacity = '';
    color = color.toLowerCase();
    if (color[0] === '#') color = color.slice(1);

    if (color.length === 3) {
        color = color.replace(/(.)(.)(.)?/g, '$1$1$2$2$3$3');
    } else if (color.length === 8) {
        const arr = color.match(/(.{6})(.{2})/);
        color = arr[1];
        opacity = arr[2];
    }
    const num = parseInt(color, 16);
    const rgb = { r: num >> 16, g: num >> 8 & 255, b: num & 255 };
    return rgb;
}

const jsDesignRGBToRGB = (color) => {
    const rgb = {};
    namesRGB.forEach((e, i) => {
        rgb[e] = color[e] * 255;
    })
    return rgb;
}

// RGB转换为HSL
const RGBToHSL = (color) => {
    let { r, g, b } = color;
    r /= 255;
    g /= 255;
    b /= 255;
    const l = Math.max(r, g, b);
    const s = l - Math.min(r, g, b);
    const h = s
        ? l === r
            ? (g - b) / s
            : l === g
                ? 2 + (b - r) / s
                : 4 + (r - g) / s
        : 0;
    return {
        h: 60 * h < 0 ? 60 * h + 360 : 60 * h,
        s: 100 * (s ? (l <= 0.5 ? s / (2 * l - s) : s / (2 - (2 * l - s))) : 0),
        l: (100 * (2 * l - s)) / 2,
    };
};

// HSL转换为RGB
const HSLToRGB = (color) => {
    let { h, s, l } = color;
    s /= 100;
    l /= 100;
    const k = n => (n + h / 30) % 12;
    const a = s * Math.min(l, 1 - l);
    const f = n =>
        l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
    return { r: 255 * f(0), g: 255 * f(8), b: 255 * f(4) };
};

/***/ }),

/***/ "./src/common/events.js":
/*!******************************!*\
  !*** ./src/common/events.js ***!
  \******************************/
/*! exports provided: on, once, emit */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "on", function() { return on; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "once", function() { return once; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "emit", function() { return emit; });
const eventHandlers = {};
let currentId = 0;
function on(name, handler) {
    const id = `${currentId}`;
    currentId += 1;
    eventHandlers[id] = { handler, name };
    return function () {
        delete eventHandlers[id];
    };
}
function once(name, handler) {
    let done = false;
    return on(name, function (...args) {
        if (done === true) {
            return;
        }
        done = true;
        handler(...args);
    });
}
const emit = typeof window === 'undefined'
    ? function (name, ...args) {
        jsDesign.ui.postMessage([name, ...args]);
    }
    : function (name, ...args) {
        window.parent.postMessage({
            pluginMessage: [name, ...args]
        }, '*');
    };
function invokeEventHandler(name, args) {
    for (const id in eventHandlers) {
        if (eventHandlers[id].name === name) {
            eventHandlers[id].handler.apply(null, args);
        }
    }
}
if (typeof window === 'undefined') {
    jsDesign.ui.onmessage = function ([name, ...args]) {
        invokeEventHandler(name, args);
    };
}
else {
    window.onmessage = function (event) {
        const [name, ...args] = event.data.pluginMessage;
        invokeEventHandler(name, args);
    };
}

/***/ })

/******/ });
//# sourceMappingURL=code.js.map