# VS Code Guid Selector Demo

## Agenda

- Getting Started
- Activation Events
- Hover Providers
- Windows
- Quick Picks
- Commands
- Highlighter

## Helpful Links

- [Getting Started](https://code.visualstudio.com/api/get-started/your-first-extension)
- [Activation Events](https://code.visualstudio.com/api/references/activation-events)
- [vscode-extension-samples](https://github.com/microsoft/vscode-extension-samples)
- [Tyler Git Hub](https://github.com/tlavay/vs-code-guid-selector-demo)

## Getting Started Steps

1. Open Terminal ```ctrl+shift+~```
2. Run ```npm install -g yo generator-code```
3. Run ```yo code```
4. Follow instructions in ternminal

## Important Files

- package.json > activationEvents
  - This controls when your ```vscode``` extension is activated.
  - Do not use ```*```
  - We want to have our extension start on startup so we will use the recommened and safe ```onStartupFinished```
  - We should probably use ```onLanguage``` but for simplicity we will use ```onStartupFinished```

## Below is demo notes

## Hover Provider

- Goto Guid Hover Provider
  - talk about vscode.hoverProvider

- Add Hover Provider to extension.ts

```typescript
const guidHoverProvider = new GuidHoverProvider();
context.subscriptions.push(vscode.languages.registerHoverProvider('json', guidHoverProvider.checkCursorOnGuid()));
```
  
```typescript
  const hoverProvider = (document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken) => {
        const range = document.getWordRangeAtPosition(position);
        const result = document.getText(range);
  
        if (result.match(/[{]?[0-9a-fA-F]{8}-([0-9a-fA-F]{4}-){3}[0-9a-fA-F]{12}[}]?/g)
        {
            return new vscode.Hover(`Cool! ${result} is a guid!`);
        }
    };
```

- Markdown in hover provider
  - What is Guid link: http://guid.one/guid

 ```typescript
 const hoverProvider = (document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken) => {
        const range = document.getWordRangeAtPosition(position);
        const result = document.getText(range);
  
        if (result.match(/[{]?[0-9a-fA-F]{8}-([0-9a-fA-F]{4}-){3}[0-9a-fA-F]{12}[}]?/g))
        {
            var markdown = new vscode.MarkdownString();
            markdown.appendMarkdown('To learn more about guids, goto to [What is a guid](http://guid.one/guid)');
            markdown.appendCodeblock(`const hoverProvider = (document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken) => {
                const range = document.getWordRangeAtPosition(position);
                const result = document.getText(range);
          
                if (result.match('[{]?[0-9a-fA-F]{8}-([0-9a-fA-F]{4}-){3}[0-9a-fA-F]{12}[}]?'))
                {
                    var markdown = new vscode.MarkdownString();
                    markdown.appendMarkdown('To learn more about guids, goto to [What is a guid](http://guid.one/guid)');
                    markdown.appendCodeblock()
                    return new vscode.Hover(markdown);
                }
            };`, 'typescript');
            return new vscode.Hover(markdown);
        }
    };
```

- Show information box

```typescript
const hoverProvider = (document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken) => {
            const range = document.getWordRangeAtPosition(position);
            const result = document.getText(range);
    
            if (result.match(/[{]?[0-9a-fA-F]{8}-([0-9a-fA-F]{4}-){3}[0-9a-fA-F]{12}[}]?/g))
            {
                vscode.window.showInformationMessage(`Cool! ${result} is a guid!`);
                return new vscode.Hover('');
            }
        };
```

- Show quick pick

```typescript
const hoverProvider = async (document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken) => {
            const range = document.getWordRangeAtPosition(position);
            const result = document.getText(range);
    
            if (result.match(/[{]?[0-9a-fA-F]{8}-([0-9a-fA-F]{4}-){3}[0-9a-fA-F]{12}[}]?/g))
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
```

## Commands

- Show Package.json
  - change activation event
  - ```"onCommand:vs-code-guid-selector-examples.hightlight-all-guids"```
  - Show contributes section
  - add

- Add Command

```json
{
  "command": "vs-code-guid-selector-examples.hightlight-all-guids",
  "category": "Guid",
  "title": "Highlight"
}
```

- add command to activation method

```typescript
const highlightGuidCommandProvider = new HighlightGuidCommandProvider();
context.subscriptions.push(vscode.commands.registerCommand('vs-code-guid-selector-examples.hightlight-all-guids', highlightGuidCommandProvider.HighlightAllGuidsCommand));
```

- Discuss active text editor
- Discuss document

```typescript
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
```

### Open Document

- Open document
  - Show how to search specific folder directory
  - Open file

- Add command to packages.json

```json
{
  "command": "vs-code-guid-selector-examples.open-guid-file",
  "category": "Guid",
  "title": "Open & Highlight"
}
```

``` "onCommand:vs-code-guid-selector-examples.open-guid-file" ```

- Add to activation function

```typescript
const openFileProvider = new OpenFileCommandProvider();
context.subscriptions.push(vscode.commands.registerCommand('vs-code-guid-selector-examples.open-guid-file', openFileProvider.openGuidFileAndHighlight));
```

```typescript
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
```