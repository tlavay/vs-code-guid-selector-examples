import * as vscode from 'vscode';
import * as constants from "./Constants";

export class GuidHoverProvider {
    public checkCursorOnGuid() : vscode.HoverProvider {
        const hoverProvider = (document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken) => {
            const range = document.getWordRangeAtPosition(position);
            const result = document.getText(range);
      
            if (result.match(constants.guidTokenPattern))
            {
                return new vscode.Hover(`Cool! ${result} is a guid!`);
            }
        };

        return {
            provideHover: hoverProvider
        };
    }

    public async quickPicksOnGuidHover() : Promise<vscode.HoverProvider> {
        const hoverProvider = async (document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken) => {
            const range = document.getWordRangeAtPosition(position);
            const result = document.getText(range);
    
            if (result.match(constants.guidTokenPattern))
            {
                const quickPicks = [ 'I think so', 'I dont know much about guids', 'Yes', 'Everything is a guid', 'No' ];
                var selection = await vscode.window.showQuickPick(quickPicks);
                if (selection === 'I dont know much about guids') {
                    vscode.window.showErrorMessage('Bad developer...');
                } else if (selection === 'Yes') {
                    vscode.window.showInformationMessage('Correct!!');
                }
                
                return new vscode.Hover('');
            }
        };

        return {
            provideHover: hoverProvider
        };
    }
} 