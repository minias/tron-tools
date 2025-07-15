// src/extension.ts
import * as vscode from 'vscode';
import * as path from 'path';
//import * as fs from 'fs';

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand('tron-tools.open', () => {
      const panel = vscode.window.createWebviewPanel(
        'tronToolsWebview',
        'Tron Tools',
        vscode.ViewColumn.One,
        {
          enableScripts: true,
          localResourceRoots: [vscode.Uri.file(path.join(context.extensionPath, 'public', 'build'))]
        }
      );

      const bundlePath = vscode.Uri.file(
        path.join(context.extensionPath, 'public', 'build', 'bundle.js')
      );

      const bundleUri = panel.webview.asWebviewUri(bundlePath);

      panel.webview.html = getWebviewHtml(bundleUri.toString());
    })
  );
}
export function deactivate() {}

function getWebviewHtml(bundleUrl: string) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Tron Tools</title>
</head>
<body>
  <script src="${bundleUrl}"></script>
</body>
</html>`;
}
