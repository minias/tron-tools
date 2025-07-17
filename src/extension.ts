import * as vscode from 'vscode';
import * as path from 'path';

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand('tron-tools.openWebview', () => {
      const panel = vscode.window.createWebviewPanel(
        'tronToolsWebview',
        'Tron Tools',
        vscode.ViewColumn.One,
        {
          enableScripts: true,
          localResourceRoots: [
            vscode.Uri.file(path.join(context.extensionPath, 'public', 'build')),
          ],
        }
      );

      const html = getWebviewHtml(panel.webview, context, 'ResourceStatus');
      panel.webview.html = html;
    })
  );
}

function getWebviewHtml(
  webview: vscode.Webview,
  context: vscode.ExtensionContext,
  page: string
): string {
  const bundleUri = webview.asWebviewUri(
    vscode.Uri.file(
      path.join(context.extensionPath, 'public', 'build', 'bundle.js')
    )
  );

  const nonce = getNonce();

  return /* html */ `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta http-equiv="Content-Security-Policy"
              content="default-src 'none';
                       script-src 'nonce-${nonce}';
                       style-src 'unsafe-inline';
                       img-src ${webview.cspSource};
                       font-src ${webview.cspSource};">
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Tron Tools - ${page}</title>
      </head>
      <body>
        <div id="app"></div>
        <script nonce="${nonce}" type="module" src="${bundleUri}"></script>
      </body>
    </html>
  `;
}

function getNonce(): string {
  let text = '';
  const possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < 32; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}
