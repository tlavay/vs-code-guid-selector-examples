/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((module) => {

module.exports = require("vscode");

/***/ }),
/* 2 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.guidTokenPattern = void 0;
exports.guidTokenPattern = /[{]?[0-9a-fA-F]{8}-([0-9a-fA-F]{4}-){3}[0-9a-fA-F]{12}[}]?/g;


/***/ }),
/* 3 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.HighlightGuidCommandProvider = void 0;
const vscode = __webpack_require__(1);
const constants = __webpack_require__(2);
class HighlightGuidCommandProvider {
    highlightAllGuidsCommand() {
        const activeTextEditor = vscode.window.activeTextEditor;
        const document = activeTextEditor?.document;
        if (document) {
            const documentText = document.getText();
            let match;
            const guids = [];
            while ((match = constants.guidTokenPattern.exec(documentText))) {
                const startPos = document.positionAt(match.index);
                const endPos = document.positionAt(match.index + match[0].length);
                const decoration = { range: new vscode.Range(startPos, endPos) };
                guids.push(decoration);
            }
            const decorationType = vscode.window.createTextEditorDecorationType({
                color: "white",
                backgroundColor: "#0078d4",
                overviewRulerLane: vscode.OverviewRulerLane.Right,
            });
            activeTextEditor.setDecorations(decorationType, guids);
        }
    }
}
exports.HighlightGuidCommandProvider = HighlightGuidCommandProvider;


/***/ }),
/* 4 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OpenFileCommandProvider = void 0;
const vscode = __webpack_require__(1);
class OpenFileCommandProvider {
    async openGuidFileAndHighlight() {
        const folderDirectoryPath = 'C:\\Users\\tnlav\\Downloads\\Guid Demo Folder';
        const directoryUri = vscode.Uri.file(folderDirectoryPath);
        const files = await vscode.workspace.fs.readDirectory(directoryUri);
        const fileNames = [];
        for (let i = 0; i < files.length; i++) {
            const currentFile = files[i];
            const fileName = currentFile[0];
            fileNames.push(fileName);
        }
        const inputBoxOptions = {
            title: 'Select Guid File To Open...',
            canPickMany: false
        };
        const selection = await vscode.window.showQuickPick(fileNames, inputBoxOptions);
        if (selection) {
            const fileUri = vscode.Uri.file(`${folderDirectoryPath}\\${selection}`);
            await vscode.window.showTextDocument(fileUri);
            await vscode.commands.executeCommand('vs-code-guid-selector-examples.hightlight-all-guids');
        }
    }
}
exports.OpenFileCommandProvider = OpenFileCommandProvider;


/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.deactivate = exports.activate = void 0;
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = __webpack_require__(1);
const HighlightGuidCommandProvider_1 = __webpack_require__(3);
const OpenFileCommandProvider_1 = __webpack_require__(4);
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
async function activate(context) {
    console.log('The greatest GUID vscode extension has successfully loaded.');
    // const guidHoverProvider = new GuidHoverProvider();
    // context.subscriptions.push(vscode.languages.registerHoverProvider('*', guidHoverProvider.checkCursorOnGuid()));
    // context.subscriptions.push(vscode.languages.registerHoverProvider('*', await guidHoverProvider.quickPicksOnGuidHover()));
    const highlightGuidCommandProvider = new HighlightGuidCommandProvider_1.HighlightGuidCommandProvider();
    context.subscriptions.push(vscode.commands.registerCommand('vs-code-guid-selector-examples.hightlight-all-guids', highlightGuidCommandProvider.highlightAllGuidsCommand));
    const openFileProvider = new OpenFileCommandProvider_1.OpenFileCommandProvider();
    context.subscriptions.push(vscode.commands.registerCommand('vs-code-guid-selector-examples.open-guid-file', openFileProvider.openGuidFileAndHighlight));
}
exports.activate = activate;
// this method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;

})();

module.exports = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=extension.js.map