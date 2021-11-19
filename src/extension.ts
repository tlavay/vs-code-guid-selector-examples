// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { GuidHoverProvider } from './GuidHoverProvider';
import { HighlightGuidCommandProvider } from './HighlightGuidCommandProvider';
import { OpenFileCommandProvider } from './OpenFileCommandProvider';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export async function activate(context: vscode.ExtensionContext) {

	console.log('The greatest GUID vscode extension has successfully loaded.');

	// const guidHoverProvider = new GuidHoverProvider();
	// context.subscriptions.push(vscode.languages.registerHoverProvider('*', guidHoverProvider.checkCursorOnGuid()));
	// context.subscriptions.push(vscode.languages.registerHoverProvider('*', await guidHoverProvider.quickPicksOnGuidHover()));

	const highlightGuidCommandProvider = new HighlightGuidCommandProvider();
	context.subscriptions.push(vscode.commands.registerCommand('vs-code-guid-selector-examples.hightlight-all-guids', highlightGuidCommandProvider.highlightAllGuidsCommand));

	const openFileProvider = new OpenFileCommandProvider();
	context.subscriptions.push(vscode.commands.registerCommand('vs-code-guid-selector-examples.open-guid-file', openFileProvider.openGuidFileAndHighlight));
}

// this method is called when your extension is deactivated
export function deactivate() {}
