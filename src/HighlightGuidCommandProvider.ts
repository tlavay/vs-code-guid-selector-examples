import * as vscode from "vscode";
import * as constants from "./Constants";

export class HighlightGuidCommandProvider {

  public highlightAllGuidsCommand() {
    const activeTextEditor = vscode.window.activeTextEditor;
    const document = activeTextEditor?.document;

    if (document) {
      const documentText = document.getText();

      let match: any;
      const guids: vscode.DecorationOptions[] = [];
      while ((match =  constants.guidTokenPattern.exec(documentText))) {
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
