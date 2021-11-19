import * as vscode from 'vscode';

export class OpenFileCommandProvider {
    public async openGuidFileAndHighlight() : Promise<void> {
        const folderDirectoryPath = 'C:\\Users\\tnlav\\Downloads\\Guid Demo Folder';

        const directoryUri = vscode.Uri.file(folderDirectoryPath);
        const files = await vscode.workspace.fs.readDirectory(directoryUri);
        const fileNames: string[] = [];
        for (let i = 0; i < files.length; i++){
            const currentFile = files[i];
            const fileName = currentFile[0];
            fileNames.push(fileName);
        }
        
        const inputBoxOptions: vscode.QuickPickOptions = {
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