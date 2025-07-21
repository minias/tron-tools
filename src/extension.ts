// src/extension.ts
// @fileoverview Trongrid API 직접 호출 예제 (Node 환경에서는 CORS 없음)
// @path src/extension.ts
//import fetch from 'node-fetch'; // Node.js 18+ 는 기본 fetch 포함됨 (v20.19.0 포함)

import * as vscode from 'vscode';
import * as path from 'path';

export async function getWalletEnergy(address: string) {
  const res = await fetch("https://api.trongrid.io/wallet/getresource", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ address }),
  });

  if (!res.ok) {
    throw new Error(`Trongrid API 오류: ${res.status}`);
  }

  const data = await res.json();
  return data;
}

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand('tron-tools.open', () => {
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
      panel.webview.onDidReceiveMessage(async (message) => {
        if (message.command === 'check-energy') {
          const { address } = message.payload;
          try {
            const energy = await getWalletEnergy(address);
            panel.webview.postMessage({
              command: 'energy-response',
              data: energy
            });
          } catch (err) {
            panel.webview.postMessage({
              command: 'error',
              message: err
            });
          }
        }
      });      
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
